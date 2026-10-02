"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

// A paragraph that shows its first few lines with a Read more / Show less
// toggle. Built for the project write-ups, which run 150-300 words each: on
// a phone the DevCompass one alone was nearly two screens of unbroken text
// between its screenshot and its tech stack.
//
// The full text always stays in the DOM - the clamp is purely visual - so
// crawlers and screen readers still get every word.
//
// The toggle is rendered from the first paint and only hidden (not removed)
// when the text turns out to fit, so its line is reserved up front. It used
// to appear only after measuring, which grew each project card by a line
// after load and pushed every section below Projects ~130px down - enough
// that a jump to /#experience or /#contact landed short of its section.
export default function ClampText({
  text,
  lines = 4,
  className = "",
}: {
  text: string;
  lines?: number;
  className?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  // First-paint guess (the server can't measure): roughly four lines at the
  // narrowest phone width. Corrected after measuring, without moving layout.
  const [overflows, setOverflows] = useState(text.length > 160);
  const ref = useRef<HTMLParagraphElement>(null);
  const id = useId();

  useEffect(() => {
    const el = ref.current;
    if (!el || expanded) return;
    // Re-measured on resize: whether four lines can hold the text depends
    // on the paragraph's width, which changes across breakpoints and on
    // rotation. No separate first measurement is needed - a ResizeObserver
    // always reports once as soon as it starts observing.
    const measure = () => setOverflows(el.scrollHeight > el.clientHeight + 1);
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [expanded]);

  return (
    <div className="space-y-2">
      <p
        id={id}
        ref={ref}
        className={className}
        style={
          expanded
            ? undefined
            : {
                display: "-webkit-box",
                WebkitLineClamp: lines,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }
        }
      >
        {text}
      </p>
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={id}
        // Hidden but still taking its line when the text fits - see above.
        aria-hidden={!overflows}
        tabIndex={overflows ? 0 : -1}
        onClick={() => setExpanded((open) => !open)}
        className={`inline-flex items-center gap-1.5 text-sm font-semibold text-foreground underline-offset-4 hover:underline ${
          overflows ? "" : "invisible"
        }`}
      >
        {expanded ? "Show less" : "Read more"}
        <FaChevronDown
          className={`w-3 h-3 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>
    </div>
  );
}
