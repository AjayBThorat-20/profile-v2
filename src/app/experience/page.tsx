import React from 'react'
import { CurrentlyWorkingOn, Experience, WelcomeToExperience } from "@/Components/Experience/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience | Ajay Thorat",
  description: "View my professional experience as a Full Stack Developer, including current projects and work history in web development.",
  openGraph: {
    title: "Experience | Ajay Thorat",
    description: "View my professional experience as a Full Stack Developer, including current projects and work history.",
    url: "https://portfolio.ajaythorat.com/experience",
  },
};

export default function page() {
  return (
    <>
      <WelcomeToExperience />
      <Experience />
      <CurrentlyWorkingOn />
    </>
  )
}