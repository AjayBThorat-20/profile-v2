import { About, Certifications, CoCurricularActivities, Education, Skills } from "@/Components/About/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Me | Ajay Thorat",
  description: "Learn more about Ajay Thorat - Full Stack Developer with expertise in Next.js, React, and MERN Stack. View my skills, certifications, and educational background.",
  openGraph: {
    title: "About Me | Ajay Thorat",
    description: "Learn more about Ajay Thorat - Full Stack Developer with expertise in Next.js, React, and MERN Stack.",
    url: "https://portfolio.ajaythorat.com/about",
  },
};

export default function page() {
  return (
    <>
      <About />
      <Skills />
      <Certifications />
      <CoCurricularActivities />
      <Education />
    </>
  );
}