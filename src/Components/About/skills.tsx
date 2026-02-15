"use client";

import React, { useState } from "react";
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

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);

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

  // Get category and color based on skill type
  const getSkillDetails = (skillText: string): { category: string; from: string; to: string; bg: string } => {
    const languages = ["Node.js", "Python", "JavaScript"];
    const frameworks = ["Next.js", "React.js", "Express.js", "Bootstrap", "Tailwind CSS"];
    const databases = ["MySQL", "MongoDB", "SQL Server", "Prisma ORM", "Supabase"];
    const tools = ["GitHub", "Docker", "Postman", "Pentaho", "Clerk Auth"];

    if (languages.includes(skillText)) {
      return { 
        category: "Languages", 
        from: "from-blue-500", 
        to: "to-cyan-500",
        bg: "bg-blue-500/10"
      };
    } else if (frameworks.includes(skillText)) {
      return { 
        category: "Frameworks", 
        from: "from-purple-500", 
        to: "to-pink-500",
        bg: "bg-purple-500/10"
      };
    } else if (databases.includes(skillText)) {
      return { 
        category: "Databases", 
        from: "from-green-500", 
        to: "to-emerald-500",
        bg: "bg-green-500/10"
      };
    } else if (tools.includes(skillText)) {
      return { 
        category: "Tools", 
        from: "from-orange-500", 
        to: "to-red-500",
        bg: "bg-orange-500/10"
      };
    }
    return { 
      category: "Other", 
      from: "from-gray-600", 
      to: "to-gray-800",
      bg: "bg-gray-500/10"
    };
  };

  const categories = ["All", "Languages", "Frameworks", "Databases", "Tools"];

  const filteredSkills = selectedCategory === "All" 
    ? skillsData 
    : skillsData.filter(skill => getSkillDetails(skill.text).category === selectedCategory);

  return (
    <div className="container-custom section">
      <div className="space-y-12 max-w-7xl mx-auto">
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 animate-fadeIn">
          {categories.map((category, index) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-lg scale-105"
                  : "glass-card hover:scale-105 border border-border/50 hover:border-primary/50"
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 animate-fadeIn" style={{ animationDelay: '100ms' }}>
          {filteredSkills.map((skill, index) => {
            const SkillIcon = getSkillIcon(skill.text);
            const details = getSkillDetails(skill.text);
            
            return (
              <div
                key={skill.id}
                className="group relative card-interactive p-6 hover:scale-105 transition-all duration-300 overflow-hidden"
                onMouseEnter={() => setHoveredSkill(skill.id)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                {/* Gradient background overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${details.from} ${details.to} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center justify-center space-y-3 min-h-[100px]">
                  {/* Icon with gradient background */}
                  <div className={`w-14 h-14 bg-gradient-to-br ${details.from} ${details.to} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    <SkillIcon className="w-7 h-7 text-white" />
                  </div>

                  {/* Skill Name */}
                  <span className="text-sm font-semibold text-center leading-tight">
                    {skill.text}
                  </span>

                  {/* Category Badge - shows on hover */}
                  {hoveredSkill === skill.id && (
                    <div className="absolute -top-2 -right-2 animate-fadeIn">
                      <div className={`px-2 py-1 rounded-lg text-[10px] font-bold text-white bg-gradient-to-r ${details.from} ${details.to} shadow-lg`}>
                        {details.category}
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom gradient line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${details.from} ${details.to} transform transition-transform duration-300 ${
                  hoveredSkill === skill.id ? "scale-x-100" : "scale-x-0"
                }`}></div>
              </div>
            );
          })}
        </div>

        {/* Proficiency Levels - More detailed and useful */}
        <div className="glass-card p-8 rounded-3xl border-2 border-primary/20 animate-fadeIn" style={{ animationDelay: '200ms' }}>
          <h3 className="text-2xl font-bold mb-6 text-center">
            <span className="gradient-text-animated">Proficiency Overview</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { 
                category: "Frontend Development", 
                skills: ["Next.js", "React.js", "Tailwind CSS"], 
                level: 90,
                gradient: "from-blue-500 to-cyan-500"
              },
              { 
                category: "Backend Development", 
                skills: ["Node.js", "Express.js", "Python"], 
                level: 85,
                gradient: "from-purple-500 to-pink-500"
              },
              { 
                category: "Database Management", 
                skills: ["MongoDB", "MySQL", "Prisma"], 
                level: 88,
                gradient: "from-green-500 to-emerald-500"
              },
              { 
                category: "DevOps & Tools", 
                skills: ["Docker", "GitHub", "Postman"], 
                level: 80,
                gradient: "from-orange-500 to-red-500"
              },
            ].map((item, index) => (
              <div key={index} className="space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-foreground">{item.category}</h4>
                  <span className={`text-sm font-bold bg-gradient-to-r ${item.gradient} bg-clip-text`} style={{ color: 'transparent', WebkitTextFillColor: 'transparent', backgroundClip: 'text', WebkitBackgroundClip: 'text' }}>
                    {item.level}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${item.gradient} rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${item.level}%` }}
                  ></div>
                </div>

                {/* Skills list */}
                <div className="flex flex-wrap gap-2">
                  {item.skills.map((skill, idx) => (
                    <span 
                      key={idx}
                      className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}