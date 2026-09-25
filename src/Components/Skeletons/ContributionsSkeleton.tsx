import React from "react";
import Skeleton from "./Skeleton";

// Mirrors the real heatmap's geometry (see Projects/githubContributions.tsx):
// the same 53 columns of 7 cells, the same --cell/--gap custom properties, the
// same month-label strip above and day-label column to the left. Matching the
// grid rather than showing one grey slab means the panel does not change shape
// when the data lands - the cells simply gain their values.
const WEEKS = 53;
const DAYS = 7;

export default function ContributionsSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading GitHub activity"
      className="overflow-x-auto pb-2"
    >
      <div className="inline-flex gap-2 min-w-max [--cell:11px] [--gap:3px] md:[--cell:13px]">
        {/* Day labels column */}
        <div
          className="grid pt-[calc(var(--cell)+var(--gap)+6px)]"
          style={{ gridTemplateRows: `repeat(${DAYS}, var(--cell))`, rowGap: "var(--gap)" }}
        >
          {Array.from({ length: DAYS }, (_, i) => (
            <div key={i} className="flex items-center">
              {/* Only three of the seven rows carry a label in the real graph. */}
              {i % 2 === 1 ? <Skeleton className="h-2 w-6" /> : null}
            </div>
          ))}
        </div>

        <div>
          {/* Month labels strip */}
          <div
            className="grid h-[calc(var(--cell)+6px)] items-center"
            style={{ gridTemplateColumns: `repeat(${WEEKS}, var(--cell))`, columnGap: "var(--gap)" }}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <Skeleton
                key={i}
                className="h-2 w-6"
                // Roughly every 4th column, as the month labels fall.
              />
            ))}
          </div>

          {/* The cells */}
          <div
            className="mt-[var(--gap)] grid"
            style={{
              gridTemplateRows: `repeat(${DAYS}, var(--cell))`,
              gridAutoFlow: "column",
              gridAutoColumns: "var(--cell)",
              gap: "var(--gap)",
            }}
          >
            {Array.from({ length: WEEKS * DAYS }, (_, i) => (
              <Skeleton key={i} className="rounded-[3px]" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
