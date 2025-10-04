import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  AlertTriangle,
  ShieldAlert,
  Info,
  XCircle,
  CheckCircle,
  Scale,
  DollarSign,
  ExternalLink
} from 'lucide-react'

export default function SorumluklukPage() {
  return (
    <div className="min-h-screen py-12 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>

      <div className="container mx-auto px-4 relative z-10 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fadeInUp">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <ShieldAlert className="h-10 w-10 text-orange-400 animate-pulse" />
            <h1 className="text-4xl md:text-5xl font-bold gradient-text">Sorumluluk Reddi</h1>
          </div>
          <p className="text-foreground/70 text-lg">
            Platformu kullanmadan önce lütfen bu önemli bilgileri okuyun
          </p>
          <Badge className="mt-4 glass border-orange-500/30 text-orange-400">
            Son Güncelleme: 10 Ocak 2025
          </Badge>
        </div>

        {/* Critical Warning */}
        <Card className="glass-dark border-red-500/30 bg-red-500/10 mb-8 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <AlertTriangle className="h-8 w-8 text-red-400 flex-shrink-0 mt-1 animate-pulse" />
              <div>
                <h3 className="font-bold text-red-400 mb-3 text-xl">ÖNEMLİ UYARI</h3>
                <div className="space-y-2 text-foreground/90 text-sm leading-relaxed">
                  <p><strong>• Kumar Bağımlılığı Yapabilir:</strong> Bahis oyunları bağımlılık yapıcı olabilir.</p>
                  <p><strong>• 18 Yaş Sınırı:</strong> 18 yaş altındaki kişilerin bahis oynaması yasaktır.</p>
                  <p><strong>• Mali Risk:</strong> Kaybetmeyi göze alamayacağınız parayla asla bahis oynamayın.</p>
                  <p><strong>• Bilgi Paylaşım Platformu:</strong> Bu platform sadece bilgi paylaşımı içindir, bahis oynamak için değildir.</p>
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
                <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-orange-500/20 to-orange-500/5 flex items-center justify-center border border-orange-500/20 text-sm font-bold">
                  <Info className="h-4 w-4 text-orange-400" />
                </span>
                <span>Platform Hizmetinin Niteliği</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-foreground/80 leading-relaxed space-y-4">
              <p>
                İddaaSohbet yalnızca bir <strong className="text-orange-400">sosyal içerik paylaşım platformudur</strong>. 
                Platform üzerinde:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="glass-dark p-4 rounded-lg border border-red-500/20 bg-red-500/5">
                  <h4 className="font-semibold text-red-400 mb-2 flex items-center space-x-2">
                    <XCircle className="h-4 w-4" />
                    <span>YAPILMAZ</span>
                  </h4>
                  <ul className="space-y-1 text-sm list-disc list-inside ml-2">
                    <li>Bahis oynanmaz</li>
                    <li>Para yatırma/çekme işlemi yoktur</li>
                    <li>Kupon satışı yapılmaz</li>
                    <li>Ödeme işlemi gerçekleştirilmez</li>
                    <li>Bahis sitesi değildir</li>
                  </ul>
                </div>
                <div className="glass-dark p-4 rounded-lg border border-green-500/20 bg-green-500/5">
                  <h4 className="font-semibold text-green-400 mb-2 flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>YAPILIR</span>
                  </h4>
                  <ul className="space-y-1 text-sm list-disc list-inside ml-2">
                    <li>Kupon paylaşımı</li>
                    <li>İstatistik takibi</li>
                    <li>Analiz paylaşımı</li>
                    <li>Sosyal etkileşim</li>
                    <li>Bilgi alışverişi</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 2 */}
          <Card className="glass-dark border-white/5 animate-fadeInUp" style={{ animationDelay: '0.25s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-red-500/20 to-red-500/5 flex items-center justify-center border border-red-500/20 text-sm font-bold">
                  <DollarSign className="h-4 w-4 text-red-400" />
                </span>
                <span>Mali Sorumluluk Reddi</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-foreground/80 leading-relaxed space-y-4">
              <div className="glass-dark p-4 rounded-lg border border-red-500/20 bg-red-500/5">
                <p className="font-bold text-red-400 mb-3">PLATFORM KAZANÇ GARANTİSİ VERMEZ</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start space-x-2">
                    <XCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <span>Platformda paylaşılan kuponların başarısını garanti etmiyoruz</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <XCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <span>Kullanıcıların bahis kayıplarından sorumlu değiliz</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <XCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <span>Finansal tavsiye vermiyoruz</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <XCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <span>Başkalarının kuponlarını kopyalama kararı tamamen size aittir</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <XCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <span>Hiçbir kullanıcı veya tahmin için kefil değiliz</span>
                  </li>
                </ul>
              </div>
              <p className="text-sm italic">
                <strong>Önemli:</strong> Bahis oynamanın mali risklerini anlayın. Sadece kaybetmeyi göze 
                alabileceğiniz parayla bahis oynayın.
              </p>
            </CardContent>
          </Card>

          {/* Section 3 */}
          <Card className="glass-dark border-white/5 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 flex items-center justify-center border border-yellow-500/20 text-sm font-bold">3</span>
                <span>İçerik Doğruluğu</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-foreground/80 leading-relaxed space-y-4">
              <p>Platformda paylaşılan içerikler hakkında:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-sm">
                <li>Kullanıcılar tarafından oluşturulan içeriklerin doğruluğunu garanti etmeyiz</li>
                <li>İstatistiklerin %100 doğru olacağını garanti etmeyiz</li>
                <li>Maç sonuçları ve oranlar üçüncü taraf kaynaklardan alınır, gecikme olabilir</li>
                <li>Kullanıcı tahminleri kişisel görüştür, profesyonel tavsiye değildir</li>
                <li>Yanıltıcı veya yanlış içerik tespit ettiğinizde lütfen bildirin</li>
              </ul>
              <div className="glass-dark p-4 rounded-lg border border-yellow-500/20">
                <p className="text-sm">
                  <strong className="text-yellow-400">Not:</strong> Her ne kadar doğruluğu sağlamak 
                  için çaba gösterirsek de, insan hatası veya teknik sorunlar nedeniyle hatalar oluşabilir.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Section 4 */}
          <Card className="glass-dark border-white/5 animate-fadeInUp" style={{ animationDelay: '0.35s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-500/5 flex items-center justify-center border border-blue-500/20 text-sm font-bold">
                  <ExternalLink className="h-4 w-4 text-blue-400" />
                </span>
                <span>Üçüncü Taraf Bahis Siteleri</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-foreground/80 leading-relaxed space-y-4">
              <div className="glass-dark p-4 rounded-lg border border-blue-500/20 bg-blue-500/5">
                <p className="font-semibold text-blue-400 mb-2">Platform Dışı Siteler İçin Sorumluluk</p>
                <p className="text-sm">
                  Platformumuz üzerinden erişebileceğiniz veya referans verilen üçüncü taraf bahis siteleri 
                  için hiçbir sorumluluk kabul etmiyoruz:
                </p>
              </div>
              <ul className="list-disc list-inside space-y-2 ml-4 text-sm">
                <li>Bahis sitelerinin güvenliği, lisansı veya yasal durumu</li>
                <li>Bahis sitelerinin ödeme yapıp yapmayacağı</li>
                <li>Bahis sitelerinin kullanım koşulları ve politikaları</li>
                <li>Bahis sitelerinde yaşanabilecek sorunlar</li>
                <li>Bahis sitelerinin veri güvenliği</li>
              </ul>
              <p className="text-sm text-orange-400 font-semibold">
                Bahis yapmadan önce ilgili sitenin lisans durumunu ve yasal olup olmadığını kontrol edin.
              </p>
            </CardContent>
          </Card>

          {/* Section 5 */}
          <Card className="glass-dark border-white/5 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-500/5 flex items-center justify-center border border-purple-500/20 text-sm font-bold">5</span>
                <span>Hizmet Kesintileri ve Hatalar</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-foreground/80 leading-relaxed space-y-4">
              <p>Platform hizmetleri "olduğu gibi" sunulmaktadır:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-sm">
                <li>7/24 kesintisiz hizmet garantisi vermiyoruz</li>
                <li>Bakım, güncelleme veya teknik sorunlar nedeniyle kesintiler yaşanabilir</li>
                <li>Veri kaybı, hata veya gecikmelerden sorumlu değiliz</li>
                <li>Platform özelliklerinin her zaman çalışacağını garanti etmiyoruz</li>
              </ul>
            </CardContent>
          </Card>

          {/* Section 6 */}
          <Card className="glass-dark border-white/5 animate-fadeInUp" style={{ animationDelay: '0.45s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-pink-500/20 to-pink-500/5 flex items-center justify-center border border-pink-500/20 text-sm font-bold">6</span>
                <span>Kullanıcı İçeriği Sorumluluğu</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-foreground/80 leading-relaxed space-y-4">
              <p>Kullanıcılar tarafından paylaşılan içerikler için:</p>
              <div className="glass-dark p-4 rounded-lg border border-pink-500/20">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-pink-400 flex-shrink-0 mt-0.5" />
                    <span>Her kullanıcı kendi paylaştığı içerikten sorumludur</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-pink-400 flex-shrink-0 mt-0.5" />
                    <span>Uygunsuz, yanıltıcı veya yasa dışı içerik bildirin</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-pink-400 flex-shrink-0 mt-0.5" />
                    <span>İçerik moderasyonu yapıyoruz ama tüm içeriği önceden kontrol edemeyiz</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-pink-400 flex-shrink-0 mt-0.5" />
                    <span>Kullanıcılar arası anlaşmazlıklardan sorumlu değiliz</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Section 7 */}
          <Card className="glass-dark border-white/5 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 flex items-center justify-center border border-cyan-500/20 text-sm font-bold">7</span>
                <span>Kumar Bağımlılığı Uyarısı</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-foreground/80 leading-relaxed space-y-4">
              <div className="glass-dark p-4 rounded-lg border border-red-500/30 bg-red-500/5">
                <h4 className="font-bold text-red-400 mb-3">Kumar Bağımlılığı Ciddi Bir Sorundur</h4>
                <p className="text-sm mb-3">Aşağıdaki belirtileri kendinizde görüyorsanız profesyonel yardım alın:</p>
                <ul className="space-y-1 text-sm list-disc list-inside ml-2">
                  <li>Bahis için giderek daha fazla para harcama</li>
                  <li>Kayıpları telafi etmek için sürekli bahis oynama</li>
                  <li>Bahis için borç alma veya mal satma</li>
                  <li>Bahsi azaltmak veya durdurmakta zorluk</li>
                  <li>Aile ve sosyal hayattan uzaklaşma</li>
                </ul>
              </div>
              <div className="glass-dark p-4 rounded-lg border border-green-500/20">
                <p className="font-semibold text-green-400 mb-2">Yardım Hatları:</p>
                <ul className="space-y-1 text-sm">
                  <li><strong>Yeşilay:</strong> 444 6 833</li>
                  <li><strong>Kumar Bağımlılığı Danışma:</strong> Yerel sağlık merkezlerinize başvurun</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Section 8 */}
          <Card className="glass-dark border-white/5 animate-fadeInUp" style={{ animationDelay: '0.55s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500/20 to-indigo-500/5 flex items-center justify-center border border-indigo-500/20 text-sm font-bold">
                  <Scale className="h-4 w-4 text-indigo-400" />
                </span>
                <span>Yasal Uyarı</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-foreground/80 leading-relaxed space-y-4">
              <div className="space-y-3">
                <p className="font-semibold text-indigo-400">Kullanıcılar Şunları Kabul Eder:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-sm">
                  <li>Platformu kendi riskleri altında kullanırlar</li>
                  <li>Bahis kararları tamamen kendilerine aittir</li>
                  <li>Mali kayıplardan platformu sorumlu tutamazlar</li>
                  <li>Yürürlükteki bahis yasalarına uymakla yükümlüdürler</li>
                  <li>18 yaş sınırına uymak zorundadırlar</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Section 9 */}
          <Card className="glass-dark border-white/5 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-green-500/20 to-green-500/5 flex items-center justify-center border border-green-500/20 text-sm font-bold">9</span>
                <span>Sorumluluğun Sınırı</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-foreground/80 leading-relaxed space-y-4">
              <p className="font-semibold">
                Yasaların izin verdiği azami ölçüde, platformumuz aşağıdakilerden sorumlu tutulamaz:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-sm">
                <li>Doğrudan, dolaylı, tesadüfi veya sonuç olarak oluşan zararlar</li>
                <li>Gelir veya kar kaybı</li>
                <li>İş kaybı veya iş fırsatlarının kaçırılması</li>
                <li>Veri kaybı</li>
                <li>İtibar kaybı</li>
                <li>Üçüncü tarafların neden olduğu zararlar</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Final Warning */}
        <Card className="glass-dark border-orange-500/30 bg-orange-500/5 mt-8 animate-fadeInUp" style={{ animationDelay: '0.65s' }}>
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <AlertTriangle className="h-6 w-6 text-orange-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-orange-400 mb-2">Son Hatırlatma</h3>
                <p className="text-foreground/80 text-sm leading-relaxed">
                  Bu sorumluluk reddi metnini dikkatlice okuduğunuzu ve anladığınızı kabul ederek 
                  platformumuzu kullanıyorsunuz. Sorularınız için <a href="/iletisim" className="text-blue-400 hover:underline">iletişim sayfamızı</a> ziyaret edebilirsiniz.
                </p>
                <p className="text-foreground/80 text-sm mt-3">
                  <strong className="text-orange-400">Akıllı Bahis:</strong> Sadece eğlence amaçlı, 
                  kaybetmeyi göze alabileceğiniz parayla ve sorumlu bir şekilde bahis oynayın.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
