import { redirect } from "@sveltejs/kit"

export const load = async ({ locals }) => {
	// redirect user if logged in
	if (!locals.user) {
		throw redirect(302, '/login')
	}
}