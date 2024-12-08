"use client";

import React from "react";

const ActivityData = [
  {
    id: 1,
    Name: "Ignite and Concat",
    description: "A program to foster collaboration and innovation.",
  },
  {
    id: 2,
    Name: "ISR and DLLE (Social Activity)",
    description: "Community engagement activities promoting social responsibility.",
  },
  {
    id: 3,
    Name: "SkillFull Netizen",
    description: "A workshop on becoming skilled and responsible digital citizens.",
  },
  {
    id: 4,
    Name: "Initiated and implemented 16-day sprints during the internship",
    description: "Streamlined project timelines through efficient sprint planning.",
  },
] as const;

const CoCurricularActivities: React.FC = () => {
  return (
    <div className="mt-10 h-full px-4 ">
      {/* Header */}
      <div className="text-left mb-8">
        <h1 className="text-[2rem] md:text-[2.5rem] font-bold">
          Co-Curricular Activities
        </h1>
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-4 ">
        {ActivityData.map((activity) => (
          <div
            key={activity.id}
            className=" bg-gray-100 rounded-xl shadow-lg overflow-hidden p-6 mx-auto w-full"
          >
            <h3 className="text-black font-semibold text-lg md:text-xl">
              {activity.Name}
            </h3>
            <p className="mt-2 text-sm md:text-base text-black">
              {activity.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoCurricularActivities;
