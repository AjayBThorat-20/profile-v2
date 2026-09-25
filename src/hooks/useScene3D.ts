"use client";

import { useEffect, RefObject } from "react";

// Turns an element into a pointer-aware 3D scene by publishing the pointer's
// position within it as two CSS custom properties, --px and --py, each a
// number from -1 to 1 with 0,0 at the centre. The CSS decides what to do with
// them (see .stage-3d in globals.css), so the rotation can be retuned - or
// switched off for one section - without touching this file.
//
// Values are eased toward the pointer rather than snapped to it: a raw
// mousemove-to-transform mapping makes the scene twitch with every jitter of
// the hand, while easing gives the weight the rest of the site's motion has.
//
// The animation loop only runs while there is distance left to travel. It
// starts on pointer entry and stops once the scene has settled back to square
// after the pointer leaves, so an idle page costs nothing.
export function useScene3D(
  ref: RefObject<HTMLElement | null>,
  { easing = 0.09, enabled = true }: { easing?: number; enabled?: boolean } = {}
) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // No pointer to follow on touch devices, and a scene that reacts to taps
    // instead reads as a glitch.
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let frame = 0;

    const step = () => {
      currentX += (targetX - currentX) * easing;
      currentY += (targetY - currentY) * easing;

      el.style.setProperty("--px", currentX.toFixed(4));
      el.style.setProperty("--py", currentY.toFixed(4));

      // Below this the movement is sub-pixel; keeping the loop alive for it
      // would mean burning a frame callback forever on an idle page.
      if (Math.abs(targetX - currentX) > 0.001 || Math.abs(targetY - currentY) > 0.001) {
        frame = requestAnimationFrame(step);
      } else {
        frame = 0;
      }
    };

    const wake = () => {
      if (!frame) frame = requestAnimationFrame(step);
    };

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      // Clamped: the listener is on the window so the scene keeps responding
      // as the pointer approaches from outside, but without the rotation
      // running away once it is far past the edges.
      targetX = Math.max(-1, Math.min(1, ((e.clientX - rect.left) / rect.width - 0.5) * 2));
      targetY = Math.max(-1, Math.min(1, ((e.clientY - rect.top) / rect.height - 0.5) * 2));
      wake();
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
      wake();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
      el.style.removeProperty("--px");
      el.style.removeProperty("--py");
    };
  }, [ref, easing, enabled]);
}
