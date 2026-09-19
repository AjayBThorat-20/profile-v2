import { describeDay, formatDay, groupIntoWeeks, monthLabels, type ContributionDay } from "@/lib/githubCalendar";

const day = (date: string, count = 0): ContributionDay => ({ date, count, level: count > 0 ? 1 : 0 });

// Builds `n` consecutive days starting at `start` (YYYY-MM-DD).
function run(start: string, n: number): ContributionDay[] {
  const out: ContributionDay[] = [];
  const d = new Date(`${start}T00:00:00Z`);
  for (let i = 0; i < n; i++) {
    out.push(day(d.toISOString().slice(0, 10)));
    d.setUTCDate(d.getUTCDate() + 1);
  }
  return out;
}

describe("groupIntoWeeks", () => {
  // Best case: a Sunday start needs no padding and fills whole columns.
  it("splits days into 7-day columns starting on Sunday", () => {
    const weeks = groupIntoWeeks(run("2026-09-06", 14)); // 2026-09-06 is a Sunday
    expect(weeks).toHaveLength(2);
    expect(weeks[0][0]?.date).toBe("2026-09-06");
    expect(weeks[1][6]?.date).toBe("2026-09-19");
  });

  // Worst case: starting mid-week must pad the first column so each day sits on its real weekday row.
  it("pads the first column so a Wednesday start lands on row 3", () => {
    const weeks = groupIntoWeeks(run("2026-09-09", 3)); // Wednesday
    expect(weeks[0].slice(0, 3)).toEqual([null, null, null]);
    expect(weeks[0][3]?.date).toBe("2026-09-09");
  });

  // Worst case: unsorted input must still produce chronological columns.
  it("sorts days before grouping", () => {
    const shuffled = [day("2026-09-08"), day("2026-09-06"), day("2026-09-07")];
    expect(groupIntoWeeks(shuffled)[0].map((d) => d?.date)).toEqual(["2026-09-06", "2026-09-07", "2026-09-08"]);
  });

  // Worst case: no data.
  it("returns no columns for an empty list", () => {
    expect(groupIntoWeeks([])).toEqual([]);
  });
});

describe("monthLabels", () => {
  // Best case: one label per month across a full year (Sep appears at both ends, like GitHub's own graph).
  it("labels each month once, in order", () => {
    const labels = monthLabels(groupIntoWeeks(run("2025-09-14", 371)));
    const names = labels.map((l) => l.label);
    expect(names).toEqual(["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"]);
  });

  // Worst case: a partial first month sitting right before the next month is dropped so labels never overlap.
  it("drops a first label that would collide with the next one", () => {
    // 2026-08-30 (Sun) - Aug only fills the first column; Sep starts in column 1 (gap < 3)
    const labels = monthLabels(groupIntoWeeks(run("2026-08-30", 60)));
    expect(labels[0].label).not.toBe("Aug");
    for (let i = 1; i < labels.length; i++) expect(labels[i].index - labels[i - 1].index).toBeGreaterThanOrEqual(3);
  });

  it("returns nothing when there are no weeks", () => {
    expect(monthLabels([])).toEqual([]);
  });
});

describe("day formatting", () => {
  // Worst case: dates must not shift a day in negative-UTC timezones.
  it("formats a date without timezone drift", () => {
    expect(formatDay("2026-01-01")).toBe("Jan 1, 2026");
  });

  it("describes zero, one and many contributions", () => {
    expect(describeDay(day("2026-09-01", 0))).toBe("No contributions on Sep 1, 2026");
    expect(describeDay(day("2026-09-01", 1))).toBe("1 contribution on Sep 1, 2026");
    expect(describeDay(day("2026-09-01", 5))).toBe("5 contributions on Sep 1, 2026");
  });
});
