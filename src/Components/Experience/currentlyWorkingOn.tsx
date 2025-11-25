"use client";
import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import WrapperLayout from "../Layout/wrapperLayout";
import CurrentlyWorkingOnSkeleton from "../Skeletons/Expeience/currentlyWorkingOnSkeleton";
import { currentlyWorkingOnData } from "@/constants/experience";

export default function CurrentlyWorkingOn() {
  const [clickedId, setClickedId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleItemClick = (id: number) => {
    setClickedId(clickedId === id ? null : id);
  };

  return (
    <WrapperLayout firstPosition="Currently" secondPosition="Working On">
      {isLoading ? (
        <CurrentlyWorkingOnSkeleton />
      ) : (
        <>
          <p className="text-lg text-gray-600 dark:text-gray-300 text-center max-w-3xl mx-auto mb-12">
            Ongoing projects and initiatives that I'm actively developing and
            learning from.
          </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl mx-auto">
          {currentlyWorkingOnData.map((item, index) => (
            <div
              key={item.id}
              className="group flex flex-col bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              {/* Main Card */}
              <div className="p-6 space-y-4">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 text-amber-700 dark:text-amber-300 rounded-full text-xs font-semibold">
                  <span className="w-2 h-2 bg-amber-600 dark:bg-amber-400 rounded-full animate-pulse"></span>
                  In Progress
                </div>

                {/* Description */}
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed min-h-[80px]">
                  {item.description}
                </p>

                {/* Toggle Button */}
                <button
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    clickedId === item.id
                      ? "bg-amber-600 hover:bg-amber-700 text-white"
                      : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  <span>
                    {clickedId === item.id ? "Hide Details" : "Show Details"}
                  </span>
                  {clickedId === item.id ? (
                    <FaChevronUp className="w-4 h-4" />
                  ) : (
                    <FaChevronDown className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Expandable Details */}
              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  clickedId === item.id
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-6">
                  <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl border-2 border-amber-200 dark:border-amber-800">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 w-1.5 h-full bg-amber-600 dark:bg-amber-400 rounded-full flex-shrink-0"></div>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                        {item.hiddenDisc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        </>
      )}
    </WrapperLayout>
  );
}