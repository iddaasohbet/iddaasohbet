'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Trophy, Lock, Mail, CheckCircle, AlertCircle } from 'lucide-react'

export default function GirisPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showRegisteredMessage, setShowRegisteredMessage] = useState(false)

  useEffect(() => {
    // Kayıt başarılı mesajını göster
    if (searchParams.get('registered') === 'true') {
      setShowRegisteredMessage(true)
      // 5 saniye sonra gizle
      setTimeout(() => setShowRegisteredMessage(false), 5000)
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('E-posta veya şifre hatalı')
        return
      }

      // Başarılı giriş - anasayfaya yönlendir
      router.push('/')
      router.refresh()
    } catch (err) {
      setError('Bir hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-12 px-4">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-pattern"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>

      <Card className="w-full max-w-md glass-dark border-white/10 relative z-10">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-6">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <Trophy className="h-12 w-12 text-green-500 group-hover:text-yellow-400 transition-all duration-300" />
                <div className="absolute inset-0 bg-green-500 blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
              </div>
              <div className="text-left">
                <span className="text-3xl font-bold gradient-text neon-text-green block">İddaa</span>
                <span className="text-3xl font-bold text-yellow-400 neon-text-yellow block">Sohbet</span>
              </div>
            </Link>
          </div>
          <CardTitle className="text-2xl font-bold gradient-text">Hoş Geldin!</CardTitle>
          <CardDescription className="text-foreground/60">
            Hesabına giriş yap ve kupon paylaşmaya başla
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Kayıt Başarılı Mesajı */}
          {showRegisteredMessage && (
            <div className="mb-4 p-4 rounded-lg glass-dark border border-green-500/50 bg-green-500/10 flex items-start space-x-3 animate-slideUp">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-green-400 font-semibold">Kayıt Başarılı!</p>
                <p className="text-sm text-foreground/70 mt-1">Şimdi giriş yapabilirsiniz.</p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 rounded-lg glass-dark border border-red-500/50 bg-red-500/10 flex items-start space-x-3 animate-shake">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-400 font-semibold">Hata!</p>
                <p className="text-sm text-foreground/70 mt-1">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground/80">
                E-posta
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/50" />
                <Input
                  id="email"
                  type="email"
                  placeholder="ornek@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 glass border-white/10 focus:border-green-500/50 bg-black/20"
                  required
                  disabled={loading}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-foreground/80">
                Şifre
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/50" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 glass border-white/10 focus:border-green-500/50 bg-black/20"
                  required
                  disabled={loading}
                />
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 text-foreground/70 hover:text-foreground cursor-pointer">
                <input type="checkbox" className="rounded border-white/20 bg-black/20" disabled={loading} />
                <span>Beni hatırla</span>
              </label>
              <Link href="/sifremi-unuttum" className="text-green-400 hover:text-yellow-400 transition-colors font-medium">
                Şifremi unuttum
              </Link>
            </div>
            <Button 
              type="submit" 
              className="w-full h-12 text-base bg-gradient-to-r from-green-500 to-yellow-400 hover:from-green-600 hover:to-yellow-500 text-black font-bold btn-premium"
              size="lg"
              disabled={loading}
            >
              {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex-col space-y-4">
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-foreground/60">veya</span>
            </div>
          </div>
          <p className="text-sm text-center w-full text-foreground/70">
            Hesabın yok mu?{' '}
            <Link href="/kayit" className="text-green-400 font-semibold hover:text-yellow-400 transition-colors">
              Kayıt Ol
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}