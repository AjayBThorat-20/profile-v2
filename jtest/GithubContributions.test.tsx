import { render, screen } from "@testing-library/react";
import GithubContributions from "@/Components/Projects/githubContributions";

const sample = {
  total: 1234,
  source: "public",
  days: [
    { date: "2026-09-06", count: 0, level: 0 },
    { date: "2026-09-07", count: 3, level: 2 },
    { date: "2026-09-08", count: 1, level: 1 },
  ],
};

// jsdom has no fetch, so tests install a mock and restore the original afterwards.
const originalFetch = global.fetch;
const mockFetch = (impl: () => unknown) => {
  global.fetch = jest.fn(impl) as unknown as typeof fetch;
};

describe("GithubContributions", () => {
  afterEach(() => {
    global.fetch = originalFetch;
  });

  // Best case: shows the formatted total and one titled cell per day once data arrives.
  it("renders the total and the day cells from the API", async () => {
    mockFetch(async () => ({ ok: true, json: async () => sample }));
    render(<GithubContributions />);
    expect(await screen.findByText("1,234 contributions in the last year")).toBeInTheDocument();
    expect(screen.getByTitle("3 contributions on Sep 7, 2026")).toBeInTheDocument();
    expect(screen.getByTitle("1 contribution on Sep 8, 2026")).toBeInTheDocument();
    expect(screen.getByTitle("No contributions on Sep 6, 2026")).toBeInTheDocument();
  });

  // Best case: the profile link always points at the real GitHub profile.
  it("links to the GitHub profile", async () => {
    mockFetch(async () => ({ ok: true, json: async () => sample }));
    render(<GithubContributions />);
    const link = await screen.findByRole("link", { name: /AjayBThorat-20/ });
    expect(link).toHaveAttribute("href", "https://github.com/AjayBThorat-20");
  });

  // Worst case: while loading, a placeholder reserves the space and no fake total is shown.
  it("shows a loading placeholder before data arrives", () => {
    mockFetch(() => new Promise(() => {}));
    render(<GithubContributions />);
    expect(screen.getByLabelText("Loading GitHub activity")).toBeInTheDocument();
    expect(screen.getByText("Contributions in the last year")).toBeInTheDocument();
  });

  // Worst case: an API failure shows a fallback message with a link instead of breaking the page.
  it("shows a fallback message when the API fails", async () => {
    mockFetch(async () => ({ ok: false, status: 502, json: async () => ({}) }));
    render(<GithubContributions />);
    expect(await screen.findByText(/temporarily unavailable/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute("href", "https://github.com/AjayBThorat-20");
  });
});
