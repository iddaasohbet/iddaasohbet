'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Cookie, X, Settings } from 'lucide-react'
import Link from 'next/link'

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState({
    necessary: true,
    performance: true,
    preferences: true
  })

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent')
    if (!consent) {
      setIsVisible(true)
    }
  }, [])

  const acceptAll = () => {
    localStorage.setItem('cookieConsent', JSON.stringify({
      necessary: true,
      performance: true,
      preferences: true,
      timestamp: new Date().toISOString()
    }))
    setIsVisible(false)
  }

  const rejectAll = () => {
    localStorage.setItem('cookieConsent', JSON.stringify({
      necessary: true,
      performance: false,
      preferences: false,
      timestamp: new Date().toISOString()
    }))
    setIsVisible(false)
  }

  const savePreferences = () => {
    localStorage.setItem('cookieConsent', JSON.stringify({
      ...preferences,
      timestamp: new Date().toISOString()
    }))
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-slideUp">
      <Card className="glass-dark border-yellow-500/30 shadow-2xl max-w-4xl mx-auto">
        <CardContent className="p-6">
          {!showSettings ? (
            // Simple View
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex items-start gap-3 flex-1">
                <Cookie className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-1 animate-pulse" />
                <div>
                  <h3 className="font-bold text-white mb-1">🍪 Çerez Kullanımı</h3>
                  <p className="text-foreground/80 text-sm">
                    Sitemizde deneyiminizi iyileştirmek için çerezler kullanıyoruz. 
                    Detaylı bilgi için{' '}
                    <Link href="/cerez-politikasi" className="text-yellow-400 hover:underline">
                      çerez politikamızı
                    </Link>{' '}
                    inceleyebilirsiniz.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 items-center">
                <Button
                  onClick={() => setShowSettings(true)}
                  variant="outline"
                  size="sm"
                  className="glass border-white/20 hover:border-white/40"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Ayarlar
                </Button>
                <Button
                  onClick={rejectAll}
                  variant="outline"
                  size="sm"
                  className="glass border-red-500/30 text-red-400 hover:border-red-500/50"
                >
                  <X className="h-4 w-4 mr-2" />
                  Reddet
                </Button>
                <Button
                  onClick={acceptAll}
                  size="sm"
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-semibold"
                >
                  ✓ Kabul Et
                </Button>
              </div>
            </div>
          ) : (
            // Detailed Settings View
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <Cookie className="h-5 w-5 text-yellow-400" />
                  Çerez Tercihleri
                </h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-foreground/60 hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-3">
                {/* Necessary Cookies */}
                <div className="glass p-4 rounded-lg border border-green-500/20 bg-green-500/5">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-green-400 mb-1">Zorunlu Çerezler</h4>
                      <p className="text-foreground/70 text-xs">
                        Sitenin çalışması için gerekli. Devre dışı bırakılamaz.
                      </p>
                    </div>
                    <div className="ml-4 flex items-center">
                      <input
                        type="checkbox"
                        checked={true}
                        disabled
                        className="w-5 h-5 rounded border-green-500/30 bg-green-500/10 cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>

                {/* Performance Cookies */}
                <div className="glass p-4 rounded-lg border border-blue-500/20">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-blue-400 mb-1">Performans Çerezleri</h4>
                      <p className="text-foreground/70 text-xs">
                        Site performansını ölçmek ve iyileştirmek için kullanılır.
                      </p>
                    </div>
                    <div className="ml-4 flex items-center">
                      <input
                        type="checkbox"
                        checked={preferences.performance}
                        onChange={(e) => setPreferences({...preferences, performance: e.target.checked})}
                        className="w-5 h-5 rounded border-blue-500/30 bg-blue-500/10 cursor-pointer accent-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Preference Cookies */}
                <div className="glass p-4 rounded-lg border border-purple-500/20">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-purple-400 mb-1">Tercih Çerezleri</h4>
                      <p className="text-foreground/70 text-xs">
                        Tercihlerinizi hatırlamak için kullanılır (tema, dil vb.).
                      </p>
                    </div>
                    <div className="ml-4 flex items-center">
                      <input
                        type="checkbox"
                        checked={preferences.preferences}
                        onChange={(e) => setPreferences({...preferences, preferences: e.target.checked})}
                        className="w-5 h-5 rounded border-purple-500/30 bg-purple-500/10 cursor-pointer accent-purple-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 justify-end pt-3 border-t border-white/10">
                <Button
                  onClick={rejectAll}
                  variant="outline"
                  size="sm"
                  className="glass border-red-500/30 text-red-400 hover:border-red-500/50"
                >
                  Tümünü Reddet
                </Button>
                <Button
                  onClick={savePreferences}
                  size="sm"
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-semibold"
                >
                  Kaydet
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}