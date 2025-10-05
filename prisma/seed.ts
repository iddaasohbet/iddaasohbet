import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Veritabanı seed başlatılıyor...')

  // Admin kullanıcı oluştur
  const hashedPassword = await bcrypt.hash('admin123', 12)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@iddaasohbet.com' },
    update: {},
    create: {
      email: 'admin@iddaasohbet.com',
      name: 'Admin',
      username: 'admin',
      password: hashedPassword,
      role: 'ADMIN',
      bio: 'İddaaSohbet Platform Yöneticisi',
    },
  })

  console.log('✅ Admin kullanıcı oluşturuldu:', admin.email)

  // Demo normal kullanıcı oluştur
  const demoPassword = await bcrypt.hash('demo123', 12)

  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@iddaasohbet.com' },
    update: {},
    create: {
      email: 'demo@iddaasohbet.com',
      name: 'Demo Kullanıcı',
      username: 'demo',
      password: demoPassword,
      role: 'USER',
      bio: 'Deneme kullanıcısı',
    },
  })

  console.log('✅ Demo kullanıcı oluşturuldu:', demoUser.email)

  console.log('🌱 Seed tamamlandı!')
}

main()
  .catch((e) => {
    console.error('❌ Seed hatası:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
