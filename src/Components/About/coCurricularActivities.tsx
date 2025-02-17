"use client";

import React, { useEffect, useState } from "react";
import WrapperLayout from "../Layout/wrapperLayout";
import CoCurricularActivitiesSkeleton from "../Skeletons/About/coCurricularActivitiesSkeleton";
import { coCurricularActivitiesData } from "@/constants/about";

export default function CoCurricularActivities() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000); // Simulate 1 second loading
    return () => clearTimeout(timer);
  }, []);

  return (
    <WrapperLayout firstPosition="Co-Curricular" secondPosition="Activities">
      {/* Activities Grid */}
      {isLoading ? (
        <CoCurricularActivitiesSkeleton />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {coCurricularActivitiesData.map((activity) => (
            <div
              key={activity.id}
              className="relative flex flex-col items-center justify-center p-6 rounded-xl shadow-lg bg-gradient-to-br from-blue-500 to-purple-500 text-white transition-transform duration-300 transform hover:scale-105"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 opacity-0 hover:opacity-20 blur-xl transition-all duration-300"></div>

              {/* Activity Name */}
              <h3 className="relative z-10 font-bold text-lg sm:text-xl text-center">
                {activity.Name}
              </h3>

              {/* Description */}
              <p className="relative z-10 mt-2 text-sm sm:text-base text-gray-200 text-center">
                {activity.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </WrapperLayout>
  );
}