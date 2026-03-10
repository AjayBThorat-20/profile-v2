import { Contact } from "@/Components/Contact/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Me | Ajay Thorat",
  description: "Get in touch with Ajay Thorat for web development projects, collaborations, or job opportunities. Full Stack Developer available for hire.",
  openGraph: {
    title: "Contact Me | Ajay Thorat",
    description: "Get in touch with Ajay Thorat for web development projects, collaborations, or job opportunities.",
    url: "https://portfolio.ajaythorat.com/contact",
  },
};

export default function page() {
  return (
    <>
      <Contact />
    </>
  );
}