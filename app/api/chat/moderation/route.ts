import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function DELETE(request: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (session.user.role !== 'ADMIN' && session.user.role !== 'MODERATOR') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  await prisma.chatMessage.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}


