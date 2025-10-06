'use client'

import { useEffect, useState } from 'react'
import { TrendingUp } from 'lucide-react'

interface Match {
  home: string
  away: string
  score: string
  date?: string
  status?: string
}

export default function LiveScores() {
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const res = await fetch('/api/live-scores?league=super-lig')
        const data = await res.json()
        if (data.success && data.result) {
          // API'den gelen maçları al (son 10 maç)
          setMatches(data.result.slice(0, 10))
        }
      } catch (error) {
        console.error('Failed to fetch live scores:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchScores()
    // Her 2 dakikada bir güncelle
    const interval = setInterval(fetchScores, 120000)
    return () => clearInterval(interval)
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

  if (matches.length === 0) return null

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
            <span className="text-sm hidden sm:inline">Canlı Skorlar</span>
            <span className="text-sm sm:hidden">Skorlar</span>
          </div>

          {/* Scrolling Matches */}
          <div className="flex-1 overflow-hidden relative">
            <div className="flex gap-8 animate-scroll">
              {[...matches, ...matches].map((match, index) => (
                <div
                  key={`match-${index}`}
                  className="flex items-center gap-3 whitespace-nowrap group cursor-pointer"
                >
                  <span className="text-sm text-foreground/80 group-hover:text-white transition-colors font-medium">
                    {match.home}
                  </span>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-green-500/20 border border-green-500/30">
                    <span className="text-xs font-bold text-green-400">{match.score}</span>
                  </div>
                  <span className="text-sm text-foreground/80 group-hover:text-white transition-colors font-medium">
                    {match.away}
                  </span>
                  <div className="h-1 w-1 rounded-full bg-green-500/50"></div>
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
  )
}
