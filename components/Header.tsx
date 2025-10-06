'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Trophy, User, Search, Menu, Flame, LogOut, Settings, LayoutDashboard, ArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export default function Header() {
  const { data: session, status } = useSession()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' })
  }
  
  // Prevent page scroll while mobile drawer is open
  useEffect(() => {
    if (showMobileMenu) {
      document?.body?.classList?.add('overflow-hidden')
    } else {
      document?.body?.classList?.remove('overflow-hidden')
    }
    return () => document?.body?.classList?.remove('overflow-hidden')
  }, [showMobileMenu])
  useEffect(() => { setIsMounted(true) }, [])
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
          
          {status === 'loading' ? (
            <div className="h-8 w-8 rounded-full animate-pulse bg-white/10"></div>
          ) : session ? (
            // Giriş yapmış kullanıcı
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 hover:bg-white/5 rounded-lg px-3 py-2 transition-all"
              >
                <Avatar className="h-8 w-8 border-2 border-green-500/50">
                  <AvatarImage src={session.user?.image || ''} alt={session.user?.name || ''} />
                  <AvatarFallback className="bg-gradient-to-br from-green-500 to-yellow-400 text-black font-bold">
                    {session.user?.name?.charAt(0).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden md:block text-sm font-medium">{session.user?.name}</span>
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowUserMenu(false)}
                  ></div>
                  <div className="absolute right-0 top-12 w-56 glass-dark border border-white/10 rounded-lg shadow-2xl z-50 overflow-hidden">
                    <div className="p-4 border-b border-white/10">
                      <p className="text-sm font-semibold">{session.user?.name}</p>
                      <p className="text-xs text-foreground/60 truncate">{session.user?.email}</p>
                      <p className="text-xs text-green-400 mt-1">@{session.user?.username}</p>
                    </div>
                    <div className="py-2">
                      <Link href={`/profil/${session.user?.username}`}>
                        <button className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-white/5 transition-all text-left">
                          <User className="h-4 w-4 text-foreground/70" />
                          <span className="text-sm">Profilim</span>
                        </button>
                      </Link>
                      <Link href="/ayarlar">
                        <button className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-white/5 transition-all text-left">
                          <Settings className="h-4 w-4 text-foreground/70" />
                          <span className="text-sm">Ayarlar</span>
                        </button>
                      </Link>
                      {session.user?.role === 'ADMIN' && (
                        <Link href="/admin/dashboard">
                          <button className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-white/5 transition-all text-left border-t border-white/10">
                            <LayoutDashboard className="h-4 w-4 text-yellow-400" />
                            <span className="text-sm text-yellow-400 font-semibold">Admin Panel</span>
                          </button>
                        </Link>
                      )}
                    </div>
                    <div className="border-t border-white/10">
                      <button 
                        onClick={handleSignOut}
                        className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-red-500/10 transition-all text-left text-red-400"
                      >
                        <LogOut className="h-4 w-4" />
                        <span className="text-sm font-medium">Çıkış Yap</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            // Giriş yapmamış kullanıcı
            <>
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
            </>
          )}
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden hover:bg-white/5"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Mobile Menu moved outside container */}
      </div>

      {/* Mobile Menu - Premium Fullscreen Overlay via Portal */}
      {isMounted && createPortal(
        <div className={`fixed inset-0 glass-dark backdrop-blur-xl z-[9999] md:hidden transform transition-all duration-500 ease-out ${
          showMobileMenu ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}>
          <div className="flex flex-col h-full">
            {/* Premium Menu Header with Gradient */}
            <div className="p-6 border-b border-green-500/20 bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-slate-900/95">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Trophy className="h-7 w-7 text-green-400" />
                    <div className="absolute inset-0 bg-green-500 blur-lg opacity-40"></div>
                  </div>
                  <span className="text-2xl font-bold">
                    <span className="gradient-text neon-text-green">İddaa</span>
                    <span className="text-yellow-400 neon-text-yellow">Sohbet</span>
                  </span>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setShowMobileMenu(false)}
                  className="hover:bg-white/10 hover:text-green-400 transition-all duration-300 rounded-full"
                >
                  <ArrowLeft className="h-6 w-6" />
                </Button>
              </div>
              {session && (
                <div className="flex items-center space-x-3 p-4 glass rounded-xl border border-green-500/20 hover:border-green-500/40 transition-all duration-300">
                  <Avatar className="h-12 w-12 border-2 border-green-500/50 ring-2 ring-green-500/20">
                    <AvatarImage src={session.user?.image || ''} alt={session.user?.name || ''} />
                    <AvatarFallback className="bg-gradient-to-br from-green-500 to-yellow-400 text-black font-bold text-lg">
                      {session.user?.name?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-bold truncate text-white">{session.user?.name}</p>
                    <p className="text-sm text-green-400 truncate font-medium">@{session.user?.username}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Premium Navigation Links with Icons */}
            <nav className="flex-1 overflow-y-auto p-6 space-y-3 bg-gradient-to-b from-slate-900/50 to-black/50">
              <Link href="/" onClick={() => setShowMobileMenu(false)}>
                <div className="group relative overflow-hidden rounded-xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Button variant="ghost" className="w-full justify-start h-14 text-base font-semibold glass border border-white/5 hover:border-green-500/30 hover:text-green-400 transition-all duration-300">
                    Ana Sayfa
                  </Button>
                </div>
              </Link>
              <Link href="/kuponlar" onClick={() => setShowMobileMenu(false)}>
                <div className="group relative overflow-hidden rounded-xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Button variant="ghost" className="w-full justify-start h-14 text-base font-semibold glass border border-white/5 hover:border-orange-500/30 hover:text-orange-400 transition-all duration-300">
                    <Flame className="h-5 w-5 mr-3 text-orange-500 group-hover:scale-110 transition-transform duration-300" />
                    Kuponlar
                  </Button>
                </div>
              </Link>
              <Link href="/tahmincilar" onClick={() => setShowMobileMenu(false)}>
                <div className="group relative overflow-hidden rounded-xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Button variant="ghost" className="w-full justify-start h-14 text-base font-semibold glass border border-white/5 hover:border-blue-500/30 hover:text-blue-400 transition-all duration-300">
                    Tahmincilar
                  </Button>
                </div>
              </Link>
              <Link href="/istatistikler" onClick={() => setShowMobileMenu(false)}>
                <div className="group relative overflow-hidden rounded-xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Button variant="ghost" className="w-full justify-start h-14 text-base font-semibold glass border border-white/5 hover:border-purple-500/30 hover:text-purple-400 transition-all duration-300">
                    İstatistikler
                  </Button>
                </div>
              </Link>

              {session && (
                <>
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gradient-to-r from-transparent via-green-500/30 to-transparent"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-slate-900 px-3 text-green-400/70 font-semibold">Hesabım</span>
                    </div>
                  </div>
                  <Link href={`/profil/${session.user?.username}`} onClick={() => setShowMobileMenu(false)}>
                    <div className="group relative overflow-hidden rounded-xl">
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <Button variant="ghost" className="w-full justify-start h-14 text-base font-semibold glass border border-white/5 hover:border-green-500/30 hover:text-green-400 transition-all duration-300">
                        <User className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
                        Profilim
                      </Button>
                    </div>
                  </Link>
                  <Link href="/hesap/ayarlar" onClick={() => setShowMobileMenu(false)}>
                    <div className="group relative overflow-hidden rounded-xl">
                      <div className="absolute inset-0 bg-gradient-to-r from-slate-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <Button variant="ghost" className="w-full justify-start h-14 text-base font-semibold glass border border-white/5 hover:border-slate-500/30 hover:text-slate-300 transition-all duration-300">
                        <Settings className="h-5 w-5 mr-3 group-hover:rotate-90 transition-transform duration-300" />
                        Ayarlar
                      </Button>
                    </div>
                  </Link>
                  {session.user?.role === 'ADMIN' && (
                    <Link href="/admin/dashboard" onClick={() => setShowMobileMenu(false)}>
                      <div className="group relative overflow-hidden rounded-xl">
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <Button variant="ghost" className="w-full justify-start h-14 text-base font-semibold glass border border-yellow-500/20 hover:border-yellow-500/40 text-yellow-400 hover:text-yellow-300 transition-all duration-300">
                          <LayoutDashboard className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
                          Admin Panel
                        </Button>
                      </div>
                    </Link>
                  )}
                </>
              )}
            </nav>

            {/* Premium Bottom Actions */}
            <div className="p-6 border-t border-green-500/20 space-y-3 bg-gradient-to-t from-slate-900/95 to-slate-800/95">
              {!session ? (
                <>
                  <Link href="/giris" onClick={() => setShowMobileMenu(false)}>
                    <Button variant="outline" className="w-full h-14 text-base font-semibold border-white/10 hover:border-green-500/50 hover:bg-green-500/10 hover:text-green-400 transition-all duration-300 rounded-xl">
                      Giriş Yap
                    </Button>
                  </Link>
                  <Link href="/kayit" onClick={() => setShowMobileMenu(false)}>
                    <Button className="w-full h-14 text-base font-bold bg-gradient-to-r from-green-500 to-yellow-400 hover:from-green-600 hover:to-yellow-500 text-black shadow-lg shadow-green-500/20 hover:shadow-green-500/40 transition-all duration-300 rounded-xl btn-premium">
                      Kayıt Ol
                    </Button>
                  </Link>
                </>
              ) : (
                <Button 
                  onClick={() => {
                    setShowMobileMenu(false)
                    handleSignOut()
                  }}
                  variant="outline"
                  className="w-full h-14 text-base font-semibold border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50 transition-all duration-300 rounded-xl"
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  Çıkış Yap
                </Button>
              )}
            </div>
          </div>
        </div>, document.body)}

      {/* No separate backdrop needed; fullscreen menu covers it. */}
    </header>
  )
}