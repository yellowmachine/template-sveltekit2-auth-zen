import type { Context } from '$lib/trpc/context';
import { initTRPC } from '@trpc/server';
import { createRouter } from '../../server/routers/generated/routers';

export const t = initTRPC.context<Context>().create();

export const router = createRouter(t.router, t.procedure)

export type Router = typeof router;