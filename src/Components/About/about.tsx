"use client";

import Image from "next/image";
import { FaRocket } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function About() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const achievements = [
    "Building production-ready web applications",
    "Real-time systems handling live traffic",
    "Database optimization & architecture",
    "Modern UI/UX with Next.js & React",
    "RESTful APIs & server-side development",
    "Agile team collaboration & leadership"
  ];

  return (
    <div className="min-h-screen">
      <div className="container-custom section">
        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* Main Content */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            
            {/* Text Section */}
            <div className="lg:w-[55%] space-y-8 order-2 lg:order-1 animate-fadeIn">
              {/* Name & Title Card */}
              <div className="glass-card p-8 rounded-2xl border-2 border-primary/20 relative overflow-hidden group hover:border-primary/40 transition-all duration-500">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10 space-y-4">
                  <h2 className="text-3xl md:text-4xl font-black">
                    <span className="gradient-text-animated">AJAY BHIMRAO THORAT</span>
                  </h2>

                  <div className="space-y-4 text-base md:text-lg leading-relaxed">
                    <p className="text-foreground/90">
                      Based in <span className="font-bold text-primary">Mumbai, India</span>, 
                      I'm a passionate full-stack developer specializing in{" "}
                      <span className="font-semibold text-secondary">Next.js, React, Node.js, and MongoDB</span>.
                    </p>

                    <p className="text-muted-foreground">
                      With hands-on experience in building{" "}
                      <span className="font-semibold text-foreground">scalable web applications</span>{" "}
                      and managing{" "}
                      <span className="font-semibold text-foreground">agile teams</span>, 
                      I excel in delivering user-centric solutions that solve real business problems.
                    </p>

                    <p className="text-muted-foreground">
                      Adaptable under pressure, I thrive in collaborative environments and 
                      innovative projects, always pushing the boundaries of what's possible.
                    </p>
                  </div>
                </div>
              </div>

              {/* Achievements Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 glass-card rounded-xl hover:scale-105 transition-transform duration-300 border border-border/50 hover:border-primary/50 group"
                  >
                    <div className="mt-0.5 flex-shrink-0">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                      {achievement}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Image Section */}
            <div className="lg:w-[45%] flex justify-center order-1 lg:order-2 animate-fadeIn" style={{ animationDelay: '200ms' }}>
              <div className="relative w-full max-w-md">
                {/* Glow effect */}
                <div className="absolute -inset-6 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-3xl blur-3xl opacity-60 animate-pulse-slow"></div>
                
                {/* Main image container */}
                <div className="relative group">
                  <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-2 border-primary/20 group-hover:border-primary/40 transition-all duration-500">
                    <Image
                      src="/Images/Profile/Ajay4.webp"
                      alt="Ajay Thorat - Full Stack Developer"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      priority
                      quality={85}
                      sizes="(max-width: 1024px) 90vw, 45vw"
                    />
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent"></div>
                  </div>

                  {/* Floating accent borders */}
                  <div className="absolute -top-4 -right-4 w-20 h-20 border-3 border-primary/40 rounded-3xl animate-float"></div>
                  <div className="absolute -bottom-4 -left-4 w-24 h-24 border-3 border-secondary/40 rounded-3xl animate-float" style={{ animationDelay: '1s' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action Section */}
          <div className="glass-card p-8 md:p-12 rounded-3xl border-2 border-primary/20 text-center space-y-6 relative overflow-hidden group animate-fadeIn" style={{ animationDelay: '600ms' }}>
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                <span className="gradient-text-animated">Let's Build Something Amazing Together</span>
              </h3>
              <p className="text-muted-foreground text-lg mb-6 max-w-2xl mx-auto">
                Ready to bring your ideas to life with cutting-edge technology and innovative solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="btn-primary magnetic px-8 py-4 text-lg"
                >
                  Get In Touch
                  <FaRocket className="w-5 h-5 ml-2" />
                </a>
                <a
                  href="/projects"
                  className="btn-secondary magnetic px-8 py-4 text-lg"
                >
                  View My Work
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}