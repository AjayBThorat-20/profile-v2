"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { closeMenu } from "@/store/slices/themeSlice";
import { siteSections, siteSectionIds } from "@/constants/sections";
import { useActiveSection } from "@/hooks/useActiveSection";
import { getAccent } from "@/Components/UI/accentColor";
import IconTile from "@/Components/UI/IconTile";

// Full-viewport menu, replacing the old width-capped sidebar drawer - the
// only interactive nav on the site now that the tab-style navbar is gone.
export default function MenuOverlay() {
  const dispatch = useAppDispatch();
  const isMenuOpen = useAppSelector((state) => state.theme.isMenuOpen);
  const { activeId } = useActiveSection(siteSectionIds);

  const handleClose = () => dispatch(closeMenu());

  // Body scroll lock while open.
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  // Escape closes the overlay.
  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMenuOpen]);

  const socialLinks = [
    { name: "LinkedIn", href: "https://www.linkedin.com/in/ajay-thorat-24b4b6215", icon: FaLinkedin },
    { name: "GitHub", href: "https://github.com/AjayBThorat-20", icon: FaGithub },
    { name: "Email", href: "mailto:ajaythorat988@gmail.com", icon: IoMdMail },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      className={`fixed inset-0 z-60 bg-background flex flex-col transition-all duration-300 ease-out ${
        isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Big stacked links. Top padding clears the navbar's logo/menu
          chips, which stay fixed above this overlay (z-70) instead of
          this overlay drawing its own close button - one control, one
          position, no jump when the menu opens. */}
      <nav className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 pt-24 md:pt-28">
        {siteSections.map((section, index) => {
          const isActive = isMenuOpen && activeId === section.id;
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={handleClose}
              className={`group flex items-baseline gap-4 md:gap-6 py-2 md:py-3 border-b border-border/60 last:border-b-0 transition-colors duration-200 ${
                isActive ? "text-primary" : "text-foreground hover:text-primary"
              }`}
              style={{
                transitionProperty: "opacity, transform, color",
                transitionDelay: isMenuOpen ? `${index * 50}ms` : "0ms",
                opacity: isMenuOpen ? 1 : 0,
                transform: isMenuOpen ? "translateY(0)" : "translateY(16px)",
              }}
            >
              <span className={`font-mono text-sm md:text-base transition-colors duration-200 ${
                isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"
              }`}>
                {section.index}
              </span>
              <span className="font-display text-4xl sm:text-5xl md:text-7xl font-black tracking-tight">
                {section.label}
              </span>
              {isActive && (
                <span className="hidden md:inline-block w-2 h-2 rounded-full bg-primary self-center ml-1" aria-hidden="true" />
              )}
            </a>
          );
        })}
      </nav>

      {/* Footer: socials + email + copyright */}
      <div className="border-t border-border px-8 md:px-16 lg:px-24 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          {socialLinks.map((social, index) => (
            <Link
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className="magnetic group"
              onClick={handleClose}
            >
              <IconTile icon={social.icon} accent={getAccent(index)} size="sm" />
            </Link>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Ajay Bhimrao Thorat
        </p>
      </div>
    </div>
  );
}
