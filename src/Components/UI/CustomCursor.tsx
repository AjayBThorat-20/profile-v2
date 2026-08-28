"use client";

import { useEffect, useRef } from "react";

// A two-part cursor (a tight dot + a lagging ring) that inverts via
// mix-blend-mode over whatever it crosses, and grows when it's over
// anything interactive - the nabilissa.com-style cursor. No-ops
// entirely on touch/coarse-pointer devices and under
// prefers-reduced-motion, so the native cursor is left alone there.
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse), (hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    document.body.classList.add("custom-cursor-active");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let rafId = 0;

    const handleMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    };

    // The ring/label only need to know "is this an interactive target"
    // and "does it want a label", which mouseover (bubbling, one entry
    // per element) gives cheaply - no need to hit-test on every
    // mousemove tick.
    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const labelTarget = target?.closest<HTMLElement>("[data-cursor-label]") ?? null;

      if (labelTarget) {
        if (labelRef.current) labelRef.current.textContent = labelTarget.dataset.cursorLabel ?? "";
        labelRef.current?.classList.add("cursor-label-active");
        ringRef.current?.classList.add("cursor-ring-hidden");
        return;
      }

      labelRef.current?.classList.remove("cursor-label-active");
      ringRef.current?.classList.remove("cursor-ring-hidden");

      const interactive = !!target?.closest(
        "a, button, [role='button'], input, textarea, select, .cursor-hover"
      );
      ringRef.current?.classList.toggle("cursor-ring-active", interactive);
    };

    const tick = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      const transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      if (ringRef.current) ringRef.current.style.transform = transform;
      if (labelRef.current) labelRef.current.style.transform = transform;
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mouseover", handleOver, { passive: true });

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={labelRef} className="cursor-label" aria-hidden="true" />
    </>
  );
}
