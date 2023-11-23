import { fail, redirect } from "@sveltejs/kit"

export const load = async ({ locals }) => {
  const allBooks = locals.db.book.findMany({})
  return {
    lazy: {
      allBooks
    }
  }
}

export const actions = {
  createBook: async ({request, locals}) => {
    console.log('hit this')
    const data = await request.formData()
    const title = data.get('title')
    const author = data.get('author')
    const description = data.get('description')
    const image = data.get('image')
    const price = parseInt(data.get('price') as string)
    const quantity = parseInt(data.get('quantity') as string)
    console.log(typeof title, typeof author, typeof description, typeof image, typeof price, typeof quantity)
    if (typeof title !== 'string' || typeof author !== 'string' || typeof description !== 'string' || typeof image !== 'string' || typeof price !== 'number' || typeof quantity !== 'number') {
      console.log('errored')
      return fail(400, { title, missing: true })
    }

    const db = locals.db

    await db.book.create({
      data: {
        title: title,
        author: author,
        description: description,
        image: image,
        price: price,
        quantity: quantity
      }
    })

    throw redirect(302, '/admin-books')
  },
  deleteBook: async ({request, locals}) => {
    const data = await request.formData()
    const bookId = data.get('id')

    if (typeof bookId !== 'string') {
      return fail(400, { bookId, missing: true })
    }
    
    const db = locals.db

    await db.book.delete({
      where: { id: bookId }
    })

    throw redirect(302, '/admin-books')
  },

}