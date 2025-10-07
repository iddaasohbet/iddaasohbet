'use client'

import { useEffect, useRef, useState } from 'react'
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
  const [previousScores, setPreviousScores] = useState<Map<number, number>>(new Map())
  const [recentGoals, setRecentGoals] = useState<Map<number, number>>(new Map()) // fixtureId -> timestamp
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false)
  const audioCtxRef = useRef<AudioContext | null>(null)

  const ensureAudioContext = async () => {
    if (typeof window === 'undefined') return null
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      }
      if (audioCtxRef.current.state === 'suspended') {
        await audioCtxRef.current.resume()
      }
      return audioCtxRef.current
    } catch {
      return null
    }
  }

  const playGoalSound = async () => {
    if (!soundEnabled) return
    const ctx = await ensureAudioContext()
    if (!ctx) return
    try {
      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()
      oscillator.type = 'triangle'
      oscillator.frequency.setValueAtTime(880, ctx.currentTime)
      gainNode.gain.setValueAtTime(0.0001, ctx.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 0.02)
      gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.45)
      oscillator.connect(gainNode).connect(ctx.destination)
      oscillator.start()
      oscillator.stop(ctx.currentTime + 0.48)
    } catch {
      // no-op
    }
  }

  const fetchScores = async (type: 'today' | 'live' | 'last' = 'live') => {
    setLoading(true)
    try {
      // Önce istenen tür
      const res = await fetch(`/api/live-scores?type=${type}`, { cache: 'no-store' })
      const data = await res.json()
      if (Array.isArray(data?.response) && data.response.length > 0) {
        const fetched: Fixture[] = data.response
        const nowTs = Date.now()
        // prune old recent goals (>20s)
        setRecentGoals((prev) => {
          const next = new Map(prev)
          for (const [id, ts] of next) {
            if (nowTs - ts > 20000) next.delete(id)
          }
          return next
        })

        // detect goals and update maps
        let goalHappened = false
        const nextScores = new Map(previousScores)
        const indexMap = new Map<number, number>(fetched.map((fx, idx) => [fx.fixture.id, idx]))
        const currentGoals = new Map<number, number>()
        for (const fx of fetched) {
          const id = fx.fixture.id
          const home = fx.goals.home ?? 0
          const away = fx.goals.away ?? 0
          const sum = home + away
          currentGoals.set(id, sum)
          const prevSum = previousScores.get(id)
          if (prevSum != null && sum > prevSum) {
            goalHappened = true
            setRecentGoals((prev) => {
              const next = new Map(prev)
              next.set(id, nowTs)
              return next
            })
          }
          nextScores.set(id, sum)
        }

        // sort: recently scored first (by most recent), then keep original order
        const recentMap = new Map(recentGoals)
        const sorted = [...fetched].sort((a, b) => {
          const at = recentMap.get(a.fixture.id) ?? 0
          const bt = recentMap.get(b.fixture.id) ?? 0
          if (at !== bt) return bt - at
          return (indexMap.get(a.fixture.id) ?? 0) - (indexMap.get(b.fixture.id) ?? 0)
        })

        setFixtures(sorted)
        setPreviousScores(nextScores)
        setLastUpdate(new Date())

        if (goalHappened) {
          void playGoalSound()
        }
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

  // Drop goal highlights after 20s to stop blinking
  useEffect(() => {
    const id = setInterval(() => {
      setRecentGoals((prev) => {
        const nowTs = Date.now()
        let changed = false
        const next = new Map(prev)
        for (const [fid, ts] of next) {
          if (nowTs - ts > 20000) {
            next.delete(fid)
            changed = true
          }
        }
        return changed ? next : prev
      })
    }, 1000)
    return () => clearInterval(id)
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
              onClick={async () => {
                const next = !soundEnabled
                setSoundEnabled(next)
                if (next) {
                  await ensureAudioContext()
                }
              }}
              variant="outline"
              className={`border-white/10 ${soundEnabled ? 'bg-green-500/10 text-green-400 border-green-500/30' : ''}`}
            >
              {soundEnabled ? 'Gol Sesi: Açık' : 'Gol Sesi: Kapalı'}
            </Button>
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
              {fixtures.map((fx) => {
                const highlightTs = recentGoals.get(fx.fixture.id)
                const isHighlighted = typeof highlightTs === 'number' && Date.now() - highlightTs <= 20000
                return (
                <div key={fx.fixture.id} className={`grid grid-cols-12 items-center h-14 px-3 hover:bg-white/5 transition ${isHighlighted ? 'goal-blink' : ''}`}>
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
                  <div className={`col-span-2 text-center font-bold ${isHighlighted ? 'score-blink' : ''}`}>
                    {(fx.goals.home ?? '-')}{' '}-{' '}{(fx.goals.away ?? '-')}
                  </div>
                  {/* Away */}
                  <div className="col-span-4 flex items-center gap-2 min-w-0 justify-end">
                    <span className="truncate text-right">{fx.teams.away.name}</span>
                    <img src={fx.teams.away.logo} alt={fx.teams.away.name} className="h-5 w-5 object-contain" onError={(e) => { e.currentTarget.style.display = 'none' }} />
                  </div>
                </div>
              )})}
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
      <style jsx>{`
        @keyframes goalFlash {
          0% { background-color: rgba(34, 197, 94, 0.10); }
          50% { background-color: rgba(34, 197, 94, 0.28); }
          100% { background-color: rgba(34, 197, 94, 0.10); }
        }
        .goal-blink { animation: goalFlash 1s ease-in-out infinite; }
        .score-blink { color: #22c55e; text-shadow: 0 0 8px rgba(34, 197, 94, 0.7); }
      `}</style>
    </div>
  )
}
