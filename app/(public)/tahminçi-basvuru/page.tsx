'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { 
  Crown, 
  Send, 
  CheckCircle, 
  Clock,
  XCircle,
  Award,
  Target,
  TrendingUp,
  AlertTriangle,
  Info
} from 'lucide-react'

export default function TahminciBasvuruPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  
  const [loading, setLoading] = useState(false)
  const [checkingStatus, setCheckingStatus] = useState(true)
  const [existingApplication, setExistingApplication] = useState<any>(null)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    message: '',
    experience: ''
  })

  // Mevcut başvuru kontrolü
  useEffect(() => {
    if (session?.user) {
      checkExistingApplication()
    }
  }, [session])

  const checkExistingApplication = async () => {
    try {
      const response = await fetch('/api/tipster-application/check')
      if (response.ok) {
        const data = await response.json()
        setExistingApplication(data.application)
      }
    } catch (err) {
      console.error('Check application error:', err)
    } finally {
      setCheckingStatus(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (formData.message.length < 50) {
      setError('Başvuru mesajınız en az 50 karakter olmalıdır')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/tipster-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Başvuru gönderilemedi')
        return
      }

      setSuccess(true)
      setFormData({ message: '', experience: '' })
      
      // Başvuru bilgisini güncelle
      checkExistingApplication()
    } catch (err) {
      setError('Bir hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading' || checkingStatus) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-foreground/60">Yükleniyor...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    router.push('/giris')
    return null
  }

  // Kullanıcı zaten tahminçiyse
  if (session.user?.role === 'ADMIN' || (session.user as any)?.verified) {
    return (
      <div className="min-h-screen py-8 relative">
        <div className="absolute inset-0 grid-pattern"></div>
        <div className="container mx-auto px-4 max-w-2xl relative z-10">
          <Card className="glass-dark border-green-500/20">
            <CardContent className="p-12 text-center">
              <Award className="h-20 w-20 mx-auto text-green-400 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Zaten Tahminçisiniz!</h2>
              <p className="text-foreground/60 mb-6">
                Tahminçi rozetiniz aktif durumda. Başarılı tahminlerinizle platformumuza değer katmaya devam edin!
              </p>
              <Button 
                onClick={() => router.push(`/profil/${session.user?.username}`)}
                className="bg-gradient-to-r from-green-500 to-yellow-400 hover:from-green-600 hover:to-yellow-500 text-black font-bold"
              >
                Profilime Git
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Bekleyen başvuru varsa
  if (existingApplication && existingApplication.status === 'PENDING') {
    return (
      <div className="min-h-screen py-8 relative">
        <div className="absolute inset-0 grid-pattern"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl animate-pulse-slow"></div>
        
        <div className="container mx-auto px-4 max-w-2xl relative z-10">
          <Card className="glass-dark border-yellow-400/20 animate-fadeInUp">
            <CardContent className="p-12 text-center">
              <Clock className="h-20 w-20 mx-auto text-yellow-400 mb-4 animate-pulse" />
              <h2 className="text-2xl font-bold mb-2">Başvurunuz İnceleniyor</h2>
              <p className="text-foreground/60 mb-6">
                Tahminçi başvurunuz admin ekibimiz tarafından inceleniyor. Sonuç en kısa sürede size bildirilecektir.
              </p>
              
              <div className="glass border border-white/5 rounded-lg p-6 mb-6 text-left">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-foreground/60">Başvuru Tarihi:</span>
                  <span className="font-semibold">
                    {new Date(existingApplication.createdAt).toLocaleDateString('tr-TR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                <div className="mb-2">
                  <p className="text-sm text-foreground/60 mb-1">Mesajınız:</p>
                  <p className="text-foreground">{existingApplication.message}</p>
                </div>
                {existingApplication.experience && (
                  <div className="mt-4">
                    <p className="text-sm text-foreground/60 mb-1">Deneyim & Başarılar:</p>
                    <p className="text-foreground">{existingApplication.experience}</p>
                  </div>
                )}
              </div>

              <Badge className="glass border-yellow-400/50 bg-yellow-400/10 text-yellow-400 px-6 py-2">
                <Clock className="h-4 w-4 mr-2" />
                İnceleme Aşamasında
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Onaylanmış başvuru
  if (existingApplication && existingApplication.status === 'APPROVED') {
    return (
      <div className="min-h-screen py-8 relative">
        <div className="absolute inset-0 grid-pattern"></div>
        <div className="container mx-auto px-4 max-w-2xl relative z-10">
          <Card className="glass-dark border-green-500/20">
            <CardContent className="p-12 text-center">
              <CheckCircle className="h-20 w-20 mx-auto text-green-400 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Başvurunuz Onaylandı!</h2>
              <p className="text-foreground/60 mb-6">
                Tebrikler! Tahminçi başvurunuz onaylandı. Artık platformumuzda doğrulanmış tahminçi rozetiyle görüneceksiniz.
              </p>
              {existingApplication.adminNote && (
                <div className="glass border border-green-500/20 rounded-lg p-4 mb-6">
                  <p className="text-sm text-foreground/60 mb-1">Admin Notu:</p>
                  <p className="text-foreground">{existingApplication.adminNote}</p>
                </div>
              )}
              <Button 
                onClick={() => router.push(`/profil/${session.user?.username}`)}
                className="bg-gradient-to-r from-green-500 to-yellow-400 hover:from-green-600 hover:to-yellow-500 text-black font-bold"
              >
                Profilime Git
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Reddedilmiş başvuru
  if (existingApplication && existingApplication.status === 'REJECTED') {
    return (
      <div className="min-h-screen py-8 relative">
        <div className="absolute inset-0 grid-pattern"></div>
        <div className="container mx-auto px-4 max-w-2xl relative z-10">
          <Card className="glass-dark border-red-500/20 animate-fadeInUp">
            <CardContent className="p-12 text-center">
              <XCircle className="h-20 w-20 mx-auto text-red-400 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Başvurunuz Reddedildi</h2>
              <p className="text-foreground/60 mb-6">
                Üzgünüz, tahminçi başvurunuz şu an için onaylanmadı. Daha fazla başarılı kupon paylaştıktan sonra tekrar başvurabilirsiniz.
              </p>
              {existingApplication.adminNote && (
                <div className="glass border border-red-500/20 rounded-lg p-4 mb-6">
                  <p className="text-sm text-foreground/60 mb-1">Ret Nedeni:</p>
                  <p className="text-foreground">{existingApplication.adminNote}</p>
                </div>
              )}
              <div className="flex gap-3 justify-center">
                <Button 
                  variant="outline"
                  onClick={() => router.push('/')}
                  className="border-white/10"
                >
                  Anasayfaya Dön
                </Button>
                <Button 
                  onClick={() => setExistingApplication(null)}
                  className="bg-gradient-to-r from-green-500 to-yellow-400 hover:from-green-600 hover:to-yellow-500 text-black font-bold"
                >
                  Yeniden Başvur
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Başvuru formu
  return (
    <div className="min-h-screen py-8 relative">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern"></div>
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl animate-pulse-slow"></div>

      <div className="container mx-auto px-4 max-w-3xl relative z-10">
        {/* Header */}
        <div className="text-center mb-8 animate-fadeInUp">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Crown className="h-12 w-12 text-yellow-400 animate-pulse" />
            <h1 className="text-4xl md:text-5xl font-bold gradient-text">Tahminçi Başvurusu</h1>
          </div>
          <p className="text-foreground/70 text-lg">
            Platformumuzda doğrulanmış tahminçi olmak için başvurun!
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          <Card className="glass-dark border-white/5">
            <CardContent className="p-6 text-center">
              <Award className="h-10 w-10 text-green-400 mx-auto mb-3" />
              <h3 className="font-bold mb-2">Doğrulanmış Rozet</h3>
              <p className="text-sm text-foreground/60">Profilinizde tahminçi rozeti görünsün</p>
            </CardContent>
          </Card>
          <Card className="glass-dark border-white/5">
            <CardContent className="p-6 text-center">
              <Target className="h-10 w-10 text-yellow-400 mx-auto mb-3" />
              <h3 className="font-bold mb-2">Öne Çıkan Profil</h3>
              <p className="text-sm text-foreground/60">Tahminçiler listesinde üst sıralarda yer alın</p>
            </CardContent>
          </Card>
          <Card className="glass-dark border-white/5">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-10 w-10 text-blue-400 mx-auto mb-3" />
              <h3 className="font-bold mb-2">Daha Fazla Takipçi</h3>
              <p className="text-sm text-foreground/60">Güvenilir tahminçi olarak daha çok takip edilin</p>
            </CardContent>
          </Card>
        </div>

        {/* Success Message */}
        {success && (
          <Alert className="mb-6 bg-green-500/10 border-green-500/50 text-green-400 animate-fadeInUp">
            <CheckCircle className="h-4 w-4" />
            <p>Başvurunuz başarıyla gönderildi! En kısa sürede değerlendirilecektir.</p>
          </Alert>
        )}

        {/* Error Message */}
        {error && (
          <Alert className="mb-6 bg-red-500/10 border-red-500/50 text-red-400 animate-fadeInUp">
            <AlertTriangle className="h-4 w-4" />
            <p>{error}</p>
          </Alert>
        )}

        {/* Form */}
        <Card className="glass-dark border-white/5 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Info className="h-5 w-5 text-blue-400" />
              <span>Başvuru Bilgileri</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Başvuru Mesajı */}
              <div className="space-y-2">
                <Label htmlFor="message">
                  Neden Tahminçi Olmak İstiyorsunuz? <span className="text-red-400">*</span>
                </Label>
                <textarea
                  id="message"
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full glass border border-white/10 focus:border-green-500/50 rounded-lg px-3 py-2 bg-black/20 text-foreground"
                  placeholder="Tahmincilik konusundaki deneyiminizi, başarılarınızı ve neden bu platformda tahminçi olmak istediğinizi açıklayın..."
                  required
                />
                <div className="flex items-center justify-between text-xs">
                  <span className="text-foreground/60">{formData.message.length}/500 karakter (min. 50)</span>
                  {formData.message.length >= 50 && (
                    <span className="text-green-400 flex items-center">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Yeterli uzunluk
                    </span>
                  )}
                </div>
              </div>

              {/* Deneyim & Başarılar */}
              <div className="space-y-2">
                <Label htmlFor="experience">
                  Deneyim & Başarılarınız <span className="text-foreground/60">(Opsiyonel)</span>
                </Label>
                <textarea
                  id="experience"
                  rows={4}
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className="w-full glass border border-white/10 focus:border-green-500/50 rounded-lg px-3 py-2 bg-black/20 text-foreground"
                  placeholder="Önceki başarılı tahminleriniz, uzman olduğunuz ligler, özel stratejileriniz vb..."
                />
                <p className="text-xs text-foreground/60">{formData.experience.length}/500 karakter</p>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={loading || formData.message.length < 50}
                className="w-full bg-gradient-to-r from-green-500 to-yellow-400 hover:from-green-600 hover:to-yellow-500 text-black font-bold h-12"
              >
                <Send className="h-4 w-4 mr-2" />
                {loading ? 'Gönderiliyor...' : 'Başvuru Gönder'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Info Box */}
        <Card className="glass-dark border-blue-500/20 mt-6 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <Info className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-foreground/70 space-y-2">
                <p className="font-semibold text-foreground">Başvuru Kriterleri:</p>
                <ul className="list-disc ml-5 space-y-1">
                  <li>En az 10 kupon paylaşmış olmalısınız</li>
                  <li>Başarı oranınız en az %60 olmalıdır</li>
                  <li>Platformumuzda aktif ve pozitif bir kullanıcı olmalısınız</li>
                  <li>Spam veya yanıltıcı içerik paylaşmamış olmalısınız</li>
                </ul>
                <p className="text-xs text-foreground/60 mt-3">
                  * Başvurunuz 1-3 iş günü içinde değerlendirilecektir.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
