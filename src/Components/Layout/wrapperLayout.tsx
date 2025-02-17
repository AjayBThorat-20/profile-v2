import React from "react";

interface WrapperLayoutProps {
  firstPosition: string;
  secondPosition: string;
  children: React.ReactNode;
}

export default function WrapperLayout({ firstPosition, secondPosition, children }: WrapperLayoutProps) {
  return (
    <div className="px-6 sm:px-10 lg:px-16">
      {/* Header */}
      <div className="py-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-center mb-8 sm:mb-12 text-gray-800 dark:text-gray-200">
          <span>{firstPosition}</span>{" "}
          <span className="text-blue-500 dark:text-blue-400">{secondPosition}</span>
        </h1>

        {/* Children */}
        {children}
      </div>
    </div>
  );
}