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
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
    dispatch(hydrateTheme());
  }, [dispatch]);

  if (!isMounted) {
    return <div className="min-h-screen bg-white dark:bg-gray-900" />;
  }

  return (
    <div
      className={`min-h-screen overflow-x-hidden transition-colors duration-300 ${
        theme === "dark" ? "dark bg-gray-900" : "light bg-white"
      }`}
    >
      {/* Fixed Navbar */}
      <div className="fixed top-0 z-50 w-full">
        <Navbar />
        
      </div>

      {/* Main Content with proper spacing for fixed navbar */}
      <main className="pt-20">
        <div
          className={`w-full min-h-[calc(100vh-4rem)] transition-colors duration-300 ${
            theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
          }`}
        >
          <div className="w-full min-h-full">
            <React.Fragment key={pathname}>{children}</React.Fragment>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DefaultLayout;