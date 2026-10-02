// Server component: static copy plus SectionIntro, neither of which needs the client.
import React from "react";
import SectionIntro from "@/Components/UI/SectionIntro";
import { getYearsOfExperienceLabel } from "@/lib/experience";
import { experienceData } from "@/constants/experience";

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
            // Counted from experienceData, not typed in, so it can't drift
            // from the roles actually listed (it once read "2" beside three).
            { value: String(experienceData.length), label: "Companies" },
            { value: getYearsOfExperienceLabel(), label: "Years experience" },
            { value: "Present", label: "Currently at Mumbai Biocluster" },
          ]}
        />
      </div>
    </div>
  );
}
