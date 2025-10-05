import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

// GET - Tüm kuponları listele
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const status = searchParams.get('status')
    const userId = searchParams.get('userId')

    const skip = (page - 1) * limit

    const where: any = {}
    if (status) where.status = status
    if (userId) where.userId = userId

    const [coupons, total] = await Promise.all([
      prisma.coupon.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              username: true,
              avatar: true,
            },
          },
          matches: true,
          _count: {
            select: {
              comments: true,
              likes: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
      }),
      prisma.coupon.count({ where }),
    ])

    return NextResponse.json({
      coupons,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Kuponlar yüklenirken hata:', error)
    return NextResponse.json(
      { error: 'Kuponlar yüklenemedi' },
      { status: 500 }
    )
  }
}

// POST - Yeni kupon oluştur
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Giriş yapmalısınız' }, { status: 401 })
    }

    const body = await request.json()
    const { title, description, stake, totalOdds, potentialWin, matches } = body

    // Validasyon
    if (!title || !matches || matches.length === 0) {
      return NextResponse.json(
        { error: 'Başlık ve en az 1 maç gereklidir' },
        { status: 400 }
      )
    }

    // Sunucu tarafı doğrulama ve hesaplama
    const sanitizedMatches = (Array.isArray(matches) ? matches : [])
      .map((m: any) => ({
        homeTeam: String(m.team1 || '').trim(),
        awayTeam: String(m.team2 || '').trim(),
        prediction: String(m.pick || '').trim(),
        odds: Number.parseFloat(m.odd ?? '1'),
        league: String(m.league || 'Bilinmeyen'),
        matchDate: m.matchDate ? new Date(m.matchDate) : new Date(),
      }))
      .filter((m: any) => Number.isFinite(m.odds) && m.odds > 0 && m.homeTeam && m.awayTeam)

    const computedTotalOdds = sanitizedMatches.length > 0
      ? sanitizedMatches.reduce((acc: number, m: any) => acc * m.odds, 1)
      : 1
    const defaultTitle = (title && String(title).trim().length > 0)
      ? String(title).trim()
      : `Kupon - ${new Date().toLocaleString('tr-TR')} (${(sanitizedMatches?.length ?? 0)} maç)`
    const stakeNumber = Number.parseFloat(String(stake))
    const totalOddsNumber = Number.isFinite(Number.parseFloat(String(totalOdds))) && Number.parseFloat(String(totalOdds)) > 0
      ? Number.parseFloat(String(totalOdds))
      : Number.parseFloat(computedTotalOdds.toFixed(2))
    const potentialWinNumber = Number.isFinite(Number.parseFloat(String(potentialWin)))
      ? Number.parseFloat(String(potentialWin))
      : Number.parseFloat((totalOddsNumber * (Number.isFinite(stakeNumber) ? stakeNumber : 0)).toFixed(2))

    // Kupon oluştur
    const coupon = await prisma.coupon.create({
      data: {
        title: defaultTitle,
        description,
        stake: Number.isFinite(stakeNumber) ? stakeNumber : 0,
        totalOdds: totalOddsNumber,
        potentialWin: Number.isFinite(potentialWinNumber) ? potentialWinNumber : 0,
        status: 'PENDING',
        userId: session.user.id,
        ...(sanitizedMatches.length > 0 && {
          matches: {
            create: sanitizedMatches.map((m: any) => ({
              homeTeam: m.homeTeam,
              awayTeam: m.awayTeam,
              prediction: m.prediction || '-',
              odds: m.odds,
              league: m.league,
              category: 'DIGER',
              matchDate: m.matchDate,
            })),
          },
        }),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            avatar: true,
          },
        },
        matches: true,
      },
    })

    return NextResponse.json(coupon, { status: 201 })
  } catch (error) {
    console.error('Kupon oluşturulurken hata:', error)
    return NextResponse.json(
      { error: 'Kupon oluşturulamadı' },
      { status: 500 }
    )
  }
}
