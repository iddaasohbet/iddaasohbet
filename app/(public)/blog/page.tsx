'use client'

import { Card } from '@/components/ui/card'

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-6">Blog</h1>
      <Card className="glass-dark border-white/10 p-6">
        <p className="text-foreground/70">Yakında burada iddaa analizi, ipuçları ve duyurular paylaşılacak.</p>
      </Card>
    </div>
  )
}

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  BookOpen,
  Calendar,
  Clock,
  User,
  TrendingUp,
  MessageCircle,
  Eye,
  Search,
  ArrowRight,
  Flame,
  Star,
  Target
} from 'lucide-react'
import Link from 'next/link'

const blogPosts = [
  {
    id: '1',
    title: 'İddaa\'da Başarılı Olmanın 10 Altın Kuralı',
    excerpt: 'Profesyonel bahisçilerin kullandığı stratejiler ve başarı için bilmeniz gereken temel kurallar.',
    category: 'Stratejiler',
    author: 'Ahmet Yılmaz',
    date: '2025-01-10',
    readTime: '8 dakika',
    views: 2450,
    comments: 34,
    image: '📊',
    featured: true
  },
  {
    id: '2',
    title: 'Alt-Üst Bahislerinde Kazanç Stratejileri',
    excerpt: 'Alt üst bahislerinde başarı oranınızı artıracak analiz yöntemleri ve ipuçları.',
    category: 'Taktikler',
    author: 'Mehmet Kaya',
    date: '2025-01-08',
    readTime: '6 dakika',
    views: 1890,
    comments: 28,
    image: '⚽',
    featured: true
  },
  {
    id: '3',
    title: 'Bankroll Yönetimi: Para Yönetiminin Önemi',
    excerpt: 'Uzun vadede başarılı olmak için bütçenizi nasıl yönetmelisiniz? Detaylı rehber.',
    category: 'Yönetim',
    author: 'Can Öztürk',
    date: '2025-01-05',
    readTime: '10 dakika',
    views: 3200,
    comments: 45,
    image: '💰',
    featured: true
  },
  {
    id: '4',
    title: 'Premier League Analizi: 2025 Sezonu',
    excerpt: 'İngiltere Premier Lig\'inde dikkat çekici istatistikler ve takım analizleri.',
    category: 'Analizler',
    author: 'Ali Demir',
    date: '2025-01-03',
    readTime: '12 dakika',
    views: 1560,
    comments: 22,
    image: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    featured: false
  },
  {
    id: '5',
    title: 'Kombine Kuponlarda Dikkat Edilmesi Gerekenler',
    excerpt: 'Yüksek oranlı kombine kuponlar hazırlarken nelere dikkat etmelisiniz?',
    category: 'Taktikler',
    author: 'Emre Şahin',
    date: '2025-01-01',
    readTime: '7 dakika',
    views: 2100,
    comments: 31,
    image: '🎯',
    featured: false
  },
  {
    id: '6',
    title: 'Canlı Bahis Stratejileri ve İpuçları',
    excerpt: 'Maç sırasında canlı bahis yaparken kullanabileceğiniz etkili stratejiler.',
    category: 'Stratejiler',
    author: 'Burak Yıldız',
    date: '2024-12-28',
    readTime: '9 dakika',
    views: 1750,
    comments: 19,
    image: '⚡',
    featured: false
  },
  {
    id: '7',
    title: 'Basketbol Bahislerinde Handikapı Anlama',
    excerpt: 'Basketbol bahislerinde handikap nedir ve nasıl değerlendirilir? Detaylı açıklama.',
    category: 'Eğitim',
    author: 'Serkan Aydın',
    date: '2024-12-25',
    readTime: '5 dakika',
    views: 980,
    comments: 12,
    image: '🏀',
    featured: false
  },
  {
    id: '8',
    title: 'Süper Lig Takımlarının Form Analizi',
    excerpt: 'Türkiye Süper Ligi\'nde takımların son 5 maç performansları ve trend analizleri.',
    category: 'Analizler',
    author: 'Murat Çelik',
    date: '2024-12-22',
    readTime: '11 dakika',
    views: 2890,
    comments: 38,
    image: '🇹🇷',
    featured: false
  }
]

const categories = [
  { name: 'Tümü', count: 8, icon: BookOpen },
  { name: 'Stratejiler', count: 2, icon: Target },
  { name: 'Taktikler', count: 2, icon: TrendingUp },
  { name: 'Analizler', count: 2, icon: Star },
  { name: 'Yönetim', count: 1, icon: Flame },
  { name: 'Eğitim', count: 1, icon: BookOpen }
]

