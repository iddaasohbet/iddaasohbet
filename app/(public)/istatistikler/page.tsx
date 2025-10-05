export const dynamic = 'force-dynamic'
export const revalidate = 0

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Users, 
  Trophy,
  Target,
  Flame,
  Calendar,
  DollarSign,
  Activity,
  Award,
  Zap,
  Clock,
  CircleDot
} from 'lucide-react'

async function getIstatistiklerData() {
  try {
    const res = await fetch(`/api/istatistikler`, {
      cache: 'no-store'
    })
    if (!res.ok) {
      return { 
        mainStats: { totalCoupons: 0, winRate: 0, totalProfit: 0, activeUsers: 0 },
        dailyStats: [],
        betTypes: [],
        leagues: [],
        liveStats: { activeNow: 0, todayWon: 0, highestOdds: '0.0' }
      }
    }
    return await res.json()
  } catch (error) {
    console.error('İstatistikler fetch error:', error)
    return { 
      mainStats: { totalCoupons: 0, winRate: 0, totalProfit: 0, activeUsers: 0 },
      dailyStats: [],
      betTypes: [],
      leagues: [],
      liveStats: { activeNow: 0, todayWon: 0, highestOdds: '0.0' }
    }
  }
}

export default async function IstatistiklerPage() {
  const { mainStats, dailyStats, betTypes, leagues, liveStats } = await getIstatistiklerData()
  return (
    <div className="min-h-screen py-8 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern"></div>
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="mb-8 animate-fadeInUp">
          <div className="flex items-center space-x-3 mb-4">
            <BarChart3 className="h-10 w-10 text-green-400" />
            <h1 className="text-4xl md:text-5xl font-bold gradient-text">İstatistikler & Analizler</h1>
          </div>
          <p className="text-foreground/70 text-lg">
            Platform genelindeki detaylı istatistikler ve trendleri keşfedin
          </p>
        </div>

        {/* Time Filter */}
        <div className="flex items-center space-x-3 mb-8 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          <Badge className="glass border-green-500/50 bg-green-500/10 text-green-400 cursor-pointer px-4 py-2 text-sm">
            <Calendar className="h-3 w-3 mr-1" />
            Bugün
          </Badge>
          <Badge className="glass border-white/10 text-foreground/60 hover:bg-white/5 cursor-pointer px-4 py-2 text-sm">
            Bu Hafta
          </Badge>
          <Badge className="glass border-white/10 text-foreground/60 hover:bg-white/5 cursor-pointer px-4 py-2 text-sm">
            Bu Ay
          </Badge>
          <Badge className="glass border-white/10 text-foreground/60 hover:bg-white/5 cursor-pointer px-4 py-2 text-sm">
            Tüm Zamanlar
          </Badge>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          <Card className="glass-dark border-white/5 card-premium">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/5 flex items-center justify-center border border-green-500/20">
                  <Trophy className="h-6 w-6 text-green-400" />
                </div>
                <Badge className="status-won text-white text-xs">+12%</Badge>
              </div>
              <p className="text-foreground/60 text-sm mb-1">Toplam Kupon</p>
              <p className="text-3xl font-bold gradient-text">{mainStats.totalCoupons.toLocaleString()}</p>
            </CardContent>
          </Card>

          <Card className="glass-dark border-white/5 card-premium">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 flex items-center justify-center border border-blue-500/20">
                  <Target className="h-6 w-6 text-blue-400" />
                </div>
                <Badge className="status-won text-white text-xs">+5%</Badge>
              </div>
              <p className="text-foreground/60 text-sm mb-1">Başarı Oranı</p>
              <p className="text-3xl font-bold text-green-400">%{mainStats.winRate}</p>
            </CardContent>
          </Card>

          <Card className="glass-dark border-white/5 card-premium">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-yellow-400/20 to-yellow-400/5 flex items-center justify-center border border-yellow-400/20">
                  <DollarSign className="h-6 w-6 text-yellow-400" />
                </div>
                <Badge className="status-won text-white text-xs">+18%</Badge>
              </div>
              <p className="text-foreground/60 text-sm mb-1">Toplam Kazanç</p>
              <p className="text-3xl font-bold text-yellow-400">
                ₺{mainStats.totalProfit >= 1000000 
                  ? `${(mainStats.totalProfit / 1000000).toFixed(1)}M` 
                  : `${(mainStats.totalProfit / 1000).toFixed(1)}K`}
              </p>
            </CardContent>
          </Card>

          <Card className="glass-dark border-white/5 card-premium">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 flex items-center justify-center border border-purple-500/20">
                  <Users className="h-6 w-6 text-purple-400" />
                </div>
                <Badge className="status-won text-white text-xs">+23%</Badge>
              </div>
              <p className="text-foreground/60 text-sm mb-1">Aktif Kullanıcı</p>
              <p className="text-3xl font-bold text-purple-400">{mainStats.activeUsers.toLocaleString()}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Weekly Chart */}
          <Card className="glass-dark border-white/5 card-premium animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-green-400" />
                  <span>Haftalık Performans</span>
                </CardTitle>
                <Badge className="glass border-green-500/30 text-green-400 text-xs">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +15%
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dailyStats.map((stat, index) => {
                  const maxCoupons = Math.max(...dailyStats.map(d => d.coupons))
                  const percentage = (stat.coupons / maxCoupons) * 100
                  
                  return (
                    <div key={stat.day}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-semibold w-8">{stat.day}</span>
                          <span className="text-xs text-foreground/60">{stat.coupons} kupon</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-bold text-green-400">%{stat.winRate}</span>
                          <span className="text-xs text-yellow-400">₺{(stat.profit / 1000).toFixed(1)}K</span>
                        </div>
                      </div>
                      <div className="h-2 glass rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-green-500 to-yellow-400 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Bet Types Distribution */}
          <Card className="glass-dark border-white/5 card-premium animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CircleDot className="h-5 w-5 text-blue-400" />
                <span>Bahis Tipi Dağılımı</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                {betTypes.map((bet) => (
                  <div key={bet.type}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold">{bet.type}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-foreground/60">{bet.count.toLocaleString()}</span>
                        <span className="text-sm font-bold gradient-text">{bet.percentage}%</span>
                      </div>
                    </div>
                    <div className="h-3 glass rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${bet.color} rounded-full transition-all duration-500`}
                        style={{ width: `${bet.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Popular Leagues */}
        <Card className="glass-dark border-white/5 card-premium mb-8 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Flame className="h-5 w-5 text-orange-500 animate-pulse" />
                <span>En Popüler Ligler</span>
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-green-400 hover:text-yellow-400 hover:bg-white/5">
                Tümünü Gör
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {leagues.map((league, index) => (
                <div key={league.name} className="glass p-4 rounded-xl border border-white/5 hover:border-green-500/30 transition-all card-premium">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">{league.icon}</span>
                      <div>
                        <p className="font-bold text-sm">{league.name}</p>
                        <p className="text-xs text-foreground/60">{league.matches} maç</p>
                      </div>
                    </div>
                    {index < 3 && (
                      <Badge className={`${
                        index === 0 ? 'bg-yellow-400 text-black' :
                        index === 1 ? 'bg-gray-400 text-black' :
                        'bg-orange-600 text-white'
                      } text-xs font-bold`}>
                        #{index + 1}
                      </Badge>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="glass-dark p-2 rounded-lg border border-white/5 text-center">
                      <p className="text-xs text-foreground/60 mb-1">Başarı</p>
                      <p className="text-lg font-bold text-green-400">{league.winRate}%</p>
                    </div>
                    <div className="glass-dark p-2 rounded-lg border border-white/5 text-center">
                      <p className="text-xs text-foreground/60 mb-1">Ort. Oran</p>
                      <p className="text-lg font-bold text-yellow-400">{league.avgOdds}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Live Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
          <Card className="glass-dark border-white/5 card-premium">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-green-500/20 to-green-500/5 flex items-center justify-center border border-green-500/20">
                  <Clock className="h-5 w-5 text-green-400 animate-pulse" />
                </div>
                <div>
                  <p className="text-foreground/60 text-xs">Şu Anda Aktif</p>
                  <p className="text-2xl font-bold gradient-text">{liveStats.activeNow}</p>
                </div>
              </div>
              <p className="text-xs text-foreground/60">Canlı kupon sayısı</p>
            </CardContent>
          </Card>

          <Card className="glass-dark border-white/5 card-premium">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-yellow-400/20 to-yellow-400/5 flex items-center justify-center border border-yellow-400/20">
                  <Zap className="h-5 w-5 text-yellow-400 animate-pulse" />
                </div>
                <div>
                  <p className="text-foreground/60 text-xs">Bugün Kazanılan</p>
                  <p className="text-2xl font-bold text-yellow-400">
                    ₺{(liveStats.todayWon / 1000).toFixed(1)}K
                  </p>
                </div>
              </div>
              <p className="text-xs text-foreground/60">Son 24 saat</p>
            </CardContent>
          </Card>

          <Card className="glass-dark border-white/5 card-premium">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-500/5 flex items-center justify-center border border-blue-500/20">
                  <Award className="h-5 w-5 text-blue-400 animate-pulse" />
                </div>
                <div>
                  <p className="text-foreground/60 text-xs">En Yüksek Oran</p>
                  <p className="text-2xl font-bold text-blue-400">{liveStats.highestOdds}</p>
                </div>
              </div>
              <p className="text-xs text-foreground/60">Kazanan kupon</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
