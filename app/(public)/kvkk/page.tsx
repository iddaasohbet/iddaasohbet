import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Shield,
  FileText,
  Database,
  Lock,
  UserCheck,
  Eye,
  Trash2,
  Edit,
  AlertCircle,
  CheckCircle,
  Scale
} from 'lucide-react'

export default function KVKKPage() {
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
            <h1 className="text-4xl md:text-5xl font-bold gradient-text">KVKK Aydınlatma Metni</h1>
          </div>
          <p className="text-foreground/70 text-lg">
            6698 Sayılı Kişisel Verilerin Korunması Kanunu Kapsamında Bilgilendirme
          </p>
          <Badge className="mt-4 glass border-blue-500/30 text-blue-400">
            Son Güncelleme: 10 Ocak 2025
          </Badge>
        </div>

        {/* KVKK Info */}
        <Card className="glass-dark border-blue-500/20 bg-blue-500/5 mb-8 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <Shield className="h-6 w-6 text-blue-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-blue-400 mb-2">Veri Sorumlusu Kimliği</h3>
                <div className="text-foreground/80 text-sm space-y-1">
                  <p><strong>Ticaret Unvanı:</strong> İddaaSohbet</p>
                  <p><strong>Adres:</strong> Maslak, İstanbul, Türkiye</p>
                  <p><strong>E-posta:</strong> kvkk@iddaasohbet.com</p>
                  <p><strong>Web:</strong> iddaasohbet.com</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Section 1 */}
          <Card className="glass-dark border-white/5 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-500/5 flex items-center justify-center border border-blue-500/20 text-sm font-bold">
                  <FileText className="h-4 w-4 text-blue-400" />
                </span>
                <span>Aydınlatma Metni Hakkında</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-foreground/80 leading-relaxed space-y-4">
              <p>
                6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, <strong className="text-blue-400">veri sorumlusu</strong> 
                sıfatıyla İddaaSohbet olarak, kişisel verilerinizin işlenmesi hakkında sizi bilgilendirmek isteriz.
              </p>
              <div className="glass-dark p-4 rounded-lg border border-blue-500/20">
                <p className="text-sm">
                  <strong className="text-blue-400">Amaç:</strong> Bu metin, kişisel verilerinizin hangi amaçla 
                  işlendiği, kimlere aktarıldığı, işleme yöntemi ve hukuki sebebi ile haklarınız konusunda 
                  sizi bilgilendirmek amacıyla hazırlanmıştır.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Section 2 */}
          <Card className="glass-dark border-white/5 animate-fadeInUp" style={{ animationDelay: '0.25s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-green-500/20 to-green-500/5 flex items-center justify-center border border-green-500/20 text-sm font-bold">
                  <Database className="h-4 w-4 text-green-400" />
                </span>
                <span>İşlenen Kişisel Veriler</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-foreground/80 leading-relaxed space-y-4">
              <p>Platformumuz üzerinden aşağıdaki kişisel verileriniz işlenmektedir:</p>
              
              <div className="space-y-4">
                <div className="glass-dark p-4 rounded-lg border border-white/5">
                  <h4 className="font-semibold text-green-400 mb-2">Kimlik Bilgileri</h4>
                  <p className="text-sm">Kullanıcı adı, ad-soyad (opsiyonel), profil fotoğrafı</p>
                </div>

                <div className="glass-dark p-4 rounded-lg border border-white/5">
                  <h4 className="font-semibold text-blue-400 mb-2">İletişim Bilgileri</h4>
                  <p className="text-sm">E-posta adresi, iletişim formu mesajları</p>
                </div>

                <div className="glass-dark p-4 rounded-lg border border-white/5">
                  <h4 className="font-semibold text-yellow-400 mb-2">Müşteri İşlem Bilgileri</h4>
                  <p className="text-sm">Paylaşılan kuponlar, yorumlar, beğeniler, takip listeleri, aktivite logları</p>
                </div>

                <div className="glass-dark p-4 rounded-lg border border-white/5">
                  <h4 className="font-semibold text-purple-400 mb-2">İşlem Güvenliği Bilgileri</h4>
                  <p className="text-sm">IP adresi, çerez kayıtları, log kayıtları, cihaz bilgileri, tarayıcı bilgileri</p>
                </div>

                <div className="glass-dark p-4 rounded-lg border border-white/5">
                  <h4 className="font-semibold text-orange-400 mb-2">Pazarlama Bilgileri</h4>
                  <p className="text-sm">İletişim tercihleri, bildirim ayarları (opsiyonel)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 3 */}
          <Card className="glass-dark border-white/5 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-yellow-400/20 to-yellow-400/5 flex items-center justify-center border border-yellow-400/20 text-sm font-bold">3</span>
                <span>Kişisel Verilerin İşlenme Amaçları</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-foreground/80 leading-relaxed space-y-4">
              <p>Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Platform hizmetlerinin sunulması ve yürütülmesi',
                  'Kullanıcı hesabının oluşturulması ve yönetimi',
                  'Kullanıcı kimlik doğrulama ve güvenlik',
                  'Platform performansının analizi ve geliştirilmesi',
                  'İletişim faaliyetlerinin yürütülmesi',
                  'Yasal yükümlülüklerin yerine getirilmesi',
                  'Hukuki işlemlerin takibi',
                  'Dolandırıcılık ve kötüye kullanımın önlenmesi',
                  'İstatistik ve raporlama faaliyetleri',
                  'Kullanıcı deneyiminin iyileştirilmesi'
                ].map((purpose, index) => (
                  <div key={index} className="flex items-start space-x-2 glass-dark p-3 rounded-lg border border-white/5">
                    <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{purpose}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Section 4 */}
          <Card className="glass-dark border-white/5 animate-fadeInUp" style={{ animationDelay: '0.35s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-500/5 flex items-center justify-center border border-purple-500/20 text-sm font-bold">
                  <Lock className="h-4 w-4 text-purple-400" />
                </span>
                <span>Kişisel Verilerin İşlenme Yöntemi ve Hukuki Sebep</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-foreground/80 leading-relaxed space-y-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-purple-400 mb-2">İşlenme Yöntemi</h4>
                  <p className="text-sm">
                    Kişisel verileriniz, KVKK'nın 5. ve 6. maddelerinde belirtilen kişisel veri işleme şartları 
                    ve amaçları dahilinde, otomatik veya otomatik olmayan yöntemlerle, platform üzerinden, 
                    fiziksel veya elektronik ortamda toplanmakta ve işlenmektedir.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-blue-400 mb-2">Hukuki Sebepler</h4>
                  <div className="space-y-2">
                    <div className="glass-dark p-3 rounded-lg border border-white/5">
                      <p className="text-sm"><strong className="text-green-400">• Açık Rıza:</strong> Platformu kullanarak verilerinizin işlenmesine açık rıza vermiş sayılırsınız</p>
                    </div>
                    <div className="glass-dark p-3 rounded-lg border border-white/5">
                      <p className="text-sm"><strong className="text-blue-400">• Sözleşmenin İfası:</strong> Hizmet sözleşmesinin kurulması ve ifası için gereklidir</p>
                    </div>
                    <div className="glass-dark p-3 rounded-lg border border-white/5">
                      <p className="text-sm"><strong className="text-yellow-400">• Meşru Menfaat:</strong> Hizmet kalitesi ve güvenliğin sağlanması için gereklidir</p>
                    </div>
                    <div className="glass-dark p-3 rounded-lg border border-white/5">
                      <p className="text-sm"><strong className="text-purple-400">• Yasal Yükümlülük:</strong> Yasal düzenlemelerin gerektirdiği hallerde</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 5 */}
          <Card className="glass-dark border-white/5 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-orange-500/20 to-orange-500/5 flex items-center justify-center border border-orange-500/20 text-sm font-bold">5</span>
                <span>Kişisel Verilerin Aktarılması</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-foreground/80 leading-relaxed space-y-4">
              <p>Kişisel verileriniz aşağıdaki kişi ve kuruluşlara aktarılabilir:</p>
              <div className="space-y-3">
                <div className="glass-dark p-4 rounded-lg border border-white/5">
                  <h4 className="font-semibold text-orange-400 mb-2">Yurt İçi Aktarım</h4>
                  <ul className="space-y-1 text-sm list-disc list-inside ml-2">
                    <li>Sunucu ve hosting hizmeti sağlayıcılar</li>
                    <li>Bulut bilişim hizmeti sağlayıcılar</li>
                    <li>E-posta hizmeti sağlayıcılar</li>
                    <li>Teknik destek ve bakım hizmeti sağlayıcılar</li>
                    <li>Yetkili kamu kurum ve kuruluşları</li>
                    <li>Hukuki danışmanlar ve denetçiler</li>
                  </ul>
                </div>

                <div className="glass-dark p-4 rounded-lg border border-white/5">
                  <h4 className="font-semibold text-blue-400 mb-2">Yurt Dışı Aktarım</h4>
                  <p className="text-sm">
                    Kişisel verileriniz, yeterli korumaya sahip veya yeterli korumanın bulunmaması halinde 
                    Türkiye'deki ve ilgili yabancı ülkedeki veri sorumlularının yeterli bir korumayı yazılı 
                    olarak taahhüt ettiği ve Kurul'un izninin bulunduğu yurt dışındaki üçüncü kişilere 
                    aktarılabilir.
                  </p>
                </div>

                <div className="glass-dark p-4 rounded-lg border border-red-500/20 bg-red-500/5">
                  <p className="text-sm font-semibold text-red-400">
                    Önemli: Kişisel verileriniz asla ticari amaçla üçüncü taraflara satılmaz veya kiralanmaz.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 6 - Haklar */}
          <Card className="glass-dark border-white/5 animate-fadeInUp" style={{ animationDelay: '0.45s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 flex items-center justify-center border border-cyan-500/20 text-sm font-bold">
                  <UserCheck className="h-4 w-4 text-cyan-400" />
                </span>
                <span>KVKK Kapsamındaki Haklarınız</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-foreground/80 leading-relaxed space-y-4">
              <p>KVKK'nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="glass-dark p-4 rounded-lg border border-cyan-500/20">
                  <div className="flex items-start space-x-3 mb-2">
                    <Eye className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-cyan-400 text-sm">Bilgi Talep Etme</h4>
                      <p className="text-xs text-foreground/70 mt-1">
                        Kişisel verilerinizin işlenip işlenmediğini öğrenme ve işlenmişse bilgi talep etme
                      </p>
                    </div>
                  </div>
                </div>

                <div className="glass-dark p-4 rounded-lg border border-green-500/20">
                  <div className="flex items-start space-x-3 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-green-400 text-sm">Amaç Öğrenme</h4>
                      <p className="text-xs text-foreground/70 mt-1">
                        Kişisel verilerinizin işlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme
                      </p>
                    </div>
                  </div>
                </div>

                <div className="glass-dark p-4 rounded-lg border border-blue-500/20">
                  <div className="flex items-start space-x-3 mb-2">
                    <Database className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-400 text-sm">Aktarım Bilgisi</h4>
                      <p className="text-xs text-foreground/70 mt-1">
                        Yurt içinde veya yurt dışında aktarılan üçüncü kişileri bilme
                      </p>
                    </div>
                  </div>
                </div>

                <div className="glass-dark p-4 rounded-lg border border-yellow-500/20">
                  <div className="flex items-start space-x-3 mb-2">
                    <Edit className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-yellow-400 text-sm">Düzeltme</h4>
                      <p className="text-xs text-foreground/70 mt-1">
                        Eksik veya yanlış işlenmiş kişisel verilerinizin düzeltilmesini isteme
                      </p>
                    </div>
                  </div>
                </div>

                <div className="glass-dark p-4 rounded-lg border border-red-500/20">
                  <div className="flex items-start space-x-3 mb-2">
                    <Trash2 className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-red-400 text-sm">Silme/İmha</h4>
                      <p className="text-xs text-foreground/70 mt-1">
                        Kişisel verilerinizin silinmesini veya yok edilmesini isteme
                      </p>
                    </div>
                  </div>
                </div>

                <div className="glass-dark p-4 rounded-lg border border-purple-500/20">
                  <div className="flex items-start space-x-3 mb-2">
                    <AlertCircle className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-purple-400 text-sm">Bildirim Talep Etme</h4>
                      <p className="text-xs text-foreground/70 mt-1">
                        Düzeltme/silme/imha işlemlerinin üçüncü kişilere bildirilmesini isteme
                      </p>
                    </div>
                  </div>
                </div>

                <div className="glass-dark p-4 rounded-lg border border-orange-500/20">
                  <div className="flex items-start space-x-3 mb-2">
                    <Scale className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-orange-400 text-sm">İtiraz</h4>
                      <p className="text-xs text-foreground/70 mt-1">
                        Kişisel verilerinizin işlenmesi sebebiyle zarara uğramanız halinde itiraz etme
                      </p>
                    </div>
                  </div>
                </div>

                <div className="glass-dark p-4 rounded-lg border border-pink-500/20">
                  <div className="flex items-start space-x-3 mb-2">
                    <FileText className="h-5 w-5 text-pink-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-pink-400 text-sm">Zarar Tazmin</h4>
                      <p className="text-xs text-foreground/70 mt-1">
                        Kanuna aykırı işleme nedeniyle zarara uğramanız halinde zararın giderilmesini talep etme
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 7 */}
          <Card className="glass-dark border-white/5 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-green-500/20 to-green-500/5 flex items-center justify-center border border-green-500/20 text-sm font-bold">7</span>
                <span>Başvuru Yöntemi</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-foreground/80 leading-relaxed space-y-4">
              <p>KVKK'dan kaynaklanan haklarınızı kullanmak için başvuru yöntemleri:</p>
              
              <div className="space-y-4">
                <div className="glass-dark p-4 rounded-lg border border-green-500/20">
                  <h4 className="font-semibold text-green-400 mb-3">Başvuru Kanalları</h4>
                  <ul className="space-y-2 text-sm">
                    <li><strong className="text-green-400">E-posta:</strong> kvkk@iddaasohbet.com</li>
                    <li><strong className="text-green-400">Posta:</strong> Maslak, İstanbul, Türkiye</li>
                    <li><strong className="text-green-400">İletişim Formu:</strong> <a href="/iletisim" className="text-blue-400 hover:underline">www.iddaasohbet.com/iletisim</a></li>
                  </ul>
                </div>

                <div className="glass-dark p-4 rounded-lg border border-blue-500/20">
                  <h4 className="font-semibold text-blue-400 mb-3">Başvuruda Bulunması Gerekenler</h4>
                  <ul className="space-y-1 text-sm list-disc list-inside ml-2">
                    <li>Ad, soyad ve imza</li>
                    <li>T.C. kimlik numarası</li>
                    <li>Tebligata esas yerleşim yeri veya iş yeri adresi</li>
                    <li>E-posta adresi, telefon veya faks numarası</li>
                    <li>Talep konusu</li>
                  </ul>
                </div>

                <div className="glass-dark p-4 rounded-lg border border-yellow-500/20">
                  <h4 className="font-semibold text-yellow-400 mb-2">Yanıt Süresi</h4>
                  <p className="text-sm">
                    Başvurularınız, talebin niteliğine göre <strong>en geç 30 gün</strong> içinde 
                    ücretsiz olarak sonuçlandırılır. İşlemin ayrıca bir maliyet gerektirmesi halinde, 
                    Kişisel Verileri Koruma Kurulu tarafından belirlenen tarifedeki ücret alınabilir.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 8 */}
          <Card className="glass-dark border-white/5 animate-fadeInUp" style={{ animationDelay: '0.55s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500/20 to-indigo-500/5 flex items-center justify-center border border-indigo-500/20 text-sm font-bold">8</span>
                <span>Kişisel Verilerin Saklanma Süresi</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-foreground/80 leading-relaxed space-y-4">
              <p>
                Kişisel verileriniz, işlendikleri amaç için gerekli olan süre ve KVKK ile ilgili mevzuatta 
                öngörülen azami süreler kadar saklanır. Bu sürelerin sona ermesi halinde, kişisel verileriniz 
                silinir, yok edilir veya anonim hale getirilir.
              </p>
              <div className="glass-dark p-4 rounded-lg border border-indigo-500/20">
                <ul className="space-y-2 text-sm">
                  <li><strong className="text-indigo-400">Aktif Hesap:</strong> Hesabınız aktif olduğu sürece</li>
                  <li><strong className="text-indigo-400">Silinen Hesap:</strong> Hesap silindikten sonra 30 gün (kurtarma için)</li>
                  <li><strong className="text-indigo-400">Log Kayıtları:</strong> Güvenlik amaçlı 6 ay</li>
                  <li><strong className="text-indigo-400">Yasal Zorunluluk:</strong> İlgili mevzuatın öngördüğü süre</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <Card className="glass-dark border-blue-500/20 bg-blue-500/5 mt-8 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <AlertCircle className="h-6 w-6 text-blue-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-blue-400 mb-2">Aydınlatma Metni Değişiklikleri</h3>
                <p className="text-foreground/80 text-sm leading-relaxed">
                  Bu aydınlatma metni, yasal düzenlemelerdeki değişiklikler veya uygulama değişiklikleri 
                  nedeniyle güncellenebilir. Güncellemeler bu sayfa üzerinden duyurulur. Önemli değişiklikler 
                  için size ayrıca bildirimde bulunulur.
                </p>
                <p className="text-foreground/80 text-sm mt-3">
                  <strong className="text-blue-400">İletişim:</strong> KVKK ile ilgili sorularınız için 
                  <a href="mailto:kvkk@iddaasohbet.com" className="text-blue-400 hover:underline ml-1">kvkk@iddaasohbet.com</a> adresine 
                  e-posta gönderebilirsiniz.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
