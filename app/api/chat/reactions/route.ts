import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { messageId, emoji } = await request.json()
  if (!messageId || !emoji) return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  await prisma.chatReaction.upsert({
    where: { messageId_userId_emoji: { messageId, userId: session.user.id, emoji } },
    update: {},
    create: { messageId, userId: session.user.id, emoji }
  })
  return NextResponse.json({ ok: true })
}

export async function DELETE(request: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { searchParams } = new URL(request.url)
  const messageId = searchParams.get('messageId')
  const emoji = searchParams.get('emoji')
  if (!messageId || !emoji) return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  await prisma.chatReaction.delete({
    where: { messageId_userId_emoji: { messageId, userId: session.user.id, emoji } }
  })
  return NextResponse.json({ ok: true })
}


