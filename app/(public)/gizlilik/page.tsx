import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Shield,
  Lock,
  Eye,
  Database,
  Cookie,
  UserCheck,
  AlertTriangle,
  CheckCircle,
  FileText
} from 'lucide-react'

export default function GizlilikPage() {
  return (
    <div className="min-h-screen py-12 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>

      <div className="container mx-auto px-4 relative z-10 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fadeInUp">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Shield className="h-10 w-10 text-green-400 animate-pulse" />
            <h1 className="text-4xl md:text-5xl font-bold gradient-text">Gizlilik Politikası</h1>
          </div>
          <p className="text-foreground/70 text-lg">
            Kişisel verilerinizin korunması bizim için önceliklidir
          </p>
          <Badge className="mt-4 glass border-green-500/30 text-green-400">
            Son Güncelleme: 10 Ocak 2025
          </Badge>
        </div>

        {/* KVKK Notice */}
        <Card className="glass-dark border-green-500/20 bg-green-500/5 mb-8 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <Shield className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-green-400 mb-2">KVKK Uyumlu Platform</h3>
                <p className="text-foreground/80 text-sm leading-relaxed">
                  İddaaSohbet olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) ve 
                  GDPR (Avrupa Birliği Genel Veri Koruma Yönetmeliği) gerekliliklerine tam uyum sağlıyoruz. 
                  Verileriniz en üst seviyede korunmaktadır.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Table of Contents */}
        <Card className="glass-dark border-white/5 mb-8 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-400" />
              <span>İçindekiler</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                '1. Toplanan Veriler',
                '2. Veri Toplama Yöntemleri',
                '3. Verilerin Kullanım Amaçları',
                '4. Veri Güvenliği',
                '5. Çerez Politikası',
                '6. Üçüncü Taraf Paylaşımlar',
                '7. Kullanıcı Hakları',
                '8. Veri Saklama Süresi',
                '9. Çocukların Gizliliği',
                '10. İletişim ve Talepler'
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm text-foreground/70 hover:text-green-400 transition-colors cursor-pointer">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Content Sections */}
        <div className="space-y-6">
          {/* Section 1 */}
          <Card className="glass-dark border-white/5 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-500/5 flex items-center justify-center border border-blue-500/20 text-sm font-bold">
                  <Database className="h-4 w-4 text-blue-400" />
                </span>
                <span>Toplanan Kişisel Veriler</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-foreground/80 leading-relaxed space-y-4">
              <p>
                Platformumuzda hizmet sunabilmek için aşağıdaki kişisel verilerinizi topluyoruz:
              </p>
              
              <div className="space-y-4">
                <div className="glass-dark p-4 rounded-lg border border-white/5">
                  <h4 className="font-semibold text-green-400 mb-2">Kimlik Bilgileri</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                    <li>Kullanıcı adı</li>
                    <li>Ad ve soyad (opsiyonel)</li>
                    <li>E-posta adresi</li>
                    <li>Profil fotoğrafı (opsiyonel)</li>
                  </ul>
                </div>

                <div className="glass-dark p-4 rounded-lg border border-white/5">
                  <h4 className="font-semibold text-blue-400 mb-2">İletişim Bilgileri</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                    <li>E-posta adresi</li>
                    <li>İletişim formu mesajları</li>
                  </ul>
                </div>

                <div className="glass-dark p-4 rounded-lg border border-white/5">
                  <h4 className="font-semibold text-yellow-400 mb-2">Kullanım Verileri</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                    <li>IP adresi</li>
                    <li>Tarayıcı türü ve versiyonu</li>
                    <li>Ziyaret edilen sayfalar</li>
                    <li>Tıklama verileri</li>
                    <li>Oturum süreleri</li>
                  </ul>
                </div>

                <div className="glass-dark p-4 rounded-lg border border-white/5">
                  <h4 className="font-semibold text-purple-400 mb-2">Platform Verileri</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                    <li>Paylaşılan kuponlar</li>
                    <li>Yorumlar ve beğeniler</li>
                    <li>Takip listeleri</li>
                    <li>İstatistik bilgileri</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 2 */}
          <Card className="glass-dark border-white/5 animate-fadeInUp" style={{ animationDelay: '0.35s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-green-500/20 to-green-500/5 flex items-center justify-center border border-green-500/20 text-sm font-bold">
                  <Eye className="h-4 w-4 text-green-400" />
                </span>
                <span>Veri Toplama Yöntemleri</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-foreground/80 leading-relaxed space-y-4">
              <p>Verileriniz aşağıdaki yöntemlerle toplanır:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Kayıt Formu:</strong> Hesap oluştururken girdiğiniz bilgiler</li>
                <li><strong>Profil Güncellemeleri:</strong> Profilinizde yaptığınız değişiklikler</li>
                <li><strong>Platform Kullanımı:</strong> Kupon paylaşımı, yorum yapma gibi aktiviteler</li>
                <li><strong>Çerezler:</strong> Tarayıcınızda saklanan oturum ve tercih bilgileri</li>
                <li><strong>Log Kayıtları:</strong> Sunucu loglarında tutulan teknik veriler</li>
                <li><strong>İletişim:</strong> Bizimle iletişime geçtiğinizde paylaştığınız bilgiler</li>
              </ul>
            </CardContent>
          </Card>

          {/* Section 3 */}
          <Card className="glass-dark border-white/5 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-yellow-400/20 to-yellow-400/5 flex items-center justify-center border border-yellow-400/20 text-sm font-bold">3</span>
                <span>Verilerin Kullanım Amaçları</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-foreground/80 leading-relaxed space-y-4">
              <p>Topladığımız veriler yalnızca aşağıdaki amaçlarla kullanılır:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="glass-dark p-4 rounded-lg border border-white/5">
                  <h4 className="font-semibold text-green-400 mb-2 flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Hizmet Sunumu</span>
                  </h4>
                  <p className="text-sm">Platformun temel özelliklerini sunmak</p>
                </div>
                <div className="glass-dark p-4 rounded-lg border border-white/5">
                  <h4 className="font-semibold text-blue-400 mb-2 flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Hesap Yönetimi</span>
                  </h4>
                  <p className="text-sm">Kullanıcı hesaplarını yönetmek ve korumak</p>
                </div>
                <div className="glass-dark p-4 rounded-lg border border-white/5">
                  <h4 className="font-semibold text-purple-400 mb-2 flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>İletişim</span>
                  </h4>
                  <p className="text-sm">Önemli bildirimler ve güncellemeler göndermek</p>
                </div>
                <div className="glass-dark p-4 rounded-lg border border-white/5">
                  <h4 className="font-semibold text-orange-400 mb-2 flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Geliştirme</span>
                  </h4>
                  <p className="text-sm">Platform performansını analiz ve iyileştirmek</p>
                </div>
                <div className="glass-dark p-4 rounded-lg border border-white/5">
                  <h4 className="font-semibold text-cyan-400 mb-2 flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Güvenlik</span>
                  </h4>
                  <p className="text-sm">Dolandırıcılık ve kötüye kullanımı önlemek</p>
                </div>
                <div className="glass-dark p-4 rounded-lg border border-white/5">
                  <h4 className="font-semibold text-pink-400 mb-2 flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Yasal Yükümlülükler</span>
                  </h4>
                  <p className="text-sm">Yasal gerekliliklere uymak</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 4 */}
          <Card className="glass-dark border-white/5 animate-fadeInUp" style={{ animationDelay: '0.45s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-500/5 flex items-center justify-center border border-purple-500/20 text-sm font-bold">
                  <Lock className="h-4 w-4 text-purple-400" />
                </span>
                <span>Veri Güvenliği Önlemleri</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-foreground/80 leading-relaxed space-y-4">
              <p>Verilerinizin güvenliğini sağlamak için şu önlemleri alıyoruz:</p>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">SSL/TLS Şifreleme</h4>
                    <p className="text-sm text-foreground/70">Tüm veri iletimi 256-bit SSL sertifikası ile şifrelenir</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Lock className="h-5 w-5 text-blue-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Şifre Güvenliği</h4>
                    <p className="text-sm text-foreground/70">Şifreler bcrypt algoritması ile hash'lenir, asla düz metin saklanmaz</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Database className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Güvenli Sunucular</h4>
                    <p className="text-sm text-foreground/70">Veriler güvenli ve düzenli yedeklenen sunucularda saklanır</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <UserCheck className="h-5 w-5 text-purple-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Erişim Kontrolü</h4>
                    <p className="text-sm text-foreground/70">Verilere sadece yetkili personel erişebilir</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 5 */}
          <Card className="glass-dark border-white/5 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-orange-500/20 to-orange-500/5 flex items-center justify-center border border-orange-500/20 text-sm font-bold">
                  <Cookie className="h-4 w-4 text-orange-400" />
                </span>
                <span>Çerez (Cookie) Politikası</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-foreground/80 leading-relaxed space-y-4">
              <p>Platformumuz aşağıdaki çerez türlerini kullanır:</p>
              <div className="space-y-3">
                <div className="glass-dark p-4 rounded-lg border border-white/5">
                  <h4 className="font-semibold text-green-400 mb-2">Zorunlu Çerezler</h4>
                  <p className="text-sm text-foreground/70">Platform çalışması için gerekli oturum çerezleri (devre dışı bırakılamaz)</p>
                </div>
                <div className="glass-dark p-4 rounded-lg border border-white/5">
                  <h4 className="font-semibold text-blue-400 mb-2">Performans Çerezleri</h4>
                  <p className="text-sm text-foreground/70">Sayfa performansını ölçmek için kullanılır (opsiyonel)</p>
                </div>
                <div className="glass-dark p-4 rounded-lg border border-white/5">
                  <h4 className="font-semibold text-purple-400 mb-2">Tercih Çerezleri</h4>
                  <p className="text-sm text-foreground/70">Dil ve tema tercihlerinizi hatırlamak için (opsiyonel)</p>
                </div>
              </div>
              <p className="text-sm">
                Tarayıcınızın ayarlarından çerezleri yönetebilir veya silebilirsiniz. Ancak bu durumda 
                platformun bazı özellikleri çalışmayabilir.
              </p>
            </CardContent>
          </Card>

          {/* Section 6 */}
          <Card className="glass-dark border-white/5 animate-fadeInUp" style={{ animationDelay: '0.55s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-red-500/20 to-red-500/5 flex items-center justify-center border border-red-500/20 text-sm font-bold">6</span>
                <span>Üçüncü Taraf Paylaşımlar</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-foreground/80 leading-relaxed space-y-4">
              <div className="glass-dark p-4 rounded-lg border border-red-500/20 bg-red-500/5">
                <p className="font-semibold text-red-400 mb-2">Önemli: Verilerinizi Satmıyoruz!</p>
                <p className="text-sm">
                  Kişisel verilerinizi asla üçüncü taraflara satmıyoruz veya kiralıyoruz. 
                  Verileriniz sadece aşağıdaki durumlarda paylaşılır:
                </p>
              </div>
              <ul className="list-disc list-inside space-y-2 ml-4 text-sm">
                <li><strong>Yasal Zorunluluk:</strong> Mahkeme kararı veya yasal talep durumunda</li>
                <li><strong>Hizmet Sağlayıcılar:</strong> Hosting, e-posta servisi gibi teknik hizmet sağlayıcılar (gizlilik anlaşması ile)</li>
                <li><strong>İş Ortaklığı:</strong> Platform satışı veya birleşme durumunda (sizin onayınızla)</li>
              </ul>
            </CardContent>
          </Card>

          {/* Section 7 */}
          <Card className="glass-dark border-white/5 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 flex items-center justify-center border border-cyan-500/20 text-sm font-bold">7</span>
                <span>KVKK Kapsamında Haklarınız</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-foreground/80 leading-relaxed space-y-4">
              <p>KVKK kapsamında aşağıdaki haklara sahipsiniz:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: 'Bilgi Talep Etme', desc: 'Hangi verilerinizin işlendiğini öğrenme' },
                  { title: 'Düzeltme', desc: 'Yanlış verilerin düzeltilmesini isteme' },
                  { title: 'Silme', desc: 'Verilerinizin silinmesini talep etme' },
                  { title: 'İtiraz', desc: 'Veri işleme faaliyetine itiraz etme' },
                  { title: 'Veri Taşınabilirliği', desc: 'Verilerinizi başka platforma aktarma' },
                  { title: 'Otomatik Karar İtirazı', desc: 'Otomatik kararlardan etkilenmeme' }
                ].map((right, index) => (
                  <div key={index} className="glass-dark p-4 rounded-lg border border-white/5">
                    <h4 className="font-semibold text-cyan-400 mb-1 flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4" />
                      <span>{right.title}</span>
                    </h4>
                    <p className="text-sm text-foreground/70">{right.desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm glass-dark p-4 rounded-lg border border-cyan-500/20">
                Bu haklarınızı kullanmak için <a href="/iletisim" className="text-cyan-400 hover:underline">iletişim sayfamızdan</a> bizimle 
                iletişime geçebilir veya <strong>info@iddaasohbet.com</strong> adresine e-posta gönderebilirsiniz.
              </p>
            </CardContent>
          </Card>

          {/* Section 8 */}
          <Card className="glass-dark border-white/5 animate-fadeInUp" style={{ animationDelay: '0.65s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500/20 to-indigo-500/5 flex items-center justify-center border border-indigo-500/20 text-sm font-bold">8</span>
                <span>Veri Saklama Süresi</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-foreground/80 leading-relaxed space-y-4">
              <p>Verileriniz aşağıdaki süreler boyunca saklanır:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Aktif Hesap Verileri:</strong> Hesabınız aktif olduğu sürece</li>
                <li><strong>Silinen Hesap Verileri:</strong> Hesap silindikten sonra 30 gün (yedekten geri yükleme için)</li>
                <li><strong>Log Kayıtları:</strong> Güvenlik amaçlı 6 ay</li>
                <li><strong>Yasal Zorunluluk:</strong> Yasaların gerektirdiği süre boyunca</li>
              </ul>
            </CardContent>
          </Card>

          {/* Section 9 */}
          <Card className="glass-dark border-white/5 animate-fadeInUp" style={{ animationDelay: '0.7s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-pink-500/20 to-pink-500/5 flex items-center justify-center border border-pink-500/20 text-sm font-bold">9</span>
                <span>Çocukların Gizliliği</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-foreground/80 leading-relaxed space-y-4">
              <div className="glass-dark p-4 rounded-lg border border-pink-500/20 bg-pink-500/5">
                <p className="font-semibold text-pink-400 mb-2">18 Yaş Altı Yasak</p>
                <p className="text-sm">
                  Platformumuz 18 yaş altındaki kişilere yönelik değildir. Bilinçli olarak 18 yaş altı 
                  kullanıcılardan veri toplamıyoruz. Eğer bir çocuğun platformumuza kayıt olduğunu 
                  fark ederseniz lütfen bize bildirin, hesabı derhal sileceğiz.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Section 10 */}
          <Card className="glass-dark border-white/5 animate-fadeInUp" style={{ animationDelay: '0.75s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-green-500/20 to-green-500/5 flex items-center justify-center border border-green-500/20 text-sm font-bold">10</span>
                <span>İletişim ve Veri Talepleri</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-foreground/80 leading-relaxed space-y-4">
              <p>
                Gizlilik politikası veya verileriniz hakkında sorularınız için:
              </p>
              <div className="glass-dark p-4 rounded-lg border border-white/5">
                <ul className="space-y-2 text-sm">
                  <li><strong className="text-green-400">Veri Sorumlusu:</strong> İddaaSohbet</li>
                  <li><strong className="text-green-400">E-posta:</strong> privacy@iddaasohbet.com</li>
                  <li><strong className="text-green-400">İletişim Formu:</strong> <a href="/iletisim" className="text-blue-400 hover:underline">/iletisim</a></li>
                  <li><strong className="text-green-400">Adres:</strong> Maslak, İstanbul, Türkiye</li>
                  <li><strong className="text-green-400">Yanıt Süresi:</strong> Maksimum 30 gün</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer Notice */}
        <Card className="glass-dark border-green-500/20 bg-green-500/5 mt-8 animate-fadeInUp" style={{ animationDelay: '0.8s' }}>
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <AlertTriangle className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-green-400 mb-2">Politika Değişiklikleri</h3>
                <p className="text-foreground/80 text-sm leading-relaxed">
                  Bu gizlilik politikasını zaman zaman güncelleyebiliriz. Önemli değişiklikler olduğunda 
                  size e-posta veya platform üzerinden bildirimde bulunacağız. Lütfen bu sayfayı 
                  düzenli olarak kontrol edin.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
