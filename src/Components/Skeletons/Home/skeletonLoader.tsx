import React from "react";

interface SkeletonLoaderProps {
  theme: string;
}

export default function SkeletonLoader({ theme }: SkeletonLoaderProps) {
  return (
    <div
    className={`w-[300px] h-[300px] md:w-[300px] md:h-[300px] lg:w-[350px] lg:h-[350px] rounded-full animate-pulse 
    ${theme === "dark" ? "bg-gray-700" : "bg-gray-300"}`}
  ></div>
  );
}