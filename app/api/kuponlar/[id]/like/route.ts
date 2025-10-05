import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

// POST - Kupon beğen/beğenme
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Giriş yapmalısınız' }, { status: 401 })
    }

    // Daha önce beğenmiş mi kontrol et
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_couponId: {
          userId: session.user.id,
          couponId: params.id,
        },
      },
    })

    if (existingLike) {
      // Beğeniyi kaldır
      await prisma.like.delete({
        where: {
          userId_couponId: {
            userId: session.user.id,
            couponId: params.id,
          },
        },
      })

      return NextResponse.json({ liked: false, message: 'Beğeni kaldırıldı' })
    } else {
      // Beğen
      await prisma.like.create({
        data: {
          userId: session.user.id,
          couponId: params.id,
        },
      })

      return NextResponse.json({ liked: true, message: 'Beğenildi' })
    }
  } catch (error) {
    console.error('Beğeni işlemi sırasında hata:', error)
    return NextResponse.json(
      { error: 'İşlem başarısız' },
      { status: 500 }
    )
  }
}
