'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  TrendingUp,
  TrendingDown,
  Users,
  FileText,
  MessageSquare,
  Heart,
  Eye,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Clock,
  Trophy,
  ArrowRight,
  MoreVertical,
  Plus
} from 'lucide-react'

export default function AdminDashboardPage() {
  // Mock data
  const stats = [
    {
      title: 'Toplam Kupon',
      value: '12,458',
      change: '+12.5%',
      trending: 'up',
      icon: FileText,
      color: 'blue',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
      textColor: 'text-blue-400'
    },
    {
      title: 'Toplam Kullanıcı',
      value: '8,234',
      change: '+8.2%',
      trending: 'up',
      icon: Users,
      color: 'green',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30',
      textColor: 'text-green-400'
    },
    {
      title: 'Toplam Yorum',
      value: '24,892',
      change: '+15.3%',
      trending: 'up',
      icon: MessageSquare,
      color: 'purple',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      textColor: 'text-purple-400'
    },
    {
      title: 'Toplam Beğeni',
      value: '45,678',
      change: '-2.4%',
      trending: 'down',
      icon: Heart,
      color: 'red',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/30',
      textColor: 'text-red-400'
    }
  ]

  const recentCoupons = [
    { id: 1, user: 'MehmetY', matches: 5, odd: 8.45, status: 'pending', time: '5 dk önce' },
    { id: 2, user: 'AhmetK', matches: 3, odd: 3.20, status: 'won', time: '12 dk önce' },
    { id: 3, user: 'FatihS', matches: 8, odd: 156.30, status: 'lost', time: '28 dk önce' },
    { id: 4, user: 'EmreB', matches: 4, odd: 12.80, status: 'pending', time: '35 dk önce' },
    { id: 5, user: 'SerkanA', matches: 6, odd: 24.50, status: 'won', time: '1 saat önce' }
  ]

  const recentUsers = [
    { name: 'Mehmet Yılmaz', email: 'mehmet@example.com', date: '2 dk önce', status: 'active' },
    { name: 'Ahmet Kaya', email: 'ahmet@example.com', date: '15 dk önce', status: 'active' },
    { name: 'Fatih Şahin', email: 'fatih@example.com', date: '28 dk önce', status: 'idle' },
    { name: 'Emre Bulut', email: 'emre@example.com', date: '1 saat önce', status: 'idle' }
  ]

  const topTipsters = [
    { rank: 1, name: 'ProTahminci', winRate: 78.5, coupons: 234 },
    { rank: 2, name: 'KralBahis', winRate: 76.2, coupons: 189 },
    { rank: 3, name: 'GolKrali', winRate: 74.8, coupons: 167 },
    { rank: 4, name: 'SuperBet', winRate: 72.3, coupons: 201 }
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-text mb-2">Dashboard</h1>
          <p className="text-foreground/60">Hoş geldin Admin! İşte platformun özeti.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button className="glass border-white/10">
            <Eye className="h-4 w-4 mr-2" />
            Önizleme
          </Button>
          <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
            <Plus className="h-4 w-4 mr-2" />
            Yeni Kupon
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          const TrendIcon = stat.trending === 'up' ? TrendingUp : TrendingDown
          
          return (
            <Card 
              key={index}
              className={`glass-dark border-white/5 hover:border-${stat.color}-500/30 transition-all group cursor-pointer`}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`h-12 w-12 rounded-xl ${stat.bgColor} border ${stat.borderColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className={`h-6 w-6 ${stat.textColor}`} />
                  </div>
                  <Badge className={`${stat.bgColor} ${stat.borderColor} ${stat.textColor} border`}>
                    <TrendIcon className="h-3 w-3 mr-1" />
                    {stat.change}
                  </Badge>
                </div>
                <div>
                  <p className="text-foreground/60 text-sm mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Charts & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Activity Chart */}
        <Card className="glass-dark border-white/5 lg:col-span-2">
          <CardHeader className="border-b border-white/5">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-blue-400" />
                <span>Haftalık Aktivite</span>
              </CardTitle>
              <Button variant="outline" size="sm" className="glass border-white/10">
                Bu Ay
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'].map((day, i) => {
                const height = [65, 80, 45, 90, 75, 50, 70][i]
                return (
                  <div key={day} className="flex items-center space-x-4">
                    <span className="text-sm text-foreground/60 w-8">{day}</span>
                    <div className="flex-1 bg-white/5 rounded-full h-8 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-end pr-3 transition-all duration-500"
                        style={{ width: `${height}%` }}
                      >
                        <span className="text-xs font-semibold text-white">{height}%</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Top Tipsters */}
        <Card className="glass-dark border-white/5">
          <CardHeader className="border-b border-white/5">
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-yellow-400" />
              <span>Top Tahmincilar</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {topTipsters.map((tipster) => (
                <div key={tipster.rank} className="flex items-center space-x-3 p-3 rounded-lg glass hover:bg-white/5 transition-all group cursor-pointer">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm
                    ${tipster.rank === 1 ? 'bg-yellow-500 text-black' : ''}
                    ${tipster.rank === 2 ? 'bg-gray-400 text-black' : ''}
                    ${tipster.rank === 3 ? 'bg-orange-600 text-white' : ''}
                    ${tipster.rank > 3 ? 'bg-white/10 text-foreground/70' : ''}
                  `}>
                    {tipster.rank}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm group-hover:text-yellow-400 transition">{tipster.name}</p>
                    <p className="text-xs text-foreground/60">{tipster.coupons} kupon</p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 font-bold text-sm">{tipster.winRate}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Coupons */}
        <Card className="glass-dark border-white/5">
          <CardHeader className="border-b border-white/5">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-blue-400" />
                <span>Son Kuponlar</span>
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
                Tümünü Gör
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {recentCoupons.map((coupon) => (
                <div key={coupon.id} className="flex items-center justify-between p-3 rounded-lg glass hover:bg-white/5 transition-all group cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                      {coupon.user.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-sm group-hover:text-blue-400 transition">{coupon.user}</p>
                      <p className="text-xs text-foreground/60">{coupon.matches} maç • Oran: {coupon.odd}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge className={
                      coupon.status === 'won' ? 'bg-green-500/20 border-green-500/30 text-green-400' :
                      coupon.status === 'lost' ? 'bg-red-500/20 border-red-500/30 text-red-400' :
                      'bg-yellow-500/20 border-yellow-500/30 text-yellow-400'
                    }>
                      {coupon.status === 'won' ? <CheckCircle className="h-3 w-3 mr-1" /> : null}
                      {coupon.status === 'lost' ? <AlertCircle className="h-3 w-3 mr-1" /> : null}
                      {coupon.status === 'pending' ? <Clock className="h-3 w-3 mr-1" /> : null}
                      {coupon.status === 'won' ? 'Kazandı' : coupon.status === 'lost' ? 'Kaybetti' : 'Bekliyor'}
                    </Badge>
                    <span className="text-xs text-foreground/50">{coupon.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Users */}
        <Card className="glass-dark border-white/5">
          <CardHeader className="border-b border-white/5">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-green-400" />
                <span>Yeni Kullanıcılar</span>
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-green-400 hover:text-green-300">
                Tümünü Gör
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {recentUsers.map((user, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg glass hover:bg-white/5 transition-all group cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold text-sm">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-sm group-hover:text-green-400 transition">{user.name}</p>
                      <p className="text-xs text-foreground/60">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <div className={`h-2 w-2 rounded-full ${user.status === 'active' ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></div>
                    </div>
                    <span className="text-xs text-foreground/50">{user.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="glass-dark border-white/5">
        <CardHeader className="border-b border-white/5">
          <CardTitle>Hızlı İşlemler</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-24 flex-col space-y-2 glass border-blue-500/30 hover:bg-blue-500/10 hover:border-blue-500/50">
              <FileText className="h-6 w-6 text-blue-400" />
              <span>Kupon Ekle</span>
            </Button>
            <Button className="h-24 flex-col space-y-2 glass border-green-500/30 hover:bg-green-500/10 hover:border-green-500/50">
              <Users className="h-6 w-6 text-green-400" />
              <span>Kullanıcı Ekle</span>
            </Button>
            <Button className="h-24 flex-col space-y-2 glass border-purple-500/30 hover:bg-purple-500/10 hover:border-purple-500/50">
              <MessageSquare className="h-6 w-6 text-purple-400" />
              <span>Duyuru Yap</span>
            </Button>
            <Button className="h-24 flex-col space-y-2 glass border-orange-500/30 hover:bg-orange-500/10 hover:border-orange-500/50">
              <Trophy className="h-6 w-6 text-orange-400" />
              <span>Rapor Oluştur</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
