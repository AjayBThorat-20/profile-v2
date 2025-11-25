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
        data-new-gr-c-s-check-loaded="14.1223.0"
        data-gr-ext-installed=""
        cz-shortcut-listen="true"
      >
        <ReduxProvider>
          {/* Background gradient effects */}
          <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            {/* Light theme gradients */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-3xl dark:opacity-0 transition-opacity duration-500" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-400/15 rounded-full blur-3xl dark:opacity-0 transition-opacity duration-500" />
            
            {/* Dark theme gradients */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl opacity-0 dark:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-3xl opacity-0 dark:opacity-100 transition-opacity duration-500" />
          </div>

          <DefaultLayout>{children}</DefaultLayout>
        </ReduxProvider>
      </body>
    </html>
  );
}