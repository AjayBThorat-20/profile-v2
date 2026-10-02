// Server component: static copy plus SectionIntro, neither of which needs the client.
import React from "react";
import SectionIntro from "@/Components/UI/SectionIntro";
import { projectsData } from "@/constants/project";

export default function WelcomeToProject() {
  return (
    <div className="container-custom section">
      <div className="max-w-5xl mx-auto">
        <SectionIntro
          intro={
            <>
              {projectsData.length} projects, including{" "}
              <span className="font-bold text-foreground">DevCompass</span>, the open-source
              dependency-health CLI I actively maintain, with real-time CVE scanning and
              AI-assisted fixes.
            </>
          }
          facts={[
            // Counted from projectsData. Was "4 Live projects", but the other
            // three link to GitHub repos, not live deployments, and the intro
            // read as four projects *plus* DevCompass when it is one of them.
            { value: String(projectsData.length), label: "Projects" },
            { value: "1", label: "Open-source npm package" },
            { value: "500+", label: "Packages tracked by DevCompass" },
            { value: "4", label: "LLM providers integrated" },
          ]}
        />
      </div>
    </div>
  );
}
