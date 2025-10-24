"use client"

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  CircleHelp,
  ChevronDown,
  Search,
  Shield,
  DollarSign,
  Users,
  Trophy,
  Settings,
  AlertCircle
} from 'lucide-react'

const categories = [
  { id: 'all', name: 'Tümü', icon: CircleHelp, color: 'text-green-400' },
  { id: 'account', name: 'Hesap', icon: Users, color: 'text-blue-400' },
  { id: 'security', name: 'Güvenlik', icon: Shield, color: 'text-yellow-400' },
  { id: 'coupons', name: 'Kuponlar', icon: Trophy, color: 'text-purple-400' },
  { id: 'payment', name: 'Ödeme', icon: DollarSign, color: 'text-orange-400' },
  { id: 'technical', name: 'Teknik', icon: Settings, color: 'text-cyan-400' }
]

const faqs = [
  { category: 'account', question: 'Nasıl üye olabilirim?', answer: 'Ana sayfadaki "Kayıt Ol" butonuna tıklayarak ücretsiz hesap oluşturabilirsiniz. Sadece e-posta adresiniz ve bir kullanıcı adı belirlemeniz yeterlidir. Kayıt işlemi 1 dakikadan kısa sürer.' },
  { category: 'account', question: 'Şifremi unuttum, ne yapmalıyım?', answer: 'Giriş sayfasındaki "Şifremi Unuttum" linkine tıklayın. E-posta adresinizi girin, size şifre sıfırlama linki göndereceğiz. Link 24 saat geçerlidir.' },
  { category: 'account', question: 'Kullanıcı adımı değiştirebilir miyim?', answer: 'Kullanıcı adınızı profil ayarlarından yalnızca bir kez değiştirebilirsiniz. Değişiklik sonrası 30 gün içinde tekrar değiştiremezsiniz.' },
  { category: 'account', question: 'Hesabımı nasıl silebilirim?', answer: 'Hesap ayarlarından "Hesabı Sil" seçeneğini kullanabilirsiniz. Bu işlem geri alınamaz ve tüm verileriniz kalıcı olarak silinir.' },
  { category: 'security', question: 'Verilerim güvende mi?', answer: 'Evet, tüm verileriniz SSL sertifikası ile şifrelenir. Şifreleriniz bcrypt algoritması ile hash\'lenir ve asla düz metin olarak saklanmaz. KVKK uyumlu çalışıyoruz.' },
  { category: 'security', question: 'İki faktörlü kimlik doğrulama var mı?', answer: 'Yakında eklenecek. Hesap güvenliğinizi artırmak için SMS ve Google Authenticator desteği üzerinde çalışıyoruz.' },
  { category: 'security', question: 'Şüpheli aktivite bildirimi alırsam ne yapmalıyım?', answer: 'Hemen şifrenizi değiştirin ve bizimle iletişime geçin. Şüpheli aktivite tespit edersek hesabınızı geçici olarak dondurabilir ve size bildirim göndeririz.' },
  { category: 'coupons', question: 'Kupon paylaşımı ücretsiz mi?', answer: 'Evet, platformumuzda kupon paylaşmak tamamen ücretsizdir. Herhangi bir ücret veya abonelik ödemeden sınırsız kupon paylaşabilirsiniz.' },
  { category: 'coupons', question: 'Kuponum kaybederse ne olur?', answer: 'Kuponunuz kaybederse istatistiklerinize yansır. Başarı oranınız otomatik olarak güncellenir. Şeffaflık ilkemiz gereği tüm sonuçlar gerçek zamanlı gösterilir.' },
  { category: 'coupons', question: 'Başkasının kuponunu kopyalayabilir miyim?', answer: 'Evet, beğendiğiniz kuponları "Kopyala" butonu ile kendi bahis sitenize aktarabilirsiniz. Ancak lütfen orijinal paylaşımcıyı takip edin ve beğeni bırakın.' },
  { category: 'coupons', question: 'Kupon sonuçları nasıl güncellenir?', answer: 'Maç sonuçları API üzerinden otomatik olarak güncellenir. Bazı durumlarda manuel kontrol de yapılır. Sonuçlar genellikle maç bitiminden 1 saat içinde yansır.' },
  { category: 'coupons', question: 'En fazla kaç maçlık kupon paylaşabilirim?', answer: 'Tek bir kuponda maksimum 15 maç bulunabilir. Daha fazla maç eklemek isterseniz birden fazla kupon oluşturabilirsiniz.' },
  { category: 'payment', question: 'Platformda ödeme yapıyor muyuz?', answer: 'Hayır, İddaaSohbet sadece kupon paylaşım platformudur. Herhangi bir bahis oynamak veya ödeme yapmak için lisanslı bahis sitelerini kullanmalısınız.' },
  { category: 'payment', question: 'Premium üyelik var mı?', answer: 'Şu an tüm özellikler ücretsizdir. Gelecekte özel rozetler ve istatistik araçları içeren premium üyelik planları sunabiliriz.' },
  { category: 'payment', question: 'Kazançlarımı platformda görebilir miyim?', answer: 'Evet, her kupon için potansiyel kazanç ve gerçekleşen kazanç bilgilerini girebilirsiniz. Toplam kar/zarar istatistikleriniz profilinizde görünür.' },
  { category: 'technical', question: 'Mobil uygulama var mı?', answer: 'Henüz yok ama çalışıyoruz. Şimdilik responsive web sitemiz mobil cihazlarda mükemmel çalışıyor. iOS ve Android uygulamaları 2025\'te yayınlanacak.' },
  { category: 'technical', question: 'Hangi tarayıcıları destekliyorsunuz?', answer: 'Chrome, Firefox, Safari, Edge ve Opera\'nın güncel versiyonlarını destekliyoruz. En iyi deneyim için Chrome veya Firefox öneriyoruz.' },
  { category: 'technical', question: 'Site çok yavaş, ne yapmalıyım?', answer: 'Tarayıcı cache\'inizi temizleyin, eklentileri devre dışı bırakın. Sorun devam ederse bize bildirin. Sunucu tarafında bir sorun varsa derhal müdahale ederiz.' },
  { category: 'technical', question: 'Bildirimleri nasıl açabilirim?', answer: 'Profil ayarlarından bildirim tercihlerinizi yönetebilirsiniz. Takip ettiğiniz kişilerin yeni kuponları, yorumlar ve beğeniler için bildirim alabilirsiniz.' }
]

