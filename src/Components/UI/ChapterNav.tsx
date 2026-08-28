"use client";

import { useEffect, useState } from "react";

export interface ChapterNavItem {
  id: string;
  index: string;
  label: string;
}

// Lists a page's numbered sections (the same 01/02/03 labels each
// section already renders via SectionEyebrow) so a long page can be
// jumped around instead of only scrolled - nabilissa.com's "chapter"
// navigation, adapted to this site's per-route pages instead of one
// long scroll. Two layouts sharing one active-section tracker:
// - Desktop (md+): a fixed, vertically-centered floating rail on the
//   left edge of the viewport. Only shown once scroll has actually
//   reached the first tracked section - a floating rail present from
//   the very top of the page would sit vertically centered over
//   whatever hero content (e.g. a portrait photo) happens to be there,
//   which has nothing to do with chapter navigation yet.
// - Mobile: the horizontal scrollable strip sticky under the navbar -
//   a left-edge floating rail would eat too much width on a narrow
//   screen, so mobile keeps the row layout instead.
export default function ChapterNav({ items }: { items: ChapterNavItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id);
  const [showRail, setShowRail] = useState(false);

  useEffect(() => {
    const targets = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (targets.length === 0) return;

    // rootMargin pulls the "trigger band" to a thin strip around the
    // vertical middle of the viewport, so the active chapter is whichever
    // section is currently crossing the middle - not just "any pixel
    // visible", which would light up two chapters at once on tall sections.
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

    // Reveal the floating rail once the first tracked section has
    // reached the viewport (and hide it again if scrolled back above
    // it) - a plain scroll check rather than another IntersectionObserver
    // because this needs a monotonic "have we reached it yet" read on
    // every scroll tick, not a one-shot enter/exit toggle.
    const firstTarget = targets[0];
    const handleScroll = () => {
      setShowRail(firstTarget.getBoundingClientRect().top <= window.innerHeight * 0.75);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [items]);

  if (items.length === 0) return null;

  return (
    <>
      {/* Mobile: sticky horizontal strip under the navbar. */}
      <div className="md:hidden sticky top-17 z-30 bg-background/95 border-b border-border">
        <div className="container-custom">
          <nav className="overflow-x-auto hide-scrollbar py-3" aria-label="Section navigation">
            <div className="inline-flex items-center gap-1 bg-muted/60 rounded-full p-1">
              {items.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`flex-shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-mono text-xs font-semibold uppercase tracking-wide transition-all duration-200 ${
                    activeId === item.id
                      ? "bg-foreground text-background shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span>{item.index}</span>
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          </nav>
        </div>
      </div>

      {/* Desktop: floating vertical rail, pinned to the left edge and
          vertically centered - grouped in the same muted track/filled-tab
          treatment as the mobile row and the navbar, just stacked. */}
      <nav
        aria-label="Section navigation"
        className={`hidden md:flex fixed left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30 flex-col items-stretch gap-1 bg-muted/60 rounded-full p-1 transition-all duration-300 ${
          showRail ? "opacity-100 translate-x-0 pointer-events-auto" : "opacity-0 -translate-x-3 pointer-events-none"
        }`}
      >
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full font-mono text-xs font-semibold uppercase tracking-wide transition-all duration-200 ${
              activeId === item.id
                ? "bg-foreground text-background shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span>{item.index}</span>
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
    </>
  );
}
