"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaAward, FaExternalLinkAlt, FaCheckCircle, FaCertificate } from "react-icons/fa";
import { HiOutlineAcademicCap } from "react-icons/hi";
import WrapperLayout from "../Layout/wrapperLayout";
import CertificationsSkeleton from "../Skeletons/About/certificationsSkeleton";
import { certificationsData } from "@/constants/about";

export default function Certifications() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

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
    <WrapperLayout firstPosition="My" secondPosition="Certifications">
      {isLoading ? (
        <CertificationsSkeleton />
      ) : (
        <>
          {/* Header Section */}
          <div className="text-center mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-full border border-blue-200 dark:border-blue-800">
              <FaCheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                Verified Credentials
              </span>
            </div>
            <p className="text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Professional certifications that validate my expertise and commitment
              to continuous learning in cutting-edge technologies.
            </p>
          </div>

          {/* Certifications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {certificationsData.map((cert, index) => {
              const colors = getGradientColors(index);
              
              return (
                <div
                  key={cert.id}
                  className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 dark:border-gray-700 transform hover:-translate-y-2"
                  style={{
                    animation: `fadeIn 0.6s ease-out ${index * 0.1}s both`
                  }}
                  onMouseEnter={() => setHoveredCard(cert.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Top Accent Bar */}
                  <div className={`h-2 bg-gradient-to-r ${colors.from} ${colors.to}`}></div>

                  {/* Content */}
                  <div className="p-6 space-y-5">
                    {/* Header with Icon and Badge */}
                    <div className="flex items-start justify-between">
                      <div className={`relative p-3 bg-gradient-to-br ${colors.from} ${colors.to} rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <HiOutlineAcademicCap className="w-8 h-8 text-white" />
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
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight mb-3 min-h-[3.5rem] line-clamp-2">
                        {cert.title}
                      </h3>
                      <div className={`h-1 w-16 bg-gradient-to-r ${colors.from} ${colors.to} rounded-full group-hover:w-24 transition-all duration-500`}></div>
                    </div>

                    {/* Organization & Year */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <FaAward className={`w-4 h-4 text-${colors.from.split('-')[1]}-600 dark:text-${colors.from.split('-')[1]}-400`} />
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                          {cert.organization}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500"></div>
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
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

          {/* Stats Section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { label: "Total Certifications", value: certificationsData.length, icon: FaCertificate },
              { label: "Organizations", value: new Set(certificationsData.map(c => c.organization)).size, icon: FaAward },
              { label: "Years Active", value: new Set(certificationsData.map(c => c.year)).size, icon: FaCheckCircle },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  style={{
                    animation: `fadeIn 0.6s ease-out ${index * 0.1 + 0.6}s both`
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                      <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {stat.label}
                      </div>
                    </div>
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
                className="relative w-full max-w-6xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700"
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
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-100 dark:bg-gray-800">
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

                <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 p-5 text-center relative overflow-hidden">
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
        </>
      )}
    </WrapperLayout>
  );
}