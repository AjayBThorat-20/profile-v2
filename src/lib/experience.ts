import { experienceData } from "@/constants/experience";

const MS_PER_YEAR = 1000 * 60 * 60 * 24 * 365.25;

// Career span from the earliest role's start date to today - not a sum of
// individual role durations - so it reads the way "X years of experience"
// is meant on a resume, and updates on its own as time passes instead of
// needing a hand-edited number touched up every few months.
export function getYearsOfExperience(): number {
  const earliestStart = Math.min(
    ...experienceData.map((exp) => new Date(exp.startDate).getTime())
  );
  return (Date.now() - earliestStart) / MS_PER_YEAR;
}

// Formatted for display, e.g. "2.5+".
export function getYearsOfExperienceLabel(): string {
  return `${getYearsOfExperience().toFixed(1)}+`;
}
