import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Update heartbeat / typing
export async function POST(request: NextRequest) {
  try {
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
  } catch (e) {
    return NextResponse.json({ ok: false })
  }
}

// List online users
export async function GET() {
  try {
    const d = new Date(Date.now() - 60 * 1000)
    const list = await prisma.chatPresence.findMany({
      where: { lastActive: { gt: d } },
      include: { user: { select: { id: true, username: true, name: true, avatar: true, role: true } } },
      orderBy: { lastActive: 'desc' }
    })
    
    // 30 sahte kullanıcı ekle
    const fakeUsers = [
      { id: 'fake1', user: { id: 'f1', username: 'Futbol_Aşkı_58', name: 'Futbol_Aşkı_58', avatar: null, role: 'USER' }, lastActive: new Date(), typingUntil: null },
      { id: 'fake2', user: { id: 'f2', username: 'Gs_Fener_61', name: 'Gs_Fener_61', avatar: null, role: 'USER' }, lastActive: new Date(), typingUntil: null },
      { id: 'fake3', user: { id: 'f3', username: 'Spor_King', name: 'Spor_King', avatar: null, role: 'USER' }, lastActive: new Date(), typingUntil: null },
      { id: 'fake4', user: { id: 'f4', username: 'İddaaCı34', name: 'İddaaCı34', avatar: null, role: 'USER' }, lastActive: new Date(), typingUntil: null },
      { id: 'fake5', user: { id: 'f5', username: 'BahisKralı', name: 'BahisKralı', avatar: null, role: 'USER' }, lastActive: new Date(), typingUntil: null },
      { id: 'fake6', user: { id: 'f6', username: 'Aslan_35', name: 'Aslan_35', avatar: null, role: 'USER' }, lastActive: new Date(), typingUntil: null },
      { id: 'fake7', user: { id: 'f7', username: 'Kupon_Pro', name: 'Kupon_Pro', avatar: null, role: 'USER' }, lastActive: new Date(), typingUntil: null },
      { id: 'fake8', user: { id: 'f8', username: 'Maç_Bilgesi', name: 'Maç_Bilgesi', avatar: null, role: 'USER' }, lastActive: new Date(), typingUntil: null },
      { id: 'fake9', user: { id: 'f9', username: 'Beşiktaş_06', name: 'Beşiktaş_06', avatar: null, role: 'USER' }, lastActive: new Date(), typingUntil: null },
      { id: 'fake10', user: { id: 'f10', username: 'TekMaç_16', name: 'TekMaç_16', avatar: null, role: 'USER' }, lastActive: new Date(), typingUntil: null },
      { id: 'fake11', user: { id: 'f11', username: 'Kanarya_07', name: 'Kanarya_07', avatar: null, role: 'USER' }, lastActive: new Date(), typingUntil: null },
      { id: 'fake12', user: { id: 'f12', username: 'Gol_Avcısı', name: 'Gol_Avcısı', avatar: null, role: 'USER' }, lastActive: new Date(), typingUntil: null },
      { id: 'fake13', user: { id: 'f13', username: 'Tahmin_Master', name: 'Tahmin_Master', avatar: null, role: 'USER' }, lastActive: new Date(), typingUntil: null },
      { id: 'fake14', user: { id: 'f14', username: 'Skor_Takipçi', name: 'Skor_Takipçi', avatar: null, role: 'USER' }, lastActive: new Date(), typingUntil: null },
      { id: 'fake15', user: { id: 'f15', username: 'Maç_Yorumcu', name: 'Maç_Yorumcu', avatar: null, role: 'USER' }, lastActive: new Date(), typingUntil: null },
      { id: 'fake16', user: { id: 'f16', username: 'Lig_Uzmanı', name: 'Lig_Uzmanı', avatar: null, role: 'USER' }, lastActive: new Date(), typingUntil: null },
      { id: 'fake17', user: { id: 'f17', username: 'Alt_Üst_41', name: 'Alt_Üst_41', avatar: null, role: 'USER' }, lastActive: new Date(), typingUntil: null },
      { id: 'fake18', user: { id: 'f18', username: 'Süper_Kombine', name: 'Süper_Kombine', avatar: null, role: 'USER' }, lastActive: new Date(), typingUntil: null },
      { id: 'fake19', user: { id: 'f19', username: 'Şans_Oyunu', name: 'Şans_Oyunu', avatar: null, role: 'USER' }, lastActive: new Date(), typingUntil: null },
      { id: 'fake20', user: { id: 'f20', username: 'Premier_Fan', name: 'Premier_Fan', avatar: null, role: 'USER' }, lastActive: new Date(), typingUntil: null },
      { id: 'fake21', user: { id: 'f21', username: 'LaLiga_Takip', name: 'LaLiga_Takip', avatar: null, role: 'USER' }, lastActive: new Date(), typingUntil: null },
      { id: 'fake22', user: { id: 'f22', username: 'SerieA_Lover', name: 'SerieA_Lover', avatar: null, role: 'USER' }, lastActive: new Date(), typingUntil: null },
      { id: 'fake23', user: { id: 'f23', username: 'Bundesliga_23', name: 'Bundesliga_23', avatar: null, role: 'USER' }, lastActive: new Date(), typingUntil: null },
      { id: 'fake24', user: { id: 'f24', username: 'Canlı_İzleyici', name: 'Canlı_İzleyici', avatar: null, role: 'USER' }, lastActive: new Date(), typingUntil: null },
      { id: 'fake25', user: { id: 'f25', username: 'Gece_Bekçisi', name: 'Gece_Bekçisi', avatar: null, role: 'USER' }, lastActive: new Date(), typingUntil: null },
      { id: 'fake26', user: { id: 'f26', username: 'Haftanın_Kuponu', name: 'Haftanın_Kuponu', avatar: null, role: 'USER' }, lastActive: new Date(), typingUntil: null },
      { id: 'fake27', user: { id: 'f27', username: 'Kartal_1903', name: 'Kartal_1903', avatar: null, role: 'USER' }, lastActive: new Date(), typingUntil: null },
      { id: 'fake28', user: { id: 'f28', username: 'Forvet_Oyuncu', name: 'Forvet_Oyuncu', avatar: null, role: 'USER' }, lastActive: new Date(), typingUntil: null },
      { id: 'fake29', user: { id: 'f29', username: 'Defans_Duvarı', name: 'Defans_Duvarı', avatar: null, role: 'USER' }, lastActive: new Date(), typingUntil: null },
      { id: 'fake30', user: { id: 'f30', username: 'Orta_Saha', name: 'Orta_Saha', avatar: null, role: 'USER' }, lastActive: new Date(), typingUntil: null },
    ]
    
    // Gerçek kullanıcıları ve sahte kullanıcıları birleştir
    const allUsers = [...list, ...fakeUsers]
    
    return NextResponse.json({ users: allUsers })
  } catch (e) {
    return NextResponse.json({ users: [] })
  }
}


