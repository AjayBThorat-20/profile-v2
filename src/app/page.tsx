// Server component. It was marked "use client", which made the whole page a
// client entry: the two structured-data objects below (built from projectsData)
// were serialised into the client bundle as well as the HTML, and the module
// itself shipped to the browser for no reason - nothing here uses state, an
// effect or an event handler. A server component can still render the client
// components it imports; they each hydrate on their own.

import { Hero } from "@/Components/Home/page";
import { About, Certifications, CoCurricularActivities, Education, Skills } from "@/Components/About/page";
import { GithubContributions, Projects, WelcomeToProject } from "@/Components/Projects/page";
import { CurrentlyWorkingOn, Experience, WelcomeToExperience } from "@/Components/Experience/page";
import { Contact } from "@/Components/Contact/page";
import { projectsData } from "@/constants/project";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ajaythorat.com";

// Marks the homepage as a profile page about one person - the Person defined
// once in layout.tsx, referenced by its @id rather than described again.
const profilePageStructuredData = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${siteUrl}/#profilepage`,
  url: siteUrl,
  name: "Ajay Thorat | Full Stack Developer in Mumbai",
  inLanguage: "en",
  isPartOf: { "@id": `${siteUrl}/#website` },
  mainEntity: { "@id": `${siteUrl}/#person` },
  about: { "@id": `${siteUrl}/#person` },
};

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does Ajay Thorat specialize in?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ajay Thorat is a full stack developer in Mumbai specializing in Next.js, React, TypeScript, Node.js, and PostgreSQL, with hands-on experience building scalable, production-ready web applications end to end and managing agile teams.",
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
      name: "Where does Ajay Thorat work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Since May 2026, Ajay Thorat has worked as a Junior Full Stack Developer at ICT Mumbai Research Foundation (Mumbai Biocluster) in Mumbai, where he is the sole developer of three production platforms: IndiaPharmaHub, Yantra, and an internal HRMS.",
      },
    },
    {
      "@type": "Question",
      name: "What is DevCompass?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "DevCompass is an open-source npm CLI built and maintained by Ajay Thorat. It checks JavaScript projects' dependencies for known vulnerabilities, outdated and unused packages, and license conflicts, with AI-assisted fix suggestions and an interactive dependency graph. Documentation is at devcompass.ajaythorat.com.",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageStructuredData) }}
      />
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
        <GithubContributions />
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
