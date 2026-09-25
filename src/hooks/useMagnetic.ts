"use client";

import { useEffect } from "react";

// Pulls any element carrying the `.magnetic` class toward the cursor when the
// pointer comes within its radius, and springs it back on release (the
// spring-back easing lives in globals.css's `.magnetic` transition, not here).
// Global rather than per-element: the elements that need this (navbar logo,
// social icons, theme toggle) already carry the class from earlier work, this
// just makes it do something.
const RADIUS_PADDING = 90;
const STRENGTH = 0.35;

export const useMagnetic = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Geometry is measured once per frame budget and cached, NOT per mousemove.
    // The previous version called querySelectorAll on every mousemove and then
    // getBoundingClientRect for each result, interleaved with writes to
    // style.transform - a read-after-write per element, which forces the
    // browser to flush layout synchronously on every iteration. With ~10
    // magnetic elements that is ~10 forced reflows per mouse event, at up to
    // 120 events a second, and it showed up as the bulk of the page's Style &
    // Layout time.
    //
    // Now: all reads happen together in measure(), all writes happen together
    // in apply(), and the cache is refreshed only when the geometry can
    // actually have changed (scroll, resize) or when the DOM changes.
    type Entry = { el: HTMLElement; cx: number; cy: number; radius: number };
    let entries: Entry[] = [];
    let measureQueued = false;
    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;

    const measure = () => {
      measureQueued = false;
      entries = Array.from(document.querySelectorAll<HTMLElement>(".magnetic")).map((el) => {
        // Measured with the pull removed, so a cached centre never includes the
        // offset this hook itself applied - the same feedback trap useParallax
        // had, where the element's own transform leaks into its next input.
        const previous = el.style.transform;
        el.style.transform = "";
        const rect = el.getBoundingClientRect();
        el.style.transform = previous;
        return {
          el,
          cx: rect.left + rect.width / 2,
          cy: rect.top + rect.height / 2,
          radius: RADIUS_PADDING + Math.max(rect.width, rect.height) / 2,
        };
      });
    };

    const queueMeasure = () => {
      if (measureQueued) return;
      measureQueued = true;
      requestAnimationFrame(measure);
    };

    const apply = () => {
      frame = 0;
      for (const { el, cx, cy, radius } of entries) {
        const dx = pointerX - cx;
        const dy = pointerY - cy;
        if (Math.hypot(dx, dy) < radius) {
          el.style.transform = `translate(${(dx * STRENGTH).toFixed(2)}px, ${(dy * STRENGTH).toFixed(2)}px)`;
        } else if (el.style.transform) {
          el.style.transform = "";
        }
      }
    };

    const handleMove = (e: MouseEvent) => {
      pointerX = e.clientX;
      pointerY = e.clientY;
      // Coalesced to one write pass per frame: several mousemove events can
      // land between paints, and only the last position matters.
      if (!frame) frame = requestAnimationFrame(apply);
    };

    // Mouse leaving the window entirely stops mousemove events without ever
    // firing one back inside the radius, which would otherwise leave elements
    // stuck mid-pull.
    const handleLeaveWindow = () => {
      for (const { el } of entries) el.style.transform = "";
    };

    measure();
    // Elements mount and unmount as sections reveal and routes change, so the
    // cached list has to be rebuilt when the DOM does.
    const observer = new MutationObserver(queueMeasure);
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("scroll", queueMeasure, { passive: true });
    window.addEventListener("resize", queueMeasure);
    document.documentElement.addEventListener("mouseleave", handleLeaveWindow);

    return () => {
      observer.disconnect();
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("scroll", queueMeasure);
      window.removeEventListener("resize", queueMeasure);
      document.documentElement.removeEventListener("mouseleave", handleLeaveWindow);
      if (frame) cancelAnimationFrame(frame);
      handleLeaveWindow();
    };
  }, []);
};
