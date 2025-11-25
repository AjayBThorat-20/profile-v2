"use client";
import React from "react";
import WrapperLayout from "../Layout/wrapperLayout";
import {
  FaMedal,
  FaLightbulb,
  FaTools,
  FaChartLine,
  FaRocket,
} from "react-icons/fa";

export default function WelcomeToExperience() {
  const highlights = [
    {
      icon: FaMedal,
      title: "Milestones Achieved",
      description:
        "A glimpse into the challenges I've conquered and the goals I've surpassed.",
      color: "from-yellow-500 to-orange-500",
      bgColor: "from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20",
    },
    {
      icon: FaLightbulb,
      title: "Ideas Realized",
      description:
        "Creative solutions and impactful projects that shaped my growth.",
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20",
    },
    {
      icon: FaTools,
      title: "Skills Honed",
      description: "The tools and expertise I bring to the table.",
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20",
    },
  ];

  return (
    <WrapperLayout firstPosition="Welcome to My" secondPosition="Journey">
      <div className="max-w-6xl mx-auto space-y-12 px-4">
        {/* Hero Description */}
        <div className="text-center space-y-6">
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Explore the milestones, ideas, and skills that define my
            professional and personal growth.
          </p>

          {/* Visual Divider */}
          <div className="flex items-center justify-center gap-2">
            <div className="h-1 w-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full"></div>
            <FaChartLine className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <div className="h-1 w-16 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full"></div>
          </div>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map((highlight, index) => (
            <div
              key={index}
              className={`group relative bg-gradient-to-br ${highlight.bgColor} p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:-translate-y-2`}
            >
              {/* Icon */}
              <div
                className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${highlight.color} rounded-2xl shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <highlight.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {highlight.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {highlight.description}
              </p>

              {/* Decorative Element */}
              <div
                className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${highlight.color} opacity-10 rounded-bl-full`}
              ></div>
            </div>
          ))}
        </div>

        

        {/* Closing Statement */}
        <div className="relative bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 md:p-12 shadow-2xl overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
              <FaRocket className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
              A Story of Growth, Innovation, and Success
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Explore how these experiences come together to tell a compelling
              narrative of continuous learning and achievement.
            </p>
          </div>
        </div>
      </div>
    </WrapperLayout>
  );
}