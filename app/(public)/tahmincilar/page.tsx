import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Crown, 
  TrendingUp, 
  Users, 
  Trophy, 
  Search,
  Filter,
  Flame,
  Star,
  BarChart3,
  Award,
  Target,
  Zap
} from 'lucide-react'

// Demo data - En başarılı tahmincieler
const topPredictors = [
  {
    id: '1',
    username: 'tahminpro',
    name: 'Ahmet Yılmaz',
    avatar: null,
    bio: 'Profesyonel analist - 5 yıllık tecrübe. Futbol ve basketbol uzmanı.',
    winRate: 85,
    totalCoupons: 248,
    wonCoupons: 211,
    lostCoupons: 37,
    pendingCoupons: 12,
    totalProfit: 145250,
    followers: 3420,
    verified: true,
    rank: 1
  },
  {
    id: '2',
    username: 'bankercim',
    name: 'Mehmet Kaya',
    avatar: null,
    bio: 'Banker kuponlar ve düşük riskli stratejiler. Güvenilir tahminler.',
    winRate: 82,
    totalCoupons: 312,
    wonCoupons: 256,
    lostCoupons: 56,
    pendingCoupons: 8,
    totalProfit: 98750,
    followers: 2890,
    verified: true,
    rank: 2
  },
  {
    id: '3',
    username: 'premiermaster',
    name: 'Ali Demir',
    avatar: null,
    bio: 'Premier League ve La Liga uzmanı. İspanya ve İngiltere liglerinde yüksek başarı.',
    winRate: 78,
    totalCoupons: 195,
    wonCoupons: 152,
    lostCoupons: 43,
    pendingCoupons: 15,
    totalProfit: 87400,
    followers: 2340,
    verified: true,
    rank: 3
  },
  {
    id: '4',
    username: 'iddaaaslan',
    name: 'Can Öztürk',
    avatar: null,
    bio: 'Alt-üst stratejileri ve kombine kuponlar. Yüksek oran uzmanı.',
    winRate: 76,
    totalCoupons: 167,
    wonCoupons: 127,
    lostCoupons: 40,
    pendingCoupons: 6,
    totalProfit: 76200,
    followers: 1980,
    verified: false,
    rank: 4
  },
  {
    id: '5',
    username: 'golmaster',
    name: 'Emre Şahin',
    avatar: null,
    bio: 'Gol tahminleri ve karşılıklı gol stratejileri. Yüksek oranlı kuponlar.',
    winRate: 74,
    totalCoupons: 203,
    wonCoupons: 150,
    lostCoupons: 53,
    pendingCoupons: 9,
    totalProfit: 65800,
    followers: 1750,
    verified: false,
    rank: 5
  },
  {
    id: '6',
    username: 'betking',
    name: 'Serkan Aydın',
    avatar: null,
    bio: 'Basketbol ve tenis uzmanı. NBA ve Euroleague tahminleri.',
    winRate: 73,
    totalCoupons: 189,
    wonCoupons: 138,
    lostCoupons: 51,
    pendingCoupons: 11,
    totalProfit: 58900,
    followers: 1620,
    verified: true,
    rank: 6
  },
  {
    id: '7',
    username: 'analist42',
    name: 'Burak Yıldız',
    avatar: null,
    bio: 'İstatistiksel analiz ve data-driven tahminler. Süper Lig uzmanı.',
    winRate: 71,
    totalCoupons: 156,
    wonCoupons: 111,
    lostCoupons: 45,
    pendingCoupons: 5,
    totalProfit: 52400,
    followers: 1450,
    verified: false,
    rank: 7
  },
  {
    id: '8',
    username: 'futbolboss',
    name: 'Murat Çelik',
    avatar: null,
    bio: 'Avrupa ligleri ve Şampiyonlar Ligi tahminleri. 3 yıllık tecrübe.',
    winRate: 69,
    totalCoupons: 178,
    wonCoupons: 123,
    lostCoupons: 55,
    pendingCoupons: 7,
    totalProfit: 48700,
    followers: 1290,
    verified: false,
    rank: 8
  },
]

