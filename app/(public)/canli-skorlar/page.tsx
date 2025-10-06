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
  events?: Array<{
    team: {
      id: number
    }
    type: string
    detail: string
  }>
}

export default function CanliSkorlarPage() {
  const [fixtures, setFixtures] = useState<Fixture[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  const fetchScores = async (type: 'today' | 'live' = 'live') => {
    setLoading(true)
    try {
      const res = await fetch(`/api/live-scores?type=${type}`)
      const data = await res.json()
      if (data.response && Array.isArray(data.response) && data.response.length > 0) {
        setFixtures(data.response)
        setLastUpdate(new Date())
      } else {
        setFixtures([])
      }
    } catch (error) {
      console.error('Failed to fetch live scores:', error)
      setFixtures([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchScores('live') // Default olarak canlı maçlar
    // Her 1 dakikada bir otomatik güncelle
    const interval = setInterval(() => fetchScores('live'), 60000)
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

  const getTeamCards = (fixture: Fixture, teamId: number) => {
    if (!fixture.events) return null
    
    const yellowCards = fixture.events.filter(e => 
      e.team.id === teamId && e.type === 'Card' && e.detail.includes('Yellow') && !e.detail.includes('Red')
    ).length
    
    const redCards = fixture.events.filter(e => 
      e.team.id === teamId && e.type === 'Card' && e.detail.includes('Red')
    ).length

    return (
      <div className="flex items-center gap-1">
        {yellowCards > 0 && (
          <div className="flex items-center gap-0.5">
            {[...Array(yellowCards)].map((_, i) => (
              <div key={`y-${i}`} className="w-3 h-4 bg-yellow-400 rounded-sm"></div>
            ))}
          </div>
        )}
        {redCards > 0 && (
          <div className="flex items-center gap-0.5">
            {[...Array(redCards)].map((_, i) => (
              <div key={`r-${i}`} className="w-3 h-4 bg-red-500 rounded-sm"></div>
            ))}
          </div>
        )}
      </div>
    )
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

        {/* Matches List - Alt Alta */}
        {loading && fixtures.length === 0 ? (
          <div className="space-y-4">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="glass-dark border-white/10 p-6 animate-pulse">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-32 bg-white/5 rounded"></div>
                  <div className="flex-1 h-8 bg-white/5 rounded"></div>
                  <div className="h-12 w-20 bg-white/5 rounded"></div>
                  <div className="flex-1 h-8 bg-white/5 rounded"></div>
                </div>
              </Card>
            ))}
          </div>
        ) : fixtures.length > 0 ? (
          <div className="space-y-3">
            {fixtures.map((fixture) => (
              <Card key={fixture.fixture.id} className="glass-dark border-white/10 hover:border-red-500/30 transition-all duration-300 group overflow-hidden">
                <div className="p-5">
                  <div className="flex items-center gap-4">
                    {/* Status & Time */}
                    <div className="flex flex-col items-center gap-2 min-w-[100px]">
                      {getStatusBadge(fixture.fixture.status.short)}
                      {fixture.fixture.status.elapsed ? (
                        <span className="text-xs text-red-400 font-bold">
                          {fixture.fixture.status.elapsed}'
                        </span>
                      ) : (
                        <span className="text-xs text-foreground/50">
                          {new Date(fixture.fixture.date).toLocaleTimeString('tr-TR', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      )}
                    </div>

                    {/* Home Team */}
                    <div className="flex items-center gap-3 flex-1 justify-end">
                      <div className="flex items-center gap-2">
                        {getTeamCards(fixture, fixture.teams.home.id)}
                        <p className="text-base font-bold text-white group-hover:text-green-400 transition-colors text-right">
                          {fixture.teams.home.name}
                        </p>
                      </div>
                      <img 
                        src={fixture.teams.home.logo} 
                        alt={fixture.teams.home.name}
                        className="h-10 w-10 object-contain"
                        onError={(e) => { e.currentTarget.style.display = 'none' }}
                      />
                    </div>

                    {/* Score */}
                    <div className="flex items-center gap-2 min-w-[80px] justify-center">
                      <span className="text-2xl font-black text-white">
                        {fixture.goals.home ?? '-'}
                      </span>
                      <span className="text-foreground/40 font-bold">:</span>
                      <span className="text-2xl font-black text-white">
                        {fixture.goals.away ?? '-'}
                      </span>
                    </div>

                    {/* Away Team */}
                    <div className="flex items-center gap-3 flex-1">
                      <img 
                        src={fixture.teams.away.logo} 
                        alt={fixture.teams.away.name}
                        className="h-10 w-10 object-contain"
                        onError={(e) => { e.currentTarget.style.display = 'none' }}
                      />
                      <div className="flex items-center gap-2">
                        <p className="text-base font-bold text-white group-hover:text-green-400 transition-colors">
                          {fixture.teams.away.name}
                        </p>
                        {getTeamCards(fixture, fixture.teams.away.id)}
                      </div>
                    </div>

                    {/* League Info */}
                    <div className="hidden lg:flex items-center gap-2 min-w-[150px]">
                      <img 
                        src={fixture.league.logo} 
                        alt={fixture.league.name}
                        className="h-6 w-6 object-contain"
                        onError={(e) => { e.currentTarget.style.display = 'none' }}
                      />
                      <span className="text-xs text-foreground/60 truncate">
                        {fixture.league.name}
                      </span>
                    </div>
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
                <h3 className="text-xl font-semibold mb-2">Şu Anda Canlı Maç Yok</h3>
                <p className="text-foreground/60">Canlı maç başladığında burada görünecek.</p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
