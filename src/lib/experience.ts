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

// Production systems shipped, for the hero stat - counted from the data
// rather than typed in, since the hand-written "4+" sat unchanged while the
// real count doubled. Each "project N: ..." section of a role is one system
// (IndiaPharmaHub, Yantra, the HRMS, FNS, ExcelFlow, RealSync); a role with
// no per-project sections shipped one (the ShypBUDDY platform); plus
// DevCompass, the published npm CLI.
export function getProductionSystemsCount(): number {
  const fromRoles = experienceData.reduce((sum, exp) => {
    const projects = exp.details.filter((detail) => detail.title.startsWith("project")).length;
    return sum + Math.max(projects, 1);
  }, 0);
  return fromRoles + 1;
}

// Formatted for display, e.g. "2.5+". Floored, not rounded: "+" reads as
// "at least", so 1.85 years must show as "1.8+" - toFixed(1) would round it
// up to "1.9+" and overstate the figure.
export function getYearsOfExperienceLabel(): string {
  return `${(Math.floor(getYearsOfExperience() * 10) / 10).toFixed(1)}+`;
}
