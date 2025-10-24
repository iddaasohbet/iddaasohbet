import { Suspense } from 'react'
import MessagesClient from './MessagesClient'

export const dynamic = 'force-dynamic'

export default function MessagesPage() {
  return (
    <Suspense fallback={<div className="container max-w-7xl mx-auto px-4 py-8"><div className="animate-pulse">Yükleniyor...</div></div>}>
      <MessagesClient />
    </Suspense>
  )
}
