"use client";

import { useEffect, useState } from "react";
import { siteSections, siteSectionIds } from "@/constants/sections";
import { useActiveSection } from "@/hooks/useActiveSection";

// Pure wayfinding, not a nav control: a small fixed "03 / 05 — PROJECTS"
// label so a visitor always knows where they are on the long scroll,
// without a second clickable nav system competing with the full-screen
// menu overlay (which is the site's only interactive nav).
export default function SectionIndicator() {
  const { activeId, activeIndex } = useActiveSection(siteSectionIds);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const home = document.getElementById("home");
    if (!home) return;

    const handleScroll = () => {
      setShow(home.getBoundingClientRect().bottom <= window.innerHeight * 0.6);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const active = siteSections.find((s) => s.id === activeId) ?? siteSections[0];

  return (
    <div
      aria-hidden="true"
      className={`hidden md:flex fixed bottom-6 left-6 z-30 items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wide text-muted-foreground transition-all duration-300 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
      }`}
    >
      <span key={activeId} className="flex items-center gap-2 animate-fadeInSubtle">
        <span className="text-foreground">{String(activeIndex + 1).padStart(2, "0")}</span>
        <span>/</span>
        <span>{String(siteSections.length).padStart(2, "0")}</span>
        <span className="w-6 h-px bg-border"></span>
        <span>{active.label}</span>
      </span>
    </div>
  );
}
