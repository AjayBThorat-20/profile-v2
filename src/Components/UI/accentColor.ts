// Shared accent-color lookup, replacing the ~7 copy-pasted
// `getGradientColors(index)`-style helpers that used to cycle through a
// 4-color rainbow (blue/purple/green/orange) independent of the site's
// actual brand palette. Every class string here is a static literal so
// Tailwind's JIT scanner can always find it - never build a class name
// via template interpolation or `.replace()` on one of these strings,
// that's what made the old per-file helpers silently broken.

export type AccentToken = "primary" | "secondary" | "accent";

export interface AccentClasses {
  token: AccentToken;
  text: string;
  bg: string;
  bgSoft: string;
  border: string;
  borderStrong: string;
  groupHoverBorder: string;
  hoverBgSolid: string;
  timelineNode: string;
  badge: string;
}

const ACCENTS: Record<AccentToken, AccentClasses> = {
  primary: {
    token: "primary",
    text: "text-primary",
    bg: "bg-primary",
    bgSoft: "bg-primary/10",
    border: "border-primary/30",
    borderStrong: "border-primary/60",
    groupHoverBorder: "group-hover:border-primary/60",
    hoverBgSolid: "hover:bg-primary hover:text-primary-foreground",
    timelineNode: "timeline-node-primary",
    badge: "bg-primary/10 text-primary border-primary/20",
  },
  secondary: {
    token: "secondary",
    text: "text-secondary",
    bg: "bg-secondary",
    bgSoft: "bg-secondary/10",
    border: "border-secondary/30",
    borderStrong: "border-secondary/60",
    groupHoverBorder: "group-hover:border-secondary/60",
    hoverBgSolid: "hover:bg-secondary hover:text-secondary-foreground",
    timelineNode: "timeline-node-secondary",
    badge: "bg-secondary/10 text-secondary border-secondary/20",
  },
  accent: {
    token: "accent",
    text: "text-accent",
    bg: "bg-accent",
    bgSoft: "bg-accent/10",
    border: "border-accent/30",
    borderStrong: "border-accent/60",
    groupHoverBorder: "group-hover:border-accent/60",
    hoverBgSolid: "hover:bg-accent hover:text-accent-foreground",
    timelineNode: "timeline-node-accent",
    badge: "bg-accent/10 text-accent border-accent/20",
  },
};

const ORDER: AccentToken[] = ["primary", "secondary", "accent"];

export function getAccent(index: number): AccentClasses {
  return ACCENTS[ORDER[((index % ORDER.length) + ORDER.length) % ORDER.length]];
}
