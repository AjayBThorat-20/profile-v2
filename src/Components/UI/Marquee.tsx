"use client";

import React from "react";

interface MarqueeProps {
  items: string[];
  /** Seconds for one full loop. Longer = slower. */
  durationSec?: number;
  className?: string;
}

// Infinite horizontal ticker. The item list is rendered twice into one track;
// the CSS translates that track by exactly -50%, which lands copy 2 precisely
// where copy 1 began, so the loop has no visible seam or reset jump.
//
// The second copy is aria-hidden - it is the same words again, purely to make
// the geometry work, and a screen reader announcing the whole stack twice
// would be noise. The visible list is a plain <ul>, so the content is still
// real, readable text rather than an image or a canvas.
export default function Marquee({ items, durationSec = 48, className = "" }: MarqueeProps) {
  const row = (ariaHidden: boolean) => (
    <ul
      className="flex shrink-0 items-center"
      aria-hidden={ariaHidden || undefined}
    >
      {items.map((item) => (
        <li
          key={item}
          className="flex shrink-0 items-center gap-6 md:gap-8 px-6 md:px-8 font-mono text-xs md:text-sm uppercase tracking-[0.14em] text-muted-foreground"
        >
          <span>{item}</span>
          {/* Separator between entries - a small ink square, echoing the
              typographic bullets in the eyebrows rather than a slash. */}
          <span className="h-1 w-1 bg-foreground/40" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className={`marquee ${className}`}>
      <div className="marquee-track" style={{ animationDuration: `${durationSec}s` }}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
