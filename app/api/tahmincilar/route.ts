import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    // Kullanıcıları kupon istatistikleriyle birlikte getir
    const users = await prisma.user.findMany({
      where: {
        // Admin hariç normal kullanıcılar
        role: 'USER'
      },
      select: {
        id: true,
        username: true,
        name: true,
        avatar: true,
        bio: true,
        verified: true,
        createdAt: true,
        _count: {
          select: {
            coupons: true,
            followers: true
          }
        },
        coupons: {
          select: {
            status: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Her kullanıcı için istatistikleri hesapla
    const predictors = users.map((user, index) => {
      const wonCoupons = user.coupons.filter(c => c.status === 'WON').length
      const lostCoupons = user.coupons.filter(c => c.status === 'LOST').length
      const pendingCoupons = user.coupons.filter(c => c.status === 'PENDING').length
      const totalCoupons = user._count.coupons
      
      const winRate = totalCoupons > 0 
        ? Math.round((wonCoupons / totalCoupons) * 100) 
        : 0

      return {
        id: user.id,
        username: user.username,
        name: user.name,
        avatar: user.avatar,
        bio: user.bio || 'Henüz bio eklenmemiş.',
        verified: user.verified,
        rank: index + 1,
        winRate,
        totalCoupons,
        wonCoupons,
        lostCoupons,
        pendingCoupons,
        followers: user._count.followers,
        // Placeholder kar hesabı - gerçek hesaplama için kupon detayları gerekir
        totalProfit: wonCoupons * 1500
      }
    })

    // Win rate'e göre sırala
    const sortedPredictors = predictors.sort((a, b) => {
      if (b.winRate === a.winRate) {
        return b.totalCoupons - a.totalCoupons
      }
      return b.winRate - a.winRate
    })

    // Rank'leri güncelle
    sortedPredictors.forEach((predictor, index) => {
      predictor.rank = index + 1
    })

    // Platform istatistikleri
    const stats = {
      totalPredictors: sortedPredictors.length,
      avgWinRate: sortedPredictors.length > 0
        ? Math.round(sortedPredictors.reduce((sum, p) => sum + p.winRate, 0) / sortedPredictors.length)
        : 0,
      totalCoupons: sortedPredictors.reduce((sum, p) => sum + p.totalCoupons, 0),
      activePredictors: sortedPredictors.filter(p => p.pendingCoupons > 0).length
    }

    return NextResponse.json({
      predictors: sortedPredictors,
      stats
    })
  } catch (error) {
    console.error('Tahmincieler API error:', error)
    return NextResponse.json(
      { error: 'Tahmincieler yüklenirken bir hata oluştu' },
      { status: 500 }
    )
  }
}
