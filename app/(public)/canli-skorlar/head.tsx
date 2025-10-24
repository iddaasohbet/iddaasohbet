import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Canlı Maç Skorları | İddaaSohbet',
  description: 'Canlı maç skorları, dakika ve durum bilgisi. Gol anında öne çıkan ve yanıp sönen bildirimler.'
}

export default function Head() {
  return (
    <>
      <link rel="manifest" href="/manifest.webmanifest" />
      <meta name="theme-color" content="#16a34a" />
      <link rel="apple-touch-icon" href="/globe.svg" />
    </>
  )
}






