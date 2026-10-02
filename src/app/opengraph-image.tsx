import { renderOgCard } from "@/lib/ogCard";

// Site-wide link-preview card. As a file-based opengraph-image it takes
// precedence over config metadata and is inherited by every route that
// doesn't define its own (see experience/details/[id]/opengraph-image.tsx).
export const alt = "Ajay Thorat, Full Stack Developer in Mumbai";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderOgCard({
    eyebrow: "FULL STACK DEVELOPER · MUMBAI",
    title: "Ajay Thorat",
    titleSize: 104,
    subtitle: "Building production web apps with Next.js, TypeScript and PostgreSQL.",
    footnote: "IndiaPharmaHub · Yantra · DevCompass",
  });
}
