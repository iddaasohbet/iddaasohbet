import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// GET last 100 messages
export async function GET() {
  try {
    const messages = await prisma.chatMessage.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
      include: {
        user: { select: { id: true, username: true, name: true, avatar: true } }
      }
    })
    return NextResponse.json({ messages: messages.reverse() })
  } catch (e) {
    return NextResponse.json({ messages: [] })
  }
}

// POST new message
export async function POST(request: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const { content } = await request.json()
    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      return NextResponse.json({ error: 'Empty content' }, { status: 400 })
    }
    const msg = await prisma.chatMessage.create({
      data: {
        userId: session.user.id,
        content: content.trim().slice(0, 1000)
      },
      include: {
        user: { select: { id: true, username: true, name: true, avatar: true } }
      }
    })
    return NextResponse.json({ message: msg })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}


