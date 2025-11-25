"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import BasicInfoSkeleton from "../Skeletons/Home/basicInfoSkeleton";

interface BasicInfoProps {
  theme: "light" | "dark";
}

export default function BasicInfo({ theme }: BasicInfoProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="md:w-1/2 w-full h-full text-center md:text-left space-y-8 order-2 md:order-last px-6 md:px-0">
      {isLoading ? (
        <BasicInfoSkeleton />
      ) : (
        <div className="space-y-8 animate-fadeIn">
          {/* Enhanced Heading with Gradient */}
          <h1 className="text-3xl md:text-[3rem] lg:text-[3.5rem] mb-6 leading-tight font-extrabold text-left">
            <span className="bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
              Aspiring to{" "}
            </span>
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 bg-clip-text text-transparent animate-gradient">
              learn and apply.
            </span>
          </h1>

          {/* Enhanced Description with Better Typography */}
          <div className="space-y-4">
            <p className="text-base md:text-[1.15rem] leading-relaxed text-gray-700 dark:text-gray-300">
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                A dedicated and self-motivated
              </span>{" "}
              Next.js and MERN Stack Developer driven by a passion for solving
              real-world problems.
            </p>
            <p className="text-base md:text-[1.15rem] leading-relaxed text-gray-600 dark:text-gray-400">
              Committed to contributing to national, organizational, and
              personal growth through innovative solutions, adaptability, and a
              relentless pursuit of excellence.
            </p>
          </div>

          {/* Enhanced CTA Section */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
            <Link
              href="/Resume/Ajay_Thorat.pdf"
              target="_blank"
              className={`group relative inline-flex items-center justify-center px-8 py-4 rounded-xl text-base md:text-lg font-semibold transition-all duration-300 overflow-hidden ${
                theme === "dark"
                  ? "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50"
                  : "bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white shadow-lg shadow-gray-900/30 hover:shadow-gray-900/50"
              } hover:scale-105 hover:-translate-y-1`}
            >
              <span className="relative z-10 flex items-center gap-2">
                View Resume
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </Link>

            <Link
              href="/contact"
              className={`inline-flex items-center justify-center px-8 py-4 rounded-xl text-base md:text-lg font-semibold border-2 transition-all duration-300 ${
                theme === "dark"
                  ? "border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-gray-600"
                  : "border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400"
              } hover:scale-105`}
            >
              Contact Me
            </Link>
          </div>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start pt-4">
            {["Next.js", "React", "Node.js", "MongoDB", "TypeScript"].map(
              (tech) => (
                <span
                  key={tech}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-110 ${
                    theme === "dark"
                      ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {tech}
                </span>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}