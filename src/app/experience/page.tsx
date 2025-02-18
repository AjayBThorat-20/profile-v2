// import React from 'react'
// import { CurrentlyWorkingOn, Experience, WelcomeToExperience } from "@/Components/Experience/page";
// export default function page() {
//   return (
//     <>



// <WelcomeToExperience/>
// <Experience/>
// <CurrentlyWorkingOn/>

      
// </>


//   )
// }



"use client";
import React, { useState, useEffect } from "react";
import { WelcomeToExperience, Experience, CurrentlyWorkingOn } from "@/Components/Experience/page";

export default function Page() {
  const [visibleComponents, setVisibleComponents] = useState<number>(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setVisibleComponents(1), 500),  // Show WelcomeToExperience after 500ms
      setTimeout(() => setVisibleComponents(2), 1000), // Show Experience after 1000ms
      setTimeout(() => setVisibleComponents(3), 1500), // Show CurrentlyWorkingOn after 1500ms
    ];

    return () => timers.forEach(clearTimeout); // Cleanup timeouts on unmount
  }, []);

  return (
    <>
      {visibleComponents >= 1 && <WelcomeToExperience />}
      {visibleComponents >= 2 && <Experience />}
      {visibleComponents >= 3 && <CurrentlyWorkingOn />}
    </>
  );
}
