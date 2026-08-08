export default function CoCurricularActivitiesSkeleton() {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="relative flex flex-col items-center justify-center p-6 rounded-xl shadow-lg bg-card border border-border animate-pulse"
          >
            <div className="h-6 w-3/4 bg-muted rounded mb-2"></div>
            <div className="h-4 w-5/6 bg-muted rounded"></div>
          </div>
        ))}
      </div>
    );
  }
  