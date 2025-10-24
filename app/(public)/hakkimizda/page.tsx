import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Trophy, 
  Users, 
  Target,
  Shield,
  Zap,
  Award,
  Heart,
  TrendingUp,
  CheckCircle,
  Sparkles,
  Rocket,
  Star
} from 'lucide-react'
import Link from 'next/link'

const stats = [
  { label: 'Aktif Kullanıcı', value: '18,500+', icon: Users, color: 'text-green-400' },
  { label: 'Paylaşılan Kupon', value: '75,000+', icon: Trophy, color: 'text-yellow-400' },
  { label: 'Başarı Oranı', value: '%78', icon: Target, color: 'text-blue-400' },
  { label: 'Toplam Kazanç', value: '₺3.2M+', icon: TrendingUp, color: 'text-purple-400' }
]

const features = [
  {
    icon: Shield,
    title: 'Güvenilir Platform',
    description: 'Kullanıcı verileriniz SSL sertifikası ile korunur. Gizliliğiniz bizim için önemlidir.'
  },
  {
    icon: Zap,
    title: 'Hızlı & Stabil',
    description: 'Modern teknoloji altyapısı ile kesintisiz hizmet ve yüksek performans garantisi.'
  },
  {
    icon: Award,
    title: 'Doğrulanmış Kullanıcılar',
    description: 'Tahmincieler doğrulanır ve başarı oranları şeffaf şekilde gösterilir.'
  },
  {
    icon: Heart,
    title: 'Topluluk Odaklı',
    description: 'Kullanıcı deneyimi odaklı geliştirmeler ve aktif topluluk desteği.'
  }
]

const team = [
  {
    name: 'Ahmet Yılmaz',
    role: 'Kurucu & CEO',
    bio: '10 yıllık iddaa ve betting tecrübesi',
    icon: '👨‍💼'
  },
  {
    name: 'Mehmet Kaya',
    role: 'CTO',
    bio: 'Full-stack geliştirici ve sistem mimarı',
    icon: '👨‍💻'
  },
  {
    name: 'Ayşe Demir',
    role: 'Baş Analist',
    bio: 'Profesyonel spor analisti ve istatistikçi',
    icon: '👩‍💼'
  },
  {
    name: 'Can Öztürk',
    role: 'Topluluk Yöneticisi',
    bio: 'Kullanıcı ilişkileri ve destek uzmanı',
    icon: '👨‍🎓'
  }
]

const values = [
  { icon: CheckCircle, title: 'Şeffaflık', desc: 'Tüm istatistikler gerçek ve doğrulanabilir' },
  { icon: Shield, title: 'Güvenlik', desc: 'Verileriniz en üst seviyede korunur' },
  { icon: Star, title: 'Kalite', desc: 'Sadece kaliteli içerik ve tahminler' },
  { icon: Users, title: 'Topluluk', desc: 'Güçlü ve destekleyici bir topluluk' }
]

