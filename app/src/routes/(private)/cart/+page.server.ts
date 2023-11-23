import { error, fail, redirect } from "@sveltejs/kit"

export const load = async ({ locals }) => {
  if (!locals.user) {
    throw redirect(302, '/login')
  }
  // get user cart 
  const userId = locals.user.id
  const cart = await locals.db.cart.findFirst({
    where: { 
      userId: userId
    }
  })
  if (!cart) {
    throw error(404, 'No items in cart')
  }
  // get cart items
  const cartItems = await locals.db.cartItem.findMany({
    where: {
      cartId: cart.id
    },
    include: {
      book: true
    }
  })
  // return books
  const books = cartItems.map(item => item.book)
  // get total price
  const totalPrice = books.reduce((acc, book) => {
    return acc + book.price
  }, 0)
  return {
    books,
    totalPrice
  }
}

export const actions = {
  removeFromCart: async ({request, locals}) => {
    if (!locals.user) {
      throw redirect(302, '/login')
    }

    const data = await request.formData()
    const bookId = data.get('id')

    if (typeof bookId !== 'string') {
      return fail(400, { bookId, missing: true })
    }
    
    const db = locals.db

    // get user cart 
    const userId = locals.user.id
    const cart = await db.cart.findFirst({
      where: { 
        userId: userId
      }
    })
    if (!cart) {
      throw error(404, 'No items in cart')
    }

    // get cart item
    const cartItem = await db.cartItem.findFirst({
      where: {
        bookId: bookId,
        cartId: cart.id
      }
    })
    if (!cartItem) {
      throw error(404, 'No items in cart')
    }

    // delete cart item
    await db.cartItem.delete({
      where: { id: cartItem.id }
    })

    throw redirect(302, '/cart')
  }
}