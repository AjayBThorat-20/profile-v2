"use client";

import React from "react";
import WrapperLayout from "../Layout/wrapperLayout";
import { FaCode, FaLightbulb, FaRocket } from "react-icons/fa";

export default function WelcomeToProject() {
  return (
    <WrapperLayout firstPosition="Welcome to My" secondPosition="Projects">
      {/* Hero Section */}
      <div className="w-full max-w-5xl mx-auto space-y-8">
        {/* Introduction */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed text-center">
            Explore the journey of my creativity and technical expertise through
            the projects showcased here. Each project represents a blend of
            innovation, problem-solving, and dedication to building impactful
            solutions.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {/* Card 1: Innovation */}
          <div className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:-translate-y-2">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full group-hover:scale-110 transition-transform duration-300">
                <FaLightbulb className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Innovation
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Creative solutions that push boundaries and explore new
                possibilities
              </p>
            </div>
          </div>

          {/* Card 2: Technical Excellence */}
          <div className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:-translate-y-2">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-4 bg-cyan-100 dark:bg-cyan-900/30 rounded-full group-hover:scale-110 transition-transform duration-300">
                <FaCode className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Technical Excellence
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Built with cutting-edge technologies and best practices
              </p>
            </div>
          </div>

          {/* Card 3: Impact */}
          <div className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:-translate-y-2">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-full group-hover:scale-110 transition-transform duration-300">
                <FaRocket className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Real Impact
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Solutions designed to make a meaningful difference
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 shadow-xl text-center mt-8">
          <p className="text-xl md:text-2xl font-bold text-white leading-relaxed">
            Dive in, and feel free to connect if any of my work inspires or
            resonates with you! 🚀
          </p>
        </div>
      </div>
    </WrapperLayout>
  );
}