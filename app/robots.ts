import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/canli-skorlar', '/kuponlar', '/tahmincilar', '/istatistikler'],
        disallow: ['/admin', '/api']
      }
    ],
    sitemap: 'https://iddaasohbet.com/sitemap.xml'
  }
}


