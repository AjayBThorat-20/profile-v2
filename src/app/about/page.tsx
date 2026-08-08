import { About, Certifications, CoCurricularActivities, Education, Skills } from "@/Components/About/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Me | Ajay Thorat",
  description: "Learn more about Ajay Thorat - Full Stack Developer with expertise in Next.js, React, and MERN Stack. View my skills, certifications, and educational background.",
  keywords: ["Ajay Thorat about", "full stack developer skills", "React developer India", "MERN stack certifications"],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Me | Ajay Thorat",
    description: "Learn more about Ajay Thorat - Full Stack Developer with expertise in Next.js, React, and MERN Stack.",
    url: "https://portfolio.ajaythorat.com/about",
  },
};

const breadcrumbStructuredData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://portfolio.ajaythorat.com/" },
    { "@type": "ListItem", position: 2, name: "About", item: "https://portfolio.ajaythorat.com/about" },
  ],
};

export default function page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      <About />
      <Skills />
      <Certifications />
      <CoCurricularActivities />
      <Education />
    </>
  );
}