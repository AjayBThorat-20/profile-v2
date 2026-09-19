// src/lib/githubCalendar.ts
// Client-safe types and pure helpers for the GitHub contribution graph.
// Anything that needs the API token lives in github.ts (server only).

export const GITHUB_USERNAME = "AjayBThorat-20";

export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export interface ContributionDay {
  /** YYYY-MM-DD, as returned by GitHub (no timezone shifting). */
  date: string;
  count: number;
  level: ContributionLevel;
}

export interface ContributionData {
  total: number;
  days: ContributionDay[];
  source: "graphql" | "public";
}

export type WeekColumn = (ContributionDay | null)[];

const parseUtc = (date: string) => new Date(`${date}T00:00:00Z`);

// Groups days into Sunday-first week columns, padding the first column with
// nulls so each day lands on its real weekday row (like GitHub's own graph).
export function groupIntoWeeks(days: ContributionDay[]): WeekColumn[] {
  if (days.length === 0) return [];
  const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date));
  const leadingBlanks = parseUtc(sorted[0].date).getUTCDay();
  const padded: WeekColumn = [...Array<null>(leadingBlanks).fill(null), ...sorted];
  const weeks: WeekColumn[] = [];
  for (let i = 0; i < padded.length; i += 7) weeks.push(padded.slice(i, i + 7));
  return weeks;
}

export interface MonthLabel {
  /** Zero-based week column the label sits above. */
  index: number;
  label: string;
}

const MIN_LABEL_GAP = 3;

// One label per month, placed over the first column of that month. A label
// that would sit closer than MIN_LABEL_GAP columns to the next one is dropped
// (this happens for the partial first month) so text never overlaps.
export function monthLabels(weeks: WeekColumn[]): MonthLabel[] {
  const labels: MonthLabel[] = [];
  let previousMonth = -1;
  weeks.forEach((week, index) => {
    const first = week.find((d): d is ContributionDay => d !== null);
    if (!first) return;
    const date = parseUtc(first.date);
    const month = date.getUTCMonth();
    if (month !== previousMonth) {
      labels.push({ index, label: date.toLocaleDateString("en-US", { month: "short", timeZone: "UTC" }) });
      previousMonth = month;
    }
  });
  return labels.filter((l, i) => i === labels.length - 1 || labels[i + 1].index - l.index >= MIN_LABEL_GAP);
}

export function formatDay(date: string): string {
  return parseUtc(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
}

export function describeDay(day: ContributionDay): string {
  const noun = day.count === 1 ? "contribution" : "contributions";
  return `${day.count === 0 ? "No" : day.count} ${noun} on ${formatDay(day.date)}`;
}
