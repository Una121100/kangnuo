const data = require('./data.js')

const state = {
  products: data.products,
  cart: {}
}

function getProducts() {
  return state.products
}

function getProductById(id) {
  return state.products.find(p => p.id === id)
}

function addToCart(id) {
  const cur = state.cart[id] || 0
  state.cart[id] = cur + 1
  return getCart()
}

function removeFromCart(id) {
  delete state.cart[id]
  return getCart()
}

function updateQuantity(id, qty) {
  if (qty <= 0) {
    delete state.cart[id]
  } else {
    state.cart[id] = qty
  }
  return getCart()
}

function getCart() {
  const items = Object.keys(state.cart).map(id => {
    const product = getProductById(Number(id))
    const qty = state.cart[id]
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      qty,
      subtotal: product.price * qty
    }
  })
  const totals = getTotals(items)
  return { items, totals }
}

function getTotals(items) {
  const totalCount = items.reduce((sum, i) => sum + i.qty, 0)
  const totalPrice = items.reduce((sum, i) => sum + i.subtotal, 0)
  return { totalCount, totalPrice }
}

function clearCart() {
  state.cart = {}
  return getCart()
}

module.exports = {
  getProducts,
  getProductById,
  addToCart,
  removeFromCart,
  updateQuantity,
  getCart,
  getTotals,
  clearCart
}
