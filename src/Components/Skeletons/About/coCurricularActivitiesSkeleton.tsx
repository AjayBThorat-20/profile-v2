export default function CoCurricularActivitiesSkeleton() {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="relative flex flex-col items-center justify-center p-6 rounded-xl shadow-lg bg-gray-300 dark:bg-gray-700 animate-pulse"
          >
            <div className="h-6 w-3/4 bg-gray-400 dark:bg-gray-500 rounded mb-2"></div>
            <div className="h-4 w-5/6 bg-gray-400 dark:bg-gray-500 rounded"></div>
          </div>
        ))}
      </div>
    );
  }
  