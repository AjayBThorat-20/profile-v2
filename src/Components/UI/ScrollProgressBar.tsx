"use client";

import { useScrollProgress } from "@/hooks/useScrollReveal";

// A thin reading-progress bar pinned to the top of the viewport.
export default function ScrollProgressBar() {
  const progress = useScrollProgress();

  return (
    <div
      className="fixed top-0 left-0 right-0 z-60 h-0.5 bg-transparent pointer-events-none"
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress)}
    >
      {/* scaleX, not width: this updates on every scroll frame, and
          animating `width` forces layout + paint each time while a
          transform stays on the compositor. origin-left so it grows from
          the left edge rather than out of the centre. */}
      <div
        className="h-full w-full origin-left bg-foreground transition-transform duration-150 ease-out"
        style={{ transform: `scaleX(${progress / 100})` }}
      />
    </div>
  );
}
