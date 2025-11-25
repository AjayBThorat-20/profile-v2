"use client";

import React, { useEffect, useState } from "react";
import WrapperLayout from "../Layout/wrapperLayout";
import CoCurricularActivitiesSkeleton from "../Skeletons/About/coCurricularActivitiesSkeleton";
import { coCurricularActivitiesData } from "@/constants/about";
import { FaFire, FaHandsHelping, FaLaptopCode, FaRocket } from "react-icons/fa";
import { IconType } from "react-icons";

export default function CoCurricularActivities() {
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredActivity, setHoveredActivity] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Map activity names to specific icons and colors
  const getActivityDetails = (activityName: string): { icon: IconType; gradient: { from: string; to: string } } => {
    const activityMap: Record<string, { icon: IconType; gradient: { from: string; to: string } }> = {
      "Ignite and Concat": { 
        icon: FaFire, 
        gradient: { from: "from-orange-600", to: "to-red-600" } 
      },
      "ISR and DLLE (Social Activity)": { 
        icon: FaHandsHelping, 
        gradient: { from: "from-green-600", to: "to-emerald-600" } 
      },
      "SkillFull Netizen": { 
        icon: FaLaptopCode, 
        gradient: { from: "from-blue-600", to: "to-cyan-600" } 
      },
      "16-Day Internship Sprints": { 
        icon: FaRocket, 
        gradient: { from: "from-purple-600", to: "to-pink-600" } 
      },
    };
    
    return activityMap[activityName] || { 
      icon: FaRocket, 
      gradient: { from: "from-blue-600", to: "to-purple-600" } 
    };
  };

  return (
    <WrapperLayout firstPosition="Co-Curricular" secondPosition="Activities">
      {isLoading ? (
        <CoCurricularActivitiesSkeleton />
      ) : (
        <>
          {/* Header Section */}
          <div className="text-center mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 dark:bg-orange-900/20 rounded-full border border-orange-200 dark:border-orange-800">
              <FaRocket className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              <span className="text-sm font-semibold text-orange-600 dark:text-orange-400">
                Beyond Academics
              </span>
            </div>
            <p className="text-base text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Beyond academics, these activities have shaped my leadership,
              teamwork, and creative problem-solving skills.
            </p>
          </div>

          {/* Activities Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {coCurricularActivitiesData.map((activity, index) => {
              const { icon: ActivityIcon, gradient } = getActivityDetails(activity.Name);
              
              return (
                <div
                  key={activity.id}
                  className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-gray-100 dark:border-gray-700 hover:border-transparent hover:-translate-y-2"
                  style={{
                    animation: `fadeIn 0.6s ease-out ${index * 0.15}s both`
                  }}
                  onMouseEnter={() => setHoveredActivity(activity.id)}
                  onMouseLeave={() => setHoveredActivity(null)}
                >
                  {/* Gradient border effect on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradient.from} ${gradient.to} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl`}></div>
                  
                  {/* Gradient background overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradient.from}/10 ${gradient.to}/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                  {/* Content */}
                  <div className="relative p-6 space-y-4 h-full flex flex-col">
                    {/* Icon */}
                    <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${gradient.from} ${gradient.to} rounded-xl shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                      <ActivityIcon className="w-7 h-7 text-white" />
                    </div>

                    {/* Activity Name */}
                    <h3 className={`text-xl font-bold text-gray-900 dark:text-white leading-tight group-hover:bg-gradient-to-r group-hover:${gradient.from} group-hover:${gradient.to} group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300`}>
                      {activity.Name}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed flex-grow">
                      {activity.description}
                    </p>

                    {/* Decorative line */}
                    <div className="pt-2">
                      <div className={`h-1 w-12 bg-gradient-to-r ${gradient.from} ${gradient.to} rounded-full group-hover:w-20 transition-all duration-500`}></div>
                    </div>

                    {/* Bottom decoration */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient.from} ${gradient.to} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                  </div>

                  {/* Corner accent */}
                  <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${gradient.from}/5 ${gradient.to}/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                </div>
              );
            })}
          </div>

         
        </>
      )}
    </WrapperLayout>
  );
}