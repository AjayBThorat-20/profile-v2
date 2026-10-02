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

// One description for search results and link previews. It names Mumbai and
// the projects (IndiaPharmaHub, Yantra, Mumbai Biocluster, DevCompass) on
// purpose: "Ajay Thorat" is shared by many unrelated profiles, and these are
// the terms that tell search engines this page is this person.
const siteDescription =
  "Ajay Thorat is a full-stack developer in Mumbai: sole developer of IndiaPharmaHub and Yantra at Mumbai Biocluster, and maintainer of the DevCompass npm CLI.";
const siteTitle = "Ajay Thorat | Full Stack Developer in Mumbai";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  keywords: ["Ajay Thorat", "Ajay Bhimrao Thorat", "Full Stack Developer", "Full Stack Developer Mumbai", "Next.js Developer", "TypeScript", "React", "Node.js", "PostgreSQL", "Prisma", "Redis", "Mumbai Biocluster", "ICT Mumbai", "IndiaPharmaHub", "Yantra", "DevCompass", "npm CLI"],
  authors: [{ name: "Ajay Thorat", url: siteUrl }],
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
  // No `images` here: app/opengraph-image.tsx generates the preview card and,
  // as file-based metadata, is what Next emits for og:image. X falls back to
  // og:image when there's no twitter:image, so it gets the same card.
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Ajay Thorat",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
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
    // A stable id so the homepage's ProfilePage and the WebSite block below
    // can point at this one entity instead of describing a second person.
    "@id": `${siteUrl}/#person`,
    "name": "Ajay Thorat",
    "alternateName": "Ajay Bhimrao Thorat",
    "givenName": "Ajay",
    "familyName": "Thorat",
    "description": siteDescription,
    "url": siteUrl,
    "image": `${siteUrl}/Images/Profile/Ajay3.png`,
    "jobTitle": "Full Stack Developer",
    "worksFor": {
      "@type": "Organization",
      "name": "ICT Mumbai Research Foundation (Mumbai Biocluster)",
      "url": "https://www.mumbaibiocluster.org/"
    },
    "sameAs": [
      "https://www.linkedin.com/in/ajaythorat-dev/",
      "https://github.com/AjayBThorat-20",
      "https://www.npmjs.com/~ajaybthorat-20"
    ],
    "knowsAbout": [
      "Next.js", "React", "Full Stack Development", "JavaScript", "TypeScript",
      "Node.js", "MongoDB", "PostgreSQL", "MySQL", "Prisma ORM", "Tailwind CSS", "Express.js",
      "Docker", "Redis", "BullMQ", "AWS", "Jest", "RESTful APIs"
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
    "@id": `${siteUrl}/#website`,
    // Google uses this as the site name shown above the result; the person's
    // name is what people search for, so it leads, with the old name kept
    // as an alternate.
    "name": "Ajay Thorat",
    "alternateName": ["Ajay Thorat Portfolio", "ajaythorat.com"],
    "url": siteUrl,
    "inLanguage": "en",
    "author": { "@id": `${siteUrl}/#person` },
    "publisher": { "@id": `${siteUrl}/#person` }
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

        {/* Google Analytics.

            strategy="lazyOnload", not "afterInteractive": gtag.js is 176 KB
            and was costing ~300 ms of main-thread time and ~190 ms of the
            page's ~420 ms Total Blocking Time - by far the largest single
            contributor, and all of it spent before the visitor can interact.
            lazyOnload holds it until the browser is idle after load, which
            takes that work out of the interaction window entirely. Page views
            are still recorded; they are just reported a moment later.

            The preconnect is what stops that deferral costing anything at the
            other end: without it the DNS + TLS handshake to googletagmanager
            only starts once the script is requested (~90 ms, per the
            Lighthouse preconnect audit). Warming the connection early and
            fetching late gets both. */}
        {gaId && (
          <>
            <link rel="preconnect" href="https://www.googletagmanager.com" />
            <link rel="preconnect" href="https://www.google-analytics.com" />
            <Script
              strategy="lazyOnload"
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <Script
              id="google-analytics"
              strategy="lazyOnload"
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