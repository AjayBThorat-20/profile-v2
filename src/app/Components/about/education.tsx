"use client";
import React from "react";

const elements = [
  { 
    id: 1, 
    course: "MASTER OF COMPUTER APPLICATION (MCA)", 
    college: "Hiray College | University Of Mumbai | Mumbai, Maharashtra, India", 
    passingYear: "2024"
  },
  { 
    id: 2, 
    course: "BACHELORS OF COMPUTER SCIENCE (B.SC. CS.)", 
    college: "Patkar Varde College | University Of Mumbai | Mumbai, Maharashtra, India", 
    passingYear: "2022"
  },
  { 
    id: 3, 
    course: "HIGHER SECONDARY EDUCATION (H.S.C)", 
    college: "Patkar Varde College | State Board of Maharashtra | Mumbai, Maharashtra, India", 
    passingYear: "2018"
  },
  { 
    id: 4, 
    course: "SECONDARY SCHOOL EDUCATION (S.S.C)", 
    college: "Gurukul Vidyalaya | State Board of Maharashtra | Mumbai, Maharashtra, India", 
    passingYear: "2015"
  }
];

const Education: React.FC = () => {
  return (
    <div className="h-full px-4">
      <div className="text-left mb-8">
        <h1 className="text-[2rem] md:text-[2.5rem] font-bold">Education</h1>
      </div>
      
      <div className="relative flex ">
        {/* Vertical Progress Line */}
        <div className="absolute top-0 left-0 md:left-10 w-1 bg-gray-300 h-full z-0 mx-auto "></div>
        
        {/* Education Items with Circles */}
        <div className="w-full">
          {elements.map((item, index) => (
            <div 
              key={item.id} 
              className="relative flex items-center mb-8"
            >
              {/* Circle */}
              <div 
                className="absolute left-0 md:left-10 -translate-x-1/2 bg-blue-500 w-6 h-6 rounded-full z-10 flex items-center justify-center"
              >
                <span className="text-white text-xs font-bold">{index + 1}</span>
              </div>
              
              {/* Education Item Content */}
              <div 
                className="w-full pl-5 md:pl-16 text-left"
              >
                <div className="w-full p-4 bg-gray-100 rounded-lg shadow-md">
                  <h2 className="text-lg font-semibold">{item.course}</h2>
                  <p className="text-gray-600">{item.college}</p>
                  <span className="text-sm text-gray-500">{item.passingYear}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Education;