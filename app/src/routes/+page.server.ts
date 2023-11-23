import { fail, redirect } from "@sveltejs/kit"

export const load = async ({ locals }) => {
  // get all books
  const books = await locals.db.book.findMany({})
  return {
    books
  }
}

export const actions = {
  addToCart: async ({request, locals}) => {
    if (!locals.user) {
      throw redirect(302, '/login')
    }
    
    const data = await request.formData()
    const bookId = data.get('id')

    if (typeof bookId !== 'string') {
      return fail(400, { bookId, missing: true })
    }

    // check if user has existing cart 
    let cart = await locals.db.cart.findFirst({
      where: {
        userId: locals.user.id
      }
    })

    if (!cart) {
      // create new cart
      cart = await locals.db.cart.create({
        data: {
          userId: locals.user.id
        }
      })
    }

    // create cart item of book
    const cartItem = await locals.db.cartItem.create({
      data: {
        bookId: bookId,
        cartId: cart.id,
        quantity: 1
      }
    })
    // add cart item to cart
    await locals.db.cart.update({
      where: { id: cart.id },
      data: {
        items: {
          connect: {
            id: cartItem.id
          }
        }
      }
    })

    return{success: true}
  }
}