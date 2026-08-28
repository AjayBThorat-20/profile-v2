"use client";

import { useEffect } from "react";

// Pulls any element carrying the `.magnetic` class toward the cursor
// when the pointer comes within its radius, and springs it back on
// release (the spring-back easing lives in globals.css's `.magnetic`
// transition, not here). Global rather than per-element: the elements
// that need this (navbar logo, social icons, theme toggle) already
// carry the class from earlier work, this just makes it do something.
const RADIUS_PADDING = 90;
const STRENGTH = 0.35;

export const useMagnetic = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const handleMove = (e: MouseEvent) => {
      const elements = document.querySelectorAll<HTMLElement>(".magnetic");
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const distance = Math.hypot(dx, dy);
        const radius = RADIUS_PADDING + Math.max(rect.width, rect.height) / 2;

        if (distance < radius) {
          el.style.transform = `translate(${dx * STRENGTH}px, ${dy * STRENGTH}px)`;
        } else if (el.style.transform) {
          el.style.transform = "";
        }
      });
    };

    // Mouse leaving the window entirely stops mousemove events without
    // ever firing one back inside the radius, which would otherwise
    // leave elements stuck mid-pull.
    const handleLeaveWindow = () => {
      document.querySelectorAll<HTMLElement>(".magnetic").forEach((el) => {
        el.style.transform = "";
      });
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleLeaveWindow);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeaveWindow);
      handleLeaveWindow();
    };
  }, []);
};
