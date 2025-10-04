import CouponCard from '@/components/CouponCard'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Filter, TrendingUp, Clock, Trophy, Flame, Star } from 'lucide-react'

// Demo data
const coupons = [
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
      { homeTeam: 'Man City', awayTeam: 'Liverpool', prediction: 'ÜST 2.5', odds: 1.95, category: 'FUTBOL' }
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
      { homeTeam: 'PSG', awayTeam: 'Lorient', prediction: '1', odds: 1.25, category: 'FUTBOL' }
    ],
    _count: { likes: 234, comments: 67 }
  },
  {
    id: '3',
    title: 'La Liga Maçları - İspanya Özel ⚽',
    totalOdds: 6.75,
    status: 'LOST',
    viewCount: 450,
    createdAt: new Date(),
    user: {
      username: 'laligamaster',
      avatar: null,
      winRate: 70
    },
    matches: [
      { homeTeam: 'Real Madrid', awayTeam: 'Atletico Madrid', prediction: '1', odds: 2.25, category: 'FUTBOL' },
      { homeTeam: 'Barcelona', awayTeam: 'Valencia', prediction: 'ÜST 2.5', odds: 1.50, category: 'FUTBOL' }
    ],
    _count: { likes: 89, comments: 21 }
  }
]

export default function KuponlarPage() {
  return (
    <div className="min-h-screen py-8 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="mb-8 animate-fadeInUp">
          <div className="flex items-center space-x-3 mb-4">
            <Flame className="h-10 w-10 text-orange-500 animate-pulse" />
            <h1 className="text-4xl md:text-5xl font-bold gradient-text">Tüm Kuponlar</h1>
          </div>
          <p className="text-foreground/70 text-lg">
            Topluluğun paylaştığı en iyi iddaa kuponlarını keşfedin
          </p>
        </div>

        {/* Filters */}
        <div className="glass-dark rounded-xl border border-white/10 p-6 mb-8 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          <div className="flex flex-wrap gap-3">
            <Button className="bg-gradient-to-r from-green-500 to-yellow-400 hover:from-green-600 hover:to-yellow-500 text-black font-semibold btn-premium">
              <Filter className="h-4 w-4 mr-2" />
              Filtrele
            </Button>
            <Badge className="glass border-green-500/30 text-green-400 hover:bg-green-500/10 cursor-pointer px-4 py-2 text-sm">
              <TrendingUp className="h-3 w-3 mr-1" />
              Trend
            </Badge>
            <Badge className="glass border-yellow-400/30 text-yellow-400 hover:bg-yellow-400/10 cursor-pointer px-4 py-2 text-sm">
              <Clock className="h-3 w-3 mr-1" />
              Yeni
            </Badge>
            <Badge className="glass border-green-500/30 text-green-400 hover:bg-green-500/10 cursor-pointer px-4 py-2 text-sm">
              <Trophy className="h-3 w-3 mr-1" />
              Kazananlar
            </Badge>
            <Badge className="glass border-orange-500/30 text-orange-500 hover:bg-orange-500/10 cursor-pointer px-4 py-2 text-sm">
              <Star className="h-3 w-3 mr-1" />
              Popüler
            </Badge>
          </div>
        </div>

        {/* Coupons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          {coupons.map((coupon) => (
            <CouponCard key={coupon.id} coupon={coupon} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
          <Button size="lg" className="bg-gradient-to-r from-green-500 to-yellow-400 hover:from-green-600 hover:to-yellow-500 text-black font-bold btn-premium px-12">
            Daha Fazla Yükle
          </Button>
        </div>
      </div>
    </div>
  )
}