'use client'

import { useState, useEffect } from 'react'
import CouponCard from '@/components/CouponCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Search, Filter, TrendingUp, Clock, CheckCircle, XCircle, Trophy } from 'lucide-react'

export default function KuponlarPage() {
  const [coupons, setCoupons] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'WON' | 'LOST'>('ALL')
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchCoupons()
  }, [filter, page])

  const fetchCoupons = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '12',
      })

      if (filter !== 'ALL') {
        params.append('status', filter)
      }

      const response = await fetch(`/api/kuponlar?${params}`)
      const data = await response.json()

      if (response.ok) {
        setCoupons(data.coupons)
        setTotalPages(data.pagination.totalPages)
      }
    } catch (error) {
      console.error('Kuponlar yüklenirken hata:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredCoupons = searchTerm
    ? coupons.filter((coupon) =>
        coupon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coupon.user.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : coupons

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">Tüm Kuponlar</h1>
          <p className="text-foreground/60">Kullanıcıların paylaştığı tüm kuponları incele</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/50" />
            <Input
              type="text"
              placeholder="Kupon veya kullanıcı ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 glass border-white/10 focus:border-green-500/50 bg-black/20"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            <Button
              variant={filter === 'ALL' ? 'default' : 'outline'}
              onClick={() => setFilter('ALL')}
              className={filter === 'ALL' 
                ? 'bg-gradient-to-r from-green-500 to-yellow-400 text-black font-semibold' 
                : 'border-white/10 hover:border-green-500/50'
              }
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Tümü
            </Button>
            <Button
              variant={filter === 'PENDING' ? 'default' : 'outline'}
              onClick={() => setFilter('PENDING')}
              className={filter === 'PENDING' 
                ? 'bg-yellow-500 text-black font-semibold' 
                : 'border-white/10 hover:border-yellow-500/50'
              }
            >
              <Clock className="h-4 w-4 mr-2" />
              Bekleyen
            </Button>
            <Button
              variant={filter === 'WON' ? 'default' : 'outline'}
              onClick={() => setFilter('WON')}
              className={filter === 'WON' 
                ? 'bg-green-500 text-black font-semibold' 
                : 'border-white/10 hover:border-green-500/50'
              }
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Kazanan
            </Button>
            <Button
              variant={filter === 'LOST' ? 'default' : 'outline'}
              onClick={() => setFilter('LOST')}
              className={filter === 'LOST' 
                ? 'bg-red-500 text-black font-semibold' 
                : 'border-white/10 hover:border-red-500/50'
              }
            >
              <XCircle className="h-4 w-4 mr-2" />
              Kaybeden
            </Button>
          </div>
        </div>

        {/* Coupons Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="glass-dark border-white/10 p-6 animate-pulse">
                <div className="h-32 bg-white/5 rounded-lg mb-4"></div>
                <div className="h-4 bg-white/5 rounded mb-2"></div>
                <div className="h-4 bg-white/5 rounded w-2/3"></div>
              </Card>
            ))}
          </div>
        ) : filteredCoupons.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCoupons.map((coupon) => (
                <CouponCard key={coupon.id} coupon={coupon} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-12">
                <Button
                  variant="outline"
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                  className="border-white/10"
                >
                  Önceki
                </Button>
                <span className="text-sm text-foreground/70">
                  Sayfa {page} / {totalPages}
                </span>
                <Button
                  variant="outline"
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPages}
                  className="border-white/10"
                >
                  Sonraki
                </Button>
              </div>
            )}
          </>
        ) : (
          <Card className="glass-dark border-white/10 p-12 text-center">
            <div className="flex flex-col items-center space-y-4">
              <Trophy className="h-16 w-16 text-foreground/30" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Kupon Bulunamadı</h3>
                <p className="text-foreground/60">
                  {searchTerm 
                    ? 'Arama kriterlerinize uygun kupon bulunamadı.' 
                    : 'Henüz paylaşılan kupon yok. İlk kuponu sen paylaş!'}
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}