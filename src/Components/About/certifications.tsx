"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { certificationsData } from "@/Constants/about";
import CertificationsSkeleton from "../Skeletons/about/CertificationsSkeleton";
import WrapperLayout from "../layout/WrapperLayout";

export default function Certifications() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000); // Simulate 1 second loading
    return () => clearTimeout(timer);
  }, []);

  return (
    <WrapperLayout firstPosition="My" secondPosition="Certifications">
      {/* Certifications Grid */}
      {isLoading ? (
        <CertificationsSkeleton />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl px-4">
          {certificationsData.map((cert) => (
            <div
              key={cert.id}
              className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border border-gray-200 dark:border-gray-700"
            >
              {/* Image */}
              <div
                className="w-full h-[250px] rounded-lg overflow-hidden shadow-md cursor-pointer"
                onClick={() => setSelectedImage(cert.image)}
              >
                <Image
                  src={cert.image}
                  alt={cert.title}
                  width={400}
                  height={250}
                  className="object-cover w-full h-full"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              {/* Certification Info */}
              <div className="text-center mt-4">
                <p className="text-sm uppercase font-semibold text-gray-600 dark:text-gray-300">
                  {cert.organization}
                </p>
                <small className="text-gray-500 dark:text-gray-400">{cert.year}</small>
                <h4 className="font-bold text-lg mt-2 text-gray-800 dark:text-gray-200">
                  {cert.title}
                </h4>
              </div>

              {/* View Button */}
              <button
                className="mt-4 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition-all transform active:scale-95"
                onClick={() => setSelectedImage(cert.image)}
              >
                View Certificate
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Full-screen Modal with Blurred Background */}
      {selectedImage && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-md transition-all">
          <div className="relative w-[90vw] max-w-3xl bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-300 dark:border-gray-700 p-4">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-700 dark:text-gray-300 hover:text-red-500 transition-transform transform hover:scale-110"
              onClick={() => setSelectedImage(null)}
            >
              <IoIosCloseCircle className="w-10 h-10" />
            </button>

            {/* Full-size Image */}
            <div className="flex justify-center items-center p-4">
              <Image
                src={selectedImage}
                alt="Certificate"
                width={900}
                height={600}
                className="rounded-lg object-contain max-w-full max-h-[80vh]"
                sizes="(max-width: 768px) 80vw, (max-width: 1200px) 60vw, 50vw"
              />
            </div>
          </div>
        </div>
      )}
    </WrapperLayout>
  );
}