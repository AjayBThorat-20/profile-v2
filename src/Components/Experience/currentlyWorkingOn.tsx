"use client";

import React, { useState } from "react";
import { currentlyWorkingOnData } from "@/constants/experience";
import { FaRocket, FaChevronDown, FaChevronUp, FaCode } from "react-icons/fa";

export default function CurrentlyWorkingOn() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getGradientColors = (index: number) => {
    const gradients = [
      { from: "from-blue-600", to: "to-cyan-600", iconBg: "bg-blue-500/10" },
      { from: "from-purple-600", to: "to-pink-600", iconBg: "bg-purple-500/10" },
      { from: "from-green-600", to: "to-emerald-600", iconBg: "bg-green-500/10" },
      { from: "from-orange-600", to: "to-red-600", iconBg: "bg-orange-500/10" },
    ];
    return gradients[index % gradients.length];
  };

  if (currentlyWorkingOnData.length === 0) {
    return null;
  }

  return (
    <div className="container-custom section">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full border border-primary/20">
            <FaRocket className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Currently Working On</span>
          </div>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Active projects and initiatives I'm currently focused on.
          </p>
        </div>

        {/* Activities Grid */}
        <div className="space-y-4">
          {currentlyWorkingOnData.map((activity, index) => {
            const colors = getGradientColors(index);
            const isExpanded = expandedId === activity.id;

            return (
              <div
                key={activity.id}
                className="group relative animate-fadeIn"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`relative bg-card border-2 border-border/50 hover:border-primary/50 rounded-2xl overflow-hidden transition-all duration-500 ${
                  isExpanded ? "border-primary/50 shadow-2xl" : ""
                }`}>
                  {/* Top Gradient Bar */}
                  <div className={`h-1.5 bg-gradient-to-r ${colors.from} ${colors.to}`}></div>

                  {/* Gradient Background on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${colors.from}/5 ${colors.to}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                  {/* Main Content */}
                  <div className="relative p-6 md:p-8">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className={`flex-shrink-0 relative p-4 ${colors.iconBg} rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
                        <div className={`absolute inset-0 bg-gradient-to-br ${colors.from} ${colors.to} opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300`}></div>
                        <FaCode className={`relative w-6 h-6 text-${colors.from.split('-')[1]}-600 dark:text-${colors.from.split('-')[1]}-400 group-hover:text-white transition-colors duration-300`} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        {/* Description */}
                        <p className="text-base md:text-lg text-foreground leading-relaxed mb-4">
                          {activity.description}
                        </p>

                        {/* Expand Button */}
                        <button
                          onClick={() => toggleExpand(activity.id)}
                          className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${colors.from} ${colors.to} text-white text-sm font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 group/btn`}
                        >
                          <span>{isExpanded ? "Show Less" : "Show More"}</span>
                          {isExpanded ? (
                            <FaChevronUp className="w-3 h-3 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
                          ) : (
                            <FaChevronDown className="w-3 h-3 group-hover/btn:translate-y-0.5 transition-transform duration-300" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Expanded Content */}
                    {isExpanded && (
                      <div className="mt-6 pt-6 border-t border-border animate-fadeIn">
                        <div className="glass-card p-6 rounded-xl border border-primary/20">
                          <h4 className="text-sm font-bold text-primary mb-3 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
                            Additional Details
                          </h4>
                          <p className="text-muted-foreground leading-relaxed">
                            {activity.hiddenDisc}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Corner Decoration */}
                  <div className={`absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br ${colors.from}/10 ${colors.to}/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {currentlyWorkingOnData.length === 0 && (
          <div className="text-center py-12 glass-card rounded-3xl border-2 border-dashed border-border animate-fadeIn">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-muted rounded-2xl mb-4">
              <FaRocket className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">No Active Projects</h3>
            <p className="text-muted-foreground">
              Check back later for updates on current activities!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}