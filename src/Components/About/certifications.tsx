"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaAward, FaExternalLinkAlt, FaCheckCircle, FaCertificate } from "react-icons/fa";
import { HiOutlineAcademicCap } from "react-icons/hi";
import { certificationsData } from "@/constants/about";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { getAccent } from "@/Components/UI/accentColor";
import IconTile from "@/Components/UI/IconTile";
import SectionEyebrow from "@/Components/UI/SectionEyebrow";

export default function Certifications() {
  const [selectedImage, setSelectedImage] = useState<{ image: string; title: string } | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isRevealed = useScrollReveal(sectionRef);

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

  return (
    <div ref={sectionRef} className={`container-custom section scroll-reveal ${isRevealed ? "is-visible" : ""}`}>
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4 animate-fadeIn">
          <div className="flex justify-center">
            <SectionEyebrow icon={FaCheckCircle} label="Verified Credentials" />
          </div>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Professional certifications validating expertise and commitment to continuous learning in cutting-edge technologies.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn" style={{ animationDelay: '60ms' }}>
          {certificationsData.map((cert, index) => {
            const accent = getAccent(index);

            return (
              <div
                key={cert.id}
                className={`group relative border ${accent.border} rounded-2xl p-6 hover:-translate-y-1 transition-transform duration-200 overflow-hidden`}
              >
                {/* Top Accent Bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 ${accent.bg}`}></div>

                {/* Content */}
                <div className="space-y-4">
                  {/* Header with Icon and Badge */}
                  <div className="flex items-start justify-between">
                    <IconTile icon={HiOutlineAcademicCap} accent={accent} size="md" />
                    <div className="flex items-center gap-2">
                      <div className="bg-green-500/10 text-green-600 dark:text-green-400 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
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
                    <div className={`h-0.5 w-16 ${accent.bg} rounded-full group-hover:w-24 transition-all duration-300`}></div>
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
                    onClick={() => setSelectedImage({ image: cert.image, title: cert.title })}
                    className={`w-full px-5 py-3 border ${accent.border} ${accent.bgSoft} ${accent.text} font-semibold rounded-xl transition-colors duration-150 ${accent.hoverBgSolid}`}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <FaCertificate className="w-4 h-4" />
                      <span>View Certificate</span>
                      <FaExternalLinkAlt className="w-3.5 h-3.5" />
                    </span>
                  </button>
                </div>
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
              className="relative w-full max-w-6xl bg-card rounded-3xl shadow-2xl overflow-hidden border border-border"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-6 right-6 z-10 p-3 bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-full shadow-xl transition-colors duration-150 active:scale-95"
                aria-label="Close"
              >
                <IoClose className="w-6 h-6" />
              </button>

              <div className="relative w-full p-8" style={{ maxHeight: "85vh" }}>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-muted">
                  <Image
                    src={selectedImage.image}
                    alt={`${selectedImage.title} certificate - Ajay Thorat`}
                    width={1200}
                    height={800}
                    className="w-full h-auto object-contain"
                    sizes="90vw"
                    priority
                  />
                </div>
              </div>

              <div className="border-t border-border p-5 text-center">
                <div className="flex items-center justify-center gap-2">
                  <FaCheckCircle className="w-4 h-4 text-primary" />
                  <p className="text-sm text-muted-foreground">
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