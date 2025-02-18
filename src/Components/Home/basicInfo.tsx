"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import BasicInfoSkeleton from "../Skeletons/Home/basicInfoSkeleton";

interface BasicInfoProps {
  theme: "light" | "dark"; // Pass the theme as a prop
}

export default function BasicInfo({ theme }: BasicInfoProps) {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000); // Simulate 1 second loading
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="md:w-1/2 w-full h-full text-center md:text-left space-y-8 order-2 md:order-last px-6 md:px-0">
      {isLoading ? (
      <BasicInfoSkeleton/>
      ) : (
        // Actual Content
        <div className="space-y-8">
          <h1 className="text-2xl md:text-[2.6rem] font-bold mb-4 leading-tight">
            Aspiring to learn and apply.
          </h1>
          <p className="text-base md:text-[1.2rem] mb-6 text-justify indent-6 leading-relaxed">
            A dedicated and self-motivated full-stack developer driven by a
            passion for solving real-world problems. Committed to contributing to
            national, organizational, and personal growth through innovative
            solutions, adaptability, and a relentless pursuit of excellence.
          </p>
          <div className="flex justify-center md:justify-start">
            <Link
              href="/Resume/Ajay_Thorat.pdf"
              target="_blank"
              className={`inline-block px-6 py-3 rounded-lg text-base md:text-lg font-semibold border-2 border-solid transition-colors duration-200 ${
                theme === "dark"
                  ? "bg-white text-black hover:bg-gray-900 hover:text-white hover:border-white"
                  : "bg-black text-white hover:bg-white hover:text-black hover:border-black"
              }`}
            >
              Resume
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}