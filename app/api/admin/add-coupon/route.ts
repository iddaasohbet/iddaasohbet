import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('Received body:', body)
    
    // Admin kullanıcıyı bul
    const adminUser = await prisma.user.findFirst({
      where: { role: 'ADMIN' }
    })
    
    if (!adminUser) {
      return NextResponse.json({ error: 'Admin kullanıcı bulunamadı' }, { status: 400 })
    }
    
    console.log('Admin user found:', adminUser.id)
    
    // Basit kupon oluştur
    const coupon = await prisma.coupon.create({
      data: {
        title: body.title || 'Yeni Kupon',
        description: body.description || '',
        totalOdds: parseFloat(body.totalOdds) || 1.0,
        stake: parseFloat(body.stake) || 0,
        potentialWin: parseFloat(body.potentialWin) || 0,
        status: 'PENDING',
        userId: adminUser.id,
      }
    })
    
    console.log('Coupon created:', coupon.id)
    
    // Maçları ekle
    if (body.matches && Array.isArray(body.matches)) {
      for (const match of body.matches) {
        if (match.team1 && match.team2) {
          await prisma.match.create({
            data: {
              couponId: coupon.id,
              homeTeam: match.team1,
              awayTeam: match.team2,
              prediction: match.pick || '1',
              odds: parseFloat(match.odd) || 1.0,
              league: match.league || 'Bilinmeyen',
              category: 'DIGER',
              matchDate: new Date(),
              status: 'PENDING'
            }
          })
        }
      }
    }
    
    console.log('Matches added')
    
    // Kuponu tekrar yükle
    const finalCoupon = await prisma.coupon.findUnique({
      where: { id: coupon.id },
      include: {
        user: true,
        matches: true
      }
    })
    
    return NextResponse.json({ success: true, coupon: finalCoupon })
  } catch (error: any) {
    console.error('Error:', error)
    return NextResponse.json({ 
      error: error.message || 'Hata oluştu',
      stack: error.stack 
    }, { status: 500 })
  }
}
