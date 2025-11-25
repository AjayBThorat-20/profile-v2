// "use client";

// import React, { useEffect, useState } from "react";
// import { FaGraduationCap, FaCalendarAlt, FaUniversity } from "react-icons/fa";
// import { IoMdCheckmarkCircle } from "react-icons/io";
// import WrapperLayout from "../Layout/wrapperLayout";
// import EducationSkeleton from "../Skeletons/About/educationSkeleton";
// import { educationData } from "@/constants/about";

// export default function Education() {
//   const [isLoading, setIsLoading] = useState(true);
//   const [hoveredItem, setHoveredItem] = useState<number | null>(null);

//   useEffect(() => {
//     const timer = setTimeout(() => setIsLoading(false), 1000);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <WrapperLayout firstPosition="Education" secondPosition="Journey">
//       {isLoading ? (
//         <EducationSkeleton />
//       ) : (
//         <>
//           {/* Header Section */}
//           <div className="text-center mb-16 space-y-4">
//             <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 dark:bg-purple-900/20 rounded-full border border-purple-200 dark:border-purple-800">
//               <FaGraduationCap className="w-4 h-4 text-purple-600 dark:text-purple-400" />
//               <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
//                 Academic Background
//               </span>
//             </div>
//             <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
//               My educational foundation that shaped my journey in technology and innovation.
//             </p>
//           </div>
//               <div className="relative text-center mb-16 space-y-4">
//             {/* Timeline Vertical Line */}
//             <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-500 rounded-full shadow-lg"></div>

//             {/* Timeline Dots Animation */}
//             <div className="absolute left-4 md:left-1/2 top-0 w-1 h-full overflow-hidden">
//               <div className="absolute w-3 h-3 bg-white rounded-full -ml-1 animate-ping-slow opacity-50"></div>
//             </div>

//             {/* Education Cards */}
//             <div className="w-full flex flex-col gap-12 md:gap-16">
//               {educationData.map((item, index) => (
//                 <div
//                   key={item.id}
//                   className={`relative w-full flex ${
//                     index % 2 === 0 
//                       ? "md:flex-row flex-row" 
//                       : "md:flex-row-reverse flex-row"
//                   }`}
//                   style={{
//                     animation: `fadeIn 0.6s ease-out ${index * 0.15}s both`
//                   }}
//                   onMouseEnter={() => setHoveredItem(item.id)}
//                   onMouseLeave={() => setHoveredItem(null)}
//                 >
//                   {/* Timeline Node */}
//                   <div className={`absolute left-4 md:left-1/2 top-8 transform -translate-x-1/2 z-10 ${
//                     hoveredItem === item.id ? 'scale-125' : 'scale-100'
//                   } transition-transform duration-300`}>
//                     <div className="relative">
//                       {/* Outer Glow Ring */}
//                       <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 animate-ping-slower ${
//                         hoveredItem === item.id ? 'opacity-75' : 'opacity-0'
//                       } transition-opacity duration-300`}></div>
                      
//                       {/* Node Circle */}
//                       <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 shadow-xl flex items-center justify-center border-4 border-white dark:border-gray-900">
//                         <IoMdCheckmarkCircle className="w-5 h-5 text-white" />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Card Container */}
//                   <div className={`w-full md:w-[calc(50%-3rem)] ml-12 md:ml-0 ${
//                     index % 2 === 0 ? "md:mr-16" : "md:ml-16"
//                   }`}>
//                     <div className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl hover:shadow-2xl p-8 border-2 border-gray-100 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-500 transition-all duration-500 overflow-hidden transform hover:-translate-y-2">
//                       {/* Background Gradient */}
//                       <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
//                       {/* Shimmer Effect */}
//                       <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

//                       {/* Content */}
//                       <div className="relative space-y-4">
//                         {/* Year Badge */}
//                         <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg">
//                           <FaCalendarAlt className="w-4 h-4 text-white" />
//                           <span className="text-sm font-bold text-white">
//                             {item.passingYear}
//                           </span>
//                         </div>

//                         {/* Course Title */}
//                         <div className="space-y-2">
//                           <div className="flex items-start gap-3">
//                             <div className="p-2.5 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl shadow-md mt-1 flex-shrink-0">
//                               <FaGraduationCap className="w-6 h-6 text-white" />
//                             </div>
//                             <div className="flex-1">
//                               <h2 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
//                                 {item.course}
//                               </h2>
//                             </div>
//                           </div>
//                         </div>

//                         {/* College Name */}
//                         <div className="flex items-start gap-3 pt-2">
//                           <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mt-0.5 flex-shrink-0">
//                             <FaUniversity className="w-4 h-4 text-blue-600 dark:text-blue-400" />
//                           </div>
//                           <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
//                             {item.college}
//                           </p>
//                         </div>

//                         {/* Decorative Line */}
//                         <div className="pt-4">
//                           <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full group-hover:w-32 transition-all duration-500"></div>
//                         </div>
//                       </div>

//                       {/* Corner Accent */}
//                       <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//                     </div>

