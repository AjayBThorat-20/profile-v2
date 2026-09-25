// navbar.tsx - corner-only chrome (logo + menu trigger + theme toggle) plus
// the full-screen MenuOverlay, replacing the old tab-style navbar and mobile
// sidebar drawer.
"use client";

import React from "react";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { toggleMenu } from "@/store/slices/themeSlice";
import ThemeToggleButton from "../Buttons/ThemeToggleButton";
import MenuOverlay from "./MenuOverlay";

// Drawn in CSS rather than loaded from /Flag/flag.gif. That file is a 47.7 KB
// animated GIF being displayed at 22x22 and marked `priority`, so it competed
// for bandwidth with the LCP image while delivering roughly 2 KB of visible
// detail - Lighthouse flagged it as the page's worst image by far. At this size
// the waving animation is a couple of pixels nobody can resolve, so the three
// bands are all that ever read. This costs no request and no decode.
//
// Declared at module scope, not inside Navbar: a component defined during
// render is a brand-new component *type* on every render, so React tears down
// the old subtree and mounts a fresh one each time instead of updating it.
function FlagIcon({ size = 24 }: { size?: number }) {
  return (
    <div
      role="img"
      aria-label="Indian flag"
      className="rounded-sm overflow-hidden shrink-0 border border-border/40"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        // Hard stops (each colour ends exactly where the next begins) render
        // three flat bands rather than fading between them.
        background:
          "linear-gradient(to bottom, #FF9933 0 33.33%, #FFFFFF 33.33% 66.66%, #138808 66.66% 100%)",
      }}
    />
  );
}

export default function Navbar() {
  const dispatch = useAppDispatch();
  const { isMenuOpen, scrolled } = useAppSelector((state) => state.theme);

  const handleToggleMenu = () => {
    dispatch(toggleMenu());
  };



  return (
    <>
      {/* Top-left: logo, links back to the hero. Sits above the menu
          overlay (z-70 > overlay's z-60) so it stays put - and stays
          clickable as a "close and go home" shortcut - instead of being
          hidden behind the overlay's opaque backdrop while it's open. */}
      <div
        className={`fixed top-3 left-3 md:top-5 md:left-6 z-70 flex items-center gap-2.5 magnetic rounded-lg px-2.5 py-1.5 transition-all duration-200 ${
          scrolled || isMenuOpen ? "glass shadow-sm" : ""
        }`}
      >
        <Link
          href="/#home"
          onClick={() => isMenuOpen && dispatch(toggleMenu())}
          className="inline-flex items-center min-h-11 font-mono text-lg md:text-xl font-bold tracking-tight border-2 border-primary/30 hover:border-primary rounded-md px-2 text-foreground transition-all duration-200 active:scale-95"
        >
          <span className="text-primary">&lt;</span>AT<span className="text-primary">/&gt;</span>
        </Link>
        <FlagIcon size={22} />
      </div>

      {/* Top-right: theme toggle + single menu trigger. Same z-70 as the
          logo, and never covered by MenuOverlay, so the hamburger morphs
          into an X in place - the overlay has no close button of its own,
          which used to sit a few pixels off from this trigger and read as
          the close control "jumping" the moment the menu opened. */}
      <div
        className={`fixed top-3 right-3 md:top-5 md:right-6 z-70 flex items-center gap-2 rounded-lg px-2 py-2 transition-all duration-200 ${
          scrolled || isMenuOpen ? "glass shadow-sm" : ""
        }`}
      >
        <div className="magnetic">
          <ThemeToggleButton />
        </div>
        <button
          onClick={handleToggleMenu}
          className="magnetic flex items-center justify-center gap-2 min-h-11 px-3.5 rounded-lg border border-border hover:border-primary/50 hover:bg-muted transition-all duration-200 active:scale-95"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          <span className="hidden sm:inline text-sm font-semibold">
            {isMenuOpen ? "Close" : "Menu"}
          </span>
          <div className="w-4 h-3.5 flex flex-col justify-between">
            <span
              className={`w-full h-0.5 rounded-full bg-foreground transition-all duration-200 ${
                isMenuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            ></span>
            <span
              className={`w-full h-0.5 rounded-full bg-foreground transition-all duration-200 ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`w-full h-0.5 rounded-full bg-foreground transition-all duration-200 ${
                isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            ></span>
          </div>
        </button>
      </div>

      <MenuOverlay />
    </>
  );
}
