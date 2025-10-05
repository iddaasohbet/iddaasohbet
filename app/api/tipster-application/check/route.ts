import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import prisma from '@/lib/db'

// Kullanıcının mevcut başvurusunu kontrol et
export async function GET() {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Giriş yapmalısınız' },
        { status: 401 }
      )
    }

    // En son başvuruyu getir
    const application = await prisma.tipsterApplication.findFirst({
      where: {
        userId: session.user.id
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({
      application
    })
  } catch (error) {
    console.error('Check application error:', error)
    return NextResponse.json(
      { error: 'Başvuru kontrol edilirken bir hata oluştu' },
      { status: 500 }
    )
  }
}
