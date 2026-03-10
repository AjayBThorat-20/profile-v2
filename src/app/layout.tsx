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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://portfolio.ajaythorat.com';
const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const bingVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;

export const metadata: Metadata = {
  title: "Ajay Thorat | Full Stack Developer",
  description: "Next.js and MERN Stack Developer passionate about solving real-world problems through innovative solutions.",
  keywords: ["Next.js", "React", "MERN Stack", "Full Stack Developer", "Web Development", "Ajay Thorat", "Software Engineer", "JavaScript", "TypeScript", "Node.js", "MongoDB"],
  authors: [{ name: "Ajay Thorat" }],
  creator: "Ajay Thorat",
  publisher: "Ajay Thorat",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  verification: {
    google: googleVerification,
    other: bingVerification ? {
      'msvalidate.01': bingVerification,
    } : {},
  },
  openGraph: {
    title: "Ajay Thorat | Full Stack Developer",
    description: "Next.js and MERN Stack Developer passionate about solving real-world problems through innovative solutions.",
    type: "website",
    locale: "en_US",
    url: siteUrl,
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
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Ajay Thorat | Full Stack Developer",
  //   description: "Next.js and MERN Stack Developer passionate about solving real-world problems",
  //   images: ["/Images/Profile/Ajay3.png"],
  // },
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  // Structured Data for Person/Developer
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Ajay Thorat",
    "url": siteUrl,
    "image": `${siteUrl}/Images/Profile/Ajay3.png`,
    "jobTitle": "Full Stack Developer",
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance"
    },
    "sameAs": [
      "https://www.linkedin.com/in/ajay-thorat-24b4b6215",
      "https://github.com/AjayBThorat-20"
    ],
    "knowsAbout": ["Next.js", "React", "MERN Stack", "Full Stack Development", "JavaScript", "TypeScript"],
    "email": "ajaythorat988@gmail.com"
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Google Analytics */}
        {gaId && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
        
        {/* Structured Data */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
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