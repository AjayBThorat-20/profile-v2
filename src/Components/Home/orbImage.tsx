"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import SkeletonLoader from "../Skeletons/Home/skeletonLoader";

interface OrbImageProps {
  theme: string;
  src: string;
  alt: string;
  className?: string;
  hoverIntensity?: number;
  rotateOnHover?: boolean;
  forceHoverState?: boolean;
}

export default function OrbImage({
  theme,
  src,
  alt,
  className = "",
  forceHoverState = false,
}: OrbImageProps) {
  const ctnDom = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={ctnDom}
      className="relative w-full h-full flex items-center justify-center"
      style={{
        backgroundColor: theme === "dark" ? "#111827" : "#ffffff",
      }}
    >
      {isLoading ? (
        <SkeletonLoader theme={theme} />
      ) : (
        <div
          className={`relative w-4/5 h-5/6 md:h-4/5 rounded-full overflow-hidden transition-transform duration-500 ease-out ${
            forceHoverState ? "scale-[1.1] rotate-6" : "hover:scale-105 hover:rotate-3"
          } ${theme === "dark" ? "darkOrbBackgroundAnimation" : "lightOrbBackgroundAnimation"}`}
        >
          <Image
            src={src}
            alt={alt}
            fill
            className={`object-cover transition-opacity duration-500 ${className}`}
            priority
          />
        </div>
      )}
    </div>
  );
}