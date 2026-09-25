"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { FaGithub, FaArrowRight } from "react-icons/fa";
import SectionEyebrow from "@/Components/UI/SectionEyebrow";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import ContributionsSkeleton from "@/Components/Skeletons/ContributionsSkeleton";
import {
  GITHUB_USERNAME,
  describeDay,
  groupIntoWeeks,
  monthLabels,
  type ContributionData,
  type ContributionLevel,
} from "@/lib/githubCalendar";

const PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;
// Matches the server-side cache lifetime; polling faster would only re-read the same cached response.
const REFRESH_MS = 30 * 60 * 1000;

// Static class strings so Tailwind's scanner can see every one of them.
// Colors come from the --heat-* variables in globals.css (light and dark sets).
const LEVEL_CLASS: Record<ContributionLevel, string> = {
  0: "bg-muted",
  1: "bg-(--heat-1)",
  2: "bg-(--heat-2)",
  3: "bg-(--heat-3)",
  4: "bg-(--heat-4)",
};

const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

type State = { status: "loading" } | { status: "ready"; data: ContributionData } | { status: "error" };

// `enabled` gates the whole thing on the panel approaching the viewport. The
// graph sits well below the fold, renders ~393 elements (21% of the page's
// entire DOM), and polls on a timer - all of which used to happen during the
// initial load, competing with content the visitor can actually see. Nothing is
// lost by waiting: the markup is client-rendered either way, so it was never in
// the HTML that crawlers read, and the skeleton it shows meanwhile is already
// the same height as the finished graph, so deferring costs no layout shift.
function useContributions(enabled: boolean): State {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    const controller = new AbortController();

    async function load() {
      try {
        const res = await fetch("/api/github-contributions", { signal: controller.signal });
        if (!res.ok) throw new Error(String(res.status));
        const data = (await res.json()) as ContributionData;
        if (!cancelled) setState({ status: "ready", data });
      } catch {
        // A failed refresh keeps whatever was already on screen; only the first load can show the error state.
        if (!cancelled) setState((prev) => (prev.status === "ready" ? prev : { status: "error" }));
      }
    }

    load();
    const id = setInterval(load, REFRESH_MS);
    return () => {
      cancelled = true;
      controller.abort();
      clearInterval(id);
    };
  }, [enabled]);

  return state;
}

function Heatmap({ data }: { data: ContributionData }) {
  const weeks = useMemo(() => groupIntoWeeks(data.days), [data.days]);
  const labels = useMemo(() => monthLabels(weeks), [weeks]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // On narrow screens the 53 columns overflow horizontally; start at the newest weeks.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, [weeks]);

  return (
    <div ref={scrollRef} className="overflow-x-auto pb-2">
      <div
        className="inline-flex gap-2 min-w-max [--cell:11px] [--gap:3px] md:[--cell:13px]"
        role="img"
        aria-label={`Contribution graph: ${data.total.toLocaleString("en-US")} contributions in the last year`}
      >
        <div className="grid pt-[calc(var(--cell)+var(--gap)+6px)] text-[10px] leading-none text-muted-foreground" style={{ gridTemplateRows: "repeat(7, var(--cell))", rowGap: "var(--gap)" }} aria-hidden="true">
          {DAY_LABELS.map((d, i) => (
            <span key={i} className="flex items-center">{d}</span>
          ))}
        </div>

        <div>
          <div
            className="grid h-[calc(var(--cell)+6px)] text-[10px] leading-none text-muted-foreground"
            style={{ gridTemplateColumns: `repeat(${weeks.length}, var(--cell))`, columnGap: "var(--gap)" }}
            aria-hidden="true"
          >
            {labels.map((l) => (
              <span key={l.index} className="whitespace-nowrap" style={{ gridColumnStart: l.index + 1 }}>
                {l.label}
              </span>
            ))}
          </div>

          <div
            className="mt-[var(--gap)] grid"
            style={{
              gridTemplateRows: "repeat(7, var(--cell))",
              gridAutoFlow: "column",
              gridAutoColumns: "var(--cell)",
              gap: "var(--gap)",
            }}
          >
            {weeks.flatMap((week, w) =>
              week.map((day, d) =>
                day ? (
                  <div key={day.date} title={describeDay(day)} className={`rounded-[3px] ${LEVEL_CLASS[day.level]}`} />
                ) : (
                  <div key={`blank-${w}-${d}`} />
                ),
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Legend() {
  return (
    <div className="flex items-center gap-1.5 text-xs text-muted-foreground" aria-hidden="true">
      <span>Less</span>
      {([0, 1, 2, 3, 4] as ContributionLevel[]).map((level) => (
        <span key={level} className={`h-[11px] w-[11px] rounded-[3px] ${LEVEL_CLASS[level]}`} />
      ))}
      <span>More</span>
    </div>
  );
}

export default function GithubContributions() {
  // useScrollReveal's observer already fires 300px before the element reaches
  // the viewport (see the hook), so the fetch is in flight by the time the
  // panel is actually on screen and the graph is rarely seen loading.
  const panelRef = useRef<HTMLDivElement>(null);
  const isNearViewport = useScrollReveal(panelRef);
  const state = useContributions(isNearViewport);

  return (
    <div ref={panelRef} className="container-custom pb-12 md:pb-16">
      <div className="max-w-5xl mx-auto">
        <div className="panel rounded-lg p-6 md:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-5">
            <div className="space-y-2">
              <SectionEyebrow icon={FaGithub} label="GitHub Activity" />
              <h3 className="text-xl md:text-2xl font-black text-foreground min-h-8">
                {state.status === "ready"
                  ? `${state.data.total.toLocaleString("en-US")} contributions in the last year`
                  : "Contributions in the last year"}
              </h3>
            </div>
            <a
              href={PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              /* py-2 gives this a 36px-tall touch target; as a bare inline
                 link it measured 20px, under the 24px WCAG 2.2 minimum. */
              className="group inline-flex items-center gap-2 py-2 text-sm font-semibold text-primary"
            >
              <span>@{GITHUB_USERNAME}</span>
              <FaArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {state.status === "ready" && (
            <>
              <Heatmap data={state.data} />
              <div className="mt-3 flex justify-end">
                <Legend />
              </div>
            </>
          )}

          {/* Two stages on purpose.
              Before the panel is anywhere near the viewport, this is a single
              empty box that just reserves the right height. The detailed
              skeleton mirrors the real 53x7 grid, which is ~390 elements - and
              rendering those from page load put every one of them in the
              initial DOM, undoing the whole point of deferring the graph (it
              measured 1,867 elements against 1,411 without it).
              Once the panel is approaching and the fetch is actually in
              flight, the full skeleton takes over, so the shape is held exactly
              at the moment anyone can see it. */}
          {state.status === "loading" &&
            (isNearViewport ? (
              <ContributionsSkeleton />
            ) : (
              <div
                aria-hidden="true"
                className="h-[132px] md:h-[150px] rounded-lg bg-muted/60"
              />
            ))}

          {state.status === "error" && (
            <p className="text-sm text-muted-foreground py-8 text-center">
              GitHub activity is temporarily unavailable. See it live on{" "}
              <a href={PROFILE_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-foreground underline">
                GitHub
              </a>
              .
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
