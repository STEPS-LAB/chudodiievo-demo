import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Redirect /ua or /en paths to root
  const { pathname } = request.nextUrl;
  
  if (pathname.startsWith('/ua') || pathname.startsWith('/en')) {
    const newPathname = pathname.replace(/^\/(ua|en)/, '') || '/';
    return NextResponse.redirect(new URL(newPathname, request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
