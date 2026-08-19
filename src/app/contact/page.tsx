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
    type: "website",
    locale: "en_US",
    url: "https://portfolio.ajaythorat.com/contact",
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
    title: "Contact Me | Ajay Thorat",
    description: "Get in touch with Ajay Thorat for web development projects, collaborations, or job opportunities.",
    images: ["/Images/Profile/Ajay3.png"],
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