'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Trophy, User, Search, Menu, Flame, LogOut, Settings, LayoutDashboard, X, Home, BarChart3, Users, Radio } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { usePathname } from 'next/navigation'
import LiveLeagues from './LiveLeagues'

export default function Header() {
  const { data: session, status } = useSession()
  const pathname = usePathname()
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
    <>
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
          <Link href="/canli-skorlar">
            <Button variant="ghost" className="text-foreground/80 hover:text-green-400 hover:bg-white/5 transition-all relative">
              <Radio className="h-4 w-4 mr-1 text-red-500" />
              <span className="relative">
                Canlı Skorlar
                <span className="absolute -top-1 -right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
              </span>
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
            className="md:hidden hover:bg-white/5 relative"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <div className="relative w-5 h-5">
              <span className={`absolute inset-0 transition-all duration-300 ${showMobileMenu ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}`}>
                <Menu className="h-5 w-5" />
              </span>
              <span className={`absolute inset-0 transition-all duration-300 ${showMobileMenu ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}`}>
                <X className="h-5 w-5" />
              </span>
            </div>
          </Button>
        </div>

        {/* Mobile Menu moved outside container */}
      </div>

      {/* Mobile Menu - Ultra Premium Redesign with Cascade Animation */}
      {isMounted && createPortal(
        <div className={`fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-black backdrop-blur-2xl z-[9999] md:hidden transition-all duration-500 ease-out ${
          showMobileMenu ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
          <div className="flex flex-col h-full relative overflow-hidden">
            {/* Animated Background Orbs */}
            <div className="absolute top-20 -right-20 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 -left-20 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
            
            {/* Ultra Premium Header */}
            <div className={`p-8 border-b border-green-500/30 relative transition-all duration-700 ${showMobileMenu ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-green-500 blur-xl opacity-50 animate-pulse"></div>
                    <Trophy className="h-8 w-8 text-green-400 relative z-10" />
                  </div>
                  <div>
                    <span className="text-3xl font-black block">
                      <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">İddaa</span>
                      <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Sohbet</span>
                    </span>
                    <span className="text-xs text-green-400/60 font-medium">Premium Tahmin Platformu</span>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setShowMobileMenu(false)}
                  className="hover:bg-green-500/20 hover:text-green-400 transition-all duration-300 rounded-full h-12 w-12 border border-green-500/20"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
              {session && (
                <div className={`flex items-center space-x-4 p-4 bg-gradient-to-r from-slate-800/80 to-slate-900/80 rounded-2xl border border-green-500/30 backdrop-blur-xl shadow-lg shadow-green-500/10 transition-all duration-700 delay-100 ${showMobileMenu ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
                  <Avatar className="h-14 w-14 border-2 border-green-500/60 ring-4 ring-green-500/20">
                    <AvatarImage src={session.user?.image || ''} alt={session.user?.name || ''} />
                    <AvatarFallback className="bg-gradient-to-br from-green-500 to-yellow-400 text-black font-black text-xl">
                      {session.user?.name?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-lg font-black truncate text-white">{session.user?.name}</p>
                    <p className="text-sm text-green-400 truncate font-semibold">@{session.user?.username}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Ultra Premium Navigation with Cascade & Active States */}
            <nav className="flex-1 overflow-y-auto p-8 space-y-4 relative">
              {/* Ana Sayfa */}
              <Link href="/" onClick={() => setShowMobileMenu(false)}>
                <div className={`group relative overflow-hidden rounded-2xl transition-all duration-700 ${showMobileMenu ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`} style={{transitionDelay: '200ms'}}>
                  <div className={`absolute inset-0 bg-gradient-to-r from-green-500/20 to-green-600/5 transition-opacity duration-300 ${pathname === '/' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
                  <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-green-400 to-green-600 transition-all duration-300 ${pathname === '/' ? 'opacity-100' : 'opacity-0'}`}></div>
                  <Button variant="ghost" className={`w-full justify-start h-16 text-lg font-bold backdrop-blur-xl border transition-all duration-300 ${pathname === '/' ? 'border-green-500/50 text-green-400 bg-green-500/10' : 'border-white/10 text-white/90 hover:border-green-500/30 hover:text-green-400'}`}>
                    <Home className={`h-6 w-6 mr-4 transition-transform duration-300 ${pathname === '/' ? 'scale-110' : 'group-hover:scale-110'}`} />
                    Ana Sayfa
                  </Button>
                </div>
              </Link>

              {/* Kuponlar */}
              <Link href="/kuponlar" onClick={() => setShowMobileMenu(false)}>
                <div className={`group relative overflow-hidden rounded-2xl transition-all duration-700 ${showMobileMenu ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`} style={{transitionDelay: '300ms'}}>
                  <div className={`absolute inset-0 bg-gradient-to-r from-orange-500/20 to-orange-600/5 transition-opacity duration-300 ${pathname === '/kuponlar' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
                  <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-400 to-orange-600 transition-all duration-300 ${pathname === '/kuponlar' ? 'opacity-100' : 'opacity-0'}`}></div>
                  <Button variant="ghost" className={`w-full justify-start h-16 text-lg font-bold backdrop-blur-xl border transition-all duration-300 ${pathname === '/kuponlar' ? 'border-orange-500/50 text-orange-400 bg-orange-500/10' : 'border-white/10 text-white/90 hover:border-orange-500/30 hover:text-orange-400'}`}>
                    <Flame className={`h-6 w-6 mr-4 transition-transform duration-300 ${pathname === '/kuponlar' ? 'scale-110' : 'group-hover:scale-110'}`} />
                    Kuponlar
                  </Button>
                </div>
              </Link>

              {/* Canlı Skorlar */}
              <Link href="/canli-skorlar" onClick={() => setShowMobileMenu(false)}>
                <div className={`group relative overflow-hidden rounded-2xl transition-all duration-700 ${showMobileMenu ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`} style={{transitionDelay: '400ms'}}>
                  <div className={`absolute inset-0 bg-gradient-to-r from-red-500/20 to-red-600/5 transition-opacity duration-300 ${pathname === '/canli-skorlar' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
                  <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-400 to-red-600 transition-all duration-300 ${pathname === '/canli-skorlar' ? 'opacity-100' : 'opacity-0'}`}></div>
                  <Button variant="ghost" className={`w-full justify-start h-16 text-lg font-bold backdrop-blur-xl border transition-all duration-300 ${pathname === '/canli-skorlar' ? 'border-red-500/50 text-red-400 bg-red-500/10' : 'border-white/10 text-white/90 hover:border-red-500/30 hover:text-red-400'}`}>
                    <Radio className={`h-6 w-6 mr-4 transition-transform duration-300 ${pathname === '/canli-skorlar' ? 'scale-110 animate-pulse' : 'group-hover:scale-110'}`} />
                    <span className="relative">
                      Canlı Skorlar
                      <span className="absolute -top-1 -right-1 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                      </span>
                    </span>
                  </Button>
                </div>
              </Link>

              {/* Tahmincilar */}
              <Link href="/tahmincilar" onClick={() => setShowMobileMenu(false)}>
                <div className={`group relative overflow-hidden rounded-2xl transition-all duration-700 ${showMobileMenu ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`} style={{transitionDelay: '500ms'}}>
                  <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/20 to-blue-600/5 transition-opacity duration-300 ${pathname === '/tahmincilar' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
                  <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-blue-600 transition-all duration-300 ${pathname === '/tahmincilar' ? 'opacity-100' : 'opacity-0'}`}></div>
                  <Button variant="ghost" className={`w-full justify-start h-16 text-lg font-bold backdrop-blur-xl border transition-all duration-300 ${pathname === '/tahmincilar' ? 'border-blue-500/50 text-blue-400 bg-blue-500/10' : 'border-white/10 text-white/90 hover:border-blue-500/30 hover:text-blue-400'}`}>
                    <Users className={`h-6 w-6 mr-4 transition-transform duration-300 ${pathname === '/tahmincilar' ? 'scale-110' : 'group-hover:scale-110'}`} />
                    Tahmincilar
                  </Button>
                </div>
              </Link>

              {/* İstatistikler */}
              <Link href="/istatistikler" onClick={() => setShowMobileMenu(false)}>
                <div className={`group relative overflow-hidden rounded-2xl transition-all duration-700 ${showMobileMenu ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`} style={{transitionDelay: '600ms'}}>
                  <div className={`absolute inset-0 bg-gradient-to-r from-purple-500/20 to-purple-600/5 transition-opacity duration-300 ${pathname === '/istatistikler' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
                  <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-400 to-purple-600 transition-all duration-300 ${pathname === '/istatistikler' ? 'opacity-100' : 'opacity-0'}`}></div>
                  <Button variant="ghost" className={`w-full justify-start h-16 text-lg font-bold backdrop-blur-xl border transition-all duration-300 ${pathname === '/istatistikler' ? 'border-purple-500/50 text-purple-400 bg-purple-500/10' : 'border-white/10 text-white/90 hover:border-purple-500/30 hover:text-purple-400'}`}>
                    <BarChart3 className={`h-6 w-6 mr-4 transition-transform duration-300 ${pathname === '/istatistikler' ? 'scale-110' : 'group-hover:scale-110'}`} />
                    İstatistikler
                  </Button>
                </div>
              </Link>

              {session && (
                <>
                  {/* Divider */}
                  <div className={`relative my-8 transition-all duration-700 ${showMobileMenu ? 'opacity-100' : 'opacity-0'}`} style={{transitionDelay: '600ms'}}>
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full h-px bg-gradient-to-r from-transparent via-green-500/40 to-transparent"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="bg-slate-950 px-4 py-1 text-xs uppercase tracking-wider text-green-400/80 font-black border border-green-500/20 rounded-full">Hesabım</span>
                    </div>
                  </div>

                  {/* Profilim */}
                  <Link href={`/profil/${session.user?.username}`} onClick={() => setShowMobileMenu(false)}>
                    <div className={`group relative overflow-hidden rounded-2xl transition-all duration-700 ${showMobileMenu ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`} style={{transitionDelay: '700ms'}}>
                      <div className={`absolute inset-0 bg-gradient-to-r from-green-500/20 to-green-600/5 transition-opacity duration-300 ${pathname?.includes('/profil') ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
                      <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-green-400 to-green-600 transition-all duration-300 ${pathname?.includes('/profil') ? 'opacity-100' : 'opacity-0'}`}></div>
                      <Button variant="ghost" className={`w-full justify-start h-16 text-lg font-bold backdrop-blur-xl border transition-all duration-300 ${pathname?.includes('/profil') ? 'border-green-500/50 text-green-400 bg-green-500/10' : 'border-white/10 text-white/90 hover:border-green-500/30 hover:text-green-400'}`}>
                        <User className={`h-6 w-6 mr-4 transition-transform duration-300 ${pathname?.includes('/profil') ? 'scale-110' : 'group-hover:scale-110'}`} />
                        Profilim
                      </Button>
                    </div>
                  </Link>

                  {/* Ayarlar */}
                  <Link href="/hesap/ayarlar" onClick={() => setShowMobileMenu(false)}>
                    <div className={`group relative overflow-hidden rounded-2xl transition-all duration-700 ${showMobileMenu ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`} style={{transitionDelay: '800ms'}}>
                      <div className={`absolute inset-0 bg-gradient-to-r from-slate-500/20 to-slate-600/5 transition-opacity duration-300 ${pathname?.includes('/ayarlar') ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
                      <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-slate-400 to-slate-600 transition-all duration-300 ${pathname?.includes('/ayarlar') ? 'opacity-100' : 'opacity-0'}`}></div>
                      <Button variant="ghost" className={`w-full justify-start h-16 text-lg font-bold backdrop-blur-xl border transition-all duration-300 ${pathname?.includes('/ayarlar') ? 'border-slate-500/50 text-slate-300 bg-slate-500/10' : 'border-white/10 text-white/90 hover:border-slate-500/30 hover:text-slate-300'}`}>
                        <Settings className={`h-6 w-6 mr-4 transition-transform duration-500 ${pathname?.includes('/ayarlar') ? 'rotate-90 scale-110' : 'group-hover:rotate-90 group-hover:scale-110'}`} />
                        Ayarlar
                      </Button>
                    </div>
                  </Link>

                  {/* Admin Panel */}
                  {session.user?.role === 'ADMIN' && (
                    <Link href="/admin/dashboard" onClick={() => setShowMobileMenu(false)}>
                      <div className={`group relative overflow-hidden rounded-2xl transition-all duration-700 ${showMobileMenu ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`} style={{transitionDelay: '900ms'}}>
                        <div className={`absolute inset-0 bg-gradient-to-r from-yellow-500/30 to-yellow-600/10 transition-opacity duration-300 ${pathname?.includes('/admin') ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
                        <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-400 to-yellow-600 transition-all duration-300 ${pathname?.includes('/admin') ? 'opacity-100' : 'opacity-0'}`}></div>
                        <Button variant="ghost" className={`w-full justify-start h-16 text-lg font-bold backdrop-blur-xl border transition-all duration-300 ${pathname?.includes('/admin') ? 'border-yellow-500/60 text-yellow-300 bg-yellow-500/20 shadow-lg shadow-yellow-500/20' : 'border-yellow-500/30 text-yellow-400 hover:border-yellow-500/50 hover:text-yellow-300'}`}>
                          <LayoutDashboard className={`h-6 w-6 mr-4 transition-transform duration-300 ${pathname?.includes('/admin') ? 'scale-110' : 'group-hover:scale-110'}`} />
                          Admin Panel
                        </Button>
                      </div>
                    </Link>
                  )}
                </>
              )}
            </nav>

            {/* Ultra Premium Bottom Actions */}
            <div className="p-8 border-t border-green-500/30 space-y-4 bg-gradient-to-t from-slate-950 via-slate-900 to-transparent relative">
              {!session ? (
                <>
                  <Link href="/giris" onClick={() => setShowMobileMenu(false)}>
                    <div className={`transition-all duration-700 ${showMobileMenu ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{transitionDelay: '1000ms'}}>
                      <Button variant="outline" className="w-full h-16 text-lg font-bold border-white/20 hover:border-green-500/60 hover:bg-green-500/20 hover:text-green-400 transition-all duration-300 rounded-2xl backdrop-blur-xl shadow-lg hover:shadow-green-500/20">
                        Giriş Yap
                      </Button>
                    </div>
                  </Link>
                  <Link href="/kayit" onClick={() => setShowMobileMenu(false)}>
                    <div className={`transition-all duration-700 ${showMobileMenu ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{transitionDelay: '1100ms'}}>
                      <Button className="w-full h-16 text-lg font-black bg-gradient-to-r from-green-500 via-green-400 to-yellow-400 hover:from-green-600 hover:via-green-500 hover:to-yellow-500 text-black shadow-2xl shadow-green-500/30 hover:shadow-green-500/50 hover:scale-105 transition-all duration-300 rounded-2xl btn-premium">
                        Kayıt Ol
                      </Button>
                    </div>
                  </Link>
                </>
              ) : (
                <div className={`transition-all duration-700 ${showMobileMenu ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{transitionDelay: '1000ms'}}>
                  <Button 
                    onClick={() => {
                      setShowMobileMenu(false)
                      handleSignOut()
                    }}
                    variant="outline"
                    className="w-full h-16 text-lg font-bold border-red-500/40 text-red-400 hover:bg-red-500/20 hover:border-red-500/60 hover:text-red-300 transition-all duration-300 rounded-2xl backdrop-blur-xl shadow-lg hover:shadow-red-500/20"
                  >
                    <LogOut className="h-6 w-6 mr-3" />
                    Çıkış Yap
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>, document.body)}

      {/* No separate backdrop needed; fullscreen menu covers it. */}
    </header>
    
    {/* Live Leagues Ticker */}
    <LiveLeagues />
    </>
  )
}