const store = require('../../utils/store.js')

Page({
  data: {
    cart: { items: [], totals: { totalCount: 0, totalPrice: 0 } }
  },
  onShow() {
    this.setData({ cart: store.getCart() })
  },
  submit() {
    if (!this.data.cart.items.length) {
      wx.showToast({ title: '购物车为空', icon: 'none' })
      return
    }
    store.clearCart()
    wx.showToast({ title: '下单成功', icon: 'success' })
    wx.redirectTo({ url: '/pages/index/index' })
  }
})
