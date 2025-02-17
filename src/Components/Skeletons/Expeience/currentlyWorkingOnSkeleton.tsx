export default function CurrentlyWorkingOnSkeleton() {
  return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
        {[1, 2, 3].map((id) => (
          <div key={id} className="flex flex-col">
            <div className="bg-white dark:bg-gray-800 w-full p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <div className="flex-grow pr-4">
                  {/* Placeholder for description */}
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
                {/* Placeholder for button */}
                <div className="h-8 w-8 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
  );
}