'use client'

import { useEffect, useRef, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Send, Radio, Smile, Reply, Trash2, Shield, User, Trophy, TrendingUp, Calendar, Share2, MessageCircle, X, Megaphone, Globe } from 'lucide-react'
import DirectMessageDrawer from '@/components/DirectMessageDrawer'
 

interface ChatMsg {
  id: string
  content: string
  createdAt: string
  user: { id: string; username: string | null; name: string | null; avatar?: string | null; role?: string }
  reactions?: { id: string; emoji: string; userId: string }[]
  parent?: { id: string; content: string; user: { id: string; username: string | null; name: string | null } } | null
  couponId?: string | null
}

// Kupon Kartı Bileşeni
function CouponCard({ couponId, session, userId }: { couponId: string, session: any, userId: string }) {
  const [couponData, setCouponData] = useState<any>(null)
  
  useEffect(() => {
    fetch(`/api/kuponlar/${couponId}`)
      .then(res => res.json())
      .then(data => setCouponData(data.coupon))
      .catch(() => {})
  }, [couponId])

  if (!couponData) {
    return <div className="animate-pulse text-xs">Kupon yükleniyor...</div>
  }

  return (
    <div className="space-y-2">
      <div className="text-xs text-foreground/60 mb-2">📋 Kupon paylaştı:</div>
      <div className="glass p-4 rounded-xl border border-green-500/30 bg-gradient-to-br from-green-500/5 to-yellow-400/5">
        {/* Kupon Başlık */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-yellow-400" />
            <span className="text-sm font-bold">{couponData.matches?.length || 0} Maçlı Kupon</span>
          </div>
          <div className="text-right">
            <div className="text-2xl font-black text-yellow-400">{Number(couponData.totalOdds || 0).toFixed(2)}</div>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              couponData.status === 'WON' ? 'bg-green-500/20 text-green-400' :
              couponData.status === 'LOST' ? 'bg-red-500/20 text-red-400' :
              'bg-blue-500/20 text-blue-400'
            }`}>
              {couponData.status === 'WON' ? '✅ Kazandı' : couponData.status === 'LOST' ? '❌ Kaybetti' : '⏳ Bekliyor'}
            </span>
          </div>
        </div>

        {/* Maçlar */}
        <div className="space-y-2 mb-3">
          {(couponData.matches || []).slice(0, 3).map((match: any, idx: number) => (
            <div key={idx} className="bg-black/20 p-2 rounded-lg text-xs">
              <div className="flex justify-between">
                <span className="font-medium">{match.homeTeam} - {match.awayTeam}</span>
                <span className="text-yellow-400 font-bold">{Number(match.odds || 0).toFixed(2)}</span>
              </div>
              <div className="text-foreground/50 text-[10px] mt-0.5">{match.prediction}</div>
            </div>
          ))}
          {couponData.matches?.length > 3 && (
            <div className="text-center text-xs text-foreground/50">
              +{couponData.matches.length - 3} maç daha...
            </div>
          )}
        </div>

        {/* Aksiyonlar */}
        <div className="flex gap-2">
          <a 
            href={`/kupon/${couponId}`}
            className="flex-1 text-center px-3 py-1.5 rounded-lg bg-gradient-to-r from-green-500 to-yellow-400 text-black text-xs font-semibold hover:from-green-600 hover:to-yellow-500 transition-all"
          >
            Kuponu Görüntüle
          </a>
          {session?.user && (session.user as any).id !== userId && (
            <button 
              onClick={async () => {
                // Kuponu kopyala
                const res = await fetch('/api/kuponlar', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    matches: couponData.matches,
                    totalOdds: couponData.totalOdds,
                    stake: 0
                  })
                })
                if (res.ok) {
                  alert('✅ Bu kuponu profilinize eklediniz!')
                }
              }}
              className="px-3 py-1.5 rounded-lg bg-blue-500/20 border border-blue-500/40 text-blue-400 text-xs font-semibold hover:bg-blue-500/30 transition-all"
            >
              🎯 Bu kuponu yaptım
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default function LiveChatPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [messages, setMessages] = useState<ChatMsg[]>([])
  const [value, setValue] = useState('')
  const [sending, setSending] = useState(false)
  const [online, setOnline] = useState<{id:string; user:{id:string; username:string|null; name:string|null; avatar?:string|null}; typingUntil?:string|null}[]>([])
  const [replyTo, setReplyTo] = useState<ChatMsg | null>(null)
  const [showAdminMenu, setShowAdminMenu] = useState<string | null>(null)
  const [showUserProfile, setShowUserProfile] = useState<string | null>(null)
  const [showShareCoupon, setShowShareCoupon] = useState(false)
  const [dmWindow, setDmWindow] = useState<{userId: string; username: string} | null>(null)
  const [userCoupons, setUserCoupons] = useState<any[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [autoScroll, setAutoScroll] = useState(true)
  const [profileTab, setProfileTab] = useState<'about' | 'stats' | 'actions'>('about')
  const bottomRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const didMountRef = useRef(false)
  const prevMsgCountRef = useRef(0)

  const scrollToBottom = () => {
    // Yazarken veya kullanıcı manuel kaydırırken otomatik scroll yapma
    if (isTyping || !autoScroll) return
    const el = listRef.current
    if (el) el.scrollTop = el.scrollHeight
  }

  // Üyeliksiz görüntüleme serbest; yönlendirme kaldırıldı

  const fetchMessages = async (opts?: { cursor?: string }) => {
    try {
      const res = await fetch('/api/chat/messages', { cache: 'no-store' })
      if (!res.ok) return { messages: [] }
      const data = await res.json()
      setMessages(prev => {
        // İlk yüklemede hoş geldiniz + admin girişi mesajları
        if (!didMountRef.current) {
          const welcome: ChatMsg = {
            id: 'bot-welcome',
            content: 'Hoş geldiniz! Ben Sohbet Botu.\nKomutlar: /kurallar, /yardim',
            createdAt: new Date().toISOString(),
            user: { id: 'bot', username: 'Sohbet Botu', name: 'Sohbet Botu', avatar: null }
          }
          const msgs = [welcome, ...(data.messages || [])]
          // Admin girişinde özel mesaj
          if ((session?.user as any)?.role === 'ADMIN') {
            const adminJoin: ChatMsg = {
              id: 'admin-join',
              content: `🛡️ Admin ${(session.user as any)?.username || session.user?.name} sohbete katıldı!`,
              createdAt: new Date().toISOString(),
              user: { id: 'system', username: 'Sistem', name: 'Sistem', avatar: null }
            }
            msgs.splice(1, 0, adminJoin)
          }
          return msgs
        }
        const newMsgs = data.messages || []
        // Yeni mesaj geldi mi kontrol et
        if (newMsgs.length > prevMsgCountRef.current) {
          setTimeout(() => {
            const el = listRef.current
            if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
          }, 100)
        }
        prevMsgCountRef.current = newMsgs.length
        return newMsgs
      })
      if (!didMountRef.current) {
        didMountRef.current = true
      }
      // Yeni veri geldikten hemen sonra aşağı kaydır
      setTimeout(scrollToBottom, 30)
      return data
    } catch {
      return { messages: [] }
    }
  }

  useEffect(() => {
    fetchMessages()
    // İlk girişte hemen heartbeat gönder ve listeyi çek
    if ((session?.user as any)?.id) {
      ;(async () => {
        try {
          await fetch('/api/chat/presence', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ typing: false }) })
          const r = await fetch('/api/chat/presence', { cache: 'no-store' })
          if (r.ok) {
            const d = await r.json()
            setOnline(d.users || [])
          }
        } catch {}
      })()
    } else {
      // Üyeliksiz kullanıcılar için sadece listeyi çek
      ;(async () => {
        try {
          const r = await fetch('/api/chat/presence', { cache: 'no-store' })
          if (r.ok) {
            const d = await r.json()
            setOnline(d.users || [])
          }
        } catch {}
      })()
    }
    const id = setInterval(fetchMessages, 3000)
    let pres: any
    if ((session?.user as any)?.id) {
      pres = setInterval(async () => {
        try {
          const post = await fetch('/api/chat/presence', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ typing: false }) })
          if (!post.ok) return
          const r = await fetch('/api/chat/presence', { cache: 'no-store' })
          if (r.ok) {
            const d = await r.json()
            setOnline(d.users || [])
          }
        } catch {}
      }, 3000)
    }
    return () => { clearInterval(id); if (pres) clearInterval(pres) }
  }, [])

  // Her mesaj geldiğinde otomatik aşağı kaydır (kullanıcı alt kısma yakınsa)
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      if (autoScroll) {
        const el = listRef.current
        if (el) el.scrollTop = el.scrollHeight
      }
    })
    return () => cancelAnimationFrame(id)
  }, [messages.length, autoScroll])

  const send = async () => {
    const text = value.trim()
    if (!text) return
    setSending(true)
    setIsTyping(false)
    try {
      const res = await fetch('/api/chat/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: text, parentId: replyTo?.id })
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({} as any))
        alert(err?.error || 'Mesaj gönderilemedi')
        return
      }
      setValue('')
      setReplyTo(null)
      await fetchMessages()
      scrollToBottom()
    } catch (e) {
      alert('Mesaj gönderilirken bir hata oluştu')
    } finally {
      setSending(false)
    }
  }

  if (status === 'loading') return null

  return (
    <div className="container mx-auto px-0 md:px-4 py-8 min-h-[calc(100vh-64px-400px)]">
      <div className="grid grid-cols-12 gap-6">
        {/* Online Users Sidebar - hide on mobile */}
        <div className="hidden md:block md:col-span-3">
          <Card className="glass-dark border-white/10">
            <CardHeader className="border-b border-white/5 py-3">
              <CardTitle className="text-sm">Çevrimiçi</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-[65vh] overflow-y-auto p-3 space-y-2">
                {/* Spor-Bot sabit giriş */}
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5">
                  <div className="relative h-2 w-2">
                    <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-60"></span>
                    <span className="relative block h-2 w-2 rounded-full bg-emerald-500"></span>
                  </div>
                  <span className="text-sm truncate flex items-center gap-1 text-emerald-300 font-semibold">
                    <Shield className="h-3 w-3" /> Spor-Bot
                  </span>
                </div>
                {/* Reklam Botu sabit giriş */}
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5">
                  <div className="relative h-2 w-2">
                    <span className="absolute inset-0 rounded-full bg-yellow-400 animate-ping opacity-50"></span>
                    <span className="relative block h-2 w-2 rounded-full bg-yellow-400"></span>
                  </div>
                  <span className="text-sm truncate flex items-center gap-1 text-yellow-300 font-semibold">
                    <Megaphone className="h-3 w-3" /> Reklam Botu
                  </span>
                </div>
                {online.map((o) => (
                  <div key={o.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-all"
                    onClick={() => setShowUserProfile(o.user.id)}
                  >
                    <div className={`relative h-2 w-2 ${o.user?.role === 'ADMIN' ? 'bg-amber-400 rounded-full' : ''}`}>
                      {o.user?.role !== 'ADMIN' && <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-60"></span>}
                      <span className={`relative block h-2 w-2 rounded-full ${o.user?.role === 'ADMIN' ? 'bg-amber-400' : 'bg-green-500'}`}></span>
                    </div>
                    <span className={`text-sm truncate flex items-center gap-1 ${o.user?.role === 'ADMIN' ? 'text-amber-300 font-semibold' : ''}`}>
                      {o.user?.role === 'ADMIN' && <Shield className="h-3 w-3" />}
                      {o.user?.username || o.user?.name || 'Kullanıcı'}
                    </span>
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
              {/* Bot üst bandı gizlendi */}
            </CardHeader>
            <CardContent className="p-0">
              <div ref={listRef} className="h-[60vh] overflow-y-auto p-4 space-y-3 scroll-smooth"
                   onScroll={(e) => {
                     const el = e.currentTarget
                     const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight
                     // Alt kısma yakınsa autoscroll açık, değilse kapalı
                     setAutoScroll(distanceFromBottom < 40)
                   }}>
              {/* Tarih ayırıcıları ve gruplama basit versiyon */}
              {messages.map((m, idx) => {
                const prev = messages[idx - 1]
                const showDate = !prev || new Date(prev.createdAt).toDateString() !== new Date(m.createdAt).toDateString()
                const mine = m.user?.id === (session?.user as any)?.id
                const isBot = m.user?.id === 'bot'
                const isGoal = /^\[GOL\]/i.test(m.content)
                const isAd = (m.user?.username === 'reklam-botu') || /cihatsoft\.com/i.test(m.content)
                return (
                  <div key={m.id}>
                    {showDate && (
                      <div className="text-center text-[10px] text-foreground/50 my-2">
                        {new Date(m.createdAt).toLocaleDateString('tr-TR')}
                      </div>
                    )}
                    <div className={`flex gap-3 ${mine ? 'justify-end' : 'justify-start'} group`}>
                      {!mine && !isBot && (
                        <div className="flex-shrink-0 mt-1">
                          <div className={`h-8 w-8 rounded-full flex items-center justify-center text-black font-bold text-xs ${m.user && (m.user as any).role === 'ADMIN' ? 'bg-gradient-to-br from-yellow-400 to-amber-500 ring-2 ring-amber-300 shadow-amber-500/30 shadow-lg' : 'bg-gradient-to-br from-green-500 to-yellow-400'}`}>
                            {(m.user?.username || m.user?.name || 'U').charAt(0).toUpperCase()}
                          </div>
                        </div>
                      )}
                      {isBot && !isGoal && (
                        <div className="flex-shrink-0 mt-1">
                          <div className="h-8 w-8 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center">
                            <Radio className="h-4 w-4 text-purple-400" />
                          </div>
                        </div>
                      )}
                      <div className={`max-w-[75%] ${
                        (isGoal || isAd)
                          ? 'p-0 bg-transparent border-0 shadow-none'
                          : mine
                            ? 'rounded-xl px-3 py-1.5 text-[13px] shadow-none bg-gradient-to-r from-green-500/15 to-yellow-400/10 border border-green-500/30'
                            : isBot
                              ? 'rounded-2xl px-4 py-2.5 text-sm shadow-lg bg-gradient-to-br from-emerald-500/15 to-teal-500/10 border border-emerald-400/30 ring-1 ring-emerald-300/20'
                              : (m.user && (m.user as any).role === 'ADMIN')
                                ? 'rounded-2xl px-4 py-2.5 text-sm shadow-lg bg-amber-500/10 border border-amber-400/40 backdrop-blur-sm'
                                : 'rounded-2xl px-4 py-2.5 text-sm shadow-lg bg-white/5 border border-white/10 backdrop-blur-sm'
                      }`}>
                        {m.parent && (
                          <div className="text-[10px] mb-2 px-2 py-1.5 rounded-lg bg-black/30 border border-white/10">
                            <div className="flex items-center gap-1 mb-0.5">
                              <Reply className="h-3 w-3 text-foreground/40" />
                              <span className="text-foreground/60 font-medium">{m.parent.user.username || m.parent.user.name}</span>
                            </div>
                            <div className="text-foreground/70 line-clamp-2">{m.parent.content.slice(0, 80)}{m.parent.content.length>80?'…':''}</div>
                          </div>
                        )}
                        {!mine && !isBot && (
                          <div className={`text-xs mb-1.5 font-semibold flex items-center gap-1 cursor-pointer hover:text-green-400 transition-colors ${m.user && (m.user as any).role === 'ADMIN' ? 'text-amber-300' : 'text-foreground/60'}`}
                            onClick={() => setShowUserProfile(m.user.id)}
                          >
                            {m.user && (m.user as any).role === 'ADMIN' && <Shield className="h-3 w-3" />}
                            {m.user?.username || m.user?.name || 'Kullanıcı'}
                          </div>
                        )}
                        {isBot && (
                          <div className="text-[11px] text-emerald-300 mb-1.5 font-semibold flex items-center gap-2">
                            <div className="relative">
                              <Radio className="h-3.5 w-3.5" />
                              <div className="absolute inset-0 bg-emerald-400 blur-sm opacity-30" />
                            </div>
                            Canlı Skor Botu
                          </div>
                        )}
                        {/* Bot gol mesajı premium şablon */}
                        {(() => {
                          // Kupon paylaşımı kontrolü
                          const couponMatch = /\[KUPON:([^\]]+)\]/.exec(m.content)
                          if (couponMatch && m.couponId) {
                            return <CouponCard couponId={m.couponId} session={session} userId={m.user.id} />
                          }
                          // Reklam botu premium kart
                          const isAdMsg = (m.user?.username === 'reklam-botu') || /cihatsoft\.com/i.test(m.content)
                          if (isAdMsg) {
                            const lines = (m.content || '').split('\n').filter(Boolean)
                            const title = lines.shift() || 'Reklam'
                            return (
                              <div className="relative overflow-hidden rounded-xl border border-yellow-400/30 bg-gradient-to-br from-yellow-500/10 to-green-500/10 p-4 shadow-lg">
                                <div className="absolute -left-10 -top-10 w-28 h-28 bg-yellow-500/20 blur-3xl rounded-full" />
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2 text-yellow-300 text-xs font-bold uppercase tracking-wider">
                                    <Megaphone className="h-4 w-4" /> Reklam Botu
                                  </div>
                                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 border border-white/20 text-foreground/70">Sponsorlu</span>
                                </div>
                                <div className="mt-2 text-sm font-semibold text-foreground/90">{title}</div>
                                <div className="mt-2 space-y-1.5 text-sm">
                                  {lines.map((l, i) => (
                                    <div key={i} className="flex items-start gap-2 text-foreground/80">
                                      <span className="mt-1 inline-block w-1.5 h-1.5 rounded-full bg-yellow-400" />
                                      <span className="whitespace-pre-wrap break-words">{l}</span>
                                    </div>
                                  ))}
                                </div>
                                <div className="mt-3 flex items-center gap-2">
                                  <a href="https://cihatsoft.com" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-green-500 to-yellow-400 text-black text-xs font-semibold hover:from-green-600 hover:to-yellow-500">cihatsoft.com</a>
                                  <a href="https://cihatsoft.com#iletisim" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs hover:bg-white/10">İletişim</a>
                                </div>
                              </div>
                            )
                          }
                          // GOL mesajlarını gönderen kim olursa olsun premium karta çevir
                          const re = /\[GOL\]\s*(\d+)'\s*(.*?)\s+(\d+)-(\d+)\s+(.*)/i
                          const match = re.exec(m.content)
                          if (match) {
                            const minute = match[1]
                            const home = match[2]
                            const hs = match[3]
                            const as = match[4]
                            const away = match[5]
                            return (
                            <div className="relative overflow-hidden rounded-xl border border-emerald-400/30 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 p-3 shadow-lg">
                              <div className="absolute -right-8 -top-8 w-32 h-32 bg-emerald-500/20 blur-3xl rounded-full" />
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-200 text-[10px] border border-emerald-400/30 font-semibold">
                                    {minute}'
                                  </div>
                                  <div className="text-[10px] uppercase tracking-wider text-emerald-300 font-bold flex items-center gap-1">
                                    <Radio className="h-3.5 w-3.5" /> Gol Bilgisi
                                  </div>
                                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-300">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Canlı
                                  </span>
                                </div>
                              </div>
                              <div className="mt-2 flex items-center justify-between">
                                <span className="text-foreground/90 font-semibold max-w-[46%] truncate">{home}</span>
                                <span className="px-3 py-1 rounded-lg bg-emerald-400/20 border border-emerald-400/40 text-emerald-200 font-extrabold tabular-nums">
                                  {hs}
                                  <span className="mx-1 opacity-80">-</span>
                                  {as}
                                </span>
                                <span className="text-foreground/90 font-semibold max-w-[46%] truncate text-right">{away}</span>
                              </div>
                            </div>
                            )
                          }
                          // Normal mesaj akışı
                          if (!isBot) return (
                            <div className="whitespace-pre-wrap break-words leading-relaxed text-foreground/90">{m.content}</div>
                          )
                          return <div className="whitespace-pre-wrap break-words leading-relaxed text-emerald-100">{m.content}</div>
                        })()}
                        <div className="flex items-center gap-2 mt-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            className="text-[11px] px-2 py-1 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:scale-110 transition-all"
                            onClick={async () => { await fetch('/api/chat/reactions', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ messageId: m.id, emoji: '👍' }) }); fetchMessages() }}
                          >👍</button>
                          <button
                            className="text-[11px] px-2 py-1 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:scale-110 transition-all"
                            onClick={async () => { await fetch('/api/chat/reactions', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ messageId: m.id, emoji: '🔥' }) }); fetchMessages() }}
                          >🔥</button>
                          <button
                            className="text-[11px] px-2 py-1 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 flex items-center gap-1 transition-all"
                            onClick={() => setReplyTo(m)}
                          >
                            <Reply className="h-3 w-3" /> Yanıtla
                          </button>
                          {(session?.user as any)?.role === 'ADMIN' || (session?.user as any)?.role === 'MODERATOR' ? (
                            <>
                              <button
                                className="text-[11px] px-2 py-1 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 hover:bg-red-500/20 flex items-center gap-1 transition-all"
                                onClick={async () => { await fetch(`/api/chat/moderation?id=${m.id}`, { method: 'DELETE' }); fetchMessages() }}
                              >
                                <Trash2 className="h-3 w-3" /> Sil
                              </button>
                              {!mine && m.user?.id !== 'bot' && m.user?.id !== 'system' && (
                                <button
                                  className="text-[11px] px-2 py-1 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 hover:bg-yellow-500/20 transition-all"
                                  onClick={() => setShowAdminMenu(m.user.id)}
                                >
                                  ⚙️
                                </button>
                              )}
                            </>
                          ) : null}
                        </div>
                        {m.reactions && m.reactions.length > 0 && (
                          <div className="flex gap-1.5 mt-2">
                            {Object.entries(m.reactions.reduce((acc: Record<string, number>, r) => { acc[r.emoji] = (acc[r.emoji]||0)+1; return acc }, {})).map(([emoji, count]) => (
                              <span key={emoji} className="text-[11px] px-2 py-0.5 rounded-full bg-white/10 border border-white/10 hover:bg-white/15 cursor-pointer transition-all">{emoji} {count}</span>
                            ))}
                          </div>
                        )}
                      </div>
                      {mine && (
                        <div className="flex-shrink-0 mt-1">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-500 to-yellow-400 flex items-center justify-center text-black font-bold text-xs">
                            {((session?.user as any)?.username || session?.user?.name || 'U').charAt(0).toUpperCase()}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
                <div ref={bottomRef} />
              </div>
              <div className="p-4 border-t border-white/5 flex gap-2">
                {replyTo && (
                  <div className="absolute -mt-10 left-4 right-44 text-[11px] px-2 py-1 rounded bg-white/5 border border-white/10">
                    <span className="text-foreground/60 mr-2">Yanıtlıyor:</span>
                    <span className="text-foreground/80 font-medium">{replyTo.user.username || replyTo.user.name}</span> — {replyTo.content.slice(0, 80)}{replyTo.content.length>80?'…':''}
                    <button className="ml-2 text-foreground/50 hover:text-foreground/80" onClick={() => setReplyTo(null)}>Kapat</button>
                  </div>
                )}
                <Input
                  placeholder="Mesaj yaz... (/kurallar, /yardim)"
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value)
                    setIsTyping(true)
                    // typing ping (fire-and-forget)
                    if ((session?.user as any)?.id) {
                      fetch('/api/chat/presence', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ typing: true }) }).catch(() => {})
                    }
                  }}
                  onKeyDown={(e) => { 
                    if (e.key === 'Enter') {
                      setIsTyping(false)
                      send()
                    }
                  }}
                  onBlur={() => setIsTyping(false)}
                  className="glass-dark border-white/10"
                  disabled={!session?.user}
                />
                <Button onClick={send} disabled={sending || !value.trim() || !session?.user} className="bg-gradient-to-r from-green-500 to-yellow-400 text-black font-semibold">
                  <Send className="h-4 w-4 mr-1" /> Gönder
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {!session?.user && (
        <div className="container mx-auto px-4 mt-2">
          <div className="text-center text-xs text-foreground/60">
            Sohbeti görüntüleyebilirsin; mesaj yazmak için lütfen giriş yap.
          </div>
        </div>
      )}

      {/* Admin Menu Modal */}
      {showAdminMenu && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center" onClick={() => setShowAdminMenu(null)}>
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 rounded-2xl p-6 shadow-2xl max-w-sm w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold mb-4">Moderasyon</h3>
            <div className="space-y-3">
              <button
                className="w-full px-4 py-2 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 hover:bg-yellow-500/20 transition-all"
                onClick={async () => {
                  await fetch('/api/chat/admin', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'mute', userId: showAdminMenu, reason: 'Moderasyon', duration: 10 }) })
                  alert('Kullanıcı 10 dakika susturuldu')
                  setShowAdminMenu(null)
                }}
              >
                🔇 10 Dakika Sustur
              </button>
              <button
                className="w-full px-4 py-2 rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-300 hover:bg-orange-500/20 transition-all"
                onClick={async () => {
                  await fetch('/api/chat/admin', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'mute', userId: showAdminMenu, reason: 'Moderasyon', duration: 60 }) })
                  alert('Kullanıcı 1 saat susturuldu')
                  setShowAdminMenu(null)
                }}
              >
                🔇 1 Saat Sustur
              </button>
              <button
                className="w-full px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 hover:bg-red-500/20 transition-all"
                onClick={async () => {
                  await fetch('/api/chat/admin', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'ban', userId: showAdminMenu, reason: 'Moderasyon', duration: null }) })
                  alert('Kullanıcı kalıcı banlandı')
                  setShowAdminMenu(null)
                }}
              >
                🚫 Kalıcı Banla
              </button>
              <button
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                onClick={() => setShowAdminMenu(null)}
              >
                İptal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mini Profil Modal */}
      {showUserProfile && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center" onClick={() => setShowUserProfile(null)}>
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 rounded-2xl p-0 shadow-2xl w-full max-w-lg mx-4 overflow-hidden" onClick={(e) => e.stopPropagation()}>
            {(() => {
              const user = online.find(o => o.user.id === showUserProfile)?.user || 
                          messages.find(m => m.user.id === showUserProfile)?.user
              if (!user) return null

              const isOnline = online.some(o => o.user.id === user.id)
              return (
                <>
                  {/* Header */}
                  <div className="relative p-6 border-b border-white/10 bg-gradient-to-r from-slate-900/80 to-slate-800/80">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-500 to-yellow-400 text-black font-bold text-2xl flex items-center justify-center shadow-lg">
                          {(user.username || user.name || 'U').charAt(0).toUpperCase()}
                        </div>
                        <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-900 ${isOnline ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-bold truncate">{user.username || user.name || 'Kullanıcı'}</h3>
                          {(user as any).role === 'ADMIN' && (
                            <span className="px-2 py-0.5 text-[10px] rounded bg-amber-500/20 text-amber-300 border border-amber-400/30">ADMIN</span>
                          )}
                        </div>
                        <div className="text-xs text-foreground/60 mt-0.5">{isOnline ? 'Çevrimiçi' : 'Çevrimdışı'}</div>
                      </div>
                      <button className="text-foreground/60 hover:text-white" onClick={() => setShowUserProfile(null)}>
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="px-6 pt-4">
                    <div className="inline-flex bg-white/5 border border-white/10 rounded-lg p-1">
                      <button onClick={() => setProfileTab('about')} className={`px-3 py-1.5 text-xs rounded-md ${profileTab==='about' ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 'text-foreground/70 hover:text-foreground'}`}>Hakkında</button>
                      <button onClick={() => setProfileTab('stats')} className={`px-3 py-1.5 text-xs rounded-md ${profileTab==='stats' ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 'text-foreground/70 hover:text-foreground'}`}>İstatistik</button>
                      <button onClick={() => setProfileTab('actions')} className={`px-3 py-1.5 text-xs rounded-md ${profileTab==='actions' ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 'text-foreground/70 hover:text-foreground'}`}>Aksiyonlar</button>
                    </div>
                  </div>

                  {/* Tab Content */}
                  <div className="p-6">
                    {profileTab === 'about' && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-3">
                          <div className="glass p-3 rounded-lg text-center border border-white/10">
                            <Trophy className="h-5 w-5 text-yellow-400 mx-auto mb-1" />
                            <p className="text-xs text-foreground/60">Kupon</p>
                            <p className="text-lg font-bold">-</p>
                          </div>
                          <div className="glass p-3 rounded-lg text-center border border-white/10">
                            <TrendingUp className="h-5 w-5 text-green-400 mx-auto mb-1" />
                            <p className="text-xs text-foreground/60">Başarı</p>
                            <p className="text-lg font-bold">-%</p>
                          </div>
                          <div className="glass p-3 rounded-lg text-center border border-white/10">
                            <Calendar className="h-5 w-5 text-blue-400 mx-auto mb-1" />
                            <p className="text-xs text-foreground/60">Üyelik</p>
                            <p className="text-lg font-bold">Yeni</p>
                          </div>
                        </div>
                        <div className="text-xs text-foreground/70 leading-relaxed">
                          Bu kullanıcı hakkında kurumsal özet bilgileri burada yer alır. (Bio, ilgi alanları vb.)
                        </div>
                      </div>
                    )}

                    {profileTab === 'stats' && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-foreground/60">Toplam Kupon</span>
                          <span className="font-semibold">-</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-foreground/60">Kazanma Oranı</span>
                          <span className="font-semibold">-%</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-foreground/60">Toplam Kazanç</span>
                          <span className="font-semibold">₺-</span>
                        </div>
                      </div>
                    )}

                    {profileTab === 'actions' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button
                          className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-yellow-400 text-black font-semibold hover:from-green-600 hover:to-yellow-500 transition-all"
                          onClick={() => {
                            setDmWindow({ userId: user.id, username: user.username || user.name || 'Kullanıcı' })
                            setShowUserProfile(null)
                          }}
                        >
                          Mesaj Gönder
                        </button>
                        <a 
                          href={`/profil/${user.username || user.id}`}
                          className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-center"
                        >
                          Profili Görüntüle
                        </a>
                        <button
                          className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                          onClick={() => alert('Şikayet alındı. İncelemeye gönderildi.')}
                        >
                          Şikayet Et
                        </button>
                        <button
                          className="w-full px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 hover:bg-red-500/20 transition-all"
                          onClick={() => alert('Kullanıcı engellendi (yerel).')}
                        >
                          Engelle
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="px-6 pb-6 pt-2 flex justify-end">
                    <button className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-sm" onClick={() => setShowUserProfile(null)}>Kapat</button>
                  </div>
                </>
              )
            })()}
          </div>
        </div>
      )}

      {/* Kupon Paylaş Modal */}
      {showShareCoupon && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center" onClick={() => setShowShareCoupon(false)}>
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 rounded-2xl p-6 shadow-2xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Share2 className="h-6 w-6 text-green-400" />
              Kupon Paylaş
            </h3>
            
            {userCoupons.length > 0 ? (
              <div className="space-y-3 mb-4">
                {userCoupons.map((coupon) => (
                  <div key={coupon.id} className="glass p-4 rounded-xl border border-white/5 hover:border-green-500/30 transition-all cursor-pointer"
                    onClick={async () => {
                      await fetch('/api/chat/messages', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ content: `[KUPON:${coupon.id}]`, couponId: coupon.id })
                      })
                      setShowShareCoupon(false)
                      await fetchMessages()
                    }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <p className="font-bold text-sm mb-1">{coupon.matches?.length || 0} Maç</p>
                        <p className="text-xs text-foreground/50">
                          {new Date(coupon.createdAt).toLocaleDateString('tr-TR')}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-yellow-400">{Number(coupon.totalOdds || 0).toFixed(2)}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          coupon.status === 'WON' ? 'bg-green-500/20 text-green-400' :
                          coupon.status === 'LOST' ? 'bg-red-500/20 text-red-400' :
                          'bg-blue-500/20 text-blue-400'
                        }`}>
                          {coupon.status === 'WON' ? 'Kazandı' : coupon.status === 'LOST' ? 'Kaybetti' : 'Bekliyor'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-foreground/60">
                Henüz paylaşılacak kuponunuz yok
              </div>
            )}
            
            <button
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
              onClick={() => setShowShareCoupon(false)}
            >
              Kapat
            </button>
          </div>
        </div>
      )}

      {/* Direkt Mesaj Drawer (X tarzı, sağdan açılır) */}
      {dmWindow && (
        <DirectMessageDrawer
          userId={dmWindow.userId}
          username={dmWindow.username}
          onClose={() => setDmWindow(null)}
        />
      )}
    </div>
  )
}


