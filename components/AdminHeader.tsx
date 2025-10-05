'use client'

import { Bell, Search, User } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

export default function AdminHeader() {
  return (
    <header className="glass-dark border-b border-white/5 px-6 py-4 sticky top-0 z-30">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
            <Input
              type="search"
              placeholder="Kupon, kullanıcı veya içerik ara..."
              className="glass-dark border-white/10 pl-10 focus:border-blue-500/50"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4 ml-4">
          {/* Notifications */}
          <button className="relative p-2 rounded-lg glass border border-white/10 hover:border-red-500/30 transition-all group">
            <Bell className="h-5 w-5 text-foreground/70 group-hover:text-red-400 transition" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs border-2 border-slate-900">
              8
            </Badge>
          </button>

          {/* Profile */}
          <button className="flex items-center space-x-3 p-2 pr-4 rounded-lg glass border border-white/10 hover:border-orange-500/30 transition-all group">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white font-bold text-sm">
              A
            </div>
            <span className="text-sm font-medium group-hover:text-orange-400 transition">Admin</span>
          </button>
        </div>
      </div>
    </header>
  )
}

