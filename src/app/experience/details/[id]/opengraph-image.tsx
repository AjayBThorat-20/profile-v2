import { notFound } from "next/navigation";
import { experienceData } from "@/constants/experience";
import { renderOgCard } from "@/lib/ogCard";

// Per-role link-preview card, so a shared /experience/details link shows the
// role and company instead of the generic site card (or, as before, a small
// company logo stretched into a 1200x630 slot).
export const alt = "Ajay Thorat, experience details";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Built at compile time for the same ids as the page; anything else 404s.
export function generateStaticParams() {
  return experienceData.map((exp) => ({ id: String(exp.id) }));
}
export const dynamicParams = false;

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const experience = experienceData.find((exp) => exp.id === Number(id));
  if (!experience) notFound();

  const stack = experience.techStack
    .split(",")
    .slice(0, 3)
    .map((tech) => tech.replace(/\s*\(.*?\)/, "").trim())
    .join(" · ");

  return renderOgCard({
    eyebrow: "AJAY THORAT · EXPERIENCE",
    title: experience.title,
    titleSize: 68,
    subtitle: experience.shortName,
    meta: experience.duration.replace(" - ", " – "),
    footnote: stack,
  });
}
