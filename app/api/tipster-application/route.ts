import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'

// Başvuru oluştur
export async function POST(request: Request) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Giriş yapmalısınız' },
        { status: 401 }
      )
    }

    // Kullanıcı zaten tahminçiyse
    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    })

    if (user?.verified) {
      return NextResponse.json(
        { error: 'Zaten tahminçisiniz' },
        { status: 400 }
      )
    }

    // Bekleyen başvuru varsa
    const existingApplication = await prisma.tipsterApplication.findFirst({
      where: {
        userId: session.user.id,
        status: 'PENDING'
      }
    })

    if (existingApplication) {
      return NextResponse.json(
        { error: 'Zaten bekleyen bir başvurunuz var' },
        { status: 400 }
      )
    }

    const body = await request.json()
    const { message, experience } = body

    if (!message || message.length < 50) {
      return NextResponse.json(
        { error: 'Başvuru mesajı en az 50 karakter olmalıdır' },
        { status: 400 }
      )
    }

    // Başvuru oluştur
    const application = await prisma.tipsterApplication.create({
      data: {
        userId: session.user.id,
        userName: session.user.username || session.user.name || 'Bilinmeyen',
        userEmail: session.user.email || '',
        message,
        experience: experience || null
      }
    })

    return NextResponse.json({
      message: 'Başvurunuz başarıyla gönderildi',
      application
    })
  } catch (error) {
    console.error('Tipster application error:', error)
    return NextResponse.json(
      { error: 'Başvuru gönderilirken bir hata oluştu' },
      { status: 500 }
    )
  }
}

// Tüm başvuruları listele (Admin)
export async function GET() {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Giriş yapmalısınız' },
        { status: 401 }
      )
    }

    // Admin kontrolü
    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    })

    if (user?.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Bu işlem için yetkiniz yok' },
        { status: 403 }
      )
    }

    const applications = await prisma.tipsterApplication.findMany({
      orderBy: [
        { status: 'asc' }, // PENDING en üstte
        { createdAt: 'desc' }
      ]
    })

    return NextResponse.json({ applications })
  } catch (error) {
    console.error('Get applications error:', error)
    return NextResponse.json(
      { error: 'Başvurular yüklenirken bir hata oluştu' },
      { status: 500 }
    )
  }
}
