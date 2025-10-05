'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert } from '@/components/ui/alert'
import { 
  User, 
  Lock, 
  Mail,
  Trash2,
  Save,
  AlertTriangle,
  Upload,
  Check
} from 'lucide-react'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function HesapAyarlariPage() {
  const { data: session, status, update } = useSession()
  const router = useRouter()
  
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  // Profil bilgileri
  const [profileData, setProfileData] = useState({
    name: session?.user?.name || '',
    username: session?.user?.username || '',
    email: session?.user?.email || '',
    bio: '',
    avatar: (session as any)?.user?.image || ''
  })

  // Şifre değiştirme
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData)
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Profil güncellenemedi')
        return
      }

      setSuccess('Profil başarıyla güncellendi!')
      // Session'ı güncelle
      await update()
      
      // 2 saniye sonra success mesajını kaldır
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError('Bir hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('Yeni şifreler eşleşmiyor')
      setLoading(false)
      return
    }

    if (passwordData.newPassword.length < 6) {
      setError('Yeni şifre en az 6 karakter olmalıdır')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/user/password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Şifre değiştirilemedi')
        return
      }

      setSuccess('Şifre başarıyla değiştirildi!')
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
      
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError('Bir hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (!confirm('Hesabınızı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz!')) {
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/user/delete', {
        method: 'DELETE'
      })

      if (!response.ok) {
        const data = await response.json()
        setError(data.error || 'Hesap silinemedi')
        return
      }

      // Başarılı silme - logout ve homepage'e yönlendir
      router.push('/giris?deleted=true')
    } catch (err) {
      setError('Bir hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setLoading(false)
    }
  }

  // Redirect only on client after status resolves to avoid SSR "location is not defined"
  if (typeof window !== 'undefined' && status === 'unauthenticated') {
    router.push('/giris')
    return null
  }
  if (status === 'loading') {
    return null
  }

  return (
    <div className="min-h-screen py-8 relative">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern"></div>
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse-slow"></div>

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        {/* Header */}
        <div className="mb-8 animate-fadeInUp">
          <h1 className="text-4xl font-bold gradient-text mb-2">Hesap Ayarları</h1>
          <p className="text-foreground/60">Profil bilgilerinizi ve hesap ayarlarınızı yönetin</p>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <Alert className="mb-6 bg-green-500/10 border-green-500/50 text-green-400 animate-fadeInUp">
            <Check className="h-4 w-4" />
            <p>{success}</p>
          </Alert>
        )}
        {error && (
          <Alert className="mb-6 bg-red-500/10 border-red-500/50 text-red-400 animate-fadeInUp">
            <AlertTriangle className="h-4 w-4" />
            <p>{error}</p>
          </Alert>
        )}

        {/* Tabs */}
        <Tabs defaultValue="profile" className="animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          <TabsList className="glass-dark border border-white/10 p-1 mb-6">
            <TabsTrigger value="profile" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-yellow-400 data-[state=active]:text-black">
              <User className="h-4 w-4 mr-2" />
              Profil Bilgileri
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-yellow-400 data-[state=active]:text-black">
              <Lock className="h-4 w-4 mr-2" />
              Güvenlik
            </TabsTrigger>
            <TabsTrigger value="account" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-yellow-400 data-[state=active]:text-black">
              <Trash2 className="h-4 w-4 mr-2" />
              Hesap
            </TabsTrigger>
          </TabsList>

          {/* Profil Bilgileri */}
          <TabsContent value="profile">
            <Card className="glass-dark border-white/5">
              <CardHeader>
                <CardTitle>Profil Bilgilerini Düzenle</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  {/* Avatar */}
                  <div className="flex items-center space-x-6">
                    <Avatar className="h-24 w-24 ring-4 ring-green-500/50">
                      <AvatarImage src={profileData.avatar} alt={profileData.name} />
                      <AvatarFallback className="bg-gradient-to-br from-green-500 to-yellow-400 text-black text-2xl font-bold">
                        {profileData.username.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <Button type="button" variant="outline" className="border-white/10 mb-2">
                        <Upload className="h-4 w-4 mr-2" />
                        Avatar Değiştir
                      </Button>
                      <p className="text-xs text-foreground/60">JPG, PNG veya GIF. Maks 2MB.</p>
                    </div>
                  </div>

                  {/* İsim */}
                  <div className="space-y-2">
                    <Label htmlFor="name">İsim Soyisim</Label>
                    <Input
                      id="name"
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      className="glass border-white/10 focus:border-green-500/50"
                    />
                  </div>

                  {/* Username */}
                  <div className="space-y-2">
                    <Label htmlFor="username">Kullanıcı Adı</Label>
                    <Input
                      id="username"
                      type="text"
                      value={profileData.username}
                      onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                      className="glass border-white/10 focus:border-green-500/50"
                    />
                    <p className="text-xs text-foreground/60">Profil URL'iniz: iddaasohbet.com/profil/{profileData.username}</p>
                  </div>

                  {/* Bio */}
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      id="bio"
                      rows={4}
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      className="w-full glass border border-white/10 focus:border-green-500/50 rounded-lg px-3 py-2 bg-black/20 text-foreground"
                      placeholder="Kendinizden bahsedin..."
                    />
                    <p className="text-xs text-foreground/60">{profileData.bio.length}/200 karakter</p>
                  </div>

                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-green-500 to-yellow-400 hover:from-green-600 hover:to-yellow-500 text-black font-bold"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {loading ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Güvenlik */}
          <TabsContent value="security">
            <Card className="glass-dark border-white/5">
              <CardHeader>
                <CardTitle>Şifre Değiştir</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordChange} className="space-y-6">
                  {/* Mevcut Şifre */}
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Mevcut Şifre</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                      className="glass border-white/10 focus:border-green-500/50"
                      required
                    />
                  </div>

                  {/* Yeni Şifre */}
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Yeni Şifre</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      className="glass border-white/10 focus:border-green-500/50"
                      required
                      minLength={6}
                    />
                    <p className="text-xs text-foreground/60">En az 6 karakter olmalıdır</p>
                  </div>

                  {/* Yeni Şifre Tekrar */}
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Yeni Şifre (Tekrar)</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      className="glass border-white/10 focus:border-green-500/50"
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-green-500 to-yellow-400 hover:from-green-600 hover:to-yellow-500 text-black font-bold"
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    {loading ? 'Değiştiriliyor...' : 'Şifreyi Değiştir'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* E-posta Değiştirme */}
            <Card className="glass-dark border-white/5 mt-6">
              <CardHeader>
                <CardTitle>E-posta Adresi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 glass border border-white/5 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-green-400" />
                      <div>
                        <p className="font-semibold">{session?.user?.email ?? ''}</p>
                        <p className="text-xs text-foreground/60">Mevcut e-posta adresiniz</p>
                      </div>
                    </div>
                    <Button variant="outline" className="border-white/10">
                      Değiştir
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Hesap */}
          <TabsContent value="account">
            <Card className="glass-dark border-red-500/20">
              <CardHeader>
                <CardTitle className="text-red-400">Tehlikeli Bölge</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert className="bg-red-500/10 border-red-500/50 text-red-400">
                  <AlertTriangle className="h-4 w-4" />
                  <p>Hesabınızı silmek geri alınamaz bir işlemdir. Tüm verileriniz kalıcı olarak silinecektir.</p>
                </Alert>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Hesabınızı sildiğinizde:</h3>
                    <ul className="text-sm text-foreground/60 space-y-1 ml-5 list-disc">
                      <li>Tüm kuponlarınız silinecek</li>
                      <li>Tüm yorumlarınız silinecek</li>
                      <li>Profil bilgileriniz kalıcı olarak silinecek</li>
                      <li>Bu işlem geri alınamaz</li>
                    </ul>
                  </div>

                  <Button
                    onClick={handleDeleteAccount}
                    disabled={loading}
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-bold"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    {loading ? 'Siliniyor...' : 'Hesabımı Sil'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
