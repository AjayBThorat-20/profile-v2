export default function ContactSkeleton() {
    return (
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-2xl rounded-xl p-8 mx-auto animate-pulse">
        <div className="h-6 w-32 bg-gray-300 dark:bg-gray-700 rounded mb-4 mx-auto"></div>
        <div className="h-4 w-64 bg-gray-300 dark:bg-gray-700 rounded mb-6 mx-auto"></div>
  
        <div className="space-y-6">
          <div>
            <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
            <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
  
          <div>
            <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
            <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
          
          <div>
            <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
            <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
  
          <div>
            <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
            <div className="h-24 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
  
          <div className="h-12 w-full bg-blue-500/50 dark:bg-blue-400/50 rounded"></div>
        </div>
      </div>
    );
  }
  