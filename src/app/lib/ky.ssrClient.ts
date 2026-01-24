import ky from 'ky';
import { cookies } from 'next/headers';
import 'server-only';
import { env } from '../env/client';

export class SsrHttpClient {
  static publicClient = ky.extend({
    prefixUrl: env.NEXT_PUBLIC_API_URL,
  });

  static client = ky.extend({
    prefixUrl: env.NEXT_PUBLIC_API_URL,
    hooks: {
      beforeRequest: [
        async (request) => {
          try {
            const cookieStore = await cookies();
            const tokenStr = cookieStore.get('token')?.value;

            if (tokenStr) {
              try {
                const token = JSON.parse(tokenStr);
                const accessToken = token.accessToken || token;
                if (accessToken) {
                  request.headers.set('Authorization', `Bearer ${accessToken}`);
                }
              } catch {
                request.headers.set('Authorization', `Bearer ${tokenStr}`);
              }
            }
          } catch (error) {
            console.error('Error accessing cookies in SSR:', error);
          }
        },
      ],
    },
  });
}
