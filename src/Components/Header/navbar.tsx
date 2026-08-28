// navbar.tsx - Responsive navigation bar with scroll effects, theme toggle, and animated links
"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { toggleMenu, closeMenu, setScrolled } from "@/store/slices/themeSlice";
import ThemeToggleButton from "../Buttons/ThemeToggleButton";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const [flagError, setFlagError] = useState(false);
  
  const { isMenuOpen, scrolled } = useAppSelector((state) => state.theme);

  const handleToggleMenu = () => {
    dispatch(toggleMenu());
  };

  const handleLinkClick = (href: string) => {
    dispatch(closeMenu());
    router.push(href);
  };

  // Handle scroll effect with hide/show navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Update scrolled state
      dispatch(setScrolled(currentScrollY > 20));

      // Hide/show navbar based on scroll direction
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dispatch]);

  // Handle responsive resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        dispatch(closeMenu());
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  // Prevent body scroll when menu is open
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

  // Close menu on route change
  useEffect(() => {
    dispatch(closeMenu());
  }, [pathname, dispatch]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/experience", label: "Experience" },
  ];

  // Contact is rendered as a persistent filled CTA rather than a plain
  // link, so "get in touch" stays visible the way it does on the
  // nabilissa.com reference instead of blending in with the other tabs.
  const contactLink = { href: "/contact", label: "Contact" };

  // Segmented-control style: the active tab gets a solid filled pill
  // instead of an underline, so the nav reads as a single grouped
  // control rather than a row of independent links.
  const NavLink = ({ href, label }: { href: string; label: string }) => {
    const isActive = pathname === href;

    return (
      <Link
        href={href}
        className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
          isActive
            ? "bg-foreground text-background shadow-sm"
            : "text-foreground/70 hover:text-foreground"
        }`}
      >
        {label}
      </Link>
    );
  };

const FlagIcon = ({ size = 28 }: { size?: number }) => {
  if (flagError) {
    return (
      <div 
        className="rounded-2xl overflow-hidden flex-shrink-0"
        style={{ 
          width: `${size}px`, 
          height: `${size}px`,
          background: 'linear-gradient(to bottom, #FF9933 33.33%, #FFFFFF 33.33%, #FFFFFF 66.66%, #138808 66.66%)'
        }}
      />
    );
  }

  return (
    <div 
      className="relative flex-shrink-0" 
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <Image 
        src="/Flag/flag.gif" 
        alt="Indian Flag" 
        fill
        className="object-contain"
        onError={() => setFlagError(true)}
        priority
        unoptimized
      />
    </div>
  );
};

  return (
    <>
      {/* Desktop & Tablet Navbar — floating inset pill, not a full-bleed
          bar, with the nav links grouped into their own segmented-control
          sub-pill instead of a row of independent links. */}
      <header
        className={`fixed top-3 left-3 right-3 md:top-4 md:left-6 md:right-6 lg:left-10 lg:right-10 z-50 rounded-2xl border border-border transition-all ease-out ${
          isVisible ? "duration-150 translate-y-0" : "duration-300 -translate-y-[calc(100%+2rem)]"
        } ${
          scrolled
            ? "glass shadow-lg"
            : "bg-background shadow-sm"
        }`}
      >
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-between px-6 lg:px-8 py-3">
          {/* Logo/Brand with Flag */}
          <div className="flex items-center gap-3 magnetic">
            <Link
              href="/"
              className="font-mono text-xl font-bold tracking-tight border-2 border-primary/30 hover:border-primary rounded-md px-2.5 py-1 text-foreground transition-colors duration-200"
            >
              <span className="text-primary">&lt;</span>AT<span className="text-primary">/&gt;</span>
            </Link>
            <FlagIcon size={28} />
          </div>

          {/* Navigation Links — segmented control */}
          <nav className="flex items-center gap-1 bg-muted/60 rounded-full p-1">
            {navLinks.map((link, index) => (
              <div
                key={link.href}
                className="animate-fadeIn"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <NavLink href={link.href} label={link.label} />
              </div>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Social Links */}
            <Link
              href="https://www.linkedin.com/in/ajay-thorat-24b4b6215"
              target="_blank"
              rel="noopener noreferrer"
              className="magnetic p-2 rounded-2xl hover:bg-primary/10 transition-all duration-200 group"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-200" />
            </Link>
            <Link
              href="https://github.com/AjayBThorat-20"
              target="_blank"
              rel="noopener noreferrer"
              className="magnetic p-2 rounded-2xl hover:bg-muted transition-all duration-200 group"
              aria-label="GitHub"
            >
              <FaGithub className="w-5 h-5 text-foreground group-hover:scale-110 transition-transform duration-200" />
            </Link>
            <Link
              href="mailto:ajaythorat988@gmail.com"
              className="magnetic p-2 rounded-2xl hover:bg-destructive/10 transition-all duration-200 group"
              aria-label="Email"
            >
              <IoMdMail className="w-5 h-5 text-destructive group-hover:scale-110 transition-transform duration-200" />
            </Link>
            
            {/* Divider */}
            <div className="w-px h-6 bg-border mx-1"></div>

            {/* Theme Toggle */}
            <div className="magnetic">
              <ThemeToggleButton />
            </div>

            {/* Persistent Contact CTA */}
            <Link href={contactLink.href} className="btn-primary px-4 py-2 text-sm">
              {contactLink.label}
            </Link>
          </div>
        </div>

        {/* Mobile Navigation Header */}
        <div className="md:hidden flex justify-between items-center px-5 py-3">
          {/* Logo with Flag */}
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="font-mono text-lg font-bold border-2 border-primary/30 rounded-md px-2 py-0.5 text-foreground"
            >
              <span className="text-primary">&lt;</span>AT<span className="text-primary">/&gt;</span>
            </Link>
            <FlagIcon size={24} />
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <ThemeToggleButton />

            {/* Divider */}
            <div className="w-px h-6 bg-border mx-1"></div>

            {/* Hamburger Menu */}
            <button
              onClick={handleToggleMenu}
              className="p-2 ml-1 rounded-2xl hover:bg-muted transition-colors duration-200"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span
                  className={`w-full h-0.5 rounded-full bg-foreground transition-all duration-200 ${
                    isMenuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                ></span>
                <span
                  className={`w-full h-0.5 rounded-full bg-foreground transition-all duration-200 ${
                    isMenuOpen ? "opacity-0" : ""
                  }`}
                ></span>
                <span
                  className={`w-full h-0.5 rounded-full bg-foreground transition-all duration-200 ${
                    isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Spacer — matches the floating header's footprint (top offset +
          bar height) so page content clears it. */}
      <div className="h-17 md:h-21"></div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden animate-fadeIn"
          onClick={handleToggleMenu}
        ></div>
      )}

      {/* Mobile Menu Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] rounded-l-2xl glass shadow-2xl transform transition-transform duration-200 ease-out z-50 md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">
            Navigation
          </h2>
          <button
            onClick={handleToggleMenu}
            className="p-2 rounded-2xl hover:bg-muted transition-colors duration-200"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Links */}
        <nav className="flex flex-col p-6 space-y-2">
          {navLinks.map((link, index) => {
            const isActive = pathname === link.href;
            return (
              <button
                key={link.href}
                onClick={() => handleLinkClick(link.href)}
                className={`text-left px-4 py-3 rounded-2xl font-medium border transition-all duration-200 hover:translate-x-1 active:translate-x-0.5 ${
                  isActive
                    ? "bg-primary/10 border-primary/40 text-primary"
                    : "border-transparent hover:bg-muted"
                }`}
                style={{
                  animation: `slideInRight 0.3s ease-out ${index * 0.05}s both`,
                }}
              >
                {link.label}
              </button>
            );
          })}
          <button
            onClick={() => handleLinkClick(contactLink.href)}
            className="btn-primary w-full justify-start px-4 py-3 mt-2"
            style={{
              animation: `slideInRight 0.3s ease-out ${navLinks.length * 0.05}s both`,
            }}
          >
            {contactLink.label}
          </button>
        </nav>

        {/* Mobile Menu Footer with Social Links */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-border">
          {/* Social Links */}
          <div className="flex items-center justify-center gap-3 p-4 bg-muted/50">
            <Link
              href="https://www.linkedin.com/in/ajay-thorat-24b4b6215"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-2xl hover:bg-muted transition-all duration-200 group"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-200" />
            </Link>
            <Link
              href="https://github.com/AjayBThorat-20"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-2xl hover:bg-muted transition-all duration-200 group"
              aria-label="GitHub"
            >
              <FaGithub className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
            </Link>
            <Link
              href="mailto:ajaythorat988@gmail.com"
              className="p-3 rounded-2xl hover:bg-muted transition-all duration-200 group"
              aria-label="Email"
            >
              <IoMdMail className="w-6 h-6 text-destructive group-hover:scale-110 transition-transform duration-200" />
            </Link>
          </div>
          
          {/* Copyright */}
          <div className="px-6 py-4 bg-card">
            <p className="text-sm text-muted-foreground text-center">
              © {new Date().getFullYear()} Ajay Thorat
            </p>
          </div>
        </div>
      </div>
    </>
  );
}