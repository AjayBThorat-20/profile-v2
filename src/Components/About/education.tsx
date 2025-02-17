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
      {/* Timeline Layout */}
      {isLoading ? (
        <EducationSkeleton />
      ) : (
        <div className="relative flex flex-col items-start md:items-center">
          {/* Vertical Timeline Line */}
          <div className="absolute left-4 md:left-1/2 w-1 bg-gray-300 h-full z-0 mx-auto md:mx-0"></div>

          {/* Education Items */}
          <div className="w-full">
            {educationData.map((item, index) => (
              <div key={item.id} className="relative flex items-start md:items-center mb-12">
                {/* Education Card */}
                <div
                  className={`w-full md:w-1/2 ${
                    index % 2 === 0 ? "ml-auto md:mr-12" : "mr-auto md:ml-12"
                  }`}
                >
                  <div className="p-5 bg-gray-100 rounded-lg shadow-lg border-l-4 border-blue-500">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800">{item.course}</h2>
                    <p className="text-sm sm:text-base text-gray-600">{item.college}</p>
                    <span className="block mt-2 text-sm text-gray-500">{item.passingYear}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </WrapperLayout>
  );
}