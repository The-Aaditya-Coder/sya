import type { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
    const baseUrl="https://syaperfume.com";
  return {
    rules: {
      userAgent: '*',
      allow: ["/", "/knight", "/coldmark", "/glow", "/blushe"],
      disallow: [],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}