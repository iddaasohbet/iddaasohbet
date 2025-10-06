'use client'

import { useEffect, useState } from 'react'
import { TrendingUp } from 'lucide-react'

interface League {
  league: {
    id: number
    name: string
    logo: string
  }
  country: {
    name: string
    flag: string
  }
}

export default function LiveLeagues() {
  const [leagues, setLeagues] = useState<League[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const res = await fetch('/api/leagues')
        const data = await res.json()
        console.log('Leagues data:', data)
        if (data.response && Array.isArray(data.response)) {
          // Popüler ligleri filtrele
          const popularLeagues = data.response.filter((item: League) => 
            ['Premier League', 'La Liga', 'Serie A', 'Bundesliga', 'Ligue 1', 'Süper Lig', 'Champions League'].includes(item.league.name)
          )
          setLeagues(popularLeagues.slice(0, 8))
        }
      } catch (error) {
        console.error('Failed to fetch leagues:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchLeagues()
  }, [])

  if (loading) {
    return (
      <div className="border-b border-white/5 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-6 h-12 overflow-hidden">
            <div className="flex items-center gap-2 text-green-400 font-semibold whitespace-nowrap">
              <TrendingUp className="h-4 w-4 animate-pulse" />
              <span className="text-sm">Canlı Ligler</span>
            </div>
            <div className="flex gap-4 animate-pulse">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-6 w-32 bg-white/5 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (leagues.length === 0) return null

  return (
    <div className="border-b border-white/5 bg-gradient-to-r from-black/40 via-green-950/10 to-black/40 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-6 h-12 overflow-hidden">
          {/* Label */}
          <div className="flex items-center gap-2 text-green-400 font-semibold whitespace-nowrap">
            <div className="relative">
              <TrendingUp className="h-4 w-4" />
              <div className="absolute inset-0 bg-green-500 blur-md opacity-40 animate-pulse"></div>
            </div>
            <span className="text-sm hidden sm:inline">Canlı Ligler</span>
            <span className="text-sm sm:hidden">Ligler</span>
          </div>

          {/* Scrolling Leagues */}
          <div className="flex-1 overflow-hidden relative">
            <div className="flex gap-6 animate-scroll">
              {[...leagues, ...leagues].map((league, index) => (
                <div
                  key={`${league.league.id}-${index}`}
                  className="flex items-center gap-2 whitespace-nowrap group cursor-pointer"
                >
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-sm text-foreground/70 group-hover:text-green-400 transition-colors">
                    {league.league.name}
                  </span>
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
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}
