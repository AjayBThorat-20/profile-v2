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
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);
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

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 animate-fadeIn">
          {categories.map((category, index) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-2xl font-semibold border transition-colors duration-150 ${
                selectedCategory === category
                  ? "bg-primary text-primary-foreground border-primary shadow-lg"
                  : "border-border hover:border-primary/50"
              }`}
            >
              {category}
              {selectedCategory === category && (
                <span className="ml-2 inline-block w-2 h-2 bg-white rounded-full animate-pulse"></span>
              )}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 animate-fadeIn" style={{ animationDelay: '60ms' }}>
          {filteredSkills.map((skill) => {
            const SkillIcon = getSkillIcon(skill.text);
            const details = getSkillDetails(skill.text);
            const accent = getAccent(details.accentIndex);

            return (
              <div
                key={skill.id}
                className={`group relative border ${accent.border} rounded-2xl p-6 hover:-translate-y-1 transition-transform duration-200 overflow-hidden`}
                onMouseEnter={() => setHoveredSkill(skill.id)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                {/* Content */}
                <div className="relative z-10 flex flex-col items-center justify-center space-y-3 min-h-[100px]">
                  <IconTile icon={SkillIcon} accent={accent} size="lg" />

                  {/* Skill Name */}
                  <span className="text-sm font-semibold text-center leading-tight">
                    {skill.text}
                  </span>

                  {/* Category Badge - shows on hover */}
                  {hoveredSkill === skill.id && (
                    <div className="absolute -top-2 -right-2 animate-fadeIn">
                      <Badge accent={accent} className="text-[10px]">{details.category}</Badge>
                    </div>
                  )}
                </div>

                {/* Bottom accent line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 ${accent.bg} transform transition-transform duration-200 ${
                  hoveredSkill === skill.id ? "scale-x-100" : "scale-x-0"
                }`}></div>
              </div>
            );
          })}
        </div>

        {/* Proficiency Levels - More detailed and useful */}
        <div className="panel p-8 rounded-2xl animate-fadeIn" style={{ animationDelay: '120ms' }}>
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

                  {/* Progress bar */}
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${accent.bg} rounded-full transition-all duration-500 ease-out`}
                      style={{ width: `${item.level}%` }}
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