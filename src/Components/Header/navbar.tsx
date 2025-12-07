// src/Components/Header/navbar.tsx
"use client";

import React, { useEffect } from "react";
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
  
  const { mode: theme, isMenuOpen, scrolled } = useAppSelector((state) => state.theme);

  const handleToggleMenu = () => {
    dispatch(toggleMenu());
  };

  const handleLinkClick = (href: string) => {
    dispatch(closeMenu());
    router.push(href);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      dispatch(setScrolled(window.scrollY > 20));
    };

    window.addEventListener("scroll", handleScroll);
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
    { href: "/contact", label: "Contact" },
  ];

  const NavLink = ({ href, label }: { href: string; label: string }) => {
    const isActive = pathname === href;
    
    return (
      <Link
        href={href}
        className={`relative px-4 py-2 text-base font-medium rounded-lg transition-all duration-300 ${
          isActive
            ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
            : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800"
        }`}
      >
        {label}
        {isActive && (
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full"></span>
        )}
      </Link>
    );
  };

  return (
    <>
      {/* Desktop & Tablet Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg"
            : "bg-white dark:bg-gray-900 shadow-md"
        }`}
      >
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-between px-8 lg:px-16 xl:px-24 py-4">
          {/* Logo/Brand with Flag */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-3xl font-black tracking-tight bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 dark:from-blue-400 dark:via-blue-500 dark:to-cyan-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300"
              style={{ 
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
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
            {navLinks.map((link) => (
              <NavLink key={link.href} href={link.href} label={link.label} />
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Social Links */}
            <Link
              href="https://www.linkedin.com/in/ajay-thorat-24b4b6215"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 group"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300" />
            </Link>
            <Link
              href="https://github.com/AjayBThorat-20"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 group"
              aria-label="GitHub"
            >
              <FaGithub className="w-5 h-5 text-gray-800 dark:text-gray-200 group-hover:scale-110 transition-transform duration-300" />
            </Link>
            <Link
              href="mailto:ajaythorat988@gmail.com"
              className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 group"
              aria-label="Email"
            >
              <IoMdMail className="w-5 h-5 text-red-600 dark:text-red-400 group-hover:scale-110 transition-transform duration-300" />
            </Link>
            
            {/* Divider */}
            <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"></div>
            
            {/* Theme Toggle */}
            <ThemeToggleButton />
          </div>
        </div>

        {/* Mobile Navigation Header */}
        <div className="md:hidden flex justify-between items-center px-6 py-4">
          {/* Logo with Flag */}
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="text-2xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent"
              style={{ 
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
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
            <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"></div>

            {/* Hamburger Menu */}
            <button
              onClick={handleToggleMenu}
              className="p-2 ml-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span
                  className={`w-full h-0.5 bg-gray-800 dark:bg-gray-200 rounded-full transition-all duration-300 ${
                    isMenuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                ></span>
                <span
                  className={`w-full h-0.5 bg-gray-800 dark:bg-gray-200 rounded-full transition-all duration-300 ${
                    isMenuOpen ? "opacity-0" : ""
                  }`}
                ></span>
                <span
                  className={`w-full h-0.5 bg-gray-800 dark:bg-gray-200 rounded-full transition-all duration-300 ${
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
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={handleToggleMenu}
        ></div>
      )}

      {/* Mobile Menu Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white dark:bg-gray-900 shadow-2xl transform transition-transform duration-300 ease-out z-50 md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Navigation
          </h2>
          <button
            onClick={handleToggleMenu}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6 text-gray-800 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
                style={{
                  animation: `fadeIn 0.3s ease-out ${index * 0.05}s both`,
                }}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Mobile Menu Footer with Social Links */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 dark:border-gray-700">
          {/* Social Links */}
          <div className="flex items-center justify-center gap-3 p-4 bg-gray-50 dark:bg-gray-800">
            <Link
              href="https://www.linkedin.com/in/ajay-thorat-24b4b6215"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-white dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 group shadow-sm"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300" />
            </Link>
            <Link
              href="https://github.com/AjayBThorat-20"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 group shadow-sm"
              aria-label="GitHub"
            >
              <FaGithub className="w-6 h-6 text-gray-800 dark:text-gray-200 group-hover:scale-110 transition-transform duration-300" />
            </Link>
            <Link
              href="mailto:ajaythorat988@gmail.com"
              className="p-3 rounded-lg bg-white dark:bg-gray-700 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 group shadow-sm"
              aria-label="Email"
            >
              <IoMdMail className="w-6 h-6 text-red-600 dark:text-red-400 group-hover:scale-110 transition-transform duration-300" />
            </Link>
          </div>
          
          {/* Copyright */}
          <div className="px-6 py-4 bg-white dark:bg-gray-900">
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              © 2024 Ajay Thorat
            </p>
          </div>
        </div>
      </div>
    </>
  );
}