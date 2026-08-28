"use client";

import React, { useRef } from "react";
import { coCurricularActivitiesData } from "@/constants/about";
import { FaFire, FaHandsHelping, FaLaptopCode, FaRocket } from "react-icons/fa";
import { IconType } from "react-icons";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { getAccent } from "@/Components/UI/accentColor";
import IconTile from "@/Components/UI/IconTile";
import SectionEyebrow from "@/Components/UI/SectionEyebrow";

const ACTIVITY_ICONS: Record<string, IconType> = {
  "Ignite and Concat": FaFire,
  "ISR and DLLE (Social Activity)": FaHandsHelping,
  "SkillFull Netizen": FaLaptopCode,
  "16-Day Internship Sprints": FaRocket,
};

export default function CoCurricularActivities() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isRevealed = useScrollReveal(sectionRef);

  return (
    <div id="activities" ref={sectionRef} className={`container-custom section scroll-reveal scroll-mt-36 ${isRevealed ? "is-visible" : ""}`}>
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4 animate-fadeIn">
          <div className="flex justify-center">
            <SectionEyebrow index="03" icon={FaRocket} label="Beyond Academics" />
          </div>
          <p className="text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Activities that shaped leadership, teamwork, and creative problem-solving skills.
          </p>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fadeIn" style={{ animationDelay: '60ms' }}>
          {coCurricularActivitiesData.map((activity, index) => {
            const ActivityIcon = ACTIVITY_ICONS[activity.Name] || FaRocket;
            const accent = getAccent(index);

            return (
              <div
                key={activity.id}
                className={`spotlight group relative entry-card ${accent.border} p-6 overflow-hidden`}
              >
                {/* Content */}
                <div className="relative h-full flex flex-col space-y-4">
                  <IconTile icon={ActivityIcon} accent={accent} size="lg" />

                  <h3 className="text-xl font-bold text-foreground leading-tight">
                    {activity.Name}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed flex-grow">
                    {activity.description}
                  </p>

                  {/* Decorative line */}
                  <div className={`h-0.5 w-12 ${accent.bg} rounded-full group-hover:w-20 transition-all duration-300`}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
