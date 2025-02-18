// import { Projects, WelcomeToProject } from "@/Components/Projects/page";
// export default function page() {
//   return (
// <>          <WelcomeToProject />
//           <Projects />    
//     </>
//   );
// }


"use client";
import { useState, useEffect } from "react";
import { Projects, WelcomeToProject } from "@/Components/Projects/page";

export default function Page() {
  const [visibleComponents, setVisibleComponents] = useState<number>(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setVisibleComponents(1), 500),  // Show WelcomeToProject after 500ms
      setTimeout(() => setVisibleComponents(2), 1000), // Show Projects after 1000ms
    ];

    return () => timers.forEach(clearTimeout); // Cleanup timeouts on unmount
  }, []);

  return (
    <>
      {visibleComponents >= 1 && <WelcomeToProject />}
      {visibleComponents >= 2 && <Projects />}
    </>
  );
}
