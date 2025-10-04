'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Heart,
  MessageCircle,
  Share2,
  Copy,
  Facebook,
  Twitter,
  Send,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  Target,
  Trophy,
  Calendar,
  User,
  ThumbsUp,
  ThumbsDown,
  Flag,
  ArrowLeft,
  Eye
} from 'lucide-react'
import Link from 'next/link'

export default function KuponDetayPage({ params }: { params: { id: string } }) {
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(234)
  const [commentText, setCommentText] = useState('')
  const [showShareModal, setShowShareModal] = useState(false)

  // Mock kupon data
  const coupon = {
    id: params.id,
    title: 'Bugünün En İyi 5\'lisi 🔥',
    author: {
      name: 'Mehmet Yılmaz',
      username: 'ProTahminci',
      avatar: 'M',
      tier: 'legendary',
      verified: true,
      followers: 1234,
      winRate: 78.5
    },
    date: '2025-01-10 14:30',
    totalOdds: 15.23,
    stake: 100,
    potentialWin: 1523,
    status: 'pending', // pending, won, lost
    category: 'futbol',
    matches: [
      {
        id: '1',
        league: 'Premier League',
        team1: 'Manchester United',
        team2: 'Liverpool',
        pick: 'Manchester United Kazanır',
        odd: 2.50,
        date: '2025-01-11 20:00',
        status: 'pending'
      },
      {
        id: '2',
        league: 'La Liga',
        team1: 'Real Madrid',
        team2: 'Barcelona',
        pick: 'Çifte Şans: 1-X',
        odd: 1.85,
        date: '2025-01-11 22:00',
        status: 'pending'
      },
      {
        id: '3',
        league: 'Serie A',
        team1: 'Juventus',
        team2: 'AC Milan',
        pick: 'Alt 2.5 Gol',
        odd: 1.75,
        date: '2025-01-12 19:30',
        status: 'pending'
      },
      {
        id: '4',
        league: 'Bundesliga',
        team1: 'Bayern Munich',
        team2: 'Borussia Dortmund',
        pick: 'Üst 3.5 Gol',
        odd: 2.10,
        date: '2025-01-12 21:00',
        status: 'pending'
      },
      {
        id: '5',
        league: 'Ligue 1',
        team1: 'PSG',
        team2: 'Marseille',
        pick: 'PSG Kazanır',
        odd: 1.45,
        date: '2025-01-13 20:00',
        status: 'pending'
      }
    ],
    description: 'Bugün için seçtiğim en güvenli maçlar. Detaylı analizlerimi Instagram\'da paylaştım. Bol şans!',
    stats: {
      views: 1234,
      likes: 234,
      comments: 45,
      shares: 12
    }
  }

  const [comments, setComments] = useState([
    {
      id: '1',
      user: {
        name: 'Ahmet Kaya',
        username: 'ahmetK',
        avatar: 'A'
      },
      text: 'Harika bir kupon! Ben de deneyeceğim. Başarılar! 🔥',
      date: '2025-01-10 15:00',
      likes: 12,
      dislikes: 0
    },
    {
      id: '2',
      user: {
        name: 'Fatih Şahin',
        username: 'fatihS',
        avatar: 'F'
      },
      text: 'Manchester maçına dikkat, sakatlıklar var.',
      date: '2025-01-10 15:30',
      likes: 5,
      dislikes: 1
    }
  ])

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1)
    } else {
      setLikeCount(likeCount + 1)
    }
    setIsLiked(!isLiked)
  }

  const handleComment = () => {
    if (!commentText.trim()) return

    const newComment = {
      id: String(comments.length + 1),
      user: {
        name: 'Sen',
        username: 'sen',
        avatar: 'S'
      },
      text: commentText,
      date: new Date().toISOString().split('T')[0] + ' ' + new Date().toTimeString().split(' ')[0].slice(0, 5),
      likes: 0,
      dislikes: 0
    }

    setComments([newComment, ...comments])
    setCommentText('')
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    alert('Link kopyalandı!')
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-500/20 border-yellow-500/30 text-yellow-400"><Clock className="h-3 w-3 mr-1" />Devam Ediyor</Badge>
      case 'won':
        return <Badge className="bg-green-500/20 border-green-500/30 text-green-400"><CheckCircle className="h-3 w-3 mr-1" />Kazandı</Badge>
      case 'lost':
        return <Badge className="bg-red-500/20 border-red-500/30 text-red-400"><XCircle className="h-3 w-3 mr-1" />Kaybetti</Badge>
      default:
        return null
    }
  }

  const getMatchStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-gray-500/20 border-gray-500/30 text-gray-400 text-xs">Oynanmadı</Badge>
      case 'won':
        return <Badge className="bg-green-500/20 border-green-500/30 text-green-400 text-xs"><CheckCircle className="h-3 w-3 mr-1" />Tuttu</Badge>
      case 'lost':
        return <Badge className="bg-red-500/20 border-red-500/30 text-red-400 text-xs"><XCircle className="h-3 w-3 mr-1" />Tutmadı</Badge>
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Back Button */}
        <Link href="/kuponlar">
          <Button variant="ghost" className="mb-6 text-foreground/60 hover:text-foreground">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kuponlara Dön
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Coupon Header */}
            <Card className="glass-dark border-white/5">
              <CardHeader className="border-b border-white/5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-3">{coupon.title}</CardTitle>
                    <div className="flex items-center space-x-3">
                      <Link href={`/tahmincilar/${coupon.author.username}`}>
                        <div className="flex items-center space-x-2 hover:opacity-80 transition-opacity cursor-pointer">
                          <div className="relative">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                              {coupon.author.avatar}
                            </div>
                            {coupon.author.verified && (
                              <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-slate-900 flex items-center justify-center">
                                <CheckCircle className="h-2.5 w-2.5 text-white" />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-semibold">{coupon.author.name}</p>
                            <p className="text-xs text-foreground/60">@{coupon.author.username}</p>
                          </div>
                        </div>
                      </Link>
                      <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 border-0">
                        <Trophy className="h-3 w-3 mr-1" />
                        %{coupon.author.winRate} Başarı
                      </Badge>
                    </div>
                  </div>
                  {getStatusBadge(coupon.status)}
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 text-sm text-foreground/60 mb-6">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{coupon.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="h-4 w-4" />
                    <span>{coupon.stats.views} görüntülenme</span>
                  </div>
                  <Badge className="bg-blue-500/20 border-blue-500/30 text-blue-400">
                    {coupon.category}
                  </Badge>
                </div>

                {coupon.description && (
                  <p className="text-foreground/70 mb-6">{coupon.description}</p>
                )}

                {/* Coupon Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="glass p-4 rounded-lg text-center">
                    <p className="text-xs text-foreground/60 mb-1">Toplam Oran</p>
                    <p className="text-2xl font-bold text-orange-400">{coupon.totalOdds}</p>
                  </div>
                  <div className="glass p-4 rounded-lg text-center">
                    <p className="text-xs text-foreground/60 mb-1">Bahis Miktarı</p>
                    <p className="text-2xl font-bold text-blue-400">₺{coupon.stake}</p>
                  </div>
                  <div className="glass p-4 rounded-lg text-center">
                    <p className="text-xs text-foreground/60 mb-1">Potansiyel Kazanç</p>
                    <p className="text-2xl font-bold text-green-400">₺{coupon.potentialWin}</p>
                  </div>
                </div>

                {/* Matches */}
                <div className="space-y-3">
                  <h3 className="font-semibold flex items-center space-x-2 mb-4">
                    <Target className="h-5 w-5 text-blue-400" />
                    <span>Maçlar ({coupon.matches.length})</span>
                  </h3>
                  {coupon.matches.map((match, index) => (
                    <div key={match.id} className="glass p-4 rounded-lg border border-white/5 hover:border-white/10 transition-all">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-sm">
                            {index + 1}
                          </div>
                          <div>
                            <p className="text-xs text-foreground/60">{match.league}</p>
                            <p className="text-xs text-foreground/60">{match.date}</p>
                          </div>
                        </div>
                        {getMatchStatusBadge(match.status)}
                      </div>
                      <div className="mb-2">
                        <p className="font-semibold">{match.team1} vs {match.team2}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge className="bg-blue-500/20 border-blue-500/30 text-blue-400">
                          {match.pick}
                        </Badge>
                        <span className="text-lg font-bold text-orange-400">{match.odd}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-3 mt-6 pt-6 border-t border-white/5">
                  <Button 
                    onClick={handleLike}
                    className={`flex-1 ${
                      isLiked 
                        ? 'bg-gradient-to-r from-red-500 to-pink-500' 
                        : 'glass border-white/10'
                    }`}
                    variant={isLiked ? 'default' : 'outline'}
                  >
                    <Heart className={`h-4 w-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
                    {isLiked ? 'Beğenildi' : 'Beğen'} ({likeCount})
                  </Button>
                  <Button 
                    onClick={() => setShowShareModal(true)}
                    variant="outline" 
                    className="glass border-white/10"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Paylaş
                  </Button>
                  <Button variant="outline" className="glass border-white/10">
                    <Flag className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Comments Section */}
            <Card className="glass-dark border-white/5">
              <CardHeader className="border-b border-white/5">
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="h-5 w-5 text-blue-400" />
                  <span>Yorumlar ({comments.length})</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {/* Add Comment */}
                <div className="mb-6">
                  <div className="flex space-x-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                      S
                    </div>
                    <div className="flex-1">
                      <Input
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Yorumunuzu yazın..."
                        className="glass-dark border-white/10 mb-2"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') handleComment()
                        }}
                      />
                      <Button 
                        onClick={handleComment}
                        size="sm" 
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                        disabled={!commentText.trim()}
                      >
                        <Send className="h-3 w-3 mr-2" />
                        Gönder
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Comments List */}
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="glass p-4 rounded-lg border border-white/5">
                      <div className="flex space-x-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                          {comment.user.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <p className="font-semibold text-sm">{comment.user.name}</p>
                              <p className="text-xs text-foreground/60">@{comment.user.username} • {comment.date}</p>
                            </div>
                          </div>
                          <p className="text-sm text-foreground/80 mb-3">{comment.text}</p>
                          <div className="flex items-center space-x-3">
                            <Button size="sm" variant="ghost" className="h-7 px-2 text-xs hover:bg-green-500/10 hover:text-green-400">
                              <ThumbsUp className="h-3 w-3 mr-1" />
                              {comment.likes}
                            </Button>
                            <Button size="sm" variant="ghost" className="h-7 px-2 text-xs hover:bg-red-500/10 hover:text-red-400">
                              <ThumbsDown className="h-3 w-3 mr-1" />
                              {comment.dislikes}
                            </Button>
                            <Button size="sm" variant="ghost" className="h-7 px-2 text-xs">
                              Yanıtla
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Author Card */}
            <Card className="glass-dark border-white/5">
              <CardHeader className="border-b border-white/5">
                <CardTitle className="text-sm">Tahminci Bilgileri</CardTitle>
              </CardHeader>
              <CardContent className="p-6 text-center">
                <div className="relative inline-block mb-4">
                  <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-3xl mx-auto">
                    {coupon.author.avatar}
                  </div>
                  {coupon.author.verified && (
                    <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-green-500 rounded-full border-2 border-slate-900 flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
                <h3 className="font-bold text-lg mb-1">{coupon.author.name}</h3>
                <p className="text-sm text-foreground/60 mb-4">@{coupon.author.username}</p>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="glass p-3 rounded-lg">
                    <p className="text-xs text-foreground/60">Takipçi</p>
                    <p className="text-xl font-bold text-blue-400">{coupon.author.followers}</p>
                  </div>
                  <div className="glass p-3 rounded-lg">
                    <p className="text-xs text-foreground/60">Başarı</p>
                    <p className="text-xl font-bold text-green-400">%{coupon.author.winRate}</p>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                  <User className="h-4 w-4 mr-2" />
                  Takip Et
                </Button>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card className="glass-dark border-white/5">
              <CardHeader className="border-b border-white/5">
                <CardTitle className="text-sm">Kupon İstatistikleri</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-foreground/60">
                      <Eye className="h-4 w-4" />
                      <span>Görüntülenme</span>
                    </div>
                    <span className="font-semibold">{coupon.stats.views}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-foreground/60">
                      <Heart className="h-4 w-4" />
                      <span>Beğeni</span>
                    </div>
                    <span className="font-semibold">{coupon.stats.likes}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-foreground/60">
                      <MessageCircle className="h-4 w-4" />
                      <span>Yorum</span>
                    </div>
                    <span className="font-semibold">{coupon.stats.comments}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-foreground/60">
                      <Share2 className="h-4 w-4" />
                      <span>Paylaşım</span>
                    </div>
                    <span className="font-semibold">{coupon.stats.shares}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Similar Coupons */}
            <Card className="glass-dark border-white/5">
              <CardHeader className="border-b border-white/5">
                <CardTitle className="text-sm">Benzer Kuponlar</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <Link key={i} href={`/kupon/${i + 10}`}>
                      <div className="glass p-3 rounded-lg hover:border-white/10 transition-all cursor-pointer border border-transparent">
                        <p className="text-sm font-semibold mb-1">5\'li Süper Kombinasyon</p>
                        <div className="flex items-center justify-between text-xs text-foreground/60">
                          <span>Oran: 12.5</span>
                          <Badge className="bg-green-500/20 border-green-500/30 text-green-400 text-xs">
                            %75 Başarı
                          </Badge>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="glass-dark border-white/10 w-full max-w-md">
            <CardHeader className="border-b border-white/5">
              <CardTitle className="flex items-center justify-between">
                <span>Kuponu Paylaş</span>
                <Button variant="ghost" size="sm" onClick={() => setShowShareModal(false)}>
                  <XCircle className="h-5 w-5" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                <Button 
                  onClick={handleCopyLink}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Linki Kopyala
                </Button>
                <Button variant="outline" className="w-full glass border-blue-500/30 text-blue-400 hover:bg-blue-500/10">
                  <Facebook className="h-4 w-4 mr-2" />
                  Facebook\'ta Paylaş
                </Button>
                <Button variant="outline" className="w-full glass border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10">
                  <Twitter className="h-4 w-4 mr-2" />
                  Twitter\'da Paylaş
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
