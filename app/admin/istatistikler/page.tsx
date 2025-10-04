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
  Eye,
  Heart,
  Trophy,
  DollarSign,
  Calendar,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react'

export default function AdminIstatistiklerPage() {
  const stats = [
    { label: 'Toplam Gelir', value: '₺234,567', change: '+12.5%', trend: 'up', icon: DollarSign, color: 'green' },
    { label: 'Aktif Kullanıcı', value: '5,892', change: '+8.2%', trend: 'up', icon: Users, color: 'blue' },
    { label: 'Günlük Ziyaretçi', value: '15,423', change: '+18.3%', trend: 'up', icon: Eye, color: 'purple' },
    { label: 'Dönüşüm Oranı', value: '3.4%', change: '-0.5%', trend: 'down', icon: Activity, color: 'orange' }
  ]

  const weeklyData = [
    { day: 'Pzt', users: 1234, coupons: 456, comments: 789 },
    { day: 'Sal', users: 1456, coupons: 523, comments: 892 },
    { day: 'Çar', users: 1678, coupons: 601, comments: 945 },
    { day: 'Per', users: 1890, coupons: 678, comments: 1023 },
    { day: 'Cum', users: 2345, coupons: 823, comments: 1234 },
    { day: 'Cmt', users: 2678, coupons: 901, comments: 1456 },
    { day: 'Paz', users: 2123, coupons: 756, comments: 1178 }
  ]

  const maxValue = Math.max(...weeklyData.map(d => d.users))

  const topCoupons = [
    { id: '#1234', title: 'Bugünün En İyi 5\'lisi', views: 3421, likes: 234, comments: 67 },
    { id: '#1235', title: 'Garantili 3\'lü Maç', views: 2876, likes: 198, comments: 45 },
    { id: '#1236', title: 'Yüksek Oran Kuponu', views: 2543, likes: 167, comments: 34 },
    { id: '#1237', title: 'Canlı Bahis Kuponu', views: 2234, likes: 145, comments: 28 },
    { id: '#1238', title: 'Kombine Kupon', views: 2012, likes: 123, comments: 23 }
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-text mb-2">İstatistikler</h1>
          <p className="text-foreground/60">Platform performansını izle ve analiz et</p>
        </div>
        <div className="flex items-center space-x-3">
          <select className="glass-dark border border-white/10 rounded-lg px-4 py-2 text-sm">
            <option>Son 7 Gün</option>
            <option>Son 30 Gün</option>
            <option>Son 3 Ay</option>
            <option>Bu Yıl</option>
          </select>
          <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
            <BarChart3 className="h-4 w-4 mr-2" />
            Rapor Oluştur
          </Button>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown
          
          return (
            <Card key={index} className="glass-dark border-white/5 hover:border-white/10 transition-all group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`h-12 w-12 rounded-xl bg-${stat.color}-500/10 border border-${stat.color}-500/30 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className={`h-6 w-6 text-${stat.color}-400`} />
                  </div>
                  <Badge className={`${
                    stat.trend === 'up' 
                      ? 'bg-green-500/20 border-green-500/30 text-green-400'
                      : 'bg-red-500/20 border-red-500/30 text-red-400'
                  }`}>
                    <TrendIcon className="h-3 w-3 mr-1" />
                    {stat.change}
                  </Badge>
                </div>
                <p className="text-foreground/60 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity Chart */}
        <Card className="glass-dark border-white/5">
          <CardHeader className="border-b border-white/5">
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-blue-400" />
              <span>Haftalık Aktivite</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {weeklyData.map((data, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground/70 font-medium w-12">{data.day}</span>
                    <span className="text-blue-400 font-semibold">{data.users}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-white/5 rounded-full h-2 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                        style={{ width: `${(data.users / maxValue) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Distribution Chart */}
        <Card className="glass-dark border-white/5">
          <CardHeader className="border-b border-white/5">
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="h-5 w-5 text-purple-400" />
              <span>İçerik Dağılımı</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 glass rounded-lg border border-blue-500/20">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="font-semibold">Kuponlar</p>
                    <p className="text-xs text-foreground/60">12,458 adet</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-blue-400">52%</span>
              </div>

              <div className="flex items-center justify-between p-4 glass rounded-lg border border-green-500/20">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <p className="font-semibold">Yorumlar</p>
                    <p className="text-xs text-foreground/60">24,892 adet</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-green-400">33%</span>
              </div>

              <div className="flex items-center justify-between p-4 glass rounded-lg border border-purple-500/20">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                    <Users className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="font-semibold">Kullanıcılar</p>
                    <p className="text-xs text-foreground/60">8,234 kişi</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-purple-400">15%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Coupons */}
      <Card className="glass-dark border-white/5">
        <CardHeader className="border-b border-white/5">
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-yellow-400" />
            <span>En Popüler Kuponlar</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-3">
            {topCoupons.map((coupon, index) => (
              <div key={index} className="flex items-center justify-between p-4 glass rounded-lg border border-white/5 hover:border-white/10 transition-all group">
                <div className="flex items-center space-x-4">
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center font-bold text-lg
                    ${index === 0 ? 'bg-yellow-500 text-black' : ''}
                    ${index === 1 ? 'bg-gray-400 text-black' : ''}
                    ${index === 2 ? 'bg-orange-600 text-white' : ''}
                    ${index > 2 ? 'bg-white/10 text-foreground/70' : ''}
                  `}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-semibold group-hover:text-blue-400 transition">{coupon.title}</p>
                    <p className="text-xs text-foreground/60">{coupon.id}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center space-x-1">
                    <Eye className="h-4 w-4 text-blue-400" />
                    <span>{coupon.views}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart className="h-4 w-4 text-red-400" />
                    <span>{coupon.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageSquare className="h-4 w-4 text-green-400" />
                    <span>{coupon.comments}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
