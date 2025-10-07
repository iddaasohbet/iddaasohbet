// Minimal compatible sitemap to avoid type issues in build
export default function sitemap() {
  const base = 'https://iddaasohbet.com'
  return [
    { url: base, lastModified: new Date() },
    { url: base + '/canli-skorlar', lastModified: new Date() },
    { url: base + '/kuponlar', lastModified: new Date() },
    { url: base + '/tahmincilar', lastModified: new Date() },
    { url: base + '/istatistikler', lastModified: new Date() },
    { url: base + '/sss', lastModified: new Date() },
  ]
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


