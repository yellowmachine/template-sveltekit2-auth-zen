// lib/trpc/router.ts
import type { Context } from '$lib/trpc/context';
import { initTRPC } from '@trpc/server';
//import delay from 'delay';
import { createRouter } from '../../server/routers/generated/routers';

export const t = initTRPC.context<Context>().create();

export const router = createRouter(t.router, t.procedure)
/* t.router({
  greeting: t.procedure.query(async () => {
    //await delay(500); // 👈 simulate an expensive operation
    return `Hello tRPC v10 @ ${new Date().toLocaleTimeString()}`;
  })
});
*/

export type Router = typeof router;