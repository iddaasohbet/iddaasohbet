'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { MessageCircle, Send, ArrowLeft } from 'lucide-react'

interface Message {
  id: string
  content: string
  senderId: string
  receiverId: string
  read: boolean
  createdAt: string
}

interface Conversation {
  user: { id: string; username: string | null; name: string | null; avatar?: string | null; role?: string }
  lastMessageAt: string
  unreadCount: number
}

export default function MessagesClient() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const withUserId = searchParams.get('with')

  const [conversations, setConversations] = useState<Conversation[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [selectedUser, setSelectedUser] = useState<Conversation['user'] | null>(null)
  const [newMessage, setNewMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/giris')
  }, [status])

  useEffect(() => {
    if (status === 'authenticated') {
      loadConversations()
    }
  }, [status])

  useEffect(() => {
    if (withUserId && conversations.length > 0) {
      const conv = conversations.find(c => c.user.id === withUserId)
      if (conv) {
        selectConversation(conv.user)
      }
    }
  }, [withUserId, conversations])

  const loadConversations = async () => {
    try {
      const res = await fetch('/api/direct-messages')
      const data = await res.json()
      setConversations(data.conversations || [])
    } catch (e) {
      console.error('Failed to load conversations', e)
    } finally {
      setLoading(false)
    }
  }

  const selectConversation = async (user: Conversation['user']) => {
    setSelectedUser(user)
    try {
      const res = await fetch(`/api/direct-messages?withUserId=${user.id}`)
      const data = await res.json()
      setMessages(data.messages || [])
      loadConversations()
    } catch (e) {
      console.error('Failed to load messages', e)
    }
  }

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedUser || sending) return
    setSending(true)
    try {
      const res = await fetch('/api/direct-messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newMessage, receiverId: selectedUser.id })
      })
      if (res.ok) {
        const data = await res.json()
        setMessages([...messages, data.message])
        setNewMessage('')
        loadConversations()
      }
    } catch (e) {
      console.error('Failed to send', e)
    } finally {
      setSending(false)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="animate-pulse">Yükleniyor...</div>
      </div>
    )
  }

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-12 gap-6">
        <div className={`col-span-12 ${selectedUser ? 'md:col-span-4' : 'md:col-span-12'}`}>
          <Card className="glass-dark border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-blue-400" />
                Mesajlarım
              </CardTitle>
            </CardHeader>
            <CardContent>
              {conversations.length === 0 ? (
                <div className="text-center py-8 text-foreground/60">Henüz mesajınız yok</div>
              ) : (
                <div className="space-y-2">
                  {conversations.map((conv) => (
                    <div key={conv.user.id} onClick={() => selectConversation(conv.user)}
                      className={`p-4 rounded-lg cursor-pointer transition-all ${selectedUser?.id === conv.user.id ? 'bg-blue-500/20 border border-blue-500/40' : 'bg-white/5 hover:bg-white/10 border border-white/10'}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                            {(conv.user.username || conv.user.name || 'U').charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold">{conv.user.username || conv.user.name || 'Kullanıcı'}</p>
                            <p className="text-xs text-foreground/50">
                              {new Date(conv.lastMessageAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                        {conv.unreadCount > 0 && (
                          <div className="bg-blue-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">{conv.unreadCount}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {selectedUser && (
          <div className="col-span-12 md:col-span-8">
            <Card className="glass-dark border-white/10">
              <CardHeader className="border-b border-white/5">
                <CardTitle className="flex items-center gap-3">
                  <button onClick={() => setSelectedUser(null)} className="md:hidden">
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                    {(selectedUser.username || selectedUser.name || 'U').charAt(0).toUpperCase()}
                  </div>
                  <span>{selectedUser.username || selectedUser.name || 'Kullanıcı'}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[60vh] overflow-y-auto p-4 space-y-3">
                  {messages.length === 0 ? (
                    <div className="text-center py-8 text-foreground/60">Henüz mesaj yok. İlk mesajı gönderin!</div>
                  ) : (
                    messages.map((msg) => {
                      const isMine = msg.senderId === (session?.user as any)?.id
                      return (
                        <div key={msg.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[70%] rounded-2xl px-4 py-2 ${isMine ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/40' : 'bg-white/5 border border-white/10'}`}>
                            <p className="text-sm whitespace-pre-wrap break-words">{msg.content}</p>
                            <p className="text-[10px] text-foreground/40 mt-1">{new Date(msg.createdAt).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</p>
                          </div>
                        </div>
                      )
                    })
                  )}
                </div>
                <div className="border-t border-white/5 p-4">
                  <div className="flex gap-2">
                    <Input placeholder="Mesaj yazın..." value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                      className="glass-dark border-white/10" />
                    <Button onClick={sendMessage} disabled={sending || !newMessage.trim()} className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}


