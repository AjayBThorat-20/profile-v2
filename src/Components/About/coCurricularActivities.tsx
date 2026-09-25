// Server component. It carried "use client" only so it could call
// useScrollReveal for its entrance animation; that is now driven by the
// `data-reveal` attribute and one shared observer (see UI/RevealObserver), so
// none of this markup needs to ship to the browser or hydrate.
import React from "react";
import { coCurricularActivitiesData } from "@/constants/about";
import { FaFire, FaHandsHelping, FaLaptopCode, FaRocket } from "react-icons/fa";
import { IconType } from "react-icons";
import { getAccent } from "@/Components/UI/accentColor";
import IconTile from "@/Components/UI/IconTile";
import SectionEyebrow from "@/Components/UI/SectionEyebrow";

const ACTIVITY_ICONS: Record<string, IconType> = {
  "Ignite and Concat": FaFire,
  "ISR and DLLE (Social Activity)": FaHandsHelping,
  "SkillFull Netizen": FaLaptopCode,
  "16-Day Internship Sprints": FaRocket,
};

export default function CoCurricularActivities() {

  return (
    <div id="activities" data-reveal className="container-custom section scroll-mt-36">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4 animate-fadeIn">
          <div className="flex justify-center">
            <SectionEyebrow index="03" icon={FaRocket} label="Beyond Academics" />
          </div>
          <p className="text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Activities that shaped leadership, teamwork, and creative problem-solving skills.
          </p>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coCurricularActivitiesData.map((activity, index) => {
            const ActivityIcon = ACTIVITY_ICONS[activity.Name] || FaRocket;
            const accent = getAccent(index);

            return (
              <div
                key={activity.id}
                className={`spotlight group relative entry-card ${accent.border} p-6 overflow-hidden animate-fadeIn`}
                style={{ animationDelay: `${index * 60}ms` }}
              >
                {/* Content */}
                <div className="relative h-full flex flex-col space-y-4">
                  <IconTile icon={ActivityIcon} accent={accent} size="lg" />

                  <h3 className="text-xl font-bold text-foreground leading-tight">
                    {activity.Name}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed grow">
                    {activity.description}
                  </p>

                  {/* Decorative line */}
                  <div className={`h-0.5 w-12 ${accent.bg} rounded-full group-hover:w-20 transition-all duration-300`}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
