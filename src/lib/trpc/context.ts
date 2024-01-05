// lib/trpc/context.ts
import type { RequestEvent } from '@sveltejs/kit';
import type { inferAsyncReturnType } from '@trpc/server';
import { prisma } from '$lib/db';
import { enhance } from '@zenstackhq/runtime';

// we're not using the event parameter is this example,
// hence the eslint-disable rule
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function createContext(event: RequestEvent) {

  const user = event.locals.user;  
  return {
    user,
    db: enhance(prisma, {
        user: user ? { id: user.id } : undefined
    })
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;