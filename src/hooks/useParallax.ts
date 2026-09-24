"use client";

import { useEffect, RefObject } from "react";

// Drifts an element against the scroll direction, so it appears to sit on a
// plane slightly behind the page. `strength` is how far it travels per pixel
// scrolled - 0.05 means it lags the page by 5%, enough to read as depth and
// small enough that it never separates from the frame behind it.
//
// Written against a scroll listener + rAF rather than the newer
// `animation-timeline: scroll()` because that has no Safari support yet, and
// this is decoration that should degrade to "sits still" rather than to
// "sits still on some browsers and moves on others".
export function useParallax(
  ref: RefObject<HTMLElement | null>,
  strength = 0.05,
  enabled = true
) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Coarse pointers are phones, where the element fills most of the screen
    // and the effect mostly just knocks it out of alignment with its frame.
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let frame = 0;
    // The element's centre in document coordinates, measured with our own
    // transform cleared. Measuring it live inside the scroll handler - the
    // obvious way to write this - feeds the transform back into its own
    // input: getBoundingClientRect() reports the position *including* the
    // offset we just applied, so each frame reads its own output and the
    // element settles at a drifting fixed point instead of tracking scroll.
    // (Symptom: the same scroll position produced a different offset
    // depending on how you got there.) Measured once here, and again only on
    // resize, it stays a pure function of scrollY.
    let baseCentre = 0;
    let anchor = 0;

    const measure = () => {
      const previous = el.style.transform;
      el.style.transform = "";
      const rect = el.getBoundingClientRect();
      baseCentre = rect.top + window.scrollY + rect.height / 2;
      el.style.transform = previous;
      // Anchored to the top of the page rather than to wherever the visitor
      // happens to be when this mounts: at scrollY 0 the offset is exactly 0,
      // so the composition it belongs to (here, a photo sitting against an
      // offset ink frame) is pixel-aligned as designed on first paint, and
      // only pulls away once the page actually moves.
      anchor = baseCentre - window.innerHeight / 2;
    };

    const apply = () => {
      frame = 0;
      const viewportCentre = window.scrollY + window.innerHeight / 2;
      const offset = (baseCentre - viewportCentre - anchor) * -strength;
      el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (frame) cancelAnimationFrame(frame);
      el.style.transform = "";
    };
  }, [ref, strength, enabled]);
}
