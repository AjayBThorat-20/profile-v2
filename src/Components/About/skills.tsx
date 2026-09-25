"use client";

import React, { useRef, useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { skillsData } from "@/constants/about";
import { 
  FaNode, 
  FaPython, 
  FaReact, 
  FaDatabase, 
  FaDocker, 
  FaGithub,
  FaBootstrap,
  FaCode,
  FaServer,
} from "react-icons/fa";
import { 
  SiNextdotjs, 
  SiTailwindcss, 
  SiJavascript, 
  SiMysql, 
  SiMongodb, 
  SiPrisma,
  SiExpress,
  SiPostman,
  SiSupabase
} from "react-icons/si";
import { IconType } from "react-icons";
import { getAccent } from "@/Components/UI/accentColor";
import IconTile from "@/Components/UI/IconTile";
import Badge from "@/Components/UI/Badge";
import SectionEyebrow from "@/Components/UI/SectionEyebrow";

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const sectionRef = useRef<HTMLDivElement>(null);
  const isRevealed = useScrollReveal(sectionRef);

  // Map skill names to specific icons
  const getSkillIcon = (skillText: string): IconType => {
    const iconMap: Record<string, IconType> = {
      "Node.js": FaNode,
      "Python": FaPython,
      "Next.js": SiNextdotjs,
      "React.js": FaReact,
      "Tailwind CSS": SiTailwindcss,
      "JavaScript": SiJavascript,
      "Bootstrap": FaBootstrap,
      "MySQL": SiMysql,
      "MongoDB": SiMongodb,
      "Prisma ORM": SiPrisma,
      "Clerk Auth": FaCode,
      "GitHub": FaGithub,
      "Docker": FaDocker,
      "SQL Server": FaDatabase,
      "Postman": SiPostman,
      "Pentaho": FaServer,
      "Supabase": SiSupabase,
      "Express.js": SiExpress
    };
    
    return iconMap[skillText] || FaCode;
  };

  // Get category (and a stable accent index, cycled through the brand
  // palette instead of a category-specific rainbow color) for a skill
  const getSkillDetails = (skillText: string): { category: string; accentIndex: number } => {
    const languages = ["Node.js", "Python", "JavaScript"];
    const frameworks = ["Next.js", "React.js", "Express.js", "Bootstrap", "Tailwind CSS"];
    const databases = ["MySQL", "MongoDB", "SQL Server", "Prisma ORM", "Supabase"];
    const tools = ["GitHub", "Docker", "Postman", "Pentaho", "Clerk Auth"];

    if (languages.includes(skillText)) return { category: "Languages", accentIndex: 0 };
    if (frameworks.includes(skillText)) return { category: "Frameworks", accentIndex: 1 };
    if (databases.includes(skillText)) return { category: "Databases", accentIndex: 2 };
    if (tools.includes(skillText)) return { category: "Tools", accentIndex: 0 };
    return { category: "Other", accentIndex: 1 };
  };

  const categories = ["All", "Languages", "Frameworks", "Databases", "Tools"];

  const filteredSkills = selectedCategory === "All" 
    ? skillsData 
    : skillsData.filter(skill => getSkillDetails(skill.text).category === selectedCategory);

  return (
    <div id="skills" ref={sectionRef} className={`container-custom section scroll-reveal scroll-mt-36 ${isRevealed ? "is-visible" : ""}`}>
      <div className="space-y-12 max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex justify-center animate-fadeIn">
          <SectionEyebrow index="01" icon={FaCode} label="Skills & Stack" />
        </div>

        {/* Category Filter. A single scrollable rail on mobile rather than
            flex-wrap: five px-6 pills wrap to three ragged centred rows
            under ~400px, which reads as broken alignment. Horizontal
            scroll keeps them on one line and makes the overflow legible
            as "there is more this way". Negative margin + matching padding
            lets the rail bleed to the screen edges so the last pill isn't
            clipped flush against the container gutter. */}
        <div
          role="tablist"
          aria-label="Filter skills by category"
          className="flex gap-3 overflow-x-auto hide-scrollbar -mx-6 px-6 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center animate-fadeIn"
        >
          {categories.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedCategory(category)}
                className={`shrink-0 px-5 py-2.5 md:px-6 md:py-3 rounded-lg font-semibold border transition-colors duration-150 ${
                  isSelected
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border hover:border-primary/50 hover:bg-muted"
                }`}
              >
                {category}
                {isSelected && (
                  /* bg-primary-foreground, not bg-white: --primary flips to
                     near-white in dark mode, so a hardcoded white dot on a
                     bg-primary pill was white-on-white and invisible for
                     every dark-mode visitor. */
                  <span className="ml-2 inline-block w-2 h-2 bg-primary-foreground rounded-full" aria-hidden="true"></span>
                )}
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        {/* --stagger-step is set low here: 18 tiles at the default 70ms would
            take over a second to finish dealing out, which stops reading as a
            reveal and starts reading as a slow page. */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
          style={{ "--stagger-step": "35ms" } as React.CSSProperties}
        >
          {filteredSkills.map((skill, skillIdx) => {
            const SkillIcon = getSkillIcon(skill.text);
            const details = getSkillDetails(skill.text);
            const accent = getAccent(details.accentIndex);

            return (
              /* Hover state is pure CSS group-hover rather than a
                 `hoveredSkill` React state: that state lived on the whole
                 grid, so moving the pointer across the tiles re-rendered
                 all 18 of them on every enter and leave to restyle one.
                 It also made the badge mount and unmount, which is why it
                 popped in with no way to animate out - it now fades and
                 lifts in both directions. */
              /* Two nested boxes on purpose: the inner one clips (so the
                 bottom accent rule can't square off the rounded corners),
                 the outer one doesn't (so the category badge can hang past
                 the tile's edge). They used to be one box with
                 overflow-hidden, which clipped the badge - it sat at
                 -top-2 -right-2 and had its top-right corner sliced off. */
              <div
                key={skill.id}
                className="group relative stagger-child"
                style={{ "--stagger-i": skillIdx } as React.CSSProperties}
              >
                {/* tile-3d replaces the old group-hover:-translate-y-1: the
                    tile now pushes toward the viewer and pitches back rather
                    than sliding up the page. Both can't coexist - they set the
                    same property - so the 2D lift is gone rather than being
                    overridden. */}
                <div
                  className={`relative overflow-hidden border ${accent.border} rounded-lg p-4 sm:p-6 tile-3d group-hover:border-foreground/40`}
                >
                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center justify-center space-y-3 min-h-25">
                    <IconTile icon={SkillIcon} accent={accent} size="lg" />

                    {/* Skill Name */}
                    <span className="text-sm font-semibold text-center leading-tight">
                      {skill.text}
                    </span>
                  </div>

                  {/* Bottom accent line */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 origin-left ${accent.bg} scale-x-0 transition-transform duration-200 group-hover:scale-x-100`}></div>
                </div>

                {/* Category Badge - shows on hover */}
                <div className="pointer-events-none absolute -top-2.5 -right-2.5 z-20 opacity-0 translate-y-1 transition-[opacity,transform] duration-200 group-hover:opacity-100 group-hover:translate-y-0">
                  <Badge accent={accent} className="text-[10px] bg-card">{details.category}</Badge>
                </div>
              </div>
            );
          })}
        </div>

        {/* Proficiency Levels - More detailed and useful */}
        <div className="panel p-8 rounded-lg animate-fadeIn" style={{ animationDelay: '120ms' }}>
          <div className="flex justify-center mb-6">
            <h3 className="eyebrow">Proficiency Overview</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { category: "Frontend Development", skills: ["Next.js", "React.js", "Tailwind CSS"], level: 90 },
              { category: "Backend Development", skills: ["Node.js", "Express.js", "Python"], level: 85 },
              { category: "Database Management", skills: ["MongoDB", "MySQL", "Prisma"], level: 88 },
              { category: "DevOps & Tools", skills: ["Docker", "GitHub", "Postman"], level: 80 },
            ].map((item, index) => {
              const accent = getAccent(index);
              return (
                <div key={item.category} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-foreground">{item.category}</h4>
                    <span className="font-mono text-sm font-bold text-foreground">{item.level}%</span>
                  </div>

                  {/* Progress bar. The fill is keyed off isRevealed so it
                      actually grows when the section scrolls into view -
                      it already carried a transition, but its width was a
                      constant, so there was never a change to transition
                      from and the bars simply appeared at full length.
                      scaleX rather than width keeps the animation on the
                      compositor, and the stagger walks the four bars in
                      sequence instead of firing them as one block. */}
                  <div
                    className="h-3 bg-muted rounded-full overflow-hidden"
                    role="progressbar"
                    aria-label={`${item.category} proficiency`}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={item.level}
                  >
                    <div
                      className={`h-full w-full origin-left ${accent.bg} rounded-full transition-transform duration-700 ease-out`}
                      style={{
                        transform: `scaleX(${isRevealed ? item.level / 100 : 0})`,
                        transitionDelay: `${index * 90}ms`,
                      }}
                    ></div>
                  </div>

                  {/* Skills list */}
                  <div className="flex flex-wrap gap-2">
                    {item.skills.map((skill) => (
                      <Badge key={skill}>{skill}</Badge>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}