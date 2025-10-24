'use client'

import { useEffect, useRef, useState } from 'react'
import { Radio } from 'lucide-react'

interface FixtureItem {
  fixture: {
    id: number
    status: { short: string; long: string; elapsed: number | null }
    date: string
  }
  teams: {
    home: { id: number; name: string; logo: string }
    away: { id: number; name: string; logo: string }
  }
  goals: { home: number | null; away: number | null }
}

export default function LiveScoresTicker() {
  const [items, setItems] = useState<FixtureItem[]>([])
  const [loading, setLoading] = useState(true)
  const [recentGoals, setRecentGoals] = useState<Map<number, number>>(new Map())
  const previousMapRef = useRef<Map<number, number>>(new Map())

  const fetchLive = async () => {
    try {
      setLoading(true)
      // Sadece canlı maçlar
      const resLive = await fetch('/api/live-scores?type=live', { cache: 'no-store' })
      const dataLive = await resLive.json()
      const list: FixtureItem[] = Array.isArray(dataLive?.response) ? dataLive.response : []
      const nowTs = Date.now()
      // prune old highlights (>20s)
      setRecentGoals((prev) => {
        const next = new Map(prev)
        for (const [id, ts] of next) if (nowTs - ts > 20000) next.delete(id)
        return next
      })
      // detect goals
      const prev = previousMapRef.current
      const nextPrev = new Map(prev)
      for (const fx of list) {
        const id = fx.fixture.id
        const sum = (fx.goals.home ?? 0) + (fx.goals.away ?? 0)
        const old = prev.get(id)
        if (old != null && sum > old) {
          setRecentGoals((p) => { const n = new Map(p); n.set(id, nowTs); return n })
        }
        nextPrev.set(id, sum)
      }
      previousMapRef.current = nextPrev
      // sort by recent goal timestamp desc, then keep order
      const recent = new Map(recentGoals)
      const indexMap = new Map<number, number>(list.map((fx, i) => [fx.fixture.id, i]))
      const sorted = [...list].sort((a, b) => {
        const at = recent.get(a.fixture.id) ?? 0
        const bt = recent.get(b.fixture.id) ?? 0
        if (at !== bt) return bt - at
        return (indexMap.get(a.fixture.id) ?? 0) - (indexMap.get(b.fixture.id) ?? 0)
      })
      setItems(sorted)
    } catch (e) {
      console.error('Error fetching scores:', e)
      setItems([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLive()
    const id = setInterval(fetchLive, 15000)
    return () => clearInterval(id)
  }, [])

  const renderLabel = (
    <div className="flex items-center gap-2 text-red-400 font-semibold whitespace-nowrap">
      <div className="relative">
        <Radio className="h-4 w-4 animate-pulse" />
        <span className="absolute -top-1 -right-1 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
        </span>
      </div>
      <span className="text-sm">Canlı</span>
    </div>
  )

  return (
    <div className="border-b border-white/5 bg-gradient-to-r from-black/40 via-red-950/10 to-black/40 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-6 h-12 overflow-hidden">
          {renderLabel}
          <div className="flex-1 overflow-hidden relative">
            {loading ? (
              <div className="flex gap-4 animate-pulse">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-6 w-40 bg-white/5 rounded"></div>
                ))}
              </div>
            ) : items.length > 0 ? (
              <div className="flex gap-8 animate-scroll">
                {[...items, ...items].map((fx, idx) => {
                  const ts = recentGoals.get(fx.fixture.id)
                  const highlight = typeof ts === 'number' && Date.now() - ts <= 20000
                  return (
                  <div key={`${fx.fixture.id}-${idx}`} className={`flex items-center gap-3 whitespace-nowrap ${highlight ? 'score-blink' : ''}`}>
                    {/* Live icon + minute */}
                    <span className="flex items-center gap-1 text-red-400">
                      <Radio className="h-3 w-3 animate-pulse" />
                      <span className="text-xs font-semibold">
                        {fx.fixture.status.elapsed != null ? `${fx.fixture.status.elapsed}'` : 'HT'}
                      </span>
                    </span>
                    {/* Pair */}
                    <span className="text-sm text-foreground/70">
                      {fx.teams.home.name.length > 12 ? fx.teams.home.name.substring(0, 12) + '...' : fx.teams.home.name} {fx.goals.home ?? '-'} - {fx.goals.away ?? '-'} {fx.teams.away.name.length > 12 ? fx.teams.away.name.substring(0, 12) + '...' : fx.teams.away.name}
                    </span>
                  </div>
                )})}
              </div>
            ) : (
              <div className="text-sm text-foreground/50">Gösterilecek skor bulunamadı</div>
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll { animation: scroll 15s linear infinite; }
        .animate-scroll:hover { animation-play-state: paused; }
        
        /* Mobilde daha hızlı */
        @media (max-width: 768px) {
          .animate-scroll { animation: scroll 8s linear infinite; }
        }
        
        .score-blink { color: #22c55e; text-shadow: 0 0 8px rgba(34, 197, 94, 0.7); }
      `}</style>
    </div>
  )
}


