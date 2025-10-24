import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    // Toplam kupon sayısı
    const totalCoupons = await prisma.coupon.count()

    // Kupon durumlarına göre sayılar
    const wonCoupons = await prisma.coupon.count({ where: { status: 'WON' } })
    const lostCoupons = await prisma.coupon.count({ where: { status: 'LOST' } })
    const pendingCoupons = await prisma.coupon.count({ where: { status: 'PENDING' } })

    // Başarı oranı
    const completedCoupons = wonCoupons + lostCoupons
    const winRate = completedCoupons > 0
      ? ((wonCoupons / completedCoupons) * 100).toFixed(1)
      : '0.0'

    // Toplam kullanıcı
    const totalUsers = await prisma.user.count()
    const realActiveUsers = await prisma.user.count({
      where: {
        coupons: {
          some: {
            status: 'PENDING'
          }
        }
      }
    })
    // Gerçek aktif kullanıcılara 30 sahte kullanıcı ekle
    const activeUsers = realActiveUsers + 30

    // Toplam yorum
    const totalComments = await prisma.comment.count()

    // Toplam beğeni
    const totalLikes = await prisma.like.count()

    // Platform kazancı (placeholder hesaplama)
    const totalProfit = wonCoupons * 2500

    // Son 7 günlük istatistikler
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const recentCoupons = await prisma.coupon.findMany({
      where: {
        createdAt: {
          gte: sevenDaysAgo
        }
      },
      select: {
        createdAt: true,
        status: true,
        totalOdds: true
      }
    })

    // Günlük istatistikler
    const dailyStats = Array.from({ length: 7 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (6 - i))
      const dayName = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'][date.getDay()]
      
      const dayCoupons = recentCoupons.filter(c => {
        const cDate = new Date(c.createdAt)
        return cDate.toDateString() === date.toDateString()
      })

      const dayWon = dayCoupons.filter(c => c.status === 'WON').length
      const dayCompleted = dayCoupons.filter(c => c.status !== 'PENDING').length
      const dayWinRate = dayCompleted > 0 
        ? Math.round((dayWon / dayCompleted) * 100)
        : 0

      return {
        day: dayName,
        coupons: dayCoupons.length,
        winRate: dayWinRate,
        profit: dayWon * 2000 // Placeholder
      }
    })

    // Tüm kuponları getir ve maç sayısına göre analiz yap
    const allCoupons = await prisma.coupon.findMany({
      include: {
        matches: true
      }
    })

    // Bahis tipi dağılımı (placeholder - gerçek için match type gerekir)
    const betTypes = [
      { 
        type: 'Maç Sonucu', 
        percentage: totalCoupons > 0 ? Math.round((totalCoupons * 0.45)) : 0,
        count: Math.round(totalCoupons * 0.45), 
        color: 'from-green-500 to-green-600' 
      },
      { 
        type: 'Alt/Üst', 
        percentage: totalCoupons > 0 ? Math.round((totalCoupons * 0.28)) : 0,
        count: Math.round(totalCoupons * 0.28), 
        color: 'from-blue-500 to-blue-600' 
      },
      { 
        type: 'Karşılıklı Gol', 
        percentage: totalCoupons > 0 ? Math.round((totalCoupons * 0.15)) : 0,
        count: Math.round(totalCoupons * 0.15), 
        color: 'from-yellow-400 to-yellow-500' 
      },
      { 
        type: 'Handikap', 
        percentage: totalCoupons > 0 ? Math.round((totalCoupons * 0.08)) : 0,
        count: Math.round(totalCoupons * 0.08), 
        color: 'from-purple-500 to-purple-600' 
      },
      { 
        type: 'Diğer', 
        percentage: totalCoupons > 0 ? Math.round((totalCoupons * 0.04)) : 0,
        count: Math.round(totalCoupons * 0.04), 
        color: 'from-orange-500 to-orange-600' 
      }
    ]

    // Popüler ligler (placeholder)
    const leagues = [
      { 
        name: 'Süper Lig', 
        matches: Math.round(totalCoupons * 0.35), 
        winRate: Math.round(Number(winRate) + Math.random() * 5 - 2.5), 
        avgOdds: (2.4 + Math.random() * 0.4).toFixed(1), 
        icon: '🇹🇷' 
      },
      { 
        name: 'Premier League', 
        matches: Math.round(totalCoupons * 0.25), 
        winRate: Math.round(Number(winRate) + Math.random() * 5 - 2.5), 
        avgOdds: (2.6 + Math.random() * 0.4).toFixed(1), 
        icon: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' 
      },
      { 
        name: 'La Liga', 
        matches: Math.round(totalCoupons * 0.20), 
        winRate: Math.round(Number(winRate) + Math.random() * 5 - 2.5), 
        avgOdds: (2.5 + Math.random() * 0.4).toFixed(1), 
        icon: '🇪🇸' 
      },
      { 
        name: 'Bundesliga', 
        matches: Math.round(totalCoupons * 0.12), 
        winRate: Math.round(Number(winRate) + Math.random() * 5 - 2.5), 
        avgOdds: (2.3 + Math.random() * 0.4).toFixed(1), 
        icon: '🇩🇪' 
      },
      { 
        name: 'Serie A', 
        matches: Math.round(totalCoupons * 0.10), 
        winRate: Math.round(Number(winRate) + Math.random() * 5 - 2.5), 
        avgOdds: (2.7 + Math.random() * 0.4).toFixed(1), 
        icon: '🇮🇹' 
      },
      { 
        name: 'NBA', 
        matches: Math.round(totalCoupons * 0.08), 
        winRate: Math.round(Number(winRate) + Math.random() * 5 - 2.5), 
        avgOdds: (1.8 + Math.random() * 0.3).toFixed(1), 
        icon: '🏀' 
      }
    ]

    return NextResponse.json({
      mainStats: {
        totalCoupons,
        winRate: Number(winRate),
        totalProfit,
        activeUsers
      },
      dailyStats,
      betTypes,
      leagues,
      liveStats: {
        activeNow: pendingCoupons,
        todayWon: dailyStats[dailyStats.length - 1]?.profit || 0,
        highestOdds: allCoupons.reduce((max, c) => Math.max(max, c.totalOdds), 0).toFixed(1)
      }
    })
  } catch (error) {
    console.error('İstatistikler API error:', error)
    return NextResponse.json(
      { error: 'İstatistikler yüklenirken bir hata oluştu' },
      { status: 500 }
    )
  }
}
