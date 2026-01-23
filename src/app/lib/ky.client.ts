import ky from 'ky';

import { env } from '../env/client';

export class WebHttpClient {
  static publicClient = ky.extend({
    prefixUrl: env.NEXT_PUBLIC_API_URL,
  });

  static client = ky.extend({
    prefixUrl: env.NEXT_PUBLIC_API_URL,
    // hooks: {
    //   beforeRequest: [
    //     (request) => {
    //       const token = getTokenCookie();

    //       if (token) {
    //         request.headers.set("Authorization", `Bearer ${token.accessToken}`);
    //       }
    //     },
    //   ],
    // },
  });

  // static getToken(): { accessToken: string; refreshToken: string } | undefined {
  //   const token = cookiesInstance.get("token");

  //   return token?.value ? JSON.parse(token.value) : undefined;
  // }
}
