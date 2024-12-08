"use client";
import Image from "next/image";
import {  useEffect, useState } from "react";



const experienceData = [
  {
    id: 1,
    role: "Full Stack Developer Intern",
    duration: "18 March - 18 September 2024 (6 Months)",
    company: "ShypBUDDY PVT. LTD",
    companyUrl: "https://shypbuddy.net/",
    teckStack: "next.js, supabase, prisma, cleark, tailwind css, node.js",
    sideCardDescription: "Detailed side card description here.",
    description: [
      { id: 1, desc: "Data 1 description", picture: "/Images/Experience/ShypBUDDY/logo.jpeg" },
      { id: 2, desc: "buddyshield data", picture: "/Images/Experience/ShypBUDDY/buddyshield.png" },
      { id: 3, desc: "buddyshield data", picture: "/Images/Experience/ShypBUDDY/AjayShupBUDDY.jpeg" },
    ],
  },
] as const;

export default function Internship() {
  const [currentImageIndexes, setCurrentImageIndexes] = useState<number[]>(
    []
  );
  const [isExpanded, setIsExpanded] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showDetails, setShowDetails] = useState<number[]>([]);


  

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const intervalIds: NodeJS.Timeout[] = [];
    experienceData.forEach((_, idx) => {
      if (isHovered === idx || isExpanded === idx) {
        const interval = setInterval(() => {
          setCurrentImageIndexes((prevIndexes) => {
            const nextIndexes = [...prevIndexes];
            nextIndexes[idx] =
              (nextIndexes[idx] + 1) % experienceData[idx].description.length;
            return nextIndexes;
          });
        }, 2000);
        intervalIds.push(interval);
      }
    });

    return () => intervalIds.forEach((id) => clearInterval(id));
  }, [isHovered, isExpanded]);

  useEffect(() => {
    setCurrentImageIndexes(
      experienceData.map(() => 0)
    );
  }, []);

  const getContainerClasses = () => {
    const baseClasses = "relative mx-auto max-h-[400px] md:max-h-[400px] lg:max-h-[600px] xl:min-h-[400px] flex flex-col";

    if (experienceData.length < 2) {
      return `${baseClasses} w-[285px] md:w-[600px] lg:w-[700px] `; // Single item
    } else if (experienceData.length < 5) {
      return `${baseClasses} w-full  `;
    }
    return `${baseClasses} w-full`;
  };

  const getExpandedWidth = () => {
    if (experienceData.length < 2) {
      return "md:w-[600px] lg:w-[651px]"; // Smaller expanded width for single item
    } else if (experienceData.length < 5) {
      return "md:w-[600px] lg:w-[550px] "; // Medium expanded width for 2-4 items
    }
    return "md:w-[700px] lg:w-[600px] "; // Full expanded width for 5+ items
  };



  useEffect(() => {
    setShowDetails(new Array(experienceData.length).fill(false));
  }, []);


  const handleCardClick = (idx: number) => {
    if (isMobile) {
      setShowDetails(prev => {
        // Create a new array filled with false values
        const newState = new Array(experienceData.length).fill(false);
        // Only set the clicked index to true if it wasn't already true
        // If it was true, it will remain false (effectively closing it)
        if (!prev[idx]) {
          newState[idx] = true;
        }
        return newState;
      });
    } else {
      setIsExpanded(idx === isExpanded ? null : idx);
    }
  };

  const resetToFirstImage = (idx: number) => {
    setCurrentImageIndexes(prev => {
      const newIndexes = [...prev];
      newIndexes[idx] = 0; // Set to show first image (id: 1)
      return newIndexes;
    });
  };

  const handleMouseLeave = (idx: number) => {
    if (!isMobile) {
      setIsHovered(null);
      resetToFirstImage(idx);
    }
  };


  return (
    <div className=' h-full'>
      <div className='text-left'>
        <h1 className='text-[2.5rem] font-bold'>Internship</h1>
      </div>
      <div className="py-4 md:py-8 ">
          <div className={getContainerClasses()}>
            <div
              className={`
          flex flex-row gap-x-4 overflow-x-auto snap-none
          ${experienceData.length < 2 ? 'justify-center' : ''}
          ${experienceData.length < 3 ? 'md:justify-center' : ''}
          ${experienceData.length < 5 ? 'lg:justify-center' : ''}
        `}
              style={{
                WebkitOverflowScrolling: 'touch',
                scrollSnapType: 'x mandatory'
              }}
            >
              {experienceData.map((experience, idx) => (

                <div
                  key={experience.id}
                  className={`
            flex-shrink-0 scroll-snap-start 
            bg-gray-100  rounded-xl shadow-lg overflow-hidden 
            w-[285px] md:w-[300px] 
            transition-all duration-500 border-solid border-slate-200 border-2 
            ${isExpanded === idx ? getExpandedWidth() : ""}
          `}
                  onMouseEnter={() => !isMobile && setIsHovered(idx)}
                  onMouseLeave={() => handleMouseLeave(idx)}
                >
                  <div className="relative w-full flex gap-2 h-full">
                    {/* Image Container */}

                    <div className={`
                relative overflow-hidden 
                ${showDetails[idx] && isMobile ? 'h-[380px] md:h-[385px] hidden' : isExpanded === idx ? 'h-[450px] md:h-[385px] ' : 'h-[380px] md:h-[385px] '}
                ${isExpanded === idx && experienceData.length < 2 ? 'w-[285px]' : 'w-full'}
              `}>
                      {experience.description.map((item, index) => (
                          <Image
                          key={item.id}
                          src={item.picture} // Assuming images are in the public folder
                          alt={`Experience ${index + 1}`}
                          className={`p-2 absolute top-0 left-0 w-full h-full object-cover rounded-2xl transition-opacity duration-1000 ${currentImageIndexes[idx] === index ? "opacity-100" : "opacity-0"
                            }`}
                          width={500} // Provide width
                          height={500} // Provide height
                        />
                    
                      ))}
                    </div>

                    {/* Expanded Details */}
                    {isExpanded === idx && !isMobile && (
                      // <div className="flex-grow p-4 bg-black ">
                      <div className={`
                  flex-grow  p-2
                  ${experienceData.length < 2 ? 'w-[50%] ' : 'md:w-[900px] lg:w-[700px]  '}
                `}>

                        <div className="p-2 bg-white boredr-2 border-solid border border-slate-300 rounded-md h-full  text-left">
                          <p className="text-[1rem] font-bold text-gray-800">Work Details</p>
                          {/* <p >{experience.sideCardDescription}</p> */}
                          <div className="text-[1rem] flex flex-col">
                          <div className="flex flex-col py-1">
                              <p className="text-[1rem] text-gray-800 font-bold ">Organization Name :</p>
                              <p className="text-gray-600">{experience.company}</p>
                            </div>
                            <div className="flex flex-col py-1">                            
                              <p className="text-[1rem] text-gray-800 font-bold ">Role : </p>
                              <p className="text-gray-600">{experience.role}</p>
                            </div>

                            <div className="flex flex-col py-1">
                              <p className="text-[1rem] text-gray-800 font-bold ">Duration : </p>
                              <p className="text-gray-600">{experience.duration}</p>
                            </div>
                            <div className="flex flex-col py-1">
                              <p className="text-[1rem] text-gray-800 font-bold ">Tech Stack : </p>
                              <p className="text-gray-600">{experience.teckStack}</p>
                            </div >
                            
                            <div className="flex flex-col py-1">
                              <p className="text-[1rem] text-gray-800 font-bold ">Link : </p>
                              <a href={experience.companyUrl} target="_blank" className="text-blue-600">{experience.companyUrl}</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}






                    {/* Mobile Details */}
                    {isMobile && showDetails[idx] && (
                      <div className="p-4 bg-white text-left">
                        <div className="text-sm space-y-3">
                        <div>
                            <p className="font-bold text-gray-800">Organization Name : </p>
                            <p className="text-gray-600">{experience.company}</p>
                          </div>
                          <div>
                            <p className="font-bold text-gray-800">Role : </p>
                            <p className="text-gray-600">{experience.role}</p>
                          </div>
                          <div>
                            <p className="font-bold text-gray-800">Duration : </p>
                            <p className="text-gray-600">{experience.duration}</p>
                          </div>
                          <div>
                            <p className="font-bold text-gray-800">Tech Stack : </p>
                            <p className="text-gray-600">{experience.teckStack}</p>
                          </div>
                          <div>
                            <p className="font-bold text-gray-800">Link : </p>
                            <a href={experience.companyUrl} target="_blank" className="text-blue-600">{experience.companyUrl}</a>
                          </div>
                        </div>
                      </div>
                    )}




                   {/* Card Content */}
<div className="absolute bottom-4 right-4">
  <button
    onClick={() => handleCardClick(idx)}
    className={`text-[1rem] bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-600 transition-all duration-300`}
  >
    {(isMobile && showDetails[idx]) || (!isMobile && isExpanded === idx) ? "Close" : "Open"}
  </button>
</div>
                  </div>


                </div>
              ))}
            </div>
          </div>
        </div>
        </div>
    
  );
}
