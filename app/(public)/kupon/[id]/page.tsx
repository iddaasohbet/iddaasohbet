// Dinamik meta için server bileşen versiyonu yanına eklenebilir
'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  Trophy,
  Calendar,
  ArrowLeft,
  Eye,
  Lock
} from 'lucide-react'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import KuponInteractions from '@/components/KuponInteractions'
import KuponComments from '@/components/KuponComments'

export default function KuponDetayPage() {
  const { data: session, status } = useSession()
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  
  const [coupon, setCoupon] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/giris')
    }
  }, [status, router])

  useEffect(() => {
    if (!id || status !== 'authenticated') return
    
    fetch(`/api/kuponlar/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Kupon bulunamadı')
        return res.json()
      })
      .then(data => {
        setCoupon(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Kupon yükleme hatası:', err)
        setError(true)
        setLoading(false)
      })
  }, [id, status])

  // Show loading while checking auth
  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-foreground/60">Kupon yükleniyor...</p>
        </div>
      </div>
    )
  }

  // Show auth required message
  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen flex items-center justify-center py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="glass-dark border-white/10 p-12 text-center">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-500/20 to-yellow-400/20 mb-4">
                <Lock className="h-10 w-10 text-green-400" />
              </div>
              <h1 className="text-3xl font-bold gradient-text mb-2">Kupon Detayını Görmek İçin Giriş Yapın</h1>
              <p className="text-foreground/60 text-lg">
                Kupon detaylarını görebilmek için üye olmanız gerekmektedir.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/giris">
                <Button variant="outline" className="w-full sm:w-auto border-white/10 hover:border-green-500/50 hover:bg-green-500/10 hover:text-green-400 h-12 px-8">
                  Giriş Yap
                </Button>
              </Link>
              <Link href="/kayit">
                <Button className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-yellow-400 hover:from-green-600 hover:to-yellow-500 text-black font-semibold h-12 px-8">
                  Kayıt Ol
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  if (error || !coupon) {
    return (
      <div className="min-h-screen py-12 flex items-center justify-center">
        <Card className="glass-dark border-white/10 max-w-md mx-auto">
          <CardContent className="p-12 text-center">
            <XCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Kupon Bulunamadı</h3>
            <p className="text-foreground/60 mb-6">Aradığınız kupon mevcut değil veya silinmiş olabilir.</p>
            <Link href="/kuponlar">
              <Button className="bg-gradient-to-r from-green-500 to-yellow-400 text-black font-semibold">
                Kuponlara Dön
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'WON':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'LOST':
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'WON':
        return 'Kazandı'
      case 'LOST':
        return 'Kaybetti'
      default:
        return 'Beklemede'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'WON':
        return 'bg-green-500/10 text-green-500 border-green-500/50'
      case 'LOST':
        return 'bg-red-500/10 text-red-500 border-red-500/50'
      default:
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/50'
    }
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Back Button */}
        <Link href="/kuponlar">
          <Button variant="ghost" className="mb-6 hover:bg-white/5">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Tüm Kuponlara Dön
          </Button>
        </Link>

        {/* Main Coupon Card */}
        <Card className="glass-dark border-white/10 mb-6">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <Badge className={`${getStatusColor(coupon.status)} border`}>
                    {getStatusIcon(coupon.status)}
                    <span className="ml-2">{getStatusText(coupon.status)}</span>
                  </Badge>
                  <Badge variant="outline" className="border-white/20">
                    <Eye className="h-3 w-3 mr-1" />
                    {coupon.viewCount} görüntülenme
                  </Badge>
                </div>
                <CardTitle className="text-2xl md:text-3xl mb-2">{coupon.title}</CardTitle>
                {coupon.description && (
                  <p className="text-foreground/60">{coupon.description}</p>
                )}
              </div>
            </div>

            {/* User Info */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <Link href={`/profil/${coupon.user.username}`}>
                <div className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                  <Avatar className="h-12 w-12 border-2 border-green-500/50">
                    <AvatarImage src={coupon.user.avatar || ''} alt={coupon.user.name} />
                    <AvatarFallback className="bg-gradient-to-br from-green-500 to-yellow-400 text-black font-bold">
                      {coupon.user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{coupon.user.name}</p>
                    <p className="text-sm text-foreground/60">@{coupon.user.username}</p>
                  </div>
                </div>
              </Link>
              <div className="text-right">
                <p className="text-sm text-foreground/60">Paylaşım Tarihi</p>
                <p className="text-sm font-medium">
                  {new Date(coupon.createdAt).toLocaleDateString('tr-TR')}
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Odds Summary */}
            <div className="grid grid-cols-3 gap-4">
              <div className="glass p-4 rounded-lg text-center">
                <TrendingUp className="h-6 w-6 text-green-400 mx-auto mb-2" />
                <p className="text-sm text-foreground/60 mb-1">Toplam Oran</p>
                <p className="text-2xl font-bold text-green-400">{coupon.totalOdds.toFixed(2)}</p>
              </div>
              <div className="glass p-4 rounded-lg text-center">
                <Trophy className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
                <p className="text-sm text-foreground/60 mb-1">Bahis Miktarı</p>
                <p className="text-2xl font-bold">{coupon.stake} ₺</p>
              </div>
              <div className="glass p-4 rounded-lg text-center">
                <Trophy className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
                <p className="text-sm text-foreground/60 mb-1">Potansiyel Kazanç</p>
                <p className="text-2xl font-bold text-yellow-400">{coupon.potentialWin.toFixed(2)} ₺</p>
              </div>
            </div>

            {/* Matches */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Trophy className="h-5 w-5 mr-2 text-green-400" />
                Maçlar ({coupon.matches.length})
              </h3>
              <div className="space-y-3">
                {coupon.matches.map((match: any, index: number) => (
                  <Card key={match.id} className="glass border-white/10">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="border-white/20 text-xs">
                          {match.league}
                        </Badge>
                        <div className="flex items-center space-x-2 text-xs text-foreground/60">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(match.matchDate).toLocaleDateString('tr-TR')}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-semibold">{match.homeTeam} vs {match.awayTeam}</p>
                          <p className="text-sm text-green-400 mt-1">Tahmin: {match.prediction}</p>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-gradient-to-r from-green-500 to-yellow-400 text-black font-bold">
                            {Number(match.odds).toFixed(2)}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Interactions (Like, Share) */}
        <KuponInteractions 
          couponId={coupon.id} 
          initialLikeCount={coupon._count.likes}
        />

        {/* Comments Section */}
        <KuponComments couponId={coupon.id} />
      </div>
    </div>
  )
}