import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { 
  Calendar,
  Clock,
  User,
  Eye,
  MessageCircle,
  Share2,
  Twitter,
  Facebook,
  Linkedin,
  Link as LinkIcon,
  ArrowLeft,
  ThumbsUp,
  Bookmark,
  TrendingUp
} from 'lucide-react'
import Link from 'next/link'

// Demo blog post data
const blogPost = {
  id: '1',
  title: 'İddaa\'da Başarılı Olmanın 10 Altın Kuralı',
  excerpt: 'Profesyonel bahisçilerin kullandığı stratejiler ve başarı için bilmeniz gereken temel kurallar.',
  category: 'Stratejiler',
  author: {
    name: 'Ahmet Yılmaz',
    role: 'Profesyonel Analist',
    avatar: null,
    bio: '10 yıllık tecrübeli iddaa analisti ve strateji uzmanı'
  },
  date: '2025-01-10',
  readTime: '8 dakika',
  views: 2450,
  comments: 34,
  likes: 156,
  image: '📊',
  content: `
# Giriş

İddaa dünyasında uzun vadeli başarı elde etmek, şans faktörünün yanı sıra doğru stratejileri uygulamayı gerektirir. Bu yazıda, profesyonel bahisçilerin kullandığı ve kanıtlanmış 10 altın kuralı sizlerle paylaşacağım.

## 1. Bankroll Yönetimi

**En önemli kural budur.** Bütçenizi doğru yönetmezseniz, ne kadar iyi tahmin yaparsanız yapın, uzun vadede başarısız olursunuz.

- Asla toplam bütçenizin %5'inden fazlasını tek kuponda riske atmayın
- Her ay için sabit bir bütçe belirleyin
- Kaybettiklerinizi telafi etmek için yüksek riskli kuponlar oynamayın

## 2. İstatistik ve Analiz

Duygusal kararlar yerine veriye dayalı kararlar alın:

- Takımların son 5 maç performanslarını inceleyin
- Ev sahibi / Deplasman istatistiklerine bakın
- Sakatlık ve ceza durumlarını kontrol edin
- Hava durumu gibi dış faktörleri göz önünde bulundurun

## 3. Değer Bahisleri Bulun

**Değer bahsi nedir?** Gerçek olasılığın, bahis oranının önerdiğinden daha yüksek olduğu durumlardır.

Örnek: Bir takımın kazanma olasılığı %60 ise, oran en az 1.67 olmalıdır. Eğer oran 2.00 ise, bu bir değer bahsidir.

## 4. Uzmanlaşın

Tüm sporları ve ligleri takip etmeye çalışmayın. Birkaç lige odaklanın:

- Premier League ve La Liga gibi 2-3 büyük lige odaklanın
- Bu liglerdeki takımları yakından takip edin
- Uzmanlaştığınız alanda daha başarılı olursunuz

## 5. Duygusal Olmayın

- Favori takımınıza sadece taraftarlık duygularınızla bahis oynamayın
- Kaybettikten sonra intikam almak için hemen yeni bahis yapmayın
- Kazandıktan sonra aşırı özgüvenle hareket etmeyin

## 6. Canlı Bahis Stratejisi

Canlı bahisler büyük fırsatlar sunabilir:

- Maçın ilk 15 dakikasını izleyin
- Momentum değişimlerini yakalayın
- Oranların nasıl hareket ettiğini gözlemleyin

## 7. Kombinasyonları Akıllıca Kullanın

- 2-3 maçlık küçük kombineler tercih edin
- Çok yüksek oranlı (100+) kuponlardan kaçının
- Banker + risk mantığıyla ilerleyin

## 8. Kayıt Tutun

Tüm bahislerinizi kaydedin:

- Hangi tür bahislerde başarılısınız?
- Hangi liglerde daha iyi sonuç alıyorsunuz?
- Ortalama kazancınız ve kaybınız nedir?

## 9. Şeffaflık ve Dürüstlük

- Kazandıklarınızı olduğu gibi paylaşın
- Kaybettiklerinizi gizlemeyin
- Gerçekçi beklentiler oluşturun

## 10. Sürekli Öğrenin

İddaa dinamik bir alandır:

- Yeni stratejileri öğrenin
- Diğer başarılı tahmincierleri takip edin
- İstatistik araçlarını kullanmayı öğrenin
- Maç analizlerini geliştirin

## Sonuç

Bu 10 altın kurala uyarak, iddaada uzun vadeli başarı şansınızı önemli ölçüde artırabilirsiniz. Unutmayın, başarı bir gecede gelmez. Sabırlı olun, disiplinli çalışın ve sürekli kendinizi geliştirin.

**Önemli Uyarı:** Kumar bağımlılığı ciddi bir sorundur. Sadece kaybetmeyi göze alabileceğiniz parayla bahis yapın. 18 yaş altı kişiler bahis oynayamaz.

---

*Bu yazı sadece bilgilendirme amaçlıdır. Bahis kararlarınız tamamen size aittir.*
  `
}

