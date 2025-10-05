import { Suspense } from 'react'
import GirisPageContent from './GirisPageContent'

export default function GirisPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-center">
        <div className="h-8 w-8 rounded-full bg-green-500 mx-auto mb-4"></div>
        <p className="text-foreground/60">Yükleniyor...</p>
      </div>
    </div>}>
      <GirisPageContent />
    </Suspense>
  )
}