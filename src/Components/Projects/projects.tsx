"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import WrapperLayout from "../Layout/wrapperLayout";
import { projectsData } from "@/constants/project";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

export default function Projects() {
  const [currentImageIndexes, setCurrentImageIndexes] = useState<number[]>(
    Array(projectsData.length).fill(0)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndexes((prevIndexes) =>
        prevIndexes.map((index, activityIdx) =>
          index === projectsData[activityIdx].pictures.length - 1
            ? 0
            : index + 1
        )
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <WrapperLayout firstPosition="Personal" secondPosition="Projects">
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 text-center max-w-3xl mx-auto mb-12">
        Explore my portfolio of projects showcasing technical skills, creativity,
        and problem-solving abilities across various technologies.
      </p>

      {/* Projects Grid */}
      <div className="space-y-8 max-w-7xl mx-auto">
        {projectsData.map((activity, activityIdx) => (
          <div
            key={activity.id}
            className="group w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 p-6">
              {/* Image Section */}
              <div className="lg:col-span-4 flex justify-center items-center">
                <div className="relative w-full max-w-sm aspect-video rounded-xl overflow-hidden shadow-md border-2 border-gray-200 dark:border-gray-700 group-hover:border-blue-500 dark:group-hover:border-blue-400 transition-colors duration-300">
                  <Image
                    alt={`${activity.title} preview`}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    src={
                      activity.pictures[currentImageIndexes[activityIdx]]
                        .picture
                    }
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                  {/* Image Counter */}
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                    {currentImageIndexes[activityIdx] + 1} /{" "}
                    {activity.pictures.length}
                  </div>
                </div>
              </div>

              {/* Details Section */}
              <div className="lg:col-span-8 space-y-4">
                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {activity.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                  {activity.discription}
                </p>

                {/* Tech Stack */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Technologies Used:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activity.techStack.split(", ").map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/50 dark:to-cyan-900/50 text-blue-800 dark:text-blue-200 rounded-lg text-sm font-medium border border-blue-200 dark:border-blue-700 hover:scale-105 transition-transform duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <a
                  href={activity.url}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaExternalLinkAlt className="w-4 h-4" />
                  <span>View Project</span>
                </a>
              </div>
            </div>
          </div>
        ))}

        {/* Additional Projects Card */}
        <div className="w-full bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg overflow-hidden border-2 border-dashed border-blue-300 dark:border-blue-700 hover:border-solid transition-all duration-300 hover:shadow-xl">
          <div className="p-8 text-center space-y-4">
            <div className="inline-block p-4 bg-blue-600 rounded-full mb-4">
              <FaGithub className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              More Projects Available
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Including Battle King, Companion-AI, Marathi Matrimony, and many more
              exciting projects. Check out my complete portfolio on GitHub!
            </p>
            <a
              href="https://github.com/AjayBThorat-20?tab=repositories"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 mt-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="w-5 h-5" />
              <span>View All on GitHub</span>
              <FaExternalLinkAlt className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </WrapperLayout>
  );
}