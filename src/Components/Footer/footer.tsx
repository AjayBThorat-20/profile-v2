"use client";

import React from "react";
import Link from "next/link";
import { FaHeart, FaGithub, FaLinkedin, FaArrowUp } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/ajay-thorat-24b4b6215",
      icon: FaLinkedin,
      gradient: "from-blue-600 to-blue-500",
      hoverColor: "hover:text-blue-600 dark:hover:text-blue-400"
    },
    {
      name: "GitHub",
      href: "https://github.com/AjayBThorat-20",
      icon: FaGithub,
      gradient: "from-gray-800 to-gray-700 dark:from-white dark:to-gray-100",
      hoverColor: "hover:text-gray-900 dark:hover:text-white"
    },
    {
      name: "Email",
      href: "mailto:ajaythorat988@gmail.com",
      icon: IoMdMail,
      gradient: "from-red-600 to-red-500",
      hoverColor: "hover:text-red-600 dark:hover:text-red-400"
    }
  ];

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Experience", href: "/experience" },
    { name: "Contact", href: "/contact" }
  ];

  return (
    <footer className="relative w-full border-t border-border bg-card transition-colors duration-300">
      {/* Gradient decoration at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Left: Brand & Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-xl">AT</span>
              </div>
              <h3 className="text-xl font-black gradient-text-animated">
                Ajay Thorat
              </h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Full Stack Developer specializing in Next.js, React, Node.js & MongoDB. 
              Building scalable web applications that make a difference.
            </p>
          </div>

          {/* Center: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-foreground uppercase tracking-wider">
              Quick Links
            </h4>
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 w-fit"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right: Connect */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-foreground uppercase tracking-wider">
              Connect
            </h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-3 glass-card rounded-xl border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-110"
                    aria-label={social.name}
                  >
                    <Icon className={`w-5 h-5 text-muted-foreground ${social.hoverColor} transition-colors duration-300`} />
                  </Link>
                );
              })}
            </div>
            <div className="pt-4">
              <p className="text-xs text-muted-foreground mb-2">Get in touch</p>
              <a 
                href="mailto:ajaythorat988@gmail.com"
                className="text-sm font-semibold text-foreground hover:text-primary transition-colors"
              >
                ajaythorat988@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            &copy; {new Date().getFullYear()} Ajay Bhimrao Thorat. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              Made with{" "}
              <FaHeart className="w-4 h-4 text-red-500 animate-pulse" />{" "}
              using Next.js & TypeScript
            </p>
            
            {/* Scroll to top button */}
            <button
              onClick={scrollToTop}
              className="group p-2 glass-card rounded-lg border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-110"
              aria-label="Scroll to top"
            >
              <FaArrowUp className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}