import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

// GET - Tek kupon detayı
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const coupon = await prisma.coupon.findUnique({
      where: { id: params.id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            avatar: true,
            bio: true,
          },
        },
        matches: true,
        comments: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                username: true,
                avatar: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
        likes: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                username: true,
              },
            },
          },
        },
      },
    })

    if (!coupon) {
      return NextResponse.json({ error: 'Kupon bulunamadı' }, { status: 404 })
    }

    return NextResponse.json(coupon)
  } catch (error) {
    console.error('Kupon yüklenirken hata:', error)
    return NextResponse.json(
      { error: 'Kupon yüklenemedi' },
      { status: 500 }
    )
  }
}

// PUT - Kupon güncelle
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Giriş yapmalısınız' }, { status: 401 })
    }

    const body = await request.json()
    const { title, description, status, stake, totalOdds, potentialWin, matches } = body

    // Kupon sahibi mi veya admin mi kontrol et
    const existingCoupon = await prisma.coupon.findUnique({
      where: { id: params.id },
    })

    if (!existingCoupon) {
      return NextResponse.json({ error: 'Kupon bulunamadı' }, { status: 404 })
    }

    if (existingCoupon.userId !== session.user.id && session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Yetkiniz yok' }, { status: 403 })
    }

    // Maçları güncelle (varsa)
    if (matches) {
      // Önce mevcut maçları sil
      await prisma.match.deleteMany({
        where: { couponId: params.id },
      })

      // Yeni maçları ekle
      await prisma.match.createMany({
        data: matches.map((match: any) => ({
          couponId: params.id,
          team1: match.team1,
          team2: match.team2,
          pick: match.pick,
          odd: parseFloat(match.odd),
          league: match.league || 'Bilinmeyen',
          matchDate: match.matchDate ? new Date(match.matchDate) : new Date(),
        })),
      })
    }

    // Kuponu güncelle
    const updatedCoupon = await prisma.coupon.update({
      where: { id: params.id },
      data: {
        title,
        description,
        status,
        stake: stake ? parseFloat(stake) : undefined,
        totalOdds: totalOdds ? parseFloat(totalOdds) : undefined,
        potentialWin: potentialWin ? parseFloat(potentialWin) : undefined,
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

    return NextResponse.json(updatedCoupon)
  } catch (error) {
    console.error('Kupon güncellenirken hata:', error)
    return NextResponse.json(
      { error: 'Kupon güncellenemedi' },
      { status: 500 }
    )
  }
}

// DELETE - Kupon sil
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Giriş yapmalısınız' }, { status: 401 })
    }

    // Kupon sahibi mi veya admin mi kontrol et
    const existingCoupon = await prisma.coupon.findUnique({
      where: { id: params.id },
    })

    if (!existingCoupon) {
      return NextResponse.json({ error: 'Kupon bulunamadı' }, { status: 404 })
    }

    if (existingCoupon.userId !== session.user.id && session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Yetkiniz yok' }, { status: 403 })
    }

    await prisma.coupon.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: 'Kupon silindi' })
  } catch (error) {
    console.error('Kupon silinirken hata:', error)
    return NextResponse.json(
      { error: 'Kupon silinemedi' },
      { status: 500 }
    )
  }
}
