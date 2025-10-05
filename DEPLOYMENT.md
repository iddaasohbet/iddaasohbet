# 🚀 İDDAA SOHBET - DEPLOYMENT REHBERİ

## 📋 ADIM 1: .env DOSYASI OLUŞTUR

Proje kök dizininde `.env` dosyası oluştur ve aşağıdaki içeriği yapıştır:

```env
# Database Connection
DATABASE_URL="mysql://iddaasohbet_iddaasohbet:Ciko5744**@YOUR_MYSQL_HOST:3306/iddaasohbet_kuponlar"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="super-secret-random-string-change-this-123456789"
```

**ÖNEMLİ:** `YOUR_MYSQL_HOST` kısmını hosting sağlayıcının verdiği MySQL host adresi ile değiştir!

Örneğin:
- `localhost` (local geliştirme için)
- `mysql.iddaasohbet.com` (cPanel MySQL için)
- veya hosting sağlayıcının verdiği IP/hostname

---

## 📋 ADIM 2: VERITABANINI HAZIRLA

Terminal'de şu komutları çalıştır:

```bash
cd C:\Users\A\Desktop\iddaasohbet

# Prisma Client'ı oluştur
npx prisma generate

# Veritabanı tablolarını oluştur
npx prisma db push
```

Bu komut tüm tabloları (User, Coupon, Match, Comment, Like, Follow) otomatik oluşturacak!

---

## 📋 ADIM 3: LOCAL'DE TEST ET

```bash
npm run dev
```

http://localhost:3000 adresinde siteyi test et.

---

## 📋 ADIM 4: GITHUB'A YÜKLE

### 4.1. GitHub Hesabı Oluştur (yoksa)
https://github.com adresinden ücretsiz hesap aç.

### 4.2. Yeni Repository Oluştur
1. GitHub'da "New repository" butonuna tıkla
2. Repository adı: `iddaasohbet`
3. Private veya Public seç
4. **`.gitignore` ekleme!** (zaten var)
5. "Create repository" tıkla

### 4.3. Projeyi GitHub'a Push Et

Terminal'de:

```bash
cd C:\Users\A\Desktop\iddaasohbet

# Git başlat (eğer yoksa)
git init

# Dosyaları ekle
git add .

# Commit yap
git commit -m "Initial commit - İddaa Sohbet v1.0"

# GitHub'a bağla (REPO_URL'yi kendi repository URL'inle değiştir)
git remote add origin https://github.com/YOUR_USERNAME/iddaasohbet.git

# Push et
git branch -M main
git push -u origin main
```

---

## 📋 ADIM 5: VERCEL'E DEPLOY ET

### 5.1. Vercel Hesabı Oluştur
1. https://vercel.com adresine git
2. "Sign Up" → "Continue with GitHub" seç
3. GitHub ile giriş yap (ücretsiz!)

### 5.2. Projeyi Import Et
1. Vercel dashboard'da "Add New..." → "Project" tıkla
2. GitHub'dan `iddaasohbet` repository'sini seç
3. "Import" tıkla

### 5.3. Environment Variables Ekle

**ÇOK ÖNEMLİ!** Deploy etmeden önce şu değişkenleri ekle:

| Key | Value |
|-----|-------|
| `DATABASE_URL` | `mysql://iddaasohbet_iddaasohbet:Ciko5744**@YOUR_MYSQL_HOST:3306/iddaasohbet_kuponlar` |
| `NEXTAUTH_URL` | `https://iddaasohbet.com` |
| `NEXTAUTH_SECRET` | `super-secret-random-string-change-this-123456789` |

**NOT:** MySQL HOST adresini doğru yaz!

### 5.4. Deploy Et
1. "Deploy" butonuna tıkla
2. 2-3 dakika bekle ⏳
3. Deployment tamamlandı! 🎉

---

## 📋 ADIM 6: DOMAIN BAĞLA (iddaasohbet.com)

### 6.1. Vercel'de Domain Ayarları
1. Vercel project sayfasında "Settings" → "Domains" git
2. "Add" butonuna tıkla
3. `iddaasohbet.com` yaz
4. Vercel sana DNS ayarlarını gösterecek

### 6.2. DNS Ayarları (Hosting Panelinde)

Hosting sağlayıcının (cPanel/Plesk) DNS yönetim panelinden:

**A Record ekle:**
```
Type: A
Name: @
Value: 76.76.21.21 (Vercel'in vereceği IP)
```

**CNAME Record ekle (www için):**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 6.3. SSL Otomatik Gelecek
Vercel otomatik olarak SSL sertifikası ekleyecek (1-2 saat içinde).

---

## 📋 ADIM 7: VERİTABANI BAĞLANTISINI TEST ET

Deploy tamamlandıktan sonra:

1. https://iddaasohbet.com/api/test-db adresine git (bu endpoint'i oluşturmamız gerekebilir)
2. Veya admin panele giriş yapmayı dene

---

## 🔧 SORUN GİDERME

### "Can't reach database" Hatası
- MySQL host adresini kontrol et
- MySQL'in dışarıdan erişime açık olduğundan emin ol
- Vercel IP'sini MySQL whitelist'e ekle (hosting panelinden)

### "NEXTAUTH_SECRET" Hatası
- Vercel environment variables'da NEXTAUTH_SECRET eklenmiş mi kontrol et

### Build Hatası
- `package.json` ve `prisma/schema.prisma` doğru mu kontrol et
- Vercel logs'u incele: Vercel dashboard → Deployments → Son deployment → Logs

---

## 📝 SONRAKI ADIMLAR

✅ Demo verileri kaldır (mock data)
✅ API endpoint'lerini gerçek verilerle çalıştır
✅ Admin paneli için güvenlik ekle (authentication)
✅ Email servisi entegre et (şifre sıfırlama için)

---

## 📞 DESTEK

Sorun yaşarsan:
1. Vercel Deployment Logs'u kontrol et
2. Browser Console'u aç (F12) hata mesajlarını oku
3. MySQL connection string'ini tekrar kontrol et

**Başarılar! 🎊⚽🏆**

