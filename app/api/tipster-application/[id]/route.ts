import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import prisma from '@/lib/db'

interface Props {
  params: {
    id: string
  }
}

// Başvuruyu onayla veya reddet
export async function PUT(request: Request, { params }: Props) {
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

    const body = await request.json()
    const { status, adminNote } = body

    if (!['APPROVED', 'REJECTED'].includes(status)) {
      return NextResponse.json(
        { error: 'Geçersiz durum' },
        { status: 400 }
      )
    }

    // Başvuruyu güncelle
    const application = await prisma.tipsterApplication.update({
      where: { id: params.id },
      data: {
        status,
        adminNote: adminNote || null,
        adminId: session.user.id,
        decidedAt: new Date()
      }
    })

    // Eğer onaylandıysa kullanıcıyı tahminçi yap
    if (status === 'APPROVED') {
      await prisma.user.update({
        where: { id: application.userId },
        data: { verified: true }
      })
    }

    return NextResponse.json({
      message: status === 'APPROVED' ? 'Başvuru onaylandı' : 'Başvuru reddedildi',
      application
    })
  } catch (error) {
    console.error('Update application error:', error)
    return NextResponse.json(
      { error: 'Başvuru güncellenirken bir hata oluştu' },
      { status: 500 }
    )
  }
}

// Başvuruyu sil
export async function DELETE(request: Request, { params }: Props) {
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

    await prisma.tipsterApplication.delete({
      where: { id: params.id }
    })

    return NextResponse.json({
      message: 'Başvuru silindi'
    })
  } catch (error) {
    console.error('Delete application error:', error)
    return NextResponse.json(
      { error: 'Başvuru silinirken bir hata oluştu' },
      { status: 500 }
    )
  }
}
