"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaAward, FaExternalLinkAlt, FaCheckCircle, FaCertificate } from "react-icons/fa";
import { HiOutlineAcademicCap } from "react-icons/hi";
import { certificationsData } from "@/constants/about";

export default function Certifications() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedImage]);

  const getGradientColors = (index: number) => {
    const gradients = [
      { from: "from-blue-600", to: "to-cyan-600", bg: "bg-blue-50 dark:bg-blue-900/10" },
      { from: "from-purple-600", to: "to-pink-600", bg: "bg-purple-50 dark:bg-purple-900/10" },
      { from: "from-orange-600", to: "to-red-600", bg: "bg-orange-50 dark:bg-orange-900/10" },
    ];
    return gradients[index % gradients.length];
  };

  return (
    <div className="container-custom section">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4 animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full border border-primary/20">
            <FaCheckCircle className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Verified Credentials</span>
          </div>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Professional certifications validating expertise and commitment to continuous learning in cutting-edge technologies.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn" style={{ animationDelay: '100ms' }}>
          {certificationsData.map((cert, index) => {
            const colors = getGradientColors(index);
            
            return (
              <div
                key={cert.id}
                className="group relative card-interactive p-6 hover:-translate-y-2 overflow-hidden"
                onMouseEnter={() => setHoveredCard(cert.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Top Accent Bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${colors.from} ${colors.to}`}></div>

                {/* Content */}
                <div className="space-y-4">
                  {/* Header with Icon and Badge */}
                  <div className="flex items-start justify-between">
                    <div className={`relative p-3 bg-gradient-to-br ${colors.from} ${colors.to} rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <HiOutlineAcademicCap className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <FaCheckCircle className="w-3 h-3" />
                        <span>Verified</span>
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <div>
                    <h3 className="text-lg font-bold text-foreground leading-tight mb-3 min-h-[3rem] line-clamp-2">
                      {cert.title}
                    </h3>
                    <div className={`h-1 w-16 bg-gradient-to-r ${colors.from} ${colors.to} rounded-full group-hover:w-24 transition-all duration-500`}></div>
                  </div>

                  {/* Organization & Year */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <FaAward className="w-4 h-4 text-primary" />
                      <span className="text-sm font-semibold text-foreground">
                        {cert.organization}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-muted-foreground"></div>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        Issued in {cert.year}
                      </span>
                    </div>
                  </div>

                  {/* View Button */}
                  <button
                    onClick={() => setSelectedImage(cert.image)}
                    className={`w-full group/btn relative overflow-hidden px-5 py-3 bg-gradient-to-r ${colors.from} ${colors.to} hover:shadow-lg text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]`}
                  >
                    <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                    
                    <span className="relative flex items-center justify-center gap-2">
                      <FaCertificate className="w-4 h-4" />
                      <span>View Certificate</span>
                      <FaExternalLinkAlt className="w-3.5 h-3.5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
                    </span>
                  </button>
                </div>

                {/* Hover Border Effect */}
                {hoveredCard === cert.id && (
                  <div className="absolute inset-0 rounded-2xl pointer-events-none">
                    <div className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-r ${colors.from} ${colors.to} opacity-30 blur-sm`}></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Full-screen Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-lg p-4 animate-fadeIn"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="relative w-full max-w-6xl glass-card rounded-3xl shadow-2xl overflow-hidden border border-border"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-6 right-6 z-10 p-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-full shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 group"
                aria-label="Close"
              >
                <IoClose className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
              </button>

              <div className="relative w-full p-8" style={{ maxHeight: "85vh" }}>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-muted">
                  <Image
                    src={selectedImage}
                    alt="Certificate"
                    width={1200}
                    height={800}
                    className="w-full h-auto object-contain"
                    sizes="90vw"
                    priority
                  />
                </div>
              </div>

              <div className="bg-gradient-to-r from-primary via-secondary to-accent p-5 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-gradient"></div>
                <div className="relative flex items-center justify-center gap-2">
                  <FaCheckCircle className="w-5 h-5 text-white" />
                  <p className="text-white font-bold text-sm">
                    Click outside or press the close button to exit
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}