export default function HakkimizdaPage() {
  return (
    <div className="min-h-screen relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto animate-fadeInUp">
            <div className="inline-flex items-center space-x-2 glass px-4 py-2 rounded-full border border-green-500/20 mb-6">
              <Sparkles className="h-4 w-4 text-yellow-400 animate-pulse" />
              <span className="text-sm font-semibold text-green-400">Türkiye'nin En Güvenilir Platformu</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Hakkımızda
            </h1>
            
            <p className="text-xl text-foreground/70 leading-relaxed mb-8">
              İddaaSohbet, Türkiye'nin en büyük ve en güvenilir iddaa kupon paylaşım platformudur. 
              2020 yılında kurulan platformumuz, binlerce kullanıcıya hizmet vermektedir.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/kayit">
                <Button size="lg" className="bg-gradient-to-r from-green-500 to-yellow-400 hover:from-green-600 hover:to-yellow-500 text-black font-bold btn-premium h-14 px-8">
                  <Rocket className="mr-2 h-5 w-5" />
                  Hemen Başla
                </Button>
              </Link>
              <Link href="/iletisim">
                <Button size="lg" variant="outline" className="border-white/20 hover:border-green-500/50 hover:bg-green-500/10 hover:text-green-400 h-14 px-8">
                  İletişime Geç
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            {stats.map((stat, index) => (
              <Card key={index} className="glass-dark border-white/5 card-premium">
                <CardContent className="p-6 text-center">
                  <div className={`h-14 w-14 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center mx-auto mb-4 border border-white/10`}>
                    <stat.icon className={`h-7 w-7 ${stat.color}`} />
                  </div>
                  <p className="text-3xl font-bold gradient-text mb-2">{stat.value}</p>
                  <p className="text-sm text-foreground/60">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <Card className="glass-dark border-white/5 card-premium animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              <CardContent className="p-8 md:p-12">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/5 flex items-center justify-center border border-green-500/20">
                    <Target className="h-6 w-6 text-green-400" />
                  </div>
                  <h2 className="text-3xl font-bold gradient-text">Misyonumuz</h2>
                </div>
                <p className="text-foreground/70 text-lg leading-relaxed mb-6">
                  İddaa severlere güvenli, şeffaf ve kaliteli bir ortam sunmak. Kullanıcılarımızın 
                  başarılı tahminler yapmasına yardımcı olmak ve kazanç elde etmelerini sağlamak.
                </p>
                <p className="text-foreground/70 text-lg leading-relaxed">
                  Topluluğumuzu büyüterek, en başarılı tahmincierleri bir araya getirmek ve 
                  herkesin birbirinden öğrenmesini sağlamak ana hedefimizdir.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Neden Bizi Seçmelisiniz?</h2>
            <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
              Kullanıcılarımıza en iyi deneyimi sunmak için sürekli gelişiyoruz
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="glass-dark border-white/5 card-premium animate-fadeInUp" style={{ animationDelay: `${0.4 + index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/5 flex items-center justify-center flex-shrink-0 border border-green-500/20">
                      <feature.icon className="h-6 w-6 text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                      <p className="text-foreground/70">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Değerlerimiz</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            {values.map((value, index) => (
              <Card key={index} className="glass-dark border-white/5 card-premium">
                <CardContent className="p-6 text-center">
                  <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-yellow-400/20 to-yellow-400/5 flex items-center justify-center mx-auto mb-4 border border-yellow-400/20">
                    <value.icon className="h-7 w-7 text-yellow-400" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{value.title}</h3>
                  <p className="text-sm text-foreground/60">{value.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Ekibimiz</h2>
            <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
              Deneyimli ve tutkulu ekibimizle sizlere hizmet veriyoruz
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <Card key={index} className="glass-dark border-white/5 card-premium animate-fadeInUp" style={{ animationDelay: `${0.1 + index * 0.1}s` }}>
                <CardContent className="p-6 text-center">
                  <div className="text-6xl mb-4">{member.icon}</div>
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-sm text-green-400 font-semibold mb-3">{member.role}</p>
                  <p className="text-sm text-foreground/60">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <Card className="glass-dark border-white/5 max-w-4xl mx-auto animate-fadeInUp">
            <CardContent className="p-12 text-center">
              <Trophy className="h-16 w-16 text-yellow-400 mx-auto mb-6 animate-pulse" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
                Topluluğumuza Katılın!
              </h2>
              <p className="text-foreground/70 text-lg mb-8 max-w-2xl mx-auto">
                Binlerce kullanıcı zaten İddaaSohbet'te kuponlarını paylaşıyor ve kazanıyor. 
                Siz de aramıza katılın!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/kayit">
                  <Button size="lg" className="bg-gradient-to-r from-green-500 to-yellow-400 hover:from-green-600 hover:to-yellow-500 text-black font-bold btn-premium h-14 px-8">
                    Ücretsiz Kayıt Ol
                  </Button>
                </Link>
                <Link href="/kuponlar">
                  <Button size="lg" variant="outline" className="border-white/20 hover:border-green-500/50 hover:bg-green-500/10 hover:text-green-400 h-14 px-8">
                    Kuponları İncele
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
