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

  const fetchScores = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/live-scores?league=203')
      const data = await res.json()
      if (data.response && Array.isArray(data.response)) {
        setFixtures(data.response)
        setLastUpdate(new Date())
      }
    } catch (error) {
      console.error('Failed to fetch live scores:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchScores()
    // Her 2 dakikada bir otomatik güncelle
    const interval = setInterval(fetchScores, 120000)
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
            <p className="text-foreground/60">Süper Lig maç sonuçları</p>
            <p className="text-sm text-foreground/40 mt-1">
              Son güncelleme: {lastUpdate.toLocaleTimeString('tr-TR')}
            </p>
          </div>
          <Button
            onClick={fetchScores}
            disabled={loading}
            className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Yenile
          </Button>
        </div>

        {/* Matches Grid */}
        {loading && fixtures.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="glass-dark border-white/10 p-6 animate-pulse">
                <div className="h-24 bg-white/5 rounded-lg mb-4"></div>
                <div className="h-4 bg-white/5 rounded mb-2"></div>
                <div className="h-4 bg-white/5 rounded w-2/3"></div>
              </Card>
            ))}
          </div>
        ) : fixtures.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fixtures.map((fixture) => (
              <Card key={fixture.fixture.id} className="glass-dark border-white/10 hover:border-red-500/30 transition-all duration-300 group">
                <div className="p-6">
                  {/* Status Badge */}
                  <div className="flex justify-between items-center mb-4">
                    {getStatusBadge(fixture.fixture.status.short)}
                    {fixture.fixture.status.elapsed && (
                      <span className="text-xs text-red-400 font-semibold">
                        {fixture.fixture.status.elapsed}'
                      </span>
                    )}
                  </div>

                  {/* Match Info */}
                  <div className="flex flex-col items-center space-y-4">
                    {/* Home Team */}
                    <div className="flex items-center gap-3 w-full">
                      <img 
                        src={fixture.teams.home.logo} 
                        alt={fixture.teams.home.name}
                        className="h-10 w-10 object-contain"
                        onError={(e) => { e.currentTarget.style.display = 'none' }}
                      />
                      <p className="text-lg font-bold text-white group-hover:text-green-400 transition-colors flex-1">
                        {fixture.teams.home.name}
                      </p>
                      <span className="text-2xl font-black text-white">
                        {fixture.goals.home ?? '-'}
                      </span>
                    </div>

                    {/* VS Divider */}
                    <div className="w-full border-t border-white/10 relative">
                      <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 px-3 text-xs text-foreground/40 font-semibold">
                        VS
                      </span>
                    </div>

                    {/* Away Team */}
                    <div className="flex items-center gap-3 w-full">
                      <img 
                        src={fixture.teams.away.logo} 
                        alt={fixture.teams.away.name}
                        className="h-10 w-10 object-contain"
                        onError={(e) => { e.currentTarget.style.display = 'none' }}
                      />
                      <p className="text-lg font-bold text-white group-hover:text-green-400 transition-colors flex-1">
                        {fixture.teams.away.name}
                      </p>
                      <span className="text-2xl font-black text-white">
                        {fixture.goals.away ?? '-'}
                      </span>
                    </div>
                  </div>

                  {/* Match Date */}
                  <div className="mt-4 pt-4 border-t border-white/10 text-center">
                    <p className="text-xs text-foreground/60">
                      {new Date(fixture.fixture.date).toLocaleDateString('tr-TR', {
                        day: 'numeric',
                        month: 'long',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="glass-dark border-white/10 p-12 text-center">
            <div className="flex flex-col items-center space-y-4">
              <Trophy className="h-16 w-16 text-foreground/30" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Bugün Maç Yok</h3>
                <p className="text-foreground/60">Süper Lig'de bugün oynanacak maç bulunmuyor.</p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
