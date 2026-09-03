"use client";

import { Hero } from "@/Components/Home/page";
import { About, Certifications, CoCurricularActivities, Education, Skills } from "@/Components/About/page";
import { Projects, WelcomeToProject } from "@/Components/Projects/page";
import { CurrentlyWorkingOn, Experience, WelcomeToExperience } from "@/Components/Experience/page";
import { Contact } from "@/Components/Contact/page";
import { projectsData } from "@/constants/project";

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does Ajay Thorat specialize in?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ajay Thorat is a full stack developer specializing in Next.js, React, Node.js, and MongoDB/PostgreSQL, with hands-on experience building scalable, production-ready web applications and managing agile teams.",
      },
    },
    {
      "@type": "Question",
      name: "Where is Ajay Thorat based?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ajay Thorat is based in Mumbai, Maharashtra, India.",
      },
    },
    {
      "@type": "Question",
      name: "What is Ajay Thorat's educational background?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ajay Thorat holds a Master of Computer Application (MCA) from Hiray College, University of Mumbai (2024), and a Bachelor of Computer Science (B.Sc. CS) from Patkar Varde College, University of Mumbai (2022).",
      },
    },
    {
      "@type": "Question",
      name: "Is Ajay Thorat available for freelance or full-time work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Ajay Thorat is currently available for freelance projects and full-time opportunities as a full stack developer.",
      },
    },
    {
      "@type": "Question",
      name: "How can I contact Ajay Thorat?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ajay Thorat can be reached via email at ajaythorat988@gmail.com, through the contact section at ajaythorat.com, or on LinkedIn and GitHub.",
      },
    },
  ],
};

const projectsListStructuredData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: projectsData.map((project, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "CreativeWork",
      name: project.title,
      description: project.discription,
      url: project.url,
      keywords: project.techStack,
      author: {
        "@type": "Person",
        name: "Ajay Thorat",
      },
      image: `https://ajaythorat.com${project.pictures[0]?.picture}`,
    },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsListStructuredData) }}
      />

      <Hero />

      <section id="about">
        <About />
        <Skills />
        <Certifications />
        <CoCurricularActivities />
        <Education />
      </section>

      <section id="projects">
        <WelcomeToProject />
        <Projects />
      </section>

      <section id="experience">
        <WelcomeToExperience />
        <Experience />
        <CurrentlyWorkingOn />
      </section>

      <section id="contact">
        <Contact />
      </section>
    </>
  );
}