export default function TahmincilerPage() {
  return (
    <div className="min-h-screen py-8 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="mb-8 animate-fadeInUp">
          <div className="flex items-center space-x-3 mb-4">
            <Crown className="h-10 w-10 text-yellow-400 animate-pulse" />
            <h1 className="text-4xl md:text-5xl font-bold gradient-text">En Başarılı Tahmincilar</h1>
          </div>
          <p className="text-foreground/70 text-lg">
            Platformun en başarılı tahminlerini yapan kullanıcıları keşfedin ve takip edin
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          <Card className="glass-dark border-white/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-foreground/60 text-sm mb-1">Toplam Tahminçi</p>
                  <p className="text-3xl font-bold gradient-text">1,247</p>
                </div>
                <Users className="h-10 w-10 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-dark border-white/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-foreground/60 text-sm mb-1">Ort. Başarı Oranı</p>
                  <p className="text-3xl font-bold gradient-text">%71</p>
                </div>
                <TrendingUp className="h-10 w-10 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-dark border-white/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-foreground/60 text-sm mb-1">Toplam Kupon</p>
                  <p className="text-3xl font-bold gradient-text">52K+</p>
                </div>
                <Trophy className="h-10 w-10 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-dark border-white/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-foreground/60 text-sm mb-1">Aktif Tahminçi</p>
                  <p className="text-3xl font-bold gradient-text">342</p>
                </div>
                <Flame className="h-10 w-10 text-red-500 animate-pulse" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search & Filter */}
        <div className="glass-dark rounded-xl border border-white/10 p-6 mb-8 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/50" />
              <Input 
                placeholder="Tahminçi ara..." 
                className="pl-10 glass border-white/10 focus:border-green-500/50 bg-black/20 h-12"
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <Button className="bg-gradient-to-r from-green-500 to-yellow-400 hover:from-green-600 hover:to-yellow-500 text-black font-semibold btn-premium">
                <Filter className="h-4 w-4 mr-2" />
                Filtrele
              </Button>
              <Badge className="glass border-green-500/30 text-green-400 hover:bg-green-500/10 cursor-pointer px-4 py-2 text-sm h-auto">
                <Star className="h-3 w-3 mr-1" />
                En İyi
              </Badge>
              <Badge className="glass border-yellow-400/30 text-yellow-400 hover:bg-yellow-400/10 cursor-pointer px-4 py-2 text-sm h-auto">
                <Flame className="h-3 w-3 mr-1" />
                Trend
              </Badge>
              <Badge className="glass border-blue-500/30 text-blue-400 hover:bg-blue-500/10 cursor-pointer px-4 py-2 text-sm h-auto">
                <Award className="h-3 w-3 mr-1" />
                Doğrulanmış
              </Badge>
            </div>
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
          {topPredictors.slice(0, 3).map((predictor, index) => (
            <Card 
              key={predictor.id} 
              className={`glass-dark border-white/10 card-premium relative overflow-hidden ${
                index === 0 ? 'md:scale-110 md:z-10' : ''
              }`}
            >
              {/* Rank Badge */}
              <div className={`absolute top-4 right-4 h-12 w-12 rounded-full flex items-center justify-center font-bold text-lg ${
                index === 0 ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-black' :
                index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-black' :
                'bg-gradient-to-br from-orange-500 to-orange-700 text-white'
              }`}>
                #{predictor.rank}
              </div>

              {/* Glow Effect for Winner */}
              {index === 0 && (
                <div className="absolute inset-0 bg-gradient-to-b from-yellow-400/10 to-transparent pointer-events-none"></div>
              )}

              <CardHeader className="text-center pt-8 pb-4">
                <Avatar className={`h-24 w-24 mx-auto mb-4 ring-4 ${
                  index === 0 ? 'ring-yellow-400/50' :
                  index === 1 ? 'ring-gray-400/50' :
                  'ring-orange-500/50'
                }`}>
                  <AvatarFallback className={`text-2xl font-bold ${
                    index === 0 ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-black' :
                    index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-black' :
                    'bg-gradient-to-br from-orange-500 to-orange-700 text-white'
                  }`}>
                    {predictor.username.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="flex items-center justify-center space-x-2 mb-2">
                  <h3 className="text-xl font-bold">{predictor.username}</h3>
                  {predictor.verified && (
                    <Award className="h-5 w-5 text-blue-400" />
                  )}
                </div>
                <p className="text-sm text-foreground/60">{predictor.name}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-foreground/70 text-center line-clamp-2">
                  {predictor.bio}
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="glass p-3 rounded-lg border border-white/5 text-center">
                    <p className="text-2xl font-bold text-green-400">{predictor.winRate}%</p>
                    <p className="text-xs text-foreground/60">Başarı</p>
                  </div>
                  <div className="glass p-3 rounded-lg border border-white/5 text-center">
                    <p className="text-2xl font-bold gradient-text">{predictor.totalCoupons}</p>
                    <p className="text-xs text-foreground/60">Kupon</p>
                  </div>
                  <div className="glass p-3 rounded-lg border border-white/5 text-center">
                    <p className="text-2xl font-bold text-yellow-400">{(predictor.totalProfit / 1000).toFixed(0)}K₺</p>
                    <p className="text-xs text-foreground/60">Kar</p>
                  </div>
                  <div className="glass p-3 rounded-lg border border-white/5 text-center">
                    <p className="text-2xl font-bold text-blue-400">{predictor.followers}</p>
                    <p className="text-xs text-foreground/60">Takipçi</p>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-green-500 to-yellow-400 hover:from-green-600 hover:to-yellow-500 text-black font-bold btn-premium h-11">
                  {index === 0 && <Crown className="h-4 w-4 mr-2" />}
                  Takip Et
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Rest of Predictors */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
            <BarChart3 className="h-6 w-6 text-green-400" />
            <span>Diğer Başarılı Tahmincieler</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
            {topPredictors.slice(3).map((predictor) => (
              <Card key={predictor.id} className="glass-dark border-white/5 card-premium">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    {/* Avatar & Rank */}
                    <div className="relative flex-shrink-0">
                      <Avatar className="h-16 w-16 ring-2 ring-white/10">
                        <AvatarFallback className="bg-gradient-to-br from-green-500 to-yellow-400 text-black font-bold text-lg">
                          {predictor.username.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <Badge className="absolute -bottom-2 -right-2 h-6 w-6 p-0 flex items-center justify-center bg-gradient-to-br from-gray-600 to-gray-800 border-0 text-xs font-bold">
                        #{predictor.rank}
                      </Badge>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-lg font-bold truncate">{predictor.username}</h3>
                        {predictor.verified && (
                          <Award className="h-4 w-4 text-blue-400 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-sm text-foreground/60 mb-3 line-clamp-1">{predictor.bio}</p>

                      {/* Stats */}
                      <div className="flex items-center space-x-4 text-sm mb-3">
                        <div className="flex items-center space-x-1">
                          <Target className="h-4 w-4 text-green-400" />
                          <span className="font-bold text-green-400">{predictor.winRate}%</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Trophy className="h-4 w-4 text-yellow-400" />
                          <span className="font-semibold">{predictor.totalCoupons}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4 text-blue-400" />
                          <span className="font-semibold">{predictor.followers}</span>
                        </div>
                      </div>

                      <Button className="w-full bg-gradient-to-r from-green-500 to-yellow-400 hover:from-green-600 hover:to-yellow-500 text-black font-semibold btn-premium h-9 text-sm">
                        Takip Et
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Load More */}
        <div className="text-center animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
          <Button size="lg" className="bg-gradient-to-r from-green-500 to-yellow-400 hover:from-green-600 hover:to-yellow-500 text-black font-bold btn-premium px-12">
            Daha Fazla Yükle
          </Button>
        </div>
      </div>
    </div>
  )
}
