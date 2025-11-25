"use client";

import React, { useState } from "react";
import WrapperLayout from "../Layout/wrapperLayout";
import { skillsData } from "@/constants/about";
import { 
  FaNode, 
  FaPython, 
  FaReact, 
  FaDatabase, 
  FaDocker, 
  FaGithub,
  FaBootstrap,
  FaCode,
  FaServer,
  FaCog,
  FaTools,
  FaCloud
} from "react-icons/fa";
import { 
  SiNextdotjs, 
  SiTailwindcss, 
  SiJavascript, 
  SiMysql, 
  SiMongodb, 
  SiPrisma,
  SiExpress,
  SiPostman,
  SiSupabase
} from "react-icons/si";
import { IconType } from "react-icons";

export default function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);

  // Map skill names to specific icons
  const getSkillIcon = (skillText: string): IconType => {
    const iconMap: Record<string, IconType> = {
      "Node.js": FaNode,
      "Python": FaPython,
      "Next.js": SiNextdotjs,
      "React.js": FaReact,
      "Tailwind CSS": SiTailwindcss,
      "JavaScript": SiJavascript,
      "Bootstrap": FaBootstrap,
      "MySQL": SiMysql,
      "MongoDB": SiMongodb,
      "Prisma ORM": SiPrisma,
      "Clerk Auth": FaCode,
      "GitHub": FaGithub,
      "Docker": FaDocker,
      "SQL Server": FaDatabase,
      "Postman": SiPostman,
      "Pentaho": FaServer,
      "Supabase": SiSupabase,
      "Express.js": SiExpress
    };
    
    return iconMap[skillText] || FaCode;
  };

  // Get category color based on skill type
  const getSkillCategory = (skillText: string): { from: string; to: string } => {
    const languages = ["Node.js", "Python", "JavaScript"];
    const frameworks = ["Next.js", "React.js", "Express.js", "Bootstrap", "Tailwind CSS"];
    const databases = ["MySQL", "MongoDB", "SQL Server", "Prisma ORM", "Supabase"];
    const tools = ["GitHub", "Docker", "Postman", "Pentaho", "Clerk Auth"];

    if (languages.includes(skillText)) {
      return { from: "from-blue-600", to: "to-cyan-600" };
    } else if (frameworks.includes(skillText)) {
      return { from: "from-purple-600", to: "to-pink-600" };
    } else if (databases.includes(skillText)) {
      return { from: "from-green-600", to: "to-emerald-600" };
    } else if (tools.includes(skillText)) {
      return { from: "from-orange-600", to: "to-red-600" };
    }
    return { from: "from-gray-600", to: "to-gray-800" };
  };

  return (
    <WrapperLayout firstPosition="My" secondPosition="Skills">
      <div className="space-y-12 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-full border border-blue-200 dark:border-blue-800">
            <FaCog className="w-4 h-4 text-blue-600 dark:text-blue-400 animate-spin-slow" />
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              Technical Expertise
            </span>
          </div>
          <p className="text-base text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A comprehensive toolkit of technologies and frameworks I use to build
            innovative and scalable solutions.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {skillsData.map((skill, index) => {
            const SkillIcon = getSkillIcon(skill.text);
            const colors = getSkillCategory(skill.text);
            
            return (
              <div
                key={skill.id}
                className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 hover:-translate-y-2"
                style={{
                  animation: `fadeIn 0.5s ease-out ${index * 0.03}s both`
                }}
                onMouseEnter={() => setHoveredSkill(skill.id)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                {/* Gradient background overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${colors.from}/10 ${colors.to}/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

                {/* Shimmer Effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                {/* Content */}
                <div className="relative p-4 flex flex-col items-center justify-center space-y-3 min-h-[110px]">
                  {/* Icon */}
                  <div className={`w-10 h-10 bg-gradient-to-br ${colors.from} ${colors.to} rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    <SkillIcon className="w-5 h-5 text-white" />
                  </div>

                  {/* Skill Name */}
                  <span className="text-sm font-semibold text-gray-900 dark:text-white text-center leading-tight">
                    {skill.text}
                  </span>

                  {/* Hover indicator */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${colors.from} ${colors.to} transform transition-transform duration-300 ${
                      hoveredSkill === skill.id
                        ? "scale-x-100"
                        : "scale-x-0"
                    }`}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Category Legend */}
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          {[
            { label: "Languages", from: "from-blue-600", to: "to-cyan-600" },
            { label: "Frameworks", from: "from-purple-600", to: "to-pink-600" },
            { label: "Databases", from: "from-green-600", to: "to-emerald-600" },
            { label: "Tools", from: "from-orange-600", to: "to-red-600" },
          ].map((category, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${category.from} ${category.to}`}></div>
              <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                {category.label}
              </span>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Languages", count: 3, gradient: "from-blue-600 to-cyan-600" },
            { label: "Frameworks", count: 5, gradient: "from-purple-600 to-pink-600" },
            { label: "Databases", count: 5, gradient: "from-green-600 to-emerald-600" },
            { label: "Total Skills", count: skillsData.length, gradient: "from-orange-600 to-red-600" },
          ].map((stat, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 text-center border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              style={{
                animation: `fadeIn 0.6s ease-out ${index * 0.1 + 0.5}s both`
              }}
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
              
              <div className="relative">
                <div className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}>
                  {stat.count}+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </WrapperLayout>
  );
}