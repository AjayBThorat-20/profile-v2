"use client";

import React from "react";
import { FaBriefcase, FaRocket, FaUsers } from "react-icons/fa";

export default function WelcomeToExperience() {
  return (
    <div className="container-custom section">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Introduction Card */}
        <div className="glass-card rounded-3xl p-8 md:p-10 border-2 border-primary/20 relative overflow-hidden group hover:border-primary/40 transition-all duration-500 animate-fadeIn">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <p className="relative text-lg md:text-xl text-foreground/90 leading-relaxed text-center">
            My professional journey reflects a commitment to{" "}
            <span className="font-bold text-primary">continuous learning</span>,{" "}
            <span className="font-bold text-secondary">collaborative teamwork</span>, and delivering{" "}
            <span className="font-bold text-accent">scalable solutions</span> that drive real business impact.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn" style={{ animationDelay: '100ms' }}>
          {/* Hands-On Experience */}
          <div className="group relative bg-card border-2 border-border/50 hover:border-primary/50 rounded-2xl p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl overflow-hidden">
            {/* Gradient background on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative flex flex-col items-center text-center space-y-4">
              {/* Icon */}
              <div className="relative p-5 bg-blue-500/10 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300"></div>
                <FaBriefcase className="relative w-10 h-10 text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors duration-300" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-foreground">
                Hands-On Experience
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed">
                Building production-ready applications and managing real-world projects
              </p>

              {/* Decorative Line */}
              <div className="h-1 w-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full group-hover:w-20 transition-all duration-500"></div>
            </div>
          </div>

          {/* Team Collaboration */}
          <div className="group relative bg-card border-2 border-border/50 hover:border-primary/50 rounded-2xl p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl overflow-hidden">
            {/* Gradient background on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative flex flex-col items-center text-center space-y-4">
              {/* Icon */}
              <div className="relative p-5 bg-purple-500/10 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300"></div>
                <FaUsers className="relative w-10 h-10 text-purple-600 dark:text-purple-400 group-hover:text-white transition-colors duration-300" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-foreground">
                Team Collaboration
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed">
                Working in agile teams to deliver high-quality solutions on time
              </p>

              {/* Decorative Line */}
              <div className="h-1 w-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full group-hover:w-20 transition-all duration-500"></div>
            </div>
          </div>

          {/* Growth Mindset */}
          <div className="group relative bg-card border-2 border-border/50 hover:border-primary/50 rounded-2xl p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl overflow-hidden">
            {/* Gradient background on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 to-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative flex flex-col items-center text-center space-y-4">
              {/* Icon */}
              <div className="relative p-5 bg-green-500/10 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-emerald-600 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300"></div>
                <FaRocket className="relative w-10 h-10 text-green-600 dark:text-green-400 group-hover:text-white transition-colors duration-300" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-foreground">
                Growth Mindset
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed">
                Constantly learning new technologies and adapting to challenges
              </p>

              {/* Decorative Line */}
              <div className="h-1 w-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full group-hover:w-20 transition-all duration-500"></div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="relative group rounded-3xl overflow-hidden animate-fadeIn" style={{ animationDelay: '200ms' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient"></div>
          
          <div className="relative p-8 md:p-10 text-center">
            <p className="text-xl md:text-2xl font-black text-white leading-relaxed drop-shadow-lg">
              Explore my journey and see how I've contributed to building innovative solutions! 💼
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}