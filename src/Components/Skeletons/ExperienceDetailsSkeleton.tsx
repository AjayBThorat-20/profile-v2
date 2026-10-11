import React from "react";
import Skeleton from "./Skeleton";

// Shape of Experience/experienceDetails.tsx: the back link, a header with the
// title, company, dates and logo tile, the tech tags, then the contents list
// beside the first sections.
export default function ExperienceDetailsSkeleton() {
  return (
    <div role="status" aria-label="Loading role details" className="relative min-h-screen pb-20">
      <div className="container-custom section">
        <div className="max-w-6xl mx-auto">
          <Skeleton className="h-3 w-32" />

          {/* Header */}
          <div className="mt-8 grid grid-cols-1 gap-8 border-b border-border pb-10 md:pb-12 lg:grid-cols-12 lg:items-end">
            <div className="space-y-5 lg:col-span-8">
              <Skeleton className="h-3 w-40" />
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-4 w-48" />
            </div>
            <Skeleton className="h-24 w-full max-w-64 rounded-lg lg:col-span-4 lg:justify-self-end" />
            <div className="flex flex-wrap gap-1.5 lg:col-span-12">
              {Array.from({ length: 8 }, (_, i) => (
                <Skeleton key={i} className="h-6 w-20" />
              ))}
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-12">
            {/* Contents list */}
            <div className="space-y-3 lg:col-span-3">
              <Skeleton className="h-3 w-24" />
              {Array.from({ length: 5 }, (_, i) => (
                <Skeleton key={i} className="hidden h-4 w-36 lg:block" />
              ))}
            </div>

            {/* First sections */}
            <div className="space-y-14 lg:col-span-9">
              {Array.from({ length: 2 }, (_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-3 w-10" />
                  <Skeleton className="h-9 w-1/2" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-11/12" />
                  <Skeleton className="h-3 w-4/5" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
