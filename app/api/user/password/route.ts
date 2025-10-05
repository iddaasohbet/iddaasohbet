import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'
import { hashPassword, verifyPassword } from '@/lib/auth'

export async function PUT(request: Request) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Giriş yapmalısınız' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { currentPassword, newPassword } = body

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: 'Tüm alanları doldurunuz' },
        { status: 400 }
      )
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: 'Yeni şifre en az 6 karakter olmalıdır' },
        { status: 400 }
      )
    }

    // Kullanıcıyı getir
    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Kullanıcı bulunamadı' },
        { status: 404 }
      )
    }

    // Mevcut şifreyi doğrula
    const isValid = await verifyPassword(currentPassword, user.password)
    
    if (!isValid) {
      return NextResponse.json(
        { error: 'Mevcut şifreniz yanlış' },
        { status: 400 }
      )
    }

    // Yeni şifreyi hashle ve güncelle
    const hashedPassword = await hashPassword(newPassword)
    
    await prisma.user.update({
      where: { id: session.user.id },
      data: { password: hashedPassword }
    })

    return NextResponse.json({
      message: 'Şifre başarıyla değiştirildi'
    })
  } catch (error) {
    console.error('Password change error:', error)
    return NextResponse.json(
      { error: 'Şifre değiştirilirken bir hata oluştu' },
      { status: 500 }
    )
  }
}
