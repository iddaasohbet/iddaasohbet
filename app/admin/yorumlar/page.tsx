'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Search,
  SlidersHorizontal,
  MessageSquare,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Flag,
  ThumbsUp,
  ThumbsDown,
  MoreVertical,
  Download,
  TrendingUp,
  User,
  FileText,
  Calendar,
  X,
  AlertCircle
} from 'lucide-react'

export default function AdminYorumlarPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedComments, setSelectedComments] = useState<string[]>([])
  
  // Modal states
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedComment, setSelectedComment] = useState<any>(null)

  // Mock data
  const stats = [
    { label: 'Toplam Yorum', value: '24,892', icon: MessageSquare, color: 'blue', trend: '+18%' },
    { label: 'Onay Bekleyen', value: '43', icon: Clock, color: 'yellow', trend: '+5%' },
    { label: 'Onaylanmış', value: '24,234', icon: CheckCircle, color: 'green', trend: '+12%' },
    { label: 'Spam/Raporlu', value: '615', icon: Flag, color: 'red', trend: '-8%' }
  ]

  const [comments, setComments] = useState([
    {
      id: '1',
      user: 'Mehmet Yılmaz',
      username: '@mehmetY',
      avatar: 'M',
      couponId: '#1234',
      couponTitle: 'Bugünün En İyi 5\'lisi',
      content: 'Harika bir kupon, ben de deneyeceğim. Başarılar! 🔥',
      date: '2025-01-10 14:30',
      status: 'approved',
      likes: 12,
      dislikes: 0,
      replies: 3,
      reported: false
    },
    {
      id: '2',
      user: 'Ahmet Kaya',
      username: '@ahmetK',
      avatar: 'A',
      couponId: '#1235',
      couponTitle: 'Garantili 3\'lü Maç',
      content: 'Bu maçlar riskli görünüyor, dikkatli olun arkadaşlar.',
      date: '2025-01-10 12:15',
      status: 'approved',
      likes: 8,
      dislikes: 2,
      replies: 5,
      reported: false
    },
    {
      id: '3',
      user: 'Fatih Şahin',
      username: '@fatihS',
      avatar: 'F',
      couponId: '#1236',
      couponTitle: 'Yüksek Oran Kuponu',
      content: 'SPAM LINK buraya tıkla garanti kazanç!!!',
      date: '2025-01-10 10:00',
      status: 'spam',
      likes: 0,
      dislikes: 15,
      replies: 0,
      reported: true
    }
  ])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-500/20 border-green-500/30 text-green-400"><CheckCircle className="h-3 w-3 mr-1" />Onaylandı</Badge>
      case 'pending':
        return <Badge className="bg-yellow-500/20 border-yellow-500/30 text-yellow-400"><Clock className="h-3 w-3 mr-1" />Bekliyor</Badge>
      case 'rejected':
        return <Badge className="bg-gray-500/20 border-gray-500/30 text-gray-400"><XCircle className="h-3 w-3 mr-1" />Reddedildi</Badge>
      case 'spam':
        return <Badge className="bg-red-500/20 border-red-500/30 text-red-400"><Flag className="h-3 w-3 mr-1" />Spam</Badge>
      default:
        return null
    }
  }

  const handleSelectComment = (id: string) => {
    setSelectedComments(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const handleSelectAll = () => {
    if (selectedComments.length === comments.length) {
      setSelectedComments([])
    } else {
      setSelectedComments(comments.map(c => c.id))
    }
  }

  // Update Comment
  const handleUpdateComment = (status: string) => {
    setComments(comments.map(c => 
      c.id === selectedComment.id ? { ...c, status, reported: status === 'spam' } : c
    ))
    setShowEditModal(false)
    setSelectedComment(null)
  }

  // Delete Comment
  const handleDeleteComment = () => {
    setComments(comments.filter(c => c.id !== selectedComment.id))
    setShowDeleteModal(false)
    setSelectedComment(null)
  }

  // Bulk Actions
  const handleBulkApprove = () => {
    setComments(comments.map(c => 
      selectedComments.includes(c.id) ? { ...c, status: 'approved', reported: false } : c
    ))
    setSelectedComments([])
  }

  const handleBulkReject = () => {
    setComments(comments.map(c => 
      selectedComments.includes(c.id) ? { ...c, status: 'rejected' } : c
    ))
    setSelectedComments([])
  }

  const handleBulkSpam = () => {
    setComments(comments.map(c => 
      selectedComments.includes(c.id) ? { ...c, status: 'spam', reported: true } : c
    ))
    setSelectedComments([])
  }

  const handleBulkDelete = () => {
    setComments(comments.filter(c => !selectedComments.includes(c.id)))
    setSelectedComments([])
  }

  const openEditModal = (comment: any) => {
    setSelectedComment(comment)
    setShowEditModal(true)
  }

  const openDeleteModal = (comment: any) => {
    setSelectedComment(comment)
    setShowDeleteModal(true)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-text mb-2">Yorum Yönetimi</h1>
          <p className="text-foreground/60">Tüm yorumları görüntüle, düzenle ve yönet</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="glass border-white/10">
            <Download className="h-4 w-4 mr-2" />
            Dışa Aktar
          </Button>
          <Button variant="outline" className="glass border-red-500/30 text-red-400 hover:bg-red-500/10">
            <Flag className="h-4 w-4 mr-2" />
            Spam Raporları ({comments.filter(c => c.reported).length})
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
                  <Badge className={`${
                    stat.trend.startsWith('+') 
                      ? 'bg-green-500/20 border-green-500/30 text-green-400' 
                      : 'bg-red-500/20 border-red-500/30 text-red-400'
                  }`}>
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
                placeholder="Kullanıcı, kupon veya yorum içeriği ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="glass-dark border-white/10 pl-10"
              />
            </div>

            <div className="flex items-center space-x-2">
              <SlidersHorizontal className="h-4 w-4 text-foreground/60" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="glass-dark border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-orange-500/50 min-w-[150px]"
              >
                <option value="all">Tüm Durumlar</option>
                <option value="pending">Onay Bekleyen</option>
                <option value="approved">Onaylanmış</option>
                <option value="rejected">Reddedilmiş</option>
                <option value="spam">Spam</option>
              </select>
            </div>
          </div>

          {selectedComments.length > 0 && (
            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
              <p className="text-sm text-foreground/60">
                <strong className="text-orange-400">{selectedComments.length}</strong> yorum seçildi
              </p>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline" className="glass border-green-500/30 text-green-400 hover:bg-green-500/10" onClick={handleBulkApprove}>
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Onayla
                </Button>
                <Button size="sm" variant="outline" className="glass border-gray-500/30 text-gray-400 hover:bg-gray-500/10" onClick={handleBulkReject}>
                  <XCircle className="h-4 w-4 mr-1" />
                  Reddet
                </Button>
                <Button size="sm" variant="outline" className="glass border-red-500/30 text-red-400 hover:bg-red-500/10" onClick={handleBulkSpam}>
                  <Flag className="h-4 w-4 mr-1" />
                  Spam
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

      {/* Comments List */}
      <Card className="glass-dark border-white/5">
        <CardHeader className="border-b border-white/5">
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-blue-400" />
              <span>Yorum Listesi ({comments.length})</span>
            </span>
            <Button variant="ghost" size="sm" onClick={handleSelectAll} className="text-xs">
              {selectedComments.length === comments.length ? 'Seçimi Kaldır' : 'Tümünü Seç'}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {comments.map((comment) => (
              <div 
                key={comment.id}
                className={`glass-dark p-5 rounded-lg border transition-all hover:border-white/10 ${
                  comment.reported ? 'border-red-500/30 bg-red-500/5' : 'border-white/5'
                } ${selectedComments.includes(comment.id) ? 'border-orange-500/50 bg-orange-500/5' : ''}`}
              >
                <div className="flex items-start space-x-4">
                  <input
                    type="checkbox"
                    checked={selectedComments.includes(comment.id)}
                    onChange={() => handleSelectComment(comment.id)}
                    className="rounded border-white/20 bg-white/5 cursor-pointer mt-1"
                  />

                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {comment.avatar}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                      <div className="flex flex-col md:flex-row md:items-center gap-2">
                        <div>
                          <h4 className="font-semibold text-sm">{comment.user}</h4>
                          <p className="text-xs text-foreground/60">{comment.username}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusBadge(comment.status)}
                          {comment.reported && (
                            <Badge className="bg-red-500/20 border-red-500/30 text-red-400">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              Raporlandı
                            </Badge>
                          )}
                        </div>
                      </div>
                      <span className="text-xs text-foreground/60">{comment.date}</span>
                    </div>

                    <div className="flex items-center space-x-2 mb-3 text-xs text-foreground/60">
                      <FileText className="h-3 w-3" />
                      <span>Kupon:</span>
                      <a href="#" className="text-blue-400 hover:underline">{comment.couponId}</a>
                      <span>-</span>
                      <span className="max-w-[200px] truncate">{comment.couponTitle}</span>
                    </div>

                    <p className={`text-sm mb-4 ${comment.status === 'spam' ? 'text-red-400 line-through' : 'text-foreground/80'}`}>
                      {comment.content}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-xs text-foreground/60">
                        <div className="flex items-center space-x-1">
                          <ThumbsUp className="h-3 w-3 text-green-400" />
                          <span>{comment.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ThumbsDown className="h-3 w-3 text-red-400" />
                          <span>{comment.dislikes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageSquare className="h-3 w-3" />
                          <span>{comment.replies} yanıt</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        {comment.status === 'pending' && (
                          <>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="glass border-green-500/30 text-green-400 hover:bg-green-500/10 h-8 px-3 text-xs"
                              onClick={() => {
                                setSelectedComment(comment)
                                handleUpdateComment('approved')
                              }}
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Onayla
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="glass border-gray-500/30 text-gray-400 hover:bg-gray-500/10 h-8 px-3 text-xs"
                              onClick={() => {
                                setSelectedComment(comment)
                                handleUpdateComment('rejected')
                              }}
                            >
                              <XCircle className="h-3 w-3 mr-1" />
                              Reddet
                            </Button>
                          </>
                        )}
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-green-500/10 hover:text-green-400" onClick={() => openEditModal(comment)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-orange-500/10 hover:text-orange-400" onClick={() => {
                          setSelectedComment(comment)
                          handleUpdateComment('spam')
                        }}>
                          <Flag className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-red-500/10 hover:text-red-400" onClick={() => openDeleteModal(comment)}>
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
              Toplam <strong className="text-orange-400">{comments.length}</strong> yorum gösteriliyor
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Edit Modal */}
      {showEditModal && selectedComment && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="glass-dark border-white/10 w-full max-w-md">
            <CardHeader className="border-b border-white/5">
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center space-x-2">
                  <Edit className="h-5 w-5 text-blue-400" />
                  <span>Yorum Durumu Değiştir</span>
                </span>
                <Button variant="ghost" size="sm" onClick={() => setShowEditModal(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="glass p-4 rounded-lg">
                <p className="text-sm text-foreground/70">{selectedComment.content}</p>
              </div>

              <div className="space-y-2">
                <Button 
                  onClick={() => handleUpdateComment('approved')} 
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Onayla
                </Button>
                <Button 
                  onClick={() => handleUpdateComment('rejected')} 
                  variant="outline"
                  className="w-full glass border-gray-500/30 hover:bg-gray-500/10"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reddet
                </Button>
                <Button 
                  onClick={() => handleUpdateComment('spam')} 
                  variant="outline"
                  className="w-full glass border-red-500/30 text-red-400 hover:bg-red-500/10"
                >
                  <Flag className="h-4 w-4 mr-2" />
                  Spam İşaretle
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && selectedComment && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="glass-dark border-red-500/30 w-full max-w-md">
            <CardHeader className="border-b border-white/5">
              <CardTitle className="flex items-center space-x-2 text-red-400">
                <AlertCircle className="h-5 w-5" />
                <span>Yorum Sil</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="glass p-4 rounded-lg mb-4">
                <p className="text-sm text-foreground/70">{selectedComment.content}</p>
              </div>
              <p className="text-sm text-red-400 mb-6">
                Bu yorumu silmek istediğinizden emin misiniz? Bu işlem geri alınamaz!
              </p>
              <div className="flex space-x-3">
                <Button 
                  onClick={handleDeleteComment}
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