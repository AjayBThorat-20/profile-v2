"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../Header/navbar";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { hydrateTheme } from "@/store/slices/themeSlice";
import Footer from "../Footer/footer";


export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.mode);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Prevents hydration mismatch
    dispatch(hydrateTheme()); // Syncs theme with localStorage on mount
  }, [dispatch]);

  if (!isMounted) {
    return <div className="min-h-screen bg-white dark:bg-gray-900" />;
  }

  return (
    <div className={`min-h-screen overflow-x-hidden ${theme === "dark" ? "dark" : "light"}`}>
      <div className="fixed top-0 z-50 w-full">
        {/* <Navbar /> */}
      </div>
      <main>
        <div className={`text-center justify-center w-full min-h-screen lg:px-32 px-4 overflow-hidden hide-scrollbar ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
          <div className="animate-slide-up">
            <div className="w-full h-full text-center items-center justify-center space-y-6 py-8 mt-10">
              {children}
            </div>
          </div>
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
}
