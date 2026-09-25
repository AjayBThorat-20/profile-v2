import React from "react";
import Skeleton from "./Skeleton";

// Matches CompanyReviews' real layout: an eyebrow + heading, a three-up stats
// row, then a two-column grid of review cards.
//
// It replaces a centred spinner in a min-h-100 box. A spinner says "something
// is happening" but reserves the wrong amount of space, so the whole section
// jumped when the reviews arrived. Holding the finished shape means the load
// resolves in place.
export default function ReviewsSkeleton() {
  return (
    <div role="status" aria-label="Loading team reviews" className="container-custom section">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col items-center space-y-4">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-9 w-72 max-w-full" />
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="panel rounded-lg p-6 space-y-3">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-3 w-28" />
            </div>
          ))}
        </div>

        {/* Review cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {Array.from({ length: 2 }, (_, i) => (
            <div key={i} className="entry-card p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-3 w-1/4" />
                </div>
              </div>
              <div className="space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-11/12" />
                <Skeleton className="h-3 w-4/5" />
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
