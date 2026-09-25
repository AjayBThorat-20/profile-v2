"use client";

import { useEffect, useRef, useState } from "react";

const format = (totalSeconds: number) => {
  const h = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const s = String(Math.floor(totalSeconds % 60)).padStart(2, "0");
  return `${h}:${m}:${s}`;
};

// A running timecode readout, styled after a camera's on-screen REC display -
// ticks up from the moment the page mounted, reinforcing the "live" feel of the
// hero rather than a static screenshot.
//
// The tick is gated on the element being both on screen and in a visible tab.
// It previously ran forever: once the hero was scrolled past, or the tab was
// backgrounded, it was still re-rendering and repainting once a second for
// something nobody could see. It also means the page can actually go idle,
// which it never could before.
export default function LiveTimecode() {
  const [seconds, setSeconds] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let interval: ReturnType<typeof setInterval> | undefined;

    const stop = () => {
      if (interval) clearInterval(interval);
      interval = undefined;
    };

    const start = () => {
      if (interval) return;
      interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    };

    // Two independent reasons to pause, so both have to agree to run.
    let onScreen = true;
    const sync = () => (onScreen && !document.hidden ? start() : stop());

    const observer =
      typeof IntersectionObserver === "undefined"
        ? null
        : new IntersectionObserver(
            ([entry]) => {
              onScreen = entry.isIntersecting;
              sync();
            },
            { threshold: 0 },
          );

    observer?.observe(el);
    document.addEventListener("visibilitychange", sync);
    sync();

    return () => {
      stop();
      observer?.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return (
    <span ref={ref} className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
      <span className="rec-dot" aria-hidden="true" />
      REC {format(seconds)}
    </span>
  );
}
