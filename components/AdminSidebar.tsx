'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard,
  FileText,
  Users,
  MessageSquare,
  BarChart3,
  Settings,
  LogOut,
  Shield,
  Trophy,
  TrendingUp,
  Bell,
  Menu,
  X,
  Crown
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const menuItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/admin/dashboard',
    badge: null
  },
  {
    title: 'Kuponlar',
    icon: FileText,
    href: '/admin/kuponlar',
    badge: '124'
  },
  {
    title: 'Kullanıcılar',
    icon: Users,
    href: '/admin/kullanicilar',
    badge: '1.2K'
  },
  {
    title: 'Yorumlar',
    icon: MessageSquare,
    href: '/admin/yorumlar',
    badge: '43'
  },
  {
    title: 'Tahmincilar',
    icon: Trophy,
    href: '/admin/tahmincilar',
    badge: null
  },
  {
    title: 'Başvurular',
    icon: Crown,
    href: '/admin/basvurular',
    badge: null
  },
  {
    title: 'İstatistikler',
    icon: TrendingUp,
    href: '/admin/istatistikler',
    badge: null
  },
  {
    title: 'Raporlar',
    icon: BarChart3,
    href: '/admin/raporlar',
    badge: null
  },
  {
    title: 'Bildirimler',
    icon: Bell,
    href: '/admin/bildirimler',
    badge: '8'
  },
  {
    title: 'Ayarlar',
    icon: Settings,
    href: '/admin/ayarlar',
    badge: null
  }
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 glass-dark p-3 rounded-lg border border-white/10"
      >
        {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-screen w-64 glass-dark border-r border-white/5
        flex flex-col transition-transform duration-300 z-40
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="p-6 border-b border-white/5">
          <Link href="/admin/dashboard" className="flex items-center space-x-3">
            <div className="relative">
              <Shield className="h-8 w-8 text-red-500 animate-pulse" />
              <div className="absolute inset-0 blur-lg bg-red-500/50"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">Admin Panel</h1>
              <p className="text-xs text-foreground/60">Yönetim Sistemi</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={`
                      flex items-center justify-between px-4 py-3 rounded-lg
                      transition-all group relative overflow-hidden
                      ${isActive 
                        ? 'bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 text-white' 
                        : 'hover:bg-white/5 text-foreground/70 hover:text-white'
                      }
                    `}
                  >
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 animate-pulse"></div>
                    )}
                    
                    <div className="flex items-center space-x-3 relative z-10">
                      <Icon className={`h-5 w-5 ${isActive ? 'text-red-400' : ''}`} />
                      <span className="font-medium">{item.title}</span>
                    </div>
                    
                    {item.badge && (
                      <Badge className="glass border-red-500/30 text-red-400 text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-white/5">
          <div className="glass-dark p-4 rounded-lg border border-white/5 mb-3">
            <div className="flex items-center space-x-3 mb-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white font-bold">
                A
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm">Admin</p>
                <p className="text-xs text-foreground/60">admin@iddaasohbet.com</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-foreground/60">Durum:</span>
              <div className="flex items-center space-x-1">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-green-400">Çevrimiçi</span>
              </div>
            </div>
          </div>

          <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-all group">
            <LogOut className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Çıkış Yap</span>
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
        />
      )}
    </>
  )
}
