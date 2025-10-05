import { auth } from '@/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const { pathname } = req.nextUrl

  // Admin rotalarını kontrol et
  if (pathname.startsWith('/admin')) {
    // Login sayfası hariç tüm admin rotaları için auth gerekli
    if (pathname !== '/admin/login') {
      if (!req.auth?.user) {
        // Giriş yapmamış - login'e yönlendir
        return NextResponse.redirect(new URL('/admin/login', req.url))
      }

      // Giriş yapmış ama admin değil - 403
      if (req.auth.user.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/', req.url))
      }
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/admin/:path*'],
}
