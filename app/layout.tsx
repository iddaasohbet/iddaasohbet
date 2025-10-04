import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'İddaaSohbet - Türkiye\'nin En İyi İddaa Kupon Paylaşım Platformu',
  description: 'İddaa kuponlarını paylaş, diğer kullanıcıların kuponlarını incele, başarılı tahminciları takip et ve kazananlar arasına katıl!',
  keywords: 'iddaa, kupon paylaşımı, iddaa tahminleri, bahis, spor bahisleri',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}