"use client";

import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface CountUpProps {
  /** The finished figure, exactly as it should read: "4+", "500+", "1.8+", "3.22 GW". */
  value: string;
  className?: string;
  durationMs?: number;
}

// Splits "500+" into "" / "500" / "+" so only the numeric middle is animated
// and whatever decorates it survives untouched. Anything that doesn't contain
// a number at all falls through and is rendered as-is.
const FIGURE = /^([^\d]*)([\d.,]+)(.*)$/;

// useLayoutEffect on the client, useEffect on the server - the count has to be
// seeded before the browser paints (see below), but useLayoutEffect on the
// server logs a warning and does nothing useful.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Expo-out: the same curve as every entrance on the site (globals.css), so the
// numbers decelerate the way the panels around them do.
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

export default function CountUp({ value, className = "", durationMs = 1400 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isRevealed = useScrollReveal(ref as React.RefObject<HTMLElement>);
  const prefersReducedMotion = usePrefersReducedMotion();
  const hasRunRef = useRef(false);

  const parsed = FIGURE.exec(value);

  // The rendered text is always the FINISHED figure, and the count is written
  // over it imperatively. Rendering a "0" that React later updates would mean
  // the server HTML and the first client render disagree (a hydration error),
  // and would leave crawlers and no-JS visitors reading 0 instead of the real
  // number. Seeding happens in a layout effect, before paint, so nobody sees
  // the final value flash first.
  useIsomorphicLayoutEffect(() => {
    if (!parsed || hasRunRef.current) return;
    const el = ref.current;
    if (!el) return;
    // matchMedia is read directly here rather than through
    // usePrefersReducedMotion: that hook reports false on the first render and
    // only corrects in an effect, which runs AFTER this layout effect. Trusting
    // it here seeded zeros for reduced-motion visitors, and the animation that
    // would have replaced them is exactly what reduced motion then skipped -
    // so the figures sat on "0+" and "0.0+" permanently.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const [, prefix, digits, suffix] = parsed;
    el.textContent = `${prefix}${digits.replace(/[\d]/g, "0")}${suffix}`;
  }, [parsed]);

  // Belt and braces for the same failure: if the preference flips to reduce
  // (a system setting changed mid-visit, say) before the count has run, put the
  // finished figure back rather than leaving whatever frame it stopped on.
  useEffect(() => {
    if (!prefersReducedMotion || !ref.current) return;
    ref.current.textContent = value;
  }, [prefersReducedMotion, value]);

  useEffect(() => {
    if (!parsed || !isRevealed || prefersReducedMotion || hasRunRef.current) return;
    const el = ref.current;
    if (!el) return;

    hasRunRef.current = true;
    const [, prefix, digits, suffix] = parsed;
    const target = parseFloat(digits.replace(/,/g, ""));
    if (!Number.isFinite(target)) {
      el.textContent = value;
      return;
    }

    // Decimal places and thousands separators are copied from how the source
    // string was written, so "1.8+" counts through 0.4, 1.1, 1.8 rather than
    // snapping between whole numbers, and "12,000" keeps its comma.
    const decimals = (digits.split(".")[1] || "").length;
    const grouped = digits.includes(",");
    const format = (n: number) =>
      `${prefix}${n.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
        useGrouping: grouped,
      })}${suffix}`;

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / durationMs);
      el.textContent = format(target * easeOutExpo(progress));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        // Land on the original string rather than a re-formatted number, so
        // the finished figure is character-for-character what was passed in.
        el.textContent = value;
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isRevealed, parsed, prefersReducedMotion, value, durationMs]);

  // tabular-nums stops the figure jittering horizontally while it counts -
  // proportional digits are different widths, so the number would visibly
  // twitch on every frame without it.
  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {value}
    </span>
  );
}
