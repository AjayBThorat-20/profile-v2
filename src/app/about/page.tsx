import { About, Certifications, CoCurricularActivities, Education, Skills } from "@/Components/About/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Me | Ajay Thorat",
  description: "Learn more about Ajay Thorat - Full Stack Developer with expertise in Next.js, Node.js, PostgreSQL & MongoDB. View my skills, certifications, and educational background.",
  keywords: ["Ajay Thorat about", "full stack developer skills", "React developer India", "Next.js developer certifications"],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Me | Ajay Thorat",
    description: "Learn more about Ajay Thorat - Full Stack Developer with expertise in Next.js, Node.js, PostgreSQL & MongoDB.",
    type: "website",
    locale: "en_US",
    url: "https://portfolio.ajaythorat.com/about",
    siteName: "Ajay Thorat Portfolio",
    images: [
      {
        url: "/Images/Profile/Ajay4.png",
        width: 1200,
        height: 630,
        alt: "Ajay Thorat - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Me | Ajay Thorat",
    description: "Learn more about Ajay Thorat - Full Stack Developer with expertise in Next.js, Node.js, PostgreSQL & MongoDB.",
    images: ["/Images/Profile/Ajay4.png"],
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
        text: "Ajay Thorat can be reached via email at ajaythorat988@gmail.com, through the contact form at portfolio.ajaythorat.com/contact, or on LinkedIn and GitHub.",
      },
    },
  ],
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <About />
      <Skills />
      <Certifications />
      <CoCurricularActivities />
      <Education />
    </>
  );
}