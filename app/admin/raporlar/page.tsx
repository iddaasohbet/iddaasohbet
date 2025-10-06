'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  FileText,
  Download,
  TrendingUp,
  Calendar,
  SlidersHorizontal,
  Plus,
  Eye,
  Trash2,
  CheckCircle,
  Clock,
  X,
  AlertCircle,
  BarChart3,
  PieChart,
  LineChart,
  Users,
  Trophy,
  DollarSign
} from 'lucide-react'

export default function AdminRaporlarPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [selectedReports, setSelectedReports] = useState<string[]>([])

  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedReport, setSelectedReport] = useState<any>(null)

  // Form data
  const [formData, setFormData] = useState({
    name: '',
    type: 'users',
    dateRange: '30days',
    format: 'pdf'
  })

  // Mock stats
  const stats = [
    { label: 'Toplam Rapor', value: '156', icon: FileText, color: 'blue', trend: '+12' },
    { label: 'Bu Ay Oluşturulan', value: '24', icon: Calendar, color: 'green', trend: '+8' },
    { label: 'İndirilme', value: '892', icon: Download, color: 'purple', trend: '+45' },
    { label: 'Bekleyen', value: '3', icon: Clock, color: 'yellow', trend: '0' }
  ]

  const [reports, setReports] = useState([
    {
      id: '1',
      name: 'Ocak 2025 Kullanıcı Raporu',
      type: 'users',
      dateRange: '01.01.2025 - 31.01.2025',
      format: 'pdf',
      status: 'ready',
      createdDate: '2025-01-10 14:30',
      fileSize: '2.3 MB',
      downloads: 45
    },
    {
      id: '2',
      name: 'Kupon Başarı İstatistikleri',
      type: 'coupons',
      dateRange: '01.12.2024 - 31.12.2024',
      format: 'excel',
      status: 'ready',
      createdDate: '2025-01-08 10:00',
      fileSize: '5.1 MB',
      downloads: 78
    },
    {
      id: '3',
      name: 'Tahminci Performans Raporu',
      type: 'tipsters',
      dateRange: '01.01.2025 - 10.01.2025',
      format: 'pdf',
      status: 'generating',
      createdDate: '2025-01-10 16:00',
      fileSize: '-',
      downloads: 0
    },
    {
      id: '4',
      name: 'Gelir Analiz Raporu',
      type: 'revenue',
      dateRange: '2024 Yıllık',
      format: 'pdf',
      status: 'ready',
      createdDate: '2025-01-05 09:00',
      fileSize: '8.7 MB',
      downloads: 123
    }
  ])

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'users':
        return <Badge className="bg-blue-500/20 border-blue-500/30 text-blue-400"><Users className="h-3 w-3 mr-1" />Kullanıcılar</Badge>
      case 'coupons':
        return <Badge className="bg-green-500/20 border-green-500/30 text-green-400"><Trophy className="h-3 w-3 mr-1" />Kuponlar</Badge>
      case 'tipsters':
        return <Badge className="bg-purple-500/20 border-purple-500/30 text-purple-400"><TrendingUp className="h-3 w-3 mr-1" />Tahminçiler</Badge>
      case 'revenue':
        return <Badge className="bg-yellow-500/20 border-yellow-500/30 text-yellow-400"><DollarSign className="h-3 w-3 mr-1" />Gelir</Badge>
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ready':
        return <Badge className="bg-green-500/20 border-green-500/30 text-green-400"><CheckCircle className="h-3 w-3 mr-1" />Hazır</Badge>
      case 'generating':
        return <Badge className="bg-yellow-500/20 border-yellow-500/30 text-yellow-400"><Clock className="h-3 w-3 mr-1" />Oluşturuluyor</Badge>
      case 'failed':
        return <Badge className="bg-red-500/20 border-red-500/30 text-red-400">Başarısız</Badge>
      default:
        return null
    }
  }

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'pdf':
        return <FileText className="h-4 w-4 text-red-400" />
      case 'excel':
        return <BarChart3 className="h-4 w-4 text-green-400" />
      case 'csv':
        return <PieChart className="h-4 w-4 text-blue-400" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  // Create Report
  const handleCreateReport = () => {
    const newReport = {
      id: String(reports.length + 1),
      name: formData.name,
      type: formData.type,
      dateRange: formData.dateRange === '30days' ? 'Son 30 Gün' : formData.dateRange === '90days' ? 'Son 90 Gün' : 'Yıllık',
      format: formData.format,
      status: 'generating',
      createdDate: new Date().toISOString().split('T')[0] + ' ' + new Date().toTimeString().split(' ')[0].slice(0, 5),
      fileSize: '-',
      downloads: 0
    }
    setReports([newReport, ...reports])
    setShowCreateModal(false)
    resetForm()

    // Simulate report generation
    setTimeout(() => {
      setReports(prev => prev.map(r => 
        r.id === newReport.id ? { ...r, status: 'ready', fileSize: '3.5 MB' } : r
      ))
    }, 3000)
  }

  // Delete Report
  const handleDeleteReport = () => {
    setReports(reports.filter(r => r.id !== selectedReport.id))
    setShowDeleteModal(false)
    setSelectedReport(null)
  }

  // Download Report
  const handleDownloadReport = (report: any) => {
    setReports(reports.map(r => 
      r.id === report.id ? { ...r, downloads: r.downloads + 1 } : r
    ))
    alert(`${report.name} indiriliyor...`)
  }

  // Bulk Delete
  const handleBulkDelete = () => {
    setReports(reports.filter(r => !selectedReports.includes(r.id)))
    setSelectedReports([])
  }

  const handleSelectReport = (id: string) => {
    setSelectedReports(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const handleSelectAll = () => {
    if (selectedReports.length === reports.length) {
      setSelectedReports([])
    } else {
      setSelectedReports(reports.map(r => r.id))
    }
  }

  const openDeleteModal = (report: any) => {
    setSelectedReport(report)
    setShowDeleteModal(true)
  }

  const resetForm = () => {
    setFormData({
      name: '',
      type: 'users',
      dateRange: '30days',
      format: 'pdf'
    })
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-text mb-2">Rapor Yönetimi</h1>
          <p className="text-foreground/60">Raporlar oluştur, görüntüle ve indir</p>
        </div>
        <Button 
          onClick={() => setShowCreateModal(true)}
          className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
        >
          <Plus className="h-4 w-4 mr-2" />
          Yeni Rapor Oluştur
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

      {/* Quick Report Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass-dark border-white/5 hover:border-blue-500/30 transition-all cursor-pointer group">
          <CardContent className="p-6 text-center">
            <Users className="h-10 w-10 text-blue-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold mb-1">Kullanıcı Raporu</h3>
            <p className="text-xs text-foreground/60 mb-4">Kayıt, aktiflik, demografik</p>
            <Button size="sm" className="w-full bg-blue-500/20 border-blue-500/30 hover:bg-blue-500/30">
              Oluştur
            </Button>
          </CardContent>
        </Card>

        <Card className="glass-dark border-white/5 hover:border-green-500/30 transition-all cursor-pointer group">
          <CardContent className="p-6 text-center">
            <Trophy className="h-10 w-10 text-green-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold mb-1">Kupon Raporu</h3>
            <p className="text-xs text-foreground/60 mb-4">Başarı, oran, kategori</p>
            <Button size="sm" className="w-full bg-green-500/20 border-green-500/30 hover:bg-green-500/30">
              Oluştur
            </Button>
          </CardContent>
        </Card>

        <Card className="glass-dark border-white/5 hover:border-purple-500/30 transition-all cursor-pointer group">
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-10 w-10 text-purple-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold mb-1">Tahminci Raporu</h3>
            <p className="text-xs text-foreground/60 mb-4">Performans, kazanç, trend</p>
            <Button size="sm" className="w-full bg-purple-500/20 border-purple-500/30 hover:bg-purple-500/30">
              Oluştur
            </Button>
          </CardContent>
        </Card>

        <Card className="glass-dark border-white/5 hover:border-yellow-500/30 transition-all cursor-pointer group">
          <CardContent className="p-6 text-center">
            <DollarSign className="h-10 w-10 text-yellow-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold mb-1">Gelir Raporu</h3>
            <p className="text-xs text-foreground/60 mb-4">Premium, reklam, komisyon</p>
            <Button size="sm" className="w-full bg-yellow-500/20 border-yellow-500/30 hover:bg-yellow-500/30">
              Oluştur
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="glass-dark border-white/5">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Input
                type="search"
                placeholder="Rapor adı ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="glass-dark border-white/10"
              />
            </div>

            <div className="flex items-center space-x-2">
              <SlidersHorizontal className="h-4 w-4 text-foreground/60" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="glass-dark border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-orange-500/50 min-w-[150px]"
              >
                <option value="all">Tüm Raporlar</option>
                <option value="users">Kullanıcılar</option>
                <option value="coupons">Kuponlar</option>
                <option value="tipsters">Tahminçiler</option>
                <option value="revenue">Gelir</option>
              </select>
            </div>
          </div>

          {selectedReports.length > 0 && (
            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
              <p className="text-sm text-foreground/60">
                <strong className="text-orange-400">{selectedReports.length}</strong> rapor seçildi
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

      {/* Reports List */}
      <Card className="glass-dark border-white/5">
        <CardHeader className="border-b border-white/5">
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-400" />
              <span>Rapor Listesi ({reports.length})</span>
            </span>
            <Button variant="ghost" size="sm" onClick={handleSelectAll} className="text-xs">
              {selectedReports.length === reports.length ? 'Seçimi Kaldır' : 'Tümünü Seç'}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {reports.map((report) => (
              <div 
                key={report.id}
                className={`glass-dark p-5 rounded-lg border transition-all hover:border-white/10 ${
                  selectedReports.includes(report.id) ? 'border-orange-500/50 bg-orange-500/5' : 'border-white/5'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <input
                    type="checkbox"
                    checked={selectedReports.includes(report.id)}
                    onChange={() => handleSelectReport(report.id)}
                    className="rounded border-white/20 bg-white/5 cursor-pointer mt-1"
                  />

                  <div className="flex-shrink-0 h-12 w-12 rounded-lg glass flex items-center justify-center">
                    {getFormatIcon(report.format)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-semibold">{report.name}</h4>
                        {getTypeBadge(report.type)}
                        {getStatusBadge(report.status)}
                      </div>
                      <span className="text-xs text-foreground/60">{report.createdDate}</span>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-foreground/60 mb-3">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{report.dateRange}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FileText className="h-3 w-3" />
                        <span>{report.format.toUpperCase()}</span>
                      </div>
                      {report.status === 'ready' && (
                        <>
                          <div className="flex items-center space-x-1">
                            <span>📦 {report.fileSize}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-blue-400">
                            <Download className="h-3 w-3" />
                            <span>{report.downloads} indirme</span>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      {report.status === 'ready' && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="glass border-green-500/30 text-green-400 hover:bg-green-500/10 h-8 px-3 text-xs"
                          onClick={() => handleDownloadReport(report)}
                        >
                          <Download className="h-3 w-3 mr-1" />
                          İndir
                        </Button>
                      )}
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-8 w-8 p-0 hover:bg-red-500/10 hover:text-red-400"
                        onClick={() => openDeleteModal(report)}
                        disabled={report.status === 'generating'}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-white/5">
            <p className="text-sm text-foreground/60">
              Toplam <strong className="text-orange-400">{reports.length}</strong> rapor gösteriliyor
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="glass-dark border-white/10 w-full max-w-xl">
            <CardHeader className="border-b border-white/5">
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center space-x-2">
                  <Plus className="h-5 w-5 text-green-400" />
                  <span>Yeni Rapor Oluştur</span>
                </span>
                <Button variant="ghost" size="sm" onClick={() => setShowCreateModal(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Rapor Adı</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Örn: Ocak 2025 Kullanıcı Raporu"
                  className="glass-dark border-white/10"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Rapor Tipi</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full glass-dark border border-white/10 rounded-lg px-4 py-2"
                >
                  <option value="users">Kullanıcılar</option>
                  <option value="coupons">Kuponlar</option>
                  <option value="tipsters">Tahminçiler</option>
                  <option value="revenue">Gelir</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Tarih Aralığı</label>
                  <select
                    value={formData.dateRange}
                    onChange={(e) => setFormData({...formData, dateRange: e.target.value})}
                    className="w-full glass-dark border border-white/10 rounded-lg px-4 py-2"
                  >
                    <option value="7days">Son 7 Gün</option>
                    <option value="30days">Son 30 Gün</option>
                    <option value="90days">Son 90 Gün</option>
                    <option value="year">Yıllık</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Format</label>
                  <select
                    value={formData.format}
                    onChange={(e) => setFormData({...formData, format: e.target.value})}
                    className="w-full glass-dark border border-white/10 rounded-lg px-4 py-2"
                  >
                    <option value="pdf">PDF</option>
                    <option value="excel">Excel</option>
                    <option value="csv">CSV</option>
                  </select>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <Button 
                  onClick={handleCreateReport}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  disabled={!formData.name}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Rapor Oluştur
                </Button>
                <Button variant="outline" className="glass border-white/10" onClick={() => setShowCreateModal(false)}>
                  İptal
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && selectedReport && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="glass-dark border-red-500/30 w-full max-w-md">
            <CardHeader className="border-b border-white/5">
              <CardTitle className="flex items-center space-x-2 text-red-400">
                <AlertCircle className="h-5 w-5" />
                <span>Raporu Sil</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-foreground/80 mb-4">
                <strong>"{selectedReport.name}"</strong> raporunu silmek istediğinizden emin misiniz?
              </p>
              <p className="text-sm text-red-400 mb-6">
                Bu işlem geri alınamaz! Rapor dosyası kalıcı olarak silinecektir.
              </p>
              <div className="flex space-x-3">
                <Button 
                  onClick={handleDeleteReport}
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