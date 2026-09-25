"use client";

import Link from "next/link";
import React from "react";
import { FaArrowRight, FaDownload } from "react-icons/fa";
import { getAccent } from "@/Components/UI/accentColor";
import LiveTimecode from "@/Components/UI/LiveTimecode";
import Badge from "@/Components/UI/Badge";
import CountUp from "@/Components/UI/CountUp";
import ScrollCue from "@/Components/UI/ScrollCue";
import { getYearsOfExperienceLabel } from "@/lib/experience";

// No props: the `theme` prop this used to take was never read - every colour
// here comes from CSS custom properties that already flip with the .dark class,
// so the component has no need to know the mode. Passing it was what made Hero
// subscribe to the Redux store and re-render on every theme toggle.
export default function BasicInfo() {
  const metrics = [
    { value: "4+", label: "Production Systems" },
    { value: "500+", label: "Packages Tracked" },
    { value: getYearsOfExperienceLabel(), label: "Years Experience" },
  ];

  return (
    <div className="w-full space-y-8 md:space-y-10">
      {/* Availability status + live timecode */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 animate-fadeIn">
        {/* Ink, not green-400/500: this is a decorative "live" cue, not a
            semantic success state, and the palette is deliberately
            zero-saturation (see globals.css). The pulse alone carries the
            "live" reading without importing a hue the rest of the page
            never uses. */}
        <div className="eyebrow">
          <div className="relative flex h-2.5 w-2.5" aria-hidden="true">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground opacity-60"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-foreground"></span>
          </div>
          <span>Available for opportunities</span>
        </div>
        <LiveTimecode />
      </div>

      {/* Main Heading - Staggered reveal */}
      <div className="space-y-3 md:space-y-4">
        {/* Fluid clamp() instead of a text-5xl/6xl/7xl/8xl breakpoint
            ladder. The ladder held one size across each whole range, so
            the smallest step (text-6xl = 60px on the line below) had to
            fit the widest screen in its range and overflowed the
            narrowest: "Solutions" at 60px is ~295px of glyphs against
            272px of usable width on a 320px screen, which pushed a
            horizontal scrollbar onto the whole page. clamp() scales
            continuously with the viewport instead, so it fits at 320px
            and still reaches the same display size on desktop. */}
        <h1
          className="font-black tracking-tight leading-[0.95]"
          style={{ fontSize: "clamp(1.875rem, 0.95rem + 5.9vw, 6rem)" }}
        >
          <div className="overflow-hidden">
            <span className="block animate-slideInUp" style={{ animationDelay: '0ms' }}>
              <span className="text-foreground">Building</span>
            </span>
          </div>
          <div className="overflow-hidden">
            <span className="block animate-slideInUp" style={{ animationDelay: '60ms' }}>
              <span
                className="italic text-foreground"
                style={{ fontSize: "clamp(2.5rem, 1.25rem + 7.8vw, 8rem)" }}
              >
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
              <div className={`stat-figure-value text-2xl sm:text-3xl md:text-4xl ${accent.text}`}>
                <CountUp value={metric.value} />
              </div>
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
          <FaDownload className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-y-0.5 transition-transform duration-200" />
          <span>Download Resume</span>
          <FaArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
        </a>

        <Link
          href="#contact"
          className="magnetic btn-secondary group flex-1 px-5 py-3 md:px-6 md:py-4 text-sm md:text-base"
        >
          <span>Let’s Connect</span>
          <FaArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Scroll cue. Desktop only: on a phone the hero already ends mid-screen
          with the next section's edge visible, so "there is more below" needs
          no stating - and the cue would just add height to the one viewport
          that can least afford it. */}
      <div className="hidden md:flex pt-2 animate-fadeIn" style={{ animationDelay: '420ms' }}>
        <ScrollCue />
      </div>
    </div>
  );
}