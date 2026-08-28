"use client";

import { useEffect, useState, RefObject } from 'react';

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

// Returns whether the element has scrolled into view, as React state -
// NOT by mutating classList directly. That used to be done imperatively
// via entry.target.classList.add('is-visible'), which worked until the
// component's next unrelated re-render (a hover state, an interval tick,
// anything) - React reapplies the literal className string from JSX on
// every render, silently wiping out that manually-added class and
// leaving the section stuck at opacity:0 forever while still occupying
// its full layout height (a permanent blank gap). Returning state here
// means the visibility survives any re-render.
export const useScrollReveal = (
  ref: RefObject<HTMLElement | null>,
  options: UseScrollRevealOptions = {}
) => {
  // Positive bottom margin grows the intersection root downward, so a
  // section still below the fold starts revealing before the user
  // actually scrolls it into view - without this, a section sitting
  // just past the viewport at initial load (nothing to do with being
  // "far down the page") renders as a big blank gap the full height of
  // its content until scroll crosses its top edge, which reads as
  // broken rather than as a deliberate reveal effect.
  //
  // threshold 0 (not 0.1): a percentage threshold needs that fraction of
  // the target's own area inside the root, which for a short target is a
  // few dozen px but for a TALL target (e.g. a whole project list) can be
  // hundreds of px - meaning taller sections would need much deeper
  // scroll before ever triggering, reintroducing the same blank-gap
  // symptom just for tall content specifically. 0 fires as soon as any
  // part of the target enters the (already-expanded) root, independent
  // of the target's own height.
  const { threshold = 0, rootMargin = '0px 0px 300px 0px', triggerOnce = true } = options;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (triggerOnce) {
              observer.unobserve(entry.target);
            }
          } else if (!triggerOnce) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [ref, threshold, rootMargin, triggerOnce]);

  return isVisible;
};

// Global scroll progress, 0–100, for a top-of-page progress bar.
export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return progress;
};

export const useSmoothScroll = () => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="#"]');
      
      if (link) {
        e.preventDefault();
        const href = link.getAttribute('href');
        if (!href || href === '#') return;
        
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);
};