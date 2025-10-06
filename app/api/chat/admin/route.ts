import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Ban user
export async function POST(request: NextRequest) {
  const session = await auth()
  if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'MODERATOR')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  const { action, userId, reason, duration } = await request.json()
  
  if (action === 'ban') {
    const expiresAt = duration ? new Date(Date.now() + duration * 60 * 1000) : null
    await prisma.userBan.create({
      data: { userId, bannedBy: session.user.id, reason, expiresAt }
    })
    return NextResponse.json({ ok: true })
  }
  
  if (action === 'mute') {
    const expiresAt = new Date(Date.now() + (duration || 10) * 60 * 1000)
    await prisma.userMute.create({
      data: { userId, mutedBy: session.user.id, reason, expiresAt }
    })
    return NextResponse.json({ ok: true })
  }
  
  if (action === 'unban') {
    await prisma.userBan.deleteMany({ where: { userId } })
    return NextResponse.json({ ok: true })
  }
  
  if (action === 'unmute') {
    await prisma.userMute.deleteMany({ where: { userId } })
    return NextResponse.json({ ok: true })
  }
  
  return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
}
