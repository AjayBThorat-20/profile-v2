"use client";

import { useScrollProgress } from "@/hooks/useScrollReveal";

// A thin reading-progress bar pinned to the top of the viewport.
export default function ScrollProgressBar() {
  const progress = useScrollProgress();

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-transparent pointer-events-none">
      <div
        className="h-full bg-foreground transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
