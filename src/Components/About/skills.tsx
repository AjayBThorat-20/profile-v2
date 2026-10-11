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
  FaAws,
  FaKey,
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
  SiSupabase,
  SiTypescript,
  SiPostgresql,
  SiRedis,
  SiRazorpay
} from "react-icons/si";
import { IconType } from "react-icons";
import { getAccent } from "@/Components/UI/accentColor";
import IconTile from "@/Components/UI/IconTile";
import Badge from "@/Components/UI/Badge";
import SectionEyebrow from "@/Components/UI/SectionEyebrow";
import { getSkillSourceCount, getSkillUsage } from "@/lib/experience";

// Grouped by what each skill is used for. Only skills with at least one role or
// project behind them are shown, so the block never lists a skill it cannot back up.
const skillGroups = [
  { category: "Frontend", skills: ["Next.js", "React.js", "Tailwind CSS", "TypeScript"] },
  { category: "Backend", skills: ["Node.js", "Python"] },
  { category: "Data & Infrastructure", skills: ["PostgreSQL", "Prisma ORM", "MongoDB", "MySQL", "Redis"] },
  { category: "Integrations", skills: ["Razorpay", "AWS S3", "Supabase", "Clerk Auth"] },
];

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
      "Express.js": SiExpress,
      "TypeScript": SiTypescript,
      "PostgreSQL": SiPostgresql,
      "Redis": SiRedis,
      "NextAuth.js": FaKey,
      "AWS S3": FaAws,
      "Razorpay": SiRazorpay
    };
    
    return iconMap[skillText] || FaCode;
  };

  // Get category (and a stable accent index, cycled through the brand
  // palette instead of a category-specific rainbow color) for a skill
  const getSkillDetails = (skillText: string): { category: string; accentIndex: number } => {
    const languages = ["Node.js", "Python", "JavaScript", "TypeScript"];
    const frameworks = ["Next.js", "React.js", "Express.js", "Bootstrap", "Tailwind CSS"];
    const databases = ["MySQL", "MongoDB", "SQL Server", "Prisma ORM", "Supabase", "PostgreSQL", "Redis"];
    const tools = ["GitHub", "Docker", "Postman", "Pentaho", "Clerk Auth", "NextAuth.js", "AWS S3", "Razorpay"];

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
        {/* --stagger-step is set low here: 24 tiles at the default 70ms would
            take well over a second to finish dealing out, which stops reading
            as a reveal and starts reading as a slow page.
            Three columns from the smallest screen up, not two: at two, the 24
            tiles stacked into twelve rows - over two full phone screens of
            scrolling for one list. Three halves that cost to eight rows, and
            the tighter mobile padding keeps every label on at most two lines. */}
        <div
          className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4"
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
                  className={`relative overflow-hidden border ${accent.border} rounded-lg p-3 sm:p-6 tile-3d group-hover:border-foreground/40`}
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

        {/* Where each skill shows up. Counts are the roles and projects whose
            tech stack lists the skill (see getSkillUsage), not a self-rated
            level, so every number can be traced to a role or project. */}
        <div className="panel p-8 rounded-lg animate-fadeIn" style={{ animationDelay: '120ms' }}>
          <div className="flex flex-col items-center gap-2 mb-6">
            <h3 className="eyebrow">Where I’ve Used Them</h3>
            <p className="text-xs text-muted-foreground text-center">
              Roles and projects each skill appears in, out of {getSkillSourceCount()}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillGroups.map((group) => {
              const usage = group.skills
                .map((skill) => ({ skill, count: getSkillUsage(skill) }))
                .filter((item) => item.count > 0)
                .sort((a, b) => b.count - a.count);
              return (
                <div key={group.category} className="space-y-3">
                  <h4 className="font-bold text-foreground">{group.category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {usage.map(({ skill, count }) => (
                      <Badge key={skill}>
                        {skill}
                        <span className="ml-2 font-mono font-bold">{count}</span>
                      </Badge>
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