const relatedPosts = [
  {
    id: '2',
    title: 'Alt-Üst Bahislerinde Kazanç Stratejileri',
    category: 'Taktikler',
    image: '⚽'
  },
  {
    id: '3',
    title: 'Bankroll Yönetimi: Para Yönetiminin Önemi',
    category: 'Yönetim',
    image: '💰'
  },
  {
    id: '6',
    title: 'Canlı Bahis Stratejileri ve İpuçları',
    category: 'Stratejiler',
    image: '⚡'
  }
]

export default function BlogDetailPage() {
  return (
    <div className="min-h-screen py-12 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern"></div>
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse-slow"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Back Button */}
        <Link href="/blog">
          <Button variant="ghost" className="mb-8 hover:bg-white/5 hover:text-green-400 animate-fadeInUp">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Bloga Dön
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Article Header */}
            <Card className="glass-dark border-white/5 card-premium animate-fadeInUp">
              <CardContent className="p-8">
                <div className="flex items-center space-x-3 mb-4">
                  <Badge variant="outline" className="glass border-green-500/30 text-green-400">
                    {blogPost.category}
                  </Badge>
                  <span className="text-6xl">{blogPost.image}</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight gradient-text">
                  {blogPost.title}
                </h1>

                <p className="text-xl text-foreground/70 mb-6 leading-relaxed">
                  {blogPost.excerpt}
                </p>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-foreground/60 mb-6 pb-6 border-b border-white/5">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-green-400" />
                    <span>{blogPost.author.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-blue-400" />
                    <span>{new Date(blogPost.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-yellow-400" />
                    <span>{blogPost.readTime}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Eye className="h-4 w-4 text-purple-400" />
                    <span>{blogPost.views} görüntüleme</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3">
                  <Button className="bg-gradient-to-r from-green-500 to-blue-400 hover:from-green-600 hover:to-blue-500 text-black font-bold btn-premium">
                    <ThumbsUp className="mr-2 h-4 w-4" />
                    Beğen ({blogPost.likes})
                  </Button>
                  <Button variant="outline" className="border-white/10 hover:border-yellow-500/50 hover:bg-yellow-500/10 hover:text-yellow-400">
                    <Bookmark className="mr-2 h-4 w-4" />
                    Kaydet
                  </Button>
                  <Button variant="outline" className="border-white/10 hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-blue-400">
                    <Share2 className="mr-2 h-4 w-4" />
                    Paylaş
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Article Content */}
            <Card className="glass-dark border-white/5 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
              <CardContent className="p-8 prose prose-invert prose-green max-w-none">
                <div className="text-foreground/80 leading-relaxed space-y-6" style={{ fontSize: '17px', lineHeight: '1.8' }}>
                  {blogPost.content.split('\n\n').map((paragraph, index) => {
                    if (paragraph.startsWith('# ')) {
                      return <h1 key={index} className="text-3xl font-bold text-foreground mb-4 mt-8">{paragraph.replace('# ', '')}</h1>
                    }
                    if (paragraph.startsWith('## ')) {
                      return <h2 key={index} className="text-2xl font-bold text-green-400 mb-3 mt-6">{paragraph.replace('## ', '')}</h2>
                    }
                    if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                      return <p key={index} className="font-bold text-foreground my-4">{paragraph.replace(/\*\*/g, '')}</p>
                    }
                    if (paragraph.startsWith('- ')) {
                      const items = paragraph.split('\n').filter(line => line.startsWith('- '))
                      return (
                        <ul key={index} className="list-disc list-inside space-y-2 my-4 ml-4">
                          {items.map((item, i) => (
                            <li key={i} className="text-foreground/80">{item.replace('- ', '')}</li>
                          ))}
                        </ul>
                      )
                    }
                    if (paragraph.startsWith('---')) {
                      return <hr key={index} className="border-white/10 my-8" />
                    }
                    if (paragraph.startsWith('*') && paragraph.endsWith('*')) {
                      return <p key={index} className="text-sm text-foreground/60 italic my-4">{paragraph.replace(/\*/g, '')}</p>
                    }
                    return <p key={index} className="my-4">{paragraph}</p>
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Comments Section */}
            <Card className="glass-dark border-white/5 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="h-5 w-5 text-blue-400" />
                  <span>Yorumlar ({blogPost.comments})</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="glass-dark p-8 rounded-xl border border-white/5 text-center">
                  <MessageCircle className="h-12 w-12 text-foreground/30 mx-auto mb-4" />
                  <p className="text-foreground/60">Yorum bölümü yakında aktif olacak</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Author Card */}
            <Card className="glass-dark border-white/5 card-premium animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
              <CardContent className="p-6">
                <div className="text-center">
                  <Avatar className="h-20 w-20 mx-auto mb-4 ring-2 ring-green-500/20">
                    <AvatarFallback className="bg-gradient-to-br from-green-500 to-blue-400 text-white text-2xl font-bold">
                      {blogPost.author.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-bold mb-1">{blogPost.author.name}</h3>
                  <p className="text-sm text-green-400 mb-3">{blogPost.author.role}</p>
                  <p className="text-sm text-foreground/60 mb-4">{blogPost.author.bio}</p>
                  <Button className="w-full bg-gradient-to-r from-green-500 to-blue-400 hover:from-green-600 hover:to-blue-500 text-black font-bold btn-premium">
                    Takip Et
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Share Card */}
            <Card className="glass-dark border-white/5 card-premium animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              <CardHeader>
                <CardTitle className="text-lg">Paylaş</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="border-white/10 hover:border-blue-400/50 hover:bg-blue-400/10 hover:text-blue-400">
                    <Twitter className="h-4 w-4 mr-2" />
                    Twitter
                  </Button>
                  <Button variant="outline" className="border-white/10 hover:border-blue-600/50 hover:bg-blue-600/10 hover:text-blue-400">
                    <Facebook className="h-4 w-4 mr-2" />
                    Facebook
                  </Button>
                  <Button variant="outline" className="border-white/10 hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-blue-400">
                    <Linkedin className="h-4 w-4 mr-2" />
                    LinkedIn
                  </Button>
                  <Button variant="outline" className="border-white/10 hover:border-green-500/50 hover:bg-green-500/10 hover:text-green-400">
                    <LinkIcon className="h-4 w-4 mr-2" />
                    Kopyala
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Related Posts */}
            <Card className="glass-dark border-white/5 card-premium animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <TrendingUp className="h-5 w-5 text-orange-500" />
                  <span>İlgili Yazılar</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {relatedPosts.map((post) => (
                    <Link key={post.id} href={`/blog/${post.id}`}>
                      <div className="glass-dark p-4 rounded-lg border border-white/5 hover:border-green-500/30 transition-all cursor-pointer group">
                        <div className="flex items-start space-x-3">
                          <span className="text-3xl flex-shrink-0">{post.image}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold group-hover:text-green-400 transition-colors line-clamp-2 mb-1">
                              {post.title}
                            </p>
                            <Badge variant="outline" className="glass border-blue-500/30 text-blue-400 text-xs">
                              {post.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
