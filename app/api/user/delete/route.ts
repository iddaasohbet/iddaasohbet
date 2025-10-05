import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { signOut } from '@/auth'
import { prisma } from '@/lib/db'

export async function DELETE() {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Giriş yapmalısınız' },
        { status: 401 }
      )
    }

    // Kullanıcıyı ve ilişkili tüm verileri sil
    // Prisma cascade delete kullanacak (schema'da tanımlanmışsa)
    await prisma.user.delete({
      where: { id: session.user.id }
    })

    return NextResponse.json({
      message: 'Hesap başarıyla silindi'
    })
  } catch (error) {
    console.error('Account deletion error:', error)
    return NextResponse.json(
      { error: 'Hesap silinirken bir hata oluştu' },
      { status: 500 }
    )
  }
}
