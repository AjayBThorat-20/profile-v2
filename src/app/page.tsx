"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { BasicInfo } from "@/Components/Home/page";
import { useParallax, useMagneticCursor } from "@/hooks/useScrollReveal";
import { getAccent } from "@/Components/UI/accentColor";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function Home() {
  const theme = useSelector((state: RootState) => state.theme.mode);

  // Initialize parallax and magnetic effects
  useParallax();
  useMagneticCursor();

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background Gradients with Parallax */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Light theme gradients */}
        <div className="parallax-slow absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl dark:opacity-0 transition-opacity duration-300 animate-pulse-slow" />
        <div className="parallax-medium absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/15 rounded-full blur-3xl dark:opacity-0 transition-opacity duration-300 animate-pulse-slow" />
        
        {/* Dark theme gradients */}
        <div className="parallax-slow absolute top-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl opacity-0 dark:opacity-100 transition-opacity duration-300 animate-float" />
        <div className="parallax-medium absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl opacity-0 dark:opacity-100 transition-opacity duration-300 animate-float" />
        
        {/* Additional decorative elements */}
        <div className="parallax-fast absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-2xl animate-pulse-slow" />
        <div className="parallax-fast absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-tr from-accent/10 to-primary/10 rounded-full blur-2xl animate-pulse-slow" />
      </div>

      {/* Main Content */}
      <div className="container-custom min-h-[calc(100vh-140px)] flex items-center py-8 md:py-12">
        <div className="flex flex-col md:flex-row-reverse items-center justify-between w-full gap-8 md:gap-12 lg:gap-16">
          
          {/* Image Section - Better proportions */}
          <div className="relative w-full md:w-[42%] flex items-center justify-center md:justify-end order-1 animate-fadeIn">
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[420px]">
              {/* Glow effect behind image */}
              <div className="absolute -inset-4 md:-inset-6 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-3xl blur-3xl opacity-60 animate-pulse-slow"></div>
              
              {/* Main Image */}
              <div className="relative group">
                <div className="relative aspect-[3/4] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border-2 border-primary/10">
<Image
  src="/Images/Profile/Ajay3.webp" // Use .webp if you converted it
  alt="Ajay Thorat - Full Stack Developer"
  fill
  className="object-cover object-center transition-all duration-300 group-hover:scale-105"
  priority
  quality={85}
  sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, (max-width: 1024px) 380px, 420px"
  loading="eager"
/>
                  
                  {/* Subtle gradient overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/5 via-transparent to-transparent pointer-events-none"></div>
                </div>

                {/* Floating accent borders - smaller */}
                <div className="absolute -top-3 -right-3 w-16 h-16 md:w-20 md:h-20 border-3 border-primary/30 rounded-2xl animate-float"></div>
                <div className="absolute -bottom-3 -left-3 w-20 h-20 md:w-24 md:h-24 border-3 border-secondary/30 rounded-2xl animate-float" style={{ animationDelay: '1s' }}></div>
              </div>

              {/* Floating Stats - bordered chips, mono numerals, one brand
                  accent each instead of a saturated gradient pill fill */}
              <div className="absolute -left-3 md:-left-4 top-[20%] animate-float">
                <div className={`px-3 py-2 md:px-4 md:py-2.5 rounded-xl bg-card shadow-xl border-2 ${getAccent(0).border}`}>
                  <div className="text-center">
                    <div className={`font-mono text-lg md:text-xl font-bold ${getAccent(0).text}`}>1.7+</div>
                    <div className="text-[10px] md:text-xs text-muted-foreground font-semibold whitespace-nowrap">Years Exp</div>
                  </div>
                </div>
              </div>

              <div className="absolute -right-3 md:-right-4 bottom-[35%] animate-float" style={{ animationDelay: '0.5s' }}>
                <div className={`px-3 py-2 md:px-4 md:py-2.5 rounded-xl bg-card shadow-xl border-2 ${getAccent(1).border}`}>
                  <div className="text-center">
                    <div className={`font-mono text-lg md:text-xl font-bold ${getAccent(1).text}`}>4+</div>
                    <div className="text-[10px] md:text-xs text-muted-foreground font-semibold whitespace-nowrap">Live Projects</div>
                  </div>
                </div>
              </div>

              {/* Available Badge - Top right */}
              <div className="absolute top-4 md:top-6 right-4 md:right-6 animate-float" style={{ animationDelay: '0.3s' }}>
                <div className="flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-lg bg-card shadow-lg border-2 border-green-500/30">
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
        <Link
          href="/projects"
          className="magnetic group block panel p-6 md:p-8 rounded-2xl border-l-4 border-l-primary hover:border-l-secondary transition-colors duration-200"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
            <div className="flex-1 space-y-2">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wide ${getAccent(1).border} ${getAccent(1).bgSoft} ${getAccent(1).text}`}>
                Featured Project
              </div>
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
        </Link>
      </div>
    </div>
  );
}