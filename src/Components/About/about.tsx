"use client";

import Image from "next/image";
import WrapperLayout from "../Layout/wrapperLayout";
import { FaMapMarkerAlt, FaCode, FaRocket } from "react-icons/fa";

export default function About() {
  const highlights = [
    { icon: FaMapMarkerAlt, label: "Based in", value: "Mumbai, India" },
    { icon: FaCode, label: "Specialization", value: "Full-Stack Development" },
    { icon: FaRocket, label: "Focus", value: "Scalable Solutions" },
  ];

  return (
    <WrapperLayout firstPosition="" secondPosition="">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Hero Section */}
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-800 dark:text-gray-200 mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
              AJAY
            </span>{" "}
            BHIMRAO THORAT
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Full-Stack Developer | Problem Solver | Tech Enthusiast
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
          {/* Text Section */}
          <div className="lg:w-1/2 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                My name is{" "}
                <span className="font-bold text-blue-600 dark:text-blue-400">
                  Ajay Bhimrao Thorat
                </span>
                , and I'm based in{" "}
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Mumbai, India
                </span>
                . I'm a{" "}
                <span className="font-bold text-blue-600 dark:text-blue-400">
                  full-stack developer
                </span>{" "}
                with expertise in{" "}
                <span className="font-semibold">
                  Next.js, Python, Node.js, React.js, and MongoDB
                </span>
                .
              </p>

              <p className="text-lg leading-relaxed mt-4 text-gray-700 dark:text-gray-300">
                With hands-on experience in building{" "}
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  scalable web applications
                </span>{" "}
                and managing{" "}
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  agile teams
                </span>
                , I excel in delivering{" "}
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  user-centric solutions
                </span>
                . Adaptable under pressure, I thrive in{" "}
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  collaborative environments
                </span>{" "}
                and innovative projects.
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-600 dark:bg-blue-500 rounded-lg">
                      <item.icon className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                      {item.label}
                    </p>
                  </div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Image Section */}
          <div className="lg:w-1/2 flex justify-center">
            <div className="relative">
              {/* Decorative background */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl opacity-20 blur-2xl"></div>
              
              {/* Main image container */}
              <div className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] lg:w-[420px] lg:h-[420px] rounded-3xl shadow-2xl overflow-hidden group border-4 border-white dark:border-gray-800">
                <Image
                  src="/Images/Profile/Ajay.png"
                  // src="/Images/Dummy/icon.png"
                  alt="Ajay Thorat"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  priority
                  sizes="(max-width: 640px) 280px, (max-width: 1024px) 350px, 420px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-transparent to-transparent"></div>
                
                {/* Floating badge */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm px-6 py-3 rounded-full shadow-xl border border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    Full-Stack Developer
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WrapperLayout>
  );
}