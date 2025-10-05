import { notFound } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Award, 
  Calendar, 
  Trophy, 
  Target, 
  TrendingUp,
  Heart,
  MessageCircle,
  UserPlus,
  Settings,
  Crown
} from 'lucide-react'
import CouponCard from '@/components/CouponCard'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

interface Props {
  params: {
    username: string
  }
}

// Next.js 15 için dynamic route configuration
export const dynamic = 'force-dynamic'
export const dynamicParams = true

async function getUserProfile(username: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { username },
      include: {
        coupons: {
          include: {
            author: {
              select: {
                username: true,
                name: true,
                avatar: true,
                verified: true
              }
            },
            matches: true,
            _count: {
              select: {
                likes: true,
                comments: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        },
        likes: {
          include: {
            coupon: {
              include: {
                author: {
                  select: {
                    username: true,
                    name: true,
                    avatar: true,
                    verified: true
                  }
                },
                matches: true,
                _count: {
                  select: {
                    likes: true,
                    comments: true
                  }
                }
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        },
        comments: {
          include: {
            coupon: {
              include: {
                author: {
                  select: {
                    username: true,
                    name: true,
                    avatar: true,
                    verified: true
                  }
                }
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        },
        _count: {
          select: {
            coupons: true,
            followers: true,
            following: true,
            likes: true,
            comments: true
          }
        }
      }
    })

    return user
  } catch (error) {
    console.error('Profile fetch error:', error)
    return null
  }
}

export default async function ProfilPage({ params }: Props) {
  const { username } = await params
  const session = await auth()
  const user = await getUserProfile(username)

  if (!user) {
    notFound()
  }

  // İstatistikleri hesapla
  const wonCoupons = user.coupons.filter(c => c.status === 'WON').length
  const lostCoupons = user.coupons.filter(c => c.status === 'LOST').length
  const totalCoupons = user._count.coupons
  const winRate = totalCoupons > 0 
    ? Math.round((wonCoupons / totalCoupons) * 100) 
    : 0
  const totalProfit = wonCoupons * 1500 // Placeholder

  const isOwnProfile = session?.user?.id === user.id

  return (
    <div className="min-h-screen py-8 relative">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse-slow"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Profile Header */}
        <Card className="glass-dark border-white/5 mb-8 animate-fadeInUp">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* Avatar */}
              <Avatar className="h-32 w-32 ring-4 ring-green-500/50">
                <AvatarImage src={user.avatar || ''} alt={user.name || ''} />
                <AvatarFallback className="bg-gradient-to-br from-green-500 to-yellow-400 text-black text-4xl font-bold">
                  {user.username.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl font-bold gradient-text">{user.name}</h1>
                  {user.verified && (
                    <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
                      <Award className="h-3 w-3 mr-1" />
                      Tahminçi
                    </Badge>
                  )}
                </div>
                <p className="text-foreground/60 mb-4">@{user.username}</p>
                
                {user.bio && (
                  <p className="text-foreground/80 mb-4 max-w-2xl">{user.bio}</p>
                )}

                <div className="flex items-center space-x-6 text-sm mb-4">
                  <div>
                    <span className="font-bold text-foreground">{user._count.coupons}</span>
                    <span className="text-foreground/60 ml-1">Kupon</span>
                  </div>
                  <div>
                    <span className="font-bold text-foreground">{user._count.followers}</span>
                    <span className="text-foreground/60 ml-1">Takipçi</span>
                  </div>
                  <div>
                    <span className="font-bold text-foreground">{user._count.following}</span>
                    <span className="text-foreground/60 ml-1">Takip</span>
                  </div>
                  <div className="flex items-center space-x-1 text-foreground/60">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(user.createdAt).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long' })} tarihinde katıldı</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3">
                  {isOwnProfile ? (
                    <>
                      <Button asChild className="bg-gradient-to-r from-green-500 to-yellow-400 hover:from-green-600 hover:to-yellow-500 text-black font-semibold">
                        <a href="/hesap/ayarlar">
                          <Settings className="h-4 w-4 mr-2" />
                          Profili Düzenle
                        </a>
                      </Button>
                      {!user.verified && (
                        <Button asChild variant="outline" className="border-yellow-400/50 text-yellow-400 hover:bg-yellow-400/10">
                          <a href="/tahminçi-basvuru">
                            <Crown className="h-4 w-4 mr-2" />
                            Tahminçi Başvurusu Yap
                          </a>
                        </Button>
                      )}
                    </>
                  ) : (
                    <Button className="bg-gradient-to-r from-green-500 to-yellow-400 hover:from-green-600 hover:to-yellow-500 text-black font-semibold">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Takip Et
                    </Button>
                  )}
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="glass border-white/5">
                  <CardContent className="p-4 text-center">
                    <Trophy className="h-6 w-6 text-green-400 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-green-400">{winRate}%</p>
                    <p className="text-xs text-foreground/60">Başarı</p>
                  </CardContent>
                </Card>
                <Card className="glass border-white/5">
                  <CardContent className="p-4 text-center">
                    <Target className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
                    <p className="text-2xl font-bold gradient-text">{wonCoupons}/{totalCoupons}</p>
                    <p className="text-xs text-foreground/60">Kazanan</p>
                  </CardContent>
                </Card>
                <Card className="glass border-white/5">
                  <CardContent className="p-4 text-center">
                    <TrendingUp className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-yellow-400">₺{(totalProfit / 1000).toFixed(1)}K</p>
                    <p className="text-xs text-foreground/60">Kar</p>
                  </CardContent>
                </Card>
                <Card className="glass border-white/5">
                  <CardContent className="p-4 text-center">
                    <Heart className="h-6 w-6 text-red-400 mx-auto mb-2" />
                    <p className="text-2xl font-bold gradient-text">{user._count.likes}</p>
                    <p className="text-xs text-foreground/60">Beğeni</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="coupons" className="animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          <TabsList className="glass-dark border border-white/10 p-1">
            <TabsTrigger value="coupons" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-yellow-400 data-[state=active]:text-black">
              <Trophy className="h-4 w-4 mr-2" />
              Kuponlarım ({user._count.coupons})
            </TabsTrigger>
            <TabsTrigger value="likes" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-yellow-400 data-[state=active]:text-black">
              <Heart className="h-4 w-4 mr-2" />
              Beğendiklerim ({user._count.likes})
            </TabsTrigger>
            <TabsTrigger value="comments" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-yellow-400 data-[state=active]:text-black">
              <MessageCircle className="h-4 w-4 mr-2" />
              Yorumlarım ({user._count.comments})
            </TabsTrigger>
          </TabsList>

          {/* Kuponlarım */}
          <TabsContent value="coupons" className="mt-6">
            {user.coupons.length === 0 ? (
              <Card className="glass-dark border-white/5">
                <CardContent className="p-12 text-center">
                  <Trophy className="h-16 w-16 mx-auto text-foreground/30 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Henüz Kupon Paylaşılmamış</h3>
                  <p className="text-foreground/60">
                    {isOwnProfile ? 'İlk kuponunu paylaşmak için kupon oluştur!' : 'Bu kullanıcı henüz kupon paylaşmamış.'}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {user.coupons.map((coupon) => (
                  <CouponCard key={coupon.id} coupon={coupon} />
                ))}
              </div>
            )}
          </TabsContent>

          {/* Beğendiklerim */}
          <TabsContent value="likes" className="mt-6">
            {user.likes.length === 0 ? (
              <Card className="glass-dark border-white/5">
                <CardContent className="p-12 text-center">
                  <Heart className="h-16 w-16 mx-auto text-foreground/30 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Henüz Beğenilen Kupon Yok</h3>
                  <p className="text-foreground/60">
                    {isOwnProfile ? 'Beğendiğin kuponlar burada görünecek.' : 'Bu kullanıcı henüz kupon beğenmemiş.'}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {user.likes.map((like) => (
                  <CouponCard key={like.couponId} coupon={like.coupon} />
                ))}
              </div>
            )}
          </TabsContent>

          {/* Yorumlarım */}
          <TabsContent value="comments" className="mt-6">
            {user.comments.length === 0 ? (
              <Card className="glass-dark border-white/5">
                <CardContent className="p-12 text-center">
                  <MessageCircle className="h-16 w-16 mx-auto text-foreground/30 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Henüz Yorum Yapılmamış</h3>
                  <p className="text-foreground/60">
                    {isOwnProfile ? 'Yaptığın yorumlar burada görünecek.' : 'Bu kullanıcı henüz yorum yapmamış.'}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {user.comments.map((comment) => (
                  <Card key={comment.id} className="glass-dark border-white/5 card-premium">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="text-sm text-foreground/60 mb-1">
                            <span className="font-semibold text-green-400">@{comment.coupon.author.username}</span> kullanıcısının kuponuna yorum:
                          </p>
                          <p className="text-sm text-foreground/50">
                            {new Date(comment.createdAt).toLocaleDateString('tr-TR', { 
                              day: 'numeric', 
                              month: 'long', 
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                        <Button variant="outline" size="sm" className="border-white/10" asChild>
                          <a href={`/kupon/${comment.couponId}`}>Kupona Git</a>
                        </Button>
                      </div>
                      <p className="text-foreground">{comment.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
