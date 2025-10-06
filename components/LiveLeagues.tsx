'use client'

import { useEffect, useState } from 'react'
import { Radio } from 'lucide-react'
import Link from 'next/link'

interface Fixture {
  fixture: {
    id: number
    status: {
      short: string
      elapsed: number | null
    }
  }
  teams: {
    home: {
      name: string
      logo: string
    }
    away: {
      name: string
      logo: string
    }
  }
  goals: {
    home: number | null
    away: number | null
  }
  league: {
    name: string
    country: string
  }
}

export default function LiveLeagues() {
  const [fixtures, setFixtures] = useState<Fixture[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLiveMatches = async () => {
      try {
        const res = await fetch('/api/live-scores?type=live')
        const data = await res.json()
        if (data.response && Array.isArray(data.response)) {
          setFixtures(data.response.slice(0, 15)) // İlk 15 canlı maç
        }
      } catch (error) {
        console.error('Failed to fetch live matches:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchLiveMatches()
    // Her 1 dakikada bir güncelle
    const interval = setInterval(fetchLiveMatches, 60000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="border-b border-white/5 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-6 h-12 overflow-hidden">
            <div className="flex items-center gap-2 text-red-400 font-semibold whitespace-nowrap">
              <Radio className="h-4 w-4 animate-pulse" />
              <span className="text-sm">Canlı Skorlar</span>
            </div>
            <div className="flex gap-4 animate-pulse">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-6 w-40 bg-white/5 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (fixtures.length === 0) return null

  return (
    <Link href="/canli-skorlar" className="block">
      <div className="border-b border-white/5 bg-gradient-to-r from-black/40 via-red-950/10 to-black/40 backdrop-blur-sm hover:bg-red-950/20 transition-all cursor-pointer">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-6 h-12 overflow-hidden">
            {/* Label */}
            <div className="flex items-center gap-2 text-red-400 font-semibold whitespace-nowrap">
              <div className="relative">
                <Radio className="h-4 w-4" />
                <div className="absolute inset-0 bg-red-500 blur-md opacity-40 animate-pulse"></div>
              </div>
              <span className="text-sm hidden sm:inline">Canlı Skorlar</span>
              <span className="text-sm sm:hidden">Canlı</span>
              <div className="flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </div>
            </div>

            {/* Scrolling Live Matches */}
            <div className="flex-1 overflow-hidden relative">
              <div className="flex gap-8 animate-scroll">
                {[...fixtures, ...fixtures].map((fixture, index) => (
                  <div
                    key={`${fixture.fixture.id}-${index}`}
                    className="flex items-center gap-3 whitespace-nowrap group"
                  >
                    <span className="text-sm text-foreground/80 group-hover:text-white transition-colors font-medium">
                      {fixture.teams.home.name}
                    </span>
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-red-500/20 border border-red-500/30">
                      <span className="text-xs font-bold text-red-400">
                        {fixture.goals.home ?? 0} - {fixture.goals.away ?? 0}
                      </span>
                      {fixture.fixture.status.elapsed && (
                        <span className="text-xs text-red-300">
                          {fixture.fixture.status.elapsed}'
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-foreground/80 group-hover:text-white transition-colors font-medium">
                      {fixture.teams.away.name}
                    </span>
                    <span className="text-xs text-foreground/50">
                      ({fixture.league.country})
                    </span>
                    <div className="h-1 w-1 rounded-full bg-red-500/50"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .animate-scroll {
            animation: scroll 40s linear infinite;
          }
          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}</style>
      </div>
    </Link>
  )
}
