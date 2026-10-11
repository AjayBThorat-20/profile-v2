"use client";

import { useEffect, useMemo, useRef, useState, ViewTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight, FaExternalLinkAlt } from "react-icons/fa";
import CompanyReviews from "./CompanyReviews";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useActiveSection } from "@/hooks/useActiveSection";
import type { EventPhoto, ProjectScreenshot } from "@/constants/experience";

type DetailData = string | { [key: string]: string[] };

interface Experience {
  id: number;
  name: string;
  title: string;
  duration: string;
  endDate: string | null;
  companyUrl: string;
  techStack: string;
  details: {
    id: number;
    title: string;
    picture: string;
    url?: string;
    screenshots?: ProjectScreenshot[];
    photos?: EventPhoto[];
    data: DetailData;
  }[];
}

interface RoleLink {
  id: number;
  shortName: string;
  title: string;
}

interface Section {
  id: string;
  number: string;
  // "Project 1", "Event" - the part of the data title before its colon.
  kind: string | null;
  title: string;
  // Shorter label for the contents list: the title without a trailing
  // "(...)" expansion, so "FNS (Forecasting & Scheduling Platform)" lists as "FNS".
  navLabel: string;
  picture: string | null;
  url: string | null;
  screenshots: ProjectScreenshot[];
  photos: EventPhoto[];
  data: DetailData;
}

const pad = (n: number) => String(n).padStart(2, "0");
const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

// "backendAndIntegrations" -> "Backend and integrations".
const keyToLabel = (key: string) => capitalize(key.replace(/([A-Z])/g, " $1").trim().toLowerCase());

const slugify = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// Turns the data's section titles ("project 1: IndiaPharmaHub (IPH)",
// "overview") into a type label plus a clean title, and decides which
// sections show their picture. The role's first picture is its logo and sits
// in the header, so a section only gets a figure when its picture is new:
// not the logo, and not the same as the section before it. Every Mumbai
// Biocluster section reuses the logo, which used to repeat one identical
// banner seven times down the page.
function buildSections(experience: Experience): Section[] {
  const logo = experience.details[0]?.picture;
  return experience.details.map((detail, index) => {
    const colon = detail.title.indexOf(":");
    const kind = colon === -1 ? null : capitalize(detail.title.slice(0, colon).trim());
    const title = capitalize((colon === -1 ? detail.title : detail.title.slice(colon + 1)).trim());
    const previous = experience.details[index - 1]?.picture;
    const isNewPicture = detail.picture !== logo && detail.picture !== previous;
    return {
      id: slugify(title) || `section-${index + 1}`,
      number: pad(index + 1),
      kind,
      title,
      navLabel: title.replace(/\s*\(.*\)\s*$/, ""),
      picture: isNewPicture ? detail.picture : null,
      url: detail.url ?? null,
      screenshots: detail.screenshots ?? [],
      photos: detail.photos ?? [],
      data: detail.data,
    };
  });
}

