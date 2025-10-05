import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Admin login sayfası hariç, middleware'de sadece basic check yapıyoruz
  // Gerçek auth check client-side veya API'de yapılacak
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
