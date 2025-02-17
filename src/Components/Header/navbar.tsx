"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaGithub, FaLinkedin, FaBars, FaTimes } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import {  useAppSelector } from "@/store/hooks";
import { CustomLink, CustomLinkVertical} from "../Links/pages";
import ThemeToggleButton from "../Buttons/themeToggleButton";
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const theme = useAppSelector((state) => state.theme.mode);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLinkClick = (href: string) => {
    setIsMenuOpen(false);
    router.push(href);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) setIsMenuOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const SocialLinks = ({ className = "" }: { className?: string }) => (
    <div className={`flex items-center space-x-4 ${className}`}>
      <Link href="https://www.linkedin.com/in/ajay-thorat-24b4b6215" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-200">
        <FaLinkedin className="w-6 h-6 fill-current text-blue-600 hover:text-blue-700" />
      </Link>
      <Link href="https://github.com/AjayBThorat-20" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-200">
        <FaGithub className="w-6 h-6 fill-current text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300" />
      </Link>
      <Link href="mailto:ajaythorat988@gmail.com" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-200">
        <IoMdMail className="w-6 h-6 fill-current text-rose-600 hover:text-rose-700" />
      </Link>
    </div>
  );

  return (
    <header className={`relative shadow-md shadow-gray-500 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <div className="hidden md:flex w-full px-8 lg:px-32 py-4 font-medium items-center justify-between">
        <nav className="flex items-center space-x-8">
          <CustomLink href="/" title="Home" />
          <CustomLink href="/about" title="About" />
          <CustomLink href="/projects" title="Projects" />
          <CustomLink href="/experience" title="Experience" />
          <CustomLink href="/contact" title="Contact" />
        </nav>
        <div className="flex items-center space-x-6">
          <SocialLinks />
          <ThemeToggleButton />
        </div>
      </div>

      <div className="md:hidden flex justify-between items-center px-4 py-4 z-50 relative bg-white dark:bg-gray-900 shadow-md">
        <button onClick={toggleMenu} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
          {isMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
        </button>
        <div className="flex items-center space-x-4">
          <SocialLinks />
          <ThemeToggleButton />
        </div>
      </div>

      {isMenuOpen && <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-lg z-30 transition-opacity duration-300" onClick={toggleMenu}></div>}

      <div className={`fixed top-0 left-0 h-full w-48 bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out pt-24 z-40 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <nav className="flex flex-col space-y-4 p-4">
          <CustomLinkVertical href="/" title="Home" onClick={() => handleLinkClick("/")} />
          <CustomLinkVertical href="/about" title="About" onClick={() => handleLinkClick("/about")} />
          <CustomLinkVertical href="/projects" title="Projects" onClick={() => handleLinkClick("/projects")} />
          <CustomLinkVertical href="/experience" title="Experience" onClick={() => handleLinkClick("/experience")} />
          <CustomLinkVertical href="/contact" title="Contact"  onClick={() => handleLinkClick("/contact")} />
        </nav>
      </div>
    </header>
  );
}
