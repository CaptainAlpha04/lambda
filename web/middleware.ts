import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.pathname

  // List of protected paths you want to block access to
  const protectedPaths = []

  const isProtected = protectedPaths.some((path) =>
    url.startsWith(path)
  )

  if (isProtected) {
    return new NextResponse('🚫 Access temporarily disabled', { status: 403 })
  }

  return NextResponse.next()
}
