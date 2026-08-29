import { Metadata } from "next";
import { notFound } from "next/navigation";
import { experienceData } from "@/constants/experience";
import ExperienceDetails from "@/Components/Experience/experienceDetails";

export function generateStaticParams() {
  return experienceData.map((exp) => ({ id: String(exp.id) }));
}

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

  const title = `${experience.title} at ${experience.name} | Ajay Thorat`;
  const description = `Ajay Thorat's role as ${experience.title} at ${experience.name} (${experience.duration}). Tech stack: ${experience.techStack}.`;
  const image = experience.details[0]?.picture || "/Images/Profile/Ajay3.png";

  return {
    title,
    description,
    alternates: {
      canonical: `/experience/details/${experience.id}`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: "en_US",
      url: `https://ajaythorat.com/experience/details/${experience.id}`,
      siteName: "Ajay Thorat Portfolio",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${experience.name} - ${experience.title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
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
      { "@type": "ListItem", position: 2, name: "Experience", item: "https://ajaythorat.com/experience" },
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
