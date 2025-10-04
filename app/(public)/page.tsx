import Hero from '@/components/Hero'
import CouponCard from '@/components/CouponCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, Flame, Award, ArrowRight, Zap, Shield, BarChart3, Crown } from 'lucide-react'
import Link from 'next/link'

// Demo data
const featuredCoupons = [
  {
    id: '1',
    title: 'Bugünün En İyi 5\'lisi - Yüksek Oranlı Kupon 🔥',
    totalOdds: 12.45,
    status: 'PENDING',
    viewCount: 1250,
    createdAt: new Date(),
    user: {
      username: 'tahminpro',
      avatar: null,
      winRate: 78
    },
    matches: [
      { homeTeam: 'Fenerbahçe', awayTeam: 'Galatasaray', prediction: '1', odds: 2.50, category: 'FUTBOL' },
      { homeTeam: 'Barcelona', awayTeam: 'Real Madrid', prediction: 'KG VAR', odds: 1.85, category: 'FUTBOL' },
      { homeTeam: 'Man City', awayTeam: 'Liverpool', prediction: 'ÜST 2.5', odds: 1.95, category: 'FUTBOL' },
      { homeTeam: 'Lakers', awayTeam: 'Warriors', prediction: '1', odds: 2.10, category: 'BASKETBOL' },
      { homeTeam: 'Beşiktaş', awayTeam: 'Trabzonspor', prediction: 'KG VAR', odds: 1.75, category: 'FUTBOL' }
    ],
    _count: { likes: 156, comments: 43 }
  },
  {
    id: '2',
    title: 'Günün Banker Kupon - Düşük Riskli 💰',
    totalOdds: 3.85,
    status: 'WON',
    viewCount: 892,
    createdAt: new Date(),
    user: {
      username: 'bankercim',
      avatar: null,
      winRate: 85
    },
    matches: [
      { homeTeam: 'Bayern Munich', awayTeam: 'Schalke', prediction: '1', odds: 1.35, category: 'FUTBOL' },
      { homeTeam: 'PSG', awayTeam: 'Lorient', prediction: '1', odds: 1.25, category: 'FUTBOL' },
      { homeTeam: 'Juventus', awayTeam: 'Salernitana', prediction: '1', odds: 1.40, category: 'FUTBOL' }
    ],
    _count: { likes: 234, comments: 67 }
  },
  {
    id: '3',
    title: 'Premier League Özel - Alt Üst Kombinasyonu ⚽',
    totalOdds: 8.20,
    status: 'WON',
    viewCount: 2100,
    createdAt: new Date(),
    user: {
      username: 'premiermaster',
      avatar: null,
      winRate: 72
    },
    matches: [
      { homeTeam: 'Arsenal', awayTeam: 'Chelsea', prediction: 'ÜST 2.5', odds: 1.90, category: 'FUTBOL' },
      { homeTeam: 'Newcastle', awayTeam: 'Brighton', prediction: 'ÜST 2.5', odds: 1.85, category: 'FUTBOL' },
      { homeTeam: 'Tottenham', awayTeam: 'West Ham', prediction: '1', odds: 2.10, category: 'FUTBOL' }
    ],
    _count: { likes: 345, comments: 89 }
  }
]

const topPredictors = [
  { username: 'tahminpro', winRate: 85, totalCoupons: 150, followers: 2500 },
  { username: 'bankercim', winRate: 82, totalCoupons: 200, followers: 2100 },
  { username: 'premiermaster', winRate: 78, totalCoupons: 175, followers: 1800 },
  { username: 'iddaaaslan', winRate: 76, totalCoupons: 120, followers: 1500 }
]

export default function Home() {
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCoupons.map((coupon) => (
            <CouponCard key={coupon.id} coupon={coupon} />
          ))}
        </div>
      </section>

      {/* Top Predictors */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <Crown className="h-8 w-8 text-yellow-400" />
              <h2 className="text-3xl font-bold gradient-text">En Başarılı Tahmincilar</h2>
            </div>
            <Link href="/tahmincilar">
              <Button variant="ghost" className="hover:text-green-400 hover:bg-white/5">
                Tümünü Gör <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topPredictors.map((predictor, index) => (
              <Card key={predictor.username} className="glass-dark border-white/5 card-premium">
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <Avatar className="h-14 w-14 ring-2 ring-yellow-400/20">
                      <AvatarFallback className="bg-gradient-to-br from-yellow-400 to-orange-500 text-black font-bold text-lg">
                        {predictor.username.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {index < 3 && (
                      <Badge className={`${
                        index === 0 ? 'bg-yellow-400 text-black' :
                        index === 1 ? 'bg-gray-400 text-black' :
                        'bg-orange-600 text-white'
                      } font-bold`}>
                        #{index + 1}
                      </Badge>
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-lg">{predictor.username}</p>
                    <p className="text-xs text-foreground/60">{predictor.followers} takipçi</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="glass p-3 rounded-lg border border-white/5">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-foreground/70">Başarı Oranı</span>
                      <span className="font-bold text-xl text-green-400">%{predictor.winRate}</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground/70">Toplam Kupon</span>
                    <span className="font-semibold">{predictor.totalCoupons}</span>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-green-500 to-yellow-400 hover:from-green-600 hover:to-yellow-500 text-black font-bold btn-premium">
                    Takip Et
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 gradient-text">Neden İddaaSohbet?</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Profesyonel betting platformunda yerinizi alın
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="glass-dark border-white/5 card-premium">
            <CardHeader>
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/5 flex items-center justify-center mb-4 border border-green-500/20">
                <BarChart3 className="h-7 w-7 text-green-400" />
              </div>
              <CardTitle className="text-xl">Detaylı İstatistikler</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/70">
                Her kullanıcının başarı oranı, kazanç grafiği ve detaylı performans analizleri
              </p>
            </CardContent>
          </Card>

          <Card className="glass-dark border-white/5 card-premium">
            <CardHeader>
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-yellow-400/20 to-yellow-400/5 flex items-center justify-center mb-4 border border-yellow-400/20">
                <Zap className="h-7 w-7 text-yellow-400" />
              </div>
              <CardTitle className="text-xl">Canlı Takip</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/70">
                Kuponları gerçek zamanlı takip edin, anlık bildirimler alın
              </p>
            </CardContent>
          </Card>

          <Card className="glass-dark border-white/5 card-premium">
            <CardHeader>
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 flex items-center justify-center mb-4 border border-purple-500/20">
                <Shield className="h-7 w-7 text-purple-400" />
              </div>
              <CardTitle className="text-xl">Güvenli Platform</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/70">
                Doğrulanmış kullanıcılar, şeffaf istatistikler ve güvenilir ortam
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-20 my-20">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-yellow-400/10 to-green-500/10"></div>
        <div className="absolute inset-0 grid-pattern"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto glass-dark p-12 rounded-3xl border border-white/10">
            <Zap className="h-16 w-16 text-yellow-400 mx-auto mb-6 animate-pulse" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Hemen Başla,</span> İlk Kuponunu Paylaş!
            </h2>
            <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
              Ücretsiz üye ol, kuponlarını paylaş ve kazananlar liginde yerinizi alın
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/kayit">
                <Button size="lg" className="text-lg h-14 px-8 bg-gradient-to-r from-green-500 to-yellow-400 hover:from-green-600 hover:to-yellow-500 text-black font-bold btn-premium neon-green">
                  Ücretsiz Kayıt Ol
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/kuponlar">
                <Button size="lg" variant="outline" className="text-lg h-14 px-8 border-white/20 hover:border-green-500/50 hover:bg-green-500/10 hover:text-green-400">
                  Kuponları Keşfet
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}