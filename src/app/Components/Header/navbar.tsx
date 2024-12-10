"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaBars, FaTimes } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import CustomLink from '../Link/costomLink';
import { usePathname } from 'next/navigation'; // Import the usePathname hook

// Memoized Social Links Component with specified props
const SocialLinks: React.FC<{ className?: string }> = React.memo(({ className = '' }) => (
  <div className={`flex items-center justify-center flex-wrap ${className}`}>
    <Link
      href="https://www.linkedin.com/in/ajay-thorat-24b4b6215"
      target="_blank"
      rel="noopener noreferrer"
      className="mx-2"
    >
      <FaLinkedin className='fill-blue-600 w-6 h-6'/>
    </Link>
    <Link
      href="https://github.com/AjayBThorat-20"
      target="_blank"
      rel="noopener noreferrer"
      className="mx-2"
    >
      <FaGithub className='fill-black w-6 h-6'/>
    </Link>
    <Link
      href="mailto:ajaythorat988@gmail.com"
      target="_blank"
      rel="noopener noreferrer"
      className="mx-2"
    >
      <IoMdMail className='fill-rose-600 w-6 h-6'/>
    </Link>
  </div>
));

// Set display name for easier debugging
SocialLinks.displayName = 'SocialLinks';

export default function Navbar() {
  // Hydration safety state
  const [isClient, setIsClient] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Correctly use the `usePathname` hook
  const pathname = usePathname(); // Get the current path

  // Ensure component only renders on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]); // Dependency on pathname to close the menu on route change

  // Memoized menu toggle to prevent unnecessary re-renders
  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  // Prevent rendering on server
  if (!isClient) return null;

  return (
    <header className='relative'>
      {/* Desktop Navigation */}
      <div className='hidden md:flex w-full px-32 py-8 font-medium items-center justify-between'>
        <nav>
          <CustomLink href="/" title="Home" className="mx-2 text-lg"/>
          <CustomLink href="/about" title="About" className="mx-2 text-lg"/>
          <CustomLink href="/projects" title="Projects" className="mx-2 text-lg"/>
          <CustomLink href="/experience" title="Experience" className="mx-2 text-lg"/>
        </nav>
        
        <SocialLinks />
      </div>

      {/* Mobile Navigation */}
      <div className='md:hidden flex justify-between items-center px-4 py-4'>
        {/* Hamburger Icon */}
        <button 
          onClick={toggleMenu} 
          className='z-50 relative'
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {/* {isMenuOpen ? (
            <FaTimes className='w-6 h-6 text-gray-800' />
          ) : (
            <FaBars className='w-6 h-6 text-gray-800' />
          )} */}



{isMenuOpen ? (
            // <FaTimes className='w-6 h-6 text-gray-800' />
            null
          ) : (
            <FaBars className='w-6 h-6 text-gray-800' />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
  <div className='md:hidden fixed inset-0 bg-white/90 bg-opacity-55 z-40 flex items-center justify-center shadow-md shadow-gray-400'>
    <div className='relative w-8/12 h-8/12 bg-white shadow-lg rounded-lg p-6'>
      {/* Close Button */}
      <button 
        onClick={toggleMenu} 
        className='absolute top-4 right-4 z-50'
        aria-label="Close menu"
      >
        <FaTimes className='w-6 h-6 text-gray-800' />
      </button>

      <div className='flex flex-col items-center justify-center space-y-6 h-full'>
        <nav className='flex flex-col items-center space-y-6'>
          {[{ href: '/', label: 'Home' }, { href: '/about', label: 'About' }, { href: '/projects', label: 'Projects' }, { href: '/experience', label: 'Experience' }].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-lg hover:text-gray-600 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        
        <SocialLinks className='mt-8' />
      </div>
    </div>
  </div>
)}
    </header>
  );
}
