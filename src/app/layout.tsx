import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import DefaultLayout from "../Components/Layout/defaultLayout";
import ReduxProvider from "@/providers/ReduxProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Ajay Thorat | Full Stack Developer",
  description: "Next.js and MERN Stack Developer passionate about solving real-world problems through innovative solutions.",
  keywords: ["Next.js", "React", "MERN Stack", "Full Stack Developer", "Web Development"],
  authors: [{ name: "Ajay Thorat" }],
  openGraph: {
    title: "Ajay Thorat | Full Stack Developer",
    description: "Next.js and MERN Stack Developer passionate about solving real-world problems",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ajay Thorat | Full Stack Developer",
    description: "Next.js and MERN Stack Developer",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased transition-colors duration-300`}
      >
        <ReduxProvider>
          <DefaultLayout>{children}</DefaultLayout>
        </ReduxProvider>
      </body>
    </html>
  );
}