"use client";

import React from "react";
import Link from "next/link";
import { FaHeart, FaGithub, FaLinkedin, FaArrowUp } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { getAccent } from "@/Components/UI/accentColor";
import IconTile from "@/Components/UI/IconTile";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/ajay-thorat-24b4b6215",
      icon: FaLinkedin,
    },
    {
      name: "GitHub",
      href: "https://github.com/AjayBThorat-20",
      icon: FaGithub,
    },
    {
      name: "Email",
      href: "mailto:ajaythorat988@gmail.com",
      icon: IoMdMail,
    },
  ];

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Experience", href: "/experience" },
    { name: "Contact", href: "/contact" }
  ];

  return (
    <footer className="relative w-full border-t border-border bg-card transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Left: Brand & Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold border-2 border-primary/30 rounded-md px-2 py-0.5 text-foreground">
                <span className="text-primary">&lt;</span>AT<span className="text-primary">/&gt;</span>
              </span>
              <h3 className="text-xl font-black text-foreground">
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
            <h4 className="eyebrow">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="link-underline text-sm text-muted-foreground hover:text-primary transition-colors duration-150 w-fit"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right: Connect */}
          <div className="space-y-4">
            <h4 className="eyebrow">Connect</h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social, index) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="magnetic group"
                >
                  <IconTile icon={social.icon} accent={getAccent(index)} size="sm" />
                </Link>
              ))}
            </div>
            <div className="pt-4">
              <p className="text-xs text-muted-foreground mb-2">Get in touch</p>
              <a
                href="mailto:ajaythorat988@gmail.com"
                className="link-underline text-sm font-semibold text-foreground hover:text-primary transition-colors"
              >
                ajaythorat988@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border mb-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            &copy; {new Date().getFullYear()} Ajay Bhimrao Thorat. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              Made with{" "}
              <FaHeart className="w-4 h-4 text-foreground animate-pulse" />{" "}
              using Next.js & TypeScript
            </p>
            
            {/* Scroll to top button */}
            <button
              onClick={scrollToTop}
              className="magnetic group p-2 rounded-2xl border border-border hover:border-primary/50 transition-colors duration-150"
              aria-label="Scroll to top"
            >
              <FaArrowUp className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}