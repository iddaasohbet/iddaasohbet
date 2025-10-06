import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'
import { allowMessage } from './ratelimit'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// GET last 100 messages
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const channel = searchParams.get('channel') || 'genel'
    const cursor = searchParams.get('cursor')
    const take = Number(searchParams.get('take') || 50)

    // Ensure channel exists
    const ch = await prisma.chatChannel.upsert({
      where: { slug: channel },
      update: {},
      create: { slug: channel, name: channel === 'genel' ? 'Genel' : channel }
    })

    const messages = await prisma.chatMessage.findMany({
      where: { channelId: ch.id },
      orderBy: { createdAt: 'desc' },
      take,
      ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
      include: {
        user: { select: { id: true, username: true, name: true, avatar: true, role: true } },
        parent: { select: { id: true, content: true, user: { select: { id: true, username: true, name: true } } } },
        reactions: true,
        replies: false
      }
    })
    const nextCursor = messages.length === take ? messages[messages.length - 1].id : null
    return NextResponse.json({ messages: messages.reverse(), nextCursor, channel: ch })
  } catch (e) {
    return NextResponse.json({ messages: [], nextCursor: null })
  }
}

// POST new message
export async function POST(request: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const body = await request.json()
    const { content, channel = 'genel', parentId = null } = body || {}
    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      return NextResponse.json({ error: 'Empty content' }, { status: 400 })
    }
    
    // Check ban
    const ban = await prisma.userBan.findFirst({
      where: { userId: session.user.id, OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }] }
    })
    if (ban) return NextResponse.json({ error: 'Banlısınız' }, { status: 403 })
    
    // Check mute
    const mute = await prisma.userMute.findFirst({
      where: { userId: session.user.id, expiresAt: { gt: new Date() } }
    })
    if (mute) return NextResponse.json({ error: 'Susturuldunuz' }, { status: 403 })
    
    if (!allowMessage(session.user.id)) {
      return NextResponse.json({ error: 'Çok hızlı gönderiyorsunuz' }, { status: 429 })
    }
    const text = (content || '').trim().slice(0, 1000)

    const ch = await prisma.chatChannel.upsert({
      where: { slug: channel },
      update: {},
      create: { slug: channel, name: channel === 'genel' ? 'Genel' : channel }
    })

    // Simple bot commands
    if (text === '/kurallar' || text === '/yardim') {
      const rules = `Sohbet Kuralları:\n- Saygılı olun, hakaret yok.\n- Spam / reklam yasaktır.\n- Kişisel bilgi paylaşmayın.\nKomutlar: /kurallar, /yardim`
      // create user message then bot reply
      await prisma.chatMessage.create({ data: { userId: session.user.id, channelId: ch.id, content: text } })
      const bot = await prisma.chatMessage.create({ data: { userId: session.user.id, channelId: ch.id, content: rules } })
      return NextResponse.json({ message: bot })
    }

    const msg = await prisma.chatMessage.create({
      data: {
        userId: session.user.id,
        channelId: ch.id,
        parentId: parentId || undefined,
        content: text
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


