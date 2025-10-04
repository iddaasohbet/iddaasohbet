'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Bell,
  Send,
  Users,
  MessageSquare,
  Target,
  TrendingUp,
  Clock,
  CheckCircle,
  X,
  Plus,
  Trash2,
  Eye,
  Edit,
  AlertCircle,
  Mail,
  Smartphone,
  Globe
} from 'lucide-react'

export default function AdminBildirimlerPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([])

  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedNotification, setSelectedNotification] = useState<any>(null)

  // Form data
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: 'info',
    target: 'all',
    channel: 'all'
  })

  // Mock stats
  const stats = [
    { label: 'Gönderilen Bildirim', value: '8,432', icon: Send, color: 'blue', trend: '+234' },
    { label: 'Aktif Kullanıcı', value: '5,234', icon: Users, color: 'green', trend: '+567' },
    { label: 'Tıklama Oranı', value: '67.8%', icon: Target, color: 'purple', trend: '+12%' },
    { label: 'Bekleyen', value: '12', icon: Clock, color: 'yellow', trend: '0' }
  ]

  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'Yeni Özellikler Eklendi! 🎉',
      message: 'Artık kuponlarınızı daha kolay paylaşabilir ve takip edebilirsiniz.',
      type: 'success',
      target: 'all',
      channel: 'all',
      status: 'sent',
      sentDate: '2025-01-10 14:30',
      recipients: 5234,
      openRate: 72.3,
      clickRate: 45.2
    },
    {
      id: '2',
      title: 'Planlı Bakım Bildirimi',
      message: 'Yarın saat 02:00-04:00 arası sistemde bakım yapılacaktır.',
      type: 'warning',
      target: 'all',
      channel: 'email',
      status: 'scheduled',
      sentDate: '2025-01-11 02:00',
      recipients: 5234,
      openRate: 0,
      clickRate: 0
    },
    {
      id: '3',
      title: 'Premium Üyelik Fırsatı',
      message: '%50 indirimli premium üyelik kampanyası başladı!',
      type: 'info',
      target: 'premium',
      channel: 'push',
      status: 'sent',
      sentDate: '2025-01-09 10:00',
      recipients: 1234,
      openRate: 85.4,
      clickRate: 67.8
    }
  ])

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'success':
        return <Badge className="bg-green-500/20 border-green-500/30 text-green-400">Başarı</Badge>
      case 'warning':
        return <Badge className="bg-yellow-500/20 border-yellow-500/30 text-yellow-400">Uyarı</Badge>
      case 'error':
        return <Badge className="bg-red-500/20 border-red-500/30 text-red-400">Hata</Badge>
      case 'info':
        return <Badge className="bg-blue-500/20 border-blue-500/30 text-blue-400">Bilgi</Badge>
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'sent':
        return <Badge className="bg-green-500/20 border-green-500/30 text-green-400"><CheckCircle className="h-3 w-3 mr-1" />Gönderildi</Badge>
      case 'scheduled':
        return <Badge className="bg-yellow-500/20 border-yellow-500/30 text-yellow-400"><Clock className="h-3 w-3 mr-1" />Planlandı</Badge>
      case 'draft':
        return <Badge className="bg-gray-500/20 border-gray-500/30 text-gray-400">Taslak</Badge>
      default:
        return null
    }
  }

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'email':
        return <Mail className="h-4 w-4" />
      case 'push':
        return <Smartphone className="h-4 w-4" />
      case 'all':
        return <Globe className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  // Create Notification
  const handleCreateNotification = () => {
    const newNotification = {
      id: String(notifications.length + 1),
      title: formData.title,
      message: formData.message,
      type: formData.type,
      target: formData.target,
      channel: formData.channel,
      status: 'draft',
      sentDate: new Date().toISOString().split('T')[0] + ' ' + new Date().toTimeString().split(' ')[0].slice(0, 5),
      recipients: formData.target === 'all' ? 5234 : formData.target === 'premium' ? 1234 : 892,
      openRate: 0,
      clickRate: 0
    }
    setNotifications([newNotification, ...notifications])
    setShowCreateModal(false)
    resetForm()
  }

  // Edit Notification
  const handleEditNotification = () => {
    setNotifications(notifications.map(n => 
      n.id === selectedNotification.id 
        ? { ...n, title: formData.title, message: formData.message, type: formData.type, target: formData.target, channel: formData.channel }
        : n
    ))
    setShowEditModal(false)
    setSelectedNotification(null)
    resetForm()
  }

  // Delete Notification
  const handleDeleteNotification = () => {
    setNotifications(notifications.filter(n => n.id !== selectedNotification.id))
    setShowDeleteModal(false)
    setSelectedNotification(null)
  }

  // Send Notification
  const handleSendNotification = (notification: any) => {
    setNotifications(notifications.map(n => 
      n.id === notification.id 
        ? { ...n, status: 'sent', sentDate: new Date().toISOString().split('T')[0] + ' ' + new Date().toTimeString().split(' ')[0].slice(0, 5) }
        : n
    ))
  }

  // Bulk Delete
  const handleBulkDelete = () => {
    setNotifications(notifications.filter(n => !selectedNotifications.includes(n.id)))
    setSelectedNotifications([])
  }

  const handleSelectNotification = (id: string) => {
    setSelectedNotifications(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const handleSelectAll = () => {
    if (selectedNotifications.length === notifications.length) {
      setSelectedNotifications([])
    } else {
      setSelectedNotifications(notifications.map(n => n.id))
    }
  }

  const openEditModal = (notification: any) => {
    setSelectedNotification(notification)
    setFormData({
      title: notification.title,
      message: notification.message,
      type: notification.type,
      target: notification.target,
      channel: notification.channel
    })
    setShowEditModal(true)
  }

  const openDeleteModal = (notification: any) => {
    setSelectedNotification(notification)
    setShowDeleteModal(true)
  }

  const resetForm = () => {
    setFormData({
      title: '',
      message: '',
      type: 'info',
      target: 'all',
      channel: 'all'
    })
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-text mb-2">Bildirim Yönetimi</h1>
          <p className="text-foreground/60">Kullanıcılara bildirim gönder ve yönet</p>
        </div>
        <Button 
          onClick={() => setShowCreateModal(true)}
          className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
        >
          <Plus className="h-4 w-4 mr-2" />
          Yeni Bildirim Oluştur
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="glass-dark border-white/5 hover:border-white/10 transition-all group cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`h-12 w-12 rounded-xl bg-${stat.color}-500/10 border border-${stat.color}-500/30 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className={`h-6 w-6 text-${stat.color}-400`} />
                  </div>
                  <Badge className="bg-green-500/20 border-green-500/30 text-green-400">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {stat.trend}
                  </Badge>
                </div>
                <p className="text-foreground/60 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Search & Actions */}
      <Card className="glass-dark border-white/5">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Input
                type="search"
                placeholder="Bildirim başlığı ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="glass-dark border-white/10"
              />
            </div>
          </div>

          {selectedNotifications.length > 0 && (
            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
              <p className="text-sm text-foreground/60">
                <strong className="text-orange-400">{selectedNotifications.length}</strong> bildirim seçildi
              </p>
              <Button 
                size="sm" 
                variant="outline" 
                className="glass border-red-500/30 text-red-400 hover:bg-red-500/10"
                onClick={handleBulkDelete}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Sil
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Notifications List */}
      <Card className="glass-dark border-white/5">
        <CardHeader className="border-b border-white/5">
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-blue-400" />
              <span>Bildirimler ({notifications.length})</span>
            </span>
            <Button variant="ghost" size="sm" onClick={handleSelectAll} className="text-xs">
              {selectedNotifications.length === notifications.length ? 'Seçimi Kaldır' : 'Tümünü Seç'}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div 
                key={notification.id}
                className={`glass-dark p-5 rounded-lg border transition-all hover:border-white/10 ${
                  selectedNotifications.includes(notification.id) ? 'border-orange-500/50 bg-orange-500/5' : 'border-white/5'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <input
                    type="checkbox"
                    checked={selectedNotifications.includes(notification.id)}
                    onChange={() => handleSelectNotification(notification.id)}
                    className="rounded border-white/20 bg-white/5 cursor-pointer mt-1"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-semibold text-lg">{notification.title}</h4>
                        {getTypeBadge(notification.type)}
                        {getStatusBadge(notification.status)}
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1 text-xs text-foreground/60">
                          {getChannelIcon(notification.channel)}
                          <span>{notification.channel === 'all' ? 'Tüm Kanallar' : notification.channel === 'email' ? 'Email' : 'Push'}</span>
                        </div>
                        <span className="text-xs text-foreground/60">•</span>
                        <span className="text-xs text-foreground/60">{notification.sentDate}</span>
                      </div>
                    </div>

                    <p className="text-sm text-foreground/70 mb-4">{notification.message}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-xs text-foreground/60">
                        <div className="flex items-center space-x-1">
                          <Users className="h-3 w-3" />
                          <span>{notification.recipients.toLocaleString()} alıcı</span>
                        </div>
                        {notification.status === 'sent' && (
                          <>
                            <div className="flex items-center space-x-1">
                              <Eye className="h-3 w-3 text-blue-400" />
                              <span className="text-blue-400">{notification.openRate}% açılma</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Target className="h-3 w-3 text-green-400" />
                              <span className="text-green-400">{notification.clickRate}% tıklama</span>
                            </div>
                          </>
                        )}
                      </div>

                      <div className="flex items-center space-x-2">
                        {notification.status === 'draft' && (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="glass border-green-500/30 text-green-400 hover:bg-green-500/10 h-8 px-3 text-xs"
                            onClick={() => handleSendNotification(notification)}
                          >
                            <Send className="h-3 w-3 mr-1" />
                            Gönder
                          </Button>
                        )}
                        {notification.status !== 'sent' && (
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-8 w-8 p-0 hover:bg-blue-500/10 hover:text-blue-400"
                            onClick={() => openEditModal(notification)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 w-8 p-0 hover:bg-red-500/10 hover:text-red-400"
                          onClick={() => openDeleteModal(notification)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-white/5">
            <p className="text-sm text-foreground/60">
              Toplam <strong className="text-orange-400">{notifications.length}</strong> bildirim gösteriliyor
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="glass-dark border-white/10 w-full max-w-2xl">
            <CardHeader className="border-b border-white/5">
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center space-x-2">
                  <Plus className="h-5 w-5 text-blue-400" />
                  <span>Yeni Bildirim Oluştur</span>
                </span>
                <Button variant="ghost" size="sm" onClick={() => setShowCreateModal(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Başlık</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Örn: Yeni Özellikler Eklendi!"
                  className="glass-dark border-white/10"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Mesaj</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Bildirim mesajını buraya yazın..."
                  className="w-full glass-dark border border-white/10 rounded-lg px-4 py-3 min-h-[120px] focus:outline-none focus:border-blue-500/50"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Tip</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full glass-dark border border-white/10 rounded-lg px-4 py-2"
                  >
                    <option value="info">Bilgi</option>
                    <option value="success">Başarı</option>
                    <option value="warning">Uyarı</option>
                    <option value="error">Hata</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Hedef</label>
                  <select
                    value={formData.target}
                    onChange={(e) => setFormData({...formData, target: e.target.value})}
                    className="w-full glass-dark border border-white/10 rounded-lg px-4 py-2"
                  >
                    <option value="all">Tüm Kullanıcılar</option>
                    <option value="premium">Premium Üyeler</option>
                    <option value="tipsters">Tahminçiler</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Kanal</label>
                  <select
                    value={formData.channel}
                    onChange={(e) => setFormData({...formData, channel: e.target.value})}
                    className="w-full glass-dark border border-white/10 rounded-lg px-4 py-2"
                  >
                    <option value="all">Tüm Kanallar</option>
                    <option value="email">Email</option>
                    <option value="push">Push Bildirimi</option>
                  </select>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <Button 
                  onClick={handleCreateNotification}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                  disabled={!formData.title || !formData.message}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Taslak Olarak Kaydet
                </Button>
                <Button variant="outline" className="glass border-white/10" onClick={() => setShowCreateModal(false)}>
                  İptal
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedNotification && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="glass-dark border-white/10 w-full max-w-2xl">
            <CardHeader className="border-b border-white/5">
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center space-x-2">
                  <Edit className="h-5 w-5 text-blue-400" />
                  <span>Bildirim Düzenle</span>
                </span>
                <Button variant="ghost" size="sm" onClick={() => setShowEditModal(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Başlık</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="glass-dark border-white/10"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Mesaj</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full glass-dark border border-white/10 rounded-lg px-4 py-3 min-h-[120px] focus:outline-none focus:border-blue-500/50"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Tip</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full glass-dark border border-white/10 rounded-lg px-4 py-2"
                  >
                    <option value="info">Bilgi</option>
                    <option value="success">Başarı</option>
                    <option value="warning">Uyarı</option>
                    <option value="error">Hata</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Hedef</label>
                  <select
                    value={formData.target}
                    onChange={(e) => setFormData({...formData, target: e.target.value})}
                    className="w-full glass-dark border border-white/10 rounded-lg px-4 py-2"
                  >
                    <option value="all">Tüm Kullanıcılar</option>
                    <option value="premium">Premium Üyeler</option>
                    <option value="tipsters">Tahminçiler</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Kanal</label>
                  <select
                    value={formData.channel}
                    onChange={(e) => setFormData({...formData, channel: e.target.value})}
                    className="w-full glass-dark border border-white/10 rounded-lg px-4 py-2"
                  >
                    <option value="all">Tüm Kanallar</option>
                    <option value="email">Email</option>
                    <option value="push">Push Bildirimi</option>
                  </select>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <Button 
                  onClick={handleEditNotification}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Değişiklikleri Kaydet
                </Button>
                <Button variant="outline" className="glass border-white/10" onClick={() => setShowEditModal(false)}>
                  İptal
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && selectedNotification && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="glass-dark border-red-500/30 w-full max-w-md">
            <CardHeader className="border-b border-white/5">
              <CardTitle className="flex items-center space-x-2 text-red-400">
                <AlertCircle className="h-5 w-5" />
                <span>Bildirimi Sil</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-foreground/80 mb-4">
                <strong>"{selectedNotification.title}"</strong> bildirimini silmek istediğinizden emin misiniz?
              </p>
              <p className="text-sm text-red-400 mb-6">
                Bu işlem geri alınamaz!
              </p>
              <div className="flex space-x-3">
                <Button 
                  onClick={handleDeleteNotification}
                  className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Evet, Sil
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 glass border-white/10" 
                  onClick={() => setShowDeleteModal(false)}
                >
                  İptal
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}