"use client";

import Image from "next/image";
import { FaRocket } from "react-icons/fa";
import { useRef, useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import RevealText from "@/Components/UI/RevealText";
import { getYearsOfExperienceLabel } from "@/lib/experience";

export default function About() {
  const [imageError, setImageError] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isRevealed = useScrollReveal(sectionRef);

  const highlights = [
    `${getYearsOfExperienceLabel()} years of full-stack experience, now the sole developer behind three production platforms at Mumbai Biocluster: IndiaPharmaHub, Yantra, and an internal HRMS`,
    "Part of the Mumbai Biocluster team behind PCG 2026 (400+ delegates, 70+ speakers), gathering feedback on IndiaPharmaHub and Yantra directly from industry leaders",
    "Built and maintain DevCompass, an open-source npm CLI tracking 500+ packages for CVE and deprecation risk",
    "Shipped production systems — FNS and ExcelFlow — at Renewalytics, helping manage 3.22+ GW of renewable energy capacity across 34+ sites",
  ];

  return (
    <div>
      <div ref={sectionRef} className={`container-custom section scroll-reveal ${isRevealed ? "is-visible" : ""}`}>
        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* Main Content */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            
            {/* Image Section - Now first on mobile, second on desktop */}
            <div className="w-full lg:w-[45%] flex justify-center animate-fadeIn" style={{ animationDelay: '120ms' }}>
              <div className="relative w-full max-w-md">
                <div className="absolute -bottom-3 -right-3 md:-bottom-4 md:-right-4 w-full h-full bg-foreground -z-10" aria-hidden="true" />
                <div className="relative aspect-3/4 overflow-hidden border border-border bg-muted/20">
                  {!imageError ? (
                    <Image
                      src="/Images/Profile/Ajay4.webp"
                      alt="Ajay Thorat - Full Stack Developer"
                      fill
                      className="object-cover grayscale"
                      // Lazy, not priority: this sits a full screen below the
                      // fold, and preloading it competed with the hero
                      // portrait (the LCP image) for bandwidth on slow phones.
                      quality={85}
                      sizes="(max-width: 768px) 90vw, (max-width: 1024px) 50vw, 45vw"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-muted">
                      <div className="text-center p-6">
                        <div className="w-20 h-20 mx-auto mb-4 rounded-full border border-border flex items-center justify-center">
                          <span className="text-4xl font-bold text-foreground">AT</span>
                        </div>
                        <p className="text-muted-foreground text-sm">Ajay Thorat</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Text Section */}
            <div className="w-full lg:w-[55%] space-y-8 animate-fadeIn">
              {/* Name & Title Card */}
              <div className="panel p-8 rounded-lg border-l-4 border-l-primary">
                <div className="relative z-10 space-y-4">
                  <RevealText
                    as="h2"
                    text="AJAY BHIMRAO THORAT"
                    className="text-3xl md:text-4xl font-black text-foreground"
                  />

                  <div className="space-y-4 text-base md:text-lg leading-relaxed">
                    <p className="text-foreground/90">
                      Based in <span className="font-bold text-foreground">Mumbai, India</span>,
                      I’m a passionate full-stack developer specializing in{" "}
                      <span className="font-semibold text-foreground">Next.js, React, Node.js, and PostgreSQL</span>.
                    </p>

                    <p className="text-muted-foreground">
                      With hands-on experience in building{" "}
                      <span className="font-semibold text-foreground">scalable web applications</span>{" "}
                      and managing{" "}
                      <span className="font-semibold text-foreground">agile teams</span>, 
                      I excel in delivering user-centric solutions that solve real business problems.
                    </p>

                    <p className="text-muted-foreground">
                      I like working close to the people who use what I build, from
                      renewable-energy clients at Renewalytics to the speakers and industry
                      leaders I met at{" "}
                      <span className="font-semibold text-foreground">PCG 2026</span>.
                    </p>
                  </div>
                </div>
              </div>

              {/* Highlights */}
              <div className="panel rounded-lg p-2 md:p-4">
                {highlights.map((highlight) => (
                  <div key={highlight} className="list-row px-2">
                    <div className="mt-0.5 shrink-0 w-5 h-5 rounded-full border border-primary/30 bg-primary/10 flex items-center justify-center">
                      <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-foreground/80">
                      {highlight}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Call to Action Section */}
          <div className="panel p-8 md:p-12 rounded-lg border-l-4 border-l-primary text-center space-y-6 animate-fadeIn" style={{ animationDelay: '320ms' }}>
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                Let’s Build Something Amazing Together
              </h3>
              <p className="text-muted-foreground text-lg mb-6 max-w-2xl mx-auto">
                Ready to bring your ideas to life with cutting-edge technology and innovative solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#contact"
                  className="btn-primary magnetic px-8 py-4 text-lg"
                >
                  Get In Touch
                  <FaRocket className="w-5 h-5 ml-2" />
                </a>
                <a
                  href="#projects"
                  className="btn-secondary magnetic px-8 py-4 text-lg"
                >
                  View My Work
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}