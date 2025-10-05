import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import prisma from '@/lib/db'

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
    const { name, username, bio, avatar } = body

    // Username benzersizlik kontrolü
    if (username && username !== session.user.username) {
      const existingUser = await prisma.user.findUnique({
        where: { username }
      })

      if (existingUser) {
        return NextResponse.json(
          { error: 'Bu kullanıcı adı zaten kullanılıyor' },
          { status: 400 }
        )
      }
    }

    // Profil güncelleme
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        ...(name && { name }),
        ...(username && { username }),
        ...(bio !== undefined && { bio }),
        ...(avatar && { avatar })
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        bio: true,
        avatar: true
      }
    })

    return NextResponse.json({
      message: 'Profil başarıyla güncellendi',
      user: updatedUser
    })
  } catch (error) {
    console.error('Profile update error:', error)
    return NextResponse.json(
      { error: 'Profil güncellenirken bir hata oluştu' },
      { status: 500 }
    )
  }
}
