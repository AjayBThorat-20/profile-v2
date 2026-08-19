"use client";

import React from "react";
import { FaCode, FaLightbulb, FaRocket } from "react-icons/fa";
import SectionIntro from "@/Components/UI/SectionIntro";

export default function WelcomeToProject() {
  return (
    <div className="container-custom section">
      <div className="max-w-5xl mx-auto">
        <SectionIntro
          intro={
            <>
              Explore the journey of my <span className="font-bold text-primary">creativity</span> and{" "}
              <span className="font-bold text-secondary">technical expertise</span> through the projects showcased here.
              Each project represents a blend of innovation, problem-solving, and dedication to building impactful solutions.
            </>
          }
          features={[
            {
              icon: FaLightbulb,
              title: "Innovation",
              description: "Creative solutions that push boundaries and explore new possibilities",
            },
            {
              icon: FaCode,
              title: "Technical Excellence",
              description: "Built with cutting-edge technologies and best practices",
            },
            {
              icon: FaRocket,
              title: "Real Impact",
              description: "Solutions designed to make a meaningful difference",
            },
          ]}
          closingStatement="Dive in, and feel free to connect if any of my work inspires or resonates with you."
        />
      </div>
    </div>
  );
}
