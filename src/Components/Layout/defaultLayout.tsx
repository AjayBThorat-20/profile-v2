// // "use client";

// // import React, { useEffect, useState } from "react";
// // import Navbar from "../Header/navbar";
// // import { useAppDispatch, useAppSelector } from "@/store/hooks";
// // import { hydrateTheme } from "@/store/slices/themeSlice";
// // import Footer from "../Footer/footer";


// // export default function DefaultLayout({ children }: { children: React.ReactNode }) {
// //   const dispatch = useAppDispatch();
// //   const theme = useAppSelector((state) => state.theme.mode);
// //   const [isMounted, setIsMounted] = useState(false);

// //   useEffect(() => {
// //     setIsMounted(true); // Prevents hydration mismatch
// //     dispatch(hydrateTheme()); // Syncs theme with localStorage on mount
// //   }, [dispatch]);

// //   if (!isMounted) {
// //     return <div className="min-h-screen bg-white dark:bg-gray-900" />;
// //   }

// //   return (
// //     <div className={`min-h-screen overflow-x-hidden ${theme === "dark" ? "dark" : "light"}`}>
// //       <div className="fixed top-0 z-50 w-full bg-red-500">
// //         <Navbar />
// //       </div>
// //       <main>
// //         <div className={`text-center justify-center w-full min-h-full lg:px-32 px-4 mt-16 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
    
// //             <div className="w-full min-h-screen h text-center items-center justify-center space-y-6">
// //               {children}
// //             </div>
// //           </div>
// //       </main>
// //       <Footer />
// //     </div>
// //   );
// // }






// "use client";

// import React, { useEffect, useState } from "react";
// import Navbar from "../Header/navbar";
// import { useAppDispatch, useAppSelector } from "@/store/hooks";
// import { hydrateTheme } from "@/store/slices/themeSlice";
// import Footer from "../Footer/footer";
// import { usePathname } from "next/navigation"; // Import usePathname

// export default function DefaultLayout({ children }: { children: React.ReactNode }) {
//   const dispatch = useAppDispatch();
//   const theme = useAppSelector((state) => state.theme.mode);
//   const [isMounted, setIsMounted] = useState(false);
//   const [contentKey, setContentKey] = useState(Date.now()); // To force re-render children

//   const pathname = usePathname(); // Hook to get the current pathname

//   useEffect(() => {
//     setIsMounted(true); // Prevents hydration mismatch
//     dispatch(hydrateTheme()); // Syncs theme with localStorage on mount
//   }, [dispatch]);

//   useEffect(() => {
//     // Whenever pathname changes, reset the contentKey to trigger re-render of children
//     setContentKey(Date.now());
//   }, [pathname]);

//   if (!isMounted) {
//     return <div className="min-h-screen bg-white dark:bg-gray-900" />;
//   }

//   return (
//     <div className={`min-h-screen overflow-x-hidden ${theme === "dark" ? "dark" : "light"}`}>
//       <div className="fixed top-0 z-50 w-full bg-red-500">
//         <Navbar />
//       </div>
//       <main>
//         <div className={`text-center justify-center w-full min-h-full lg:px-32 px-4 overflow-hidden hide-scrollbar mt-16 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
//           <div className="w-full min-h-screen h text-center items-center justify-center space-y-6">
//             {/* Use the contentKey to force a re-render of the children */}
//             <div key={contentKey} id="content-wrapper">
//               {children}
//             </div>
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// }






// "use client";

// import React, { useEffect, useState } from "react";
// import Navbar from "../Header/navbar";
// import { useAppDispatch, useAppSelector } from "@/store/hooks";
// import { hydrateTheme } from "@/store/slices/themeSlice";
// import Footer from "../Footer/footer";
// import { usePathname } from "next/navigation";

// export default function DefaultLayout({ children }: { children: React.ReactNode }) {
//   const dispatch = useAppDispatch();
//   const theme = useAppSelector((state) => state.theme.mode);
//   const [isMounted, setIsMounted] = useState(false);
//   const pathname = usePathname(); // Get the current pathname

//   useEffect(() => {
//     setIsMounted(true); // Prevents hydration mismatch
//     dispatch(hydrateTheme()); // Syncs theme with localStorage on mount
//   }, [dispatch]);

//   if (!isMounted) {
//     return <div className="min-h-screen bg-white dark:bg-gray-900" />;
//   }

//   return (
//     <div className={`min-h-screen overflow-x-hidden ${theme === "dark" ? "dark" : "light"}`}>
//       {/* Navbar (fixed and not affected by re-renders) */}
//       <div className="fixed top-0 z-50 w-full bg-red-500">
//         <Navbar />
//       </div>

//       {/* Main Content */}
//       <main>
//         <div
//           className={`text-center justify-center w-full min-h-full lg:px-32 px-4 overflow-hidden hide-scrollbar mt-16 ${
//             theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
//           }`}
//         >
//           <div className="w-full min-h-screen h text-center items-center justify-center space-y-6">
//             {/* Children (re-renders only when pathname changes) */}
//             <React.Fragment key={pathname}>{children}</React.Fragment>
//           </div>
//         </div>
//       </main>

//       {/* Footer (fixed and not affected by re-renders) */}
//       <Footer />
//     </div>
//   );
// }






"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../Header/navbar";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { hydrateTheme } from "@/store/slices/themeSlice";
import Footer from "../Footer/footer";
import { usePathname } from "next/navigation";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.mode);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname(); // Get the current pathname

  useEffect(() => {
    setIsMounted(true); // Prevents hydration mismatch
    dispatch(hydrateTheme()); // Syncs theme with localStorage on mount
  }, [dispatch]);

  if (!isMounted) {
    return <div className="min-h-screen bg-white dark:bg-gray-900" />;
  }

  return (
    <div className={`min-h-screen overflow-x-hidden ${theme === "dark" ? "dark" : "light"}`}>
      {/* Navbar (memoized to prevent unnecessary re-renders) */}
      <div className="fixed top-0 z-50 w-full bg-red-500">
        <Navbar />
      </div>

      {/* Main Content */}
      <main>
        <div
          className={`text-center justify-center w-full min-h-full lg:px-32 px-4 overflow-hidden hide-scrollbar mt-16 ${
            theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
          }`}
        >
          <div className="w-full min-h-screen h text-center items-center justify-center space-y-6">
            {/* Children (re-renders only when pathname changes) */}
            <React.Fragment key={pathname}>{children}</React.Fragment>
          </div>
        </div>
      </main>

      {/* Footer (memoized to prevent unnecessary re-renders) */}
      <Footer />
    </div>
  );
}

export default DefaultLayout;
