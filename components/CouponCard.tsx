import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Heart, MessageCircle, Eye, TrendingUp, Trophy, Flame } from 'lucide-react'
import { formatDate, formatOdds, getStatusLabel } from '@/lib/utils'

interface CouponCardProps {
  coupon: {
    id: string
    title: string
    totalOdds: number
    status: string
    viewCount: number
    createdAt: Date
    user: {
      username: string
      avatar?: string | null
      winRate: number
    }
    matches: Array<{
      homeTeam: string
      awayTeam: string
      prediction: string
      odds: number
      category: string
    }>
    _count?: {
      likes: number
      comments: number
    }
  }
}

export default function CouponCard({ coupon }: CouponCardProps) {
  const matchCount = coupon.matches.length
  const likesCount = coupon._count?.likes || 0
  const commentsCount = coupon._count?.comments || 0

  const getStatusStyle = () => {
    switch (coupon.status) {
      case 'WON':
        return 'status-won text-white'
      case 'LOST':
        return 'status-lost text-white'
      default:
        return 'status-pending text-black'
    }
  }

  return (
    <Link href={`/kupon/${coupon.id}`}>
      <Card className="glass-dark border-white/5 card-premium group cursor-pointer overflow-hidden">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12 ring-2 ring-green-500/20 group-hover:ring-green-500/50 transition-all">
                <AvatarImage src={coupon.user.avatar || undefined} />
                <AvatarFallback className="bg-gradient-to-br from-green-500 to-yellow-400 text-black font-bold">
                  {coupon.user.username.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-bold text-sm text-foreground group-hover:text-green-400 transition-colors">
                  {coupon.user.username}
                </p>
                <div className="flex items-center space-x-2 text-xs text-foreground/60">
                  <TrendingUp className="h-3 w-3 text-green-400" />
                  <span className="font-semibold text-green-400">%{coupon.user.winRate}</span>
                  <span>Başarı</span>
                </div>
              </div>
            </div>
            <Badge className={`${getStatusStyle()} font-bold text-xs`}>
              {getStatusLabel(coupon.status)}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="pb-3">
          <div className="flex items-start space-x-2 mb-4">
            {coupon.status === 'WON' && <Flame className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />}
            <h3 className="font-bold text-lg group-hover:text-green-400 transition-colors leading-tight">
              {coupon.title}
            </h3>
          </div>

          <div className="space-y-2">
            {coupon.matches.slice(0, 3).map((match, idx) => (
              <div key={idx} className="glass p-3 rounded-lg border border-white/5 hover:border-green-500/20 transition-all">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-xs truncate">
                      {match.homeTeam} <span className="text-foreground/50">vs</span> {match.awayTeam}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <span className="text-xs font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded">
                      {match.prediction}
                    </span>
                    <span className="text-sm font-bold text-yellow-400">
                      {formatOdds(match.odds)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {matchCount > 3 && (
              <p className="text-xs text-center text-foreground/50 py-1">
                +{matchCount - 3} maç daha...
              </p>
            )}
          </div>
        </CardContent>

        <CardFooter className="pt-3 border-t border-white/5">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-4 text-sm text-foreground/60">
              <button className="flex items-center space-x-1 hover:text-red-400 transition-colors">
                <Heart className="h-4 w-4" />
                <span className="font-medium">{likesCount}</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-blue-400 transition-colors">
                <MessageCircle className="h-4 w-4" />
                <span className="font-medium">{commentsCount}</span>
              </button>
              <div className="flex items-center space-x-1">
                <Eye className="h-4 w-4" />
                <span className="font-medium">{coupon.viewCount}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-foreground/50 mb-1">{matchCount} Maç</p>
              <div className="flex items-center space-x-1">
                <Trophy className="h-4 w-4 text-yellow-400" />
                <span className="font-bold text-2xl gradient-text neon-text-green">
                  {formatOdds(coupon.totalOdds)}
                </span>
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}