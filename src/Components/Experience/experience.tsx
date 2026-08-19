"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { experienceData } from "@/constants/experience";
import { FaBriefcase, FaMapMarkerAlt, FaArrowRight, FaCheckCircle, FaExternalLinkAlt } from "react-icons/fa";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { getAccent } from "@/Components/UI/accentColor";
import SectionEyebrow from "@/Components/UI/SectionEyebrow";
import { TimelineRail, TimelineItem } from "@/Components/UI/Timeline";

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isRevealed = useScrollReveal(sectionRef);

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

  return (
    <div ref={sectionRef} className={`container-custom section scroll-reveal ${isRevealed ? "is-visible" : ""}`}>
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 animate-fadeIn">
          <div className="flex justify-center">
            <SectionEyebrow icon={FaBriefcase} label="Professional Journey" />
          </div>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Building expertise through hands-on experience in innovative companies and impactful projects.
          </p>
        </div>

        {/* Experience Timeline */}
        <TimelineRail>
          {experienceData.map((exp, index) => {
            const accent = getAccent(index);
            const current = isCurrent(exp.duration);
            const location = getLocation(exp.name);

            return (
              <div key={exp.id} className="animate-fadeIn" style={{ animationDelay: `${index * 60}ms` }}>
                <TimelineItem icon={HiBuildingOffice2} accent={accent} meta={exp.duration}>
                  <div className={`border ${accent.border} rounded-2xl p-5 md:p-6 hover:-translate-y-0.5 transition-transform duration-200`}>
                    <div className="flex items-center gap-2 mb-2">
                      {current && (
                        <span className="px-3 py-1 text-xs font-bold rounded-full bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          Current
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-foreground leading-tight mb-1">
                      {exp.title}
                    </h3>
                    <p className={`font-semibold mb-4 ${accent.text}`}>{exp.name}</p>

                    {/* Details */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <FaMapMarkerAlt className="w-3.5 h-3.5 flex-shrink-0" />
                      {location}
                    </div>

                    {/* Tech Stack */}
                    <div className="mb-5">
                      <h4 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                        <FaCheckCircle className="w-4 h-4 text-primary" />
                        Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.techStack.split(", ").slice(0, 6).map((tech) => (
                          <span
                            key={tech}
                            className={`px-3 py-1.5 ${accent.badge} rounded-lg text-xs font-semibold border hover:scale-105 transition-transform duration-150 cursor-default`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link
                        href={`/experience/details/${exp.id}`}
                        className={`magnetic group/btn flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 ${accent.bg} text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200`}
                      >
                        <span>View Details</span>
                        <FaArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                      </Link>

                      <a
                        href={exp.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-border hover:border-primary/50 bg-card hover:bg-muted rounded-xl font-bold transition-colors duration-200"
                      >
                        <span>Visit Company</span>
                        <FaExternalLinkAlt className="w-3.5 h-3.5 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform duration-200" />
                      </a>
                    </div>
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
