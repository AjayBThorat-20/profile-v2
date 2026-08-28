"use client";

import React, { useRef, useState } from "react";
import { currentlyWorkingOnData } from "@/constants/experience";
import { FaRocket, FaChevronDown, FaChevronUp, FaCode } from "react-icons/fa";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { getAccent } from "@/Components/UI/accentColor";
import IconTile from "@/Components/UI/IconTile";
import SectionEyebrow from "@/Components/UI/SectionEyebrow";

export default function CurrentlyWorkingOn() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isRevealed = useScrollReveal(sectionRef);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (currentlyWorkingOnData.length === 0) {
    return null;
  }

  return (
    <div id="currently-working-on" ref={sectionRef} className={`container-custom section scroll-reveal scroll-mt-36 ${isRevealed ? "is-visible" : ""}`}>
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 animate-fadeIn">
          <div className="flex justify-center">
            <SectionEyebrow index="02" icon={FaRocket} label="Currently Working On" />
          </div>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Active projects and initiatives I'm currently focused on.
          </p>
        </div>

        {/* Activities List */}
        <div className="space-y-4">
          {currentlyWorkingOnData.map((activity, index) => {
            const accent = getAccent(index);
            const isExpanded = expandedId === activity.id;

            return (
              <div
                key={activity.id}
                className="animate-fadeIn"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <div className={`border ${accent.border} rounded-2xl overflow-hidden transition-colors duration-200`}>
                  <div className={`h-1 ${accent.bg}`}></div>

                  <div className="p-6 md:p-8">
                    <div className="flex items-start gap-4">
                      <IconTile icon={FaCode} accent={accent} size="md" />

                      <div className="flex-1 min-w-0">
                        <p className="text-base md:text-lg text-foreground leading-relaxed mb-4">
                          {activity.description}
                        </p>

                        <button
                          onClick={() => toggleExpand(activity.id)}
                          className={`inline-flex items-center gap-2 px-4 py-2 border ${accent.border} ${accent.bgSoft} ${accent.text} text-sm font-semibold rounded-2xl transition-colors duration-150`}
                        >
                          <span>{isExpanded ? "Show Less" : "Show More"}</span>
                          {isExpanded ? (
                            <FaChevronUp className="w-3 h-3" />
                          ) : (
                            <FaChevronDown className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Expanded Content */}
                    {isExpanded && (
                      <div className="mt-6 pt-6 border-t border-border animate-fadeIn">
                        <div className={`p-6 rounded-2xl border ${accent.border} ${accent.bgSoft}`}>
                          <h4 className={`text-sm font-bold mb-3 flex items-center gap-2 ${accent.text}`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${accent.bg} animate-pulse`}></div>
                            Additional Details
                          </h4>
                          <p className="text-muted-foreground leading-relaxed">
                            {activity.hiddenDisc}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
