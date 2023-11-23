import { fail, redirect } from "@sveltejs/kit"

export const load = async ({locals}) => {
  if (!locals.user) {
    throw redirect(302, '/login')
  }
  // return user sessions
  const userId = locals.user.id
  const sessions = await locals.db.userSession.findMany({
    where: { 
      userId: userId
    }
  })
  return {
    sessions
  }
}

export const actions = {
  revoke: async ({request, locals}) => {
    if (!locals.user) {
      throw redirect(302, '/login')
    }

    const data = await request.formData()
    const sessionId = data.get('id')

    if (typeof sessionId !== 'string') {
      return fail(400, { sessionId, missing: true })
    }
    
    const db = locals.db

    await db.userSession.delete({
      where: { id: sessionId }
    })

    throw redirect(302, '/sessions')
  }
}