import React from "react";

interface RevealTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  className?: string;
  /** ms delay before the first word starts, on top of its own stagger */
  delay?: number;
}

// Splits text into words, each sitting in its own overflow-hidden mask, and
// slides them up into place with a per-word stagger once scrolled into view -
// the headline "wipes" in rather than just fading, matching the nabilissa.com
// reference. createElement (not JSX) because the tag is chosen at runtime.
//
// Server component: the trigger is the `data-reveal` attribute plus the shared
// RevealObserver, so this no longer needs a ref, a hook or a re-render - the
// per-word delays are static inline styles and the CSS decides when they run.
export default function RevealText({ text, as = "h2", className = "", delay = 0 }: RevealTextProps) {
  const words = text.split(" ");

  return React.createElement(
    as,
    { "data-reveal": true, className },
    words.map((word, i) => (
      <React.Fragment key={`${word}-${i}`}>
        <span className="reveal-word-mask">
          <span className="reveal-word" style={{ transitionDelay: `${delay + i * 45}ms` }}>
            {word}
          </span>
        </span>
        {i < words.length - 1 ? " " : ""}
      </React.Fragment>
    )),
  );
}
