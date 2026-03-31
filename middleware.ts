import { NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '0',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
};

function applySecurityHeaders(response: NextResponse) {
  for (const [key, value] of Object.entries(securityHeaders)) {
    response.headers.set(key, value);
  }
  return response;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Refresh Supabase auth session and get user
  const { user, supabaseResponse } = await updateSession(request);

  // Protect admin pages (except login)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    if (!user) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = '/admin/login';
      const redirectResponse = NextResponse.redirect(loginUrl);
      return applySecurityHeaders(redirectResponse);
    }
  }

  // Redirect logged-in users away from login page
  if (pathname === '/admin/login' && user) {
    const adminUrl = request.nextUrl.clone();
    adminUrl.pathname = '/admin';
    const redirectResponse = NextResponse.redirect(adminUrl);
    return applySecurityHeaders(redirectResponse);
  }

  // Protect admin API routes
  if (pathname.startsWith('/api/admin')) {
    if (!user) {
      return applySecurityHeaders(
        NextResponse.json(
          { success: false, error: 'Unauthorized' },
          {
            status: 401,
            headers: { 'WWW-Authenticate': 'Bearer' },
          }
        )
      );
    }
  }

  return applySecurityHeaders(supabaseResponse);
}

export const config = {
  matcher: [
    '/api/:path*',
    '/admin/:path*',
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
