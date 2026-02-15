"use client";

import { useEffect, RefObject } from 'react';

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useScrollReveal = (
  ref: RefObject<HTMLElement | null>,
  options: UseScrollRevealOptions = {}
) => {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            if (triggerOnce) {
              observer.unobserve(entry.target);
            }
          } else if (!triggerOnce) {
            entry.target.classList.remove('is-visible');
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [ref, threshold, rootMargin, triggerOnce]);
};

export const useParallax = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      
      // Parallax slow elements
      document.querySelectorAll('.parallax-slow').forEach((element) => {
        const el = element as HTMLElement;
        el.style.transform = `translateY(${scrolled * 0.1}px)`;
      });

      // Parallax medium elements
      document.querySelectorAll('.parallax-medium').forEach((element) => {
        const el = element as HTMLElement;
        el.style.transform = `translateY(${scrolled * 0.2}px)`;
      });

      // Parallax fast elements
      document.querySelectorAll('.parallax-fast').forEach((element) => {
        const el = element as HTMLElement;
        el.style.transform = `translateY(${scrolled * 0.3}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
};

export const useMagneticCursor = () => {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const magneticElements = document.querySelectorAll('.magnetic');
      
      magneticElements.forEach((element) => {
        const el = element as HTMLElement;
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
        
        const maxDistance = 100;
        
        if (distance < maxDistance) {
          const strength = (maxDistance - distance) / maxDistance;
          const moveX = distanceX * strength * 0.3;
          const moveY = distanceY * strength * 0.3;
          
          el.style.transform = `translate(${moveX}px, ${moveY}px)`;
        } else {
          el.style.transform = 'translate(0, 0)';
        }
      });
    };

    const handleMouseLeave = () => {
      const magneticElements = document.querySelectorAll('.magnetic');
      magneticElements.forEach((element) => {
        const el = element as HTMLElement;
        el.style.transform = 'translate(0, 0)';
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
};

export const useSmoothScroll = () => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="#"]');
      
      if (link) {
        e.preventDefault();
        const href = link.getAttribute('href');
        if (!href || href === '#') return;
        
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);
};