Component({
  properties: {
    current: { type: String, value: 'index' }
  },
  methods: {
    go(e) {
      const page = e.currentTarget.dataset.page
      if (page === 'hot') {
        wx.showToast({ title: '热卖榜开发中', icon: 'none' })
        return
      }
      let url = ''
      if (page === 'index') url = '/pages/index/index'
      if (page === 'cart') url = '/pages/cart/cart'
      if (page === 'order') url = '/pages/order/order'
      if (page === 'profile') url = '/pages/profile/profile'
      if (url) wx.redirectTo({ url })
    }
  }
})
