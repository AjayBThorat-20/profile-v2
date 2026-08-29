import { Projects, WelcomeToProject } from "@/Components/Projects/page";
import { Metadata } from "next";
import { projectsData } from "@/constants/project";

export const metadata: Metadata = {
  title: "Projects | Ajay Thorat",
  description: "Explore my portfolio of web development projects including Next.js applications, Node.js/PostgreSQL backends, and full-stack solutions.",
  keywords: ["Ajay Thorat projects", "Next.js portfolio projects", "Node.js developer projects", "full stack developer projects"],
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projects | Ajay Thorat",
    description: "Explore my portfolio of web development projects including Next.js applications, Node.js/PostgreSQL backends, and full-stack solutions.",
    type: "website",
    locale: "en_US",
    url: "https://ajaythorat.com/projects",
    siteName: "Ajay Thorat Portfolio",
    images: [
      {
        url: "/Images/Profile/Ajay3.png",
        width: 1200,
        height: 630,
        alt: "Ajay Thorat - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Ajay Thorat",
    description: "Explore my portfolio of web development projects including Next.js applications, Node.js/PostgreSQL backends, and full-stack solutions.",
    images: ["/Images/Profile/Ajay3.png"],
  },
};

const breadcrumbStructuredData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://ajaythorat.com/" },
    { "@type": "ListItem", position: 2, name: "Projects", item: "https://ajaythorat.com/projects" },
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

export default function page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsListStructuredData) }}
      />
      <WelcomeToProject />
      <Projects />
    </>
  );
}