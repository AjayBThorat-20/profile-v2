"use client";

import React, { useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface RevealTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  className?: string;
  /** ms delay before the first word starts, on top of its own stagger */
  delay?: number;
}

// Splits text into words, each sitting in its own overflow-hidden mask,
// and slides them up into place with a per-word stagger once scrolled
// into view - the headline "wipes" in rather than just fading, matching
// the nabilissa.com reference. createElement (not JSX) because the tag
// is chosen at runtime and a dynamic JSX tag can't carry a typed ref
// across h1/h2/.../span cleanly.
export default function RevealText({ text, as = "h2", className = "", delay = 0 }: RevealTextProps) {
  const ref = useRef<HTMLElement>(null);
  const isVisible = useScrollReveal(ref as React.RefObject<HTMLElement>);
  const words = text.split(" ");

  return React.createElement(
    as,
    { ref, className },
    words.map((word, i) => (
      <React.Fragment key={`${word}-${i}`}>
        <span className="reveal-word-mask">
          <span
            className="reveal-word"
            data-visible={isVisible}
            style={{ transitionDelay: isVisible ? `${delay + i * 45}ms` : "0ms" }}
          >
            {word}
          </span>
        </span>
        {i < words.length - 1 ? " " : ""}
      </React.Fragment>
    ))
  );
}
