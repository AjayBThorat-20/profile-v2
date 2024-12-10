"use client"

import React, { useEffect, useState } from 'react';

const Skills: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set isClient to true once the component is mounted on the client side
    setIsClient(true);
  }, []);

  // Function to calculate orbit positions
  const calculateOrbit = (index: number, total: number, radius: number) => {
    const angle = (index / total) * 6 * Math.PI; // Distribute elements evenly in the orbit
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    return { x, y };
  };

  // Array of orbit radii (distances from the center)
  const orbitRadii = [55, 85, 115, 145, 175, 205];

  // List of skill elements to be displayed in orbit
  const elements = [
    { id: 1, text: 'Python' },
    { id: 2, text: 'Node.js' },
    { id: 3, text: 'Next.js' },
    { id: 4, text: 'React.js' },
    { id: 5, text: 'Tailwind CSS' },
    { id: 6, text: 'JavaScript' },
    { id: 7, text: 'Bootstrap' },
    { id: 8, text: 'MySQL' },
    { id: 9, text: 'MongoDB' },
    { id: 10, text: 'Prisma ORM' },
    { id: 11, text: 'Clerk Authentication' },
    { id: 12, text: 'GitHub' },
    { id: 13, text: 'Docker' },
    { id: 14, text: 'SQL Server' },
    { id: 15, text: 'Postman' },
    { id: 16, text: 'Pentaho' },
    { id: 17, text: 'Supabase' }
  ];

  // Render loading state until the component is mounted on the client
  if (!isClient) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" mb-10 h-full pb-18">
      <div className="text-left md:mb-8">
        <h1 className="md:text-3xl text-2xl font-bold">Skills</h1>
      </div>

      <div className="md:relative w-auto h-[300px] md:h-[450px] lg:h-[450px] flex items-center justify-center md:overflow-hidden md:scale-100 lg:scale-125 scale-75  ">
        {/* Central Sun */}
        <div className="absolute z-10 bg-yellow-500 rounded-full w-12 h-12 flex items-center justify-center text-black font-bold text-xs hover:scale-150 hover:z-50">
          Tech Stack
        </div>

        {/* Orbits */}
        {orbitRadii.map((radius, orbitIndex) => (
          <div
            key={orbitIndex}
            className="absolute border-2 border-slate-800 rounded-full opacity-50"
            style={{
              width: `${radius * 2}px`,
              height: `${radius * 2}px`,
              transform: 'translate(0%)',
            }}
          />
        ))}

        {/* Skills Planets */}
        {elements.map((skill, index) => {
          const orbitIndex = Math.floor(index / 3); // Determine which orbit the element belongs to
          const radius = orbitRadii[orbitIndex];
          const { x, y } = calculateOrbit(index, elements.length, radius);

          return (
            <div
              key={skill.id}
              className="absolute group"
              style={{
                transform: `translate(${x}px, ${y}px)`,
              }}
            >
              <div className="rounded-full flex shadow-lg hover:bg-slate-600 bg-white hover:p-2 cursor-pointer group-hover:scale-125 transition-all duration-300">
                <span className="hover:text-white text-xs font-bold text-center">{skill.text}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Skills;
