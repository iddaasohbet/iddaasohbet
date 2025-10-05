import Hero from '@/components/Hero'
import CouponCard from '@/components/CouponCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, Flame, Award, ArrowRight, Zap, Shield, BarChart3, Crown, Trophy } from 'lucide-react'
import Link from 'next/link'
import { prisma } from '@/lib/db'

async function getFeaturedCoupons() {
  try {
    const coupons = await prisma.coupon.findMany({
      take: 6,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            avatar: true,
          },
        },
        matches: true,
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
    })
    return coupons
  } catch (error) {
    console.error('Kuponlar yüklenirken hata:', error)
    return []
  }
}

async function getTopPredictors() {
  try {
    // Kullanıcıları kupon sayısına göre sırala
    const users = await prisma.user.findMany({
      take: 4,
      include: {
        _count: {
          select: {
            coupons: true,
            followers: true,
          },
        },
        coupons: {
          select: {
            status: true,
          },
        },
      },
      orderBy: {
        coupons: {
          _count: 'desc',
        },
      },
    })

    return users.map((user) => {
      const wonCoupons = user.coupons.filter((c) => c.status === 'WON').length
      const totalCoupons = user._count.coupons
      const winRate = totalCoupons > 0 ? Math.round((wonCoupons / totalCoupons) * 100) : 0

      return {
        id: user.id,
        name: user.name,
        username: user.username,
        avatar: user.avatar,
        winRate,
        totalCoupons,
        followers: user._count.followers,
      }
    })
  } catch (error) {
    console.error('Tahminler yüklenirken hata:', error)
    return []
  }
}

// Revalidate her 10 saniyede bir
export const revalidate = 10

