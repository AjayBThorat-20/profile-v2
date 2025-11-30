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
      style={{
        backgroundColor: theme === "dark" ? "transparent" : "transparent",
      }}
    >
      {isLoading ? (
        <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[360px] md:h-[360px] rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 animate-pulse" />
      ) : (
        <div className="relative">
          {/* Animated rings around the image */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className={`absolute w-[310px] h-[310px] sm:w-[350px] sm:h-[350px] md:w-[390px] md:h-[390px] rounded-full border ${
                theme === "dark"
                  ? "border-blue-400/30"
                  : "border-blue-500/30"
              }`}
              style={{
                animation: "ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite",
              }}
            />
            <div
              className={`absolute w-[330px] h-[330px] sm:w-[370px] sm:h-[370px] md:w-[410px] md:h-[410px] rounded-full border ${
                theme === "dark"
                  ? "border-cyan-400/20"
                  : "border-cyan-500/20"
              }`}
              style={{
                animation: "ping 3.5s cubic-bezier(0, 0, 0.2, 1) infinite",
                animationDelay: "0.5s",
              }}
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
                  : "shadow-[0_0_50px_rgba(251,146,60,0.4),0_0_100px_rgba(251,191,36,0.2)]"
              }`}
            >
              {/* Animated gradient border using pseudo-elements */}
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <div
                  className={`absolute inset-[-2px] rounded-full ${
                    theme === "dark"
                      ? "bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500"
                      : "bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500"
                  }`}
                  style={{
                    animation: "gradient-move 3s ease-in-out infinite",
                  }}
                />
                <div
                  className={`absolute inset-[2px] rounded-full ${
                    theme === "dark" ? "bg-gray-900" : "bg-white"
                  } z-10`}
                />
              </div>
              {/* Inner container with image */}
              <div
                className={`relative w-full h-full rounded-full overflow-hidden z-20 ${
                  theme === "dark" ? "bg-gray-900" : "bg-white"
                }`}
                style={{
                  margin: '2px'
                }}
              >
                <Image
                  src={src}
                  alt={alt}
                  fill
                  className={`object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${className}`}
                  priority
                  sizes="(max-width: 640px) 290px, (max-width: 768px) 330px, 370px"
                  style={{
                    objectPosition: 'center 30%'
                  }}
                />
                
                {/* Gradient overlay for depth */}
                <div className={`absolute inset-0 ${
                  theme === "dark"
                    ? "bg-gradient-to-t from-gray-900/20 via-transparent to-transparent"
                    : "bg-gradient-to-t from-white/20 via-transparent to-transparent"
                } pointer-events-none`} />
                
                {/* Shine effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" 
                  style={{
                    transform: "translateX(-100%)",
                    animation: "shine 3s ease-in-out infinite"
                  }}
                />
              </div>
            </div>

            {/* Glow effect on hover */}
            <div className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10 ${
              theme === "dark"
                ? "bg-blue-500/20"
                : "bg-orange-500/20"
            }`} />
          </div>

          {/* Floating particles effect */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-1.5 h-1.5 rounded-full ${
                  theme === "dark" ? "bg-blue-400/60" : "bg-orange-400/60"
                } blur-[0.5px]`}
                style={{
                  top: `${15 + (i * 70 / 8)}%`,
                  left: `${10 + ((i * 80) % 90)}%`,
                  animation: `float ${2.5 + (i % 3) * 0.5}s ease-in-out ${i * 0.3}s infinite`,
                }}
              />
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes ping {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          75%, 100% {
            transform: scale(1.15);
            opacity: 0;
          }
        }
        
        @keyframes gradient-move {
          0%, 100% {
            background-position: 0% 50%;
            background-size: 200% 200%;
          }
          50% {
            background-position: 100% 50%;
            background-size: 200% 200%;
          }
        }
        
        @keyframes shine {
          0% {
            transform: translateX(-100%) translateY(-100%) rotate(30deg);
          }
          100% {
            transform: translateX(100%) translateY(100%) rotate(30deg);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-15px) translateX(10px);
            opacity: 0.9;
          }
        }
      `}</style>
    </div>
  );
}