import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Poll live fixtures, detect new goals, and append bot messages to global chat
export async function GET() {
  try {
    const apiKey = process.env.APISPORTS_KEY || process.env.RAPIDAPI_KEY
    if (!apiKey) return NextResponse.json({ ok: false, error: 'Missing API key' }, { status: 500 })

    const res = await fetch('https://v3.football.api-sports.io/fixtures?live=all&timezone=Europe/Istanbul', {
      method: 'GET',
      headers: {
        'x-rapidapi-key': apiKey as string,
        'x-rapidapi-host': 'v3.football.api-sports.io',
        'x-apisports-key': apiKey as string
      },
      cache: 'no-store'
    })
    if (!res.ok) throw new Error(`Upstream ${res.status}`)
    const data = await res.json()
    const fixtures: any[] = Array.isArray(data?.response) ? data.response : []

    // Ensure global channel
    const ch = await prisma.chatChannel.upsert({
      where: { slug: 'genel' },
      update: {},
      create: { slug: 'genel', name: 'Genel' }
    })

    // Find/create bot user (single shared user)
    const botUsername = 'goalbot'
    const bot = await prisma.user.upsert({
      where: { username: botUsername },
      update: {},
      create: {
        username: botUsername,
        email: 'goalbot@iddaasohbet.local',
        password: 'not-used',
        name: 'Gol Botu',
        role: 'MODERATOR'
      }
    })

    const messages: string[] = []
    for (const fx of fixtures) {
      const id: number | undefined = fx?.fixture?.id
      if (!id) continue
      const home = fx?.teams?.home?.name
      const away = fx?.teams?.away?.name
      const minute: number | null = fx?.fixture?.status?.elapsed ?? null
      const gh = fx?.goals?.home ?? 0
      const ga = fx?.goals?.away ?? 0
      const sum = (gh ?? 0) + (ga ?? 0)

      const state = await prisma.goalState.upsert({
        where: { fixtureId: id },
        update: {},
        create: { fixtureId: id, lastSum: 0 }
      })

      if (sum > state.lastSum) {
        // New goal detected
        const text = `[GOL] ${minute != null ? `${minute}' ` : ''}${home ?? ''} ${gh}-${ga} ${away ?? ''}`.trim()
        await prisma.chatMessage.create({
          data: { userId: bot.id, channelId: ch.id, content: text }
        })
        await prisma.goalState.update({ where: { fixtureId: id }, data: { lastSum: sum } })
        messages.push(text)
      }
    }

    // Demo mesajları kapatıldı

    return NextResponse.json({ ok: true, published: messages.length })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || 'err' }, { status: 500 })
  }
}


