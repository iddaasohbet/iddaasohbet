'use client'

import { useEffect, useState } from 'react'
import CouponCard from '@/components/CouponCard'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trophy } from 'lucide-react'
import Link from 'next/link'

export default function FeaturedCoupons() {
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


