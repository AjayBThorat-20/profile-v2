import { Projects, WelcomeToProject } from "@/Components/Projects/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Ajay Thorat",
  description: "Explore my portfolio of web development projects including Next.js applications, MERN stack projects, and full-stack solutions.",
  openGraph: {
    title: "Projects | Ajay Thorat",
    description: "Explore my portfolio of web development projects including Next.js applications, MERN stack projects, and full-stack solutions.",
    url: "https://portfolio.ajaythorat.com/projects",
  },
};

export default function page() {
  return (
    <>
      <WelcomeToProject />
      <Projects />    
    </>
  );
}