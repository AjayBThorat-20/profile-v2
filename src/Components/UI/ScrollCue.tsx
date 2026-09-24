"use client";

import React from "react";

// "Keep going" hint under the hero: a hairline that runs down its own short
// track on a loop. A vertical rule rather than a bouncing chevron, because the
// page is already built out of hairlines and monospace meta - a chevron would
// be the only arrow-shaped ornament on the site.
export default function ScrollCue({ label = "Scroll" }: { label?: string }) {
  return (
    <div className="flex flex-col items-center gap-3" aria-hidden="true">
      <span className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </span>
      <span className="scroll-cue-track">
        <span className="scroll-cue-run" />
      </span>
    </div>
  );
}
