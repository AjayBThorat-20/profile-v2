"use client";

import { useEffect } from "react";

// One observer for every `data-reveal` element on the page, replacing the
// per-component useScrollReveal hook.
//
// Why this exists: useScrollReveal is a hook, so every section that wanted a
// reveal had to be a client component - which meant most of the page's content
// hydrated on the main thread purely to decide when to change opacity. Sections
// that carry `data-reveal` instead need no JavaScript of their own and can be
// server components.
//
// Why it sets an ATTRIBUTE rather than adding a class: the original version of
// this idea did `entry.target.classList.add("is-visible")`, which worked until
// the component's next unrelated re-render - React reapplies the literal
// className from JSX every time and silently wiped the class, leaving the
// section stuck at opacity 0 while still occupying its full height (a permanent
// blank gap). React only reconciles attributes it set itself, and `data-revealed`
// never appears in any JSX, so it survives re-renders.
export default function RevealObserver() {
  useEffect(() => {
    const reveal = (el: Element) => el.setAttribute("data-revealed", "true");

    // No IntersectionObserver (very old browser, or a test environment):
    // show everything rather than leave the page blank.
    if (typeof IntersectionObserver === "undefined") {
      document.querySelectorAll("[data-reveal]").forEach(reveal);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          reveal(entry.target);
          observer.unobserve(entry.target);
        }
      },
      {
        // Positive bottom margin grows the root downward so a section still
        // below the fold starts revealing before it is scrolled to. Without it,
        // a section sitting just past the viewport at load renders as a blank
        // gap the full height of its content until scroll crosses its top edge,
        // which reads as broken rather than as a deliberate reveal.
        //
        // threshold 0, not a fraction: a percentage threshold needs that share
        // of the target's own area inside the root, which for a tall target
        // (a whole project list) can be hundreds of pixels - so taller sections
        // would need much deeper scrolling before triggering, reintroducing the
        // blank-gap symptom for exactly the content most affected by it.
        threshold: 0,
        rootMargin: "0px 0px 300px 0px",
      },
    );

    const observeAll = () => {
      document
        .querySelectorAll("[data-reveal]:not([data-revealed])")
        .forEach((el) => observer.observe(el));
    };

    observeAll();

    // Content arrives after this mounts - the contributions graph after its
    // fetch, skill tiles when the category filter changes, a new route's
    // sections - and those must be picked up too.
    const mutations = new MutationObserver(observeAll);
    mutations.observe(document.body, { childList: true, subtree: true });

    // --- Pause looping animations that are off screen ---
    // The marquee and the scroll cue loop forever. Once scrolled past, they
    // were still driving the compositor every frame for something nobody can
    // see - pure battery cost on a phone. This toggles an attribute the CSS
    // uses to park them, and lets them resume when they come back.
    const offscreen = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.setAttribute("data-offscreen", entry.isIntersecting ? "false" : "true");
        }
      },
      { threshold: 0 },
    );

    const observePausable = () => {
      document.querySelectorAll("[data-pause-offscreen]").forEach((el) => offscreen.observe(el));
    };
    observePausable();

    const pausableMutations = new MutationObserver(observePausable);
    pausableMutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutations.disconnect();
      observer.disconnect();
      pausableMutations.disconnect();
      offscreen.disconnect();
    };
  }, []);

  return null;
}
