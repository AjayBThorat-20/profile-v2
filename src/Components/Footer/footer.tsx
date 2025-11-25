"use client";

import React from "react";
import { useAppSelector } from "@/store/hooks";
import Link from "next/link";
import { FaHeart, FaGithub, FaLinkedin } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

export default function Footer() {
  const theme = useAppSelector((state) => state.theme.mode);

  return (
    <footer
      className={`w-full border-t transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gray-900 text-gray-300 border-gray-800"
          : "bg-white text-gray-700 border-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Main Content - Single Row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-6">
          {/* Left: Brand & Description */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              Ajay Thorat
            </h3>
            <p className="text-sm max-w-md">
              Full Stack Developer | Next.js & MERN Stack Specialist
            </p>
          </div>

          {/* Right: Social Links */}
          <div className="flex items-center space-x-4">
            <Link
              href="https://www.linkedin.com/in/ajay-thorat-24b4b6215"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-5 h-5 text-blue-600 dark:text-blue-500" />
            </Link>
            <Link
              href="https://github.com/AjayBThorat-20"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-200"
              aria-label="GitHub"
            >
              <FaGithub className="w-5 h-5 text-gray-800 dark:text-gray-200" />
            </Link>
            <Link
              href="mailto:ajaythorat988@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-200"
              aria-label="Email"
            >
              <IoMdMail className="w-5 h-5 text-rose-600 dark:text-rose-500" />
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div
          className={`border-t mb-6 ${
            theme === "dark" ? "border-gray-800" : "border-gray-200"
          }`}
        />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Ajay Bhimrao Thorat. All Rights Reserved.
          </p>
          <p className="text-sm flex items-center gap-1">
            Made with{" "}
            <FaHeart className="w-4 h-4 text-rose-500 animate-pulse" /> using
            Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}