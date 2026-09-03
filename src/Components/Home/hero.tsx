"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { BasicInfo } from "@/Components/Home/page";
import { getAccent } from "@/Components/UI/accentColor";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import Badge from "@/Components/UI/Badge";

export default function Hero() {
  const theme = useSelector((state: RootState) => state.theme.mode);

  return (
    <section id="home" className="relative min-h-screen overflow-hidden pt-20 md:pt-24">
      {/* Cinematic backdrop now lives site-wide in DefaultLayout - see there. */}

      {/* Main Content */}
      <div className="container-custom min-h-[calc(100vh-140px)] flex items-center py-8 md:py-12">
        <div className="flex flex-col md:flex-row-reverse items-center justify-between w-full gap-8 md:gap-12 lg:gap-16">

          {/* Image Section - Better proportions */}
          <div className="relative w-full md:w-[46%] flex items-center justify-center md:justify-end order-1 animate-fadeIn">
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-none">
              {/* Main Image */}
              <div className="relative">
                <div className="relative aspect-[3/4] overflow-hidden border border-border">
                  <Image
                    src="/Images/Profile/Ajay3.webp" // Use .webp if you converted it
                    alt="Ajay Thorat - Full Stack Developer"
                    fill
                    className="object-cover object-center grayscale"
                    priority
                    quality={85}
                    sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, (max-width: 1024px) 380px, 420px"
                    loading="eager"
                  />
                </div>
              </div>

              {/* Available Badge - Top right */}
              <div className="absolute top-4 md:top-6 right-4 md:right-6">
                <div className="flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-background border border-border">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs md:text-sm font-bold text-foreground">Available</span>
                </div>
              </div>
            </div>
          </div>

          {/* Info Section - Better width distribution */}
          <div className="md:w-[58%] w-full animate-fadeIn order-2" style={{ animationDelay: '120ms' }}>
            <BasicInfo theme={theme} />
          </div>
        </div>
      </div>

      {/* Featured Project Teaser */}
      <div className="container-custom pb-16 md:pb-24 animate-fadeIn" style={{ animationDelay: '360ms' }}>
        <a
          href="#projects"
          className="group block panel p-6 md:p-8 border-l-4 border-l-primary transition-colors duration-300 hover:border-l-secondary"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
            <div className="flex-1 space-y-2">
              <Badge accent={getAccent(1)} className="uppercase tracking-wide font-mono">
                Featured Project
              </Badge>
              <h2 className="text-xl md:text-2xl font-black text-foreground">
                DevCompass — Open-Source Dependency Health CLI
              </h2>
              <p className="text-sm md:text-base text-muted-foreground max-w-2xl">
                A production npm CLI I built and maintain: real-time CVE scanning, AI-powered fix recommendations across four LLM providers, and an interactive D3.js dependency graph.
              </p>
            </div>
            <div className="flex items-center gap-2 text-primary font-semibold text-sm md:text-base flex-shrink-0 group-hover:gap-3 transition-all duration-200">
              <span>See how it works</span>
              <FaArrowRight className="w-4 h-4" />
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}
