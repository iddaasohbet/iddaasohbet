export const dynamic = 'force-dynamic'
export const revalidate = 0
export const runtime = 'nodejs'
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
  AlertCircle,
  CheckCircle,
  Clock,
  Trophy,
  ArrowRight,
  Plus
} from 'lucide-react'
import { prisma } from '@/lib/db'

type StatCard = {
  title: string
  value: string | number
  change?: string
  trending: 'up' | 'down'
  icon: any
  color: 'blue' | 'green' | 'purple' | 'red'
  bgColor: string
  borderColor: string
  textColor: string
}

export default async function AdminDashboardPage() {
  const [totalCoupons, totalUsers, totalComments, totalLikes] = await Promise.all([
    prisma.coupon.count(),
    prisma.user.count(),
    prisma.comment.count(),
    prisma.like.count(),
  ])

  const stats: StatCard[] = [
    {
      title: 'Toplam Kupon',
      value: totalCoupons.toLocaleString('tr-TR'),
      change: '',
      trending: 'up',
      icon: FileText,
      color: 'blue',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
      textColor: 'text-blue-400',
    },
    {
      title: 'Toplam Kullanıcı',
      value: totalUsers.toLocaleString('tr-TR'),
      change: '',
      trending: 'up',
      icon: Users,
      color: 'green',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30',
      textColor: 'text-green-400',
    },
    {
      title: 'Toplam Yorum',
      value: totalComments.toLocaleString('tr-TR'),
      change: '',
      trending: 'up',
      icon: MessageSquare,
      color: 'purple',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      textColor: 'text-purple-400',
    },
    {
      title: 'Toplam Beğeni',
      value: totalLikes.toLocaleString('tr-TR'),
      change: '',
      trending: 'up',
      icon: Heart,
      color: 'red',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/30',
      textColor: 'text-red-400',
    },
  ]

  const recentCoupons = await prisma.coupon.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10,
    include: {
      user: { select: { username: true } },
      matches: { select: { id: true } },
    },
  })

  const recentUsers = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10,
    select: { name: true, email: true, createdAt: true },
  })

  const topPredictors = await prisma.user.findMany({
    take: 5,
    orderBy: { coupons: { _count: 'desc' } },
    include: { _count: { select: { coupons: true } } },
  })

  const topTipsters = await Promise.all(
    topPredictors.map(async (u, idx) => {
      const won = await prisma.coupon.count({ where: { userId: u.id, status: 'WON' } })
      const total = u._count.coupons
      const winRate = total > 0 ? Math.round((won / total) * 100) : 0
      return { rank: idx + 1, name: u.name || u.username, winRate, coupons: total }
    })
  )

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

      {/* Stats Grid (Live) */}
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
                    {stat.change || 'Canlı'}
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

      {/* Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Placeholder for future charts */}
        <Card className="glass-dark border-white/5 lg:col-span-2">
          <CardHeader className="border-b border-white/5">
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-400" />
              <span>Aktivite</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 text-sm text-foreground/60">
            Grafikler yakında. Şimdilik canlı istatistikler ve listeler aktif.
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
                      {coupon.user.username.substring(0,1).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-sm group-hover:text-blue-400 transition">{coupon.user.username}</p>
                      <p className="text-xs text-foreground/60">{coupon.matches.length} maç • Oran: {coupon.totalOdds}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge className={
                      coupon.status === 'WON' ? 'bg-green-500/20 border-green-500/30 text-green-400' :
                      coupon.status === 'LOST' ? 'bg-red-500/20 border-red-500/30 text-red-400' :
                      'bg-yellow-500/20 border-yellow-500/30 text-yellow-400'
                    }>
                      {coupon.status === 'WON' ? <CheckCircle className="h-3 w-3 mr-1" /> : null}
                      {coupon.status === 'LOST' ? <AlertCircle className="h-3 w-3 mr-1" /> : null}
                      {coupon.status === 'PENDING' ? <Clock className="h-3 w-3 mr-1" /> : null}
                      {coupon.status === 'WON' ? 'Kazandı' : coupon.status === 'LOST' ? 'Kaybetti' : 'Bekliyor'}
                    </Badge>
                    <span className="text-xs text-foreground/50">{new Date(coupon.createdAt).toLocaleString('tr-TR')}</span>
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
                    <span className="text-xs text-foreground/50">{new Date(user.createdAt).toLocaleString('tr-TR')}</span>
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

