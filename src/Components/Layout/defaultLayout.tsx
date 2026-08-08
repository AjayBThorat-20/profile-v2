"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../Header/navbar";
import { useAppSelector } from "@/store/hooks";
import Footer from "../Footer/footer";
import { usePathname } from "next/navigation";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  const theme = useAppSelector((state) => state.theme.mode);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Keep the document class in sync whenever the user toggles theme.
  // (Initial load is already handled by the blocking script in layout.tsx.)
  useEffect(() => {
    if (isMounted) {
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  }, [theme, isMounted]);

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-background">
        <div className="animate-pulse">
          <div className="h-20 bg-muted"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground transition-colors duration-300">
      {/* Fixed Navbar */}
      <Navbar />

      {/* Main Content with proper spacing for fixed navbar */}
      <main className="w-full min-h-[calc(100vh-4rem)]">
        <div className="w-full min-h-full">
          <React.Fragment key={pathname}>{children}</React.Fragment>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DefaultLayout;