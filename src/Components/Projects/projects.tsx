"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { projectsData, type ProjectItem } from "@/constants/project";
import { FaGithub, FaArrowRight, FaCode, FaBook } from "react-icons/fa";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SectionEyebrow from "@/Components/UI/SectionEyebrow";
import SectionLink from "@/Components/Links/SectionLink";
import TiltCard from "@/Components/UI/TiltCard";
import ClampText from "@/Components/UI/ClampText";
import Badge from "@/Components/UI/Badge";

const pad = (n: number) => String(n).padStart(2, "0");
const TOTAL = pad(projectsData.length);
// How long each screenshot shows before its card moves to the next one.
const SLIDE_MS = 4500;

// The components below are declared at module scope, not inside Projects: a
// component defined during render is a brand-new component type on every
// render, so React would tear down and remount each card on every slide tick.

// Handlers that hold one card's slideshow while someone is looking at it.
type HoldHandlers = Pick<React.HTMLAttributes<HTMLDivElement>, "onMouseEnter" | "onMouseLeave" | "onFocus" | "onBlur">;

interface ProjectMediaProps {
  project: ProjectItem;
  index: number;
  current: number;
  onSelect: (imageIdx: number) => void;
  sizes: string;
  inset: string;
  // Frame sizing. 4:3 by default; the lead card lets it grow to the height
  // of its write-up column from lg up so no empty band is left under it.
  frame?: string;
  className?: string;
  hold: HoldHandlers;
}

// Screenshot frame plus its slide controls.
function ProjectMedia({ project, index, current, onSelect, sizes, inset, frame = "aspect-4/3", className = "", hold }: ProjectMediaProps) {
  return (
    <div className={`flex flex-col ${className}`} {...hold}>
      {/* object-contain inside an inset on a muted fill, not object-cover: the
          screenshots run from wide dashboards to portrait phone captures, and a
          cover crop cut up to ~80% off the portrait ones. The inset makes every
          capture sit in the frame as an object instead of reading as
          letterboxing. TiltCard tilts the frame toward the cursor. */}
      <TiltCard className={`relative overflow-hidden bg-muted ${frame}`}>
        <div className={`absolute ${inset}`}>
          <Image
            alt={`${project.title} - screenshot ${current + 1} - project by Ajay Thorat`}
            src={project.pictures[current].picture}
            fill
            sizes={sizes}
            className="object-contain transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        </div>
        {/* Solid panel that wipes away on mount, staggered per card - see
            .img-reveal-shutter in globals.css. */}
        <span className="img-reveal-shutter" style={{ animationDelay: `${index * 60 + 120}ms` }} />
      </TiltCard>

      {/* Real buttons, a dash per slide with the current one filled, so a
          visitor can steer to a screenshot instead of waiting for the timer.
          They sit outside TiltCard so they stay flat and hittable. The visible
          dash is 4px tall; the ::after box extends the hit area to about
          28x44 (WCAG 2.2 target size) without taking layout space, and the
          12px gap keeps neighbouring hit areas from overlapping. */}
      {project.pictures.length > 1 && (
        <div className="flex items-center justify-between gap-4 border-t border-border px-5 py-3 md:px-6">
          <div className="flex items-center gap-3" role="group" aria-label={`${project.title} screenshots`}>
            {project.pictures.map((picture, imageIdx) => {
              const isCurrent = current === imageIdx;
              return (
                <button
                  key={picture.picture}
                  type="button"
                  onClick={() => onSelect(imageIdx)}
                  aria-label={`Show screenshot ${imageIdx + 1} of ${project.pictures.length}`}
                  aria-current={isCurrent}
                  className={`relative h-1 rounded-full transition-all duration-300 after:absolute after:content-[''] after:-inset-y-5 after:-inset-x-1.5 ${
                    isCurrent ? "w-8 bg-foreground" : "w-4 bg-foreground/25 hover:bg-foreground/50"
                  }`}
                />
              );
            })}
          </div>
          <span className="font-mono text-xs text-muted-foreground tabular-nums">
            {pad(current + 1)} / {pad(project.pictures.length)}
          </span>
        </div>
      )}
    </div>
  );
}

// "01 / 04" index on the left, the project type on the right.
function ProjectMeta({ index, kind }: { index: number; kind: string }) {
  return (
    <div className="flex items-center justify-between gap-4 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
      <span className="tabular-nums">
        <span className="text-foreground">{pad(index + 1)}</span> / {TOTAL}
      </span>
      <span className="text-right">{kind}</span>
    </div>
  );
}

