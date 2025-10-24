'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { MessageCircle } from 'lucide-react'

export default function DmUnreadBell() {
  const [count, setCount] = useState(0)
  const prevRef = useRef(0)
  const [highlight, setHighlight] = useState(false)

  const load = async () => {
    try {
      const res = await fetch('/api/direct-messages/unread-count', { cache: 'no-store' })
      const data = await res.json()
      const n = Number(data?.count || 0)
      if (n > prevRef.current) {
        setHighlight(true)
        setTimeout(() => setHighlight(false), 1200)
      }
      prevRef.current = n
      setCount(n)
    } catch {}
  }

  useEffect(() => {
    load()
    const t = setInterval(load, 10000)
    return () => clearInterval(t)
  }, [])

  return (
    <Link href="/mesajlar" className="relative group">
      <div className={`inline-flex items-center justify-center h-9 w-9 rounded-lg hover:bg-white/5 transition-all ${highlight ? 'ring-2 ring-red-500/50' : ''}`}>
        <MessageCircle className="h-5 w-5" />
      </div>
      {count > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-[10px] text-white font-bold flex items-center justify-center">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </Link>
  )
}


