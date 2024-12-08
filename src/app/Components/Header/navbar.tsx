// // "use client"

// // import React, { useState } from 'react'
// // import Link from 'next/link'
// // import { useRouter } from 'next/navigation'
// // import { FaGithub, FaLinkedin, FaBars, FaTimes } from 'react-icons/fa'
// // import { IoMdMail } from 'react-icons/io'
// // import CustomLink from '../Link/costomLink'

// // export default function Navbar() {
// //   const [isMenuOpen, setIsMenuOpen] = useState(false)
// //   const router = useRouter()

// //   const toggleMenu = () => {
// //     setIsMenuOpen(!isMenuOpen)
// //   }

// //   const handleLinkClick = (href:string) => {
// //     setIsMenuOpen(false)
// //     router.push(href)
// //   }

// //   // Social links component to reuse in both desktop and mobile views
// //   const SocialLinks = ({ className = '' }) => (
// //     <div className={`flex items-center justify-center flex-wrap ${className}`}>
// //       <Link 
// //         href="https://www.linkedin.com/in/ajay-thorat-24b4b6215" 
// //         target="_blank" 
// //         rel="noopener noreferrer" 
// //         className="mx-2"
// //       >
// //         <FaLinkedin className='fill-blue-600 w-6 h-6'/>
// //       </Link>
// //       <Link 
// //         href="https://github.com/AjayBThorat-20" 
// //         target="_blank" 
// //         rel="noopener noreferrer" 
// //         className="mx-2"
// //       >
// //         <FaGithub className='fill-black w-6 h-6'/>
// //       </Link>
// //       <Link 
// //         href="mailto:ajaythorat988@gmail.com" 
// //         target="_blank" 
// //         rel="noopener noreferrer" 
// //         className="mx-2"
// //       >
// //         <IoMdMail className='fill-rose-600 w-6 h-6'/>
// //       </Link>
// //     </div>
// //   )

// //   return (
// //     <header className='relative'>
// //       {/* Desktop Navigation */}
// //       <div className='hidden md:flex w-full px-32 py-8 font-medium items-center justify-between'>
// //         <nav>
// //           <CustomLink href="/" title="Home" className="mx-2 text-lg"/>
// //           <CustomLink href="/about" title="About" className="mx-2 text-lg"/>
// //           <CustomLink href="/projects" title="Projects" className="mx-2 text-lg"/>
// //           <CustomLink href="/experience" title="Experience" className="mx-2 text-lg"/>
// //         </nav>
        
// //         <SocialLinks />
// //       </div>

// //       {/* Mobile Navigation */}
// //       <div className='md:hidden flex justify-between items-center px-4 py-4'>
// //         {/* Hamburger Icon */}
// //         <button 
// //           onClick={toggleMenu} 
// //           className='z-50 relative'
// //         >
// //           {isMenuOpen ? (
// //             <FaTimes className='w-6 h-6 text-gray-800' />
// //           ) : (
// //             <FaBars className='w-6 h-6 text-gray-800' />
// //           )}
// //         </button>
// //       </div>

// //       {/* Mobile Menu Overlay */}
// //       {isMenuOpen && (
// //         <div className='fixed inset-0 bg-white z-40 flex flex-col items-center justify-center space-y-8'>
// //           <nav className='flex flex-col items-center space-y-6'>
// //             <button 
// //               onClick={() => handleLinkClick('/')} 
// //               className="text-2xl"
// //             >
// //               Home
// //             </button>
// //             <button 
// //               onClick={() => handleLinkClick('/about')} 
// //               className="text-2xl"
// //             >
// //               About
// //             </button>
// //             <button 
// //               onClick={() => handleLinkClick('/projects')} 
// //               className="text-2xl"
// //             >
// //               Projects
// //             </button>
// //             <button 
// //               onClick={() => handleLinkClick('/experience')} 
// //               className="text-2xl"
// //             >
// //               Experience
// //             </button>
// //           </nav>
          
// //           <SocialLinks className='mt-8' />
// //         </div>
// //       )}
// //     </header>
// //   )
// // }














// "use client";

// import React, { useState, useEffect, useCallback } from 'react'
// import Link from 'next/link'
// import { useRouter, usePathname } from 'next/navigation'
// import { FaGithub, FaLinkedin, FaBars, FaTimes } from 'react-icons/fa'
// import { IoMdMail } from 'react-icons/io'
// import CustomLink from '../Link/costomLink'

