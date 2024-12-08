
"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

const ActivityData = [
  {
    id: 1,
    title: "Crime Predict",
    url: "https://github.com/AjayBThorat-20/Crime-Predict",
    techStack: "React.js, Python, Django, SQLite3, JWT, RESTful APIs",
    discription: "I developed a full-stack web application focused on crime data analysis and visualization for law enforcement agencies in India. The platform implements robust security measures through JWT authentication, enabling secure user registration, login functionality, and password recovery systems. I designed and built separate administrative and user interfaces that facilitate CRUD operations for managing crime data, team information, and content management. Leveraging web scraping techniques, I automated the collection and integration of Indian legal acts data, ensuring the platform maintains an up-to-date legal reference database. Additionally, I integrated real-time crime news aggregation, making it a comprehensive solution for law enforcement officials. This system streamlines crime data management while providing actionable insights through data visualization, ultimately supporting more effective law enforcement operations.",
    pictures: [
      { id: 1, picture: "/Images/Projects/Crime_Predict/home.jpeg" },
      { id: 2, picture: "/Images/Projects/Crime_Predict/crime_data.jpeg" },
      { id: 3, picture: "/Images/Projects/Crime_Predict/news.jpeg" },
      { id: 4, picture: "/Images/Projects/Crime_Predict/indian_acts.jpeg" },
    ],
  },
  {
    id: 2,
    title: "LinkedIn Clone",
    url: "https://github.com/AjayBThorat-20/linkedin-clone",
    techStack: "Next.js, Node.js, MongoDB, Tailwind CSS, NextAuth.js, RESTful APIs",
    discription: "I engineered a comprehensive LinkedIn Clone, a professional networking platform that mirrors core functionalities of the original platform. The application features secure and streamlined user authentication implemented through Google OAuth using NextAuth.js, enabling seamless user access. I developed a robust backend supporting CRUD operations for dynamic content management, allowing users to create, edit, and manage their posts and professional profiles. The platform's responsive user interface, built with Tailwind CSS, offers both dark and light themes for enhanced user experience across devices. Key features include a personalized home feed, professional networking capabilities, an extensive course listing section, and an events page for professional gatherings. This project demonstrates my ability to create complex, scalable social platforms while maintaining security and user experience standards.",
    pictures: [
      { id: 1, picture: "/Images/Projects/Linkedin_Clone/hero.jpeg" },
      { id: 2, picture: "/Images/Projects/Linkedin_Clone/home.jpeg" },
      { id: 3, picture: "/Images/Projects/Linkedin_Clone/course.jpeg" },
      { id: 4, picture: "/Images/Projects/Linkedin_Clone/users.jpeg" },
      { id: 5, picture: "/Images/Projects/Linkedin_Clone/news.jpeg" },
      // { id: 6, picture: "/Images/Projects/Linkedin_Clone/python.jpeg" },
    ],
  },
  {
    id: 3,
    title: "Study Partner",
    url: "https://github.com/AjayBThorat-20/study-partner",
    techStack: "Android SDK, Java, SQLite, RESTful APIs, XML",
    // discription: "I developed an Android application designed for interactive learning, featuring user authentication for secure access, course videos for comprehensive learning, and programming quizzes to test knowledge. Additionally, I implemented a scoring system for quizzes, enabling users to track their progress and performance effectively.",
    discription: "Study Partner is an innovative Android mobile learning application designed to democratize education for students in India, particularly those in tier-2 cities with limited access to quality educational resources. The app features secure user authentication, comprehensive course videos spanning beginner to advanced levels, and interactive programming quizzes. Users can access learning materials flexibly, track their progress through an integrated scoring system, and test their knowledge across various difficulty levels. By leveraging mobile technology, the application addresses the challenges of overcrowded coaching institutes and geographical limitations, enabling students to learn anytime and anywhere with a user-friendly interface.",
    pictures: [
        { id: 1, picture: "/Images/Projects/Study_Partner/welcome.jpeg" },
        { id: 2, picture: "/Images/Projects/Study_Partner/email_verification.jpeg" },
        { id: 3, picture: "/Images/Projects/Study_Partner/categories.jpeg" },
        { id: 4, picture: "/Images/Projects/Study_Partner/quizz.jpeg" },
        { id: 5, picture: "/Images/Projects/Study_Partner/course.jpeg" },
        { id: 6, picture: "/Images/Projects/Study_Partner/python.jpeg" },
      ],
  },
] as const;

