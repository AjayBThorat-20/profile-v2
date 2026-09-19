// src/lib/github.ts
// Server-only: fetches the contribution calendar. Uses GitHub's GraphQL API
// when GITHUB_TOKEN is set (the only way to include private and organisation
// contributions), otherwise falls back to a public no-token API. The token is
// read on the server and never sent to the browser.

import { GITHUB_USERNAME, type ContributionData, type ContributionDay, type ContributionLevel } from "@/lib/githubCalendar";

const REVALIDATE_SECONDS = 1800;
const TIMEOUT_MS = 8000;

const GRAPHQL_LEVELS: Record<string, ContributionLevel> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

const GRAPHQL_QUERY = `query($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks { contributionDays { date contributionCount contributionLevel } }
      }
    }
  }
}`;

interface GraphqlResponse {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          totalContributions: number;
          weeks: { contributionDays: { date: string; contributionCount: number; contributionLevel: string }[] }[];
        };
      };
    } | null;
  };
}

interface PublicResponse {
  total?: Record<string, number>;
  contributions?: { date: string; count: number; level: number }[];
}

const clampLevel = (n: number): ContributionLevel => (n >= 4 ? 4 : n <= 0 ? 0 : (Math.floor(n) as ContributionLevel));

export function normalizeGraphql(json: unknown): ContributionData | null {
  const calendar = (json as GraphqlResponse)?.data?.user?.contributionsCollection?.contributionCalendar;
  if (!calendar || !Array.isArray(calendar.weeks)) return null;
  const days: ContributionDay[] = calendar.weeks.flatMap((week) =>
    week.contributionDays.map((d) => ({
      date: d.date,
      count: d.contributionCount,
      level: GRAPHQL_LEVELS[d.contributionLevel] ?? 0,
    })),
  );
  if (days.length === 0) return null;
  return { total: calendar.totalContributions, days, source: "graphql" };
}

export function normalizePublic(json: unknown): ContributionData | null {
  const body = json as PublicResponse;
  if (!Array.isArray(body?.contributions) || body.contributions.length === 0) return null;
  const days: ContributionDay[] = body.contributions.map((d) => ({ date: d.date, count: d.count, level: clampLevel(d.level) }));
  const total = body.total?.lastYear ?? days.reduce((sum, d) => sum + d.count, 0);
  return { total, days, source: "public" };
}

type FetchLike = typeof fetch;

async function fromGraphql(username: string, token: string, fetchImpl: FetchLike): Promise<ContributionData | null> {
  const res = await fetchImpl("https://api.github.com/graphql", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", "User-Agent": "portfolio-contributions" },
    body: JSON.stringify({ query: GRAPHQL_QUERY, variables: { login: username } }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (!res.ok) return null;
  return normalizeGraphql(await res.json());
}

async function fromPublicApi(username: string, fetchImpl: FetchLike): Promise<ContributionData | null> {
  const res = await fetchImpl(`https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`, {
    signal: AbortSignal.timeout(TIMEOUT_MS),
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (!res.ok) return null;
  return normalizePublic(await res.json());
}

export async function fetchContributions(
  username: string = GITHUB_USERNAME,
  token: string | undefined = process.env.GITHUB_TOKEN,
  fetchImpl: FetchLike = fetch,
): Promise<ContributionData | null> {
  if (token) {
    const data = await fromGraphql(username, token, fetchImpl).catch(() => null);
    if (data) return data;
  }
  return fromPublicApi(username, fetchImpl).catch(() => null);
}
