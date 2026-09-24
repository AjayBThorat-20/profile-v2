"use client";

import { useEffect, useState } from "react";

// Shared reduced-motion check for effects that CSS alone can't switch off.
// globals.css already collapses every CSS transition/animation under
// `prefers-reduced-motion: reduce`, but that rule can't reach motion driven
// from JS - a requestAnimationFrame parallax loop, a counting numeral, a
// setInterval carousel - so anything of that kind reads this instead.
//
// Starts false and corrects on mount rather than reading matchMedia during
// render: the server has no media queries, so reading it inline would make
// the first client render disagree with the server HTML and hydration would
// mismatch. Effects gate on it, and their unanimated state is always the
// finished state (full value, no offset), so a reduced-motion visitor never
// sees a flash of the "before" frame.
export function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(query.matches);

    const onChange = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return prefersReduced;
}
