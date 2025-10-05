'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Shield, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff,
  KeyRound,
  AlertCircle,
  CheckCircle2,
  Loader2
} from 'lucide-react'
import Link from 'next/link'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
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
        setError('E-posta veya şifre hatalı veya admin yetkiniz yok!')
        return
      }

      // Başarılı - dashboard'a yönlendir
      router.push('/admin/dashboard')
      router.refresh()
    } catch (err) {
      setError('Bir hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 grid-pattern opacity-30"></div>
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-500/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

      <div className="w-full max-w-md relative z-10 animate-fadeInUp">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center space-x-3 mb-4">
            <div className="relative">
              <Shield className="h-12 w-12 text-red-500 animate-pulse" />
              <div className="absolute inset-0 blur-xl bg-red-500/50 animate-pulse"></div>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Admin Panel
            </span>
          </h1>
          <p className="text-foreground/60 text-sm">
            Güvenli yönetim sistemi
          </p>
          <Badge className="mt-3 glass border-red-500/30 text-red-400">
            <KeyRound className="h-3 w-3 mr-1" />
            Yetkili Giriş
          </Badge>
        </div>

        {/* Login Card */}
        <Card className="glass-dark border-red-500/20 shadow-2xl">
          <CardHeader className="border-b border-white/5 pb-4">
            <CardTitle className="text-center flex items-center justify-center space-x-2">
              <Lock className="h-5 w-5 text-red-400" />
              <span>Giriş Yap</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Error Message */}
              {error && (
                <div className="glass-dark p-3 rounded-lg border border-red-500/30 bg-red-500/5 flex items-start space-x-3 animate-shake">
                  <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-red-400 text-sm font-semibold">Hata</p>
                    <p className="text-red-400/80 text-xs">{error}</p>
                  </div>
                </div>
              )}

              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80 flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-blue-400" />
                  <span>E-posta Adresi</span>
                </label>
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="admin@iddaasohbet.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="glass-dark border-white/10 focus:border-blue-500/50 pl-10"
                    required
                  />
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80 flex items-center space-x-2">
                  <Lock className="h-4 w-4 text-purple-400" />
                  <span>Şifre</span>
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="glass-dark border-white/10 focus:border-purple-500/50 pl-10 pr-10"
                    required
                  />
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground transition"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-white/20 bg-white/5 accent-red-500"
                  />
                  <span className="text-foreground/70">Beni Hatırla</span>
                </label>
                <button
                  type="button"
                  className="text-blue-400 hover:text-blue-300 transition"
                >
                  Şifremi Unuttum?
                </button>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 hover:from-red-600 hover:via-orange-600 hover:to-yellow-600 text-white font-bold py-6 text-base shadow-lg shadow-red-500/20 transition-all hover:shadow-red-500/40 hover:scale-[1.02]"
              >
                {loading ? (
                  <span className="flex items-center justify-center space-x-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Giriş Yapılıyor...</span>
                  </span>
                ) : (
                  <span className="flex items-center justify-center space-x-2">
                    <Shield className="h-5 w-5" />
                    <span>Giriş Yap</span>
                  </span>
                )}
              </Button>
            </form>

            {/* Security Info */}
            <div className="mt-6 pt-6 border-t border-white/5">
              <div className="glass-dark p-4 rounded-lg border border-green-500/20 bg-green-500/5">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-green-400 font-semibold text-sm mb-1">
                      Güvenli Bağlantı
                    </h4>
                    <p className="text-foreground/70 text-xs">
                      Giriş bilgileriniz SSL şifreleme ile korunmaktadır. 
                      Tüm işlemler kayıt altına alınır.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Back to Site */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-foreground/60 hover:text-foreground text-sm inline-flex items-center space-x-2 transition group"
          >
            <span className="group-hover:-translate-x-1 transition">←</span>
            <span>Ana Sayfaya Dön</span>
          </Link>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 text-center">
          <Card className="glass-dark border-yellow-500/20 bg-yellow-500/5">
            <CardContent className="p-4">
              <p className="text-yellow-400 text-xs font-semibold mb-2">🔑 Demo Giriş Bilgileri</p>
              <div className="space-y-1 text-xs text-foreground/70">
                <p><strong>E-posta:</strong> admin@iddaasohbet.com</p>
                <p><strong>Şifre:</strong> admin123</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
