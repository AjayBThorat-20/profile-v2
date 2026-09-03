import { experienceData } from "@/constants/experience";

const MS_PER_YEAR = 1000 * 60 * 60 * 24 * 365.25;

// Sum of each role's own worked duration (startDate to endDate, or to now
// for the current role) - NOT the span from the earliest start to today.
// There are unemployed gaps between roles (e.g. ~6 months after the
// ShypBUDDY internship before Renewalytics started), and a plain span
// would count those idle months as experience. Summing durations instead
// only counts time actually on a role, and still updates on its own as
// time passes instead of needing a hand-edited number touched up every
// few months.
export function getYearsOfExperience(): number {
  const now = Date.now();
  const totalWorkedMs = experienceData.reduce((sum, exp) => {
    const start = new Date(exp.startDate).getTime();
    const end = exp.endDate ? new Date(exp.endDate).getTime() : now;
    return sum + Math.max(0, end - start);
  }, 0);
  return totalWorkedMs / MS_PER_YEAR;
}

// Formatted for display, e.g. "2.5+".
export function getYearsOfExperienceLabel(): string {
  return `${getYearsOfExperience().toFixed(1)}+`;
}
