'use client'

import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { MessageCircle, X, Send, Minimize2, Maximize2, Zap } from 'lucide-react'

interface Message {
  id: string
  content: string
  senderId: string
  receiverId: string
  read: boolean
  createdAt: string
  sender: { id: string; username: string | null; name: string | null; avatar?: string | null; role?: string }
  receiver: { id: string; username: string | null; name: string | null; avatar?: string | null; role?: string }
}

interface DirectMessageWindowProps {
  userId: string
  username: string
  onClose: () => void
}

export default function DirectMessageWindow({ userId, username, onClose }: DirectMessageWindowProps) {
  const { data: session } = useSession()
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // Load messages
  const loadMessages = async () => {
    try {
      const res = await fetch(`/api/direct-messages?withUserId=${userId}`)
      const data = await res.json()
      setMessages(data.messages || [])
      setTimeout(scrollToBottom, 100)
    } catch (e) {
      console.error('Failed to load messages', e)
    }
  }

  // Send message
  const sendMessage = async () => {
    if (!newMessage.trim() || sending) return
    
    setSending(true)
    try {
      const res = await fetch('/api/direct-messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newMessage, receiverId: userId })
      })
      
      if (res.ok) {
        const data = await res.json()
        setMessages([...messages, data.message])
        setNewMessage('')
        setTimeout(scrollToBottom, 100)
      }
    } catch (e) {
      console.error('Failed to send', e)
    } finally {
      setSending(false)
    }
  }

  // Initial load
  useEffect(() => {
    loadMessages()
    const interval = setInterval(loadMessages, 3000) // Refresh every 3s
    return () => clearInterval(interval)
  }, [userId])

  // Focus input when opened
  useEffect(() => {
    if (!isMinimized) {
      inputRef.current?.focus()
    }
  }, [isMinimized])

  return (
    <div 
      className="fixed bottom-4 right-4 z-50 flex flex-col overflow-hidden border border-white/20 backdrop-blur-xl shadow-2xl transition-all duration-300 ease-in-out card-premium"
      style={{
        width: isMinimized ? '350px' : '420px',
        height: isMinimized ? '70px' : '600px',
        borderRadius: '24px',
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.98) 50%, rgba(51, 65, 85, 0.98) 100%)',
      }}
    >
      {/* Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-30 animate-pulse-slow -z-10"></div>
      
      {/* Header */}
      <div className="relative flex items-center justify-between p-4 border-b border-white/10 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 animate-gradient"></div>
        
        <div className="relative flex items-center gap-3 z-10">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-50 group-hover:opacity-75 transition"></div>
            <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
              {username.charAt(0).toUpperCase()}
            </div>
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-slate-900 animate-pulse shadow-lg shadow-green-400/50"></span>
          </div>
          <div>
            <p className="font-bold text-white text-lg flex items-center gap-2">
              {username}
              <Zap className="h-4 w-4 text-yellow-400 animate-pulse" />
            </p>
            <p className="text-xs text-green-400 font-semibold flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Çevrimiçi
            </p>
          </div>
        </div>
        <div className="relative flex items-center gap-2 z-10">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-white/70 hover:text-white transition-all hover:scale-110 p-2 rounded-lg hover:bg-white/10"
          >
            {isMinimized ? <Maximize2 className="h-5 w-5" /> : <Minimize2 className="h-5 w-5" />}
          </button>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-red-400 transition-all hover:scale-110 p-2 rounded-lg hover:bg-red-500/10"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      {!isMinimized && (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 glass-pattern" style={{ maxHeight: '440px' }}>
            {messages.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 mb-4 animate-bounce">
                  <MessageCircle className="h-8 w-8 text-blue-400" />
                </div>
                <p className="text-white/60 text-sm font-medium">İlk mesajı gönderin! 💬</p>
              </div>
            ) : (
              messages.map((msg, idx) => {
                const isMine = msg.senderId === (session?.user as any)?.id
                return (
                  <div key={msg.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'} animate-fadeInUp`} style={{ animationDelay: `${idx * 0.05}s` }}>
                    <div className={`relative max-w-[80%] rounded-2xl px-4 py-3 shadow-lg backdrop-blur-sm ${
                      isMine 
                        ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white border border-blue-400/30' 
                        : 'glass-dark text-white border border-white/20'
                    }`}>
                      {/* Message glow for sent messages */}
                      {isMine && (
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-20 -z-10"></div>
                      )}
                      
                      <p className="text-sm whitespace-pre-wrap break-words leading-relaxed font-medium">{msg.content}</p>
                      <div className="flex items-center justify-end gap-1 mt-1.5">
                        <p className={`text-[10px] font-semibold ${isMine ? 'text-white/80' : 'text-white/60'}`}>
                          {new Date(msg.createdAt).toLocaleTimeString('tr-TR', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                        {isMine && (
                          <span className="text-xs">
                            {msg.read ? '✓✓' : '✓'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10 bg-gradient-to-r from-slate-900/50 to-slate-800/50 backdrop-blur-sm">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Mesaj yazın..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      sendMessage()
                    }
                  }}
                  className="w-full px-4 py-3 rounded-xl glass-dark border border-white/20 text-white placeholder-white/50 focus:border-blue-500/50 focus:outline-none text-sm font-medium shadow-inner transition-all"
                  maxLength={2000}
                />
              </div>
              <button 
                onClick={sendMessage} 
                disabled={sending || !newMessage.trim()}
                className="relative px-5 py-3 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-white shadow-lg hover:shadow-xl hover:scale-105 font-semibold btn-premium"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-2 flex justify-between items-center">
              <span className="text-[10px] text-white/40 font-medium">{newMessage.length}/2000</span>
              <span className="text-[10px] text-green-400 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                Enter ile gönder
              </span>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.4s ease-out forwards;
        }
        
        @keyframes gradient {
          0%, 100% { 
            background-position: 0% 50%; 
          }
          50% { 
            background-position: 100% 50%; 
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        @keyframes pulse-slow {
          0%, 100% { 
            opacity: 0.3; 
          }
          50% { 
            opacity: 0.5; 
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        
        .glass-pattern {
          background: 
            radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.05) 0%, transparent 50%);
        }
      `}</style>
    </div>
  )
}

