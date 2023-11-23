import { createToken, JWT_COOKIE_NAME } from '$lib/auth';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { isPrismaClientKnownRequestError, enhance } from '@zenstackhq/runtime';
import { prisma } from '$lib/db';

export const actions = {
  default: async ({request, locals}) => {
    if (!locals.user) {
      throw redirect(302, '/login')
    }
    const data = await request.formData()
    const newPass = data.get('password')

    if (typeof newPass !== 'string') {
      return fail(400, { newPass, missing: true })
    }

    const db = locals.db

    const user = await db.user.update({
      where: { id: locals.user.id },
      data: {
        password: newPass
      }
    })

    return {message: 'Password updated'}
  }
}