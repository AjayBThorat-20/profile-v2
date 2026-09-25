"use client";

import React from "react";
import { siteSections, siteSectionIds } from "@/constants/sections";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useAppSelector } from "@/store/hooks";

// The fixed section indicator that constants/sections.ts has always claimed
// as one of its three consumers ("the menu overlay, the section indicator,
// and the footer's anchor links") - the component itself had gone, leaving
// the menu overlay as the only way to tell where you were on a five-section
// page. It reads from the same useActiveSection observer the overlay uses, so
// the two can't disagree about which section is current.
//
// Desktop only: it lives in the left margin, which only exists once the
// container has gutters to spare, and a five-item rail floating over content
// on a phone is in the way rather than oriented.
export default function ChapterRail() {
  const { activeId } = useActiveSection(siteSectionIds);
  const isMenuOpen = useAppSelector((state) => state.theme.isMenuOpen);

  return (
    <nav
      aria-label="Page sections"
      // Hidden from the tab order while the menu is open: the overlay is the
      // same five links at full size, so leaving this in place would mean
      // tabbing through each destination twice.
      inert={isMenuOpen}
      className={`fixed left-4 xl:left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4 transition-opacity duration-300 ${
        isMenuOpen ? "opacity-0" : "opacity-100"
      }`}
    >
      {siteSections.map((section) => {
        const isActive = activeId === section.id;
        return (
          <a
            key={section.id}
            href={`/#${section.id}`}
            aria-current={isActive}
            className="chapter-link group flex items-center gap-3 py-1"
          >
            <span className="chapter-tick" aria-hidden="true" />
            {/* The label is the accessible name, not decoration. It used to be
                aria-hidden with aria-label="Home" on the link, which left the
                visible text ("01 Home") and the accessible name ("Home")
                disagreeing - Lighthouse flags that as a label/content mismatch,
                and it breaks voice control, where saying the words you can see
                has to activate the control. It stays readable to assistive tech
                while collapsed because it is clipped by max-width, not removed
                with display:none. */}
            <span
              className={`chapter-label font-mono text-[0.7rem] font-semibold uppercase tracking-[0.12em] ${
                isActive ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {section.index} {section.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
