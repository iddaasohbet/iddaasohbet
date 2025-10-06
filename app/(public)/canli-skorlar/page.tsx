'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Radio, Trophy, RefreshCw } from 'lucide-react'

interface Match {
  home: string
  away: string
  score: string
  date?: string
  status?: string
}

export default function CanliSkorlarPage() {
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  const fetchScores = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/live-scores?league=super-lig')
      const data = await res.json()
      if (data.success && data.result) {
        setMatches(data.result)
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
        {loading && matches.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="glass-dark border-white/10 p-6 animate-pulse">
                <div className="h-24 bg-white/5 rounded-lg mb-4"></div>
                <div className="h-4 bg-white/5 rounded mb-2"></div>
                <div className="h-4 bg-white/5 rounded w-2/3"></div>
              </Card>
            ))}
          </div>
        ) : matches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.map((match, index) => (
              <Card key={index} className="glass-dark border-white/10 hover:border-red-500/30 transition-all duration-300 group">
                <div className="p-6">
                  {/* Match Info */}
                  <div className="flex flex-col items-center space-y-4">
                    {/* Home Team */}
                    <div className="text-center w-full">
                      <p className="text-lg font-bold text-white group-hover:text-green-400 transition-colors">
                        {match.home}
                      </p>
                    </div>

                    {/* Score */}
                    <div className="flex items-center justify-center">
                      <div className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 group-hover:border-red-500/50 transition-all">
                        <span className="text-3xl font-black text-red-400">
                          {match.score}
                        </span>
                      </div>
                    </div>

                    {/* Away Team */}
                    <div className="text-center w-full">
                      <p className="text-lg font-bold text-white group-hover:text-green-400 transition-colors">
                        {match.away}
                      </p>
                    </div>
                  </div>

                  {/* Match Date/Status */}
                  {match.date && (
                    <div className="mt-4 pt-4 border-t border-white/10 text-center">
                      <p className="text-xs text-foreground/60">{match.date}</p>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="glass-dark border-white/10 p-12 text-center">
            <div className="flex flex-col items-center space-y-4">
              <Trophy className="h-16 w-16 text-foreground/30" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Henüz Maç Yok</h3>
                <p className="text-foreground/60">Şu anda gösterilecek canlı maç bulunmuyor.</p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
