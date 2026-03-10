// navbar.tsx - Responsive navigation bar with scroll effects, theme toggle, and animated links
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
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
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const { mode: theme, isMenuOpen, scrolled } = useAppSelector((state) => state.theme);

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
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dispatch, lastScrollY]);

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
    { href: "/contact", label: "Contact" },
  ];

  const NavLink = ({ href, label }: { href: string; label: string }) => {
    const isActive = pathname === href;
    
    return (
      <Link
        href={href}
        className={`relative px-4 py-2 text-base font-medium rounded-lg transition-all duration-300 group ${
          isActive
            ? "text-primary"
            : "text-foreground/80 hover:text-primary"
        }`}
      >
        {label}
        <span 
          className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-300 ${
            isActive ? "w-1/2" : "w-0 group-hover:w-1/2"
          }`}
        />
      </Link>
    );
  };

  return (
    <>
      {/* Desktop & Tablet Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          scrolled
            ? "glass shadow-lg"
            : "bg-background shadow-md"
        }`}
      >
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-between px-8 lg:px-16 xl:px-24 py-4">
          {/* Logo/Brand with Flag */}
          <div className="flex items-center gap-3 magnetic">
            <Link
              href="/"
              className="text-3xl font-black tracking-tight gradient-text-animated hover:scale-105 transition-transform duration-300"
            >
              AT
            </Link>
            <img 
              src="/Flag/flag.gif" 
              alt="Flag" 
              className="w-7 h-7 object-contain"
            />
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-2">
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
              className="magnetic p-2 rounded-lg hover:bg-primary/10 transition-all duration-300 group"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" />
            </Link>
            <Link
              href="https://github.com/AjayBThorat-20"
              target="_blank"
              rel="noopener noreferrer"
              className="magnetic p-2 rounded-lg hover:bg-muted transition-all duration-300 group"
              aria-label="GitHub"
            >
              <FaGithub className="w-5 h-5 text-foreground group-hover:scale-110 transition-transform duration-300" />
            </Link>
            <Link
              href="mailto:ajaythorat988@gmail.com"
              className="magnetic p-2 rounded-lg hover:bg-destructive/10 transition-all duration-300 group"
              aria-label="Email"
            >
              <IoMdMail className="w-5 h-5 text-destructive group-hover:scale-110 transition-transform duration-300" />
            </Link>
            
            {/* Divider */}
            <div className="w-px h-6 bg-border mx-1"></div>
            
            {/* Theme Toggle */}
            <div className="magnetic">
              <ThemeToggleButton />
            </div>
          </div>
        </div>

        {/* Mobile Navigation Header */}
        <div className="md:hidden flex justify-between items-center px-6 py-4">
          {/* Logo with Flag */}
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="text-2xl font-black gradient-text-animated"
            >
              AT
            </Link>
            <img 
              src="/Flag/flag.gif" 
              alt="Flag" 
              className="w-6 h-6 object-contain"
            />
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
              className="p-2 ml-1 rounded-lg hover:bg-muted transition-colors duration-300"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span
                  className={`w-full h-0.5 bg-foreground rounded-full transition-all duration-300 ${
                    isMenuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                ></span>
                <span
                  className={`w-full h-0.5 bg-foreground rounded-full transition-all duration-300 ${
                    isMenuOpen ? "opacity-0" : ""
                  }`}
                ></span>
                <span
                  className={`w-full h-0.5 bg-foreground rounded-full transition-all duration-300 ${
                    isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-16 md:h-20"></div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden animate-fadeIn"
          onClick={handleToggleMenu}
        ></div>
      )}

      {/* Mobile Menu Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] glass shadow-2xl transform transition-transform duration-300 ease-out z-50 md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold gradient-text">
            Navigation
          </h2>
          <button
            onClick={handleToggleMenu}
            className="p-2 rounded-lg hover:bg-muted transition-colors duration-300"
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
                className={`text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-lg"
                    : "hover:bg-muted"
                }`}
                style={{
                  animation: `slideInRight 0.3s ease-out ${index * 0.05}s both`,
                }}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Mobile Menu Footer with Social Links */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-border">
          {/* Social Links */}
          <div className="flex items-center justify-center gap-3 p-4 bg-muted/50">
            <Link
              href="https://www.linkedin.com/in/ajay-thorat-24b4b6215"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-card hover:bg-primary/10 transition-all duration-300 group shadow-sm"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
            </Link>
            <Link
              href="https://github.com/AjayBThorat-20"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-card hover:bg-muted transition-all duration-300 group shadow-sm"
              aria-label="GitHub"
            >
              <FaGithub className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
            </Link>
            <Link
              href="mailto:ajaythorat988@gmail.com"
              className="p-3 rounded-lg bg-card hover:bg-destructive/10 transition-all duration-300 group shadow-sm"
              aria-label="Email"
            >
              <IoMdMail className="w-6 h-6 text-destructive group-hover:scale-110 transition-transform duration-300" />
            </Link>
          </div>
          
          {/* Copyright */}
          <div className="px-6 py-4 bg-card">
            <p className="text-sm text-muted-foreground text-center">
              © 2024 Ajay Thorat
            </p>
          </div>
        </div>
      </div>
    </>
  );
}