// Screenshots of a live product in a plain browser frame. The address bar
// shows the real URL of the page on screen and links to it, and a row of
// tabs switches between the captured pages. Captured at 1440x900, so the
// 16:10 frame shows each one whole.
function BrowserFrame({ url, screenshots, title }: { url: string; screenshots: ProjectScreenshot[]; title: string }) {
  const [current, setCurrent] = useState(0);
  const shot = screenshots[current];
  const base = new URL(url);
  const pageUrl = new URL(shot.path, base).toString();
  const shownUrl = `${base.host.replace(/^www\./, "")}${shot.path === "/" ? "" : shot.path}`;

  return (
    <figure className="mt-6 overflow-hidden rounded-lg border border-border bg-card">
      <div className="flex items-center gap-3 border-b border-border bg-muted/60 px-3 py-2.5 md:px-4">
        <div className="flex shrink-0 gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
        </div>
        <a
          href={pageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group/url flex min-w-0 flex-1 items-center justify-between gap-2 rounded-md border border-border bg-background px-3 py-1 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <span className="truncate">{shownUrl}</span>
          <FaExternalLinkAlt className="h-2.5 w-2.5 shrink-0 opacity-60 group-hover/url:opacity-100" aria-hidden="true" />
        </a>
      </div>

      <div className="relative aspect-16/10 bg-muted">
        <Image
          key={shot.src}
          src={shot.src}
          alt={`${title} - ${shot.label} page, built by Ajay Thorat`}
          fill
          className="object-cover object-top"
          sizes="(min-width: 1280px) 860px, (min-width: 1024px) 66vw, calc(100vw - 3rem)"
          quality={85}
        />
      </div>

      {screenshots.length > 1 && (
        <figcaption className="flex flex-wrap gap-2 border-t border-border px-3 py-3 md:px-4">
          {screenshots.map((item, idx) => (
            <button
              key={item.src}
              type="button"
              onClick={() => setCurrent(idx)}
              aria-pressed={idx === current}
              className={`border px-3 py-1.5 font-mono text-[11px] uppercase tracking-wide transition-colors ${
                idx === current
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:border-foreground/50 hover:text-foreground"
              }`}
            >
              {item.label}
            </button>
          ))}
        </figcaption>
      )}
    </figure>
  );
}

// Event photos: the selected one large, the rest as thumbnails beneath it.
// object-contain on a muted fill rather than a cover crop, so a portrait shot
// shows whole in the 3:2 frame instead of losing heads to the crop.
function PhotoGallery({ photos, title }: { photos: EventPhoto[]; title: string }) {
  const [current, setCurrent] = useState(0);
  const photo = photos[current];

  return (
    <figure className="mt-6 space-y-3">
      <div className="relative aspect-3/2 overflow-hidden rounded-lg border border-border bg-muted">
        <Image
          key={photo.src}
          src={photo.src}
          alt={`${title}: ${photo.caption}`}
          fill
          className="object-contain"
          sizes="(min-width: 1280px) 860px, (min-width: 1024px) 66vw, calc(100vw - 3rem)"
          quality={85}
        />
      </div>

      <figcaption className="flex items-baseline justify-between gap-4">
        <span className="text-sm text-foreground/80">{photo.caption}</span>
        <span className="shrink-0 font-mono text-xs tabular-nums text-muted-foreground">
          {pad(current + 1)} / {pad(photos.length)}
        </span>
      </figcaption>

      {photos.length > 1 && (
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-7" role="group" aria-label={`${title} photos`}>
          {photos.map((item, idx) => {
            const isCurrent = idx === current;
            return (
              <button
                key={item.src}
                type="button"
                onClick={() => setCurrent(idx)}
                aria-label={`Show photo ${idx + 1}: ${item.caption}`}
                aria-current={isCurrent}
                className={`relative aspect-square overflow-hidden rounded-md border-2 transition-[opacity,border-color] duration-200 ${
                  isCurrent ? "border-foreground" : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <Image src={item.src} alt="" fill className="object-cover" sizes="(min-width: 640px) 120px, 25vw" />
              </button>
            );
          })}
        </div>
      )}
    </figure>
  );
}

// One section of the write-up. Its own component so each can run its own
// scroll reveal as it reaches the viewport.
function DetailSection({ section, companyName }: { section: Section; companyName: string }) {
  const ref = useRef<HTMLElement>(null);
  const isRevealed = useScrollReveal(ref);

  return (
    <section
      id={section.id}
      ref={ref}
      className={`scroll-mt-28 border-t border-border pt-8 md:pt-10 first:border-t-0 first:pt-0 md:first:pt-0 scroll-reveal ${isRevealed ? "is-visible" : ""}`}
    >
      <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
        <span className="text-foreground">{section.number}</span>
        {section.kind && <span>{section.kind}</span>}
        {section.url && (
          <a
            href={section.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group/live ml-auto inline-flex items-center gap-2 py-1 text-foreground underline-offset-4 hover:underline"
          >
            Live site
            <FaExternalLinkAlt className="h-2.5 w-2.5 group-hover/live:translate-x-0.5 group-hover/live:-translate-y-0.5 transition-transform" aria-hidden="true" />
          </a>
        )}
      </div>
      <h2 className="mt-3 text-3xl md:text-4xl font-black leading-tight text-foreground">{section.title}</h2>

      {/* Contained on a muted fill rather than cropped to a banner: these
          images are close to square, and the old 384px cover crop cut most
          of each one away. */}
      {section.url && section.screenshots.length > 0 ? (
        <BrowserFrame url={section.url} screenshots={section.screenshots} title={section.title} />
      ) : section.photos.length > 0 ? (
        <PhotoGallery photos={section.photos} title={section.title} />
      ) : section.picture && (
        <figure className="relative mt-6 aspect-video overflow-hidden rounded-lg border border-border bg-muted">
          <div className="absolute inset-4 md:inset-6">
            <Image
              src={section.picture}
              alt={`${companyName} - ${section.title} - Ajay Thorat`}
              fill
              className="object-contain"
              sizes="(min-width: 1280px) 820px, (min-width: 1024px) 66vw, calc(100vw - 3rem)"
              quality={85}
            />
          </div>
        </figure>
      )}

      <div className="mt-6">
        {typeof section.data === "string" ? (
          <p className="max-w-3xl text-base md:text-lg leading-relaxed text-foreground/90">{section.data}</p>
        ) : (
          <div className="space-y-8">
            {Object.entries(section.data).map(([key, items]) => (
              <div key={key} className="space-y-4">
                {/* .eyebrow, not font-mono utilities: the global h1-h4 rule
                    sets the serif face outside any layer, so it beats
                    Tailwind's font-mono; a class selector beats it. */}
                <h3 className="eyebrow">
                  {keyToLabel(key)}
                </h3>
                <ul className="space-y-3">
                  {items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex gap-4 text-base leading-relaxed text-muted-foreground">
                      {/* A short ink rule instead of a check icon on every line. */}
                      <span className="mt-[0.8em] h-px w-3 shrink-0 bg-foreground/50" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default function ExperienceDetails({
  experience,
  position,
  total,
  newer,
  older,
}: {
  experience: Experience;
  position: number;
  total: number;
  newer: RoleLink | null;
  older: RoleLink | null;
}) {
  useEffect(() => {
    // "instant", not "smooth": a view transition snapshots the outgoing and
    // incoming pages and animates between those snapshots, so a smooth scroll
    // running underneath means the shared element morphs toward a position
    // that is still moving - it lands short and then jumps. Arriving at the
    // top of a newly-opened page needs no animation of its own anyway.
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const sections = useMemo(() => buildSections(experience), [experience]);
  // Memoised so the observer in useActiveSection isn't rebuilt every render.
  const sectionIds = useMemo(() => sections.map((section) => section.id), [sections]);
  const { activeId } = useActiveSection(sectionIds);

  const isCurrent = experience.endDate === null;
  const logo = experience.details[0]?.picture;
  const footerRef = useRef<HTMLDivElement>(null);
  const isFooterRevealed = useScrollReveal(footerRef);

  return (
    <div className="relative min-h-screen pb-20">
      <div className="container-custom section">
        <div className="max-w-6xl mx-auto">
          {/* Back link up front, not only at the bottom of a long page. */}
          <Link
            href="/#experience"
            transitionTypes={["nav-back"]}
            className="group inline-flex items-center gap-2 py-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground transition-colors"
          >
            <FaArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform duration-200" />
            All experience
          </Link>

          {/* Header. Visible from first paint - no opacity reveal - because
              the h1 is this page's largest element, and Chrome never counts
              content first painted at opacity 0 as the LCP. */}
          <header className="mt-6 grid grid-cols-1 gap-8 border-b border-border pb-10 md:pb-12 lg:grid-cols-12 lg:items-end">
            <div className="space-y-5 lg:col-span-8">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                <span className="tabular-nums">
                  <span className="text-foreground">{pad(position + 1)}</span> / {pad(total)}
                </span>
                <span className="inline-flex items-center gap-2 text-foreground">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${isCurrent ? "bg-foreground animate-pulse" : "border border-foreground"}`}
                    aria-hidden="true"
                  />
                  {isCurrent ? "Current role" : "Completed"}
                </span>
              </div>

              {/* Other half of the shared-element pair - the same `exp-<id>`
                  name is on the matching card in
                  Components/Experience/experience.tsx. The browser scales and
                  repositions that card's heading into this one, so the role
                  you clicked is visibly the role that opens. */}
              <ViewTransition name={`exp-${experience.id}`} share="morph" default="none">
                <div className="space-y-3">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[0.95] tracking-tight text-foreground">
                    {experience.title}
                  </h1>
                  <a
                    href={experience.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link inline-flex items-center gap-2 text-lg md:text-xl font-semibold text-foreground underline-offset-4 hover:underline"
                  >
                    {experience.name}
                    <FaExternalLinkAlt className="w-3.5 h-3.5 text-muted-foreground group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200" />
                  </a>
                </div>
              </ViewTransition>

              <p className="font-mono text-sm text-muted-foreground">{experience.duration}</p>
            </div>

            {/* Logo on a white tile in both themes: company logos are drawn
                for a light background and lose contrast on the dark one. */}
            {logo && (
              <div className="relative h-24 w-full max-w-64 overflow-hidden rounded-lg border border-border bg-white lg:col-span-4 lg:justify-self-end">
                <div className="absolute inset-3">
                  <Image
                    src={logo}
                    alt={`${experience.name} logo`}
                    fill
                    className="object-contain"
                    sizes="256px"
                    loading="eager"
                  />
                </div>
              </div>
            )}

            {/* h2, not h3: it sits directly under the page's h1, and skipping
                a level breaks the outline screen readers and crawlers use. */}
            <div className="space-y-3 lg:col-span-12">
              <h2 className="eyebrow">Tech stack</h2>
              <ul className="flex flex-wrap gap-1.5">
                {experience.techStack.split(",").map((tech) => (
                  <li
                    key={tech}
                    className="border border-border px-2.5 py-1 font-mono text-[11px] uppercase tracking-wide text-muted-foreground"
                  >
                    {tech.trim()}
                  </li>
                ))}
              </ul>
            </div>
          </header>

          {/* grid-cols-1 (a minmax(0, 1fr) track), not the implicit column: an
              implicit track grows to its widest child's min-content, and the
              one-line contents row on phones is wider than the screen - it
              pushed every section past the right edge. */}
          <div className="mt-10 grid grid-cols-1 gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-12">
            {/* Contents. A sticky list beside the write-up on desktop that
                tracks the section being read; a sideways-scrolling row of
                links on smaller screens. */}
            <nav aria-label="On this page" className="min-w-0 lg:col-span-3">
              <div className="lg:sticky lg:top-28 space-y-4">
                <p className="eyebrow">On this page</p>
                <ol className="hide-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6 sm:mx-0 sm:flex-wrap sm:px-0 lg:flex-col lg:gap-0 lg:border-l lg:border-border">
                  {sections.map((section) => {
                    const isActive = section.id === activeId;
                    return (
                      <li key={section.id} className="shrink-0">
                        <a
                          href={`#${section.id}`}
                          aria-current={isActive ? "location" : undefined}
                          className={`flex items-baseline gap-3 whitespace-nowrap border px-3 py-2 text-sm transition-colors lg:-ml-px lg:whitespace-normal lg:border-0 lg:border-l-2 lg:px-4 ${
                            isActive
                              ? "border-foreground text-foreground font-semibold"
                              : "border-border text-muted-foreground hover:text-foreground lg:border-transparent"
                          }`}
                        >
                          <span className="font-mono text-[11px] tabular-nums">{section.number}</span>
                          <span>{section.navLabel}</span>
                        </a>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </nav>

            <div className="space-y-14 md:space-y-16 lg:col-span-9">
              {sections.map((section) => (
                <DetailSection key={section.id} section={section} companyName={experience.name} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <CompanyReviews companyId={experience.id} />

      {/* Newer and earlier roles, so the next one is a click away instead of
          a trip back to the homepage. */}
      <div className="container-custom">
        <div
          ref={footerRef}
          className={`max-w-6xl mx-auto border-t border-border pt-10 scroll-reveal ${isFooterRevealed ? "is-visible" : ""}`}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {newer ? (
              <Link
                href={`/experience/details/${newer.id}`}
                className="group panel rounded-lg p-6 transition-colors hover:border-foreground/40"
              >
                <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  <FaArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform duration-200" />
                  Newer role
                </span>
                <span className="mt-3 block text-xl font-black text-foreground">{newer.shortName}</span>
                <span className="block text-sm text-muted-foreground">{newer.title}</span>
              </Link>
            ) : (
              <div className="hidden sm:block" aria-hidden="true" />
            )}
            {older && (
              <Link
                href={`/experience/details/${older.id}`}
                className="group panel rounded-lg p-6 text-right transition-colors hover:border-foreground/40"
              >
                <span className="flex items-center justify-end gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Earlier role
                  <FaArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200" />
                </span>
                <span className="mt-3 block text-xl font-black text-foreground">{older.shortName}</span>
                <span className="block text-sm text-muted-foreground">{older.title}</span>
              </Link>
            )}
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="/#experience"
              transitionTypes={["nav-back"]}
              className="magnetic btn-secondary group"
            >
              <FaArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform duration-200" />
              <span>Back to Experience</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
