import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function buildMessage() {
  const variants = [
    `📣 Profesyonel web tasarım ve yazılım çözümleri için güvenilir adres: cihatsoft.com\n\n🔗 Hızlı, güvenli, SEO uyumlu projeler.\n🤝 Bu platformun yapımında da emeği var.\n👉 İletişim: cihatsoft.com`,
    `🚀 İşinizi büyütecek modern web siteleri ve özel yazılımlar için: cihatsoft.com\n\n⚙️ Kurumsal siteler, e-ticaret, entegrasyonlar\n💼 Sektöre özel çözümler\n➡️ cihatsoft.com`,
    `🎯 Hızlı performans, şık tasarım, sağlam altyapı: cihatsoft.com\n\n🛠️ Next.js, Tailwind, Prisma, Vercel\n🔒 Güvenlik ve ölçeklenebilirlik\n📞 cihatsoft.com`
  ]
  return variants[Math.floor(Math.random() * variants.length)]
}

export async function GET(req: NextRequest) {
  try {
    // Ensure channel exists
    const channel = await prisma.chatChannel.upsert({
      where: { slug: 'genel' },
      update: {},
      create: { slug: 'genel', name: 'Genel' }
    })

    // Ensure ad bot user exists
    const bot = await prisma.user.upsert({
      where: { username: 'reklam-botu' },
      update: {},
      create: {
        id: 'adbot',
        username: 'reklam-botu',
        email: 'adbot@cihatsoft.com',
        password: 'bot',
        name: 'Reklam Botu',
        role: 'USER',
        verified: true
      }
    })

    // Optional: avoid duplicate within short window (1h)
    const d = new Date(Date.now() - 55 * 60 * 1000)
    const recent = await prisma.chatMessage.findFirst({
      where: { userId: bot.id, channelId: channel.id, createdAt: { gt: d } },
      orderBy: { createdAt: 'desc' }
    })
    if (recent) {
      return NextResponse.json({ ok: true, skipped: true })
    }

    const content = buildMessage()
    const msg = await prisma.chatMessage.create({
      data: {
        userId: bot.id,
        channelId: channel.id,
        content
      }
    })
    return NextResponse.json({ ok: true, messageId: msg.id })
  } catch (e) {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}


