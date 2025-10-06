'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Radio, Trophy, RefreshCw, Clock, CheckCircle } from 'lucide-react'

interface Fixture {
  fixture: {
    id: number
    date: string
    status: {
      long: string
      short: string
      elapsed: number | null
    }
  }
  teams: {
    home: {
      id: number
      name: string
      logo: string
    }
    away: {
      id: number
      name: string
      logo: string
    }
  }
  goals: {
    home: number | null
    away: number | null
  }
  score: {
    halftime: {
      home: number | null
      away: number | null
    }
    fulltime: {
      home: number | null
      away: number | null
    }
  }
}

export default function CanliSkorlarPage() {
  const [fixtures, setFixtures] = useState<Fixture[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  const fetchScores = async (type: 'today' | 'live' | 'last' = 'live') => {
    setLoading(true)
    try {
      // Önce istenen tür
      const res = await fetch(`/api/live-scores?type=${type}`, { cache: 'no-store' })
      const data = await res.json()
      if (Array.isArray(data?.response) && data.response.length > 0) {
        setFixtures(data.response)
        setLastUpdate(new Date())
      } else if (type !== 'last') {
        // Fallback: son maçlar
        const resLast = await fetch('/api/live-scores?type=last', { cache: 'no-store' })
        const dataLast = await resLast.json()
        if (Array.isArray(dataLast?.response)) {
          setFixtures(dataLast.response)
          setLastUpdate(new Date())
        }
      }
    } catch (error) {
      console.error('Failed to fetch live scores:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Varsayılan: canlıyı dene, yoksa today
    (async () => {
      await fetchScores('live')
      if (fixtures.length === 0) {
        await fetchScores('today')
      }
    })()
    // Her 2 dakikada bir otomatik güncelle (canlı öncelikli)
    const interval = setInterval(() => fetchScores('live'), 120000)
    return () => clearInterval(interval)
  }, [])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'FT':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">MS</Badge>
      case '1H':
      case '2H':
      case 'HT':
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30 animate-pulse">CANLI</Badge>
      case 'NS':
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Başlamadı</Badge>
      default:
        return <Badge className="bg-white/10 text-white/60">{status}</Badge>
    }
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="relative">
                <Radio className="h-10 w-10 text-red-500 animate-pulse" />
                <div className="absolute inset-0 bg-red-500 blur-xl opacity-40"></div>
              </div>
              <h1 className="text-4xl font-bold gradient-text">Canlı Skorlar</h1>
              <div className="flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </div>
            </div>
             <p className="text-foreground/60">Tüm dünyadan canlı maç skorları</p>
            <p className="text-sm text-foreground/40 mt-1">
              Son güncelleme: {lastUpdate.toLocaleTimeString('tr-TR')}
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => fetchScores('today')}
              disabled={loading}
              variant="outline"
              className="border-white/10 hover:border-green-500/50 hover:bg-green-500/10 hover:text-green-400"
            >
              <Clock className="h-4 w-4 mr-2" />
              Bugün
            </Button>
            <Button
              onClick={() => fetchScores('live')}
              disabled={loading}
              className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold"
            >
              <Radio className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : 'animate-pulse'}`} />
              Canlı Maçlar
            </Button>
            <Button
              onClick={() => fetchScores('today')}
              disabled={loading}
              variant="outline"
              className="border-white/10 hover:border-blue-500/50"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>

        {/* Matches List - Single row style */}
        {loading && fixtures.length === 0 ? (
          <div className="space-y-2">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-12 w-full rounded-lg bg-white/5 animate-pulse"></div>
            ))}
          </div>
        ) : fixtures.length > 0 ? (
          <Card className="glass-dark border-white/10 overflow-hidden">
            <div className="divide-y divide-white/10">
              {fixtures.map((fx) => (
                <div key={fx.fixture.id} className="grid grid-cols-12 items-center h-14 px-3 hover:bg-white/5 transition">
                  {/* Status */}
                  <div className="col-span-2 flex items-center gap-2">
                    {getStatusBadge(fx.fixture.status.short)}
                    {fx.fixture.status.elapsed ? (
                      <span className="text-xs text-red-400 font-semibold">{fx.fixture.status.elapsed}'</span>
                    ) : null}
                  </div>
                  {/* Home */}
                  <div className="col-span-4 flex items-center gap-2 min-w-0">
                    <img src={fx.teams.home.logo} alt={fx.teams.home.name} className="h-5 w-5 object-contain" onError={(e) => { e.currentTarget.style.display = 'none' }} />
                    <span className="truncate">{fx.teams.home.name}</span>
                  </div>
                  {/* Score */}
                  <div className="col-span-2 text-center font-bold">
                    {(fx.goals.home ?? '-')}{' '}-{' '}{(fx.goals.away ?? '-')}
                  </div>
                  {/* Away */}
                  <div className="col-span-4 flex items-center gap-2 min-w-0 justify-end">
                    <span className="truncate text-right">{fx.teams.away.name}</span>
                    <img src={fx.teams.away.logo} alt={fx.teams.away.name} className="h-5 w-5 object-contain" onError={(e) => { e.currentTarget.style.display = 'none' }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ) : (
          <Card className="glass-dark border-white/10 p-12 text-center">
            <div className="flex flex-col items-center space-y-4">
               <Trophy className="h-16 w-16 text-foreground/30" />
               <div>
                 <h3 className="text-xl font-semibold mb-2">Maç Bulunamadı</h3>
                 <p className="text-foreground/60">Şu anda gösterilecek maç bulunmuyor.</p>
               </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
