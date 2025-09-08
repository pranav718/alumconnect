// /middleware.ts
import { type NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  // For mock auth, check cookies
  const userRole = request.cookies.get('user-role')?.value
  const userEmail = request.cookies.get('user-email')?.value

  // Protected routes
  const protectedPaths = ['/directory', '/map', '/timeline', '/export', '/admin']
  const isProtectedPath = protectedPaths.some(path => request.nextUrl.pathname.startsWith(path))

  if (isProtectedPath && !userRole) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Admin only routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (userRole !== 'admin') {
      return NextResponse.redirect(new URL('/directory', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}