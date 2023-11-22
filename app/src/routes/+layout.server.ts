export const load = async ({ locals, url }) => {
	const {user} = locals
  return {
    user,
    url: url.pathname
  }
}