// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value;
  
  // Check if the route is protected
  if (request.nextUrl.pathname.startsWith('/vadim')) {
    if (!token) {
      console.log('No token found in middleware, redirecting to home');
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/vadim/:path*',
    '/(protected)/:path*'
  ],
};