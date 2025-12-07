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

          <div className="relative max-w-6xl mx-auto">
            {/* Timeline Vertical Line - extends to completion badge */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 h-[93%] w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-500 rounded-full shadow-md"></div>

            {/* Education Cards */}
            <div className="w-full flex flex-col gap-8 lg:gap-12 py-4">
              {educationData.map((item, index) => (
                <div
                  key={item.id}
                  className={`relative w-full flex ${
                    index % 2 === 0 ? "lg:justify-start justify-center" : "lg:justify-end justify-center"
                  }`}
                  style={{
                    animation: `fadeIn 0.6s ease-out ${index * 0.15}s both`
                  }}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {/* Timeline Node */}
                  <div className={`absolute left-1/2 transform -translate-x-1/2 top-6 lg:top-8 z-10 ${
                    hoveredItem === item.id ? 'scale-125' : 'scale-100'
                  } transition-transform duration-300`}>
                    <div className="relative">
                      <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 animate-ping-slower ${
                        hoveredItem === item.id ? 'opacity-75' : 'opacity-0'
                      } transition-opacity duration-300`}></div>
                      <div className="relative w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg flex items-center justify-center border-2 lg:border-3 border-white dark:border-gray-900">
                        <IoMdCheckmarkCircle className="w-3 h-3 lg:w-4 lg:h-4 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Card Container */}
                  <div className={`w-full max-w-[280px] sm:max-w-[340px] md:max-w-[380px] lg:w-[45%] lg:max-w-none px-3 sm:px-0 ${
                    index % 2 === 0 ? "lg:pr-8" : "lg:pl-8"
                  }`}>
                    <div className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl lg:rounded-2xl shadow-lg hover:shadow-2xl p-5 lg:p-6 border border-gray-100 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-500 transition-all duration-500 overflow-hidden transform hover:-translate-y-1">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                      <div className="relative space-y-3 lg:space-y-4">
                        {/* Checkmark Icon - Mobile/Tablet only, above year badge */}
                        <div className="lg:hidden flex justify-center -mb-2">
                          <div className="bg-white dark:bg-gray-800 rounded-full p-1 shadow-md">
                            <IoMdCheckmarkCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                          </div>
                        </div>

                        {/* Year Badge */}
                        <div className="flex justify-center lg:justify-start">
                          <div className="inline-flex items-center gap-1.5 px-3 lg:px-4 py-1 lg:py-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-md">
                            <FaCalendarAlt className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-white" />
                            <span className="text-xs lg:text-sm font-bold text-white">
                              {item.passingYear}
                            </span>
                          </div>
                        </div>

                        {/* Course Title with Icon */}
                        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-2 lg:gap-3 text-center lg:text-left">
                          <div className="p-2 lg:p-2.5 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg lg:rounded-xl shadow-md flex-shrink-0">
                            <FaGraduationCap className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <h2 className="text-base lg:text-lg font-bold text-gray-900 dark:text-white leading-snug group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                              {item.course}
                            </h2>
                          </div>
                        </div>

                        {/* College Name with Icon */}
                        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-2 lg:gap-3 pt-1 text-center lg:text-left">
                          <div className="p-1.5 lg:p-2 bg-blue-100 dark:bg-blue-900/30 rounded-md lg:rounded-lg flex-shrink-0">
                            <FaUniversity className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <p className="text-xs lg:text-sm text-gray-700 dark:text-gray-300 leading-relaxed px-2 lg:px-0">
                            {item.college}
                          </p>
                        </div>

                        {/* Decorative Line */}
                        <div className="pt-2 flex justify-center lg:justify-start">
                          <div className="h-0.5 w-16 lg:w-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full group-hover:w-24 lg:group-hover:w-28 transition-all duration-500"></div>
                        </div>
                      </div>

                      <div className="absolute top-0 right-0 w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-purple-500/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Completion Badge */}
            <div className="mt-8 lg:mt-12 flex flex-col items-center animate-fadeIn pb-6 lg:pb-8">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg flex items-center justify-center border-3 lg:border-4 border-white dark:border-gray-900 animate-bounce-slow">
                <IoMdCheckmarkCircle className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
              </div>
              <div className="text-center px-4 mt-3 lg:mt-4">
                <p className="text-sm lg:text-base font-bold text-gray-700 dark:text-gray-300 leading-tight">
                  Education Journey Complete
                </p>
                <p className="text-xs lg:text-sm text-gray-500 dark:text-gray-400 mt-1 leading-tight">
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