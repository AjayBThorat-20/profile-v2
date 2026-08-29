import type { Metadata } from "next";
import localFont from "next/font/local";
import { Fraunces, Sora } from "next/font/google";
import "./globals.css";
import DefaultLayout from "../Components/Layout/defaultLayout";
import ReduxProvider from "@/providers/ReduxProvider";
import Script from "next/script";

// Display face for headings - a warm expressive serif matching the
// site's existing cinematic treatment (film grain, letterbox, Ken
// Burns) rather than a neutral sans headline.
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["500", "600", "800"],
  display: "swap",
});
// Body face - pairs with Fraunces, replaces Geist Sans for running text.
const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["400", "500", "600"],
  display: "swap",
});
// Geist Mono stays as the utility face for eyebrows, the REC indicator,
// stat figures, and code/data labels - untouched by this font pairing
// swap, which only replaces the display + body roles.
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: 'swap', // Add this
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ajaythorat.com';
const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const bingVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;

export const metadata: Metadata = {
  title: "Ajay Thorat | Full Stack Developer",
  description: "Full-Stack Developer specializing in Next.js, Node.js, PostgreSQL, MongoDB & Redis, passionate about solving real-world problems through innovative solutions.",
  keywords: ["Next.js", "React", "Node.js", "PostgreSQL", "MongoDB", "Redis", "Docker", "Full Stack Developer", "Web Development", "Ajay Thorat", "Software Engineer", "JavaScript", "TypeScript", "MERN Stack"],
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
    description: "Full-Stack Developer specializing in Next.js, Node.js, PostgreSQL, MongoDB & Redis, passionate about solving real-world problems through innovative solutions.",
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
  twitter: {
    card: "summary_large_image",
    title: "Ajay Thorat | Full Stack Developer",
    description: "Full-Stack Developer specializing in Next.js, Node.js, PostgreSQL, MongoDB & Redis, passionate about solving real-world problems through innovative solutions.",
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
    "knowsAbout": [
      "Next.js", "React", "Full Stack Development", "JavaScript", "TypeScript",
      "Node.js", "MongoDB", "PostgreSQL", "MySQL", "Prisma ORM", "Tailwind CSS", "Express.js",
      "Docker", "Redis", "RESTful APIs"
    ],
    "alumniOf": [
      {
        "@type": "CollegeOrUniversity",
        "name": "University of Mumbai",
        "sameAs": "https://en.wikipedia.org/wiki/University_of_Mumbai"
      }
    ],
    "email": "ajaythorat988@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Mumbai",
      "addressRegion": "Maharashtra",
      "addressCountry": "IN"
    }
  };

  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Ajay Thorat Portfolio",
    "url": siteUrl,
    "author": {
      "@type": "Person",
      "name": "Ajay Thorat"
    }
  };

  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/* Applies the persisted theme before first paint to avoid a
            wrong-theme flash and keep the DOM class in sync with the
            Redux store's initial state (see themeSlice.getInitialMode).
            Dark is the default for first-time visitors (no stored
            preference yet) rather than following system preference. */}
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(!t){t="dark";localStorage.setItem("theme",t);}document.documentElement.classList.toggle("dark",t==="dark");}catch(e){}})();`,
          }}
        />

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
        
        {/* Structured Data - plain <script> tags, not next/script: Next.js
            defers next/script content to client-side injection regardless
            of strategy, so it never appears in the static/SSR HTML that
            crawlers and social unfurlers read. A plain script tag renders
            as real static markup. */}
        <script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <script
          id="website-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteStructuredData),
          }}
        />
      </head>
      <body
        className={`${fraunces.variable} ${sora.variable} ${geistMono.variable} antialiased transition-colors duration-200`}
      >
        <ReduxProvider>
          <DefaultLayout>{children}</DefaultLayout>
        </ReduxProvider>
      </body>
    </html>
  );
}