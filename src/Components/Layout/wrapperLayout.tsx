// import React from "react";

// interface WrapperLayoutProps {
//   firstPosition: string;
//   secondPosition: string;
//   children: React.ReactNode;
// }

// export default function WrapperLayout({ firstPosition, secondPosition, children }: WrapperLayoutProps) {
//   return (
//     <div className="px-6 sm:px-10 lg:px-16  ">
//       {/* Header */}
//       <div className="animate-slide-up" >
//       <div className="py-8">

// {firstPosition || secondPosition ? (
//   <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-center mb-8 sm:mb-12 text-gray-800 dark:text-gray-200">
//     <span>{firstPosition}</span>{" "}
//     <span className="text-blue-500 dark:text-blue-400">{secondPosition}</span>
//   </h1>
// ) : null}

// {/* Children */}
// {children}
// </div>
//       </div>
     
//     </div>
//   );
// }








"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

interface WrapperLayoutProps {
  firstPosition: string;
  secondPosition: string;
  children: React.ReactNode;
}

export default function WrapperLayout({ firstPosition, secondPosition, children }: WrapperLayoutProps) {
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname(); // Get the current pathname

  useEffect(() => {
    // Set the component to be mounted after the initial render to avoid SSR issues
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      window.scrollTo(0, 0); // Scroll to the top whenever the pathname changes
    }
  }, [pathname, isClient]); // This hook runs when the pathname changes

  if (!isClient) {
    return null; // Prevent rendering on the server side
  }

  return (
    <div className="px-6 sm:px-10 lg:px-16">
      {/* Header */}
      <div className="animate-slide-up">
        <div className="py-8">
          {firstPosition || secondPosition ? (
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-center mb-8 sm:mb-12 text-gray-800 dark:text-gray-200">
              <span>{firstPosition}</span> <span className="text-blue-500 dark:text-blue-400">{secondPosition}</span>
            </h1>
          ) : null}

          {/* Children */}
          {children}
        </div>
      </div>
    </div>
  );
}
