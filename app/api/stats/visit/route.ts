import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const rows = await prisma.$queryRawUnsafe<any[]>(`SELECT COUNT(1) AS c FROM site_visits`)
    const total = Number(rows?.[0]?.c || 0)
    return NextResponse.json({ total })
  } catch (e) {
    return NextResponse.json({ total: 0 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const ua = request.headers.get('user-agent') || ''
    const fwd = request.headers.get('x-forwarded-for') || ''
    const ip = fwd.split(',')[0]?.trim() || ''
    await prisma.$executeRawUnsafe(`INSERT INTO site_visits (ip, ua) VALUES (?, ?)`, ip, ua)
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}


