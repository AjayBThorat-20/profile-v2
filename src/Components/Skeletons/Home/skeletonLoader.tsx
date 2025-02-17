import React from "react";

interface SkeletonLoaderProps {
  theme: string;
}

export default function SkeletonLoader({ theme }: SkeletonLoaderProps) {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "80%",
        height: "80%",
        borderRadius: "50%",
        overflow: "hidden",
        animation: "pulse 1.5s infinite",
        backgroundColor: theme === "dark" ? "#374151" : "#e0e0e0",
      }}
    />
  );
}