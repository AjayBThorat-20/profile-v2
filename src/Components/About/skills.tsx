"use client";

import React from "react";
import WrapperLayout from "../Layout/wrapperLayout";
import { skillsData } from "@/constants/about";

export default function Skills() {
  return (
    <WrapperLayout firstPosition="My" secondPosition="Skills">
      {/* Skills Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 w-full max-w-6xl px-4 sm:px-6 md:px-8">
        {skillsData.map((skill) => (
          <div
            key={skill.id}
            className="relative flex items-center justify-center p-3 sm:p-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 shadow-md hover:shadow-lg transition-transform duration-300 transform hover:scale-105 group"
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-300"></div>

            {/* Skill Text */}
            <span className="relative z-10 text-white text-base sm:text-lg font-semibold">
              {skill.text}
            </span>
          </div>
        ))}
      </div>
    </WrapperLayout>
  );
}