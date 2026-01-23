import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // If the URL is the root `/`
  if (request.nextUrl.pathname === '/') {
    // We create a new URL that points to `/home`
    const url = request.nextUrl.clone();
    url.pathname = '/home';
    return NextResponse.redirect(url);
  }

  // If it's not `/`, let it pass through
  return NextResponse.next();
}

export const config = {
  matcher: ['/'],
};
