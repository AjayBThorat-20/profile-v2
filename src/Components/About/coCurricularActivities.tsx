"use client";

import React, { useState } from "react";
import { coCurricularActivitiesData } from "@/constants/about";
import { FaFire, FaHandsHelping, FaLaptopCode, FaRocket } from "react-icons/fa";
import { IconType } from "react-icons";

export default function CoCurricularActivities() {
  const [hoveredActivity, setHoveredActivity] = useState<number | null>(null);

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
    <div className="container-custom section">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4 animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full border border-primary/20">
            <FaRocket className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Beyond Academics</span>
          </div>
          <p className="text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Activities that shaped leadership, teamwork, and creative problem-solving skills.
          </p>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fadeIn" style={{ animationDelay: '100ms' }}>
          {coCurricularActivitiesData.map((activity, index) => {
            const { icon: ActivityIcon, gradient } = getActivityDetails(activity.Name);
            
            return (
              <div
                key={activity.id}
                className="group relative card-interactive p-6 hover:-translate-y-2 overflow-hidden"
                onMouseEnter={() => setHoveredActivity(activity.id)}
                onMouseLeave={() => setHoveredActivity(null)}
              >
                {/* Gradient border effect on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient.from} ${gradient.to} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl`}></div>
                
                {/* Gradient background overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient.from}/10 ${gradient.to}/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                {/* Shimmer Effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                {/* Content */}
                <div className="relative h-full flex flex-col space-y-4">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${gradient.from} ${gradient.to} rounded-xl shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    <ActivityIcon className="w-7 h-7 text-white" />
                  </div>

                  {/* Activity Name */}
                  <h3 className="text-xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors duration-300">
                    {activity.Name}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed flex-grow">
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
      </div>
    </div>
  );
}