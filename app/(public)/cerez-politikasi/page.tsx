import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Cookie,
  Shield,
  Settings,
  Clock,
  Info,
  CheckCircle,
  XCircle
} from 'lucide-react'

export default function CerezPolitikasiPage() {
  return (
    <div className="min-h-screen py-12 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>

      <div className="container mx-auto px-4 relative z-10 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fadeInUp">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Cookie className="h-10 w-10 text-yellow-400 animate-pulse" />
            <h1 className="text-4xl md:text-5xl font-bold gradient-text">Çerez Politikası</h1>
          </div>
          <p className="text-foreground/70 text-lg">
            Web sitemizde kullanılan çerezler hakkında detaylı bilgi
          </p>
          <Badge className="mt-4 glass border-yellow-400/30 text-yellow-400">
            Son Güncelleme: 10 Ocak 2025
          </Badge>
        </div>

        {/* Quick Info */}
        <Card className="glass-dark border-yellow-500/20 bg-yellow-500/5 mb-8 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <Info className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-yellow-400 mb-2">Çerez Nedir?</h3>
                <p className="text-foreground/80 text-sm leading-relaxed">
                  Çerezler (cookies), web sitelerini ziyaret ettiğinizde tarayıcınızda saklanan küçük metin 
                  dosyalarıdır. Bu dosyalar, web sitesinin daha iyi çalışmasını sağlar ve size özelleştirilmiş 
                  bir deneyim sunar.
                </p>
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
                <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-yellow-400/20 to-yellow-400/5 flex items-center justify-center border border-yellow-400/20 text-sm font-bold">
                  <Cookie className="h-4 w-4 text-yellow-400" />
                </span>
                <span>Çerez Kullanım Amacımız</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-foreground/80 leading-relaxed space-y-4">
              <p>İddaaSohbet olarak çerezleri aşağıdaki amaçlarla kullanıyoruz:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-sm">
                <li>Web sitesinin düzgün çalışmasını sağlamak</li>
                <li>Oturum bilgilerinizi hatırlamak (giriş durumu)</li>
                <li>Tercihlerinizi kaydetmek (tema, dil vb.)</li>
                <li>Site performansını analiz etmek ve iyileştirmek</li>
                <li>Güvenlik önlemlerini uygulamak</li>
                <li>Kullanıcı deneyimini kişiselleştirmek</li>
              </ul>
            </CardContent>
          </Card>

          {/* Section 2 - Cookie Types */}
          <Card className="glass-dark border-white/5 animate-fadeInUp" style={{ animationDelay: '0.25s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-500/5 flex items-center justify-center border border-blue-500/20 text-sm font-bold">2</span>
                <span>Kullandığımız Çerez Türleri</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-foreground/80 leading-relaxed space-y-6">
              {/* Zorunlu Çerezler */}
              <div className="glass-dark p-5 rounded-lg border border-green-500/20 bg-green-500/5">
                <div className="flex items-start space-x-3 mb-3">
                  <Shield className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-green-400">Zorunlu Çerezler</h4>
                      <Badge className="bg-green-500 text-black text-xs">Devre Dışı Bırakılamaz</Badge>
                    </div>
                    <p className="text-sm mb-3">
                      Web sitesinin temel işlevleri için gerekli çerezlerdir. Bu çerezler olmadan site düzgün çalışmaz.
                    </p>
                    <div className="space-y-2 text-xs">
                      <div className="grid grid-cols-3 gap-2 font-semibold text-green-400">
                        <span>Çerez Adı</span>
                        <span>Amaç</span>
                        <span>Süre</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 glass p-2 rounded">
                        <span>session_id</span>
                        <span>Oturum yönetimi</span>
                        <span>Oturum</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 glass p-2 rounded">
                        <span>csrf_token</span>
                        <span>Güvenlik (CSRF koruması)</span>
                        <span>Oturum</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 glass p-2 rounded">
                        <span>auth_token</span>
                        <span>Kimlik doğrulama</span>
                        <span>30 gün</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performans Çerezleri */}
              <div className="glass-dark p-5 rounded-lg border border-blue-500/20">
                <div className="flex items-start space-x-3 mb-3">
                  <Settings className="h-6 w-6 text-blue-400 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-blue-400">Performans Çerezleri</h4>
                      <Badge className="glass border-blue-500/30 text-blue-400 text-xs">Opsiyonel</Badge>
                    </div>
                    <p className="text-sm mb-3">
                      Site performansını ölçmek ve iyileştirmek için kullanılır. Hangi sayfaların popüler olduğunu anlamamıza yardımcı olur.
                    </p>
                    <div className="space-y-2 text-xs">
                      <div className="grid grid-cols-3 gap-2 font-semibold text-blue-400">
                        <span>Çerez Adı</span>
                        <span>Amaç</span>
                        <span>Süre</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 glass p-2 rounded">
                        <span>_analytics_id</span>
                        <span>Ziyaretçi analizi</span>
                        <span>1 yıl</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 glass p-2 rounded">
                        <span>page_views</span>
                        <span>Sayfa görüntüleme sayısı</span>
                        <span>1 gün</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tercih Çerezleri */}
              <div className="glass-dark p-5 rounded-lg border border-purple-500/20">
                <div className="flex items-start space-x-3 mb-3">
                  <CheckCircle className="h-6 w-6 text-purple-400 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-purple-400">Tercih Çerezleri</h4>
                      <Badge className="glass border-purple-500/30 text-purple-400 text-xs">Opsiyonel</Badge>
                    </div>
                    <p className="text-sm mb-3">
                      Tercihlerinizi (dil, tema vb.) hatırlamak için kullanılır. Site deneyiminizi kişiselleştirir.
                    </p>
                    <div className="space-y-2 text-xs">
                      <div className="grid grid-cols-3 gap-2 font-semibold text-purple-400">
                        <span>Çerez Adı</span>
                        <span>Amaç</span>
                        <span>Süre</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 glass p-2 rounded">
                        <span>theme_preference</span>
                        <span>Tema tercihi (dark/light)</span>
                        <span>1 yıl</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 glass p-2 rounded">
                        <span>language</span>
                        <span>Dil tercihi</span>
                        <span>1 yıl</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 glass p-2 rounded">
                        <span>cookieConsent</span>
                        <span>Çerez onay durumu</span>
                        <span>1 yıl</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 3 */}
          <Card className="glass-dark border-white/5 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-orange-500/20 to-orange-500/5 flex items-center justify-center border border-orange-500/20 text-sm font-bold">
                  <Clock className="h-4 w-4 text-orange-400" />
                </span>
                <span>Çerez Saklama Süreleri</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-foreground/80 leading-relaxed space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="glass-dark p-4 rounded-lg border border-white/5">
                  <h4 className="font-semibold text-orange-400 mb-2">Oturum Çerezleri</h4>
                  <p className="text-sm">
                    Tarayıcınızı kapattığınızda otomatik olarak silinir. Geçici olarak kullanılır.
                  </p>
                </div>
                <div className="glass-dark p-4 rounded-lg border border-white/5">
                  <h4 className="font-semibold text-orange-400 mb-2">Kalıcı Çerezler</h4>
                  <p className="text-sm">
                    Belirli bir süre (örn: 1 yıl) tarayıcınızda saklanır. Tercihlerinizi hatırlamak için kullanılır.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 4 */}
          <Card className="glass-dark border-white/5 animate-fadeInUp" style={{ animationDelay: '0.35s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-green-500/20 to-green-500/5 flex items-center justify-center border border-green-500/20 text-sm font-bold">4</span>
                <span>Çerezleri Nasıl Yönetebilirsiniz?</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-foreground/80 leading-relaxed space-y-4">
              <p>Çerezleri kontrol etmek için aşağıdaki seçeneklere sahipsiniz:</p>
              
              <div className="space-y-4">
                <div className="glass-dark p-4 rounded-lg border border-green-500/20">
                  <h4 className="font-semibold text-green-400 mb-2 flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Platform Üzerinden</span>
                  </h4>
                  <p className="text-sm mb-2">
                    Sitemizin alt kısmında çıkan çerez bildirimi üzerinden tercihlerinizi belirtebilirsiniz.
                  </p>
                </div>

                <div className="glass-dark p-4 rounded-lg border border-blue-500/20">
                  <h4 className="font-semibold text-blue-400 mb-2 flex items-center space-x-2">
                    <Settings className="h-4 w-4" />
                    <span>Tarayıcı Ayarları</span>
                  </h4>
                  <p className="text-sm mb-2">
                    Tarayıcınızın ayarlarından çerezleri yönetebilir, silebilir veya engelleyebilirsiniz:
                  </p>
                  <ul className="space-y-1 text-xs ml-4">
                    <li><strong>Chrome:</strong> Ayarlar → Gizlilik ve güvenlik → Çerezler</li>
                    <li><strong>Firefox:</strong> Ayarlar → Gizlilik ve Güvenlik → Çerezler ve Site Verileri</li>
                    <li><strong>Safari:</strong> Tercihler → Gizlilik → Çerezleri Engelle</li>
                    <li><strong>Edge:</strong> Ayarlar → Çerezler ve site izinleri</li>
                  </ul>
                </div>

                <div className="glass-dark p-4 rounded-lg border border-yellow-500/20 bg-yellow-500/5">
                  <p className="text-sm">
                    <strong className="text-yellow-400">Uyarı:</strong> Çerezleri tamamen devre dışı bırakırsanız, 
                    sitemizin bazı özellikleri düzgün çalışmayabilir.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 5 */}
          <Card className="glass-dark border-white/5 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 flex items-center justify-center border border-cyan-500/20 text-sm font-bold">5</span>
                <span>Üçüncü Taraf Çerezler</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-foreground/80 leading-relaxed space-y-4">
              <p>
                Bazı durumlarda, üçüncü taraf hizmet sağlayıcıların (örn: analiz araçları) 
                çerezlerini de kullanabiliriz. Bu çerezler üzerinde direkt kontrolümüz yoktur.
              </p>
              <div className="glass-dark p-4 rounded-lg border border-cyan-500/20">
                <p className="text-sm">
                  Üçüncü taraf çerezler hakkında daha fazla bilgi için ilgili hizmet sağlayıcının 
                  gizlilik politikasını incelemenizi öneririz.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Section 6 */}
          <Card className="glass-dark border-white/5 animate-fadeInUp" style={{ animationDelay: '0.45s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-500/5 flex items-center justify-center border border-purple-500/20 text-sm font-bold">6</span>
                <span>İletişim</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-foreground/80 leading-relaxed space-y-4">
              <p>Çerez politikası hakkında sorularınız için:</p>
              <div className="glass-dark p-4 rounded-lg border border-white/5">
                <ul className="space-y-2 text-sm">
                  <li><strong className="text-purple-400">E-posta:</strong> privacy@iddaasohbet.com</li>
                  <li><strong className="text-purple-400">İletişim:</strong> <a href="/iletisim" className="text-blue-400 hover:underline">/iletisim</a></li>
                  <li><strong className="text-purple-400">Adres:</strong> Maslak, İstanbul, Türkiye</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer Notice */}
        <Card className="glass-dark border-yellow-500/20 bg-yellow-500/5 mt-8 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <Info className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-yellow-400 mb-2">Politika Güncellemeleri</h3>
                <p className="text-foreground/80 text-sm leading-relaxed">
                  Bu çerez politikasını düzenli olarak güncelleyebiliriz. Değişiklikler bu sayfada 
                  yayınlanır ve önemli değişiklikler için size bildirimde bulunuruz.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
