import { JWT_COOKIE_NAME } from "$lib/auth";
import { redirect } from "@sveltejs/kit";

export const GET = ({cookies}) => {
  cookies.delete(JWT_COOKIE_NAME);
  throw redirect(303, '/login');
}