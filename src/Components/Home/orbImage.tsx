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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ctnDom.current) return;
    const rect = ctnDom.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ctnDom}
      className="relative w-full h-full flex items-center justify-center"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        backgroundColor: theme === "dark" ? "#111827" : "#ffffff",
      }}
    >
      {isLoading ? (
        <SkeletonLoader theme={theme} />
      ) : (
        <div className="relative">
          {/* Animated rings around the image */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={`absolute w-[320px] h-[320px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] rounded-full border-2 ${
                theme === "dark"
                  ? "border-blue-500/20"
                  : "border-blue-600/20"
              } animate-ping-slow`}
            />
            <div
              className={`absolute w-[340px] h-[340px] md:w-[370px] md:h-[370px] lg:w-[420px] lg:h-[420px] rounded-full border-2 ${
                theme === "dark"
                  ? "border-cyan-500/10"
                  : "border-cyan-600/10"
              } animate-ping-slower`}
            />
          </div>

          {/* Main image container with enhanced effects */}
          <div
            className={`relative w-[300px] h-[300px] md:w-[320px] md:h-[320px] lg:w-[380px] lg:h-[380px] rounded-full overflow-hidden transition-all duration-500 ease-out ${
              forceHoverState ? "scale-[1.1]" : ""
            } ${
              theme === "dark"
                ? "shadow-2xl shadow-blue-500/30"
                : "shadow-2xl shadow-gray-900/20"
            } hover:scale-105 group`}
            style={{
              transform: `perspective(1000px) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)`,
              transition: "transform 0.3s ease-out",
            }}
          >
            {/* Gradient border effect */}
            <div
              className={`absolute inset-0 rounded-full p-[3px] ${
                theme === "dark"
                  ? "bg-gradient-to-br from-blue-500 via-cyan-500 to-purple-500"
                  : "bg-gradient-to-br from-blue-600 via-cyan-600 to-purple-600"
              } animate-gradient-rotate`}
            >
              <div
                className={`w-full h-full rounded-full overflow-hidden ${
                  theme === "dark"
                    ? "bg-gray-900"
                    : "bg-gray-100"
                }`}
              >
                <Image
                  src={src}
                  alt={alt}
                  fill
                  className={`object-cover transition-all duration-500 group-hover:scale-110 ${className}`}
                  priority
                />
              </div>
            </div>

            {/* Shine effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
          </div>

          {/* Floating particles effect */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-2 h-2 rounded-full ${
                  theme === "dark" ? "bg-blue-400" : "bg-blue-600"
                } opacity-40 animate-float`}
                style={{
                  top: `${20 + i * 10}%`,
                  left: `${10 + i * 15}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${3 + i * 0.5}s`,
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}