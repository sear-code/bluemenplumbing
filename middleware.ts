import { NextRequest, NextResponse } from 'next/server';

const ADMIN_API_SECRET = process.env.ADMIN_API_SECRET;

const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '0',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
};

function isAdminRoute(pathname: string): boolean {
  return pathname.startsWith('/api/admin');
}

function verifyAdminAuth(request: NextRequest): boolean {
  if (!ADMIN_API_SECRET) {
    console.error('ADMIN_API_SECRET is not configured');
    return false;
  }

  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false;
  }

  const token = authHeader.slice(7);
  return token === ADMIN_API_SECRET;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin API routes
  if (isAdminRoute(pathname)) {
    if (!verifyAdminAuth(request)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        {
          status: 401,
          headers: {
            ...securityHeaders,
            'WWW-Authenticate': 'Bearer',
          },
        }
      );
    }
  }

  const response = NextResponse.next();

  // Apply security headers to all responses
  for (const [key, value] of Object.entries(securityHeaders)) {
    response.headers.set(key, value);
  }

  return response;
}

export const config = {
  matcher: [
    '/api/:path*',
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
