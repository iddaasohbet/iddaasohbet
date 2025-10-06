'use client'

import { useEffect, useRef, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Send, Radio } from 'lucide-react'

interface ChatMsg {
  id: string
  content: string
  createdAt: string
  user: { id: string; username: string | null; name: string | null; avatar?: string | null }
  reactions?: { id: string; emoji: string; userId: string }[]
}

export default function LiveChatPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [messages, setMessages] = useState<ChatMsg[]>([])
  const [value, setValue] = useState('')
  const [sending, setSending] = useState(false)
  const [online, setOnline] = useState<{id:string; user:{id:string; username:string|null; name:string|null; avatar?:string|null}; typingUntil?:string|null}[]>([])
  const bottomRef = useRef<HTMLDivElement>(null)
  const didMountRef = useRef(false)

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/giris')
  }, [status])

  const fetchMessages = async (opts?: { cursor?: string }) => {
    const res = await fetch('/api/chat/messages', { cache: 'no-store' })
    const data = await res.json()
    setMessages(prev => {
      // İlk yüklemede hoş geldiniz bot mesajını ekle
      if (!didMountRef.current) {
        const welcome: ChatMsg = {
          id: 'bot-welcome',
          content: 'Hoş geldiniz! Ben Sohbet Botu.\nKomutlar: /kurallar, /yardim',
          createdAt: new Date().toISOString(),
          user: { id: 'bot', username: 'Sohbet Botu', name: 'Sohbet Botu', avatar: null }
        }
        return [welcome, ...(data.messages || [])]
      }
      return data.messages || []
    })
    if (!didMountRef.current) {
      // İlk girişte otomatik scroll YAPMA
      didMountRef.current = true
    }
    return data
  }

  useEffect(() => {
    fetchMessages()
    const id = setInterval(fetchMessages, 5000)
    const pres = setInterval(async () => {
      // Heartbeat
      await fetch('/api/chat/presence', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ typing: false }) })
      const r = await fetch('/api/chat/presence', { cache: 'no-store' })
      const d = await r.json()
      setOnline(d.users || [])
    }, 5000)
    return () => clearInterval(id)
  }, [])

  const send = async () => {
    if (!value.trim()) return
    setSending(true)
    try {
      await fetch('/api/chat/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: value.trim() })
      })
      setValue('')
      await fetchMessages()
      // Mesaj gönderince alta kaydır
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50)
    } finally {
      setSending(false)
    }
  }

  if (status === 'loading') return null

  return (
    <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-64px-400px)]">
      <div className="grid grid-cols-12 gap-6">
        {/* Online Users Sidebar */}
        <div className="col-span-12 md:col-span-3">
          <Card className="glass-dark border-white/10">
            <CardHeader className="border-b border-white/5 py-3">
              <CardTitle className="text-sm">Çevrimiçi</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-[65vh] overflow-y-auto p-3 space-y-2">
                {online.map((o) => (
                  <div key={o.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5">
                    <div className="relative h-2 w-2">
                      <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-60"></span>
                      <span className="relative block h-2 w-2 rounded-full bg-green-500"></span>
                    </div>
                    <span className="text-sm truncate">{o.user?.username || o.user?.name || 'Kullanıcı'}</span>
                    {o.typingUntil && new Date(o.typingUntil) > new Date() ? (
                      <span className="ml-auto text-[10px] text-foreground/50">yazıyor…</span>
                    ) : null}
                  </div>
                ))}
                {online.length === 0 && (
                  <div className="text-xs text-foreground/60 px-2">Şu anda çevrimiçi kimse yok</div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat Area */}
        <div className="col-span-12 md:col-span-9">
          <Card className="glass-dark border-white/10 shadow-xl">
            <CardHeader className="border-b border-white/5 py-4 space-y-3">
              <CardTitle className="flex items-center justify-between text-base">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Radio className="h-4 w-4 text-red-500 animate-pulse" />
                    <div className="absolute inset-0 bg-red-500 blur-md opacity-30 animate-pulse" />
                  </div>
                  Genel Sohbet
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <button onClick={() => setValue('/kurallar')} className="text-xs px-2 py-1 rounded border border-white/10 hover:border-green-500/40 hover:text-green-400 transition">/kurallar</button>
                  <button onClick={() => setValue('/yardim')} className="text-xs px-2 py-1 rounded border border-white/10 hover:border-green-500/40 hover:text-green-400 transition">/yardim</button>
                </div>
              </CardTitle>
              {/* Bot üst bandı */}
              <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
                <div className="relative mt-0.5">
                  <Radio className="h-4 w-4 text-purple-400" />
                  <div className="absolute inset-0 bg-purple-500 blur-sm opacity-30" />
                </div>
                <div className="text-xs text-foreground/70 leading-relaxed">
                  <div className="font-semibold text-foreground">Sohbet Botu</div>
                  Hoş geldiniz! Kuralları görmek için <span className="text-green-400">/kurallar</span> yazın. Yardım için <span className="text-green-400">/yardim</span>.
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[60vh] overflow-y-auto p-4 space-y-3">
              {/* Tarih ayırıcıları ve gruplama basit versiyon */}
              {messages.map((m, idx) => {
                const prev = messages[idx - 1]
                const showDate = !prev || new Date(prev.createdAt).toDateString() !== new Date(m.createdAt).toDateString()
                  const mine = m.user?.id === (session?.user as any)?.id
                  return (
                    <div key={m.id}>
                      {showDate && (
                        <div className="text-center text-[10px] text-foreground/50 my-2">
                          {new Date(m.createdAt).toLocaleDateString('tr-TR')}
                        </div>
                      )}
                      <div className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm ${m.user?.id === 'bot' ? 'bg-purple-500/10 border border-purple-500/30' : mine ? 'bg-green-500/20 border border-green-500/30' : 'bg-white/5 border border-white/10'}`}>
                        <div className="text-xs text-foreground/60 mb-1 font-medium">{m.user?.username || m.user?.name || 'Kullanıcı'}</div>
                        <div className="whitespace-pre-wrap break-words leading-relaxed">{m.content}</div>
                        {m.reactions && m.reactions.length > 0 && (
                          <div className="flex gap-1 mt-1">
                            {Object.entries(m.reactions.reduce((acc: Record<string, number>, r) => { acc[r.emoji] = (acc[r.emoji]||0)+1; return acc }, {})).map(([emoji, count]) => (
                              <span key={emoji} className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/10 border border-white/10">{emoji} {count}</span>
                            ))}
                          </div>
                        )}
                      </div>
                      </div>
                    </div>
                  )
                })}
                <div ref={bottomRef} />
              </div>
              <div className="p-4 border-t border-white/5 flex gap-2">
                <Input
                  placeholder="Mesaj yaz... (/kurallar, /yardim)"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') send() }}
                  className="glass-dark border-white/10"
                />
                <Button onClick={send} disabled={sending || !value.trim()} className="bg-gradient-to-r from-green-500 to-yellow-400 text-black font-semibold">
                  <Send className="h-4 w-4 mr-1" /> Gönder
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


