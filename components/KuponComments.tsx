'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MessageCircle, Send } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type Comment = {
  id: string
  content: string
  createdAt: string
  user: {
    id: string
    name: string
    username: string
    avatar: string | null
  }
}

export default function KuponComments({ couponId }: { couponId: string }) {
  const { data: session } = useSession()
  const router = useRouter()
  const [comments, setComments] = useState<Comment[]>([])
  const [commentText, setCommentText] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchComments()
  }, [couponId])

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/kuponlar/${couponId}/comments`)
      const data = await response.json()

      if (response.ok) {
        setComments(data)
      }
    } catch (error) {
      console.error('Yorumlar yüklenirken hata:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!session) {
      router.push('/giris')
      return
    }

    if (!commentText.trim()) return

    setSubmitting(true)
    try {
      const response = await fetch(`/api/kuponlar/${couponId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: commentText }),
      })

      const data = await response.json()

      if (response.ok) {
        setComments([data, ...comments])
        setCommentText('')
      }
    } catch (error) {
      console.error('Yorum eklenirken hata:', error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Card className="glass-dark border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center">
          <MessageCircle className="h-5 w-5 mr-2 text-green-400" />
          Yorumlar ({comments.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Comment Form */}
        {session ? (
          <form onSubmit={handleSubmitComment} className="flex space-x-3">
            <Avatar className="h-10 w-10 border-2 border-green-500/50">
              <AvatarImage src={session.user?.image || ''} alt={session.user?.name || ''} />
              <AvatarFallback className="bg-gradient-to-br from-green-500 to-yellow-400 text-black font-bold">
                {session.user?.name?.charAt(0).toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 flex space-x-2">
              <Input
                type="text"
                placeholder="Yorum yaz..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="glass border-white/10 focus:border-green-500/50 bg-black/20"
                disabled={submitting}
              />
              <Button
                type="submit"
                disabled={!commentText.trim() || submitting}
                className="bg-gradient-to-r from-green-500 to-yellow-400 hover:from-green-600 hover:to-yellow-500 text-black font-semibold"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        ) : (
          <div className="glass p-4 rounded-lg border border-white/10 text-center">
            <p className="text-foreground/60 mb-3">Yorum yapmak için giriş yapmalısınız</p>
            <Link href="/giris">
              <Button className="bg-gradient-to-r from-green-500 to-yellow-400 hover:from-green-600 hover:to-yellow-500 text-black font-semibold">
                Giriş Yap
              </Button>
            </Link>
          </div>
        )}

        {/* Comments List */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="glass p-4 rounded-lg animate-pulse">
                <div className="flex items-start space-x-3">
                  <div className="h-10 w-10 rounded-full bg-white/10"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-white/10 rounded w-1/4"></div>
                    <div className="h-4 bg-white/10 rounded w-3/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : comments.length > 0 ? (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="glass p-4 rounded-lg border border-white/10">
                <div className="flex items-start space-x-3">
                  <Link href={`/profil/${comment.user.username}`}>
                    <Avatar className="h-10 w-10 border-2 border-green-500/50 hover:opacity-80 transition-opacity">
                      <AvatarImage src={comment.user.avatar || ''} alt={comment.user.name} />
                      <AvatarFallback className="bg-gradient-to-br from-green-500 to-yellow-400 text-black font-bold">
                        {comment.user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <Link href={`/profil/${comment.user.username}`}>
                        <p className="font-semibold hover:text-green-400 transition-colors">
                          {comment.user.name}
                        </p>
                      </Link>
                      <span className="text-xs text-foreground/60">
                        {new Date(comment.createdAt).toLocaleDateString('tr-TR')}
                      </span>
                    </div>
                    <p className="text-foreground/80">{comment.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <MessageCircle className="h-12 w-12 text-foreground/30 mx-auto mb-3" />
            <p className="text-foreground/60">Henüz yorum yapılmamış</p>
            <p className="text-sm text-foreground/40">İlk yorumu sen yap!</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
