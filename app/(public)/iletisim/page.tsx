"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  MessageCircle,
  Twitter,
  Instagram,
  Linkedin,
  Facebook,
  CheckCircle
} from 'lucide-react'

const contactInfo = [
  { icon: Mail, title: 'E-posta', value: 'info@iddaasohbet.com', link: 'mailto:info@iddaasohbet.com', color: 'text-green-400' },
  { icon: Phone, title: 'Telefon', value: '+90 (212) 123 45 67', link: 'tel:+902121234567', color: 'text-blue-400' },
  { icon: MapPin, title: 'Adres', value: 'Maslak, İstanbul, Türkiye', link: '#', color: 'text-yellow-400' },
  { icon: Clock, title: 'Çalışma Saatleri', value: 'Pzt-Cum: 09:00 - 18:00', link: '#', color: 'text-purple-400' }
]

const socialMedia = [
  { icon: Twitter, name: 'Twitter', url: '#', color: 'hover:text-blue-400' },
  { icon: Instagram, name: 'Instagram', url: '#', color: 'hover:text-pink-400' },
  { icon: Facebook, name: 'Facebook', url: '#', color: 'hover:text-blue-500' },
  { icon: Linkedin, name: 'LinkedIn', url: '#', color: 'hover:text-blue-600' }
]

const faqs = [
  { question: 'Nasıl üye olabilirim?', answer: 'Kayıt Ol butonuna tıklayarak ücretsiz hesap oluşturabilirsiniz.' },
  { question: 'Kupon paylaşımı ücretsiz mi?', answer: 'Evet, platformumuzda kupon paylaşmak tamamen ücretsizdir.' },
  { question: 'Verilerim güvende mi?', answer: 'Evet, SSL sertifikası ile tüm verileriniz güvence altındadır.' }
]

export default function IletisimPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="min-h-screen py-12 relative">
      <div className="absolute inset-0 grid-pattern"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 animate-fadeInUp">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <MessageCircle className="h-10 w-10 text-green-400 animate-pulse" />
            <h1 className="text-4xl md:text-5xl font-bold gradient-text">İletişim</h1>
          </div>
          <p className="text-foreground/70 text-lg max-w-2xl mx-auto">Sorularınız, önerileriniz veya geri bildirimleriniz için bize ulaşın</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          {contactInfo.map((info, index) => (
            <a key={index} href={info.link} className="block">
              <Card className="glass-dark border-white/5 card-premium h-full">
                <CardContent className="p-6 text-center">
                  <div className={`h-14 w-14 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center mx-auto mb-4 border border-white/10`}>
                    <info.icon className={`h-7 w-7 ${info.color}`} />
                  </div>
                  <p className="text-sm text-foreground/60 mb-2">{info.title}</p>
                  <p className="font-semibold text-sm">{info.value}</p>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="glass-dark border-white/5 card-premium animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Send className="h-5 w-5 text-green-400" />
                  <span>Bize Mesaj Gönderin</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {submitted ? (
                  <div className="glass-dark p-8 rounded-xl border border-green-500/20 text-center">
                    <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4 animate-pulse" />
                    <h3 className="text-2xl font-bold text-green-400 mb-2">Mesajınız Gönderildi!</h3>
                    <p className="text-foreground/70">En kısa sürede size geri dönüş yapacağız.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-foreground/80">Adınız Soyadınız *</label>
                        <Input id="name" type="text" placeholder="Ahmet Yılmaz" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="glass border-white/10 focus:border-green-500/50 bg-black/20 h-12" required />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-foreground/80">E-posta Adresiniz *</label>
                        <Input id="email" type="email" placeholder="ornek@email.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="glass border-white/10 focus:border-green-500/50 bg-black/20 h-12" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium text-foreground/80">Konu *</label>
                      <Input id="subject" type="text" placeholder="Mesajınızın konusu" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className="glass border-white/10 focus:border-green-500/50 bg-black/20 h-12" required />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-foreground/80">Mesajınız *</label>
                      <textarea id="message" rows={6} placeholder="Mesajınızı buraya yazın..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full glass border-white/10 focus:border-green-500/50 bg-black/20 rounded-lg px-4 py-3 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-green-500/20" required />
                    </div>

                    <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-green-500 to-yellow-400 hover:from-green-600 hover:to-yellow-500 text-black font-bold btn-premium h-12">
                      <Send className="mr-2 h-5 w-5" />
                      Mesajı Gönder
                    </Button>

                    <p className="text-xs text-center text-foreground/60">* İşaretli alanlar zorunludur</p>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="glass-dark border-white/5 card-premium animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
              <CardHeader>
                <CardTitle className="text-lg">Sosyal Medya</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground/60 mb-4">Bizi sosyal medyada takip edin</p>
                <div className="grid grid-cols-2 gap-3">
                  {socialMedia.map((social, index) => (
                    <a key={index} href={social.url} className={`glass p-4 rounded-xl border border-white/5 hover:border-green-500/30 transition-all flex flex-col items-center space-y-2 ${social.color}`}>
                      <social.icon className="h-6 w-6" />
                      <span className="text-xs font-medium">{social.name}</span>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-dark border-white/5 card-premium animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              <CardHeader>
                <CardTitle className="text-lg">Sıkça Sorulan Sorular</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="glass-dark p-4 rounded-lg border border-white/5">
                      <p className="font-semibold text-sm text-green-400 mb-2">{faq.question}</p>
                      <p className="text-xs text-foreground/70">{faq.answer}</p>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4 border-white/10 hover:border-green-500/50 hover:bg-green-500/10 hover:text-green-400" size="sm">Tüm SSS</Button>
              </CardContent>
            </Card>

            <Card className="glass-dark border-white/5 card-premium animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/5 flex items-center justify-center border border-green-500/20">
                    <Clock className="h-6 w-6 text-green-400 animate-pulse" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">Destek Saatleri</p>
                    <p className="text-xs text-foreground/60">7/24 online destek</p>
                  </div>
                </div>
                <div className="glass-dark p-3 rounded-lg border border-white/5 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-sm font-semibold text-green-400">Şu an aktif</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="glass-dark border-white/5 mt-12 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <MapPin className="h-6 w-6 text-yellow-400" />
                <h3 className="text-xl font-bold">Ofis Konumumuz</h3>
              </div>
            </div>
            <div className="glass-dark rounded-xl border border-white/5 overflow-hidden h-64 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-yellow-400 mx-auto mb-4 opacity-50" />
                <p className="text-foreground/60">Harita yakında eklenecek</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
