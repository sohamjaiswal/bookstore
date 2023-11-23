import { JWT_COOKIE_NAME } from "$lib/auth";
import { redirect } from "@sveltejs/kit";
import { prisma } from '$lib/db';
import jwt from 'jsonwebtoken';
import { env } from "$env/dynamic/private";

export const load = async () => {
	// we only use this endpoint for the api
	// and don't need to see the page
	throw redirect(302, '/')
}

export const actions = {
	default: async({ cookies }) => {

		const token = cookies.get(JWT_COOKIE_NAME)

		if (!token) {
			throw redirect(302, '/login')
		}

		const decoded = jwt.verify(token, env.JWT_SECRET);
    const userSession = await prisma.userSession.findUnique({
        where: { id: decoded.sub as string }
    });

    if (!userSession) {
      throw redirect(302, '/login')
    }

    // delete the session
    await prisma.userSession.delete({ where: { id: decoded.sub as string } });
		
		// eat the cookie
		cookies.delete(JWT_COOKIE_NAME, { path: '/' });

		// redirect the user
		throw redirect(302, '/login')
	},
}