// // Memoized Social Links Component
// const SocialLinks = React.memo(({ className = '' } : any) => (
//   <div className={`flex items-center justify-center flex-wrap ${className}`}>
//     <Link 
//       href="https://www.linkedin.com/in/ajay-thorat-24b4b6215" 
//       target="_blank" 
//       rel="noopener noreferrer" 
//       className="mx-2"
//     >
//       <FaLinkedin className='fill-blue-600 w-6 h-6'/>
//     </Link>
//     <Link 
//       href="https://github.com/AjayBThorat-20" 
//       target="_blank" 
//       rel="noopener noreferrer" 
//       className="mx-2"
//     >
//       <FaGithub className='fill-black w-6 h-6'/>
//     </Link>
//     <Link 
//       href="mailto:ajaythorat988@gmail.com" 
//       target="_blank" 
//       rel="noopener noreferrer" 
//       className="mx-2"
//     >
//       <IoMdMail className='fill-rose-600 w-6 h-6'/>
//     </Link>
//   </div>
// ));

// export default function Navbar() {
//   // Hydration safety state
//   const [isClient, setIsClient] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
  
//   // Navigation hooks
//   const router = useRouter();
//   const pathname = usePathname();

//   // Ensure component only renders on client
//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   // Close menu on route change
//   useEffect(() => {
//     setIsMenuOpen(false);
//   }, [pathname]);

//   // Memoized menu toggle to prevent unnecessary re-renders
//   const toggleMenu = useCallback(() => {
//     setIsMenuOpen(prev => !prev);
//   }, []);

//   // Memoized link click handler
//   const handleLinkClick = useCallback((href: string) => {
//     setIsMenuOpen(false);
//     router.push(href);
//   }, [router]);

//   // Prevent rendering on server
//   if (!isClient) return null;

//   return (
//     <header className='relative'>
//       {/* Desktop Navigation */}
//       <div className='hidden md:flex w-full px-32 py-8 font-medium items-center justify-between'>
//         <nav>
//           <CustomLink href="/" title="Home" className="mx-2 text-lg"/>
//           <CustomLink href="/about" title="About" className="mx-2 text-lg"/>
//           <CustomLink href="/projects" title="Projects" className="mx-2 text-lg"/>
//           <CustomLink href="/experience" title="Experience" className="mx-2 text-lg"/>
//         </nav>
        
//         <SocialLinks />
//       </div>

//       {/* Mobile Navigation */}
//       <div className='md:hidden flex justify-between items-center px-4 py-4'>
//         {/* Hamburger Icon */}
//         <button 
//           onClick={toggleMenu} 
//           className='z-50 relative'
//           aria-label={isMenuOpen ? "Close menu" : "Open menu"}
//         >
//           {isMenuOpen ? (
//             <FaTimes className='w-6 h-6 text-gray-800' />
//           ) : (
//             <FaBars className='w-6 h-6 text-gray-800' />
//           )}
//         </button>
//       </div>

//       {/* Mobile Menu Overlay */}
//       {isMenuOpen && (
//         <div className='fixed inset-0 bg-white z-40 flex flex-col items-center justify-center space-y-8'>
//           <nav className='flex flex-col items-center space-y-6'>
//             {[
//               { href: '/', label: 'Home' },
//               { href: '/about', label: 'About' },
//               { href: '/projects', label: 'Projects' },
//               { href: '/experience', label: 'Experience' }
//             ].map((link) => (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 onClick={() => setIsMenuOpen(false)}
//                 className="text-2xl hover:text-gray-600 transition-colors"
//               >
//                 {link.label}
//               </Link>
//             ))}
//           </nav>
          
//           <SocialLinks className='mt-8' />
//         </div>
//       )}
//     </header>
//   );
// }















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
          {isMenuOpen ? (
            <FaTimes className='w-6 h-6 text-gray-800' />
          ) : (
            <FaBars className='w-6 h-6 text-gray-800' />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className='fixed inset-0 bg-white z-40 flex flex-col items-center justify-center space-y-8'>
          <nav className='flex flex-col items-center space-y-6'>
            {[{ href: '/', label: 'Home' }, { href: '/about', label: 'About' }, { href: '/projects', label: 'Projects' }, { href: '/experience', label: 'Experience' }].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl hover:text-gray-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          <SocialLinks className='mt-8' />
        </div>
      )}
    </header>
  );
}
