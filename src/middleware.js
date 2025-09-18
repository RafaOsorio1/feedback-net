import { NextResponse } from 'next/server';

export function middleware(request) {
  console.log('yo estuve aquí');
  // Si la URL es la raíz `/`
  if (request.nextUrl.pathname === '/') {
    //http://localhost:3000/
    // Creamos nueva URL que apunta a `/home`
    const url = request.nextUrl.clone(); //http://localhost:3000/
    url.pathname = '/home'; //http://localhost:3000/home
    return NextResponse.redirect(url);
  }

  // Si no es `/`, dejamos pasar normal
  return NextResponse.next();
}

export const config = {
  matcher: ['/'],
};
