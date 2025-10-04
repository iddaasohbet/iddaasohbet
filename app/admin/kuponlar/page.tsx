'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Search,
  Filter,
  FileText,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  Users,
  Calendar,
  MoreVertical,
  Download,
  Plus,
  X,
  AlertCircle
} from 'lucide-react'

export default function AdminKuponlarPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedCoupons, setSelectedCoupons] = useState<string[]>([])
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedCoupon, setSelectedCoupon] = useState<any>(null)

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    totalOdds: '',
    stake: '',
    status: 'pending',
    matches: [{ team1: '', team2: '', pick: '', odd: '1.00' }]
  })

  // Mock data
  const stats = [
    { label: 'Toplam Kupon', value: '12,458', icon: FileText, color: 'blue' },
    { label: 'Bekleyen', value: '234', icon: Clock, color: 'yellow' },
    { label: 'Kazanan', value: '4,892', icon: CheckCircle, color: 'green' },
    { label: 'Kaybeden', value: '7,332', icon: XCircle, color: 'red' }
  ]

  const [coupons, setCoupons] = useState([
    {
      id: '1',
      user: 'Mehmet Yılmaz',
      username: '@mehmetY',
      title: 'Bugünün En İyi 5\'lisi - Yüksek Oranlı Kupon 🔥',
      matches: 5,
      totalOdds: 12.45,
      stake: 100,
      potentialWin: 1245,
      status: 'pending',
      date: '2025-01-10 14:30',
      views: 1234,
      likes: 89,
      comments: 12
    },
    {
      id: '2',
      user: 'Ahmet Kaya',
      username: '@ahmetK',
      title: 'Garantili 3\'lü Maç',
      matches: 3,
      totalOdds: 3.20,
      stake: 200,
      potentialWin: 640,
      status: 'won',
      date: '2025-01-10 12:15',
      views: 2341,
      likes: 156,
      comments: 34
    },
    {
      id: '3',
      user: 'Fatih Şahin',
      username: '@fatihS',
      title: 'Yüksek Oran Kuponu',
      matches: 8,
      totalOdds: 156.30,
      stake: 50,
      potentialWin: 7815,
      status: 'lost',
      date: '2025-01-10 10:00',
      views: 892,
      likes: 45,
      comments: 8
    }
  ])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'won':
        return <Badge className="bg-green-500/20 border-green-500/30 text-green-400"><CheckCircle className="h-3 w-3 mr-1" />Kazandı</Badge>
      case 'lost':
        return <Badge className="bg-red-500/20 border-red-500/30 text-red-400"><XCircle className="h-3 w-3 mr-1" />Kaybetti</Badge>
      case 'pending':
        return <Badge className="bg-yellow-500/20 border-yellow-500/30 text-yellow-400"><Clock className="h-3 w-3 mr-1" />Bekliyor</Badge>
      default:
        return null
    }
  }

  const handleSelectCoupon = (id: string) => {
    setSelectedCoupons(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const handleSelectAll = () => {
    if (selectedCoupons.length === coupons.length) {
      setSelectedCoupons([])
    } else {
      setSelectedCoupons(coupons.map(c => c.id))
    }
  }

  // Add Coupon
  const handleAddCoupon = () => {
    const newCoupon = {
      id: String(coupons.length + 1),
      user: 'Admin',
      username: '@admin',
      title: formData.title,
      matches: formData.matches.length,
      totalOdds: parseFloat(formData.totalOdds),
      stake: parseFloat(formData.stake),
      potentialWin: parseFloat(formData.totalOdds) * parseFloat(formData.stake),
      status: formData.status,
      date: new Date().toLocaleString('tr-TR'),
      views: 0,
      likes: 0,
      comments: 0
    }
    setCoupons([newCoupon, ...coupons])
    setShowAddModal(false)
    resetForm()
  }

  // Edit Coupon
  const handleEditCoupon = () => {
    setCoupons(coupons.map(c => 
      c.id === selectedCoupon.id 
        ? { ...c, ...formData, totalOdds: parseFloat(formData.totalOdds), stake: parseFloat(formData.stake) }
        : c
    ))
    setShowEditModal(false)
    setSelectedCoupon(null)
    resetForm()
  }

  // Delete Coupon
  const handleDeleteCoupon = () => {
    setCoupons(coupons.filter(c => c.id !== selectedCoupon.id))
    setShowDeleteModal(false)
    setSelectedCoupon(null)
  }

  // Bulk Delete
  const handleBulkDelete = () => {
    setCoupons(coupons.filter(c => !selectedCoupons.includes(c.id)))
    setSelectedCoupons([])
  }

  // Bulk Status Update
  const handleBulkStatusUpdate = (status: string) => {
    setCoupons(coupons.map(c => 
      selectedCoupons.includes(c.id) ? { ...c, status } : c
    ))
    setSelectedCoupons([])
  }

  const openEditModal = (coupon: any) => {
    setSelectedCoupon(coupon)
    setFormData({
      title: coupon.title,
      totalOdds: String(coupon.totalOdds),
      stake: String(coupon.stake),
      status: coupon.status,
      matches: [{ team1: '', team2: '', pick: '', odd: '' }]
    })
    setShowEditModal(true)
  }

  const openDeleteModal = (coupon: any) => {
    setSelectedCoupon(coupon)
    setShowDeleteModal(true)
  }

  const openDetailModal = (coupon: any) => {
    setSelectedCoupon(coupon)
    setShowDetailModal(true)
  }

  const resetForm = () => {
    setFormData({
      title: '',
      totalOdds: '',
      stake: '',
      status: 'pending',
      matches: [{ team1: '', team2: '', pick: '', odd: '1.00' }]
    })
  }

  const addMatch = () => {
    setFormData({
      ...formData,
      matches: [...formData.matches, { team1: '', team2: '', pick: '', odd: '1.00' }]
    })
  }

  const removeMatch = (index: number) => {
    if (formData.matches.length > 1) {
      setFormData({
        ...formData,
        matches: formData.matches.filter((_, i) => i !== index)
      })
    }
  }

  const updateMatch = (index: number, field: string, value: string) => {
    const newMatches = [...formData.matches]
    newMatches[index] = { ...newMatches[index], [field]: value }
    setFormData({
      ...formData,
      matches: newMatches
    })
  }

  const calculateTotalOdds = () => {
    const total = formData.matches.reduce((acc, match) => {
      const odd = parseFloat(match.odd) || 1
      return acc * odd
    }, 1)
    setFormData({
      ...formData,
      totalOdds: total.toFixed(2)
    })
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-text mb-2">Kupon Yönetimi</h1>
          <p className="text-foreground/60">Tüm kuponları görüntüle, düzenle ve yönet</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="glass border-white/10">
            <Download className="h-4 w-4 mr-2" />
            Dışa Aktar
          </Button>
          <Button 
            onClick={() => setShowAddModal(true)}
            className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
          >
            <Plus className="h-4 w-4 mr-2" />
            Yeni Kupon
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="glass-dark border-white/5 hover:border-white/10 transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`h-12 w-12 rounded-xl bg-${stat.color}-500/10 border border-${stat.color}-500/30 flex items-center justify-center`}>
                    <Icon className={`h-6 w-6 text-${stat.color}-400`} />
                  </div>
                  <TrendingUp className="h-5 w-5 text-green-400" />
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
                placeholder="Kullanıcı, başlık veya ID ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="glass-dark border-white/10 pl-10"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-foreground/60" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="glass-dark border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-orange-500/50 min-w-[150px]"
              >
                <option value="all">Tüm Durumlar</option>
                <option value="pending">Bekleyen</option>
                <option value="won">Kazanan</option>
                <option value="lost">Kaybeden</option>
              </select>
            </div>
          </div>

          {selectedCoupons.length > 0 && (
            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
              <p className="text-sm text-foreground/60">
                <strong className="text-orange-400">{selectedCoupons.length}</strong> kupon seçildi
              </p>
              <div className="flex items-center space-x-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="glass border-green-500/30 text-green-400 hover:bg-green-500/10"
                  onClick={() => handleBulkStatusUpdate('won')}
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Kazandı İşaretle
                </Button>
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
            </div>
          )}
        </CardContent>
      </Card>

      {/* Coupons Table */}
      <Card className="glass-dark border-white/5">
        <CardHeader className="border-b border-white/5">
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-400" />
              <span>Kupon Listesi ({coupons.length})</span>
            </span>
            <Button variant="ghost" size="sm" onClick={handleSelectAll} className="text-xs">
              {selectedCoupons.length === coupons.length ? 'Seçimi Kaldır' : 'Tümünü Seç'}
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
                      checked={selectedCoupons.length === coupons.length}
                      onChange={handleSelectAll}
                      className="rounded border-white/20 bg-white/5 cursor-pointer"
                    />
                  </th>
                  <th className="text-left p-4 text-sm font-semibold text-foreground/70">ID</th>
                  <th className="text-left p-4 text-sm font-semibold text-foreground/70">Kullanıcı</th>
                  <th className="text-left p-4 text-sm font-semibold text-foreground/70">Kupon Başlığı</th>
                  <th className="text-left p-4 text-sm font-semibold text-foreground/70">Maç/Oran</th>
                  <th className="text-left p-4 text-sm font-semibold text-foreground/70">Bahis/Kazanç</th>
                  <th className="text-left p-4 text-sm font-semibold text-foreground/70">İstatistik</th>
                  <th className="text-left p-4 text-sm font-semibold text-foreground/70">Durum</th>
                  <th className="text-left p-4 text-sm font-semibold text-foreground/70">Tarih</th>
                  <th className="text-right p-4 text-sm font-semibold text-foreground/70">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {coupons.map((coupon) => (
                  <tr 
                    key={coupon.id}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedCoupons.includes(coupon.id)}
                        onChange={() => handleSelectCoupon(coupon.id)}
                        className="rounded border-white/20 bg-white/5 cursor-pointer"
                      />
                    </td>
                    <td className="p-4">
                      <span className="text-sm font-mono text-foreground/60">#{coupon.id}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                          {coupon.user.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{coupon.user}</p>
                          <p className="text-xs text-foreground/60">{coupon.username}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-medium text-sm max-w-[200px] truncate">{coupon.title}</p>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col space-y-1">
                        <Badge className="glass border-blue-500/30 text-blue-400 w-fit">
                          {coupon.matches} Maç
                        </Badge>
                        <span className="text-sm font-bold text-orange-400">{coupon.totalOdds}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col space-y-1">
                        <span className="text-sm text-foreground/70">₺{coupon.stake}</span>
                        <span className="text-sm font-semibold text-green-400">₺{coupon.potentialWin}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col space-y-1 text-xs text-foreground/60">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-3 w-3" />
                          <span>{coupon.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-3 w-3" />
                          <span>{coupon.likes}/{coupon.comments}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      {getStatusBadge(coupon.status)}
                    </td>
                    <td className="p-4">
                      <span className="text-xs text-foreground/60">{coupon.date}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end space-x-2">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 w-8 p-0 hover:bg-blue-500/10 hover:text-blue-400"
                          onClick={() => openDetailModal(coupon)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 w-8 p-0 hover:bg-green-500/10 hover:text-green-400"
                          onClick={() => openEditModal(coupon)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 w-8 p-0 hover:bg-red-500/10 hover:text-red-400"
                          onClick={() => openDeleteModal(coupon)}
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

          {/* Pagination */}
          <div className="p-4 border-t border-white/5 flex items-center justify-between">
            <p className="text-sm text-foreground/60">
              Toplam <strong className="text-orange-400">{coupons.length}</strong> kupon gösteriliyor
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="glass-dark border-white/10 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="border-b border-white/5">
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center space-x-2">
                  <Plus className="h-5 w-5 text-green-400" />
                  <span>Yeni Kupon Ekle</span>
                </span>
                <Button variant="ghost" size="sm" onClick={() => setShowAddModal(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Kupon Başlığı</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Örn: Bugünün En İyi Kuponu"
                  className="glass-dark border-white/10"
                />
              </div>

              {/* Matches Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Maçlar ({formData.matches.length})</label>
                  <Button 
                    type="button"
                    size="sm"
                    onClick={addMatch}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Maç Ekle
                  </Button>
                </div>

                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                  {formData.matches.map((match, index) => (
                    <div key={index} className="glass p-4 rounded-lg border border-white/5 space-y-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-blue-400">Maç {index + 1}</span>
                        {formData.matches.length > 1 && (
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => removeMatch(index)}
                            className="h-6 w-6 p-0 hover:bg-red-500/10 hover:text-red-400"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          placeholder="Ev Sahibi"
                          value={match.team1}
                          onChange={(e) => updateMatch(index, 'team1', e.target.value)}
                          className="glass-dark border-white/10 text-sm"
                        />
                        <Input
                          placeholder="Deplasman"
                          value={match.team2}
                          onChange={(e) => updateMatch(index, 'team2', e.target.value)}
                          className="glass-dark border-white/10 text-sm"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <select
                          value={match.pick}
                          onChange={(e) => updateMatch(index, 'pick', e.target.value)}
                          className="glass-dark border border-white/10 rounded-lg px-3 py-2 text-sm"
                        >
                          <option value="">Tahmin Seç</option>
                          <option value="1">Ev Sahibi (1)</option>
                          <option value="X">Beraberlik (X)</option>
                          <option value="2">Deplasman (2)</option>
                          <option value="1X">1-X</option>
                          <option value="12">1-2</option>
                          <option value="X2">X-2</option>
                          <option value="Alt 2.5">Alt 2.5</option>
                          <option value="Üst 2.5">Üst 2.5</option>
                          <option value="KG Var">KG Var</option>
                          <option value="KG Yok">KG Yok</option>
                        </select>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="Oran"
                          value={match.odd}
                          onChange={(e) => updateMatch(index, 'odd', e.target.value)}
                          className="glass-dark border-white/10 text-sm"
                        />
                      </div>

                      {match.team1 && match.team2 && match.pick && (
                        <div className="text-xs text-foreground/70 bg-blue-500/5 p-2 rounded">
                          <strong>{match.team1}</strong> vs <strong>{match.team2}</strong> → <span className="text-blue-400">{match.pick}</span> ({match.odd || '1.00'})
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <Button
                  type="button"
                  onClick={calculateTotalOdds}
                  variant="outline"
                  className="w-full glass border-orange-500/30 hover:bg-orange-500/10"
                >
                  🎲 Toplam Oranı Hesapla
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Toplam Oran</label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.totalOdds}
                    onChange={(e) => setFormData({...formData, totalOdds: e.target.value})}
                    placeholder="Otomatik hesaplanır"
                    className="glass-dark border-white/10"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Bahis Tutarı (₺)</label>
                  <Input
                    type="number"
                    value={formData.stake}
                    onChange={(e) => setFormData({...formData, stake: e.target.value})}
                    placeholder="Örn: 100"
                    className="glass-dark border-white/10"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Durum</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full glass-dark border border-white/10 rounded-lg px-4 py-2"
                >
                  <option value="pending">Bekliyor</option>
                  <option value="won">Kazandı</option>
                  <option value="lost">Kaybetti</option>
                </select>
              </div>

              {formData.totalOdds && formData.stake && (
                <div className="glass p-4 rounded-lg border border-green-500/30 bg-green-500/5">
                  <p className="text-sm text-foreground/60 mb-1">Potansiyel Kazanç:</p>
                  <p className="text-2xl font-bold text-green-400">
                    ₺{(parseFloat(formData.totalOdds) * parseFloat(formData.stake)).toFixed(2)}
                  </p>
                </div>
              )}

              <div className="flex space-x-3 pt-4">
                <Button 
                  onClick={handleAddCoupon}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  disabled={!formData.title || !formData.totalOdds || !formData.stake}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Kupon Ekle
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
      {showEditModal && selectedCoupon && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="glass-dark border-white/10 w-full max-w-2xl">
            <CardHeader className="border-b border-white/5">
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center space-x-2">
                  <Edit className="h-5 w-5 text-blue-400" />
                  <span>Kupon Düzenle</span>
                </span>
                <Button variant="ghost" size="sm" onClick={() => setShowEditModal(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Kupon Başlığı</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="glass-dark border-white/10"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Toplam Oran</label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.totalOdds}
                    onChange={(e) => setFormData({...formData, totalOdds: e.target.value})}
                    className="glass-dark border-white/10"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Bahis Tutarı (₺)</label>
                  <Input
                    type="number"
                    value={formData.stake}
                    onChange={(e) => setFormData({...formData, stake: e.target.value})}
                    className="glass-dark border-white/10"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Durum</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full glass-dark border border-white/10 rounded-lg px-4 py-2"
                >
                  <option value="pending">Bekliyor</option>
                  <option value="won">Kazandı</option>
                  <option value="lost">Kaybetti</option>
                </select>
              </div>

              <div className="flex space-x-3 pt-4">
                <Button 
                  onClick={handleEditCoupon}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
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

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedCoupon && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="glass-dark border-red-500/30 w-full max-w-md">
            <CardHeader className="border-b border-white/5">
              <CardTitle className="flex items-center space-x-2 text-red-400">
                <AlertCircle className="h-5 w-5" />
                <span>Kupon Sil</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-foreground/80 mb-4">
                <strong>"{selectedCoupon.title}"</strong> başlıklı kuponu silmek istediğinizden emin misiniz?
              </p>
              <p className="text-sm text-red-400 mb-6">
                Bu işlem geri alınamaz!
              </p>
              <div className="flex space-x-3">
                <Button 
                  onClick={handleDeleteCoupon}
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
      {showDetailModal && selectedCoupon && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="glass-dark border-white/10 w-full max-w-2xl">
            <CardHeader className="border-b border-white/5">
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center space-x-2">
                  <Eye className="h-5 w-5 text-blue-400" />
                  <span>Kupon Detayları</span>
                </span>
                <Button variant="ghost" size="sm" onClick={() => setShowDetailModal(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-foreground/60">ID:</span>
                  <span className="font-mono">#{selectedCoupon.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/60">Kullanıcı:</span>
                  <span className="font-semibold">{selectedCoupon.user}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/60">Başlık:</span>
                  <span className="font-semibold">{selectedCoupon.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/60">Maç Sayısı:</span>
                  <Badge className="glass border-blue-500/30 text-blue-400">{selectedCoupon.matches} Maç</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/60">Toplam Oran:</span>
                  <span className="text-xl font-bold text-orange-400">{selectedCoupon.totalOdds}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/60">Bahis:</span>
                  <span className="font-bold">₺{selectedCoupon.stake}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/60">Potansiyel Kazanç:</span>
                  <span className="text-xl font-bold text-green-400">₺{selectedCoupon.potentialWin}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/60">Durum:</span>
                  {getStatusBadge(selectedCoupon.status)}
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/60">Tarih:</span>
                  <span className="text-sm">{selectedCoupon.date}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/5">
                <div className="text-center glass p-3 rounded-lg">
                  <Eye className="h-5 w-5 text-blue-400 mx-auto mb-1" />
                  <p className="text-xl font-bold">{selectedCoupon.views}</p>
                  <p className="text-xs text-foreground/60">Görüntülenme</p>
                </div>
                <div className="text-center glass p-3 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-400 mx-auto mb-1" />
                  <p className="text-xl font-bold">{selectedCoupon.likes}</p>
                  <p className="text-xs text-foreground/60">Beğeni</p>
                </div>
                <div className="text-center glass p-3 rounded-lg">
                  <Users className="h-5 w-5 text-purple-400 mx-auto mb-1" />
                  <p className="text-xl font-bold">{selectedCoupon.comments}</p>
                  <p className="text-xs text-foreground/60">Yorum</p>
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