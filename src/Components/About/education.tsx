// "use client";

// import React, { useEffect, useState } from "react";
// import WrapperLayout from "../Layout/wrapperLayout";
// import EducationSkeleton from "../Skeletons/About/educationSkeleton";
// import { educationData } from "@/constants/about";
// export default function Education() {
//   const [isLoading, setIsLoading] = useState(true);

//   // Simulate loading delay
//   useEffect(() => {
//     const timer = setTimeout(() => setIsLoading(false), 1000); // Simulate 1 second loading
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <WrapperLayout firstPosition="Education" secondPosition="Journey">
//       {/* Timeline Layout */}
//       {isLoading ? (
//         <EducationSkeleton />
//       ) : (
//         <div className="relative flex flex-col items-start md:items-center">
//           {/* Vertical Timeline Line */}
//           <div className="absolute left-4 md:left-1/2 w-1 bg-gray-300 h-full z-0 mx-auto md:mx-0"></div>

//           {/* Education Items */}
//           <div className="w-full">
//             {educationData.map((item, index) => (
//               <div key={item.id} className="relative flex items-start md:items-center mb-12">
//                 {/* Education Card */}
//                 <div
//                   className={`w-full md:w-1/2 ${
//                     index % 2 === 0 ? "ml-auto md:mr-12" : "mr-auto md:ml-12"
//                   }`}
//                 >
//                   <div className="p-5 bg-gray-100 rounded-lg shadow-lg border-l-4 border-blue-500">
//                     <h2 className="text-lg sm:text-xl font-semibold text-gray-800">{item.course}</h2>
//                     <p className="text-sm sm:text-base text-gray-600">{item.college}</p>
//                     <span className="block mt-2 text-sm text-gray-500">{item.passingYear}</span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </WrapperLayout>
//   );
// }







"use client";

import React, { useEffect, useState } from "react";
import WrapperLayout from "../Layout/wrapperLayout";
import EducationSkeleton from "../Skeletons/About/educationSkeleton";
import { educationData } from "@/constants/about";

export default function Education() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000); // Simulate 1 second loading
    return () => clearTimeout(timer);
  }, []);

  return (
    <WrapperLayout firstPosition="Education" secondPosition="Journey">
      {isLoading ? (
        <EducationSkeleton />
      ) : (
        <div className="relative flex flex-col items-center w-full max-w-6xl px-4">
          {/* Timeline Vertical Line */}
          <div className="absolute  md:left-1/2 w-1 bg-gray-300 dark:bg-gray-600 h-full z-0"></div>

          {/* Education Cards */}
          <div className="w-full flex flex-col gap-8">
            {educationData.map((item, index) => (
              <div
                key={item.id}
                className={`relative w-full md:w-1/2 flex ${
                  index % 2 === 0 ? "ml-auto md:mr-12" : "mr-auto md:ml-12"
                }`}
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200">
                    {item.course}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                    {item.college}
                  </p>
                  <span className="block mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {item.passingYear}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </WrapperLayout>
  );
}
