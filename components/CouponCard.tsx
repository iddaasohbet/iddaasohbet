import Link from 'next/link'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Trophy, 
  XCircle, 
  Clock, 
  Heart, 
  MessageCircle,
  Award,
  TrendingUp
} from 'lucide-react'

interface Match {
  id: string
  league: string
  homeTeam: string
  awayTeam: string
  prediction: string
  odds: number
  result?: string | null
}

interface Author {
  username: string
  name: string | null
  avatar: string | null
  verified: boolean
}

interface Coupon {
  id: string
  title: string
  description: string | null
  totalOdds: number | string | null
  status: string
  createdAt: Date
  user: Author | null
  author?: Author | null
  matches: Match[] | null
  _count?: {
    likes?: number
    comments?: number
  } | null
}

interface Props {
  coupon: Coupon
}

export default function CouponCard({ coupon }: Props) {
  const statusConfig = {
    PENDING: {
      label: 'Bekliyor',
      icon: Clock,
      className: 'status-pending',
      iconColor: 'text-blue-400'
    },
    WON: {
      label: 'Kazandı',
      icon: Trophy,
      className: 'status-won',
      iconColor: 'text-green-400'
    },
    LOST: {
      label: 'Kaybetti',
      icon: XCircle,
      className: 'status-lost',
      iconColor: 'text-red-400'
    }
  }

  const config = statusConfig[coupon.status as keyof typeof statusConfig] || statusConfig.PENDING
  const StatusIcon = config.icon
  const author = coupon.user || coupon.author || ({} as Author)
  const matches = Array.isArray(coupon.matches) ? coupon.matches : []
  const totalOddsNum = Number(coupon.totalOdds || 0)
  const likeCount = (coupon._count?.likes as number) ?? 0
  const commentCount = (coupon._count?.comments as number) ?? 0

  return (
    <Link href={`/kupon/${coupon.id}`}>
      <Card className="glass-dark border-white/5 card-premium group cursor-pointer h-full">
        <CardHeader className="pb-4">
          {/* Author & Status */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8 ring-2 ring-white/10">
                <AvatarImage src={author?.avatar || undefined} alt={author?.name || 'User'} />
                <AvatarFallback className="bg-gradient-to-br from-green-500 to-yellow-400 text-black text-xs font-bold">
                  {(author?.username || 'uu').substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center space-x-1">
                  <p className="text-sm font-semibold text-foreground group-hover:text-green-400 transition-colors">
                    {author?.username || 'user'}
                  </p>
                  {author?.verified && (
                    <Award className="h-3 w-3 text-blue-400" />
                  )}
                </div>
              </div>
            </div>
            <Badge className={`${config.className} text-white text-xs`}>
              <StatusIcon className={`h-3 w-3 mr-1 ${config.iconColor}`} />
              {config.label}
            </Badge>
          </div>

          {/* Title & Description */}
          <h3 className="text-lg font-bold mb-2 group-hover:text-green-400 transition-colors line-clamp-2">
            {coupon.title}
          </h3>
          {coupon.description && (
            <p className="text-sm text-foreground/60 line-clamp-2">{coupon.description}</p>
          )}
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Matches */}
          <div className="space-y-2">
            {matches.slice(0, 3).map((match, idx) => (
              <div key={match.id || idx} className="glass p-3 rounded-lg border border-white/5">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs text-foreground/50">{match.league}</p>
                  {match.result && (
                    <Badge variant="outline" className="text-xs border-white/10">
                      {match.result}
                    </Badge>
                  )}
                </div>
                <p className="text-sm font-semibold mb-1">
                  {match.homeTeam} - {match.awayTeam}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-foreground/70">{match.prediction}</p>
                  <Badge className="bg-yellow-400/20 text-yellow-400 border-yellow-400/30 text-xs">
                    {Number(match.odds || 0).toFixed(2)}
                  </Badge>
                </div>
              </div>
            ))}
            {matches.length > 3 && (
              <p className="text-xs text-center text-foreground/50">
                +{matches.length - 3} maç daha
              </p>
            )}
          </div>

          {/* Footer Stats */}
          <div className="flex items-center justify-between pt-3 border-t border-white/5">
            <div className="flex items-center space-x-4 text-sm text-foreground/60">
              <div className="flex items-center space-x-1">
                <Heart className="h-4 w-4" />
                <span>{likeCount}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageCircle className="h-4 w-4" />
                <span>{commentCount}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-green-400" />
              <span className="text-lg font-bold text-green-400">{Number(totalOddsNum).toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}