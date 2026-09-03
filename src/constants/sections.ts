// The five top-level scroll sections on the single-page site, in order.
// Shared by the menu overlay, the section indicator, and the footer's
// anchor links so they can never drift out of sync with each other.
export interface SiteSection {
  id: string;
  index: string;
  label: string;
}

export const siteSections: SiteSection[] = [
  { id: "home", index: "01", label: "Home" },
  { id: "about", index: "02", label: "About" },
  { id: "projects", index: "03", label: "Projects" },
  { id: "experience", index: "04", label: "Experience" },
  { id: "contact", index: "05", label: "Contact" },
];

export const siteSectionIds = siteSections.map((s) => s.id);
