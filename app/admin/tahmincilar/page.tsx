'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Search,
  SlidersHorizontal,
  Trophy,
  Eye,
  Edit,
  Ban,
  Star,
  TrendingUp,
  TrendingDown,
  Users,
  Target,
  Award,
  Crown,
  MoreVertical,
  Download,
  CheckCircle,
  XCircle,
  Zap,
  Calendar,
  FileText,
  Trash2,
  X,
  AlertCircle,
  UserPlus
} from 'lucide-react'

export default function AdminTahmincilarPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterTier, setFilterTier] = useState('all')
  const [selectedTipsters, setSelectedTipsters] = useState<string[]>([])

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedTipster, setSelectedTipster] = useState<any>(null)

  // Form data
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    tier: 'beginner',
    featured: false,
    status: 'active'
  })

  // Mock data
  const stats = [
    { label: 'Toplam Tahminci', value: '342', icon: Trophy, color: 'blue', trend: '+23' },
    { label: 'Aktif Tahminci', value: '289', icon: Target, color: 'green', trend: '+18' },
    { label: 'Premium Tahminci', value: '67', icon: Crown, color: 'yellow', trend: '+5' },
    { label: 'Öne Çıkanlar', value: '12', icon: Star, color: 'purple', trend: '+2' }
  ]

  const [tipsters, setTipsters] = useState([
    {
      id: '1',
      name: 'Serkan Aydın',
      username: 'ProTahminci',
      avatar: 'S',
      tier: 'legendary',
      featured: true,
      totalCoupons: 234,
      wonCoupons: 184,
      winRate: 78.5,
      avgOdds: 4.2,
      totalProfit: 12450,
      followers: 1234,
      joinDate: '2024-01-05',
      lastActive: '5 dk önce',
      status: 'active',
      monthlyStats: {
        coupons: 24,
        wins: 19,
        profit: 2340
      }
    },
    {
      id: '2',
      name: 'Ahmet Kaya',
      username: 'KralBahis',
      avatar: 'A',
      tier: 'master',
      featured: true,
      totalCoupons: 189,
      wonCoupons: 144,
      winRate: 76.2,
      avgOdds: 3.8,
      totalProfit: 9870,
      followers: 892,
      joinDate: '2024-02-12',
      lastActive: '12 dk önce',
      status: 'active',
      monthlyStats: {
        coupons: 18,
        wins: 14,
        profit: 1890
      }
    },
    {
      id: '3',
      name: 'Emre Bulut',
      username: 'GolKrali',
      avatar: 'E',
      tier: 'expert',
      featured: false,
      totalCoupons: 167,
      wonCoupons: 125,
      winRate: 74.8,
      avgOdds: 5.1,
      totalProfit: 8234,
      followers: 456,
      joinDate: '2024-03-20',
      lastActive: '1 saat önce',
      status: 'active',
      monthlyStats: {
        coupons: 15,
        wins: 11,
        profit: 1234
      }
    }
  ])

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case 'legendary':
        return <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 border-0"><Crown className="h-3 w-3 mr-1" />Efsane</Badge>
      case 'master':
        return <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 border-0"><Star className="h-3 w-3 mr-1" />Master</Badge>
      case 'expert':
        return <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 border-0"><Trophy className="h-3 w-3 mr-1" />Uzman</Badge>
      case 'advanced':
        return <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 border-0"><Zap className="h-3 w-3 mr-1" />İleri</Badge>
      case 'beginner':
        return <Badge className="bg-gray-500/20 border-gray-500/30 text-gray-400">Başlangıç</Badge>
      default:
        return null
    }
  }

  const handleSelectTipster = (id: string) => {
    setSelectedTipsters(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const handleSelectAll = () => {
    if (selectedTipsters.length === tipsters.length) {
      setSelectedTipsters([])
    } else {
      setSelectedTipsters(tipsters.map(t => t.id))
    }
  }

  // Add Tipster
  const handleAddTipster = () => {
    const newTipster = {
      id: String(tipsters.length + 1),
      name: formData.name,
      username: formData.username,
      avatar: formData.name.charAt(0).toUpperCase(),
      tier: formData.tier,
      featured: formData.featured,
      totalCoupons: 0,
      wonCoupons: 0,
      winRate: 0,
      avgOdds: 0,
      totalProfit: 0,
      followers: 0,
      joinDate: new Date().toISOString().split('T')[0],
      lastActive: 'Az önce',
      status: formData.status,
      monthlyStats: {
        coupons: 0,
        wins: 0,
        profit: 0
      }
    }
    setTipsters([newTipster, ...tipsters])
    setShowAddModal(false)
    resetForm()
  }

  // Edit Tipster
  const handleEditTipster = () => {
    setTipsters(tipsters.map(t => 
      t.id === selectedTipster.id 
        ? { ...t, name: formData.name, username: formData.username, tier: formData.tier, featured: formData.featured, status: formData.status }
        : t
    ))
    setShowEditModal(false)
    setSelectedTipster(null)
    resetForm()
  }

  // Delete Tipster
  const handleDeleteTipster = () => {
    setTipsters(tipsters.filter(t => t.id !== selectedTipster.id))
    setShowDeleteModal(false)
    setSelectedTipster(null)
  }

  // Bulk Actions
  const handleBulkFeature = () => {
    setTipsters(tipsters.map(t => 
      selectedTipsters.includes(t.id) ? { ...t, featured: true } : t
    ))
    setSelectedTipsters([])
  }

  const handleBulkUnfeature = () => {
    setTipsters(tipsters.map(t => 
      selectedTipsters.includes(t.id) ? { ...t, featured: false } : t
    ))
    setSelectedTipsters([])
  }

  const handleBulkBan = () => {
    setTipsters(tipsters.map(t => 
      selectedTipsters.includes(t.id) ? { ...t, status: 'banned' } : t
    ))
    setSelectedTipsters([])
  }

  const handleBulkDelete = () => {
    setTipsters(tipsters.filter(t => !selectedTipsters.includes(t.id)))
    setSelectedTipsters([])
  }

  const openEditModal = (tipster: any) => {
    setSelectedTipster(tipster)
    setFormData({
      name: tipster.name,
      username: tipster.username,
      tier: tipster.tier,
      featured: tipster.featured,
      status: tipster.status
    })
    setShowEditModal(true)
  }

  const openDeleteModal = (tipster: any) => {
    setSelectedTipster(tipster)
    setShowDeleteModal(true)
  }

  const openDetailModal = (tipster: any) => {
    setSelectedTipster(tipster)
    setShowDetailModal(true)
  }

  const resetForm = () => {
    setFormData({
      name: '',
      username: '',
      tier: 'beginner',
      featured: false,
      status: 'active'
    })
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-text mb-2">Tahminci Yönetimi</h1>
          <p className="text-foreground/60">Tüm tahminçileri görüntüle, düzenle ve yönet</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="glass border-white/10">
            <Download className="h-4 w-4 mr-2" />
            Rapor İndir
          </Button>
          <Button 
            onClick={() => setShowAddModal(true)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Yeni Tahminci
          </Button>
        </div>
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
                    +{stat.trend}
                  </Badge>
                </div>
                <p className="text-foreground/60 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Filters & Search */}
      <Card className="glass-dark border-white/5">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
              <Input
                type="search"
                placeholder="Tahminci adı veya kullanıcı adı ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="glass-dark border-white/10 pl-10"
              />
            </div>

            <div className="flex items-center space-x-2">
              <SlidersHorizontal className="h-4 w-4 text-foreground/60" />
              <select
                value={filterTier}
                onChange={(e) => setFilterTier(e.target.value)}
                className="glass-dark border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-orange-500/50 min-w-[150px]"
              >
                <option value="all">Tüm Seviyeler</option>
                <option value="legendary">Efsane</option>
                <option value="master">Master</option>
                <option value="expert">Uzman</option>
                <option value="advanced">İleri</option>
                <option value="beginner">Başlangıç</option>
              </select>
            </div>
          </div>

          {selectedTipsters.length > 0 && (
            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
              <p className="text-sm text-foreground/60">
                <strong className="text-orange-400">{selectedTipsters.length}</strong> tahminci seçildi
              </p>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline" className="glass border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10" onClick={handleBulkFeature}>
                  <Star className="h-4 w-4 mr-1" />
                  Öne Çıkar
                </Button>
                <Button size="sm" variant="outline" className="glass border-gray-500/30 text-gray-400 hover:bg-gray-500/10" onClick={handleBulkUnfeature}>
                  <XCircle className="h-4 w-4 mr-1" />
                  Kaldır
                </Button>
                <Button size="sm" variant="outline" className="glass border-red-500/30 text-red-400 hover:bg-red-500/10" onClick={handleBulkBan}>
                  <Ban className="h-4 w-4 mr-1" />
                  Yasakla
                </Button>
                <Button size="sm" variant="outline" className="glass border-red-500/30 text-red-400 hover:bg-red-500/10" onClick={handleBulkDelete}>
                  <Trash2 className="h-4 w-4 mr-1" />
                  Sil
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tipsters Table */}
      <Card className="glass-dark border-white/5">
        <CardHeader className="border-b border-white/5">
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-blue-400" />
              <span>Tahminci Listesi ({tipsters.length})</span>
            </span>
            <Button variant="ghost" size="sm" onClick={handleSelectAll} className="text-xs">
              {selectedTipsters.length === tipsters.length ? 'Seçimi Kaldır' : 'Tümünü Seç'}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-white/5 bg-white/5">
                <tr>
                  <th className="text-left p-4 text-sm font-semibold text-foreground/70">
                    <input
                      type="checkbox"
                      checked={selectedTipsters.length === tipsters.length}
                      onChange={handleSelectAll}
                      className="rounded border-white/20 bg-white/5 cursor-pointer"
                    />
                  </th>
                  <th className="text-left p-4 text-sm font-semibold text-foreground/70">Tahminci</th>
                  <th className="text-left p-4 text-sm font-semibold text-foreground/70">Seviye</th>
                  <th className="text-left p-4 text-sm font-semibold text-foreground/70">İstatistikler</th>
                  <th className="text-left p-4 text-sm font-semibold text-foreground/70">Başarı Oranı</th>
                  <th className="text-left p-4 text-sm font-semibold text-foreground/70">Takipçi</th>
                  <th className="text-left p-4 text-sm font-semibold text-foreground/70">Durum</th>
                  <th className="text-right p-4 text-sm font-semibold text-foreground/70">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {tipsters.map((tipster) => (
                  <tr 
                    key={tipster.id}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedTipsters.includes(tipster.id)}
                        onChange={() => handleSelectTipster(tipster.id)}
                        className="rounded border-white/20 bg-white/5 cursor-pointer"
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                            {tipster.avatar}
                          </div>
                          {tipster.featured && (
                            <div className="absolute -top-1 -right-1 h-5 w-5 bg-yellow-500 rounded-full flex items-center justify-center">
                              <Star className="h-3 w-3 text-white" fill="white" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{tipster.name}</p>
                          <p className="text-xs text-foreground/60">@{tipster.username}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      {getTierBadge(tipster.tier)}
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col space-y-1">
                        <span className="text-xs text-foreground/60">{tipster.totalCoupons} kupon</span>
                        <span className="text-xs text-green-400">{tipster.wonCoupons} kazanan</span>
                        <span className="text-xs text-blue-400">₺{tipster.totalProfit.toLocaleString()} kâr</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 max-w-[100px]">
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                              style={{ width: `${tipster.winRate}%` }}
                            />
                          </div>
                        </div>
                        <span className="text-sm font-semibold text-green-400">{tipster.winRate}%</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4 text-foreground/40" />
                        <span className="text-sm font-semibold">{tipster.followers}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      {tipster.status === 'active' ? (
                        <Badge className="bg-green-500/20 border-green-500/30 text-green-400">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Aktif
                        </Badge>
                      ) : (
                        <Badge className="bg-red-500/20 border-red-500/30 text-red-400">
                          <Ban className="h-3 w-3 mr-1" />
                          Yasaklı
                        </Badge>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end space-x-2">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 w-8 p-0 hover:bg-blue-500/10 hover:text-blue-400"
                          onClick={() => openDetailModal(tipster)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 w-8 p-0 hover:bg-green-500/10 hover:text-green-400"
                          onClick={() => openEditModal(tipster)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 w-8 p-0 hover:bg-red-500/10 hover:text-red-400"
                          onClick={() => openDeleteModal(tipster)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-white/5">
            <p className="text-sm text-foreground/60">
              Toplam <strong className="text-orange-400">{tipsters.length}</strong> tahminci gösteriliyor
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="glass-dark border-white/10 w-full max-w-xl">
            <CardHeader className="border-b border-white/5">
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center space-x-2">
                  <UserPlus className="h-5 w-5 text-purple-400" />
                  <span>Yeni Tahminci Ekle</span>
                </span>
                <Button variant="ghost" size="sm" onClick={() => setShowAddModal(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Ad Soyad</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Örn: Serkan Aydın"
                    className="glass-dark border-white/10"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Kullanıcı Adı</label>
                  <Input
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                    placeholder="Örn: ProTahminci"
                    className="glass-dark border-white/10"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Seviye</label>
                <select
                  value={formData.tier}
                  onChange={(e) => setFormData({...formData, tier: e.target.value})}
                  className="w-full glass-dark border border-white/10 rounded-lg px-4 py-2"
                >
                  <option value="beginner">Başlangıç</option>
                  <option value="advanced">İleri</option>
                  <option value="expert">Uzman</option>
                  <option value="master">Master</option>
                  <option value="legendary">Efsane</option>
                </select>
              </div>

              <div className="flex items-center justify-between glass p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-400" fill={formData.featured ? 'currentColor' : 'none'} />
                  <div>
                    <p className="font-medium text-sm">Öne Çıkan Tahminci</p>
                    <p className="text-xs text-foreground/60">Anasayfada gösterilir</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                  className="rounded border-white/20 bg-white/5 cursor-pointer h-5 w-5"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <Button 
                  onClick={handleAddTipster}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  disabled={!formData.name || !formData.username}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Tahminci Ekle
                </Button>
                <Button variant="outline" className="glass border-white/10" onClick={() => setShowAddModal(false)}>
                  İptal
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedTipster && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="glass-dark border-white/10 w-full max-w-xl">
            <CardHeader className="border-b border-white/5">
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center space-x-2">
                  <Edit className="h-5 w-5 text-blue-400" />
                  <span>Tahminci Düzenle</span>
                </span>
                <Button variant="ghost" size="sm" onClick={() => setShowEditModal(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Ad Soyad</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="glass-dark border-white/10"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Kullanıcı Adı</label>
                  <Input
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                    className="glass-dark border-white/10"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Seviye</label>
                <select
                  value={formData.tier}
                  onChange={(e) => setFormData({...formData, tier: e.target.value})}
                  className="w-full glass-dark border border-white/10 rounded-lg px-4 py-2"
                >
                  <option value="beginner">Başlangıç</option>
                  <option value="advanced">İleri</option>
                  <option value="expert">Uzman</option>
                  <option value="master">Master</option>
                  <option value="legendary">Efsane</option>
                </select>
              </div>

              <div className="flex items-center justify-between glass p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-400" fill={formData.featured ? 'currentColor' : 'none'} />
                  <div>
                    <p className="font-medium text-sm">Öne Çıkan Tahminci</p>
                    <p className="text-xs text-foreground/60">Anasayfada gösterilir</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                  className="rounded border-white/20 bg-white/5 cursor-pointer h-5 w-5"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <Button 
                  onClick={handleEditTipster}
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
      {showDeleteModal && selectedTipster && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="glass-dark border-red-500/30 w-full max-w-md">
            <CardHeader className="border-b border-white/5">
              <CardTitle className="flex items-center space-x-2 text-red-400">
                <AlertCircle className="h-5 w-5" />
                <span>Tahminci Sil</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-foreground/80 mb-4">
                <strong>"{selectedTipster.name}"</strong> tahmin cîsini silmek istediğinizden emin misiniz?
              </p>
              <p className="text-sm text-red-400 mb-6">
                Bu işlem geri alınamaz! Tahminciyle ilgili tüm kuponlar ve veriler silinecektir.
              </p>
              <div className="flex space-x-3">
                <Button 
                  onClick={handleDeleteTipster}
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

      {/* Detail Modal */}
      {showDetailModal && selectedTipster && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="glass-dark border-white/10 w-full max-w-2xl">
            <CardHeader className="border-b border-white/5">
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center space-x-2">
                  <Eye className="h-5 w-5 text-blue-400" />
                  <span>Tahminci Detayları</span>
                </span>
                <Button variant="ghost" size="sm" onClick={() => setShowDetailModal(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="h-20 w-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-3xl">
                    {selectedTipster.avatar}
                  </div>
                  {selectedTipster.featured && (
                    <div className="absolute -top-2 -right-2 h-8 w-8 bg-yellow-500 rounded-full flex items-center justify-center">
                      <Star className="h-5 w-5 text-white" fill="white" />
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{selectedTipster.name}</h3>
                  <p className="text-foreground/60">@{selectedTipster.username}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    {getTierBadge(selectedTipster.tier)}
                    {selectedTipster.status === 'active' ? (
                      <Badge className="bg-green-500/20 border-green-500/30 text-green-400">Aktif</Badge>
                    ) : (
                      <Badge className="bg-red-500/20 border-red-500/30 text-red-400">Yasaklı</Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="glass p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold text-blue-400">{selectedTipster.totalCoupons}</p>
                  <p className="text-xs text-foreground/60">Toplam Kupon</p>
                </div>
                <div className="glass p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold text-green-400">{selectedTipster.winRate}%</p>
                  <p className="text-xs text-foreground/60">Başarı Oranı</p>
                </div>
                <div className="glass p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold text-purple-400">{selectedTipster.followers}</p>
                  <p className="text-xs text-foreground/60">Takipçi</p>
                </div>
                <div className="glass p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold text-orange-400">₺{selectedTipster.totalProfit.toLocaleString()}</p>
                  <p className="text-xs text-foreground/60">Toplam Kâr</p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Aylık Performans</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="glass p-3 rounded-lg">
                    <p className="text-xl font-bold text-blue-400">{selectedTipster.monthlyStats.coupons}</p>
                    <p className="text-xs text-foreground/60">Kupon</p>
                  </div>
                  <div className="glass p-3 rounded-lg">
                    <p className="text-xl font-bold text-green-400">{selectedTipster.monthlyStats.wins}</p>
                    <p className="text-xs text-foreground/60">Kazanan</p>
                  </div>
                  <div className="glass p-3 rounded-lg">
                    <p className="text-xl font-bold text-orange-400">₺{selectedTipster.monthlyStats.profit}</p>
                    <p className="text-xs text-foreground/60">Kâr</p>
                  </div>
                </div>
              </div>

              <Button 
                className="w-full glass border-white/10" 
                onClick={() => setShowDetailModal(false)}
              >
                Kapat
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}