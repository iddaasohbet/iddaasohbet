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
}

export default function LiveChatPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [messages, setMessages] = useState<ChatMsg[]>([])
  const [value, setValue] = useState('')
  const [sending, setSending] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/giris')
  }, [status])

  const fetchMessages = async () => {
    const res = await fetch('/api/chat/messages', { cache: 'no-store' })
    const data = await res.json()
    setMessages(data.messages || [])
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50)
  }

  useEffect(() => {
    fetchMessages()
    const id = setInterval(fetchMessages, 5000)
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
                {/* Placeholder - will populate from API later */}
                {session?.user && (
                  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5">
                    <div className="relative h-2 w-2">
                      <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-60"></span>
                      <span className="relative block h-2 w-2 rounded-full bg-green-500"></span>
                    </div>
                    <span className="text-sm truncate">{(session.user as any)?.username || session.user.name}</span>
                  </div>
                )}
                <div className="text-xs text-foreground/60 px-2">Yakında: tüm online kullanıcılar</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat Area */}
        <div className="col-span-12 md:col-span-9">
          <Card className="glass-dark border-white/10 shadow-xl">
            <CardHeader className="border-b border-white/5 py-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <div className="relative">
                  <Radio className="h-4 w-4 text-red-500 animate-pulse" />
                  <div className="absolute inset-0 bg-red-500 blur-md opacity-30 animate-pulse" />
                </div>
                Genel Sohbet
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[60vh] overflow-y-auto p-4 space-y-3">
                {messages.map(m => {
                  const mine = m.user?.id === (session?.user as any)?.id
                  return (
                    <div key={m.id} className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm ${mine ? 'bg-green-500/20 border border-green-500/30' : 'bg-white/5 border border-white/10'}`}>
                        <div className="text-xs text-foreground/60 mb-1 font-medium">{m.user?.username || m.user?.name || 'Kullanıcı'}</div>
                        <div className="whitespace-pre-wrap break-words leading-relaxed">{m.content}</div>
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


