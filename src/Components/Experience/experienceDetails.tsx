"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft, FaExternalLinkAlt, FaCalendar, FaCheckCircle, FaBuilding } from "react-icons/fa";
import CompanyReviews from "./CompanyReviews";
import { getAccent } from "@/Components/UI/accentColor";

interface Experience {
  id: number;
  name: string;
  title: string;
  duration: string;
  companyUrl: string;
  techStack: string;
  details: {
    id: number;
    title: string;
    picture: string;
    data: string | { [key: string]: string[] };
  }[];
}

export default function ExperienceDetails({ experience }: { experience: Experience }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const mainAccent = getAccent(0);

  return (
    <div className="relative min-h-screen pb-20">
      {/* Background Gradients */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="parallax-slow absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl opacity-60 animate-pulse-slow" />
        <div className="parallax-medium absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl opacity-60 animate-pulse-slow" />
      </div>

      <div className="container-custom section">
        <div className="max-w-6xl mx-auto space-y-8">

          {/* Header Card */}
          <div className="panel rounded-3xl p-8 md:p-10 border-l-4 border-l-primary animate-fadeIn">
            <div className="relative space-y-6">
              {/* Company & Title */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                  <FaBuilding className="w-4 h-4" />
                  <span>COMPANY PROFILE</span>
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black gradient-text">
                  {experience.title}
                </h1>

                <a
                  href={experience.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xl md:text-2xl font-bold text-primary hover:text-secondary transition-colors group/link"
                >
                  {experience.name}
                  <FaExternalLinkAlt className="w-5 h-5 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform duration-200" />
                </a>
              </div>

              {/* Duration */}
              <div className="flex items-center gap-3 px-5 py-3 bg-muted/50 rounded-xl border border-border/50 w-fit">
                <div className="p-2 bg-primary/10 border border-primary/30 rounded-lg">
                  <FaCalendar className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium mb-0.5">Duration</p>
                  <p className="text-sm font-bold text-foreground">{experience.duration}</p>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  Technology Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {experience.techStack.split(",").map((tech) => (
                    <span
                      key={tech}
                      className={`px-4 py-2 ${mainAccent.badge} rounded-lg text-sm font-semibold border hover:scale-105 transition-transform duration-150`}
                    >
                      {tech.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-8">
            {experience.details.map((detail, index) => {
              const accent = getAccent(index);

              return (
                <div
                  key={detail.id}
                  className={`relative border ${accent.border} rounded-3xl overflow-hidden animate-fadeIn`}
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  <div className={`h-1 ${accent.bg}`}></div>

                  {/* Image Section */}
                  <div className="relative w-full h-72 md:h-96 overflow-hidden">
                    <Image
                      src={detail.picture}
                      alt={`${experience.name} - ${detail.title} - Ajay Thorat`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 80vw"
                      priority={index === 0}
                      quality={85}
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                    {/* Badge positioned on image */}
                    <div className={`absolute top-6 left-6 inline-flex items-center gap-2 px-4 py-2 bg-card/90 backdrop-blur-sm rounded-full text-sm font-bold shadow-lg border-2 ${accent.border}`}>
                      <span className={`w-2 h-2 ${accent.bg} rounded-full animate-pulse`}></span>
                      Section {index + 1} of {experience.details.length}
                    </div>

                    {/* Title overlay at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                      <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white drop-shadow-lg">
                        {detail.title.charAt(0).toUpperCase() + detail.title.slice(1)}
                      </h2>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 md:p-8 space-y-6">
                    {typeof detail.data === "string" ? (
                      <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
                        {detail.data}
                      </p>
                    ) : (
                      <div className="space-y-8">
                        {Object.entries(detail.data).map(([key, value]) => (
                          <div key={key} className="space-y-4">
                            <h3 className="text-lg md:text-xl font-bold text-foreground flex items-center gap-3">
                              <div className={`w-1.5 h-8 ${accent.bg} rounded-full`}></div>
                              {key
                                .replace(/([A-Z])/g, " $1")
                                .trim()
                                .replace(/^./, (str) => str.toUpperCase())}
                            </h3>
                            <ul className="space-y-3">
                              {value.map((item, itemIdx) => (
                                <li
                                  key={itemIdx}
                                  className="flex items-start gap-3 text-base text-muted-foreground hover:text-foreground transition-colors duration-150"
                                >
                                  <FaCheckCircle className={`mt-1 w-4 h-4 flex-shrink-0 ${accent.text}`} />
                                  <span className="leading-relaxed">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <CompanyReviews />

          {/* Navigation Footer */}
          <div className="flex justify-center pt-8 animate-fadeIn" style={{ animationDelay: '320ms' }}>
            <Link
              href="/experience"
              className="magnetic group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200"
            >
              <FaArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
              <span>Back to Experience</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
