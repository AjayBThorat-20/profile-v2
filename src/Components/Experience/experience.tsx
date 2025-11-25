"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import WrapperLayout from "../Layout/wrapperLayout";
import ExperienceSkeleton from "../Skeletons/Expeience/experienceSkeleton";
import { experienceData } from "@/constants/experience";
import { FaArrowRight, FaCalendar, FaBriefcase } from "react-icons/fa";

export default function Experience() {
  const [currentImageIndexes, setCurrentImageIndexes] = useState<number[]>(
    experienceData.map(() => 0)
  );
  const [isHovered, setIsHovered] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.innerWidth < 768);
    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  useEffect(() => {
    if (isHovered !== null) {
      const interval = setInterval(() => {
        setCurrentImageIndexes((prevIndexes) => {
          const newIndexes = [...prevIndexes];
          newIndexes[isHovered] =
            (newIndexes[isHovered] + 1) %
            experienceData[isHovered].details.length;
          return newIndexes;
        });
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isHovered]);

  const handleViewDetails = (
    experience: (typeof experienceData)[number]
  ) => {
    localStorage.setItem("selectedExperience", JSON.stringify(experience));
    router.push(
      `/experience/details?id=${experience.id}&company=${encodeURIComponent(
        experience.name
      )}`
    );
  };

  return (
    <WrapperLayout firstPosition="Work" secondPosition="Experience">
      {isLoading ? (
        <ExperienceSkeleton />
      ) : (
        <>
          <p className="text-lg text-gray-600 dark:text-gray-300 text-center max-w-3xl mx-auto mb-12">
            Discover my professional journey through various roles and impactful
            projects that have shaped my expertise.
          </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {experienceData.map((experience, idx) => (
            <div
              key={experience.id}
              className={`group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:-translate-y-2 ${
                idx === 0
                  ? "md:col-start-1 md:row-start-1"
                  : idx === 1
                  ? "md:col-start-2 md:row-start-1"
                  : idx === 2
                  ? "md:col-start-1 md:row-start-2 lg:col-start-3 lg:row-start-1"
                  : ""
              }`}
              onMouseEnter={() => !isMobile && setIsHovered(idx)}
              onMouseLeave={() => !isMobile && setIsHovered(null)}
            >
              {/* Image Section */}
              <div className="relative h-64 w-full overflow-hidden">
                {experience.details.map((item, index) => (
                  <Image
                    key={item.id}
                    src={item.picture}
                    alt={`${experience.title} - ${index + 1}`}
                    className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
                      currentImageIndexes[idx] === index
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ))}
                
                {/* Image Counter Badge */}
                <div className="absolute top-4 right-4 bg-black/70 text-white text-xs px-3 py-1.5 rounded-full font-semibold">
                  {currentImageIndexes[idx] + 1} / {experience.details.length}
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Content Section */}
              <div className="p-6 space-y-4">
                {/* Role Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-semibold">
                  <FaBriefcase className="w-3 h-3" />
                  Professional Role
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {experience.title}
                </h2>

                {/* Company */}
                <p className="text-gray-700 dark:text-gray-300 font-medium">
                  {experience.name}
                </p>

                {/* Duration */}
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                  <FaCalendar className="w-4 h-4" />
                  <span>{experience.duration}</span>
                </div>

                {/* View Details Button */}
                <button
                  onClick={() => handleViewDetails(experience)}
                  className="w-full mt-4 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-105"
                >
                  <span>View Details</span>
                  <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          ))}
        </div>
        </>
      )}
    </WrapperLayout>
  );
}