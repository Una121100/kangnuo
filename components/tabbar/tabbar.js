Component({
  properties: {
    current: { type: String, value: 'index' }
  },
  methods: {
    go(e) {
      const page = e.currentTarget.dataset.page
      let url = ''
      if (page === 'index') url = '/pages/index/index'
      if (page === 'cart') url = '/pages/cart/cart'
      if (page === 'order') url = '/pages/order/order'
      if (page === 'profile') url = '/pages/profile/profile'
      wx.redirectTo({ url })
    }
  }
})
