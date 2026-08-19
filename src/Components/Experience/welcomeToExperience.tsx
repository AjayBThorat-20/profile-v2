"use client";

import React from "react";
import { FaBriefcase, FaRocket, FaUsers } from "react-icons/fa";
import SectionIntro from "@/Components/UI/SectionIntro";

export default function WelcomeToExperience() {
  return (
    <div className="container-custom section">
      <div className="max-w-5xl mx-auto">
        <SectionIntro
          intro={
            <>
              My professional journey reflects a commitment to{" "}
              <span className="font-bold text-primary">continuous learning</span>,{" "}
              <span className="font-bold text-secondary">collaborative teamwork</span>, and delivering{" "}
              <span className="font-bold text-accent">scalable solutions</span> that drive real business impact.
            </>
          }
          features={[
            {
              icon: FaBriefcase,
              title: "Hands-On Experience",
              description: "Building production-ready applications and managing real-world projects",
            },
            {
              icon: FaUsers,
              title: "Team Collaboration",
              description: "Working in agile teams to deliver high-quality solutions on time",
            },
            {
              icon: FaRocket,
              title: "Growth Mindset",
              description: "Constantly learning new technologies and adapting to challenges",
            },
          ]}
          closingStatement="Explore my journey and see how I've contributed to building innovative solutions."
        />
      </div>
    </div>
  );
}
