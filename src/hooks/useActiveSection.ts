"use client";

import { useEffect, useState } from "react";

export interface ActiveSection {
  activeId: string;
  activeIndex: number;
}

// Single shared IntersectionObserver over the page's top-level sections, so
// the menu overlay's active-link highlight and the corner SectionIndicator
// never disagree about which section is "current". Same trigger-band trick
// ChapterNav used per-route: rootMargin pulls the observed band to a thin
// strip around the vertical middle of the viewport, so whichever section is
// crossing the middle is "active" - not just "any pixel visible" (which
// would light up two sections at once on tall ones).
export function useActiveSection(ids: string[]): ActiveSection {
  const [activeId, setActiveId] = useState(ids[0]);

  useEffect(() => {
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  const activeIndex = Math.max(0, ids.indexOf(activeId));

  return { activeId, activeIndex };
}
