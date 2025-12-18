const store = require('../../utils/store.js')

Page({
  data: {
    cart: { items: [], totals: { totalCount: 0, totalPrice: 0 } }
  },
  onShow() {
    this.refresh()
  },
  refresh() {
    this.setData({ cart: store.getCart() })
  },
  inc(e) {
    const id = Number(e.currentTarget.dataset.id)
    const found = store.getCart().items.find(i => i.id === id)
    const cur = found ? found.qty : 0
    store.updateQuantity(id, cur + 1)
    this.refresh()
  },
  dec(e) {
    const id = Number(e.currentTarget.dataset.id)
    const found = store.getCart().items.find(i => i.id === id)
    const cur = found ? found.qty : 0
    store.updateQuantity(id, cur - 1)
    this.refresh()
  },
  remove(e) {
    const id = Number(e.currentTarget.dataset.id)
    store.removeFromCart(id)
    this.refresh()
  },
  goOrder() {
    wx.navigateTo({ url: '/pages/order/order' })
  }
})
