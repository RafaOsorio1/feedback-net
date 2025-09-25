import { z } from 'zod';

/**
 * Specify your server-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 */
export const server = z.object({});

/**
 * Specify your client-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 * To expose them to the client, prefix them with `NEXT_PUBLIC_`.
 */
export const client = z.object({
  NEXT_PUBLIC_API_URL: z.string().url(),
});

/**
 * You can't destruct `process.env` as a regular object in the Next.js
 * edge runtimes (e.g. middlewares) or client-side so we need to destruct manually.
 */
const processEnv = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
};

/**********************************/
/*                                */
/*     DO NOT EDIT BELOW HERE     */
/*                                */
/**********************************/

const merged = server.merge(client);

function getEnv() {
  const isServer = typeof window === 'undefined';

  const parsed = isServer
    ? merged.safeParse(processEnv)
    : client.safeParse(processEnv);

  if (parsed.success === false) {
    console.error(
      '❌ Invalid environment variables:\n',
      parsed.error.flatten(),
    );
    throw new Error('Invalid environment variables');
  }

  return new Proxy(parsed.data, {
    get(target, prop) {
      if (
        typeof prop !== 'string' ||
        (typeof prop === 'string' && !(prop in target))
      )
        return undefined;
      // Throw a descriptive error if a server-side env var is accessed on the client
      // Otherwise it would just be returning `undefined` and be annoying to debug
      if (!isServer && !prop.startsWith('NEXT_PUBLIC_'))
        throw new Error(
          `❌ Attempted to access server-side environment variable '${prop}' on the client`,
        );

      return target[prop];
    },
  });
}

export const env = getEnv();
