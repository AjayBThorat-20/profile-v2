export default function EducationSkeleton() {
    return (
      <div className="relative flex flex-col items-start md:items-center">
        {/* Vertical Timeline Line */}
        <div className="absolute left-4 md:left-1/2 w-1 bg-gray-300 h-full z-0 mx-auto md:mx-0"></div>
  
        {/* Skeleton Items */}
        <div className="w-full">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="relative flex items-start md:items-center mb-12">
              <div
                className={`w-full md:w-1/2 ${
                  index % 2 === 0 ? "ml-auto md:mr-12" : "mr-auto md:ml-12"
                }`}
              >
                <div className="p-5 bg-gray-200 dark:bg-gray-700 rounded-lg shadow-lg border-l-4 border-gray-400 dark:border-gray-600 animate-pulse">
                  <div className="h-6 w-3/4 bg-gray-400 dark:bg-gray-500 rounded mb-2"></div>
                  <div className="h-4 w-full bg-gray-400 dark:bg-gray-500 rounded mb-2"></div>
                  <div className="h-4 w-1/3 bg-gray-400 dark:bg-gray-500 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  