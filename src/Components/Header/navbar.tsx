// navbar.tsx - corner-only chrome (logo + menu trigger + theme toggle) plus
// the full-screen MenuOverlay, replacing the old tab-style navbar and mobile
// sidebar drawer.
"use client";

import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { toggleMenu, setScrolled } from "@/store/slices/themeSlice";
import ThemeToggleButton from "../Buttons/ThemeToggleButton";
import SectionLink from "@/Components/Links/SectionLink";
import MenuOverlay from "./MenuOverlay";

// Drawn inline as SVG, so it costs no request and no decode. The flag is the
// official 3:2 design: saffron, white and green bands with the 24-spoke navy
// Ashoka Chakra centred on the white band. The earlier version was three CSS
// bands forced into a square, which dropped the chakra and distorted the ratio.
//
// Declared at module scope, not inside Navbar: a component defined during
// render is a brand-new component *type* on every render, so React tears down
// the old subtree and mounts a fresh one each time instead of updating it.
function FlagIcon({ size = 24 }: { size?: number }) {
  const spokes = Array.from({ length: 24 }, (_, i) => i * 15);
  return (
    <svg
      role="img"
      aria-label="Flag of India"
      width={size * 1.5}
      height={size}
      viewBox="0 0 90 60"
      className="rounded-sm shrink-0 border border-border/40"
      style={{ display: "block" }}
    >
      <rect width="90" height="20" fill="#FF9933" />
      <rect y="20" width="90" height="20" fill="#FFFFFF" />
      <rect y="40" width="90" height="20" fill="#138808" />
      <g transform="translate(45 30)" fill="none" stroke="#000080">
        <circle r="7.5" strokeWidth="0.7" />
        <circle r="1.4" fill="#000080" stroke="none" />
        {spokes.map((deg) => (
          <line key={deg} x1="0" y1="0" x2="0" y2="-7.5" strokeWidth="0.5" transform={`rotate(${deg})`} />
        ))}
      </g>
    </svg>
  );
}

export default function Navbar() {
  const dispatch = useAppDispatch();
  const { isMenuOpen, scrolled } = useAppSelector((state) => state.theme);

  const handleToggleMenu = () => {
    dispatch(toggleMenu());
  };

  // Drives the `scrolled` flag the two corner chips style themselves from.
  // The old navbar's scroll listener set it and was deleted in the
  // single-page rebuild, which left the flag stuck at false: the chips never
  // picked up their opaque .glass fill, so page text slid visibly through
  // them on every scroll. Dispatches only when the boolean actually flips,
  // not on every scroll event.
  useEffect(() => {
    let last: boolean | null = null;
    const onScroll = () => {
      const next = window.scrollY > 20;
      if (next !== last) {
        last = next;
        dispatch(setScrolled(next));
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [dispatch]);

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
        {/* SectionLink: a bare next/link to /#home did nothing when the URL
            was already /#home. */}
        <SectionLink
          href="/#home"
          onClick={() => isMenuOpen && dispatch(toggleMenu())}
          className="inline-flex items-center min-h-11 font-mono text-lg md:text-xl font-bold tracking-tight border-2 border-primary/30 hover:border-primary rounded-md px-2 text-foreground transition-all duration-200 active:scale-95"
        >
          <span className="text-primary">&lt;</span>AT<span className="text-primary">/&gt;</span>
        </SectionLink>
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
