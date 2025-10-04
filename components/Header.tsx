'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Trophy, User, Search, Menu, Flame } from 'lucide-react'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-white/5">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo with Neon Effect */}
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="relative">
            <Trophy className="h-8 w-8 text-green-500 group-hover:text-yellow-400 transition-all duration-300" />
            <div className="absolute inset-0 bg-green-500 blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
          </div>
          <span className="text-2xl font-bold">
            <span className="gradient-text neon-text-green">İddaa</span>
            <span className="text-yellow-400 neon-text-yellow">Sohbet</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <Link href="/">
            <Button variant="ghost" className="text-foreground/80 hover:text-green-400 hover:bg-white/5 transition-all">
              Ana Sayfa
            </Button>
          </Link>
          <Link href="/kuponlar">
            <Button variant="ghost" className="text-foreground/80 hover:text-green-400 hover:bg-white/5 transition-all">
              <Flame className="h-4 w-4 mr-1 text-orange-500" />
              Kuponlar
            </Button>
          </Link>
          <Link href="/tahmincilar">
            <Button variant="ghost" className="text-foreground/80 hover:text-green-400 hover:bg-white/5 transition-all">
              Tahmincilar
            </Button>
          </Link>
          <Link href="/istatistikler">
            <Button variant="ghost" className="text-foreground/80 hover:text-green-400 hover:bg-white/5 transition-all">
              İstatistikler
            </Button>
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="hidden md:flex hover:bg-white/5 hover:text-green-400 transition-all"
          >
            <Search className="h-5 w-5" />
          </Button>
          
          <Link href="/giris">
            <Button 
              variant="outline" 
              className="border-white/10 hover:border-green-500/50 hover:bg-green-500/10 hover:text-green-400 transition-all"
            >
              Giriş Yap
            </Button>
          </Link>
          <Link href="/kayit">
            <Button className="hidden sm:flex bg-gradient-to-r from-green-500 to-yellow-400 hover:from-green-600 hover:to-yellow-500 text-black font-semibold btn-premium">
              Kayıt Ol
            </Button>
          </Link>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden hover:bg-white/5"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}