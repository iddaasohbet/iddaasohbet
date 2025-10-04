import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  FileText,
  Shield,
  AlertCircle,
  CheckCircle,
  Info,
  Scale
} from 'lucide-react'

export default function KullanimKosullariPage() {
  return (
    <div className="min-h-screen py-12 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>

      <div className="container mx-auto px-4 relative z-10 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fadeInUp">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Scale className="h-10 w-10 text-blue-400 animate-pulse" />
            <h1 className="text-4xl md:text-5xl font-bold gradient-text">Kullanım Koşulları</h1>
          </div>
          <p className="text-foreground/70 text-lg">
            İddaaSohbet platformunu kullanarak aşağıdaki koşulları kabul etmiş sayılırsınız
          </p>
          <Badge className="mt-4 glass border-blue-500/30 text-blue-400">
            Son Güncelleme: 10 Ocak 2025
          </Badge>
        </div>

        {/* Important Notice */}
        <Card className="glass-dark border-yellow-500/20 bg-yellow-500/5 mb-8 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <AlertCircle className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-yellow-400 mb-2">Önemli Uyarı</h3>
                <p className="text-foreground/80 text-sm leading-relaxed">
                  İddaaSohbet yalnızca bir kupon paylaşım platformudur. Herhangi bir bahis oynama, 
                  ödeme alma veya kumar faaliyeti yürütülmez. Kullanıcılar kendi bahis kararlarından 
                  sorumludur. 18 yaş altı kişilerin platformu kullanması yasaktır.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Table of Contents */}
        <Card className="glass-dark border-white/5 mb-8 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-green-400" />
              <span>İçindekiler</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                '1. Genel Hükümler',
                '2. Hesap Oluşturma',
                '3. Kullanıcı Sorumlulukları',
                '4. İçerik ve Telif Hakları',
                '5. Yasaklanan Faaliyetler',
                '6. Gizlilik ve Veri Güvenliği',
                '7. Hizmet Kesintileri',
                '8. Sorumluluk Reddi',
                '9. Değişiklikler',
                '10. İletişim'
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm text-foreground/70 hover:text-green-400 transition-colors cursor-pointer">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Terms Content */}
        <div className="space-y-6">
          {/* Section 1 */}
          <Card className="glass-dark border-white/5 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-500/5 flex items-center justify-center border border-blue-500/20 text-sm font-bold">1</span>
                <span>Genel Hükümler</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-foreground/80 leading-relaxed space-y-4">
              <p>
                İddaaSohbet ("Platform", "Biz", "Bizim"), kullanıcıların iddaa kuponlarını paylaşabilecekleri, 
                diğer kullanıcıların kuponlarını görüntüleyebilecekleri ve istatistik takibi yapabilecekleri 
                bir sosyal platform hizmetidir.
              </p>
              <p>
                Bu kullanım koşulları ("Koşullar"), platformumuzu kullanan tüm kullanıcılar için geçerlidir. 
                Platformu kullanarak bu koşulları kabul etmiş sayılırsınız.
              </p>
              <div className="glass-dark p-4 rounded-lg border border-white/5">
                <p className="text-sm">
                  <strong className="text-green-400">Önemli:</strong> Bu koşulları düzenli olarak 
                  güncelliyoruz. Değişikliklerden haberdar olmak için bu sayfayı periyodik olarak kontrol ediniz.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Section 2 */}
          <Card className="glass-dark border-white/5 animate-fadeInUp" style={{ animationDelay: '0.35s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-green-500/20 to-green-500/5 flex items-center justify-center border border-green-500/20 text-sm font-bold">2</span>
                <span>Hesap Oluşturma ve Kullanım</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-foreground/80 leading-relaxed space-y-4">
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Platformu kullanmak için en az 18 yaşında olmalısınız</li>
                <li>Kayıt sırasında doğru ve güncel bilgiler sağlamalısınız</li>
                <li>Hesap güvenliğiniz sizin sorumluluğunuzdadır</li>
                <li>Hesabınızı başkalarıyla paylaşamazsınız</li>
                <li>Şüpheli aktivite durumunda derhal bize bildirmelisiniz</li>
                <li>Bir kişi yalnızca bir hesap oluşturabilir</li>
              </ul>
            </CardContent>
          </Card>

          {/* Section 3 */}
          <Card className="glass-dark border-white/5 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-yellow-400/20 to-yellow-400/5 flex items-center justify-center border border-yellow-400/20 text-sm font-bold">3</span>
                <span>Kullanıcı Sorumlulukları</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-foreground/80 leading-relaxed space-y-4">
              <p>Kullanıcı olarak şunları kabul edersiniz:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Paylaştığınız kuponların doğruluğundan siz sorumlusunuz</li>
                <li>Diğer kullanıcıların kuponlarını kopyalama kararı tamamen size aittir</li>
                <li>Platform, kupon sonuçlarından veya kayıplardan sorumlu değildir</li>
                <li>Yanıltıcı veya sahte bilgi paylaşmayacaksınız</li>
                <li>Başkalarının kuponlarını kendi paylaşımınız gibi göstermeyeceksiniz</li>
                <li>Kumar bağımlılığı riski konusunda bilgilisiniz</li>
              </ul>
            </CardContent>
          </Card>

          {/* Section 4 */}
          <Card className="glass-dark border-white/5 animate-fadeInUp" style={{ animationDelay: '0.45s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-500/5 flex items-center justify-center border border-purple-500/20 text-sm font-bold">4</span>
                <span>İçerik ve Telif Hakları</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-foreground/80 leading-relaxed space-y-4">
              <p>
                Platformda paylaştığınız tüm içeriklerin (kuponlar, yorumlar, analizler) telif hakları 
                size ait olmakla birlikte, içeriği platformda kullanmamız için bize sınırsız bir lisans vermiş olursunuz.
              </p>
              <div className="glass-dark p-4 rounded-lg border border-purple-500/20">
                <p className="text-sm">
                  <strong className="text-purple-400">Telif Hakkı:</strong> Platform tasarımı, logosu, 
                  kodları ve özgün içerikleri İddaaSohbet'in mülkiyetindedir ve izinsiz kullanılamaz.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Section 5 */}
          <Card className="glass-dark border-white/5 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-red-500/20 to-red-500/5 flex items-center justify-center border border-red-500/20 text-sm font-bold">5</span>
                <span>Yasaklanan Faaliyetler</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-foreground/80 leading-relaxed space-y-4">
              <p className="font-semibold text-red-400">Aşağıdaki faaliyetler kesinlikle yasaktır:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Platformu yasadışı amaçlarla kullanmak</li>
                <li>Spam, bot veya otomatik sistemler kullanmak</li>
                <li>Diğer kullanıcıları taciz etmek veya rahatsız etmek</li>
                <li>Sahte hesap oluşturmak veya kimliğe bürünmek</li>
                <li>Platform güvenliğini tehlikeye atmak</li>
                <li>Platformu tersine mühendislik yapmak</li>
                <li>18 yaş altı kişilerin kayıt olmasına yardımcı olmak</li>
                <li>Ticari amaçlarla izinsiz içerik toplamak</li>
              </ul>
              <div className="glass-dark p-4 rounded-lg border border-red-500/20 bg-red-500/5">
                <p className="text-sm text-red-400">
                  <strong>Uyarı:</strong> Bu kurallara uymayanların hesapları kalıcı olarak 
                  kapatılabilir ve yasal işlem başlatılabilir.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Section 6 */}
          <Card className="glass-dark border-white/5 animate-fadeInUp" style={{ animationDelay: '0.55s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 flex items-center justify-center border border-cyan-500/20 text-sm font-bold">6</span>
                <span>Gizlilik ve Veri Güvenliği</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-foreground/80 leading-relaxed space-y-4">
              <p>
                Kişisel verilerinizin işlenmesi <a href="/gizlilik" className="text-cyan-400 hover:underline">Gizlilik Politikamızda</a> detaylı 
                olarak açıklanmıştır. KVKK (Kişisel Verilerin Korunması Kanunu) uyumlu çalışıyoruz.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Verileriniz SSL sertifikası ile şifrelenir</li>
                <li>Şifreleriniz güvenli hash algoritmaları ile saklanır</li>
                <li>Kişisel bilgileriniz üçüncü şahıslarla paylaşılmaz</li>
                <li>Veri silme hakkınız vardır</li>
              </ul>
            </CardContent>
          </Card>

          {/* Section 7 */}
          <Card className="glass-dark border-white/5 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-orange-500/20 to-orange-500/5 flex items-center justify-center border border-orange-500/20 text-sm font-bold">7</span>
                <span>Hizmet Kesintileri ve Güncellemeler</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-foreground/80 leading-relaxed space-y-4">
              <p>
                Platform hizmetlerini geliştirmek, güncellemek veya bakım yapmak için geçici olarak 
                kesintiye uğrayabilir. Bu durumlar için önceden bildirim yapmaya çalışırız ancak 
                acil durumlar için garanti veremeyiz.
              </p>
            </CardContent>
          </Card>

          {/* Section 8 */}
          <Card className="glass-dark border-white/5 animate-fadeInUp" style={{ animationDelay: '0.65s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-pink-500/20 to-pink-500/5 flex items-center justify-center border border-pink-500/20 text-sm font-bold">8</span>
                <span>Sorumluluk Reddi</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-foreground/80 leading-relaxed space-y-4">
              <div className="glass-dark p-4 rounded-lg border border-pink-500/20 bg-pink-500/5">
                <p className="font-semibold text-pink-400 mb-3">Önemli Sorumluluk Reddi:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-sm">
                  <li>Platform "olduğu gibi" sunulmaktadır</li>
                  <li>Kupon başarısı veya kazanç garantisi vermiyoruz</li>
                  <li>Kullanıcıların bahis kayıplarından sorumlu değiliz</li>
                  <li>Üçüncü taraf bahis sitelerinden sorumlu değiliz</li>
                  <li>İstatistiklerin %100 doğruluğunu garanti etmiyoruz</li>
                  <li>Kumar bağımlılığı risklerinden kullanıcı sorumludur</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Section 9 */}
          <Card className="glass-dark border-white/5 animate-fadeInUp" style={{ animationDelay: '0.7s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500/20 to-indigo-500/5 flex items-center justify-center border border-indigo-500/20 text-sm font-bold">9</span>
                <span>Koşullarda Değişiklikler</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-foreground/80 leading-relaxed space-y-4">
              <p>
                Bu kullanım koşullarını herhangi bir zamanda değiştirme hakkını saklı tutarız. 
                Önemli değişiklikler için kullanıcıları bilgilendirmeye çalışırız. 
                Değişikliklerden sonra platformu kullanmaya devam etmeniz, yeni koşulları kabul ettiğiniz anlamına gelir.
              </p>
            </CardContent>
          </Card>

          {/* Section 10 */}
          <Card className="glass-dark border-white/5 animate-fadeInUp" style={{ animationDelay: '0.75s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-green-500/20 to-green-500/5 flex items-center justify-center border border-green-500/20 text-sm font-bold">10</span>
                <span>İletişim ve Sorular</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-foreground/80 leading-relaxed space-y-4">
              <p>
                Kullanım koşulları hakkında sorularınız varsa bizimle iletişime geçebilirsiniz:
              </p>
              <div className="glass-dark p-4 rounded-lg border border-white/5">
                <ul className="space-y-2 text-sm">
                  <li><strong className="text-green-400">E-posta:</strong> info@iddaasohbet.com</li>
                  <li><strong className="text-green-400">İletişim:</strong> <a href="/iletisim" className="text-blue-400 hover:underline">/iletisim</a></li>
                  <li><strong className="text-green-400">Adres:</strong> Maslak, İstanbul, Türkiye</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer Notice */}
        <Card className="glass-dark border-blue-500/20 bg-blue-500/5 mt-8 animate-fadeInUp" style={{ animationDelay: '0.8s' }}>
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <Info className="h-6 w-6 text-blue-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-blue-400 mb-2">Yasal Bilgilendirme</h3>
                <p className="text-foreground/80 text-sm leading-relaxed">
                  Bu kullanım koşulları Türkiye Cumhuriyeti yasalarına tabidir. Platform ile ilgili 
                  herhangi bir uyuşmazlık durumunda İstanbul mahkemeleri ve icra daireleri yetkilidir.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
