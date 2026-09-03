import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Ajay Thorat Portfolio',
    short_name: 'AT Portfolio',
    description: 'Full Stack Developer Portfolio - Next.js, Node.js, PostgreSQL & MongoDB Developer',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}