export default function SSSPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [openQuestion, setOpenQuestion] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory
    const matchesSearch =
      searchQuery === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const toggleQuestion = (question: string) => {
    setOpenQuestion(openQuestion === question ? null : question)
  }

  return (
    <div className="min-h-screen py-12 relative">
      <div className="absolute inset-0 grid-pattern"></div>
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 animate-fadeInUp">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <CircleHelp className="h-10 w-10 text-blue-400 animate-pulse" />
            <h1 className="text-4xl md:text-5xl font-bold gradient-text">Sıkça Sorulan Sorular</h1>
          </div>
          <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
            İhtiyacınız olan tüm yanıtlar burada. Sorunuzu bulamazsanız bizimle iletişime geçin.
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-12 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/50" />
            <Input
              type="text"
              placeholder="Sorunuzu arayın..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 glass border-white/10 focus:border-blue-500/50 bg-black/20 h-14 text-base"
            />
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-green-500 to-blue-400 text-black hover:from-green-600 hover:to-blue-500'
                  : 'glass border-white/10 hover:border-white/20 hover:bg-white/5'
              } btn-premium`}
              variant={activeCategory === category.id ? 'default' : 'outline'}
            >
              <category.icon className={`h-4 w-4 mr-2 ${activeCategory === category.id ? '' : category.color}`} />
              {category.name}
            </Button>
          ))}
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {filteredFaqs.length === 0 ? (
            <Card className="glass-dark border-white/5 animate-fadeInUp">
              <CardContent className="p-12 text-center">
                <AlertCircle className="h-16 w-16 text-foreground/30 mx-auto mb-4" />
                <p className="text-foreground/60">Aradığınız soruyu bulamadık.</p>
                <p className="text-sm text-foreground/40 mt-2">Farklı bir arama terimi deneyin veya kategori seçin.</p>
              </CardContent>
            </Card>
          ) : (
            filteredFaqs.map((faq, index) => (
              <Card key={index} className="glass-dark border-white/5 card-premium animate-fadeInUp overflow-hidden" style={{ animationDelay: `${0.3 + index * 0.05}s` }}>
                <CardContent className="p-0">
                  <button onClick={() => toggleQuestion(faq.question)} className="w-full p-6 flex items-start justify-between text-left hover:bg-white/5 transition-all">
                    <div className="flex-1 pr-4">
                      <div className="flex items-center space-x-2 mb-2">
                        {categories.find(cat => cat.id === faq.category) && (
                          <>
                            {(() => {
                              const CategoryIcon = categories.find(cat => cat.id === faq.category)!.icon
                              return <CategoryIcon className={`h-4 w-4 ${categories.find(cat => cat.id === faq.category)!.color}`} />
                            })()}
                          </>
                        )}
                        <span className="text-xs text-foreground/50 uppercase">
                          {categories.find(cat => cat.id === faq.category)?.name}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold">{faq.question}</h3>
                    </div>
                    <div className={`flex-shrink-0 transition-transform duration-300 ${openQuestion === faq.question ? 'rotate-180' : ''}`}>
                      <ChevronDown className="h-6 w-6 text-foreground/50" />
                    </div>
                  </button>

                  {openQuestion === faq.question && (
                    <div className="px-6 pb-6 animate-fadeInUp">
                      <div className="glass-dark p-4 rounded-lg border border-white/5">
                        <p className="text-foreground/70 leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>

        <Card className="glass-dark border-white/5 max-w-4xl mx-auto mt-12 animate-fadeInUp">
          <CardContent className="p-8 text-center">
            <CircleHelp className="h-12 w-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-3 gradient-text">Hala Sorunuz mu Var?</h3>
            <p className="text-foreground/70 mb-6 max-w-lg mx-auto">
              Aradığınız yanıtı bulamadıysanız, destek ekibimiz size yardımcı olmaktan mutluluk duyar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-green-500 to-blue-400 hover:from-green-600 hover:to-blue-500 text-black font-bold btn-premium" asChild>
                <a href="/iletisim">İletişime Geçin</a>
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 hover:border-green-500/50 hover:bg-green-500/10 hover:text-green-400" asChild>
                <a href="mailto:info@iddaasohbet.com">E-posta Gönderin</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
