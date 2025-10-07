import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import SessionProvider from '@/components/SessionProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://iddaasohbet.com'),
  title: {
    default: 'İddaaSohbet | Ücretsiz İddaa Tahminleri, Banko Kuponlar, Canlı Skorlar',
    template: '%s | İddaaSohbet'
  },
  description:
    'Ücretsiz iddaa tahminleri, banko kuponlar, canlı maç skorları ve tahminci istatistikleri. Kupon paylaş, kazananlar arasına katıl!',
  keywords: [
    'iddaa', 'iddaa tahmin', 'iddaa tahminleri', 'banko kupon', 'ücretsiz kupon',
    'canlı maç skorları', 'bahis tahminleri', 'spor bahisleri'
  ],
  alternates: {
    canonical: 'https://iddaasohbet.com'
  },
  openGraph: {
    type: 'website',
    url: 'https://iddaasohbet.com',
    siteName: 'İddaaSohbet',
    title: 'İddaaSohbet | Ücretsiz İddaa Tahminleri, Banko Kuponlar, Canlı Skorlar',
    description:
      'Ücretsiz iddaa tahminleri, banko kuponlar, canlı maç skorları ve tahminci istatistikleri.',
    images: [
      { url: '/og-image.png', width: 1200, height: 630, alt: 'İddaaSohbet' }
    ],
    locale: 'tr_TR'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'İddaaSohbet',
    description: 'Ücretsiz iddaa tahminleri, banko kuponlar ve canlı skorlar',
    images: ['/og-image.png']
  },
  icons: { icon: '/icon' }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={inter.className}>
        {/* JSON-LD Organization + WebSite + SearchAction */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'İddaaSohbet',
              url: 'https://iddaasohbet.com',
              logo: 'https://iddaasohbet.com/icon',
              sameAs: []
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'İddaaSohbet',
              url: 'https://iddaasohbet.com',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://iddaasohbet.com/kuponlar?q={search_term_string}',
                'query-input': 'required name=search_term_string'
              }
            }),
          }}
        />
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}