//                     {/* Connecting Line Animation */}
//                     <div className={`hidden md:block absolute top-8 ${
//                       index % 2 === 0 ? "left-full" : "right-full"
//                     } w-16 h-0.5 bg-gradient-to-r ${
//                       index % 2 === 0 
//                         ? "from-purple-400 to-transparent" 
//                         : "from-transparent to-purple-400"
//                     } ${hoveredItem === item.id ? 'opacity-100' : 'opacity-50'} transition-opacity duration-300`}></div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Bottom Completion Badge */}
//             <div className="mt-12 flex flex-col items-center gap-4 animate-fadeIn">
//               <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-xl flex items-center justify-center border-4 border-white dark:border-gray-900 animate-bounce-slow">
//                 <IoMdCheckmarkCircle className="w-7 h-7 text-white" />
//               </div>
//               <div className="text-center">
//                 <p className="text-sm font-bold text-gray-700 dark:text-gray-300">
//                   Education Journey Complete
//                 </p>
//                 <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
//                   Ready to make an impact
//                 </p>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </WrapperLayout>
//   );
// }















"use client";

import React, { useEffect, useState } from "react";
import { FaGraduationCap, FaCalendarAlt, FaUniversity } from "react-icons/fa";
import { IoMdCheckmarkCircle } from "react-icons/io";
import WrapperLayout from "../Layout/wrapperLayout";
import EducationSkeleton from "../Skeletons/About/educationSkeleton";
import { educationData } from "@/constants/about";

export default function Education() {
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <WrapperLayout firstPosition="Education" secondPosition="Journey">
      {isLoading ? (
        <EducationSkeleton />
      ) : (
        <>
          {/* Header Section */}
          <div className="text-center mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 dark:bg-purple-900/20 rounded-full border border-purple-200 dark:border-purple-800">
              <FaGraduationCap className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                Academic Background
              </span>
            </div>
            <p className="text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              My educational foundation that shaped my journey in technology and innovation.
            </p>
          </div>

          <div className="relative text-center mb-16 space-y-4 max-w-7xl justify-center mx-auto">
            {/* Timeline Vertical Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-500 rounded-full shadow-md"></div>

            {/* Timeline Dots Animation */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 w-0.5 h-full overflow-hidden">
              <div className="absolute w-2 h-2 bg-white rounded-full -ml-[3px] animate-ping-slow opacity-50"></div>
            </div>

            {/* Education Cards */}
            <div className="w-full flex flex-col gap-10">
              {educationData.map((item, index) => (
                <div
                  key={item.id}
                  className={`relative w-full flex ${
                    index % 2 === 0 
                      ? "md:flex-row justify-start" 
                      : "md:flex-row-reverse justify-start"
                  }`}
                  style={{
                    animation: `fadeIn 0.6s ease-out ${index * 0.15}s both`
                  }}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {/* Timeline Node */}
                  <div className={`absolute left-1/2 transform -translate-x-1/2 top-6 z-10 ${
                    hoveredItem === item.id ? 'scale-125' : 'scale-100'
                  } transition-transform duration-300`}>
                    <div className="relative">
                      {/* Outer Glow Ring */}
                      <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 animate-ping-slower ${
                        hoveredItem === item.id ? 'opacity-75' : 'opacity-0'
                      } transition-opacity duration-300`}></div>
                      
                      {/* Node Circle */}
                      <div className="relative w-6 h-6 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg flex items-center justify-center border-3 border-white dark:border-gray-900">
                        <IoMdCheckmarkCircle className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Card Container */}
                  <div className={`w-full md:w-[calc(50%-2rem)] ${
                    index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                  }`}>
                    <div className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg hover:shadow-xl p-5 border border-gray-100 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-500 transition-all duration-500 overflow-hidden transform hover:-translate-y-1">
                      {/* Background Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      {/* Shimmer Effect */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                      {/* Content */}
                      <div className="relative space-y-3">
                        {/* Year Badge */}
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-md">
                          <FaCalendarAlt className="w-3 h-3 text-white" />
                          <span className="text-xs font-bold text-white">
                            {item.passingYear}
                          </span>
                        </div>

                        {/* Course Title */}
                        <div className="flex items-start gap-2.5">
                          <div className="p-2 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg shadow-md mt-0.5 flex-shrink-0">
                            <FaGraduationCap className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white leading-snug group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                              {item.course}
                            </h2>
                          </div>
                        </div>

                        {/* College Name */}
                        <div className="flex items-start gap-2.5 pt-1">
                          <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-md mt-0.5 flex-shrink-0">
                            <FaUniversity className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                            {item.college}
                          </p>
                        </div>

                        {/* Decorative Line */}
                        <div className="pt-2">
                          <div className="h-0.5 w-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full group-hover:w-24 transition-all duration-500"></div>
                        </div>
                      </div>

                      {/* Corner Accent */}
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-500/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>

                    {/* Connecting Line Animation */}
                    <div className={`hidden md:block absolute top-6 ${
                      index % 2 === 0 ? "right-0 translate-x-full" : "left-0 -translate-x-full"
                    } w-10 h-0.5 bg-gradient-to-r ${
                      index % 2 === 0 
                        ? "from-purple-400 to-transparent" 
                        : "from-transparent to-purple-400"
                    } ${hoveredItem === item.id ? 'opacity-100' : 'opacity-50'} transition-opacity duration-300`}></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Completion Badge */}
            <div className="mt-8 flex flex-col items-center gap-3 animate-fadeIn">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg flex items-center justify-center border-3 border-white dark:border-gray-900 animate-bounce-slow">
                <IoMdCheckmarkCircle className="w-6 h-6 text-white" />
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-gray-700 dark:text-gray-300">
                  Education Journey Complete
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Ready to make an impact
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </WrapperLayout>
  );
}