// Hairline mono tags - the same flat language as the rest of the site's
// labels, rather than filled pills.
function TechList({ stack }: { stack: string }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Tech stack">
      {stack.split(", ").map((tech) => (
        <li
          key={tech}
          className="border border-border px-2.5 py-1 font-mono text-[11px] uppercase tracking-wide text-muted-foreground"
        >
          {tech}
        </li>
      ))}
    </ul>
  );
}

export default function Projects() {
  const [currentImageIndexes, setCurrentImageIndexes] = useState<number[]>(
    Array(projectsData.length).fill(0)
  );
  // The card being looked at holds still; every other card keeps moving. A
  // card is held while the pointer is on its screenshot or keyboard focus is
  // on its slide controls. This used to be one page-wide pause set by hovering
  // anywhere on any card - and since the cards fill most of the screen, the
  // pointer was nearly always on one, so no slideshow ever moved.
  // Refs, not state: the interval reads them on each tick, so holding a card
  // needs no re-render and never restarts the timer for the others.
  const holdRef = useRef<{ hover: number | null; focus: number | null }>({ hover: null, focus: null });
  // When a dash is clicked, that card skips its next tick, so the chosen
  // screenshot stays up for at least a full interval instead of flipping
  // away a moment later.
  const skipNextRef = useRef<boolean[]>(Array(projectsData.length).fill(false));
  const sectionRef = useRef<HTMLDivElement>(null);
  const isRevealed = useScrollReveal(sectionRef);

  useEffect(() => {
    // An auto-advancing carousel is motion the visitor never asked for, so
    // it doesn't run at all under prefers-reduced-motion - the dash controls
    // are then the only way through the screenshots. (The global
    // reduced-motion rule in globals.css can't reach a JS interval.)
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const interval = setInterval(() => {
      const { hover, focus } = holdRef.current;
      const skip = skipNextRef.current;
      skipNextRef.current = Array(projectsData.length).fill(false);
      setCurrentImageIndexes((prevIndexes) =>
        prevIndexes.map((index, projectIdx) => {
          if (projectIdx === hover || projectIdx === focus || skip[projectIdx]) return index;
          return index === projectsData[projectIdx].pictures.length - 1 ? 0 : index + 1;
        })
      );
    }, SLIDE_MS);

    return () => clearInterval(interval);
  }, []);

  const goToImage = (projectIdx: number, imageIdx: number) => {
    skipNextRef.current[projectIdx] = true;
    setCurrentImageIndexes((prev) =>
      prev.map((current, idx) => (idx === projectIdx ? imageIdx : current))
    );
  };

  const holdHandlers = (projectIdx: number): HoldHandlers => ({
    onMouseEnter: () => { holdRef.current.hover = projectIdx; },
    onMouseLeave: () => {
      if (holdRef.current.hover === projectIdx) holdRef.current.hover = null;
    },
    // Keyboard focus only: a mouse click on a dash also focuses it, and
    // holding on that would freeze the card until the visitor clicked
    // somewhere else. A clicked dash gets its own pause via skipNextRef.
    onFocus: (event) => {
      if (event.target.matches(":focus-visible")) holdRef.current.focus = projectIdx;
    },
    onBlur: () => {
      if (holdRef.current.focus === projectIdx) holdRef.current.focus = null;
    },
  });

  // Keep each project's position in projectsData: it indexes the slideshow
  // state and gives the card its "01 / 04" number.
  const entries = projectsData.map((project, index) => ({ project, index }));
  const featured = entries.filter(({ project }) => project.featured);
  const rest = entries.filter(({ project }) => !project.featured);

  return (
    <div ref={sectionRef} className={`container-custom section scroll-reveal ${isRevealed ? "is-visible" : ""}`}>
      <div className="max-w-7xl mx-auto space-y-10 md:space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 animate-fadeIn">
          <div className="flex justify-center">
            <SectionEyebrow index="01" icon={FaCode} label="Featured Work" />
          </div>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            DevCompass, the open-source CLI I maintain, followed by earlier full-stack builds. The
            production platforms I&apos;ve built for companies are under{" "}
            <SectionLink
              href="#experience"
              className="font-semibold text-foreground underline underline-offset-4 hover:no-underline"
            >
              Experience
            </SectionLink>
            .
          </p>
        </div>

        {/* Lead card: screenshot and write-up side by side from lg up, so the
            project with the most to say gets the room to say it without a
            tall stack of image-then-text. */}
        {featured.map(({ project, index }) => (
          <article
            key={project.id}
            className="group entry-card surface-3d overflow-hidden grid lg:grid-cols-12 animate-fadeIn"
            data-cursor-label="View"
          >
            <ProjectMedia
              project={project}
              index={index}
              current={currentImageIndexes[index]}
              onSelect={(imageIdx) => goToImage(index, imageIdx)}
              sizes="(min-width: 1280px) 680px, (min-width: 1024px) 56vw, (min-width: 640px) calc(100vw - 5rem), calc(100vw - 3rem)"
              inset="inset-4 md:inset-8"
              frame="aspect-4/3 lg:aspect-auto lg:flex-1 lg:min-h-105"
              className="lg:col-span-7 border-b border-border lg:border-b-0 lg:border-r"
              hold={holdHandlers(index)}
            />

            <div className="lg:col-span-5 flex flex-col gap-6 p-6 md:p-8 lg:p-10">
              <ProjectMeta index={index} kind={project.kind} />

              <div className="space-y-4">
                <Badge className="font-mono">Featured</Badge>
                <h3 className="text-4xl md:text-5xl font-black leading-[0.95] tracking-tight text-foreground">
                  {project.title}
                </h3>
              </div>

              <ClampText
                text={project.discription}
                lines={6}
                className="text-base leading-relaxed text-muted-foreground"
              />

              <TechList stack={project.techStack} />

              <div className="mt-auto flex flex-wrap gap-3 pt-2">
                <a
                  href={project.url}
                  className="magnetic btn-primary group/btn w-full sm:w-auto"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub className="w-4 h-4" />
                  <span>View on GitHub</span>
                  <FaArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform duration-200" />
                </a>
                {project.docsUrl && (
                  <a
                    href={project.docsUrl}
                    className="magnetic btn-secondary w-full sm:w-auto"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaBook className="w-4 h-4" />
                    <span>Docs</span>
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}

        {/* The rest as an even grid of smaller cards. */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map(({ project, index }, gridIdx) => (
            <article
              key={project.id}
              className="group entry-card surface-3d overflow-hidden flex flex-col animate-fadeIn"
              style={{ animationDelay: `${(gridIdx + 1) * 60}ms` }}
              data-cursor-label="View"
            >
              <ProjectMedia
                project={project}
                index={index}
                current={currentImageIndexes[index]}
                onSelect={(imageIdx) => goToImage(index, imageIdx)}
                sizes="(min-width: 1280px) 380px, (min-width: 1024px) 31vw, (min-width: 768px) 45vw, calc(100vw - 3rem)"
                inset="inset-4"
                hold={holdHandlers(index)}
              />

              <div className="flex flex-1 flex-col gap-4 border-t border-border p-6">
                <ProjectMeta index={index} kind={project.kind} />

                <h3 className="text-2xl font-black leading-tight text-foreground">{project.title}</h3>

                <ClampText
                  text={project.discription}
                  lines={4}
                  className="text-sm leading-relaxed text-muted-foreground"
                />

                <TechList stack={project.techStack} />

                {/* py-2 gives the link a 36px touch target. */}
                <a
                  href={project.url}
                  className="group/link mt-auto inline-flex items-center gap-2 self-start py-2 text-sm font-semibold text-foreground underline-offset-4 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub className="w-4 h-4" />
                  <span>View on GitHub</span>
                  <FaArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform duration-200" />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* More on GitHub - a flat row rather than a dashed call-out box. */}
        <div
          className="panel rounded-lg p-6 md:p-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between animate-fadeIn"
          style={{ animationDelay: "240ms" }}
        >
          <div className="flex items-start gap-4">
            <FaGithub className="mt-1 h-7 w-7 shrink-0 text-foreground" aria-hidden="true" />
            <div className="space-y-1">
              <h3 className="text-xl md:text-2xl font-black text-foreground">More on GitHub</h3>
              <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                Battle King, Companion-AI, Marathi Matrimony, and other repositories.
              </p>
            </div>
          </div>
          <a
            href="https://github.com/AjayBThorat-20?tab=repositories"
            className="magnetic btn-secondary group/btn shrink-0 self-start md:self-auto"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>View all repositories</span>
            <FaArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform duration-200" />
          </a>
        </div>
      </div>
    </div>
  );
}
