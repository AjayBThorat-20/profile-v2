"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface CustomLinkProps {
  href: string;
  title: string;
  className?: string;
}

const CustomLink: React.FC<CustomLinkProps> = ({ href, title, className = "" }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link 
      href={href} 
      className={`${className} relative group inline-block`}
    >
      {title}
      <span 
        className={`
          h-[1px] 
          inline-block 
          bg-black 
          absolute 
          left-0 
          -bottom-0.5 
          group-hover:w-full 
          transition-[width] 
          ease duration-300
          ${isActive ? 'w-full' : 'w-0'}
        `}
      />
    </Link>
  );
};

export default CustomLink;