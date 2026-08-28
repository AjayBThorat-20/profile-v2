"use client";

import React, { useEffect, useRef } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}

// Wraps children in a div that tilts (rotateX/rotateY) toward the
// cursor's position within its own bounds, plus a slight zoom - the
// nabilissa.com-style project-thumbnail hover. No-ops under coarse
// pointers / prefers-reduced-motion (checked once on mount, not per
// mousemove).
export default function TiltCard({ children, className = "", maxTilt = 6 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const enabledRef = useRef(true);

  useEffect(() => {
    enabledRef.current =
      !window.matchMedia("(pointer: coarse)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !enabledRef.current) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(1000px) rotateX(${(-py * maxTilt).toFixed(2)}deg) rotateY(${(px * maxTilt).toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`tilt-card ${className}`}
    >
      {children}
    </div>
  );
}
