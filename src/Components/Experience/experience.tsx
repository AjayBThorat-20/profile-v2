"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { experienceData } from "@/constants/experience";
import { FaBriefcase, FaCalendar, FaMapMarkerAlt, FaArrowRight, FaCheckCircle, FaExternalLinkAlt } from "react-icons/fa";
import { HiBuildingOffice2 } from "react-icons/hi2";

export default function Experience() {
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const handleViewDetails = (companyId: number) => {
    localStorage.setItem("selectedCompanyId", companyId.toString());
    router.push("/experience/details");
  };

  const getGradientColors = (index: number) => {
    const gradients = [
      { from: "from-blue-600", to: "to-cyan-600", badge: "bg-blue-500/10 border-blue-500/20" },
      { from: "from-purple-600", to: "to-pink-600", badge: "bg-purple-500/10 border-purple-500/20" },
      { from: "from-green-600", to: "to-emerald-600", badge: "bg-green-500/10 border-green-500/20" },
    ];
    return gradients[index % gradients.length];
  };

  // Helper to check if it's current position
  const isCurrent = (duration: string) => {
    return duration.toLowerCase().includes("present");
  };

  // Helper to extract location from company name or default
  const getLocation = (name: string) => {
    if (name.includes("ShypBUDDY")) return "Mumbai, India";
    if (name.includes("Renewalytics")) return "New Delhi, India";
    return "India";
  };

  // Helper to get key highlights from tech stack
  const getHighlights = (techStack: string) => {
    const technologies = techStack.split(", ");
    return [
      `Working with ${technologies.slice(0, 3).join(", ")}`,
      `Full-stack development with modern technologies`,
      `Building scalable production applications`
    ];
  };

  return (
    <div className="container-custom section">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full border border-primary/20">
            <FaBriefcase className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Professional Journey</span>
          </div>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Building expertise through hands-on experience in innovative companies and impactful projects.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="relative">
          {/* Vertical Line - Desktop */}
          <div className="hidden lg:block absolute left-1/2 top-8 bottom-8 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 transform -translate-x-1/2 rounded-full opacity-30"></div>

          {/* Experience Cards */}
          <div className="space-y-12 lg:space-y-16">
            {experienceData.map((exp, index) => {
              const colors = getGradientColors(index);
              const isLeft = index % 2 === 0;
              const current = isCurrent(exp.duration);
              const location = getLocation(exp.name);
              const highlights = getHighlights(exp.techStack);
              
              return (
                <div
                  key={exp.id}
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
                        <HiBuildingOffice2 className="w-9 h-9 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Card */}
                  <div className={`w-full lg:w-[calc(50%-5rem)] ${isLeft ? "lg:pr-4" : "lg:pl-4"}`}>
                    <div
                      className={`group relative bg-card border-2 border-border/50 hover:border-primary/50 rounded-2xl p-6 md:p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${
                        hoveredCard === exp.id ? "border-primary/50 shadow-2xl scale-[1.02]" : ""
                      }`}
                      onMouseEnter={() => setHoveredCard(exp.id)}
                      onMouseLeave={() => setHoveredCard(null)}
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
                            <HiBuildingOffice2 className="w-8 h-8 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-bold text-foreground leading-tight">
                              {exp.title}
                            </h3>
                            <p className="text-sm text-primary font-semibold">
                              {exp.name}
                            </p>
                          </div>
                        </div>

                        {/* Header - Desktop */}
                        <div className="hidden lg:block">
                          <div className="flex items-center gap-2 mb-2">
                            {current && (
                              <span className="px-3 py-1 text-xs font-bold rounded-full bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 flex items-center gap-1">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                Current
                              </span>
                            )}
                          </div>
                          <h3 className="text-xl md:text-2xl font-bold text-foreground leading-tight mb-2">
                            {exp.title}
                          </h3>
                          <p className="text-lg font-semibold text-primary mb-3">
                            {exp.name}
                          </p>
                          <div className={`h-1.5 w-20 bg-gradient-to-r ${colors.from} ${colors.to} rounded-full`}></div>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {/* Duration */}
                          <div className="flex items-center gap-3 px-4 py-3 bg-muted/50 rounded-xl border border-border/50">
                            <div className={`p-2 bg-gradient-to-br ${colors.from} ${colors.to} rounded-lg`}>
                              <FaCalendar className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground font-medium mb-0.5">Duration</p>
                              <p className="text-sm font-bold text-foreground">
                                {exp.duration}
                              </p>
                            </div>
                          </div>

                          {/* Location */}
                          <div className="flex items-center gap-3 px-4 py-3 bg-muted/50 rounded-xl border border-border/50">
                            <div className={`p-2 bg-gradient-to-br ${colors.from} ${colors.to} rounded-lg`}>
                              <FaMapMarkerAlt className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground font-medium mb-0.5">Location</p>
                              <p className="text-sm font-bold text-foreground">
                                {location}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Tech Stack */}
                        <div>
                          <h4 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                            <FaCheckCircle className="w-4 h-4 text-primary" />
                            Tech Stack
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {exp.techStack.split(", ").slice(0, 6).map((tech, idx) => (
                              <span
                                key={idx}
                                className={`px-3 py-1.5 ${colors.badge} rounded-lg text-xs font-semibold border hover:scale-105 transition-transform duration-200 cursor-default`}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                          <button
                            onClick={() => handleViewDetails(exp.id)}
                            className={`magnetic group/btn flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r ${colors.from} ${colors.to} text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 relative overflow-hidden`}
                          >
                            {/* Shimmer effect */}
                            <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                            
                            <span className="relative flex items-center gap-2">
                              <span>View Details</span>
                              <FaArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                            </span>
                          </button>

                          <a
                            href={exp.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/link inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-border hover:border-primary/50 bg-card hover:bg-muted rounded-xl font-bold transition-all duration-300 hover:scale-105 active:scale-95"
                          >
                            <span>Visit Company</span>
                            <FaExternalLinkAlt className="w-3.5 h-3.5 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform duration-300" />
                          </a>
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