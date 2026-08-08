"use client";

import React, { useEffect } from "react";
import Navbar from "../Header/navbar";
import { useAppSelector } from "@/store/hooks";
import Footer from "../Footer/footer";
import { usePathname } from "next/navigation";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  const theme = useAppSelector((state) => state.theme.mode);
  const pathname = usePathname();

  // Keep the document class in sync whenever the user toggles theme.
  // (Initial load is already handled by the blocking script in layout.tsx.)
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

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