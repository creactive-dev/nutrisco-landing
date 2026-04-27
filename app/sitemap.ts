import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/constants'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE.url, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE.url}/politica-privacidad`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${SITE.url}/terminos`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
  ]
}
