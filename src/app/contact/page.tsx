import { Contact } from "@/Components/Contact/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Me | Ajay Thorat",
  description: "Get in touch with Ajay Thorat for web development projects, collaborations, or job opportunities. Full Stack Developer available for hire.",
  keywords: ["Contact Ajay Thorat", "hire full stack developer", "MERN stack developer for hire"],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Me | Ajay Thorat",
    description: "Get in touch with Ajay Thorat for web development projects, collaborations, or job opportunities.",
    url: "https://portfolio.ajaythorat.com/contact",
  },
};

const breadcrumbStructuredData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://portfolio.ajaythorat.com/" },
    { "@type": "ListItem", position: 2, name: "Contact", item: "https://portfolio.ajaythorat.com/contact" },
  ],
};

export default function page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      <Contact />
    </>
  );
}