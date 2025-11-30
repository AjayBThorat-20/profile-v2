"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaArrowLeft, FaExternalLinkAlt, FaCalendar } from "react-icons/fa";

interface Experience {
  id: number;
  name: string;
  title: string;
  duration: string;
  companyUrl: string;
  techStack: string;
  details: {
    id: number;
    title: string;
    picture: string;
    data: string | { [key: string]: string[] };
  }[];
}

export default function ExperienceDetails() {
  const router = useRouter();
  const [experience, setExperience] = useState<Experience | null>(null);

  useEffect(() => {
    const storedExperience = localStorage.getItem("selectedExperience");
    if (storedExperience) {
      try {
        setExperience(JSON.parse(storedExperience));
      } catch (error) {
        console.error("Error parsing stored experience:", error);
      }
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleBack = () => {
    localStorage.removeItem("selectedExperience");
    router.back();
  };

  if (!experience)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <p className="text-lg font-semibold text-gray-500">Loading...</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen pb-20">
      <div className="p-6 max-w-5xl mx-auto">
        {/* Header Card */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 mb-8">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
              {experience.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-gray-700 dark:text-gray-300">
              <a
                href={experience.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-lg font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              >
                {experience.name}
                <FaExternalLinkAlt className="w-4 h-4" />
              </a>
              
              <span className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <FaCalendar className="w-4 h-4" />
                {experience.duration}
              </span>
            </div>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-2 pt-2">
              {experience.techStack.split(",").map((tech, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium border border-gray-300 dark:border-gray-600 shadow-sm"
                >
                  {tech.trim()}
                </span>
              ))}
            </div>
          </div>
        </div>

{/* Details Section */}
        <div className="space-y-6">
          {experience.details.map((detail, index) => (
            <div
              key={detail.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              {/* Image Section - Top */}
              <div className="relative w-full h-72 md:h-[500px] overflow-hidden">
            <Image
  src={detail.picture}
  alt={detail.title}
  fill
  className="object-cover hover:scale-105 transition-transform duration-500"
  sizes="(max-width: 768px) 100vw, 80vw"  // ✅ ADDED THIS
  priority={index === 0}                   // ✅ First image only
  quality={85}
/>
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                
                {/* Badge positioned on image */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium shadow-lg">
                  <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse"></span>
                  Detail {index + 1} of {experience.details.length}
                </div>
              </div>

              {/* Text Content Section - Bottom */}
              <div className="p-6 md:p-8 space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  {detail.title}
                </h2>

                {/* Content */}
                {typeof detail.data === "string" ? (
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
                    {detail.data}
                  </p>
                ) : (
                  <div className="space-y-6">
                    {Object.entries(detail.data).map(([key, value]) => (
                      <div key={key} className="space-y-3">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                          <span className="w-1.5 h-6 bg-blue-600 dark:bg-blue-400 rounded-full"></span>
                          {key
                            .replace(/([A-Z])/g, " $1")
                            .trim()
                            .replace(/^./, (str) => str.toUpperCase())}
                        </h3>
                        <ul className="space-y-2 ml-4">
                          {value.map((item, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-3 text-gray-700 dark:text-gray-300 text-base"
                            >
                              <span className="mt-2 w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full flex-shrink-0"></span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Back Button */}
      <button
        onClick={handleBack}
        className="fixed bottom-6 right-6 md:bottom-10 md:right-10 flex items-center gap-2 px-6 py-3 
                   bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full shadow-2xl 
                   transition-all duration-300 hover:shadow-blue-500/50 hover:scale-110 
                   active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 z-50 group"
        aria-label="Go back"
      >
        <FaArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
        <span className="font-semibold hidden sm:block">Back</span>
      </button>
    </div>
  );
}