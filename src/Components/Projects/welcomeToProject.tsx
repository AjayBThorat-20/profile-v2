"use client";

import React from "react";
import { FaCode, FaLightbulb, FaRocket } from "react-icons/fa";

export default function WelcomeToProject() {
  return (
    <div className="container-custom section">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Introduction Card */}
        <div className="glass-card rounded-3xl p-8 md:p-10 border-2 border-primary/20 relative overflow-hidden group hover:border-primary/40 transition-all duration-500 animate-fadeIn">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <p className="relative text-lg md:text-xl text-foreground/90 leading-relaxed text-center">
            Explore the journey of my <span className="font-bold text-primary">creativity</span> and{" "}
            <span className="font-bold text-secondary">technical expertise</span> through the projects showcased here. 
            Each project represents a blend of innovation, problem-solving, and dedication to building impactful solutions.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn" style={{ animationDelay: '100ms' }}>
          {/* Innovation Card */}
          <div className="group relative bg-card border-2 border-border/50 hover:border-primary/50 rounded-2xl p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl overflow-hidden">
            {/* Gradient background on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative flex flex-col items-center text-center space-y-4">
              {/* Icon */}
              <div className="relative p-5 bg-blue-500/10 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300"></div>
                <FaLightbulb className="relative w-10 h-10 text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors duration-300" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-foreground">
                Innovation
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed">
                Creative solutions that push boundaries and explore new possibilities
              </p>

              {/* Decorative Line */}
              <div className="h-1 w-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full group-hover:w-20 transition-all duration-500"></div>
            </div>
          </div>

          {/* Technical Excellence Card */}
          <div className="group relative bg-card border-2 border-border/50 hover:border-primary/50 rounded-2xl p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl overflow-hidden">
            {/* Gradient background on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative flex flex-col items-center text-center space-y-4">
              {/* Icon */}
              <div className="relative p-5 bg-purple-500/10 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300"></div>
                <FaCode className="relative w-10 h-10 text-purple-600 dark:text-purple-400 group-hover:text-white transition-colors duration-300" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-foreground">
                Technical Excellence
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed">
                Built with cutting-edge technologies and best practices
              </p>

              {/* Decorative Line */}
              <div className="h-1 w-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full group-hover:w-20 transition-all duration-500"></div>
            </div>
          </div>

          {/* Real Impact Card */}
          <div className="group relative bg-card border-2 border-border/50 hover:border-primary/50 rounded-2xl p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl overflow-hidden">
            {/* Gradient background on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative flex flex-col items-center text-center space-y-4">
              {/* Icon */}
              <div className="relative p-5 bg-orange-500/10 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-600 to-red-600 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300"></div>
                <FaRocket className="relative w-10 h-10 text-orange-600 dark:text-orange-400 group-hover:text-white transition-colors duration-300" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-foreground">
                Real Impact
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed">
                Solutions designed to make a meaningful difference
              </p>

              {/* Decorative Line */}
              <div className="h-1 w-12 bg-gradient-to-r from-orange-600 to-red-600 rounded-full group-hover:w-20 transition-all duration-500"></div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="relative group rounded-3xl overflow-hidden animate-fadeIn" style={{ animationDelay: '200ms' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient"></div>
          
          <div className="relative p-8 md:p-10 text-center">
            <p className="text-xl md:text-2xl font-black text-white leading-relaxed drop-shadow-lg">
              Dive in, and feel free to connect if any of my work inspires or resonates with you! 🚀
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}