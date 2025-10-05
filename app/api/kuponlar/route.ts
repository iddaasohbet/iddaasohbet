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

    // Kupon oluştur
    const coupon = await prisma.coupon.create({
      data: {
        title,
        description,
        stake: parseFloat(stake) || 0,
        totalOdds: parseFloat(totalOdds),
        potentialWin: parseFloat(potentialWin),
        status: 'PENDING',
        userId: session.user.id,
        matches: {
          create: matches.map((match: any) => ({
            team1: match.team1,
            team2: match.team2,
            pick: match.pick,
            odd: parseFloat(match.odd),
            league: match.league || 'Bilinmeyen',
            matchDate: match.matchDate ? new Date(match.matchDate) : new Date(),
          })),
        },
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
