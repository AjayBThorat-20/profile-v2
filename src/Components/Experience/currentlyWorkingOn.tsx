"use client";
import { useEffect, useState } from "react";
import { MdMore } from "react-icons/md";
import WrapperLayout from "../Layout/wrapperLayout";
import CurrentlyWorkingOnSkeleton from "../Skeletons/Expeience/currentlyWorkingOnSkeleton";
import { currentlyWorkingOnData } from "@/constants/experience";

export default function CurrentlyWorkingOn() {
  const [clickedId, setClickedId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);
  
    // Simulate loading delay
    useEffect(() => {
      const timer = setTimeout(() => setIsLoading(false), 1000); // Simulate 1 second loading
      return () => clearTimeout(timer);
    }, []);
 
  const handleItemClick = (id: number) => {
    setClickedId(clickedId === id ? null : id);
  };

  return (
    <WrapperLayout firstPosition="Currently" secondPosition="Working On">

      {isLoading ? <CurrentlyWorkingOnSkeleton/> : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
        {currentlyWorkingOnData.map((item) => (
          <div key={item.id} className="flex flex-col">
            <div
              className={`bg-white dark:bg-gray-800 w-full p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ${
                clickedId === item.id ? "rounded-b-none" : ""
              }`}
            >
              <div className="flex justify-between items-center">
                <p className="flex-grow pr-4 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  {item.description}
                </p>
                <button
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => handleItemClick(item.id)}
                >
                  <MdMore className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div
              className={`w-full overflow-hidden transition-all duration-300 ${
                clickedId === item.id
                  ? "max-h-96 py-4 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-gray-700 dark:text-gray-300 p-4 bg-amber-50 dark:bg-amber-900 rounded-lg text-sm leading-relaxed border border-amber-100 dark:border-amber-800">
                {item.hiddenDisc}
              </p>
            </div>
          </div>
        ))}
      </div>
      )}
    </WrapperLayout>
  );
}