// middleware.ts
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { validateAuthorization } from './auth/verifyAccessToken';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  console.log(request.nextUrl.pathname, request.nextUrl.basePath);
  console.log('request nexturl pathname', request.nextUrl.pathname);
  console.log('request nexturl basepath', request.nextUrl.basePath);

  const authorization = request.headers.get('authorization');

  const loginPath = new URL('/oauth2/login', request.url);

  if (request.nextUrl.pathname.includes('/isAlive') || request.nextUrl.pathname.includes('/isReady')) {
    return NextResponse.next();
  }

  console.log('authorization', authorization);
  if (authorization != null) {
    if (await validateAuthorization(authorization)) {
      console.log('has auth header');
      NextResponse.next();
    }
  } else {
    console.log('has no auth header');
    return NextResponse.redirect(loginPath);
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/api/:path*'],
};
