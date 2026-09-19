import { fetchContributions, normalizeGraphql, normalizePublic } from "@/lib/github";

const graphqlBody = {
  data: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: 7,
          weeks: [
            {
              contributionDays: [
                { date: "2026-09-06", contributionCount: 0, contributionLevel: "NONE" },
                { date: "2026-09-07", contributionCount: 3, contributionLevel: "FIRST_QUARTILE" },
                { date: "2026-09-08", contributionCount: 4, contributionLevel: "FOURTH_QUARTILE" },
              ],
            },
          ],
        },
      },
    },
  },
};

const publicBody = {
  total: { lastYear: 236 },
  contributions: [
    { date: "2026-09-06", count: 0, level: 0 },
    { date: "2026-09-07", count: 9, level: 4 },
    { date: "2026-09-08", count: 2, level: 9 },
  ],
};

const ok = (body: unknown) => ({ ok: true, json: async () => body }) as Response;
const fail = (status = 500) => ({ ok: false, status, json: async () => ({}) }) as Response;

describe("normalizeGraphql", () => {
  // Best case: maps counts, levels and the total.
  it("flattens weeks and maps GitHub's level names to 0-4", () => {
    const data = normalizeGraphql(graphqlBody);
    expect(data?.total).toBe(7);
    expect(data?.source).toBe("graphql");
    expect(data?.days.map((d) => d.level)).toEqual([0, 1, 4]);
    expect(data?.days[1]).toEqual({ date: "2026-09-07", count: 3, level: 1 });
  });

  // Worst case: an unknown level name falls back to 0 instead of breaking the graph.
  it("treats an unknown contribution level as 0", () => {
    const body = JSON.parse(JSON.stringify(graphqlBody));
    body.data.user.contributionsCollection.contributionCalendar.weeks[0].contributionDays[0].contributionLevel = "SOMETHING_NEW";
    expect(normalizeGraphql(body)?.days[0].level).toBe(0);
  });

  // Worst case: unknown user / error payloads must yield null, not throw.
  it.each([null, {}, { data: { user: null } }, { errors: [{ message: "Bad credentials" }] }])("returns null for %j", (body) => {
    expect(normalizeGraphql(body)).toBeNull();
  });
});

describe("normalizePublic", () => {
  it("uses the reported yearly total and clamps out-of-range levels", () => {
    const data = normalizePublic(publicBody);
    expect(data?.total).toBe(236);
    expect(data?.source).toBe("public");
    expect(data?.days.map((d) => d.level)).toEqual([0, 4, 4]);
  });

  // Worst case: no total reported, so it is summed from the days.
  it("sums the days when no total is provided", () => {
    expect(normalizePublic({ contributions: publicBody.contributions })?.total).toBe(11);
  });

  it.each([null, {}, { contributions: [] }])("returns null for %j", (body) => {
    expect(normalizePublic(body)).toBeNull();
  });
});

describe("fetchContributions", () => {
  // Best case: with a token, GraphQL is used and the token is sent as a bearer header.
  it("uses GraphQL when a token is provided", async () => {
    const fetchMock = jest.fn().mockResolvedValue(ok(graphqlBody));
    const data = await fetchContributions("me", "secret-token", fetchMock as unknown as typeof fetch);
    expect(data?.source).toBe("graphql");
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][0]).toBe("https://api.github.com/graphql");
    expect(fetchMock.mock.calls[0][1].headers.Authorization).toBe("Bearer secret-token");
  });

  // Best case: without a token, only the public API is called.
  it("uses the public API when there is no token", async () => {
    const fetchMock = jest.fn().mockResolvedValue(ok(publicBody));
    const data = await fetchContributions("me", undefined, fetchMock as unknown as typeof fetch);
    expect(data?.source).toBe("public");
    expect(fetchMock.mock.calls[0][0]).toContain("github-contributions-api");
  });

  // Worst case: a rejected/expired token must fall back to the public data rather than show nothing.
  it("falls back to the public API when GraphQL fails", async () => {
    const fetchMock = jest.fn().mockResolvedValueOnce(fail(401)).mockResolvedValueOnce(ok(publicBody));
    const data = await fetchContributions("me", "bad-token", fetchMock as unknown as typeof fetch);
    expect(data?.source).toBe("public");
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  // Worst case: network errors on both sources resolve to null instead of throwing.
  it("returns null when every source fails", async () => {
    const fetchMock = jest.fn().mockRejectedValue(new Error("network down"));
    await expect(fetchContributions("me", "t", fetchMock as unknown as typeof fetch)).resolves.toBeNull();
  });
});
