"use client";

import { BasicInfo } from "@/Components/Home/page";
import { getAccent } from "@/Components/UI/accentColor";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import Badge from "@/Components/UI/Badge";
import Marquee from "@/Components/UI/Marquee";
import { useParallax } from "@/hooks/useParallax";
import { useScene3D } from "@/hooks/useScene3D";
import { useRef } from "react";
import { skillsData } from "@/constants/about";

export default function Hero() {

  // The portrait drifts a little slower than the page, so it reads as sitting
  // behind the offset ink frame rather than pasted onto it. Desktop and
  // full-motion only - see useParallax.
  const portraitRef = useRef<HTMLDivElement>(null);
  useParallax(portraitRef, 0.05);

  // The portrait assembly is a shared 3D scene: the ink frame sits on a plane
  // behind the photo, so rotating the scene toward the pointer slides the two
  // apart the way real separated planes do. Only the decorative assembly gets
  // this - the copy column stays in the page plane, because rotating running
  // text is how 3D pages become unreadable.
  const portraitSceneRef = useRef<HTMLDivElement>(null);
  useScene3D(portraitSceneRef);

  // Real stack from the skills data rather than a second hand-kept list, so
  // the ticker can't drift out of step with the Skills section below it.
  const marqueeItems = skillsData.map((skill) => skill.text);

  return (
    <section id="home" className="relative min-h-[min(100svh,900px)] overflow-hidden pt-20 md:pt-24">
      {/* Cinematic backdrop now lives site-wide in DefaultLayout - see there. */}

      {/* Main Content */}
      {/* Capped with min() rather than a bare 100svh: mobile browsers'
          "Request Desktop Site" mode forces a wide layout viewport while
          scaling its height to preserve the device's real (portrait) aspect
          ratio, which can inflate the viewport unit to 2000px+ and leave
          this flex-centered content stranded in a wall of dead space.
          svh, not vh: on mobile browsers vh resolves against the viewport
          with the URL/toolbar retracted, so at rest - toolbar shown - a
          100vh hero is taller than the screen and its bottom is cut off.
          svh is the smallest (toolbar-visible) height, so the hero always
          fits without the chrome having to hide first. */}
      <div className="container-custom min-h-[min(calc(100svh-140px),760px)] flex items-center py-8 md:py-12">
        <div className="flex flex-col md:flex-row-reverse items-center justify-between w-full gap-8 md:gap-12 lg:gap-16">

          {/* Image Section - Better proportions */}
          <div className="relative w-full md:w-[46%] flex items-center justify-center md:justify-end order-1 animate-riseIn">
            <div className="relative w-full max-w-75 sm:max-w-90 md:max-w-none stage">
              <div
                ref={portraitSceneRef}
                className="relative stage-3d"
                style={{ "--scene-tilt": "7deg" } as React.CSSProperties}
              >
                {/* Offset frame - a solid ink rectangle behind the photo for
                    poster-like depth, stays pure black/white like everything
                    else on the page. It now sits on a plane genuinely behind
                    the photo (.depth-back) rather than just being painted
                    under it, so the two separate as the scene turns. The
                    -z-10 it used to carry is gone: inside a preserve-3d
                    parent, paint order follows Z position, and a negative
                    z-index on top of that would drop it behind the scene's
                    own background. Source order already puts the photo in
                    front if a browser flattens the scene. */}
                <div className="absolute -bottom-3 -right-3 md:-bottom-4 md:-right-4 w-full h-full bg-foreground depth-back" aria-hidden="true" />

                {/* Main Image. The parallax ref goes here rather than on the
                    outer box so the photo drifts against the fixed ink frame
                    behind it - moving both together would just slide the whole
                    assembly and show no depth at all. */}
                <div className="relative" ref={portraitRef}>
                  <div className="relative aspect-3/4 overflow-hidden border border-border">
                    <Image
                      src="/Images/Profile/Ajay3.webp" // Use .webp if you converted it
                      alt="Ajay Thorat - Full Stack Developer"
                      fill
                      className="object-cover object-center grayscale"
                      // The hero portrait is the page's LCP element. Next 16
                      // deprecates `priority`; its guidance for the LCP image
                      // is loading="eager" + fetchPriority="high" (and no
                      // `preload` alongside `loading`, which it also set).
                      fetchPriority="high"
                      quality={85}
                      sizes="(max-width: 640px) 300px, (max-width: 768px) 360px, (max-width: 1024px) 420px, 460px"
                      loading="eager"
                    />
                  </div>
                </div>
              </div>

              {/* The "Available" chip that used to sit over this photo is
                  gone: BasicInfo already states "Available for
                  opportunities" in the adjacent text column, so both read
                  at once in the same viewport - saying it twice made the
                  claim look like decoration rather than a status. */}
            </div>
          </div>

          {/* Info Section - Better width distribution */}
          {/* No entrance of its own: every row inside BasicInfo already has
              one, and a fade here as well stacked a second opacity ramp on
              all of them (and hid the headline from the LCP measurement). */}
          <div className="md:w-[58%] w-full order-2">
            <BasicInfo />
          </div>
        </div>
      </div>

      {/* Stack ticker. Full-bleed and edge-to-edge on purpose - it is the one
          element on the page that deliberately runs past the container
          gutters, which is what makes the hero feel like it continues off
          the sides of the frame rather than stopping at a margin. Hairlines
          top and bottom tie it to the rest of the rule-based layout. */}
      <div className="border-y border-border py-4 md:py-5 animate-fadeIn" style={{ animationDelay: '400ms' }}>
        <Marquee items={marqueeItems} durationSec={52} />
      </div>

      {/* Featured Project Teaser */}
      <div className="container-custom pt-16 md:pt-24 pb-16 md:pb-24 animate-fadeIn" style={{ animationDelay: '360ms' }}>
        <a
          href="#projects"
          className="group block panel surface-3d p-6 md:p-8 border-l-4 border-l-primary hover:border-l-secondary"
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
            <div className="flex items-center gap-2 text-primary font-semibold text-sm md:text-base shrink-0 group-hover:gap-3 transition-all duration-200">
              <span>See how it works</span>
              <FaArrowRight className="w-4 h-4" />
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}
