'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Trophy, Lock, Mail, User, CheckCircle, AlertCircle } from 'lucide-react'

export default function KayitPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    // Şifre kontrolü
    if (formData.password !== formData.confirmPassword) {
      setError('Şifreler eşleşmiyor')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Bir hata oluştu')
        return
      }

      // Başarılı kayıt
      setSuccess(true)
      
      // 2 saniye sonra giriş sayfasına yönlendir
      setTimeout(() => {
        router.push('/giris?registered=true')
      }, 2000)
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
          <CardTitle className="text-2xl font-bold gradient-text">Hesap Oluştur</CardTitle>
          <CardDescription className="text-foreground/60">
            Ücretsiz kayıt ol ve kupon paylaşmaya başla
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Success Message */}
          {success && (
            <div className="mb-4 p-4 rounded-lg glass-dark border border-green-500/50 bg-green-500/10 flex items-start space-x-3 animate-slideUp">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-green-400 font-semibold">Kayıt Başarılı!</p>
                <p className="text-sm text-foreground/70 mt-1">Giriş sayfasına yönlendiriliyorsunuz...</p>
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
              <label htmlFor="name" className="text-sm font-medium text-foreground/80">
                Ad Soyad
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/50" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Ahmet Yılmaz"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="pl-10 glass border-white/10 focus:border-green-500/50 bg-black/20"
                  required
                  disabled={loading}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium text-foreground/80">
                Kullanıcı Adı
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/50" />
                <Input
                  id="username"
                  type="text"
                  placeholder="kullaniciadi"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="pl-10 glass border-white/10 focus:border-green-500/50 bg-black/20"
                  required
                  disabled={loading}
                />
              </div>
            </div>
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
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pl-10 glass border-white/10 focus:border-green-500/50 bg-black/20"
                  required
                  disabled={loading}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-foreground/80">
                Şifre Tekrar
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/50" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="pl-10 glass border-white/10 focus:border-green-500/50 bg-black/20"
                  required
                  disabled={loading}
                />
              </div>
            </div>
            <div className="flex items-start space-x-2 text-sm glass p-3 rounded-lg border border-white/10">
              <input type="checkbox" className="mt-0.5 rounded border-white/20 bg-black/20" required disabled={loading} />
              <span className="text-foreground/70">
                <Link href="/kullanim-kosullari" className="text-green-400 hover:text-yellow-400 transition-colors font-medium">
                  Kullanım koşullarını
                </Link>
                {' '}ve{' '}
                <Link href="/gizlilik" className="text-green-400 hover:text-yellow-400 transition-colors font-medium">
                  gizlilik politikasını
                </Link>
                {' '}kabul ediyorum
              </span>
            </div>
            <Button 
              type="submit" 
              className="w-full h-12 text-base bg-gradient-to-r from-green-500 to-yellow-400 hover:from-green-600 hover:to-yellow-500 text-black font-bold btn-premium"
              size="lg"
              disabled={loading}
            >
              {loading ? 'Kayıt yapılıyor...' : 'Kayıt Ol'}
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
            Zaten hesabın var mı?{' '}
            <Link href="/giris" className="text-green-400 font-semibold hover:text-yellow-400 transition-colors">
              Giriş Yap
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}