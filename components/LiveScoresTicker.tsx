'use client'

import { useEffect, useState } from 'react'
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

  const fetchLive = async () => {
    try {
      setLoading(true)
      // Önce canlı maçlar
      const resLive = await fetch('/api/live-scores?type=live', { cache: 'no-store' })
      const dataLive = await resLive.json()
      if (Array.isArray(dataLive?.response) && dataLive.response.length > 0) {
        setItems(dataLive.response)
      } else {
        // Bugün deneyelim
        const resToday = await fetch('/api/live-scores?type=today', { cache: 'no-store' })
        const dataToday = await resToday.json()
        if (Array.isArray(dataToday?.response) && dataToday.response.length > 0) {
          setItems(dataToday.response)
        } else {
          // Yaklaşan maçlar
          const resNext = await fetch('/api/live-scores?type=next', { cache: 'no-store' })
          const dataNext = await resNext.json()
          setItems(Array.isArray(dataNext?.response) ? dataNext.response : [])
        }
      }
    } catch (e) {
      console.error('Error fetching scores:', e)
      setItems([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLive()
    const id = setInterval(fetchLive, 60000)
    return () => clearInterval(id)
  }, [])

  const renderLabel = (
    <div className="flex items-center gap-2 text-red-400 font-semibold whitespace-nowrap">
      <div className="relative">
        <Radio className="h-4 w-4" />
        <div className="absolute inset-0 bg-red-500 blur-md opacity-40 animate-pulse"></div>
      </div>
      <span className="text-sm hidden sm:inline">Canlı Skorlar</span>
      <span className="text-sm sm:hidden">Skorlar</span>
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
                {[...items, ...items].map((fx, idx) => (
                  <div key={`${fx.fixture.id}-${idx}`} className="flex items-center gap-3 whitespace-nowrap">
                    <span className={`text-xs px-2 py-0.5 rounded border ${
                      fx.fixture.status.short === 'FT'
                        ? 'bg-green-500/10 text-green-400 border-green-500/30'
                        : fx.fixture.status.short === 'NS'
                        ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
                        : 'bg-red-500/10 text-red-400 border-red-500/30'
                    }`}>
                      {fx.fixture.status.short}
                    </span>
                    <span className="text-sm text-foreground/70">
                      {fx.teams.home.name.length > 12 ? fx.teams.home.name.substring(0, 12) + '...' : fx.teams.home.name} {fx.goals.home ?? '-'} - {fx.goals.away ?? '-'} {fx.teams.away.name.length > 12 ? fx.teams.away.name.substring(0, 12) + '...' : fx.teams.away.name}
                    </span>
                  </div>
                ))}
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
        .animate-scroll { animation: scroll 30s linear infinite; }
        .animate-scroll:hover { animation-play-state: paused; }
      `}</style>
    </div>
  )
}


