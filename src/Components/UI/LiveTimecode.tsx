"use client";

import { useEffect, useState } from "react";

const format = (totalSeconds: number) => {
  const h = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const s = String(Math.floor(totalSeconds % 60)).padStart(2, "0");
  return `${h}:${m}:${s}`;
};

// A running timecode readout, styled after a camera's on-screen REC
// display — ticks up from the moment the page mounted, reinforcing the
// "live" feel of the hero rather than a static screenshot.
export default function LiveTimecode() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
      <span className="rec-dot" aria-hidden="true" />
      REC {format(seconds)}
    </span>
  );
}
