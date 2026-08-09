import { MetadataRoute } from 'next'
import { projectsData } from '@/constants/project'
import { certificationsData } from '@/constants/about'
import { experienceData } from '@/constants/experience'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://portfolio.ajaythorat.com'
  const abs = (path: string) => `${baseUrl}${path}`

  const projectImages = projectsData.flatMap((project) =>
    project.pictures.map((p) => abs(p.picture))
  )
  const certificationImages = certificationsData.map((cert) => abs(cert.image))
  const experienceImages = experienceData.flatMap((exp) =>
    exp.details.map((detail) => abs(detail.picture))
  )
  const profileImages = [
    abs('/Images/Profile/Ajay3.png'),
    abs('/Images/Profile/Ajay4.png'),
  ]

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
      images: profileImages,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
      images: [...profileImages, ...certificationImages],
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
      images: projectImages,
    },
    {
      url: `${baseUrl}/experience`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
      images: experienceImages,
    },
    ...experienceData.map((exp) => ({
      url: `${baseUrl}/experience/details/${exp.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      images: exp.details.map((detail) => abs(detail.picture)),
    })),
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
      images: profileImages,
    },
  ]
}
