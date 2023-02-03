// middleware.ts
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { validerToken } from './auth/verifyAccessToken';

export async function middleware(request: NextRequest) {
  const loginPath = `/oauth2/login?redirect=${request.url}/`;

  const { get } = request.headers;
  const authorization = get('authorization');

  if (request.url.includes('isReady') || request.url.includes('isAlive')) {
    return NextResponse.next();
  }

  if (!authorization || !(await validateAuthorization(authorization))) {
    return NextResponse.redirect(loginPath);
  } else {
    return NextResponse.next();
  }
}

const validateAuthorization = async (authorization: string) => {
  try {
    const token = authorization.split(' ')[1];
    const JWTVerifyResult = await validerToken(token);
    return !!JWTVerifyResult?.payload;
  } catch (e) {
    // LogError('azure ad error', e);
    return false;
  }
};

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/api/:path*',
};
