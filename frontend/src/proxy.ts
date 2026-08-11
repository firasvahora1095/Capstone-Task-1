import { type NextRequest, NextResponse } from 'next/server'

const PROTECTED_ROUTES = ['/dashboard', '/profile', '/settings', '/team']
const AUTH_ROUTES = ['/auth/signin', '/auth/signup']

export function proxy(req: NextRequest) {
  const sessionCookie = req.cookies.get('__session')?.value
  const isAuthenticated = Boolean(sessionCookie)

  const { pathname } = req.nextUrl

  const isProtected = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  )

  const isAuthRoute = AUTH_ROUTES.some((route) =>
    pathname.startsWith(route)
  )

  // Logged-out user trying to access a protected page
  if (isProtected && !isAuthenticated) {
    const loginUrl = req.nextUrl.clone()

    loginUrl.pathname = '/auth/signin'
    loginUrl.search = ''
    loginUrl.searchParams.set('redirect', pathname)

    return NextResponse.redirect(loginUrl)
  }

  // Already logged-in user opening sign-in/signup
  if (isAuthRoute && isAuthenticated) {
    const teamUrl = req.nextUrl.clone()

    teamUrl.pathname = '/team'
    teamUrl.search = ''

    return NextResponse.redirect(teamUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/|images/).*)',
  ],
}