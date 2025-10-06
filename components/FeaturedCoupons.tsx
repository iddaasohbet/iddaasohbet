'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import CouponCard from '@/components/CouponCard'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trophy, Lock } from 'lucide-react'
import Link from 'next/link'

export default function FeaturedCoupons() {
  const { data: session, status } = useSession()
  const [coupons, setCoupons] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const r = await fetch('/api/kuponlar?limit=6', { cache: 'no-store' })
        const j = await r.json()
        setCoupons(j.coupons || [])
      } catch {
        setCoupons([])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="glass-dark border-white/10 p-6 animate-pulse">
            <div className="h-32 bg-white/5 rounded-lg mb-4"></div>
            <div className="h-4 bg-white/5 rounded mb-2"></div>
            <div className="h-4 bg-white/5 rounded w-2/3"></div>
          </Card>
        ))}
      </div>
    )
  }

  // Show blurred coupons for unauthenticated users
  if (status === 'unauthenticated') {
    return (
      <div className="relative">
        {/* Blurred Coupons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 blur-md pointer-events-none select-none">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="glass-dark border-white/10 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-500 to-yellow-400"></div>
                  <div>
                    <div className="h-4 w-24 bg-white/20 rounded mb-1"></div>
                    <div className="h-3 w-16 bg-white/10 rounded"></div>
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-semibold">
                  Kazandı
                </div>
              </div>
              <h3 className="text-lg font-bold mb-2">Gizli Kupon Başlığı</h3>
              <p className="text-sm text-foreground/60 mb-4">Bu kupon detayları gizlidir</p>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center p-2 rounded bg-white/5">
                  <span className="text-sm">Gizli Maç</span>
                  <span className="text-yellow-400 font-semibold">?.??</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded bg-white/5">
                  <span className="text-sm">Gizli Maç</span>
                  <span className="text-yellow-400 font-semibold">?.??</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm text-foreground/60">
                <span>Toplam Oran: ?.??</span>
                <span>0 beğeni</span>
              </div>
            </Card>
          ))}
        </div>

        {/* Overlay with Auth Message */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <Card className="glass-dark border-white/10 p-8 max-w-md mx-4 text-center">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-500/20 to-yellow-400/20 mb-4">
                <Lock className="h-8 w-8 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold gradient-text mb-2">Kuponları Görmek İçin Giriş Yapın</h3>
              <p className="text-foreground/70">
                Kullanıcıların paylaştığı kuponları görebilmek ve detaylarına erişebilmek için üye olun.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/giris">
                <Button variant="outline" className="w-full sm:w-auto border-white/10 hover:border-green-500/50 hover:bg-green-500/10 hover:text-green-400 h-12 px-6">
                  Giriş Yap
                </Button>
              </Link>
              <Link href="/kayit">
                <Button className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-yellow-400 hover:from-green-600 hover:to-yellow-500 text-black font-semibold h-12 px-6">
                  Kayıt Ol
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  if (coupons.length === 0) {
    return (
      <Card className="glass-dark border-white/10 p-12 text-center">
        <div className="flex flex-col items-center space-y-4">
          <Trophy className="h-16 w-16 text-foreground/30" />
          <div>
            <h3 className="text-xl font-semibold mb-2">Henüz Kupon Yok</h3>
            <p className="text-foreground/60">İlk kuponu paylaşan sen ol! Giriş yap ve kuponunu paylaş.</p>
          </div>
          <Link href="/giris">
            <Button className="bg-gradient-to-r from-green-500 to-yellow-400 hover:from-green-600 hover:to-yellow-500 text-black font-semibold btn-premium">
              Giriş Yap
            </Button>
          </Link>
        </div>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {coupons.map((coupon) => (
        <CouponCard key={coupon.id} coupon={coupon} />
      ))}
    </div>
  )
}


