// import { About, Certifications, CoCurricularActivities, Education, Skills } from "@/Components/About/page";
// export default function page() {
//   return (
//     <>
     
//           <About />
//           <Skills />
//           <Certifications />
//           <CoCurricularActivities />
//           <Education />
//     </>
//   );
// }


"use client"
import { useState, useEffect } from "react";
import { About, Skills, Certifications, CoCurricularActivities, Education } from "@/Components/About/page";

export default function Page() {
  const [visibleComponents, setVisibleComponents] = useState<number>(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setVisibleComponents(1), 500), // About appears after 500ms
      setTimeout(() => setVisibleComponents(2), 1000), // Skills appears after 1000ms
      setTimeout(() => setVisibleComponents(3), 1500), // Certifications after 1500ms
      setTimeout(() => setVisibleComponents(4), 2000), // CoCurricularActivities after 2000ms
      setTimeout(() => setVisibleComponents(5), 2500), // Education after 2500ms
    ];

    return () => timers.forEach(clearTimeout); // Cleanup on unmount
  }, []);

  return (
    <>
      {visibleComponents >= 1 && <About />}
      {visibleComponents >= 2 && <Skills />}
      {visibleComponents >= 3 && <Certifications />}
      {visibleComponents >= 4 && <CoCurricularActivities />}
      {visibleComponents >= 5 && <Education />}
    </>
  );
}
