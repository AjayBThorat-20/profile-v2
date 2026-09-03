"use client";

import React from "react";
import SectionIntro from "@/Components/UI/SectionIntro";
import { getYearsOfExperienceLabel } from "@/lib/experience";

export default function WelcomeToExperience() {
  return (
    <div className="container-custom section">
      <div className="max-w-5xl mx-auto">
        <SectionIntro
          intro={
            <>
              Currently a Junior Full Stack Developer at{" "}
              <span className="font-bold text-foreground">Mumbai Biocluster</span>, building
              production systems for real teams end to end.
            </>
          }
          facts={[
            { value: "2", label: "Companies" },
            { value: getYearsOfExperienceLabel(), label: "Years experience" },
            { value: "Present", label: "Currently at Mumbai Biocluster" },
          ]}
        />
      </div>
    </div>
  );
}
