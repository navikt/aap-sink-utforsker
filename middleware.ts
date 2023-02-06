// middleware.ts
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const loginPath = `/oauth2/login?redirect=${url}/`;

  const { get } = request.headers;
  const authorization = get('authorization');

  console.log('requestUrl', request.url);
  console.log('url', url);
  console.log('authorization', authorization);

  // if (!authorization) {
  //   return NextResponse.rewrite(loginPath);
  // } else {
  //   return NextResponse.rewrite(url);
  // }
}

// const validateAuthorization = async (authorization: string) => {
//   try {
//     const token = authorization.split(' ')[1];
//     const JWTVerifyResult = await validerToken(token);
//     return !!JWTVerifyResult?.payload;
//   } catch (e) {
//     // LogError('azure ad error', e);
//     return false;
//   }
// };

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/api/:path*',
};
