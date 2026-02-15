"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { projectsData } from "@/constants/project";
import { FaGithub, FaExternalLinkAlt, FaCode, FaRocket } from "react-icons/fa";

export default function Projects() {
  const [currentImageIndexes, setCurrentImageIndexes] = useState<number[]>(
    Array(projectsData.length).fill(0)
  );
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

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

  const getGradientColors = (index: number) => {
    const gradients = [
      { from: "from-blue-600", to: "to-cyan-600", badge: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
      { from: "from-purple-600", to: "to-pink-600", badge: "bg-purple-500/10 text-purple-600 border-purple-500/20" },
      { from: "from-green-600", to: "to-emerald-600", badge: "bg-green-500/10 text-green-600 border-green-500/20" },
      { from: "from-orange-600", to: "to-red-600", badge: "bg-orange-500/10 text-orange-600 border-orange-500/20" },
    ];
    return gradients[index % gradients.length];
  };

  return (
    <div className="container-custom section">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full border border-primary/20">
            <FaCode className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Featured Work</span>
          </div>
          <p className="text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Showcase of technical skills, creativity, and problem-solving abilities across various technologies.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="space-y-8">
          {projectsData.map((project, activityIdx) => {
            const colors = getGradientColors(activityIdx);
            const isEven = activityIdx % 2 === 0;
            
            return (
              <div
                key={project.id}
                className="group relative animate-fadeIn"
                style={{ animationDelay: `${activityIdx * 100}ms` }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className={`bg-card border-2 border-border/50 hover:border-primary/50 rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${
                  hoveredProject === project.id ? "shadow-2xl border-primary/50" : ""
                }`}>
                  
                  {/* Top Gradient Bar */}
                  <div className={`h-1.5 bg-gradient-to-r ${colors.from} ${colors.to}`}></div>

                  <div className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 p-6 md:p-8`}>
                    
                    {/* Image Section */}
                    <div className="lg:w-2/5 flex justify-center items-center">
                      <div className="relative w-full max-w-md">
                        {/* Glow effect */}
                        <div className={`absolute -inset-4 bg-gradient-to-r ${colors.from}/20 ${colors.to}/20 rounded-2xl blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500`}></div>
                        
                        <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg border-2 border-border group-hover:border-primary/50 transition-all duration-500">
                          <Image
                            alt={`${project.title} preview`}
                            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
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
                          <div className={`absolute top-3 left-3 w-10 h-10 bg-gradient-to-br ${colors.from} ${colors.to} rounded-full flex items-center justify-center text-white font-black shadow-lg`}>
                            {activityIdx + 1}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Details Section */}
                    <div className="lg:w-3/5 space-y-5">
                      {/* Title */}
                      <div>
                        <h3 className="text-2xl md:text-3xl font-black text-foreground mb-2 leading-tight group-hover:text-primary transition-colors duration-300">
                          {project.title}
                        </h3>
                        <div className={`h-1.5 w-20 bg-gradient-to-r ${colors.from} ${colors.to} rounded-full group-hover:w-32 transition-all duration-500`}></div>
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
                          {project.techStack.split(", ").map((tech, idx) => (
                            <span
                              key={idx}
                              className={`px-3 py-1.5 ${colors.badge} rounded-lg text-sm font-semibold border hover:scale-105 transition-transform duration-200 cursor-default`}
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
                          className={`magnetic group/btn inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${colors.from} ${colors.to} text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 relative overflow-hidden`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {/* Shimmer effect */}
                          <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                          
                          <span className="relative flex items-center gap-2">
                            <FaExternalLinkAlt className="w-4 h-4" />
                            <span>View Project</span>
                            <FaRocket className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Hover Border Effect */}
                  {hoveredProject === project.id && (
                    <div className="absolute inset-0 rounded-3xl pointer-events-none">
                      <div className={`absolute -inset-[2px] rounded-3xl bg-gradient-to-r ${colors.from} ${colors.to} opacity-20 blur-sm`}></div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* GitHub CTA Card */}
        <div className="relative group animate-fadeIn" style={{ animationDelay: '400ms' }}>
          <div className="glass-card rounded-3xl overflow-hidden border-2 border-dashed border-primary/30 hover:border-primary/50 hover:border-solid transition-all duration-500 hover:shadow-2xl">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative p-8 md:p-12 text-center space-y-6">
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <FaGithub className="w-10 h-10 text-white" />
              </div>

              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-black gradient-text-animated">
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
                className="magnetic inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-800 dark:from-white dark:to-gray-100 text-white dark:text-gray-900 font-bold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 group/btn relative overflow-hidden"
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                
                <span className="relative flex items-center gap-3">
                  <FaGithub className="w-6 h-6" />
                  <span>View All on GitHub</span>
                  <FaExternalLinkAlt className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}