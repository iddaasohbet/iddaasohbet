import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST() {
  try {
    const stat = await prisma.siteStat.upsert({
      where: { key: 'visits_total' },
      create: { key: 'visits_total', value: 1 },
      update: { value: { increment: 1 } }
    })
    return NextResponse.json({ ok: true, total: stat.value })
  } catch (e) {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}

export async function GET() {
  try {
    const stat = await prisma.siteStat.findUnique({ where: { key: 'visits_total' } })
    return NextResponse.json({ ok: true, total: stat?.value ?? 0 })
  } catch (e) {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}


