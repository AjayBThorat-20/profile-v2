import React from 'react'
import { CurrentlyWorkingOn, Experience, WelcomeToExperience } from "@/Components/Experience/page";
import ChapterNav from "@/Components/UI/ChapterNav";
import { Metadata } from "next";

const chapters = [
  { id: "experience-journey", index: "01", label: "Journey" },
  { id: "currently-working-on", index: "02", label: "Currently On" },
];

export const metadata: Metadata = {
  title: "Experience | Ajay Thorat",
  description: "View my professional experience as a Full Stack Developer, including current projects and work history in web development.",
  keywords: ["Ajay Thorat experience", "full stack developer work history", "Next.js developer resume"],
  alternates: {
    canonical: "/experience",
  },
  openGraph: {
    title: "Experience | Ajay Thorat",
    description: "View my professional experience as a Full Stack Developer, including current projects and work history.",
    type: "website",
    locale: "en_US",
    url: "https://portfolio.ajaythorat.com/experience",
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
    title: "Experience | Ajay Thorat",
    description: "View my professional experience as a Full Stack Developer, including current projects and work history.",
    images: ["/Images/Profile/Ajay3.png"],
  },
};

const breadcrumbStructuredData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://portfolio.ajaythorat.com/" },
    { "@type": "ListItem", position: 2, name: "Experience", item: "https://portfolio.ajaythorat.com/experience" },
  ],
};

export default function page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      <WelcomeToExperience />
      <ChapterNav items={chapters} />
      <Experience />
      <CurrentlyWorkingOn />
    </>
  )
}