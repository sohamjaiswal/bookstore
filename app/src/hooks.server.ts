import { env } from '$env/dynamic/private';
import { JWT_COOKIE_NAME } from '$lib/auth';
import { prisma } from '$lib/db';
import type { Handle } from "@sveltejs/kit";
import { enhance } from '@zenstackhq/runtime';
import jwt from 'jsonwebtoken';

export const handle: Handle = async ({ event, resolve }) => {
	let theme = '';
	const cookieTheme = event.cookies.get('theme');
  if (cookieTheme) {
		theme = cookieTheme;
	} else {
		event.cookies.set('theme', 'skeleton', {
			path: '/'
		});
		theme = 'skeleton';
	}

	const token = event.cookies.get(JWT_COOKIE_NAME);
    if (token) {
        try {
            const decoded = jwt.verify(token, env.JWT_SECRET);
            const userSession = await prisma.userSession.findUnique({
                where: { id: decoded.sub as string },
								include: { user: true }
            });
            if (userSession?.user) {
                event.locals.user = userSession.user;
            } else {
                console.warn('Session not found:', decoded.sub);
								prisma.userSession.delete({ where: { id: decoded.sub as string } });
                event.cookies.delete(JWT_COOKIE_NAME, { path: '/' });
            }
        } catch (err)	{
						console.warn('Invalid JWT:', err);
            event.cookies.delete(JWT_COOKIE_NAME, { path: '/' });
        }
    }
    event.locals.db = enhance(prisma, {
        user: event.locals.user ? { id: event.locals.user.id } : undefined
    });
  
  return await resolve(event, {
		transformPageChunk: ({ html }) => html.replace('data-theme=""', `data-theme="${theme}"`)
	});
}