import { Projects, WelcomeToProject } from "@/Components/Projects/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Ajay Thorat",
  description: "Explore my portfolio of web development projects including Next.js applications, MERN stack projects, and full-stack solutions.",
  keywords: ["Ajay Thorat projects", "Next.js portfolio projects", "MERN stack projects", "full stack developer projects"],
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projects | Ajay Thorat",
    description: "Explore my portfolio of web development projects including Next.js applications, MERN stack projects, and full-stack solutions.",
    url: "https://portfolio.ajaythorat.com/projects",
  },
};

const breadcrumbStructuredData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://portfolio.ajaythorat.com/" },
    { "@type": "ListItem", position: 2, name: "Projects", item: "https://portfolio.ajaythorat.com/projects" },
  ],
};

export default function page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      <WelcomeToProject />
      <Projects />
    </>
  );
}