const AcademicProjects: React.FC = () => {
  const [currentImageIndexes, setCurrentImageIndexes] = useState<number[]>(
    Array(ActivityData.length).fill(0)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndexes((prevIndexes) =>
        prevIndexes.map((index, activityIdx) =>
          index === ActivityData[activityIdx].pictures.length - 1 ? 0 : index + 1
        )
      );
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="py-5 h-full">
      <div className="text-left">
        <h1 className="text-[2.5rem] font-bold">Academic Projects</h1>
      </div>

      <div className="w-full h-full overflow-hidden pt-5 space-y-10">
  {ActivityData.map((activity, activityIdx) => (
    <div
      key={activity.id}
      className="w-full mx-auto bg-gray-100  rounded-xl shadow-lg overflow-hidden"
    >
      <div className="grid grid-cols-1 md:grid-cols-10 md:gap-4 space-y-4 p-6">
        {/* Album Cover */}
        <div className="relative col-span-4 md:col-span-2 my-auto mx-auto">
          <Image
            alt={`Image from project ${activity.title}`}
            className="rounded-lg object-cover  border-solid border-2 border-gary-400 shadow-md"
            src={activity.pictures[currentImageIndexes[activityIdx]].picture}
            width={200}
            height={300}
          />
        </div>

        {/* Card Details */}
        <div className="relative flex flex-col col-span-6 md:col-span-8 space-y-4">
          {/* Header Section */}
          <div className="space-y-5 mb-10">
            <h3 className="text-gray-900  font-semibold text-xl">
              {activity.title}
            </h3>

            <p className="mt-4 text-gray-500  text-justify">
              {activity.discription}
            </p>
          </div>

          {/* View Button */}
          <a
            href={activity.url}
            className="absolute bottom-0 right-0 m-4 flex items-center justify-center space-x-2  text-blue-800 dark:text-blue-400 hover:underline "
            target="_blank" 
            rel="noopener noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M12 0C5.372 0 0 5.372 0 12c0 5.304 3.438 9.8 8.207 11.387.6.11.793-.261.793-.582 0-.287-.01-1.045-.016-2.051-3.338.726-4.043-1.609-4.043-1.609-.546-1.386-1.332-1.755-1.332-1.755-1.088-.744.083-.729.083-.729 1.204.086 1.837 1.237 1.837 1.237 1.07 1.832 2.807 1.302 3.49.996.108-.775.419-1.302.762-1.601-2.665-.303-5.467-1.333-5.467-5.933 0-1.31.469-2.381 1.236-3.22-.124-.304-.536-1.527.116-3.181 0 0 1.008-.322 3.3 1.229a11.41 11.41 0 013.002-.403c1.02.004 2.047.137 3.003.402 2.29-1.55 3.298-1.229 3.298-1.229.653 1.654.241 2.877.118 3.181.768.84 1.235 1.91 1.235 3.22 0 4.61-2.806 5.625-5.475 5.921.431.372.816 1.104.816 2.223 0 1.604-.015 2.898-.015 3.292 0 .323.192.698.8.58C20.566 21.798 24 17.304 24 12c0-6.628-5.372-12-12-12z"
                clipRule="evenodd"
              />
            </svg>
            <span>View Project</span>
          </a>
        </div>
      </div>
    </div>
  ))}




<div className="w-full mx-auto  bg-gray-100  rounded-xl shadow-lg overflow-hidden">
  {/* Card Details */}
  <div className="flex flex-col col-span-6 md:col-span-8 py-5 px-6 relative">
    {/* Header Section */}
    <h3 className=" font-semibold text-xl mb-4 pb-5">
      Battle King, Companion-Ai, Marathi Matrimony, and more...
    </h3>

    {/* View Project Button */}
    <a
      href="https://github.com/AjayBThorat-20?tab=repositories"
      className="absolute bottom-5 right-5 flex items-center justify-center space-x-2 text-blue-800 dark:text-blue-400 hover:underline"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="View GitHub Repositories"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path
          fillRule="evenodd"
          d="M12 0C5.372 0 0 5.372 0 12c0 5.304 3.438 9.8 8.207 11.387.6.11.793-.261.793-.582 0-.287-.01-1.045-.016-2.051-3.338.726-4.043-1.609-4.043-1.609-.546-1.386-1.332-1.755-1.332-1.755-1.088-.744.083-.729.083-.729 1.204.086 1.837 1.237 1.837 1.237 1.07 1.832 2.807 1.302 3.49.996.108-.775.419-1.302.762-1.601-2.665-.303-5.467-1.333-5.467-5.933 0-1.31.469-2.381 1.236-3.22-.124-.304-.536-1.527.116-3.181 0 0 1.008-.322 3.3 1.229a11.41 11.41 0 013.002-.403c1.02.004 2.047.137 3.003.402 2.29-1.55 3.298-1.229 3.298-1.229.653 1.654.241 2.877.118 3.181.768.84 1.235 1.91 1.235 3.22 0 4.61-2.806 5.625-5.475 5.921.431.372.816 1.104.816 2.223 0 1.604-.015 2.898-.015 3.292 0 .323.192.698.8.58C20.566 21.798 24 17.304 24 12c0-6.628-5.372-12-12-12z"
          clipRule="evenodd"
        />
      </svg>
      <span>View Project</span>
    </a>
  </div>
</div>




      </div>
    </div>
  );
};

export default AcademicProjects;
