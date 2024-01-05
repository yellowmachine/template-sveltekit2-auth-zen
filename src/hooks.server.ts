import { sequence } from '@sveltejs/kit/hooks';
import { createContext } from '$lib/trpc/context';
import { router } from '$lib/trpc/router';
import { createTRPCHandle } from 'trpc-sveltekit';
import { SvelteKitAuth } from "@auth/sveltekit"
import GitHub from "@auth/sveltekit/providers/github"
import { GITHUB_ID, GITHUB_SECRET } from "$env/static/private"
import { redirect, type Handle } from '@sveltejs/kit';
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const authorization: Handle = async ({ event, resolve }) => {
	
	if (event.url.pathname.startsWith('/authenticated')) {
        const session = await event.locals.getSession();
		if (!session) {
			throw redirect(303, '/auth');
		}
	}

	return resolve(event);
}

const handleTRPC: Handle = createTRPCHandle({ url: "/authenticated/trpc", router, createContext });

const handleAuth = SvelteKitAuth({
  providers: [GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET })],
  adapter: PrismaAdapter(prisma)
})

export const handle = sequence(handleAuth, authorization, handleTRPC);