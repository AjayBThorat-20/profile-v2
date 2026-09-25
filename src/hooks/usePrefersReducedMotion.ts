"use client";

import { useSyncExternalStore } from "react";

// Shared reduced-motion check for effects that CSS alone can't switch off.
// globals.css already collapses every CSS transition/animation under
// `prefers-reduced-motion: reduce`, but that rule can't reach motion driven
// from JS - a requestAnimationFrame parallax loop, a counting numeral, a
// setInterval carousel - so anything of that kind reads this instead.
//
// useSyncExternalStore, not useState + useEffect: a media query IS an external
// store, and this is the API built for subscribing to one. The effect version
// called setState during the effect to seed the initial value, which schedules
// a second render pass on every mount - React's own lint rule flags it, and
// with this hook used by several components it was a cascade of avoidable
// re-renders. It also makes the server snapshot explicit rather than implicit.
const QUERY = "(prefers-reduced-motion: reduce)";

const subscribe = (onChange: () => void) => {
  const query = window.matchMedia(QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

const getSnapshot = () => window.matchMedia(QUERY).matches;

// The server has no media queries. false is the right answer there because the
// unanimated state of every consumer is also its finished state, so a
// reduced-motion visitor never sees a flash of the "before" frame while the
// client snapshot catches up.
const getServerSnapshot = () => false;

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
