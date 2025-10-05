'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import AdminSidebar from '@/components/AdminSidebar'
import AdminHeader from '@/components/AdminHeader'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session, status } = useSession()
  const isLoginPage = pathname === '/admin/login'

  // Admin koruması - client side
  useEffect(() => {
    if (status === 'loading') return

    if (!isLoginPage) {
      if (!session) {
        router.push('/admin/login')
      } else if (session.user?.role !== 'ADMIN') {
        router.push('/')
      }
    }
  }, [session, status, isLoginPage, router])

  // Loading state
  if (status === 'loading' && !isLoginPage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-foreground/60">Yükleniyor...</p>
        </div>
      </div>
    )
  }

  // Not authorized
  if (!isLoginPage && (!session || session.user?.role !== 'ADMIN')) {
    return null
  }

  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        {children}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <AdminSidebar />
      <div className="lg:ml-64">
        <AdminHeader />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}