export default function BlogPage() {
  const featuredPosts = blogPosts.filter(post => post.featured)
  const regularPosts = blogPosts.filter(post => !post.featured)

  return (
    <div className="min-h-screen py-12 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-fadeInUp">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <BookOpen className="h-10 w-10 text-purple-400 animate-pulse" />
            <h1 className="text-4xl md:text-5xl font-bold gradient-text">Blog & İçerikler</h1>
          </div>
          <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
            İddaa stratejileri, analizler ve ipuçları ile başarınızı artırın
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/50" />
            <Input
              type="text"
              placeholder="Makale ara..."
              className="pl-12 glass border-white/10 focus:border-purple-500/50 bg-black/20 h-14 text-base"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          {categories.map((category, index) => (
            <Button
              key={index}
              variant="outline"
              className="glass border-white/10 hover:border-purple-500/30 hover:bg-purple-500/10 hover:text-purple-400"
            >
              <category.icon className="h-4 w-4 mr-2" />
              {category.name}
              <Badge className="ml-2 bg-white/10 border-0 text-xs">{category.count}</Badge>
            </Button>
          ))}
        </div>

        {/* Featured Posts */}
        <div className="mb-16">
          <div className="flex items-center space-x-3 mb-6 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            <Flame className="h-6 w-6 text-orange-500 animate-pulse" />
            <h2 className="text-2xl font-bold">Öne Çıkan Yazılar</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredPosts.map((post, index) => (
              <Card key={post.id} className="glass-dark border-white/5 card-premium group animate-fadeInUp" style={{ animationDelay: `${0.4 + index * 0.1}s` }}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-4">
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
                      <Flame className="h-3 w-3 mr-1" />
                      Öne Çıkan
                    </Badge>
                    <span className="text-4xl">{post.image}</span>
                  </div>
                  <h3 className="text-xl font-bold leading-tight group-hover:text-green-400 transition-colors">
                    {post.title}
                  </h3>
                </CardHeader>
                <CardContent className="pb-3">
                  <p className="text-sm text-foreground/70 line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                  <Badge variant="outline" className="glass border-purple-500/30 text-purple-400 text-xs">
                    {post.category}
                  </Badge>
                </CardContent>
                <CardFooter className="pt-3 border-t border-white/5">
                  <div className="flex items-center justify-between w-full text-xs text-foreground/60">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <Eye className="h-3 w-3" />
                        <span>{post.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="h-3 w-3" />
                        <span>{post.comments}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Regular Posts */}
        <div>
          <div className="flex items-center space-x-3 mb-6 animate-fadeInUp">
            <BookOpen className="h-6 w-6 text-blue-400" />
            <h2 className="text-2xl font-bold">Son Yazılar</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {regularPosts.map((post, index) => (
              <Link key={post.id} href={`/blog/${post.id}`}>
                <Card className="glass-dark border-white/5 card-premium group cursor-pointer animate-fadeInUp" style={{ animationDelay: `${0.1 + index * 0.05}s` }}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="text-5xl flex-shrink-0">{post.image}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="outline" className="glass border-blue-500/30 text-blue-400 text-xs">
                            {post.category}
                          </Badge>
                          <span className="text-xs text-foreground/50">•</span>
                          <div className="flex items-center space-x-1 text-xs text-foreground/50">
                            <Calendar className="h-3 w-3" />
                            <span>{new Date(post.date).toLocaleDateString('tr-TR')}</span>
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-bold mb-2 group-hover:text-green-400 transition-colors leading-tight">
                          {post.title}
                        </h3>
                        
                        <p className="text-sm text-foreground/70 line-clamp-2 mb-3">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between text-xs text-foreground/60">
                          <div className="flex items-center space-x-1">
                            <User className="h-3 w-3" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-1">
                              <Eye className="h-3 w-3" />
                              <span>{post.views}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>{post.readTime}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Load More */}
        <div className="text-center mt-12 animate-fadeInUp">
          <Button size="lg" className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold btn-premium px-12">
            Daha Fazla Yükle
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Newsletter CTA */}
        <Card className="glass-dark border-white/5 mt-16 animate-fadeInUp">
          <CardContent className="p-12 text-center">
            <div className="max-w-2xl mx-auto">
              <BookOpen className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-3 gradient-text">Yeni İçeriklerden Haberdar Olun</h3>
              <p className="text-foreground/70 mb-6">
                E-posta listemize katılın ve yeni blog yazıları hakkında bildirim alın
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="E-posta adresiniz"
                  className="glass border-white/10 focus:border-purple-500/50 bg-black/20 h-12 flex-1"
                />
                <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold btn-premium h-12 px-8">
                  Abone Ol
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
