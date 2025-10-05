'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { 
  Crown, 
  CheckCircle, 
  XCircle, 
  Clock,
  Calendar,
  Mail,
  User,
  MessageSquare,
  Award,
  Trash2
} from 'lucide-react'

interface Application {
  id: string
  userId: string
  userName: string
  userEmail: string
  message: string
  experience: string | null
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  adminNote: string | null
  createdAt: string
  decidedAt: string | null
}

export default function AdminBasvurularPage() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)
  const [actionLoading, setActionLoading] = useState(false)
  const [showDecisionDialog, setShowDecisionDialog] = useState(false)
  const [decision, setDecision] = useState<'APPROVED' | 'REJECTED'>('APPROVED')
  const [adminNote, setAdminNote] = useState('')
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED'>('ALL')

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      const response = await fetch('/api/tipster-application')
      if (response.ok) {
        const data = await response.json()
        setApplications(data.applications)
      }
    } catch (error) {
      console.error('Fetch applications error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDecision = async () => {
    if (!selectedApplication) return

    setActionLoading(true)
    try {
      const response = await fetch(`/api/tipster-application/${selectedApplication.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: decision,
          adminNote
        })
      })

      if (response.ok) {
        // Listeyi güncelle
        fetchApplications()
        setShowDecisionDialog(false)
        setSelectedApplication(null)
        setAdminNote('')
      }
    } catch (error) {
      console.error('Decision error:', error)
    } finally {
      setActionLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bu başvuruyu silmek istediğinizden emin misiniz?')) return

    try {
      const response = await fetch(`/api/tipster-application/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        fetchApplications()
      }
    } catch (error) {
      console.error('Delete error:', error)
    }
  }

  const openDecisionDialog = (application: Application, decisionType: 'APPROVED' | 'REJECTED') => {
    setSelectedApplication(application)
    setDecision(decisionType)
    setAdminNote('')
    setShowDecisionDialog(true)
  }

  const filteredApplications = applications.filter(app => {
    if (filter === 'ALL') return true
    return app.status === filter
  })

  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === 'PENDING').length,
    approved: applications.filter(a => a.status === 'APPROVED').length,
    rejected: applications.filter(a => a.status === 'REJECTED').length
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-foreground/60">Yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-2">
          <Crown className="h-8 w-8 text-yellow-400" />
          <h1 className="text-3xl font-bold gradient-text">Tahminçi Başvuruları</h1>
        </div>
        <p className="text-foreground/60">Kullanıcıların tahminçi başvurularını inceleyin ve onaylayın</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="glass-dark border-white/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground/60 mb-1">Toplam</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Crown className="h-8 w-8 text-foreground/30" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-dark border-yellow-400/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground/60 mb-1">Bekleyen</p>
                <p className="text-2xl font-bold text-yellow-400">{stats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-dark border-green-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground/60 mb-1">Onaylanan</p>
                <p className="text-2xl font-bold text-green-400">{stats.approved}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-dark border-red-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground/60 mb-1">Reddedilen</p>
                <p className="text-2xl font-bold text-red-400">{stats.rejected}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex space-x-2 mb-6">
        <Button
          variant={filter === 'ALL' ? 'default' : 'outline'}
          onClick={() => setFilter('ALL')}
          className={filter === 'ALL' ? 'bg-gradient-to-r from-green-500 to-yellow-400 text-black' : 'border-white/10'}
        >
          Tümü
        </Button>
        <Button
          variant={filter === 'PENDING' ? 'default' : 'outline'}
          onClick={() => setFilter('PENDING')}
          className={filter === 'PENDING' ? 'bg-yellow-400 text-black' : 'border-white/10'}
        >
          <Clock className="h-4 w-4 mr-2" />
          Bekleyen
        </Button>
        <Button
          variant={filter === 'APPROVED' ? 'default' : 'outline'}
          onClick={() => setFilter('APPROVED')}
          className={filter === 'APPROVED' ? 'bg-green-500 text-white' : 'border-white/10'}
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          Onaylanan
        </Button>
        <Button
          variant={filter === 'REJECTED' ? 'default' : 'outline'}
          onClick={() => setFilter('REJECTED')}
          className={filter === 'REJECTED' ? 'bg-red-500 text-white' : 'border-white/10'}
        >
          <XCircle className="h-4 w-4 mr-2" />
          Reddedilen
        </Button>
      </div>

      {/* Applications List */}
      {filteredApplications.length === 0 ? (
        <Card className="glass-dark border-white/5">
          <CardContent className="p-12 text-center">
            <Crown className="h-16 w-16 mx-auto text-foreground/30 mb-4" />
            <h3 className="text-xl font-bold mb-2">Başvuru Bulunamadı</h3>
            <p className="text-foreground/60">
              {filter === 'ALL' ? 'Henüz hiç başvuru yapılmamış.' : `${filter.toLowerCase()} durumunda başvuru yok.`}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredApplications.map((application) => (
            <Card 
              key={application.id} 
              className={`glass-dark ${
                application.status === 'PENDING' ? 'border-yellow-400/20' :
                application.status === 'APPROVED' ? 'border-green-500/20' :
                'border-red-500/20'
              }`}
            >
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0">
                  {/* User Info */}
                  <div className="flex items-start space-x-4 flex-1">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-gradient-to-br from-green-500 to-yellow-400 text-black font-bold">
                        {application.userName.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-bold">{application.userName}</h3>
                        <Badge className={`${
                          application.status === 'PENDING' ? 'bg-yellow-400/20 text-yellow-400 border-yellow-400/50' :
                          application.status === 'APPROVED' ? 'bg-green-500/20 text-green-400 border-green-500/50' :
                          'bg-red-500/20 text-red-400 border-red-500/50'
                        } border`}>
                          {application.status === 'PENDING' ? 'Bekliyor' :
                           application.status === 'APPROVED' ? 'Onaylandı' :
                           'Reddedildi'}
                        </Badge>
                      </div>

                      <div className="space-y-1 text-sm text-foreground/60 mb-3">
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4" />
                          <span>{application.userEmail}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>
                            Başvuru: {new Date(application.createdAt).toLocaleDateString('tr-TR', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <p className="text-xs text-foreground/60 mb-1 flex items-center">
                            <MessageSquare className="h-3 w-3 mr-1" />
                            Başvuru Mesajı:
                          </p>
                          <p className="text-foreground text-sm bg-black/20 p-3 rounded-lg border border-white/5">
                            {application.message}
                          </p>
                        </div>

                        {application.experience && (
                          <div>
                            <p className="text-xs text-foreground/60 mb-1 flex items-center">
                              <Award className="h-3 w-3 mr-1" />
                              Deneyim:
                            </p>
                            <p className="text-foreground text-sm bg-black/20 p-3 rounded-lg border border-white/5">
                              {application.experience}
                            </p>
                          </div>
                        )}

                        {application.adminNote && (
                          <div>
                            <p className="text-xs text-foreground/60 mb-1">Admin Notu:</p>
                            <p className="text-foreground text-sm bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                              {application.adminNote}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col space-y-2 lg:ml-4">
                    {application.status === 'PENDING' && (
                      <>
                        <Button
                          onClick={() => openDecisionDialog(application, 'APPROVED')}
                          className="bg-green-500 hover:bg-green-600 text-white w-full lg:w-32"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Onayla
                        </Button>
                        <Button
                          onClick={() => openDecisionDialog(application, 'REJECTED')}
                          className="bg-red-500 hover:bg-red-600 text-white w-full lg:w-32"
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Reddet
                        </Button>
                      </>
                    )}
                    <Button
                      variant="outline"
                      onClick={() => handleDelete(application.id)}
                      className="border-red-500/50 text-red-400 hover:bg-red-500/10 w-full lg:w-32"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Sil
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Decision Dialog */}
      <Dialog open={showDecisionDialog} onOpenChange={setShowDecisionDialog}>
        <DialogContent className="glass-dark border-white/10">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              {decision === 'APPROVED' ? (
                <>
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>Başvuruyu Onayla</span>
                </>
              ) : (
                <>
                  <XCircle className="h-5 w-5 text-red-400" />
                  <span>Başvuruyu Reddet</span>
                </>
              )}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <p className="text-sm text-foreground/60">
              <strong>{selectedApplication?.userName}</strong> kullanıcısının tahminçi başvurusunu {decision === 'APPROVED' ? 'onaylamak' : 'reddetmek'} istediğinizden emin misiniz?
            </p>

            <div className="space-y-2">
              <Label htmlFor="adminNote">
                {decision === 'APPROVED' ? 'Onay Mesajı (Opsiyonel)' : 'Ret Nedeni (Önerilen)'}
              </Label>
              <textarea
                id="adminNote"
                rows={4}
                value={adminNote}
                onChange={(e) => setAdminNote(e.target.value)}
                className="w-full glass border border-white/10 focus:border-green-500/50 rounded-lg px-3 py-2 bg-black/20 text-foreground"
                placeholder={decision === 'APPROVED' ? 'Tebrikler mesajı...' : 'Ret nedeninizi açıklayın...'}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDecisionDialog(false)}
              disabled={actionLoading}
              className="border-white/10"
            >
              İptal
            </Button>
            <Button
              onClick={handleDecision}
              disabled={actionLoading}
              className={decision === 'APPROVED' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}
            >
              {actionLoading ? 'İşleniyor...' : decision === 'APPROVED' ? 'Onayla' : 'Reddet'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
