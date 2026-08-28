"use client";

import React, { useRef } from "react";
import { educationData } from "@/constants/about";
import { FaGraduationCap, FaUniversity } from "react-icons/fa";
import { HiAcademicCap } from "react-icons/hi";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { getAccent } from "@/Components/UI/accentColor";
import IconTile from "@/Components/UI/IconTile";
import SectionEyebrow from "@/Components/UI/SectionEyebrow";
import { TimelineRail, TimelineItem } from "@/Components/UI/Timeline";

export default function Education() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isRevealed = useScrollReveal(sectionRef);

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
    <div id="education" ref={sectionRef} className={`container-custom section scroll-reveal scroll-mt-36 ${isRevealed ? "is-visible" : ""}`}>
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4 animate-fadeIn">
          <div className="flex justify-center">
            <SectionEyebrow index="04" icon={HiAcademicCap} label="Academic Journey" />
          </div>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Educational background building a strong foundation in computer science and technology.
          </p>
        </div>

        {/* Timeline */}
        <TimelineRail>
          {educationData.map((edu, index) => {
            const accent = getAccent(index);
            const collegeInfo = parseCollege(edu.college);

            return (
              <div key={edu.id} className="animate-fadeIn" style={{ animationDelay: `${index * 60}ms` }}>
                <TimelineItem icon={FaGraduationCap} accent={accent} meta={edu.passingYear}>
                  <div className={`spotlight entry-card ${accent.border} p-5 md:p-6`}>
                    <h3 className="text-lg md:text-xl font-bold text-foreground leading-tight mb-4">
                      {edu.course}
                    </h3>

                    <div className="flex items-start gap-3 bg-muted/50 rounded-2xl p-4">
                      <IconTile icon={HiAcademicCap} accent={accent} size="sm" />
                      <div className="min-w-0">
                        <p className="font-bold text-foreground text-sm md:text-base leading-tight">
                          {collegeInfo.institution}
                        </p>
                        {collegeInfo.board && (
                          <p className="text-sm text-muted-foreground mt-1">{collegeInfo.board}</p>
                        )}
                      </div>
                    </div>

                    {collegeInfo.location && (
                      <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
                        <FaUniversity className="w-4 h-4 flex-shrink-0" />
                        {collegeInfo.location}
                      </div>
                    )}
                  </div>
                </TimelineItem>
              </div>
            );
          })}
        </TimelineRail>
      </div>
    </div>
  );
}
