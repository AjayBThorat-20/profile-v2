"use client";

import React, { useState } from "react";
import { educationData } from "@/constants/about";
import { FaGraduationCap, FaCalendar, FaUniversity } from "react-icons/fa";
import { HiAcademicCap } from "react-icons/hi";

export default function Education() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const getGradientColors = (index: number) => {
    const gradients = [
      { from: "from-blue-600", to: "to-cyan-600", ring: "ring-blue-500/20", bg: "bg-blue-500/5" },
      { from: "from-purple-600", to: "to-pink-600", ring: "ring-purple-500/20", bg: "bg-purple-500/5" },
      { from: "from-green-600", to: "to-emerald-600", ring: "ring-green-500/20", bg: "bg-green-500/5" },
      { from: "from-orange-600", to: "to-red-600", ring: "ring-orange-500/20", bg: "bg-orange-500/5" },
    ];
    return gradients[index % gradients.length];
  };

  // Helper function to parse college string
  const parseCollege = (college: string) => {
    const parts = college.split("|").map(s => s.trim());
    return {
      institution: parts[0] || college,
      board: parts[1] || "",
      location: parts[2] || ""
    };
  };

  return (
    <div className="container-custom section">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4 animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full border border-primary/20">
            <HiAcademicCap className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-primary">Academic Journey</span>
          </div>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Educational background building a strong foundation in computer science and technology.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Timeline Line - Desktop */}
          <div className="hidden lg:block absolute left-1/2 top-8 bottom-8 w-1 bg-gradient-to-b from-blue-500  via-green-500 to-orange-500 transform -translate-x-1/2 rounded-full opacity-30"></div>

          {/* Education Cards */}
          <div className="space-y-12 lg:space-y-16">
            {educationData.map((edu, index) => {
              const colors = getGradientColors(index);
              const isLeft = index % 2 === 0;
              const collegeInfo = parseCollege(edu.college);
              
              return (
                <div
                  key={edu.id}
                  className={`relative flex flex-col lg:flex-row ${
                    isLeft ? "lg:flex-row" : "lg:flex-row-reverse"
                  } items-center gap-6 lg:gap-16 animate-fadeIn`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Timeline Node - Desktop Only */}
                  <div className="hidden lg:flex absolute left-1/2 top-8 -translate-x-1/2 z-20">
                    <div className="relative">
                      {/* Outer Ring */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${colors.from} ${colors.to} rounded-full animate-ping-slow opacity-30`}></div>
                      
                      {/* Main Node */}
                      <div className={`relative w-20 h-20 bg-gradient-to-br ${colors.from} ${colors.to} rounded-full flex items-center justify-center shadow-2xl ring-8 ring-background border-4 border-background`}>
                        <FaGraduationCap className="w-9 h-9 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Card */}
                  <div className={`w-full lg:w-[calc(50%-5rem)] ${isLeft ? "lg:pr-4" : "lg:pl-4"}`}>
                    <div
                      className={`group relative bg-card border-2 border-border/50 hover:border-primary/50 rounded-2xl p-6 md:p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${
                        activeCard === edu.id ? "border-primary/50 shadow-2xl scale-[1.02]" : ""
                      }`}
                      onMouseEnter={() => setActiveCard(edu.id)}
                      onMouseLeave={() => setActiveCard(null)}
                    >
                      {/* Top Gradient Bar */}
                      <div className={`absolute top-0 ${isLeft ? "left-0" : "right-0"} ${isLeft ? "rounded-tl-2xl" : "rounded-tr-2xl"} w-32 h-1.5 bg-gradient-to-r ${colors.from} ${colors.to}`}></div>

                      {/* Gradient Background on Hover */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${colors.from}/5 ${colors.to}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`}></div>

                      {/* Content */}
                      <div className="relative space-y-5">
                        {/* Header with Icon - Mobile */}
                        <div className="flex items-start gap-4 lg:hidden">
                          <div className={`flex-shrink-0 w-16 h-16 bg-gradient-to-br ${colors.from} ${colors.to} rounded-2xl flex items-center justify-center shadow-lg ring-4 ring-background`}>
                            <FaGraduationCap className="w-8 h-8 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-bold text-foreground leading-tight">
                              {edu.course}
                            </h3>
                          </div>
                        </div>

                        {/* Header - Desktop */}
                        <div className="hidden lg:block">
                          <h3 className="text-xl md:text-2xl font-bold text-foreground leading-tight mb-3">
                            {edu.course}
                          </h3>
                          <div className={`h-1.5 w-20 bg-gradient-to-r ${colors.from} ${colors.to} rounded-full`}></div>
                        </div>

                        {/* Institution */}
                        <div className="flex items-start gap-3 bg-muted/50 rounded-xl p-4">
                          <div className={`mt-0.5 flex-shrink-0 p-2.5 bg-gradient-to-br ${colors.from} ${colors.to} rounded-lg shadow-md`}>
                            <HiAcademicCap className="w-5 h-5 text-white" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-foreground text-base md:text-lg leading-tight">
                              {collegeInfo.institution}
                            </p>
                            {collegeInfo.board && (
                              <p className="text-sm text-muted-foreground mt-1">
                                {collegeInfo.board}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {/* Passing Year */}
                          <div className="flex items-center gap-3 px-4 py-3 bg-muted/50 rounded-xl border border-border/50">
                            <div className={`p-2 bg-gradient-to-br ${colors.from} ${colors.to} rounded-lg`}>
                              <FaCalendar className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground font-medium mb-0.5">Passing Year</p>
                              <p className="text-sm font-bold text-foreground">
                                {edu.passingYear}
                              </p>
                            </div>
                          </div>

                          {/* Location */}
                          {collegeInfo.location && (
                            <div className="flex items-center gap-3 px-4 py-3 bg-muted/50 rounded-xl border border-border/50">
                              <div className={`p-2 bg-gradient-to-br ${colors.from} ${colors.to} rounded-lg`}>
                                <FaUniversity className="w-4 h-4 text-white" />
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground font-medium mb-0.5">Location</p>
                                <p className="text-sm font-bold text-foreground">
                                  {collegeInfo.location}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Completed Badge */}
                        <div className="flex justify-between items-center pt-2">
                          <div className={`inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r ${colors.from}/10 ${colors.to}/10 border-2 border-current rounded-full`}
                            style={{ borderColor: `rgb(var(--${colors.from.split('-')[1]}-500))` }}>
                            <FaGraduationCap className={`w-4 h-4`} style={{ color: `rgb(var(--${colors.from.split('-')[1]}-600))` }} />
                            <span className={`text-base font-black bg-gradient-to-r ${colors.from} ${colors.to} bg-clip-text`} style={{ color: 'transparent', WebkitTextFillColor: 'transparent', backgroundClip: 'text', WebkitBackgroundClip: 'text' }}>
                              Completed
                            </span>
                          </div>

                          {/* Decorative Line */}
                          <div className={`h-1 flex-grow max-w-[100px] ml-4 bg-gradient-to-r ${colors.from} ${colors.to} rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700`}></div>
                        </div>
                      </div>

                      {/* Corner Decoration */}
                      <div className={`absolute ${isLeft ? "-bottom-3 -left-3" : "-bottom-3 -right-3"} w-32 h-32 bg-gradient-to-br ${colors.from}/10 ${colors.to}/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}></div>
                    </div>
                  </div>

                  {/* Empty space for opposite side - Desktop only */}
                  <div className="hidden lg:block w-[calc(50%-5rem)]"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}