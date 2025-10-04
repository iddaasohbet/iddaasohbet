# 🏆 İddaaSohbet - Türkiye'nin En İyi İddaa Kupon Paylaşım Platformu

Modern ve profesyonel iddaa kupon paylaşım platformu. Next.js 14, TypeScript, Prisma ve Tailwind CSS ile geliştirilmiştir.

## ✨ Özellikler

### 🎯 Ana Özellikler
- **Modern ve Responsive Tasarım** - Her cihazda mükemmel görünüm
- **Kupon Paylaşımı** - Kullanıcılar kuponlarını paylaşabilir
- **Detaylı İstatistikler** - Her kullanıcı için başarı oranı, kazanç grafikleri
- **Takip Sistemi** - Başarılı tahminciları takip edin
- **Yorum Sistemi** - Kuponlar üzerinde tartışın
- **Beğeni Sistemi** - En iyi kuponları öne çıkarın
- **Kategori Bazlı Filtreleme** - Futbol, Basketbol, Tenis ve daha fazlası
- **Admin Paneli** - Kupon ve kullanıcı yönetimi

### 🎨 Tasarım
- Gradient renkler ve modern UI
- Smooth animasyonlar
- Dark mode desteği (hazır altyapı)
- Shadcn/ui component library
- Responsive design (Mobile-first)

### 🛠️ Teknoloji Stack
- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS, Shadcn/ui
- **Database**: Prisma ORM + SQLite
- **Authentication**: NextAuth (hazır altyapı)
- **Icons**: Lucide React

## 🚀 Kurulum

### Gereksinimler
- Node.js 18+
- npm veya yarn

### Adımlar

1. **Projeyi indirin**
   ```bash
   cd C:\Users\A\Desktop\iddaasohbet
   ```

2. **Bağımlılıkları yükleyin**
   ```bash
   npm install
   ```

3. **Database'i oluşturun**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

4. **Development server'ı başlatın**
   ```bash
   npm run dev
   ```

5. **Tarayıcınızda açın**
   ```
   http://localhost:3000
   ```

## 📁 Proje Yapısı

```
iddaasohbet/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Ana layout
│   ├── page.tsx           # Ana sayfa
│   ├── giris/             # Giriş sayfası
│   ├── kayit/             # Kayıt sayfası
│   ├── kuponlar/          # Kuponlar listesi
│   └── api/               # API routes
├── components/            # React components
│   ├── ui/               # Shadcn/ui components
│   ├── Header.tsx        # Header component
│   ├── Hero.tsx          # Hero section
│   └── CouponCard.tsx    # Kupon kartı
├── lib/                   # Utility functions
│   ├── db.ts             # Prisma client
│   ├── utils.ts          # Helper functions
│   └── auth.ts           # Auth utilities
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── dev.db            # SQLite database
└── public/               # Static files
```

## 💾 Database Schema

### Modeller
- **User** - Kullanıcı bilgileri ve istatistikler
- **Coupon** - Paylaşılan kuponlar
- **Match** - Kupondaki maçlar
- **Comment** - Kupon yorumları
- **Like** - Kupon beğenileri
- **Follow** - Kullanıcı takip sistemi

### İlişkiler
- Bir kullanıcının birden fazla kuponu olabilir
- Bir kuponun birden fazla maçı olabilir
- Kullanıcılar kuponları beğenebilir ve yorum yapabilir
- Kullanıcılar birbirlerini takip edebilir

## 🎯 Özellik Roadmap

### ✅ Tamamlanan
- [x] Temel proje yapısı
- [x] Database schema
- [x] Modern anasayfa tasarımı
- [x] Kupon kartı component
- [x] Header ve Navigation
- [x] Giriş/Kayıt sayfaları
- [x] Kuponlar listesi sayfası

### 🚧 Devam Eden
- [ ] Authentication (NextAuth entegrasyonu)
- [ ] API endpoints (CRUD operasyonları)
- [ ] Kullanıcı profil sayfaları
- [ ] Kupon detay sayfası
- [ ] Admin paneli
- [ ] Real-time özellikler

### 📋 Planlanan
- [ ] Bildirim sistemi
- [ ] Arama fonksiyonu
- [ ] Filtreleme ve sıralama
- [ ] Mobil uygulama
- [ ] Premium üyelik sistemi
- [ ] Rozet ve başarım sistemi

## 🎨 Renk Paleti

- **Primary**: Yeşil (#22c55e) - Başarı, kazanç
- **Secondary**: Mavi (#3b82f6) - Güven, profesyonellik
- **Accent**: Turuncu (#f97316) - Dikkat çekici
- **Success**: Yeşil - Kazanılan kuponlar
- **Destructive**: Kırmızı - Kaybedilen kuponlar
- **Warning**: Sarı - Bekleyen kuponlar

## 🔐 Güvenlik

- Şifreler bcrypt ile hashlenir
- Input validasyonları
- SQL injection koruması (Prisma ORM)
- XSS koruması
- CSRF koruması

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! Lütfen pull request göndermeden önce:
1. Fork yapın
2. Feature branch oluşturun
3. Değişikliklerinizi commit edin
4. Branch'inizi push edin
5. Pull request açın

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## ⚠️ Yasal Uyarı

Bu platform sadece kupon paylaşımı ve bilgi amaçlıdır. 
- 18 yaş altındaki kişiler bahis oynamamalıdır
- Kumar bağımlılığı yapabilir
- Sorumlu oyun önemlidir

## 📞 İletişim

- Website: https://iddaasohbet.com
- Email: info@iddaasohbet.com
- Twitter: @iddaasohbet

---

**Made with ❤️ for Turkish betting community**