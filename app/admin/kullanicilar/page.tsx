'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Search,
  SlidersHorizontal,
  Users,
  Eye,
  Edit,
  Trash2,
  Ban,
  CheckCircle,
  XCircle,
  UserPlus,
  TrendingUp,
  Mail,
  Calendar,
  MoreVertical,
  Download,
  Shield,
  Crown,
  Star,
  Activity,
  X,
  AlertCircle,
  Plus
} from 'lucide-react'

export default function AdminKullanicilarPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterRole, setFilterRole] = useState('all')
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    role: 'user',
    status: 'active',
    verified: false
  })

  // Mock data
  const stats = [
    { label: 'Toplam Kullanıcı', value: '8,234', icon: Users, color: 'blue', trend: '+12%' },
    { label: 'Aktif Kullanıcı', value: '5,892', icon: Activity, color: 'green', trend: '+8%' },
    { label: 'Yeni Üyeler (30 gün)', value: '342', icon: UserPlus, color: 'purple', trend: '+15%' },
    { label: 'Premium Üyeler', value: '1,234', icon: Crown, color: 'yellow', trend: '+5%' }
  ]

  const [users, setUsers] = useState([
    {
      id: '1',
      name: 'Mehmet Yılmaz',
      username: 'mehmetY',
      email: 'mehmet@example.com',
      avatar: 'M',
      role: 'user',
      status: 'active',
      joinDate: '2024-05-15',
      lastActive: '2 dk önce',
      coupons: 45,
      winRate: 68.5,
      followers: 234,
      following: 89,
      verified: true
    },
    {
      id: '2',
      name: 'Ahmet Kaya',
      username: 'ahmetK',
      email: 'ahmet@example.com',
      avatar: 'A',
      role: 'premium',
      status: 'active',
      joinDate: '2024-03-20',
      lastActive: '15 dk önce',
      coupons: 128,
      winRate: 72.3,
      followers: 567,
      following: 123,
      verified: true
    },
    {
      id: '3',
      name: 'Fatih Şahin',
      username: 'fatihS',
      email: 'fatih@example.com',
      avatar: 'F',
      role: 'user',
      status: 'inactive',
      joinDate: '2024-08-10',
      lastActive: '3 saat önce',
      coupons: 23,
      winRate: 45.2,
      followers: 89,
      following: 45,
      verified: false
    }
  ])

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <Badge className="bg-red-500/20 border-red-500/30 text-red-400"><Shield className="h-3 w-3 mr-1" />Admin</Badge>
      case 'moderator':
        return <Badge className="bg-purple-500/20 border-purple-500/30 text-purple-400"><Star className="h-3 w-3 mr-1" />Moderatör</Badge>
      case 'premium':
        return <Badge className="bg-yellow-500/20 border-yellow-500/30 text-yellow-400"><Crown className="h-3 w-3 mr-1" />Premium</Badge>
      case 'user':
        return <Badge className="bg-blue-500/20 border-blue-500/30 text-blue-400">Kullanıcı</Badge>
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500/20 border-green-500/30 text-green-400"><CheckCircle className="h-3 w-3 mr-1" />Aktif</Badge>
      case 'inactive':
        return <Badge className="bg-gray-500/20 border-gray-500/30 text-gray-400">Pasif</Badge>
      case 'banned':
        return <Badge className="bg-red-500/20 border-red-500/30 text-red-400"><Ban className="h-3 w-3 mr-1" />Yasaklı</Badge>
      default:
        return null
    }
  }

  const handleSelectUser = (id: string) => {
    setSelectedUsers(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const handleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(users.map(u => u.id))
    }
  }

  // Add User
  const handleAddUser = () => {
    const newUser = {
      id: String(users.length + 1),
      name: formData.name,
      username: formData.username,
      email: formData.email,
      avatar: formData.name.charAt(0).toUpperCase(),
      role: formData.role,
      status: formData.status,
      joinDate: new Date().toISOString().split('T')[0],
      lastActive: 'Az önce',
      coupons: 0,
      winRate: 0,
      followers: 0,
      following: 0,
      verified: formData.verified
    }
    setUsers([newUser, ...users])
    setShowAddModal(false)
    resetForm()
  }

  // Edit User
  const handleEditUser = () => {
    setUsers(users.map(u => 
      u.id === selectedUser.id 
        ? { ...u, ...formData, avatar: formData.name.charAt(0).toUpperCase() }
        : u
    ))
    setShowEditModal(false)
    setSelectedUser(null)
    resetForm()
  }

  // Delete User
  const handleDeleteUser = () => {
    setUsers(users.filter(u => u.id !== selectedUser.id))
    setShowDeleteModal(false)
    setSelectedUser(null)
  }

  // Bulk Delete
  const handleBulkDelete = () => {
    setUsers(users.filter(u => !selectedUsers.includes(u.id)))
    setSelectedUsers([])
  }

  // Bulk Status Update
  const handleBulkStatusUpdate = (status: string) => {
    setUsers(users.map(u => 
      selectedUsers.includes(u.id) ? { ...u, status } : u
    ))
    setSelectedUsers([])
  }

  // Bulk Activate
  const handleBulkActivate = () => {
    handleBulkStatusUpdate('active')
  }

  // Bulk Ban
  const handleBulkBan = () => {
    handleBulkStatusUpdate('banned')
  }

  const openEditModal = (user: any) => {
    setSelectedUser(user)
    setFormData({
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role,
      status: user.status,
      verified: user.verified
    })
    setShowEditModal(true)
  }

  const openDeleteModal = (user: any) => {
    setSelectedUser(user)
    setShowDeleteModal(true)
  }

  const openDetailModal = (user: any) => {
    setSelectedUser(user)
    setShowDetailModal(true)
  }

  const resetForm = () => {
    setFormData({
      name: '',
      username: '',
      email: '',
      role: 'user',
      status: 'active',
      verified: false
    })
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-text mb-2">Kullanıcı Yönetimi</h1>
          <p className="text-foreground/60">Tüm kullanıcıları görüntüle, düzenle ve yönet</p>
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
            <UserPlus className="h-4 w-4 mr-2" />
            Yeni Kullanıcı
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

      {/* Filters & Search */}
      <Card className="glass-dark border-white/5">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
              <Input
                type="search"
                placeholder="İsim, email veya kullanıcı adı ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="glass-dark border-white/10 pl-10"
              />
            </div>

            <div className="flex items-center space-x-2">
              <SlidersHorizontal className="h-4 w-4 text-foreground/60" />
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="glass-dark border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-orange-500/50 min-w-[150px]"
              >
                <option value="all">Tüm Roller</option>
                <option value="admin">Admin</option>
                <option value="moderator">Moderatör</option>
                <option value="premium">Premium</option>
                <option value="user">Kullanıcı</option>
              </select>
            </div>
          </div>

          {selectedUsers.length > 0 && (
            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
              <p className="text-sm text-foreground/60">
                <strong className="text-orange-400">{selectedUsers.length}</strong> kullanıcı seçildi
              </p>
              <div className="flex items-center space-x-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="glass border-green-500/30 text-green-400 hover:bg-green-500/10"
                  onClick={handleBulkActivate}
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Aktif Yap
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="glass border-red-500/30 text-red-400 hover:bg-red-500/10"
                  onClick={handleBulkBan}
                >
                  <Ban className="h-4 w-4 mr-1" />
                  Yasakla
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

      {/* Users Table */}
      <Card className="glass-dark border-white/5">
        <CardHeader className="border-b border-white/5">
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-400" />
              <span>Kullanıcı Listesi ({users.length})</span>
            </span>
            <Button variant="ghost" size="sm" onClick={handleSelectAll} className="text-xs">
              {selectedUsers.length === users.length ? 'Seçimi Kaldır' : 'Tümünü Seç'}
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
                      checked={selectedUsers.length === users.length}
                      onChange={handleSelectAll}
                      className="rounded border-white/20 bg-white/5 cursor-pointer"
                    />
                  </th>
                  <th className="text-left p-4 text-sm font-semibold text-foreground/70">Kullanıcı</th>
                  <th className="text-left p-4 text-sm font-semibold text-foreground/70">Email</th>
                  <th className="text-left p-4 text-sm font-semibold text-foreground/70">Rol</th>
                  <th className="text-left p-4 text-sm font-semibold text-foreground/70">Durum</th>
                  <th className="text-left p-4 text-sm font-semibold text-foreground/70">İstatistikler</th>
                  <th className="text-left p-4 text-sm font-semibold text-foreground/70">Kayıt Tarihi</th>
                  <th className="text-right p-4 text-sm font-semibold text-foreground/70">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr 
                    key={user.id}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleSelectUser(user.id)}
                        className="rounded border-white/20 bg-white/5 cursor-pointer"
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                            {user.avatar}
                          </div>
                          {user.verified && (
                            <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-slate-900 flex items-center justify-center">
                              <CheckCircle className="h-2.5 w-2.5 text-white" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{user.name}</p>
                          <p className="text-xs text-foreground/60">@{user.username}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-foreground/40" />
                        <span className="text-sm text-foreground/70">{user.email}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      {getRoleBadge(user.role)}
                    </td>
                    <td className="p-4">
                      {getStatusBadge(user.status)}
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col space-y-1">
                        <span className="text-sm font-semibold text-blue-400">{user.coupons} Kupon</span>
                        <span className="text-xs text-green-400">{user.winRate}% Başarı</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-foreground/40" />
                        <span className="text-xs text-foreground/60">{user.joinDate}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end space-x-2">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 w-8 p-0 hover:bg-blue-500/10 hover:text-blue-400"
                          onClick={() => openDetailModal(user)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 w-8 p-0 hover:bg-green-500/10 hover:text-green-400"
                          onClick={() => openEditModal(user)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 w-8 p-0 hover:bg-red-500/10 hover:text-red-400"
                          onClick={() => openDeleteModal(user)}
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
              Toplam <strong className="text-orange-400">{users.length}</strong> kullanıcı gösteriliyor
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="glass-dark border-white/10 w-full max-w-2xl">
            <CardHeader className="border-b border-white/5">
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center space-x-2">
                  <UserPlus className="h-5 w-5 text-green-400" />
                  <span>Yeni Kullanıcı Ekle</span>
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
                    placeholder="Örn: Ahmet Yılmaz"
                    className="glass-dark border-white/10"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Kullanıcı Adı</label>
                  <Input
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                    placeholder="Örn: ahmetY"
                    className="glass-dark border-white/10"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Email</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="Örn: ahmet@example.com"
                  className="glass-dark border-white/10"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Rol</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    className="w-full glass-dark border border-white/10 rounded-lg px-4 py-2"
                  >
                    <option value="user">Kullanıcı</option>
                    <option value="premium">Premium</option>
                    <option value="moderator">Moderatör</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Durum</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full glass-dark border border-white/10 rounded-lg px-4 py-2"
                  >
                    <option value="active">Aktif</option>
                    <option value="inactive">Pasif</option>
                    <option value="banned">Yasaklı</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.verified}
                  onChange={(e) => setFormData({...formData, verified: e.target.checked})}
                  className="rounded border-white/20 bg-white/5 cursor-pointer"
                />
                <label className="text-sm">Doğrulanmış Kullanıcı</label>
              </div>

              <div className="flex space-x-3 pt-4">
                <Button 
                  onClick={handleAddUser}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  disabled={!formData.name || !formData.username || !formData.email}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Kullanıcı Ekle
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
      {showEditModal && selectedUser && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="glass-dark border-white/10 w-full max-w-2xl">
            <CardHeader className="border-b border-white/5">
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center space-x-2">
                  <Edit className="h-5 w-5 text-blue-400" />
                  <span>Kullanıcı Düzenle</span>
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
                <label className="text-sm font-medium mb-2 block">Email</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="glass-dark border-white/10"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Rol</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    className="w-full glass-dark border border-white/10 rounded-lg px-4 py-2"
                  >
                    <option value="user">Kullanıcı</option>
                    <option value="premium">Premium</option>
                    <option value="moderator">Moderatör</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Durum</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full glass-dark border border-white/10 rounded-lg px-4 py-2"
                  >
                    <option value="active">Aktif</option>
                    <option value="inactive">Pasif</option>
                    <option value="banned">Yasaklı</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.verified}
                  onChange={(e) => setFormData({...formData, verified: e.target.checked})}
                  className="rounded border-white/20 bg-white/5 cursor-pointer"
                />
                <label className="text-sm">Doğrulanmış Kullanıcı</label>
              </div>

              <div className="flex space-x-3 pt-4">
                <Button 
                  onClick={handleEditUser}
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
      {showDeleteModal && selectedUser && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="glass-dark border-red-500/30 w-full max-w-md">
            <CardHeader className="border-b border-white/5">
              <CardTitle className="flex items-center space-x-2 text-red-400">
                <AlertCircle className="h-5 w-5" />
                <span>Kullanıcı Sil</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-foreground/80 mb-4">
                <strong>"{selectedUser.name}"</strong> kullanıcısını silmek istediğinizden emin misiniz?
              </p>
              <p className="text-sm text-red-400 mb-6">
                Bu işlem geri alınamaz! Kullanıcının tüm kuponları ve yorumları silinecektir.
              </p>
              <div className="flex space-x-3">
                <Button 
                  onClick={handleDeleteUser}
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
      {showDetailModal && selectedUser && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="glass-dark border-white/10 w-full max-w-2xl">
            <CardHeader className="border-b border-white/5">
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center space-x-2">
                  <Eye className="h-5 w-5 text-blue-400" />
                  <span>Kullanıcı Detayları</span>
                </span>
                <Button variant="ghost" size="sm" onClick={() => setShowDetailModal(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center space-x-4 mb-6">
                <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-3xl">
                  {selectedUser.avatar}
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{selectedUser.name}</h3>
                  <p className="text-foreground/60">@{selectedUser.username}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    {getRoleBadge(selectedUser.role)}
                    {getStatusBadge(selectedUser.status)}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-foreground/60">Email:</span>
                  <span className="font-semibold">{selectedUser.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/60">Kayıt Tarihi:</span>
                  <span>{selectedUser.joinDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/60">Son Aktiflik:</span>
                  <span>{selectedUser.lastActive}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/60">Doğrulanma:</span>
                  {selectedUser.verified ? (
                    <Badge className="bg-green-500/20 border-green-500/30 text-green-400">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Doğrulanmış
                    </Badge>
                  ) : (
                    <Badge className="bg-gray-500/20 border-gray-500/30 text-gray-400">
                      Doğrulanmamış
                    </Badge>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-white/5">
                <div className="text-center glass p-3 rounded-lg">
                  <p className="text-2xl font-bold text-blue-400">{selectedUser.coupons}</p>
                  <p className="text-xs text-foreground/60">Kupon</p>
                </div>
                <div className="text-center glass p-3 rounded-lg">
                  <p className="text-2xl font-bold text-green-400">{selectedUser.winRate}%</p>
                  <p className="text-xs text-foreground/60">Başarı Oranı</p>
                </div>
                <div className="text-center glass p-3 rounded-lg">
                  <p className="text-2xl font-bold text-purple-400">{selectedUser.followers}</p>
                  <p className="text-xs text-foreground/60">Takipçi</p>
                </div>
                <div className="text-center glass p-3 rounded-lg">
                  <p className="text-2xl font-bold text-orange-400">{selectedUser.following}</p>
                  <p className="text-xs text-foreground/60">Takip</p>
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