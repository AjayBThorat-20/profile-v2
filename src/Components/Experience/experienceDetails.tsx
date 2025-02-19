"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
    data: string | { [key: string]: string[] }; // `data` can be a string or a nested object
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

  // Scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBack = () => {
    localStorage.removeItem("selectedExperience"); // Clear stored experience
    router.back(); // Go back to the previous page
  };

  if (!experience)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold text-gray-500">Loading...</p>
      </div>
    );

  return (
    <>
      <div className="p-6 max-w-3xl mx-auto relative">
        {/* Experience Details */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">{experience.title}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
            <a
              href={experience.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {experience.name}
            </a>{" "}
            - {experience.duration}
          </p>
          <p className="mt-2 text-gray-600 dark:text-gray-400 font-medium">{experience.techStack}</p>
        </div>

        {/* Details Section */}
        <div className="mt-8 space-y-8">
          {experience.details.map((detail) => (
            <div
              key={detail.id}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
            >
              <div className="flex flex-col items-center text-center">
                <Image
                  src={detail.picture}
                  alt={detail.title}
                  className="w-64 h-64 rounded-xl shadow-md object-cover"
                  width={256}
                  height={256}
                />
                <h2 className="mt-4 text-xl font-bold text-gray-800 dark:text-gray-200">{detail.title}</h2>
                {typeof detail.data === "string" ? (
                  <p className="mt-2 text-gray-700 dark:text-gray-300 text-justify indent-6  text-lg">{detail.data}</p>
                ) : (
                  <div className="mt-4 text-left w-full">
                    {Object.entries(detail.data).map(([key, value]) => (
                      <div key={key} className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
  {key.replace(/([A-Z])/g, " $1").trim().replace(/^./, str => str.toUpperCase())}
</h3>
                        {/* <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{key}</h3> */}
                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                          {value.map((item, index) => (
                            <li key={index}>{item}</li>
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

      {/* Back Button */}
      <div>
        <button
          onClick={handleBack}
          className="fixed bottom-4 right-4 md:bottom-10 md:right-10 flex items-center gap-2 px-5 py-3 text-sm font-medium 
                     bg-blue-500 text-white rounded-full shadow-lg transition-all duration-300 
                     hover:bg-blue-600 hover:scale-105 active:scale-95 focus:outline-none z-50"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"></path>
          </svg>
          <p className="hidden sm:block">Back</p>
        </button>
      </div>
    </>
  );
}