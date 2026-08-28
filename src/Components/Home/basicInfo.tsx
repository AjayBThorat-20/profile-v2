"use client";

import Link from "next/link";
import React from "react";
import { FaArrowRight, FaDownload } from "react-icons/fa";
import { getAccent } from "@/Components/UI/accentColor";
import LiveTimecode from "@/Components/UI/LiveTimecode";
import Badge from "@/Components/UI/Badge";

interface BasicInfoProps {
  theme: "light" | "dark";
}

export default function BasicInfo({ theme }: BasicInfoProps) {
  const metrics = [
    { value: "4+", label: "Production Systems" },
    { value: "500+", label: "Packages Tracked" },
    { value: "1.7+", label: "Years Experience" },
  ];

  return (
    <div className="w-full space-y-8 md:space-y-10">
      {/* Availability status + live timecode */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 animate-fadeIn">
        <div className="eyebrow">
          <div className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </div>
          <span>Available for opportunities</span>
        </div>
        <LiveTimecode />
      </div>

      {/* Main Heading - Staggered reveal */}
      <div className="space-y-3 md:space-y-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight">
          <div className="overflow-hidden">
            <span className="block animate-slideInUp" style={{ animationDelay: '0ms' }}>
              <span className="text-foreground">Building</span>
            </span>
          </div>
          <div className="overflow-hidden">
            <span className="block animate-slideInUp" style={{ animationDelay: '60ms' }}>
              <span className="italic text-foreground text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
                Digital Solutions
              </span>
            </span>
          </div>
          <div className="overflow-hidden">
            <span className="block animate-slideInUp" style={{ animationDelay: '120ms' }}>
              <span className="text-foreground/80">That Scale</span>
            </span>
          </div>
        </h1>
      </div>

      {/* Role Tags */}
      <div className="flex flex-wrap gap-2 md:gap-3 animate-fadeIn" style={{ animationDelay: '180ms' }}>
        {["Full-Stack Developer", "Next.js · Node.js · PostgreSQL", "System Architect"].map((role, index) => {
          const accent = getAccent(index);
          return (
            <Badge key={role} accent={accent} className="font-mono text-xs md:text-sm py-1.5 md:py-2 px-3 md:px-4 hover:scale-105 transition-transform duration-150 cursor-default">
              {role}
            </Badge>
          );
        })}
      </div>

      {/* Metrics */}
      <div className="flex flex-wrap gap-x-6 gap-y-4 md:gap-x-12 animate-fadeIn" style={{ animationDelay: '220ms' }}>
        {metrics.map((metric, index) => {
          const accent = getAccent(index);
          return (
            <div key={metric.label} className="stat-figure">
              <div className={`stat-figure-value text-2xl sm:text-3xl md:text-4xl ${accent.text}`}>{metric.value}</div>
              <div className="text-xs md:text-sm text-muted-foreground mt-1">{metric.label}</div>
            </div>
          );
        })}
      </div>

      {/* Description with reveal effect */}
      <div className="space-y-2 md:space-y-3 animate-fadeIn" style={{ animationDelay: '280ms' }}>
        <p className="text-sm md:text-base lg:text-lg leading-relaxed text-foreground/90">
          Specialized in architecting <span className="font-bold text-foreground">scalable web applications</span> from concept to deployment.
          Experienced in building <span className="font-bold text-foreground">real-time systems</span> that handle production traffic.
        </p>
        <p className="text-xs md:text-sm lg:text-base leading-relaxed text-muted-foreground">
          From database optimization to UI/UX excellence — delivering complete solutions that solve real business problems.
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 md:gap-4 animate-fadeIn" style={{ animationDelay: '320ms' }}>
        <a
          href="/Resume/Ajay_Thorat.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="magnetic btn-primary group flex-1 px-5 py-3 md:px-6 md:py-4 text-sm md:text-base"
        >
          <FaDownload className="w-4 h-4 md:w-5 md:h-5" />
          <span>Download Resume</span>
          <FaArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
        </a>

        <Link
          href="/contact"
          className="magnetic btn-secondary group flex-1 px-5 py-3 md:px-6 md:py-4 text-sm md:text-base"
        >
          <span>Let's Connect</span>
          <FaArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}