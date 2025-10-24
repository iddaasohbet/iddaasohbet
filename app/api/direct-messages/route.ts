import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// GET conversations list (son mesajlaşılan kişiler)
export async function GET(request: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  
  try {
    const { searchParams } = new URL(request.url)
    const withUserId = searchParams.get('withUserId')
    
    // Belirli bir kullanıcıyla mesajları getir
    if (withUserId) {
      const messages = await prisma.directMessage.findMany({
        where: {
          OR: [
            { senderId: session.user.id, receiverId: withUserId },
            { senderId: withUserId, receiverId: session.user.id }
          ]
        },
        orderBy: { createdAt: 'asc' },
        include: {
          sender: { select: { id: true, username: true, name: true, avatar: true, role: true } },
          receiver: { select: { id: true, username: true, name: true, avatar: true, role: true } }
        }
      })
      
      // Okunmamış mesajları okundu olarak işaretle
      await prisma.directMessage.updateMany({
        where: {
          senderId: withUserId,
          receiverId: session.user.id,
          read: false
        },
        data: {
          read: true,
          readAt: new Date()
        }
      })
      
      return NextResponse.json({ messages })
    }
    
    // Konuşma listesi - son mesajlaşılan kişiler
    const sentMessages = await prisma.directMessage.findMany({
      where: { senderId: session.user.id },
      distinct: ['receiverId'],
      orderBy: { createdAt: 'desc' },
      include: {
        receiver: { select: { id: true, username: true, name: true, avatar: true, role: true } }
      },
      take: 50
    })
    
    const receivedMessages = await prisma.directMessage.findMany({
      where: { receiverId: session.user.id },
      distinct: ['senderId'],
      orderBy: { createdAt: 'desc' },
      include: {
        sender: { select: { id: true, username: true, name: true, avatar: true, role: true } }
      },
      take: 50
    })
    
    // Benzersiz kullanıcıları al
    const userMap = new Map()
    sentMessages.forEach(msg => {
      if (!userMap.has(msg.receiverId)) {
        userMap.set(msg.receiverId, { user: msg.receiver, lastMessageAt: msg.createdAt })
      }
    })
    receivedMessages.forEach(msg => {
      if (!userMap.has(msg.senderId)) {
        userMap.set(msg.senderId, { user: msg.sender, lastMessageAt: msg.createdAt })
      } else {
        const existing = userMap.get(msg.senderId)
        if (new Date(msg.createdAt) > new Date(existing.lastMessageAt)) {
          userMap.set(msg.senderId, { user: msg.sender, lastMessageAt: msg.createdAt })
        }
      }
    })
    
    // Okunmamış mesaj sayılarını al
    const conversations = await Promise.all(
      Array.from(userMap.values()).map(async (conv) => {
        const unreadCount = await prisma.directMessage.count({
          where: {
            senderId: conv.user.id,
            receiverId: session.user.id,
            read: false
          }
        })
        return { ...conv, unreadCount }
      })
    )
    
    // Tarihe göre sırala
    conversations.sort((a, b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime())
    
    return NextResponse.json({ conversations })
  } catch (e) {
    console.error('DM GET Error:', e)
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
  }
}

// POST new message
export async function POST(request: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  
  try {
    const body = await request.json()
    const { content, receiverId } = body || {}
    
    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      return NextResponse.json({ error: 'Empty content' }, { status: 400 })
    }
    
    if (!receiverId) {
      return NextResponse.json({ error: 'Receiver required' }, { status: 400 })
    }
    
    // Kendin mesaj atamazsın
    if (receiverId === session.user.id) {
      return NextResponse.json({ error: 'Cannot message yourself' }, { status: 400 })
    }
    
    // Alıcının var olduğunu kontrol et
    const receiver = await prisma.user.findUnique({ where: { id: receiverId } })
    if (!receiver) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    
    const text = content.trim().slice(0, 2000)
    
    const message = await prisma.directMessage.create({
      data: {
        content: text,
        senderId: session.user.id,
        receiverId
      },
      include: {
        sender: { select: { id: true, username: true, name: true, avatar: true, role: true } },
        receiver: { select: { id: true, username: true, name: true, avatar: true, role: true } }
      }
    })
    
    return NextResponse.json({ message })
  } catch (e) {
    console.error('DM POST Error:', e)
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}

