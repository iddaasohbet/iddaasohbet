'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Heart, Share2, Copy, Check } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function KuponInteractions({ 
  couponId, 
  initialLikeCount 
}: { 
  couponId: string
  initialLikeCount: number
}) {
  const { data: session } = useSession()
  const router = useRouter()
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(initialLikeCount)
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleLike = async () => {
    if (!session) {
      router.push('/giris')
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`/api/kuponlar/${couponId}/like`, {
        method: 'POST',
      })

      const data = await response.json()

      if (response.ok) {
        setIsLiked(data.liked)
        setLikeCount((prev) => (data.liked ? prev + 1 : prev - 1))
      }
    } catch (error) {
      console.error('Beğeni hatası:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleShare = () => {
    const url = `${window.location.origin}/kupon/${couponId}`
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="glass-dark border-white/10 mb-6">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant={isLiked ? 'default' : 'outline'}
              size="lg"
              onClick={handleLike}
              disabled={loading}
              className={
                isLiked
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'border-white/20 hover:border-red-500/50 hover:bg-red-500/10'
              }
            >
              <Heart
                className={`h-5 w-5 mr-2 ${isLiked ? 'fill-current' : ''}`}
              />
              {likeCount} Beğeni
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleShare}
              className="border-white/20 hover:border-green-500/50 hover:bg-green-500/10"
            >
              {copied ? (
                <>
                  <Check className="h-5 w-5 mr-2 text-green-400" />
                  Kopyalandı!
                </>
              ) : (
                <>
                  <Share2 className="h-5 w-5 mr-2" />
                  Paylaş
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
