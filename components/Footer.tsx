import { Trophy, Twitter, Instagram, MessageCircle, Bot } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
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
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold gradient-text">İddaa</span>
                <span className="text-2xl font-bold text-yellow-400">Sohbet</span>
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
              <li><Link href="/" className="hover:text-green-400 transition-colors">Ana Sayfa</Link></li>
              <li><Link href="/kuponlar" className="hover:text-green-400 transition-colors">Kuponlar</Link></li>
              <li><Link href="/tahmincilar" className="hover:text-green-400 transition-colors">Tahmincilar</Link></li>
              <li><Link href="/istatistikler" className="hover:text-green-400 transition-colors">İstatistikler</Link></li>
            </ul>
          </div>

          {/* Hakkında Column */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-green-400">Hakkında</h4>
            <ul className="space-y-3 text-sm text-foreground/60">
              <li><Link href="/hakkimizda" className="hover:text-green-400 transition-colors">Hakkımızda</Link></li>
              <li><Link href="/iletisim" className="hover:text-green-400 transition-colors">İletişim</Link></li>
              <li><Link href="/sss" className="hover:text-green-400 transition-colors">SSS</Link></li>
              <li><Link href="/blog" className="hover:text-green-400 transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Yasal Column */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-green-400">Yasal</h4>
            <ul className="space-y-3 text-sm text-foreground/60">
              <li><Link href="/kullanim-kosullari" className="hover:text-green-400 transition-colors">Kullanım Koşulları</Link></li>
              <li><Link href="/gizlilik" className="hover:text-green-400 transition-colors">Gizlilik Politikası</Link></li>
              <li><Link href="/cerez-politikasi" className="hover:text-green-400 transition-colors">Çerez Politikası</Link></li>
              <li><Link href="/sorumluluk" className="hover:text-green-400 transition-colors">Sorumluluk Reddi</Link></li>
              <li><Link href="/kvkk" className="hover:text-green-400 transition-colors">KVKK</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-foreground/60 text-center md:text-left">
              © 2025 İddaaSohbet. Tüm hakları saklıdır.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs text-foreground/60">15,423 aktif kullanıcı</span>
              </div>
              <a href="/sohbet" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-wide text-foreground/70 hover:text-white hover:border-green-500/40 hover:bg-green-500/10 transition-colors">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-ping"></span>
                <Bot className="h-3 w-3 text-green-400" />
                <span>Canlı Bot Aktif</span>
              </a>
            </div>
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
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-foreground/70 hover:text-white hover:border-green-500/40 hover:bg-green-500/10 transition-colors"
            >
              <Trophy className="h-3 w-3 text-green-400 group-hover:scale-110 transition-transform" />
              <span>Siteyi yapan</span>
              <span className="font-semibold text-foreground/90 group-hover:text-green-400">cihatsoft.com</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}





