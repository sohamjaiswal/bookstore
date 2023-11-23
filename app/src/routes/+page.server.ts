export const load = async ({ locals }) => {
  // get all books
  const books = await locals.db.book.findMany({})
  return {
    books
  }
}