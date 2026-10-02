"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../Header/navbar";
import { useAppSelector } from "@/store/hooks";
import Footer from "../Footer/footer";
import { usePathname } from "next/navigation";
import ScrollProgressBar from "../UI/ScrollProgressBar";
import CustomCursor from "../UI/CustomCursor";
import FilmGrain from "../UI/FilmGrain";
import ChapterRail from "../UI/ChapterRail";
import RevealObserver from "../UI/RevealObserver";
import { useMagnetic } from "@/hooks/useMagnetic";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  const theme = useAppSelector((state) => state.theme.mode);
  const pathname = usePathname();

  // The route-change settle (.page-transition) should only play on an actual
  // client-side navigation, not on the first load. On the first load it
  // started the entire page at opacity 0, so nothing in <main> counted as
  // Largest Contentful Paint (Chrome skips content painted invisible).
  // Tracked by comparing against the previous pathname during render - the
  // React-recommended way to adjust state when a value changes - so the
  // server and the first client render agree (no class on either).
  const [prevPathname, setPrevPathname] = useState(pathname);
  const [hasNavigated, setHasNavigated] = useState(false);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setHasNavigated(true);
  }

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
    // `position: sticky` for every descendant. `clip` gets the same
    // "no horizontal scrollbar" result without that side effect.
    <div className="min-h-screen overflow-x-clip bg-background text-foreground transition-colors duration-200">
      <CustomCursor />
      <ScrollProgressBar />
      {/* Grain sits above the page chrome (z-100) on purpose - it's a layer
          over the whole frame, like emulsion, not a background behind the
          content. The custom cursor stays above it at z-200. */}
      <FilmGrain />
      {/* Home only: the rail tracks the homepage's five sections, and no
          other route has those ids, so elsewhere it sat stuck on "01 Home"
          with its label over the page content. */}
      {pathname === "/" && <ChapterRail />}
      {/* Drives every [data-reveal] element; renders nothing. */}
      <RevealObserver />

      {/* Fixed Navbar */}
      <Navbar />

      {/* Main Content with proper spacing for fixed navbar */}
      <main className="w-full min-h-[calc(100vh-4rem)]">
        {/* .page-transition is a short opacity+scale settle (see globals.css)
            deliberately distinct from each page's own translateY-based
            content stagger, so the two don't visually compound - it softens
            the route-change snap without delaying each page's own reveal. */}
        <div key={pathname} className={`w-full min-h-full ${hasNavigated ? "page-transition" : ""}`}>
          {children}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DefaultLayout;