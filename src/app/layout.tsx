// layout.tsx - Root layout component with global styles, fonts, and metadata
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import DefaultLayout from "../Components/Layout/defaultLayout";
import ReduxProvider from "@/providers/ReduxProvider";
import Script from "next/script";

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
  keywords: ["Next.js", "React", "MERN Stack", "Full Stack Developer", "Web Development", "Ajay Thorat", "Software Engineer", "JavaScript", "TypeScript"],
  authors: [{ name: "Ajay Thorat" }],
  creator: "Ajay Thorat",
  publisher: "Ajay Thorat",
  metadataBase: new URL('https://portfolio.ajaythorat.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Ajay Thorat | Full Stack Developer",
    description: "Next.js and MERN Stack Developer passionate about solving real-world problems through innovative solutions.",
    type: "website",
    locale: "en_US",
    url: "https://portfolio.ajaythorat.com",
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
    title: "Ajay Thorat | Full Stack Developer",
    description: "Next.js and MERN Stack Developer passionate about solving real-world problems",
    images: ["/Images/Profile/Ajay3.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // Add the verification tag that Google will give you (you'll get this in the next step)
  verification: {
    google: 'D4BCW0QrUAQ6n52Z4FQeeQPV9LyD-uSFgEmXW5RS5R4', // Replace with actual code from Google
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-7XGVSSDX53"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-7XGVSSDX57', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
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