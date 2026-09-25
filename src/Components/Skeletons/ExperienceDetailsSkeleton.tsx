import React from "react";
import Skeleton from "./Skeleton";

// Shape of Experience/experienceDetails.tsx: a bordered header card carrying
// the eyebrow, title, company link and duration, then the detail sections, then
// the back link.
export default function ExperienceDetailsSkeleton() {
  return (
    <div role="status" aria-label="Loading role details" className="relative min-h-screen pb-20">
      <div className="container-custom section">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header card */}
          <div className="panel rounded-lg p-8 md:p-10 border-l-4 border-l-primary space-y-6">
            <Skeleton className="h-3 w-36" />
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-4 w-48" />
            <div className="flex flex-wrap gap-2 pt-2">
              {Array.from({ length: 6 }, (_, i) => (
                <Skeleton key={i} className="h-7 w-20 rounded-full" />
              ))}
            </div>
          </div>

          {/* Detail sections */}
          {Array.from({ length: 2 }, (_, i) => (
            <div key={i} className="panel rounded-lg p-8 space-y-4">
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-11/12" />
              <Skeleton className="h-3 w-4/5" />
              <Skeleton className="aspect-video w-full rounded-lg" />
            </div>
          ))}

          <div className="flex justify-center pt-8">
            <Skeleton className="h-14 w-56 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
