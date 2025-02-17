export default function CertificationsSkeleton() {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl px-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="relative bg-gray-200 dark:bg-gray-700 rounded-xl shadow-lg p-6 flex flex-col items-center animate-pulse border border-gray-300 dark:border-gray-600"
          >
            <div className="w-full h-[250px] bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
            <div className="text-center mt-4">
              <div className="h-4 w-1/2 bg-gray-400 dark:bg-gray-500 rounded mb-2"></div>
              <div className="h-3 w-1/3 bg-gray-400 dark:bg-gray-500 rounded"></div>
            </div>
            <div className="mt-4 h-10 w-32 bg-gray-400 dark:bg-gray-500 rounded-lg"></div>
          </div>
        ))}
      </div>
    );
  }
  