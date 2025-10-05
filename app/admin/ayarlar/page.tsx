'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Settings,
  Globe,
  Shield,
  Bell,
  Palette,
  Database,
  Mail,
  Key,
  Users,
  Save,
  RefreshCw,
  Lock,
  Eye,
  Zap
} from 'lucide-react'

export default function AdminAyarlarPage() {
  const settingSections = [
    { id: 'general', label: 'Genel Ayarlar', icon: Settings, color: 'blue' },
    { id: 'security', label: 'Güvenlik', icon: Shield, color: 'red' },
    { id: 'notifications', label: 'Bildirimler', icon: Bell, color: 'yellow' },
    { id: 'appearance', label: 'Görünüm', icon: Palette, color: 'purple' },
    { id: 'database', label: 'Veritabanı', icon: Database, color: 'green' },
    { id: 'email', label: 'E-posta', icon: Mail, color: 'cyan' }
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-text mb-2">Sistem Ayarları</h1>
          <p className="text-foreground/60">Platform ayarlarını yönet ve yapılandır</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="glass border-white/10">
            <RefreshCw className="h-4 w-4 mr-2" />
            Sıfırla
          </Button>
          <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
            <Save className="h-4 w-4 mr-2" />
            Değişiklikleri Kaydet
          </Button>
        </div>
      </div>

      {/* Settings Navigation */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {settingSections.map((section) => {
          const Icon = section.icon
          return (
            <button
              key={section.id}
              className={`p-4 glass rounded-lg border border-${section.color}-500/30 hover:bg-${section.color}-500/10 transition-all group`}
            >
              <Icon className={`h-6 w-6 text-${section.color}-400 mx-auto mb-2 group-hover:scale-110 transition-transform`} />
              <span className="text-sm font-medium block">{section.label}</span>
            </button>
          )
        })}
      </div>

      {/* General Settings */}
      <Card className="glass-dark border-white/5">
        <CardHeader className="border-b border-white/5">
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5 text-blue-400" />
            <span>Genel Ayarlar</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-foreground/80 mb-2 block">
                  Site Adı
                </label>
                <Input
                  type="text"
                  defaultValue="İddaaSohbet"
                  className="glass-dark border-white/10"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground/80 mb-2 block">
                  Site URL
                </label>
                <Input
                  type="text"
                  defaultValue="https://iddaasohbet.com"
                  className="glass-dark border-white/10"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground/80 mb-2 block">
                Site Açıklaması
              </label>
              <textarea
                rows={3}
                defaultValue="Türkiye'nin en büyük iddaa kupon paylaşım platformu"
                className="w-full glass-dark border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500/50 resize-none"
              />
            </div>

            <div className="flex items-center justify-between p-4 glass rounded-lg border border-white/5">
              <div>
                <h4 className="font-semibold mb-1">Bakım Modu</h4>
                <p className="text-sm text-foreground/60">Siteyi geçici olarak kapat</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="glass-dark border-white/5">
        <CardHeader className="border-b border-white/5">
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-red-400" />
            <span>Güvenlik Ayarları</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 glass rounded-lg border border-white/5">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-lg bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                  <Lock className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <h4 className="font-semibold">İki Faktörlü Doğrulama</h4>
                  <p className="text-sm text-foreground/60">Ekstra güvenlik katmanı</p>
                </div>
              </div>
              <Badge className="bg-green-500/20 border-green-500/30 text-green-400">
                Aktif
              </Badge>
            </div>

            <div className="flex items-center justify-between p-4 glass rounded-lg border border-white/5">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                  <Key className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-semibold">API Anahtarları</h4>
                  <p className="text-sm text-foreground/60">3 aktif anahtar</p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="glass border-white/10">
                Yönet
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 glass rounded-lg border border-white/5">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
                  <Eye className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <h4 className="font-semibold">Giriş Logları</h4>
                  <p className="text-sm text-foreground/60">Son 30 gün</p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="glass border-white/10">
                Görüntüle
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Settings */}
      <Card className="glass-dark border-white/5">
        <CardHeader className="border-b border-white/5">
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-yellow-400" />
            <span>Performans Ayarları</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 glass rounded-lg border border-white/5">
              <div>
                <h4 className="font-semibold mb-1">Önbellek</h4>
                <p className="text-sm text-foreground/60">Sayfa yükleme hızını artır</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 glass rounded-lg border border-white/5">
              <div>
                <h4 className="font-semibold mb-1">Görsel Optimizasyonu</h4>
                <p className="text-sm text-foreground/60">Görselleri otomatik optimize et</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 glass rounded-lg border border-white/5">
              <div>
                <h4 className="font-semibold mb-1">CDN</h4>
                <p className="text-sm text-foreground/60">İçerik dağıtım ağı</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 px-8 py-6 text-lg">
          <Save className="h-5 w-5 mr-2" />
          Tüm Değişiklikleri Kaydet
        </Button>
      </div>
    </div>
  )
}

