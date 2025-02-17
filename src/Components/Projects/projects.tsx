"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import WrapperLayout from "../Layout/wrapperLayout";
import { projectsData } from "@/constants/project";

export default function Projects() {
  const [currentImageIndexes, setCurrentImageIndexes] = useState<number[]>(
    Array(projectsData.length).fill(0)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndexes((prevIndexes) =>
        prevIndexes.map((index, activityIdx) =>
          index === projectsData[activityIdx].pictures.length - 1 ? 0 : index + 1
        )
      );
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <WrapperLayout firstPosition="Personal" secondPosition="Projects">
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 text-center">
        Explore my academic projects that showcase my technical skills and creativity.
      </p>

      {/* Projects Grid */}
      <div className="space-y-8">
        {projectsData.map((activity, activityIdx) => (
          <div
            key={activity.id}
            className="w-full bg-gray-50 dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            <div className="flex flex-col md:grid md:grid-cols-10 gap-6 p-6">
              {/* Image Section */}
              <div className="flex justify-center md:col-span-3">
                <Image
                  alt={`Image from project ${activity.title}`}
                  className="rounded-lg object-cover border-2 border-gray-200 dark:border-gray-700 shadow-md w-full max-w-[300px] h-auto"
                  src={activity.pictures[currentImageIndexes[activityIdx]].picture}
                  width={300}
                  height={200}
                />
              </div>

              {/* Details Section */}
              <div className="md:col-span-7 space-y-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {activity.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-justify">
                  {activity.discription}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {activity.techStack.split(", ").map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={activity.url}
                  className="inline-flex items-center mt-4 text-blue-600 dark:text-blue-400 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>View Project</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        ))}

        {/* Additional Projects Card */}
        <div className="w-full bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
          <div className="p-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Battle King, Companion-Ai, Marathi Matrimony, and more...
            </h3>
            <a
              href="https://github.com/AjayBThorat-20?tab=repositories"
              className="inline-flex items-center mt-4 text-blue-600 dark:text-blue-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>View All Projects</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </WrapperLayout>
  );
}