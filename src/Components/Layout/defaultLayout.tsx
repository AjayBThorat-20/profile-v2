"use client";

import React, { useEffect } from "react";
import Navbar from "../Header/navbar";
import { useAppSelector } from "@/store/hooks";
import Footer from "../Footer/footer";
import { usePathname } from "next/navigation";
import ScrollProgressBar from "../UI/ScrollProgressBar";
import SectionIndicator from "../UI/SectionIndicator";
import CustomCursor from "../UI/CustomCursor";
import { useMagnetic } from "@/hooks/useMagnetic";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  const theme = useAppSelector((state) => state.theme.mode);
  const pathname = usePathname();

  // Keep the document class in sync whenever the user toggles theme.
  // (Initial load is already handled by the blocking script in layout.tsx.)
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  // Site-wide pull-toward-cursor effect for every `.magnetic` element
  // (navbar logo, social icons, theme toggle) - see useMagnetic.ts.
  useMagnetic();

  return (
    // overflow-x-clip, not overflow-x-hidden: `hidden` still establishes a
    // scroll container per the CSS overflow spec (even though this div never
    // actually scrolls - the window does), which silently breaks
    // `position: sticky` for every descendant (e.g. SectionIndicator). `clip`
    // gets the same "no horizontal scrollbar" result without that side effect.
    <div className="min-h-screen overflow-x-clip bg-background text-foreground transition-colors duration-200">
      <CustomCursor />
      <ScrollProgressBar />
      <SectionIndicator />

      {/* Fixed Navbar */}
      <Navbar />

      {/* Main Content with proper spacing for fixed navbar */}
      <main className="w-full min-h-[calc(100vh-4rem)]">
        {/* .page-transition is a short opacity+scale settle (see globals.css)
            deliberately distinct from each page's own translateY-based
            content stagger, so the two don't visually compound - it softens
            the route-change snap without delaying each page's own reveal. */}
        <div key={pathname} className="w-full min-h-full page-transition">
          {children}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DefaultLayout;