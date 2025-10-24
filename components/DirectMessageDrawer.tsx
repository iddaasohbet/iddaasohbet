'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { X, Send } from 'lucide-react'

interface Message {
  id: string
  content: string
  senderId: string
  receiverId: string
  read: boolean
  createdAt: string
}

interface Props {
  userId: string
  username: string
  onClose: () => void
}

export default function DirectMessageDrawer({ userId, username, onClose }: Props) {
  const { data: session } = useSession()
  const [messages, setMessages] = useState<Message[]>([])
  const [value, setValue] = useState('')
  const [sending, setSending] = useState(false)
  const scrollerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    const el = scrollerRef.current
    if (el) el.scrollTop = el.scrollHeight
  }

  const load = async () => {
    try {
      const res = await fetch(`/api/direct-messages?withUserId=${userId}`)
      const data = await res.json()
      setMessages(data.messages || [])
      setTimeout(scrollToBottom, 50)
    } catch {}
  }

  const send = async () => {
    if (!value.trim() || sending) return
    setSending(true)
    try {
      const res = await fetch('/api/direct-messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: value.trim(), receiverId: userId })
      })
      if (res.ok) {
        const { message } = await res.json()
        setMessages((prev) => [...prev, message])
        setValue('')
        setTimeout(scrollToBottom, 50)
      }
    } finally {
      setSending(false)
    }
  }

  useEffect(() => {
    load()
    const t = setInterval(load, 3000)
    return () => clearInterval(t)
  }, [userId])

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Drawer */}
      <div className="absolute inset-y-0 right-0 w-full md:w-[460px] bg-gradient-to-b from-slate-900 to-slate-800 border-l border-white/10 shadow-2xl flex flex-col translate-x-0 animate-slideIn">
        {/* Header */}
        <div className="px-4 py-3 border-b border-white/10 bg-gradient-to-r from-slate-900/80 to-slate-800/80">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-yellow-400 text-black font-bold flex items-center justify-center">
                  {username.charAt(0).toUpperCase()}
                </div>
                <span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-green-500 border-2 border-slate-900" />
              </div>
              <div>
                <div className="text-xs text-foreground/60">Özel Mesaj</div>
                <div className="text-sm font-semibold text-white">{username}</div>
              </div>
            </div>
            <button onClick={onClose} className="text-foreground/60 hover:text-white transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>
          {/* Quick Actions */}
          <div className="mt-3 flex items-center gap-2">
            <Link href={`/profil/${username}`} className="text-xs px-2 py-1 rounded-md bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">Profili Görüntüle</Link>
            <button className="text-xs px-2 py-1 rounded-md bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">Sessize Al</button>
            <button className="text-xs px-2 py-1 rounded-md bg-red-500/10 border border-red-500/30 text-red-300 hover:bg-red-500/20 transition-colors">Engelle</button>
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollerRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-[radial-gradient(circle_at_20%_30%,rgba(34,197,94,0.06),transparent_50%),radial-gradient(circle_at_80%_70%,rgba(250,204,21,0.06),transparent_50%)]">
          {messages.length === 0 ? (
            <div className="text-center text-foreground/50 text-sm py-12">Henüz mesaj yok.</div>
          ) : (
            messages.map((m, idx) => {
              const mine = m.senderId === (session?.user as any)?.id
              const prev = messages[idx - 1]
              const showDate = !prev || new Date(prev.createdAt).toDateString() !== new Date(m.createdAt).toDateString()
              return (
                <div key={m.id}>
                  {showDate && (
                    <div className="my-2 flex items-center justify-center">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-foreground/60">
                        {new Date(m.createdAt).toLocaleDateString('tr-TR', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                  )}
                  <div className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[82%] rounded-2xl px-4 py-2 text-sm shadow ${mine ? 'bg-gradient-to-br from-green-500/20 to-yellow-400/20 border border-green-500/30' : 'bg-white/5 border border-white/10'}`}>
                      <div className="whitespace-pre-wrap break-words leading-relaxed text-foreground/90">{m.content}</div>
                      <div className="text-[10px] text-foreground/50 mt-1 text-right">
                        {new Date(m.createdAt).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Input */}
        <div className="border-t border-white/10 p-3 bg-slate-900/60">
          <div className="flex gap-2 items-center">
            <div className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    send()
                  }
                }}
                placeholder="Mesaj yazın..."
                className="w-full bg-transparent outline-none text-sm"
                maxLength={2000}
              />
            </div>
            <button
              onClick={send}
              disabled={sending || !value.trim()}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-yellow-400 text-black font-semibold hover:from-green-600 hover:to-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-1 text-[10px] text-foreground/50 text-right">{value.length}/2000</div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0%); }
        }
        .animate-slideIn { animation: slideIn 200ms ease-out; }
      `}</style>
    </div>
  )
}


