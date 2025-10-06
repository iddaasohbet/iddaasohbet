import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create demo users
  const hashedPassword = await bcrypt.hash('demo123', 10)

  const users = await Promise.all([
    prisma.user.upsert({
      where: { username: 'admin' },
    update: {},
    create: {
        username: 'admin',
      email: 'admin@iddaasohbet.com',
        password: hashedPassword,
      name: 'Admin',
        role: 'ADMIN',
        verified: true,
        bio: 'Platform yöneticisi'
      }
    }),
    prisma.user.upsert({
      where: { username: 'serkan_pro' },
      update: {},
      create: {
        username: 'serkan_pro',
        email: 'serkan@example.com',
        password: hashedPassword,
        name: 'Serkan Aydın',
        role: 'USER',
        verified: true,
        bio: '5 yıllık deneyimli tahminçi. Süper Lig uzmanı.'
      }
    }),
    prisma.user.upsert({
      where: { username: 'ahmet_kral' },
      update: {},
      create: {
        username: 'ahmet_kral',
        email: 'ahmet@example.com',
        password: hashedPassword,
        name: 'Ahmet Kaya',
        role: 'USER',
        verified: true,
        bio: 'Premier League ve La Liga takipçisi'
      }
    }),
    prisma.user.upsert({
      where: { username: 'emre_gol' },
      update: {},
      create: {
        username: 'emre_gol',
        email: 'emre@example.com',
        password: hashedPassword,
        name: 'Emre Bulut',
        role: 'USER',
        verified: false,
        bio: 'Alt/Üst ve KG uzmanı'
      }
    }),
    prisma.user.upsert({
      where: { username: 'demo' },
      update: {},
      create: {
        username: 'demo',
        email: 'demo@example.com',
      password: hashedPassword,
        name: 'Demo Kullanıcı',
        role: 'USER',
        verified: false
      }
    })
  ])

  console.log(`✅ ${users.length} kullanıcı oluşturuldu`)

  // Create demo coupons with matches
  const couponData = [
    {
      userId: users[1].id, // serkan_pro
      title: 'Süper Lig Haftanın Kuponu',
      description: 'Güvenli maçlardan oluşan 5\'li kombinasyon',
      totalOdds: 12.45,
      stake: 100,
      potentialWin: 1245,
      status: 'WON' as const,
      featured: true,
      viewCount: 234,
      matches: [
        { homeTeam: 'Galatasaray', awayTeam: 'Kasımpaşa', league: 'Süper Lig', category: 'FUTBOL' as const, prediction: '1', odds: 1.45, status: 'WON' as const },
        { homeTeam: 'Fenerbahçe', awayTeam: 'Antalyaspor', league: 'Süper Lig', category: 'FUTBOL' as const, prediction: '1', odds: 1.65, status: 'WON' as const },
        { homeTeam: 'Beşiktaş', awayTeam: 'Alanyaspor', league: 'Süper Lig', category: 'FUTBOL' as const, prediction: 'Üst 2.5', odds: 1.85, status: 'WON' as const },
        { homeTeam: 'Trabzonspor', awayTeam: 'Konyaspor', league: 'Süper Lig', category: 'FUTBOL' as const, prediction: '1X', odds: 1.35, status: 'WON' as const },
        { homeTeam: 'Başakşehir', awayTeam: 'Gaziantep', league: 'Süper Lig', category: 'FUTBOL' as const, prediction: '1', odds: 1.55, status: 'WON' as const }
      ]
    },
    {
      userId: users[2].id, // ahmet_kral
      title: 'Premier League Garantili 4\'lü',
      description: 'Yüksek oran avantajlı maçlar',
      totalOdds: 8.76,
      stake: 150,
      potentialWin: 1314,
      status: 'WON' as const,
      featured: true,
      viewCount: 189,
      matches: [
        { homeTeam: 'Manchester City', awayTeam: 'Brighton', league: 'Premier League', category: 'FUTBOL' as const, prediction: '1', odds: 1.35, status: 'WON' as const },
        { homeTeam: 'Liverpool', awayTeam: 'Bournemouth', league: 'Premier League', category: 'FUTBOL' as const, prediction: 'Üst 2.5', odds: 1.55, status: 'WON' as const },
        { homeTeam: 'Arsenal', awayTeam: 'Everton', league: 'Premier League', category: 'FUTBOL' as const, prediction: '1', odds: 1.45, status: 'WON' as const },
        { homeTeam: 'Chelsea', awayTeam: 'Fulham', league: 'Premier League', category: 'FUTBOL' as const, prediction: 'KG Var', odds: 1.75, status: 'WON' as const }
      ]
    },
    {
      userId: users[3].id, // emre_gol
      title: 'Alt/Üst Özel Kuponu',
      description: 'Gol yağmuru beklenen maçlar',
      totalOdds: 15.23,
      stake: 50,
      potentialWin: 761.5,
      status: 'LOST' as const,
      featured: false,
      viewCount: 156,
      matches: [
        { homeTeam: 'Barcelona', awayTeam: 'Real Madrid', league: 'La Liga', category: 'FUTBOL' as const, prediction: 'Üst 3.5', odds: 2.15, status: 'LOST' as const },
        { homeTeam: 'Bayern Munich', awayTeam: 'Dortmund', league: 'Bundesliga', category: 'FUTBOL' as const, prediction: 'Üst 2.5', odds: 1.65, status: 'WON' as const },
        { homeTeam: 'Inter', awayTeam: 'Milan', league: 'Serie A', category: 'FUTBOL' as const, prediction: 'Üst 2.5', odds: 1.85, status: 'WON' as const },
        { homeTeam: 'PSG', awayTeam: 'Marseille', league: 'Ligue 1', category: 'FUTBOL' as const, prediction: 'Üst 3.5', odds: 2.35, status: 'LOST' as const }
      ]
    },
    {
      userId: users[1].id,
      title: 'Bugünün Garantileri',
      description: 'Düşük oranlı güvenli maçlar',
      totalOdds: 4.23,
      stake: 200,
      potentialWin: 846,
      status: 'PENDING' as const,
      featured: true,
      viewCount: 312,
      matches: [
        { homeTeam: 'Real Madrid', awayTeam: 'Getafe', league: 'La Liga', category: 'FUTBOL' as const, prediction: '1', odds: 1.25, status: 'PENDING' as const },
        { homeTeam: 'Napoli', awayTeam: 'Empoli', league: 'Serie A', category: 'FUTBOL' as const, prediction: '1', odds: 1.35, status: 'PENDING' as const },
        { homeTeam: 'PSG', awayTeam: 'Lens', league: 'Ligue 1', category: 'FUTBOL' as const, prediction: '1', odds: 1.45, status: 'PENDING' as const },
        { homeTeam: 'Bayern Munich', awayTeam: 'Augsburg', league: 'Bundesliga', category: 'FUTBOL' as const, prediction: '1', odds: 1.55, status: 'PENDING' as const }
      ]
    },
    {
      userId: users[2].id,
      title: 'Yüksek Oran Kuponu',
      description: 'Risk almak isteyenler için',
      totalOdds: 24.67,
      stake: 50,
      potentialWin: 1233.5,
      status: 'PENDING' as const,
      featured: false,
      viewCount: 98,
      matches: [
        { homeTeam: 'Aston Villa', awayTeam: 'Manchester United', league: 'Premier League', category: 'FUTBOL' as const, prediction: '1', odds: 2.85, status: 'PENDING' as const },
        { homeTeam: 'Sevilla', awayTeam: 'Barcelona', league: 'La Liga', category: 'FUTBOL' as const, prediction: '1', odds: 3.45, status: 'PENDING' as const },
        { homeTeam: 'Roma', awayTeam: 'Juventus', league: 'Serie A', category: 'FUTBOL' as const, prediction: 'X', odds: 3.25, status: 'PENDING' as const },
        { homeTeam: 'Bayer Leverkusen', awayTeam: 'Bayern Munich', league: 'Bundesliga', category: 'FUTBOL' as const, prediction: '2', odds: 2.75, status: 'PENDING' as const }
      ]
    },
    {
      userId: users[3].id,
      title: 'Karşılıklı Gol Şöleni',
      description: 'Her iki takımın da gol atacağı maçlar',
      totalOdds: 6.89,
      stake: 100,
      potentialWin: 689,
      status: 'WON' as const,
      featured: false,
      viewCount: 145,
      matches: [
        { homeTeam: 'Atalanta', awayTeam: 'Fiorentina', league: 'Serie A', category: 'FUTBOL' as const, prediction: 'KG Var', odds: 1.65, status: 'WON' as const },
        { homeTeam: 'Lille', awayTeam: 'Monaco', league: 'Ligue 1', category: 'FUTBOL' as const, prediction: 'KG Var', odds: 1.75, status: 'WON' as const },
        { homeTeam: 'Leverkusen', awayTeam: 'Leipzig', league: 'Bundesliga', category: 'FUTBOL' as const, prediction: 'KG Var', odds: 1.55, status: 'WON' as const },
        { homeTeam: 'Real Sociedad', awayTeam: 'Athletic Bilbao', league: 'La Liga', category: 'FUTBOL' as const, prediction: 'KG Var', odds: 1.45, status: 'WON' as const }
      ]
    },
    {
      userId: users[1].id,
      title: 'Avrupa Ligleri Özel',
      description: 'Farklı liglerden seçme maçlar',
      totalOdds: 18.34,
      stake: 75,
      potentialWin: 1375.5,
      status: 'LOST' as const,
      featured: false,
      viewCount: 201,
      matches: [
        { homeTeam: 'Ajax', awayTeam: 'PSV', league: 'Eredivisie', category: 'FUTBOL' as const, prediction: '1', odds: 2.15, status: 'LOST' as const },
        { homeTeam: 'Benfica', awayTeam: 'Porto', league: 'Primeira Liga', category: 'FUTBOL' as const, prediction: '1', odds: 1.95, status: 'WON' as const },
        { homeTeam: 'Celtic', awayTeam: 'Rangers', league: 'Scottish Premiership', category: 'FUTBOL' as const, prediction: 'Üst 2.5', odds: 1.75, status: 'WON' as const },
        { homeTeam: 'Olympiacos', awayTeam: 'Panathinaikos', league: 'Super League', category: 'FUTBOL' as const, prediction: '1', odds: 1.85, status: 'WON' as const },
        { homeTeam: 'Shakhtar', awayTeam: 'Dynamo Kyiv', league: 'Ukrainian Premier League', category: 'FUTBOL' as const, prediction: '1', odds: 1.65, status: 'LOST' as const }
      ]
    },
    {
      userId: users[2].id,
      title: 'NBA Basketbol Kuponu',
      description: 'Amerikan basketbol ligleri',
      totalOdds: 5.67,
      stake: 120,
      potentialWin: 680.4,
      status: 'WON' as const,
      featured: false,
      viewCount: 87,
      matches: [
        { homeTeam: 'Lakers', awayTeam: 'Warriors', league: 'NBA', category: 'BASKETBOL' as const, prediction: '1', odds: 1.85, status: 'WON' as const },
        { homeTeam: 'Celtics', awayTeam: 'Heat', league: 'NBA', category: 'BASKETBOL' as const, prediction: 'Üst 215.5', odds: 1.75, status: 'WON' as const },
        { homeTeam: 'Bucks', awayTeam: 'Nets', league: 'NBA', category: 'BASKETBOL' as const, prediction: '1', odds: 1.65, status: 'WON' as const }
      ]
    },
    {
      userId: users[3].id,
      title: 'Hafta Sonu Özel 3\'lü',
      description: 'Cumartesi günü maçları',
      totalOdds: 7.12,
      stake: 80,
      potentialWin: 569.6,
      status: 'PENDING' as const,
      featured: false,
      viewCount: 67,
      matches: [
        { homeTeam: 'Tottenham', awayTeam: 'West Ham', league: 'Premier League', category: 'FUTBOL' as const, prediction: '1', odds: 1.75, status: 'PENDING' as const },
        { homeTeam: 'Atletico Madrid', awayTeam: 'Valencia', league: 'La Liga', category: 'FUTBOL' as const, prediction: '1', odds: 1.85, status: 'PENDING' as const },
        { homeTeam: 'Juventus', awayTeam: 'Lazio', league: 'Serie A', category: 'FUTBOL' as const, prediction: 'Üst 2.5', odds: 2.15, status: 'PENDING' as const }
      ]
    },
    {
      userId: users[1].id,
      title: 'Düşük Riskli 6\'lı',
      description: 'Favorilerin kazanacağı maçlar',
      totalOdds: 9.87,
      stake: 150,
      potentialWin: 1480.5,
      status: 'WON' as const,
      featured: true,
      viewCount: 278,
      matches: [
        { homeTeam: 'Manchester City', awayTeam: 'Luton', league: 'Premier League', category: 'FUTBOL' as const, prediction: '1', odds: 1.15, status: 'WON' as const },
        { homeTeam: 'Real Madrid', awayTeam: 'Almeria', league: 'La Liga', category: 'FUTBOL' as const, prediction: '1', odds: 1.25, status: 'WON' as const },
        { homeTeam: 'Inter', awayTeam: 'Salernitana', league: 'Serie A', category: 'FUTBOL' as const, prediction: '1', odds: 1.35, status: 'WON' as const },
        { homeTeam: 'Bayern Munich', awayTeam: 'Darmstadt', league: 'Bundesliga', category: 'FUTBOL' as const, prediction: '1', odds: 1.45, status: 'WON' as const },
        { homeTeam: 'PSG', awayTeam: 'Lorient', league: 'Ligue 1', category: 'FUTBOL' as const, prediction: '1', odds: 1.55, status: 'WON' as const },
        { homeTeam: 'Galatasaray', awayTeam: 'Pendikspor', league: 'Süper Lig', category: 'FUTBOL' as const, prediction: '1', odds: 1.25, status: 'WON' as const }
      ]
    }
  ]

  for (const data of couponData) {
    const { matches, ...couponFields } = data
    const matchDate = new Date()
    matchDate.setHours(matchDate.getHours() + Math.floor(Math.random() * 48))

    await prisma.coupon.create({
      data: {
        ...couponFields,
        matches: {
          create: matches.map(m => ({
            ...m,
            matchDate,
            result: m.status === 'WON' ? 'Kazandı' : m.status === 'LOST' ? 'Kaybetti' : null
          }))
        }
      }
    })
  }

  console.log(`✅ ${couponData.length} kupon ve maçları oluşturuldu`)

  // Create demo comments
  const coupons = await prisma.coupon.findMany({ take: 5 })
  
  if (coupons.length > 0) {
    await prisma.comment.createMany({
      data: [
        { content: 'Harika bir kupon, ben de deneyeceğim! 🔥', userId: users[4].id, couponId: coupons[0].id },
        { content: 'Bu maçlar riskli görünüyor, dikkatli olun.', userId: users[3].id, couponId: coupons[0].id },
        { content: 'Süper analiz, takip ediyorum 👍', userId: users[2].id, couponId: coupons[1].id },
        { content: 'Oranlar çok düşük ama garantili', userId: users[4].id, couponId: coupons[1].id },
        { content: 'Alt/Üst kuponu riskli ama denemeye değer', userId: users[1].id, couponId: coupons[2].id }
      ]
    })
    console.log('✅ Demo yorumlar eklendi')
  }

  // Create demo likes
  if (coupons.length > 0) {
    await prisma.like.createMany({
      data: [
        { userId: users[2].id, couponId: coupons[0].id },
        { userId: users[3].id, couponId: coupons[0].id },
        { userId: users[4].id, couponId: coupons[0].id },
        { userId: users[1].id, couponId: coupons[1].id },
        { userId: users[3].id, couponId: coupons[1].id },
        { userId: users[4].id, couponId: coupons[2].id }
      ],
      skipDuplicates: true
    })
    console.log('✅ Demo beğeniler eklendi')
  }

  // Update user stats
  for (const user of users) {
    const userCoupons = await prisma.coupon.findMany({ where: { userId: user.id } })
    const totalCoupons = userCoupons.length
    const wonCoupons = userCoupons.filter(c => c.status === 'WON').length
    const lostCoupons = userCoupons.filter(c => c.status === 'LOST').length
    const pendingCoupons = userCoupons.filter(c => c.status === 'PENDING').length
    const completedCoupons = wonCoupons + lostCoupons
    const winRate = completedCoupons > 0 ? (wonCoupons / completedCoupons) * 100 : 0
    const totalProfit = wonCoupons * 2500 // Placeholder

    await prisma.user.update({
      where: { id: user.id },
      data: {
        totalCoupons,
        wonCoupons,
        lostCoupons,
        pendingCoupons,
        winRate,
        totalProfit
      }
    })
  }

  console.log('✅ Kullanıcı istatistikleri güncellendi')
  console.log('🎉 Seed tamamlandı!')
}

main()
  .catch((e) => {
    console.error('❌ Seed hatası:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })