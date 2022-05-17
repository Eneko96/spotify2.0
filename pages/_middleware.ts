import { getToken, GetTokenParams } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware (req: GetTokenParams<false> | undefined) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET })
  const { pathname } = req.nextUrl

  // Allow the requests if the following is true
  // 1) the token exists
  // 2) its a request for next-auth session & provider fetching
  if (pathname.includes('/api/auth') || token) {
    return NextResponse.next()
  }

  // redirect to login if don't have token and are requesting a protected route
  if (!token && pathname !== '/login') {
    return NextResponse.redirect('/login')
  }
}
