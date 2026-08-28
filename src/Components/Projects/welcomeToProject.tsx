"use client";

import React from "react";
import SectionIntro from "@/Components/UI/SectionIntro";

export default function WelcomeToProject() {
  return (
    <div className="container-custom section">
      <div className="max-w-5xl mx-auto">
        <SectionIntro
          intro={
            <>
              Four production projects and one open-source npm package I actively maintain —{" "}
              <span className="font-bold text-foreground">DevCompass</span>, a dependency-health CLI
              with real-time CVE scanning and AI-assisted fixes.
            </>
          }
          facts={[
            { value: "4", label: "Live projects" },
            { value: "1", label: "Open-source npm package" },
            { value: "500+", label: "Packages tracked by DevCompass" },
            { value: "4", label: "LLM providers integrated" },
          ]}
        />
      </div>
    </div>
  );
}
