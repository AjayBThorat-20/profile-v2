"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { BasicInfo, OrbImage } from "@/Components/Home/page";
import WrapperLayout from "@/Components/Layout/wrapperLayout";
import { useEffect, useState } from "react";

export default function Home() {
  const theme = useSelector((state: RootState) => state.theme.mode);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <WrapperLayout firstPosition="" secondPosition="">
      <div className="relative w-full min-h-[calc(100vh-140px)] flex items-center">
        {/* Animated background pattern */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 dark:from-blue-600/5 dark:to-cyan-600/5 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-pink-400/10 dark:from-purple-600/5 dark:to-pink-600/5 rounded-full blur-3xl animate-pulse-slower" />
        </div>

        {/* Main content */}
        <div className="flex flex-col md:flex-row items-center md:justify-between w-full gap-12 md:gap-16 py-8">
          {/* Image Section */}
          <div className="relative w-full md:w-1/2 flex items-center justify-center order-1 md:order-1">
            <div className="relative">
              {/* Decorative elements behind the orb */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 dark:from-blue-600/10 dark:to-cyan-600/10 rounded-full blur-2xl opacity-50 animate-pulse-slow" />
              
              <OrbImage
                theme={theme}
                src="/Images/Profile/Ajay3.png"
                alt="Ajay Thorat - Full Stack Developer"
                className="brightness-100"
              />

              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 md:-right-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl px-4 py-3 animate-float border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                    Available
                  </span>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 md:-left-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl px-4 py-3 animate-float-delayed border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-blue-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                    Learning
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Info Section */}
          <BasicInfo theme={theme} />
        </div>
      </div>
    </WrapperLayout>
  );
}