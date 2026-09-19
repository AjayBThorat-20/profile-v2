"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { FaGithub, FaArrowRight } from "react-icons/fa";
import SectionEyebrow from "@/Components/UI/SectionEyebrow";
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

function useContributions(): State {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
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
  }, []);

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
  const state = useContributions();

  return (
    <div className="container-custom pb-12 md:pb-16">
      <div className="max-w-5xl mx-auto">
        <div className="panel rounded-2xl p-6 md:p-8">
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
              className="group inline-flex items-center gap-2 text-sm font-semibold text-primary"
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

          {state.status === "loading" && (
            <div className="h-[132px] md:h-[150px] rounded-lg bg-muted animate-pulse" aria-busy="true" aria-label="Loading GitHub activity" />
          )}

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
