import { Button } from '@/components/ui/button'
import { Trophy, TrendingUp, Users, Zap, ArrowRight, Sparkles, CheckCircle, XCircle } from 'lucide-react'
import Link from 'next/link'
import { prisma } from '@/lib/db'

export default async function Hero() {
  // Server-side: fetch stats and latest coupon from DB
  const [latestCoupon, totalUsers, totalCoupons, wonCoupons, lostCoupons] = await Promise.all([
    prisma.coupon.findFirst({
      orderBy: { createdAt: 'desc' },
      include: {
        matches: true,
      },
    }),
    prisma.user.count(),
    prisma.coupon.count(),
    prisma.coupon.count({ where: { status: 'WON' } }),
    prisma.coupon.count({ where: { status: 'LOST' } })
  ])

  const completedCoupons = wonCoupons + lostCoupons
  const winRate = completedCoupons > 0 
    ? Math.round((wonCoupons / completedCoupons) * 100) 
    : 0
  return (
    <section className="relative overflow-hidden py-20 md:py-32 grid-pattern">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fadeInUp">
            <div className="inline-flex items-center space-x-2 glass px-4 py-2 rounded-full border border-green-500/20">
              <Sparkles className="h-4 w-4 text-yellow-400 animate-pulse" />
              <span className="text-sm font-semibold text-green-400">Türkiye'nin #1 İddaa Platformu</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Kazandıran{' '}
              <span className="gradient-text neon-text-green">Kuponlar</span>
              <br />
              Burada Paylaşılır
            </h1>
            
            <p className="text-xl text-foreground/70 leading-relaxed">
              Profesyonel tahminciların kupolarını takip et, kendi kuponlarını paylaş, 
              <span className="text-green-400 font-semibold"> gerçek kazançları</span> gör ve 
              <span className="text-yellow-400 font-semibold"> kazananlar arasına</span> katıl!
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/kayit">
                <Button size="lg" className="text-lg h-14 px-8 bg-gradient-to-r from-green-500 to-yellow-400 hover:from-green-600 hover:to-yellow-500 text-black font-bold btn-premium neon-green">
                  Hemen Başla
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/kuponlar">
                <Button size="lg" variant="outline" className="text-lg h-14 px-8 border-white/20 hover:border-green-500/50 hover:bg-green-500/10 hover:text-green-400">
                  Kuponları İncele
                </Button>
              </Link>
            </div>

            {/* Premium Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="glass-dark p-4 rounded-xl border border-white/5 card-premium">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="h-5 w-5 text-green-400" />
                  <span className="text-3xl font-bold gradient-text">
                    {totalUsers >= 1000 ? `${(totalUsers / 1000).toFixed(0)}K+` : totalUsers}
                  </span>
                </div>
                <p className="text-sm text-foreground/60">Aktif Kullanıcı</p>
              </div>
              <div className="glass-dark p-4 rounded-xl border border-white/5 card-premium">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-yellow-400" />
                  <span className="text-3xl font-bold gradient-text">
                    {totalCoupons >= 1000 ? `${(totalCoupons / 1000).toFixed(0)}K+` : totalCoupons}
                  </span>
                </div>
                <p className="text-sm text-foreground/60">Paylaşılan Kupon</p>
              </div>
              <div className="glass-dark p-4 rounded-xl border border-white/5 card-premium">
                <div className="flex items-center space-x-2 mb-2">
                  <Trophy className="h-5 w-5 text-green-400" />
                  <span className="text-3xl font-bold gradient-text">%{winRate}</span>
                </div>
                <p className="text-sm text-foreground/60">Başarı Oranı</p>
              </div>
            </div>
          </div>

          {/* Right Content - Premium Live Coupon Card */}
          <div className="relative hidden lg:block animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-yellow-400/20 rounded-3xl blur-3xl animate-pulse-slow"></div>
            
            {/* Premium Card */}
            <div className="relative glass-dark rounded-3xl p-8 border border-white/10 card-premium">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-yellow-400 animate-pulse" />
                  <span className="text-sm font-semibold text-foreground/70">CANLI KUPON</span>
                </div>
                <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-yellow-400 text-black text-xs font-bold rounded-full animate-pulse">
                  HOT 🔥
                </span>
              </div>
              
              {latestCoupon ? (
                <>
                  {/* Status Badge Overlay */}
                  {latestCoupon.status !== 'PENDING' && (
                    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                      <div className={`px-8 py-4 rounded-2xl backdrop-blur-md border-2 ${
                        latestCoupon.status === 'WON' 
                          ? 'bg-green-500/20 border-green-500/50' 
                          : 'bg-red-500/20 border-red-500/50'
                      } shadow-2xl`}>
                        <div className="flex items-center space-x-3">
                          {latestCoupon.status === 'WON' ? (
                            <CheckCircle className="h-8 w-8 text-green-400" />
                          ) : (
                            <XCircle className="h-8 w-8 text-red-400" />
                          )}
                          <span className={`text-3xl font-bold ${
                            latestCoupon.status === 'WON' ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {latestCoupon.status === 'WON' ? 'KAZANDI' : 'KAYBETTİ'}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className={`space-y-3 mb-6 ${latestCoupon.status !== 'PENDING' ? 'opacity-60' : ''}`}>
                    {(latestCoupon.matches || []).slice(0, 3).map((m: any, idx: number) => (
                      <div key={m.id || idx} className="glass p-4 rounded-xl border border-white/5 hover:border-green-500/30 transition-all">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <p className="font-bold text-sm">{m.homeTeam} - {m.awayTeam}</p>
                            <p className="text-xs text-foreground/50">{m.league || 'Genel'}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-green-400">{m.prediction}</p>
                            <p className="text-lg font-bold text-yellow-400 neon-text-yellow">{Number(m.odds || 0).toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="glass-dark p-4 rounded-xl border border-green-500/20">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-foreground/70">Toplam Oran</span>
                      <div className="flex items-center space-x-2">
                        <Trophy className="h-5 w-5 text-yellow-400" />
                        <span className="text-4xl font-bold gradient-text neon-text-green">{Number((latestCoupon as any).totalOdds || 1).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <Link href={`/kupon/${latestCoupon.id}`}>
                    <Button className="w-full mt-6 bg-gradient-to-r from-green-500 to-yellow-400 hover:from-green-600 hover:to-yellow-500 text-black font-bold h-12 btn-premium">
                      Kuponu Görüntüle
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </>
              ) : (
                <div className="space-y-3 mb-6">
                  {[...Array(3)].map((_, idx) => (
                    <div key={idx} className="glass p-4 rounded-xl border border-white/5 animate-pulse">
                      <div className="h-6 bg-white/5 rounded w-2/3 mb-2"></div>
                      <div className="h-4 bg-white/5 rounded w-1/3"></div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
