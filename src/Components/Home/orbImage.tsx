"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

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
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ctnDom.current) return;
    const rect = ctnDom.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 15;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ctnDom}
      className="relative w-full h-full min-h-[450px] flex items-center justify-center px-4 py-8"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {isLoading ? (
        <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[360px] md:h-[360px] rounded-full gradient-bg-1 animate-pulse" />
      ) : (
        <div className="relative">
          {/* Animated rings around the image */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className={`absolute w-[310px] h-[310px] sm:w-[350px] sm:h-[350px] md:w-[390px] md:h-[390px] rounded-full border-2 ${
                theme === "dark"
                  ? "border-primary/30"
                  : "border-primary/40"
              } animate-ping-slow`}
            />
            <div
              className={`absolute w-[330px] h-[330px] sm:w-[370px] sm:h-[370px] md:w-[410px] md:h-[410px] rounded-full border-2 ${
                theme === "dark"
                  ? "border-secondary/20"
                  : "border-secondary/30"
              } animate-ping-slower`}
            />
          </div>

          {/* Main image container */}
          <div
            className={`relative transition-all duration-300 ease-out ${
              forceHoverState ? "scale-[1.03]" : ""
            } hover:scale-[1.03] group`}
            style={{
              transform: `perspective(1000px) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)`,
              transition: "transform 0.2s ease-out",
            }}
          >
            {/* Gradient border wrapper */}
            <div
              className={`relative w-[290px] h-[290px] sm:w-[330px] sm:h-[330px] md:w-[370px] md:h-[370px] rounded-full ${
                theme === "dark"
                  ? "shadow-[0_0_50px_rgba(59,130,246,0.4),0_0_100px_rgba(139,92,246,0.2)]"
                  : "shadow-[0_0_50px_rgba(59,130,246,0.3),0_0_100px_rgba(6,182,212,0.2)]"
              } group-hover:shadow-[0_0_60px_rgba(59,130,246,0.5),0_0_120px_rgba(139,92,246,0.3)] transition-shadow duration-500`}
            >
              {/* Animated gradient border */}
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <div
                  className={`absolute inset-[-3px] rounded-full bg-gradient-to-r ${
                    theme === "dark"
                      ? "from-primary via-secondary to-accent"
                      : "from-primary via-secondary to-primary"
                  } animate-rotate`}
                />
                <div
                  className={`absolute inset-[3px] rounded-full ${
                    theme === "dark" ? "bg-background" : "bg-card"
                  } z-10`}
                />
              </div>

              {/* Inner container with image */}
              <div
                className={`relative w-full h-full rounded-full overflow-hidden z-20 ${
                  theme === "dark" ? "bg-background" : "bg-card"
                }`}
                style={{ margin: '3px' }}
              >
                <Image
                  src={src}
                  alt={alt}
                  fill
                  className={`object-cover transition-transform duration-700 ease-out group-hover:scale-110 ${className}`}
                  priority
                  sizes="(max-width: 640px) 290px, (max-width: 768px) 330px, 370px"
                  style={{ objectPosition: 'center 30%' }}
                />
                
                {/* Gradient overlay for depth */}
                <div className={`absolute inset-0 ${
                  theme === "dark"
                    ? "bg-gradient-to-t from-background/30 via-transparent to-transparent"
                    : "bg-gradient-to-t from-card/30 via-transparent to-transparent"
                } pointer-events-none`} />
                
                {/* Shine effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/30 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shimmer" />
              </div>
            </div>

            {/* Glow effect on hover */}
            <div className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10 ${
              theme === "dark"
                ? "bg-primary/30"
                : "bg-primary/20"
            }`} />
          </div>
        </div>
      )}
    </div>
  );
}