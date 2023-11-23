import { error } from '@sveltejs/kit';

export const load = ({locals}) => {
  if (!locals.user) {
    return {
      status: 302,
      redirect: "/login"
    };
  }
  if (locals.user.role !== "ADMIN") {
    throw error(403, "Forbidden");
  }
}