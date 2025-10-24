'use client'

import { useEffect, useState } from 'react'
import { Radio, Users } from 'lucide-react'

export default function FooterStats() {
  const [online, setOnline] = useState<number | null>(null)
  const [total, setTotal] = useState<number | null>(null)

  useEffect(() => {
    // record visit once per day
    const key = 'visit-recorded-day'
    const today = new Date().toISOString().slice(0,10)
    if (localStorage.getItem(key) !== today) {
      fetch('/api/stats/visit', { method: 'POST' }).catch(() => {})
      localStorage.setItem(key, today)
    }
    const load = async () => {
      try {
        const [o, t] = await Promise.all([
          fetch('/api/stats/online').then(r=>r.json()).catch(()=>({online:0})),
          fetch('/api/stats/visit').then(r=>r.json()).catch(()=>({total:0})),
        ])
        setOnline(o.online)
        setTotal(t.total)
      } catch {}
    }
    load()
    const id = setInterval(load, 60000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg glass border border-white/10">
        <Users className="h-4 w-4 text-green-400" />
        <span className="text-sm text-foreground/60">Şu an çevrimiçi</span>
        <span className="ml-auto text-sm font-semibold">{online ?? '—'}</span>
      </div>
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg glass border border-white/10">
        <Radio className="h-4 w-4 text-yellow-400" />
        <span className="text-sm text-foreground/60">Toplam ziyaret</span>
        <span className="ml-auto text-sm font-semibold">{total ?? '—'}</span>
      </div>
    </div>
  )
}


