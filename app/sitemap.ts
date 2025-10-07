import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://iddaasohbet.com'
  const routes = ['', '/canli-skorlar', '/kuponlar', '/tahmincilar', '/istatistikler', '/sss'].map((p) => ({
    url: base + p,
    lastModified: new Date(),
    changeFrequency: 'hourly' as const,
    priority: 0.8,
  }))
  return routes
}

import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://iddaasohbet.com'
  const routes = ['', '/canli-skorlar', '/kuponlar', '/tahmincilar', '/istatistikler', '/sss'].map((p) => ({
    url: base + p,
    lastModified: new Date(),
    changeFrequency: 'hourly' as const,
    priority: 0.8,
  }))
  return routes
}


