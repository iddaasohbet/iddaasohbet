import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// GET unread message count
export async function GET(request: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ count: 0 })
  
  try {
    const count = await prisma.directMessage.count({
      where: {
        receiverId: session.user.id,
        read: false
      }
    })
    
    return NextResponse.json({ count })
  } catch (e) {
    return NextResponse.json({ count: 0 })
  }
}

