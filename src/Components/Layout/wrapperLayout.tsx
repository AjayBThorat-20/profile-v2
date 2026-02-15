"use client";

import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

interface WrapperLayoutProps {
  firstPosition: string;
  secondPosition: string;
  children: React.ReactNode;
}

export default function WrapperLayout({
  firstPosition,
  secondPosition,
  children,
}: WrapperLayoutProps) {
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname, isClient]);

  if (!isClient) {
    return (
      <div className="container-custom">
        <div className="section">
          {firstPosition || secondPosition ? (
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-center mb-8 sm:mb-12">
              <span className="text-foreground">{firstPosition}</span>{" "}
              <span className="gradient-text">{secondPosition}</span>
            </h1>
          ) : null}
          <div id="content-wrapper" style={{ visibility: "hidden" }}>
            {children}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom">
      <div className="section animate-fadeIn">
        {firstPosition || secondPosition ? (
          <div className="mb-12 md:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-center leading-tight">
              <div className="overflow-hidden mb-2">
                <span className="inline-block animate-slideInLeft text-foreground">
                  {firstPosition}
                </span>
              </div>
              <div className="overflow-hidden">
                <span className="inline-block gradient-text-animated animate-slideInRight">
                  {secondPosition}
                </span>
              </div>
            </h1>
            
            {/* Decorative underline */}
            <div className="flex justify-center mt-6">
              <div className="h-1 w-24 bg-gradient-to-r from-primary via-secondary to-accent rounded-full animate-fadeIn" style={{ animationDelay: '400ms' }}></div>
            </div>
          </div>
        ) : null}

        {/* Children */}
        <div id="content-wrapper">{children}</div>
      </div>
    </div>
  );
}