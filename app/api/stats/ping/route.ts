import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const ua = request.headers.get('user-agent') || ''
    const fwd = request.headers.get('x-forwarded-for') || ''
    const ip = fwd.split(',')[0]?.trim() || ''

    // Ensure table exists (safe if already exists)
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS site_presence (
        id BIGINT NOT NULL AUTO_INCREMENT,
        ip VARCHAR(191) NOT NULL,
        ua VARCHAR(191) NULL,
        lastActive DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
        PRIMARY KEY (id),
        UNIQUE KEY uniq_ip_ua (ip, ua),
        INDEX lastActive_idx (lastActive)
      ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
    `)

    // Upsert by ip+ua (limited to 191 chars)
    await prisma.$executeRawUnsafe(
      `INSERT INTO site_presence (ip, ua, lastActive) VALUES (?, LEFT(?, 191), NOW(3))
       ON DUPLICATE KEY UPDATE lastActive = VALUES(lastActive)`,
      ip,
      ua,
    )

    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}


