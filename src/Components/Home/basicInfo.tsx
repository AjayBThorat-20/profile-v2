"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaArrowRight, FaDownload, FaCode, FaRocket, FaCog } from "react-icons/fa";
import { getAccent } from "@/Components/UI/accentColor";

interface BasicInfoProps {
  theme: "light" | "dark";
}

export default function BasicInfo({ theme }: BasicInfoProps) {
  const [activeMetric, setActiveMetric] = useState(0);

  // Auto-rotate active metric
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const metrics = [
    {
      icon: FaRocket,
      value: "4+",
      label: "Production Systems",
      description: "Live full-stack apps serving real users"
    },
    {
      icon: FaCode,
      value: "500+",
      label: "Packages Tracked",
      description: "By DevCompass, my open-source dependency CLI"
    },
    {
      icon: FaCog,
      value: "1.7+",
      label: "Years Experience",
      description: "Building production-ready solutions"
    },
  ];
  const activeAccent = getAccent(activeMetric);

  return (
    <div className="w-full space-y-8 md:space-y-10">
      {/* Availability status */}
      <div className="eyebrow animate-fadeIn">
        <div className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
        </div>
        <span>Available for opportunities</span>
      </div>

      {/* Main Heading - Staggered reveal */}
      <div className="space-y-3 md:space-y-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
          <div className="overflow-hidden">
            <span className="block animate-slideInUp" style={{ animationDelay: '0ms' }}>
              <span className="text-foreground">Building</span>
            </span>
          </div>
          <div className="overflow-hidden">
            <span className="block animate-slideInUp" style={{ animationDelay: '60ms' }}>
              <span className="gradient-text-animated text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
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
            <div
              key={role}
              className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg font-mono text-xs md:text-sm font-medium border ${accent.border} ${accent.bgSoft} ${accent.text} hover:scale-105 transition-transform duration-150 cursor-default`}
            >
              {role}
            </div>
          );
        })}
      </div>

      {/* Interactive Metrics Carousel */}
      <div className="relative animate-fadeIn" style={{ animationDelay: '220ms' }}>
        {/* Active Metric Display */}
        <div className={`panel p-6 md:p-8 rounded-2xl border-l-4 ${activeAccent.borderStrong} relative overflow-hidden`}>
          <div className="relative z-10">
            <div className="flex items-start gap-4 md:gap-6">
              {/* Icon */}
              <div className={`p-3 md:p-4 rounded-xl border ${activeAccent.border} ${activeAccent.bgSoft} flex-shrink-0`}>
                {React.createElement(metrics[activeMetric].icon, {
                  className: `w-6 h-6 md:w-8 md:h-8 ${activeAccent.text}`
                })}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className={`font-mono text-4xl md:text-5xl font-bold ${activeAccent.text} mb-1 md:mb-2`}>
                  {metrics[activeMetric].value}
                </div>
                <div className="text-lg md:text-xl font-bold text-foreground mb-1">
                  {metrics[activeMetric].label}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground">
                  {metrics[activeMetric].description}
                </div>
              </div>
            </div>

            {/* Indicator Dots */}
            <div className="flex gap-2 mt-4 md:mt-6">
              {metrics.map((_, index) => {
                const dotAccent = getAccent(index);
                return (
                  <button
                    key={index}
                    onClick={() => setActiveMetric(index)}
                    aria-label={`View metric ${index + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-200 ${
                      index === activeMetric
                        ? `w-12 ${dotAccent.bg}`
                        : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-3 gap-2 md:gap-3 mt-3 md:mt-4">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            const accent = getAccent(index);
            const isActive = index === activeMetric;
            return (
              <button
                key={index}
                onClick={() => setActiveMetric(index)}
                aria-label={`Select ${metric.label}`}
                className={`p-2 md:p-3 rounded-xl border transition-colors duration-150 ${
                  isActive
                    ? `${accent.border} ${accent.bgSoft}`
                    : "border-border bg-muted/30 hover:bg-muted"
                }`}
              >
                <Icon className={`w-4 h-4 md:w-5 md:h-5 mx-auto mb-1 ${isActive ? accent.text : "text-muted-foreground"}`} />
                <div className={`font-mono text-xs font-semibold ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                  {metric.value}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Description with reveal effect */}
      <div className="space-y-2 md:space-y-3 animate-fadeIn" style={{ animationDelay: '280ms' }}>
        <p className="text-sm md:text-base lg:text-lg leading-relaxed text-foreground/90">
          Specialized in architecting <span className="font-bold text-primary">scalable web applications</span> from concept to deployment. 
          Experienced in building <span className="font-bold text-secondary">real-time systems</span> that handle production traffic.
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
          className="magnetic group relative flex-1 inline-flex items-center justify-center gap-2 md:gap-3 px-5 py-3 md:px-6 md:py-4 rounded-xl font-semibold text-sm md:text-base overflow-hidden bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-lg hover:shadow-2xl transition-all duration-200 hover:scale-[1.02] active:scale-95"
        >
          <FaDownload className="w-4 h-4 md:w-5 md:h-5 group-hover:animate-bounce" />
          <span>Download Resume</span>
          <FaArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
        </a>

        <Link
          href="/contact"
          className="magnetic group flex-1 inline-flex items-center justify-center gap-2 md:gap-3 px-5 py-3 md:px-6 md:py-4 rounded-xl font-semibold text-sm md:text-base border-2 border-primary/30 hover:border-primary bg-card hover:bg-primary/5 transition-all duration-200 hover:scale-[1.02] active:scale-95"
        >
          <span>Let's Connect</span>
          <FaArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}