export default async function Home() {
  const [featuredCoupons, topPredictors] = await Promise.all([
    getFeaturedCoupons(),
    getTopPredictors(),
  ])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Featured Coupons */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <Flame className="h-8 w-8 text-orange-500 animate-pulse" />
            <h2 className="text-3xl font-bold gradient-text">Öne Çıkan Kuponlar</h2>
          </div>
          <Link href="/kuponlar">
            <Button variant="ghost" className="hover:text-green-400 hover:bg-white/5">
              Tümünü Gör <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {featuredCoupons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCoupons.map((coupon) => (
              <CouponCard key={coupon.id} coupon={coupon} />
            ))}
          </div>
        ) : (
          <Card className="glass-dark border-white/10 p-12 text-center">
            <div className="flex flex-col items-center space-y-4">
              <Trophy className="h-16 w-16 text-foreground/30" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Henüz Kupon Yok</h3>
                <p className="text-foreground/60">
                  İlk kuponu paylaşan sen ol! Giriş yap ve kuponunu paylaş.
                </p>
              </div>
              <Link href="/giris">
                <Button className="bg-gradient-to-r from-green-500 to-yellow-400 hover:from-green-600 hover:to-yellow-500 text-black font-semibold btn-premium">
                  Giriş Yap
                </Button>
              </Link>
            </div>
          </Card>
        )}
      </section>

      {/* Top Predictors */}
      <section className="container mx-auto px-4 py-16 bg-gradient-to-b from-transparent via-green-500/5 to-transparent">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <Crown className="h-8 w-8 text-yellow-400 animate-pulse" />
            <h2 className="text-3xl font-bold gradient-text">En Başarılı Tahmincilar</h2>
          </div>
          <Link href="/tahmincilar">
            <Button variant="ghost" className="hover:text-green-400 hover:bg-white/5">
              Tümünü Gör <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {topPredictors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topPredictors.map((predictor, index) => (
              <Link key={predictor.id} href={`/profil/${predictor.username}`}>
                <Card className="glass-dark border-white/10 hover:border-green-500/50 transition-all duration-300 group cursor-pointer relative overflow-hidden">
                  {index === 0 && (
                    <div className="absolute top-4 right-4 z-10">
                      <Crown className="h-6 w-6 text-yellow-400 animate-pulse" />
                    </div>
                  )}
                  <CardHeader className="text-center pb-4">
                    <div className="relative inline-block mx-auto mb-4">
                      <Avatar className="h-20 w-20 border-4 border-green-500/50 group-hover:border-yellow-400/50 transition-all">
                        <AvatarImage src={predictor.avatar || ''} alt={predictor.name} />
                        <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-green-500 to-yellow-400 text-black">
                          {predictor.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                        <Badge className="bg-gradient-to-r from-green-500 to-yellow-400 text-black font-bold border-0">
                          #{index + 1}
                        </Badge>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{predictor.name}</CardTitle>
                    <p className="text-sm text-foreground/60">@{predictor.username}</p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between p-3 glass rounded-lg">
                      <span className="text-sm text-foreground/70">Başarı Oranı</span>
                      <span className="text-lg font-bold text-green-400">{predictor.winRate}%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 glass rounded-lg">
                      <span className="text-sm text-foreground/70">Toplam Kupon</span>
                      <span className="text-lg font-bold">{predictor.totalCoupons}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 glass rounded-lg">
                      <span className="text-sm text-foreground/70">Takipçi</span>
                      <span className="text-lg font-bold text-yellow-400">{predictor.followers}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card className="glass-dark border-white/10 p-12 text-center">
            <div className="flex flex-col items-center space-y-4">
              <Crown className="h-16 w-16 text-foreground/30" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Henüz Tahminçi Yok</h3>
                <p className="text-foreground/60">
                  Kayıt ol, kupon paylaş ve sen de tahminçi ol!
                </p>
              </div>
            </div>
          </Card>
        )}
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="glass-dark border-white/10 hover:border-green-500/30 transition-all group">
            <CardContent className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 mb-4 group-hover:bg-green-500/20 transition-all">
                <Zap className="h-8 w-8 text-green-400" />
              </div>
              <h3 className="text-3xl font-bold mb-2 gradient-text">Hızlı & Güvenli</h3>
              <p className="text-foreground/60">
                Kuponlarınızı anında paylaşın, diğer kullanıcıların kuponlarını inceleyin
              </p>
            </CardContent>
          </Card>

          <Card className="glass-dark border-white/10 hover:border-yellow-400/30 transition-all group">
            <CardContent className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-400/10 mb-4 group-hover:bg-yellow-400/20 transition-all">
                <Shield className="h-8 w-8 text-yellow-400" />
              </div>
              <h3 className="text-3xl font-bold mb-2 gradient-text">%100 Ücretsiz</h3>
              <p className="text-foreground/60">
                Tüm özellikler tamamen ücretsiz. Gizli ücret yok, abonelik yok
              </p>
            </CardContent>
          </Card>

          <Card className="glass-dark border-white/10 hover:border-green-500/30 transition-all group">
            <CardContent className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 mb-4 group-hover:bg-green-500/20 transition-all">
                <BarChart3 className="h-8 w-8 text-green-400" />
              </div>
              <h3 className="text-3xl font-bold mb-2 gradient-text">Detaylı İstatistikler</h3>
              <p className="text-foreground/60">
                Başarı oranlarını takip edin, en iyi tahminçileri keşfedin
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="glass-dark border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-yellow-400/10"></div>
          <CardContent className="p-12 text-center relative z-10">
            <Award className="h-16 w-16 text-green-400 mx-auto mb-6 animate-pulse" />
            <h2 className="text-4xl font-bold mb-4 gradient-text">Hemen Başla!</h2>
            <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
              Türkiye'nin en aktif iddaa kupon paylaşım topluluğuna katıl. Ücretsiz kayıt ol, kuponlarını paylaş ve kazananlar arasına katıl!
            </p>
            <div className="flex items-center justify-center space-x-4">
              <Link href="/kayit">
                <Button size="lg" className="h-14 px-8 text-lg bg-gradient-to-r from-green-500 to-yellow-400 hover:from-green-600 hover:to-yellow-500 text-black font-bold btn-premium">
                  Ücretsiz Kayıt Ol
                </Button>
              </Link>
              <Link href="/kuponlar">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-white/20 hover:border-green-500/50 hover:bg-green-500/10">
                  Kuponları İncele
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}