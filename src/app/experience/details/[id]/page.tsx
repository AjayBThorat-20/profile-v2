import { Metadata } from "next";
import { notFound } from "next/navigation";
import { experienceData } from "@/constants/experience";
import ExperienceDetails from "@/Components/Experience/experienceDetails";

export function generateStaticParams() {
  return experienceData.map((exp) => ({ id: String(exp.id) }));
}

// Only the ids above exist. With the default (true), an unknown id like
// /experience/details/99 was rendered on demand, and because this route has
// a loading.tsx the 200 status was already streamed before the page called
// notFound() - a "soft 404" that search engines flag. false makes unknown
// ids a real 404 at the routing level, before anything renders.
export const dynamicParams = false;

type Params = { id: string };

function findExperience(id: string) {
  return experienceData.find((exp) => exp.id === Number(id));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { id } = await params;
  const experience = findExperience(id);

  if (!experience) {
    return { title: "Experience Details | Ajay Thorat" };
  }

  const title = `${experience.title} at ${experience.shortName} | Ajay Thorat`;
  const description = experience.seoDescription;

  return {
    title,
    description,
    alternates: {
      canonical: `/experience/details/${experience.id}`,
    },
    // og:image comes from the sibling opengraph-image.tsx (a per-role card);
    // the company logos used before were 500-800px wide, not the 1200x630
    // they were declared as. X falls back to og:image for its card.
    openGraph: {
      title,
      description,
      type: "website",
      locale: "en_US",
      url: `https://ajaythorat.com/experience/details/${experience.id}`,
      siteName: "Ajay Thorat",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const experience = findExperience(id);

  if (!experience) {
    notFound();
  }

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://ajaythorat.com/" },
      // The homepage section, not /experience: that path only 308-redirects
      // here, and breadcrumb items should point at the real page.
      { "@type": "ListItem", position: 2, name: "Experience", item: "https://ajaythorat.com/#experience" },
      {
        "@type": "ListItem",
        position: 3,
        name: experience.name,
        item: `https://ajaythorat.com/experience/details/${experience.id}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      <ExperienceDetails experience={experience} />
    </>
  );
}
