import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Update heartbeat / typing
export async function POST(request: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { typing } = await request.json().catch(() => ({ typing: false }))
  const now = new Date()
  const typingUntil = typing ? new Date(now.getTime() + 3000) : null
  await prisma.chatPresence.upsert({
    where: { userId: session.user.id },
    create: { userId: session.user.id, lastActive: now, typingUntil },
    update: { lastActive: now, typingUntil }
  })
  return NextResponse.json({ ok: true })
}

// List online users
export async function GET() {
  const d = new Date(Date.now() - 60 * 1000)
  const list = await prisma.chatPresence.findMany({
    where: { lastActive: { gt: d } },
    include: { user: { select: { id: true, username: true, name: true, avatar: true } } },
    orderBy: { lastActive: 'desc' }
  })
  return NextResponse.json({ users: list })
}


