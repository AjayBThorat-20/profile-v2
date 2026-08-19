import React from "react";
import { IconType } from "react-icons";
import { getAccent } from "./accentColor";
import IconTile from "./IconTile";

interface FeatureCardData {
  icon: IconType;
  title: string;
  description: string;
}

interface SectionIntroProps {
  intro: React.ReactNode;
  features: FeatureCardData[];
  closingStatement: string;
}

// Shared shell for what used to be two near word-for-word duplicate
// components (welcomeToProject.tsx / welcomeToExperience.tsx): an intro
// statement, a row of feature cards, and a closing statement panel.
// Each page now just supplies its own copy/icons as props.
export default function SectionIntro({ intro, features, closingStatement }: SectionIntroProps) {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="panel rounded-2xl p-8 md:p-10">
        <p className="text-lg md:text-xl text-foreground/90 leading-relaxed text-center">{intro}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const accent = getAccent(index);
          return (
            <div
              key={feature.title}
              className={`group panel rounded-2xl p-6 hover:-translate-y-1 transition-transform duration-200`}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <IconTile icon={feature.icon} accent={accent} index={index} size="lg" />
                <h3 className="text-xl font-bold text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                <div className={`h-0.5 w-10 ${accent.bg} rounded-full`}></div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="panel rounded-2xl p-8 md:p-10 text-center border-l-4 border-l-primary">
        <p className="text-xl md:text-2xl font-black leading-relaxed text-foreground">{closingStatement}</p>
      </div>
    </div>
  );
}
