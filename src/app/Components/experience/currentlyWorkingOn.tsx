"use client";
import { useState } from "react";
import { MdMore } from "react-icons/md";

interface ActivityItem {
  id: number;
  description: string;
  hiddenDisc: string;
}

export default function CurrentlyWorkingOn() {
  const [clickedId, setClickedId] = useState<number | null>(null);

  const ActivityData: ActivityItem[] = [
    {
      id: 1,
      description: "Analyzed and documented data behavior patterns in Instagram's user recommendation system, reporting findings to Meta's security team (Case #122106229448589400)",
      hiddenDisc: "I submitted a report to Meta, highlighting an anonymous behavior pattern I discovered in Instagram's system. Additionally, I recommended leveraging this behavior as a potential feature to enhance user engagement on the platform.",
    },
    {
      id: 2,
      description: "Working on personal web application",
      hiddenDisc: "Working on theme, Description page of work history",
    },
    {
      id: 3,
      description: "MongoDB database connector map Int to long for Prisma",
      hiddenDisc: "This is a mapping issue in Prisma's object-relational model. The developer passes age and specifies its data type as int in the Prisma schema, but it is stored as BigInt (long) in MongoDB.",
    },
  ];

  const handleItemClick = (id: number) => {
    setClickedId(clickedId === id ? null : id);
  };

  return (
    <div className='h-full'>
      <h1 className='text-[2.5rem] font-bold text-left'>Currently Working On</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-4 md:px-4">
        {ActivityData.map((item) => (
          <div key={item.id} className="flex flex-col">
            <div
              className={`bg-gray-100 w-full p-4 rounded-lg transition-all duration-300 relative ${
                clickedId === item.id ? "rounded-b-none" : ""
              }`}
            >
              <div className="flex justify-between items-center">
                <p className="flex-grow pr-2">{item.description}</p>
                <span 
                  className="text-white bg-blue-600 rounded-lg py-1 px-2"
                  onClick={() => handleItemClick(item.id)}
                >
                  <MdMore />
                </span>
              </div>
            </div>
            <div
              className={`w-full overflow-hidden transition-all duration-300 rounded-b-lg ${
                clickedId === item.id
                  ? "max-h-full py-4 opacity-100"
                  : "max-h-0 p-0 opacity-0"
              }`}
            >
              <p className="text-black p-2 px-4 bg-amber-200 rounded-lg">
                {item.hiddenDisc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}