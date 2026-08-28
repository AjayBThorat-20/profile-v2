"use client";

import React, { useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface SectionIntroProps {
  intro: React.ReactNode;
  facts: { value: string; label: string }[];
  closingStatement?: string;
}

// Shared shell for a page's opening statement: an intro sentence, a row
// of real facts about the page's content, and an optional closing
// statement. Previously the middle row was a grid of 3 icon cards with
// "01/02/03" badges and stock virtue copy ("Innovation", "Team
// Collaboration", ...) that said nothing specific about this portfolio -
// replaced with actual numbers pulled from each page's own data.
export default function SectionIntro({ intro, facts, closingStatement }: SectionIntroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isRevealed = useScrollReveal(sectionRef);

  return (
    <div ref={sectionRef} className={`space-y-8 scroll-reveal ${isRevealed ? "is-visible" : ""}`}>
      <div className="panel rounded-2xl p-8 md:p-10">
        <p className="text-lg md:text-xl text-foreground/90 leading-relaxed text-center">{intro}</p>
      </div>

      {/* Grid, not flex-wrap: a flex row of these could shrink-wrap
          unpredictably depending on each label's length, forcing every
          item onto its own row on narrow screens (each one only
          70-90px tall, but 4 of them stacked pushes whatever comes
          after this section noticeably further down the page). A grid
          guarantees 2-up on mobile / all-in-a-row from sm: regardless
          of label length. */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-6 md:gap-x-10 justify-items-center sm:justify-items-start max-w-md sm:max-w-none mx-auto">
        {facts.map((fact) => (
          <div key={fact.label} className="stat-figure text-left">
            <div className="stat-figure-value text-2xl sm:text-3xl md:text-4xl text-foreground">{fact.value}</div>
            <div className="text-xs md:text-sm text-muted-foreground mt-1">{fact.label}</div>
          </div>
        ))}
      </div>

      {closingStatement && (
        <div className="panel rounded-2xl p-8 md:p-10 text-center border-l-4 border-l-primary">
          <p className="text-xl md:text-2xl font-black leading-relaxed text-foreground">{closingStatement}</p>
        </div>
      )}
    </div>
  );
}
