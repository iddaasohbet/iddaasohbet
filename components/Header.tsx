'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Trophy, User, Search, Menu, Flame, LogOut, Settings, LayoutDashboard, ArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Header() {
  const { data: session, status } = useSession()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

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

      {/* Mobile Menu - Fullscreen Overlay */}
      <div className={`fixed inset-0 bg-neutral-950 text-white z-[9999] md:hidden transform transition-transform duration-300 ease-out ${
        showMobileMenu ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Menu Header */}
          <div className="p-6 border-b border-white/10 bg-neutral-950">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Trophy className="h-6 w-6 text-green-400" />
                <span className="text-xl font-bold gradient-text">İddaaSohbet</span>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setShowMobileMenu(false)}
                className="hover:bg-white/5"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </div>
            {session && (
              <div className="flex items-center space-x-3 p-3 bg-slate-800 rounded-lg">
                <Avatar className="h-10 w-10 border-2 border-green-500/50">
                  <AvatarImage src={session.user?.image || ''} alt={session.user?.name || ''} />
                  <AvatarFallback className="bg-gradient-to-br from-green-500 to-yellow-400 text-black font-bold">
                    {session.user?.name?.charAt(0).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{session.user?.name}</p>
                  <p className="text-xs text-green-400 truncate">@{session.user?.username}</p>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto p-6 space-y-2">
            <Link href="/" onClick={() => setShowMobileMenu(false)}>
              <Button variant="ghost" className="w-full justify-start h-12 rounded-lg bg-slate-800 hover:bg-slate-700 text-white">
                Ana Sayfa
              </Button>
            </Link>
            <Link href="/kuponlar" onClick={() => setShowMobileMenu(false)}>
              <Button variant="ghost" className="w-full justify-start h-12 rounded-lg bg-slate-800 hover:bg-slate-700 text-white">
                <Flame className="h-5 w-5 mr-3 text-orange-500" />
                Kuponlar
              </Button>
            </Link>
            <Link href="/tahmincilar" onClick={() => setShowMobileMenu(false)}>
              <Button variant="ghost" className="w-full justify-start h-12 rounded-lg bg-slate-800 hover:bg-slate-700 text-white">
                Tahmincilar
              </Button>
            </Link>
            <Link href="/istatistikler" onClick={() => setShowMobileMenu(false)}>
              <Button variant="ghost" className="w-full justify-start h-12 rounded-lg bg-slate-800 hover:bg-slate-700 text-white">
                İstatistikler
              </Button>
            </Link>

            {session && (
              <>
                <div className="border-t border-white/10 my-4"></div>
                <Link href={`/profil/${session.user?.username}`} onClick={() => setShowMobileMenu(false)}>
                  <Button variant="ghost" className="w-full justify-start h-12 rounded-lg bg-slate-800 hover:bg-slate-700 text-white">
                    <User className="h-5 w-5 mr-3" />
                    Profilim
                  </Button>
                </Link>
                <Link href="/hesap/ayarlar" onClick={() => setShowMobileMenu(false)}>
                  <Button variant="ghost" className="w-full justify-start h-12 rounded-lg bg-slate-800 hover:bg-slate-700 text-white">
                    <Settings className="h-5 w-5 mr-3" />
                    Ayarlar
                  </Button>
                </Link>
                {session.user?.role === 'ADMIN' && (
                  <Link href="/admin/dashboard" onClick={() => setShowMobileMenu(false)}>
                    <Button variant="ghost" className="w-full justify-start text-yellow-400 hover:bg-yellow-400/10 h-12">
                      <LayoutDashboard className="h-5 w-5 mr-3" />
                      Admin Panel
                    </Button>
                  </Link>
                )}
              </>
            )}
          </nav>

          {/* Bottom Actions */}
          <div className="p-6 border-t border-white/10 space-y-3">
            {!session ? (
              <>
                <Link href="/giris" onClick={() => setShowMobileMenu(false)}>
                  <Button variant="outline" className="w-full border-white/10 hover:border-green-500/50 hover:bg-green-500/10 hover:text-green-400 h-12 text-white/90">
                    Giriş Yap
                  </Button>
                </Link>
                <Link href="/kayit" onClick={() => setShowMobileMenu(false)}>
                  <Button className="w-full bg-gradient-to-r from-green-500 to-yellow-400 hover:from-green-600 hover:to-yellow-500 text-black font-semibold h-12">
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
                className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10 h-12 text-white/90"
              >
                <LogOut className="h-5 w-5 mr-3" />
                Çıkış Yap
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* No separate backdrop needed; fullscreen menu covers it. */}
    </header>
  )
}