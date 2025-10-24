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
    // presence heartbeat (keeps online counter fresh)
    const ping = () => fetch('/api/stats/ping', { method: 'POST' }).catch(() => {})
    ping()
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
    const id = setInterval(() => { load(); ping() }, 5000)
    return () => clearInterval(id)
  }, [])

  const fmt = (n: number | null) =>
    n == null ? '—' : n.toLocaleString('tr-TR')

  return (
    <div className="mt-6 flex items-center justify-between w-full text-sm">
      <div className="inline-flex items-center gap-2 text-foreground/70">
        <Users className="h-4 w-4 text-green-400" />
        <span>Şu an çevrimiçi:</span>
        <span className="font-semibold text-foreground">{fmt(online)}</span>
      </div>
      <div className="inline-flex items-center gap-2 text-foreground/70">
        <Radio className="h-4 w-4 text-yellow-400" />
        <span>Toplam ziyaret:</span>
        <span className="font-semibold text-foreground">{fmt(total)}</span>
      </div>
    </div>
  )
}


