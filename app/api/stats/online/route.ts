import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // Count live visitors seen in the last 60s from site_presence
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
    const rows = await prisma.$queryRawUnsafe<any[]>(
      `SELECT COUNT(1) AS c FROM site_presence WHERE lastActive > (NOW(3) - INTERVAL 60 SECOND)`
    )
    const count = Number(rows?.[0]?.c || 0)
    return NextResponse.json({ online: count })
  } catch (e) {
    return NextResponse.json({ online: 0 })
  }
}


