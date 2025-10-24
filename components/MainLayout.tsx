'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Header from '@/components/Header'
import CookieConsent from '@/components/CookieConsent'
import { Trophy, Mail, Twitter, Instagram, MessageCircle, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdminPage = pathname?.startsWith('/admin')

  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {})
    }
  }, [])

  if (isAdminPage) {
    return <>{children}</>
  }

  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <CookieConsent />
      
      {/* Premium Footer */}
      <footer className="relative border-t border-white/5 py-16 mt-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 grid-pattern opacity-50"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Brand Column */}
            <div>
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <Trophy className="h-8 w-8 text-green-400" />
                <div>
                  <span className="text-2xl font-bold gradient-text block">İddaa</span>
                  <span className="text-2xl font-bold text-yellow-400 block">Sohbet</span>
                </div>
              </Link>
              <p className="text-sm text-foreground/60 mb-4">
                Türkiye'nin en büyük iddaa kupon paylaşım platformu
              </p>
              <div className="flex items-center space-x-3">
                <a href="#" className="h-9 w-9 rounded-lg glass border border-white/10 flex items-center justify-center hover:border-green-500/50 hover:bg-green-500/10 transition-all">
                  <Twitter className="h-4 w-4 text-foreground/70" />
                </a>
                <a href="#" className="h-9 w-9 rounded-lg glass border border-white/10 flex items-center justify-center hover:border-green-500/50 hover:bg-green-500/10 transition-all">
                  <Instagram className="h-4 w-4 text-foreground/70" />
                </a>
                <a href="#" className="h-9 w-9 rounded-lg glass border border-white/10 flex items-center justify-center hover:border-green-500/50 hover:bg-green-500/10 transition-all">
                  <MessageCircle className="h-4 w-4 text-foreground/70" />
                </a>
              </div>
            </div>

            {/* Platform Column */}
            <div>
              <h4 className="font-bold text-lg mb-4 text-green-400">Platform</h4>
              <ul className="space-y-3 text-sm text-foreground/60">
                <li><a href="/" className="hover:text-green-400 transition-colors">Ana Sayfa</a></li>
                <li><a href="/kuponlar" className="hover:text-green-400 transition-colors">Kuponlar</a></li>
                <li><a href="/tahmincilar" className="hover:text-green-400 transition-colors">Tahmincilar</a></li>
                <li><a href="/istatistikler" className="hover:text-green-400 transition-colors">İstatistikler</a></li>
              </ul>
            </div>

            {/* Hakkında Column */}
            <div>
              <h4 className="font-bold text-lg mb-4 text-green-400">Hakkında</h4>
              <ul className="space-y-3 text-sm text-foreground/60">
                <li><a href="/hakkimizda" className="hover:text-green-400 transition-colors">Hakkımızda</a></li>
                <li><a href="/iletisim" className="hover:text-green-400 transition-colors">İletişim</a></li>
                <li><a href="/sss" className="hover:text-green-400 transition-colors">SSS</a></li>
                <li><a href="/blog" className="hover:text-green-400 transition-colors">Blog</a></li>
              </ul>
            </div>

            {/* Yasal Column */}
            <div>
              <h4 className="font-bold text-lg mb-4 text-green-400">Yasal</h4>
              <ul className="space-y-3 text-sm text-foreground/60">
                <li><a href="/kullanim-kosullari" className="hover:text-green-400 transition-colors">Kullanım Koşulları</a></li>
                <li><a href="/gizlilik" className="hover:text-green-400 transition-colors">Gizlilik Politikası</a></li>
                <li><a href="/cerez-politikasi" className="hover:text-green-400 transition-colors">Çerez Politikası</a></li>
                <li><a href="/sorumluluk" className="hover:text-green-400 transition-colors">Sorumluluk Reddi</a></li>
                <li><a href="/kvkk" className="hover:text-green-400 transition-colors">KVKK</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="pt-8 border-t border-white/5">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-sm text-foreground/60 text-center md:text-left">
                © 2025 İddaaSohbet. Tüm hakları saklıdır.
              </p>
            </div>
            <div className="mt-4 glass-dark p-4 rounded-lg border border-yellow-400/20">
              <p className="text-xs text-center text-yellow-400 font-medium">
                ⚠️ 18 yaş altındaki kişilerin bahis oynamaması gerekmektedir. Kumar bağımlılığı yapabilir. Sorumlu oyun önemlidir.
              </p>
            </div>
            <div className="mt-6 flex justify-center">
              <a
                href="https://cihatsoft.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Siteyi geliştiren: cihatsoft.com"
                className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
              >
                <Sparkles className="h-4 w-4 text-yellow-400 group-hover:scale-110 transition-transform" aria-hidden="true" />
                <span className="text-xs text-foreground/70">Geliştiren</span>
                <span className="text-sm font-semibold bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">cihatsoft.com</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}





