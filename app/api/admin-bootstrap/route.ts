import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const existingAdmin = await prisma.user.findFirst({ where: { role: 'ADMIN' } })
    if (existingAdmin) {
      return NextResponse.json({ ok: false, message: 'Admin already exists' }, { status: 404 })
    }

    const hashed = await bcrypt.hash('admin123', 10)
    const user = await prisma.user.create({
      data: {
        username: 'admin',
        email: 'admin@gmail.com',
        password: hashed,
        name: 'Admin',
        role: 'ADMIN',
        verified: true,
        bio: 'Platform yöneticisi'
      }
    })
    return NextResponse.json({ ok: true, user: { id: user.id, email: user.email } })
  } catch (e) {
    console.error('bootstrap error', e)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}


