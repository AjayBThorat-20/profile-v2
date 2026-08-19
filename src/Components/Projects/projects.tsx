"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { projectsData } from "@/constants/project";
import { FaGithub, FaExternalLinkAlt, FaCode, FaRocket } from "react-icons/fa";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { getAccent } from "@/Components/UI/accentColor";
import SectionEyebrow from "@/Components/UI/SectionEyebrow";

export default function Projects() {
  const [currentImageIndexes, setCurrentImageIndexes] = useState<number[]>(
    Array(projectsData.length).fill(0)
  );
  const sectionRef = useRef<HTMLDivElement>(null);
  const isRevealed = useScrollReveal(sectionRef);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndexes((prevIndexes) =>
        prevIndexes.map((index, activityIdx) =>
          index === projectsData[activityIdx].pictures.length - 1
            ? 0
            : index + 1
        )
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={sectionRef} className={`container-custom section scroll-reveal ${isRevealed ? "is-visible" : ""}`}>
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 animate-fadeIn">
          <div className="flex justify-center">
            <SectionEyebrow icon={FaCode} label="Featured Work" />
          </div>
          <p className="text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Showcase of technical skills, creativity, and problem-solving abilities across various technologies.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="space-y-8">
          {projectsData.map((project, activityIdx) => {
            const accent = getAccent(activityIdx);
            const isEven = activityIdx % 2 === 0;

            return (
              <div
                key={project.id}
                className="group relative animate-fadeIn"
                style={{ animationDelay: `${activityIdx * 60}ms` }}
              >
                <div className={`border ${accent.border} rounded-3xl overflow-hidden hover:-translate-y-1 transition-transform duration-200`}>

                  {/* Top Accent Bar */}
                  <div className={`h-1.5 ${accent.bg}`}></div>

                  <div className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 p-6 md:p-8`}>

                    {/* Image Section */}
                    <div className="lg:w-2/5 flex justify-center items-center">
                      <div className="relative w-full max-w-md">
                        <div className={`relative aspect-video rounded-2xl overflow-hidden shadow-lg border-2 ${accent.border}`}>
                          <Image
                            alt={`${project.title} - screenshot ${currentImageIndexes[activityIdx] + 1} - project by Ajay Thorat`}
                            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                            src={project.pictures[currentImageIndexes[activityIdx]].picture}
                            fill
                            sizes="(max-width: 768px) 100vw, 40vw"
                            priority={activityIdx === 0}
                          />
                          
                          {/* Image Counter */}
                          <div className="absolute bottom-3 right-3 px-3 py-1.5 bg-black/80 backdrop-blur-sm text-white text-xs font-bold rounded-full border border-white/20">
                            {currentImageIndexes[activityIdx] + 1} / {project.pictures.length}
                          </div>

                          {/* Project Number Badge */}
                          <div className={`absolute top-3 left-3 w-10 h-10 ${accent.bg} rounded-full flex items-center justify-center text-white font-black shadow-lg`}>
                            {activityIdx + 1}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Details Section */}
                    <div className="lg:w-3/5 space-y-5">
                      {/* Title */}
                      <div>
                        <h3 className="text-2xl md:text-3xl font-black text-foreground mb-2 leading-tight group-hover:text-primary transition-colors duration-200">
                          {project.title}
                        </h3>
                        <div className={`h-0.5 w-20 ${accent.bg} rounded-full group-hover:w-32 transition-all duration-300`}></div>
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground text-base leading-relaxed">
                        {project.discription}
                      </p>

                      {/* Tech Stack */}
                      <div>
                        <h4 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                          <FaCode className="w-4 h-4 text-primary" />
                          Technologies Used
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {project.techStack.split(", ").map((tech) => (
                            <span
                              key={tech}
                              className={`px-3 py-1.5 ${accent.badge} rounded-lg text-sm font-semibold border hover:scale-105 transition-transform duration-150 cursor-default`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="pt-2">
                        <a
                          href={project.url}
                          className={`magnetic group/btn inline-flex items-center gap-2 px-6 py-3 ${accent.bg} text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaExternalLinkAlt className="w-4 h-4" />
                          <span>View Project</span>
                          <FaRocket className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* GitHub CTA Card */}
        <div className="relative group animate-fadeIn" style={{ animationDelay: '220ms' }}>
          <div className="panel rounded-3xl overflow-hidden border-dashed border-2 border-primary/30 hover:border-primary/50 hover:border-solid transition-colors duration-200">
            <div className="relative p-8 md:p-12 text-center space-y-6">
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-20 h-20 border border-primary/30 bg-primary/10 text-primary rounded-2xl">
                <FaGithub className="w-10 h-10" />
              </div>

              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-black gradient-text">
                Explore More Projects
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                Battle King, Companion-AI, Marathi Matrimony, and many more exciting projects await.
                Check out my complete portfolio on GitHub!
              </p>

              {/* Button */}
              <a
                href="https://github.com/AjayBThorat-20?tab=repositories"
                className="magnetic inline-flex items-center gap-3 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="w-6 h-6" />
                <span>View All on GitHub</span>
                <FaExternalLinkAlt className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}