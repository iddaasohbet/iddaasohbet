import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const d = new Date(Date.now() - 60 * 1000)
    const count = await prisma.chatPresence.count({ where: { lastActive: { gt: d } } })
    return NextResponse.json({ online: count })
  } catch (e) {
    return NextResponse.json({ online: 0 })
  }
}


