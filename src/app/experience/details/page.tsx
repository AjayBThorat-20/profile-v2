// app/experience/details/page.tsx - Experience details page component that imports and renders the ExperienceDetails section
import ExperienceDetails from "@/Components/Experience/experienceDetails";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience Details | Ajay Thorat",
  description: "Detailed breakdown of Ajay Thorat's professional roles, responsibilities, and tech stack at each company he has worked with.",
  alternates: {
    canonical: "/experience/details",
  },
  openGraph: {
    title: "Experience Details | Ajay Thorat",
    description: "Detailed breakdown of Ajay Thorat's professional roles, responsibilities, and tech stack at each company he has worked with.",
    url: "https://portfolio.ajaythorat.com/experience/details",
  },
};

const breadcrumbStructuredData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://portfolio.ajaythorat.com/" },
    { "@type": "ListItem", position: 2, name: "Experience", item: "https://portfolio.ajaythorat.com/experience" },
    { "@type": "ListItem", position: 3, name: "Details", item: "https://portfolio.ajaythorat.com/experience/details" },
  ],
};

export default function page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      <ExperienceDetails />
    </>
  );
}