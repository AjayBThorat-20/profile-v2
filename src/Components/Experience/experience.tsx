"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { experienceData } from "@/Constants/experience";
import WrapperLayout from "../Layout/wrapperLayout";
import ExperienceSkeleton from "../Skeletons/Expeience/experienceSkeleton";

export default function Experience() {
  const [currentImageIndexes, setCurrentImageIndexes] = useState<number[]>(experienceData.map(() => 0));
  const [isHovered, setIsHovered] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
  
    // Simulate loading delay
    useEffect(() => {
      const timer = setTimeout(() => setIsLoading(false), 1000); // Simulate 1 second loading
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
          newIndexes[isHovered] = (newIndexes[isHovered] + 1) % experienceData[isHovered].description.length;
          return newIndexes;
        });
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isHovered]);

  const handleViewDetails = (experience: (typeof experienceData)[number]) => {
    localStorage.setItem("selectedExperience", JSON.stringify(experience));
    router.push(`/experience/details?id=${experience.id}&company=${encodeURIComponent(experience.company)}`);
  };

  return (
    <WrapperLayout firstPosition="Work" secondPosition="Experience">
     {isLoading ? <ExperienceSkeleton/> : (
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
       {experienceData.map((experience, idx) => (
         <div
           key={experience.id}
           className={`relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 border-2 border-gray-200 dark:border-gray-700 ${
             idx === 0 ? "md:col-start-1 md:row-start-1" : 
             idx === 1 ? "md:col-start-2 md:row-start-1" : 
             idx === 2 ? "md:col-start-1 md:row-start-2 lg:col-start-3 lg:row-start-1" : ""
           }`}
           onMouseEnter={() => !isMobile && setIsHovered(idx)}
           onMouseLeave={() => !isMobile && setIsHovered(null)}
         >
           <div className="relative h-64 w-full overflow-hidden">
             {experience.description.map((item, index) => (
               <Image
                 key={item.id}
                 src={item.picture}
                 alt={`Experience ${index + 1}`}
                 className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
                   currentImageIndexes[idx] === index ? "opacity-100" : "opacity-0"
                 }`}
                 width={500}
                 height={500}
               />
             ))}
           </div>

           <div className="p-6">
             <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">{experience.role}</h2>
             <p className="text-gray-600 dark:text-gray-400 mt-2">{experience.company}</p>
             <p className="text-gray-600 dark:text-gray-400 mt-2">{experience.duration}</p>

             <button
               onClick={() => handleViewDetails(experience)}
               className="mt-4 text-sm bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300"
             >
               View Details
             </button>
           </div>
         </div>
       ))}
     </div>
     )}
    </WrapperLayout>
  );
}