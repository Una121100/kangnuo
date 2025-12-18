const store = require('../../utils/store.js')
const mock = require('../../utils/data.js')

Page({
  data: {
    products: [],
    banners: [],
    allProducts: [],
    query: ''
  },
  onLoad() {
    const list = store.getProducts()
    this.setData({ products: list, allProducts: list, banners: mock.banners || [] })
  },
  onShow() {
    const list = store.getProducts()
    this.setData({ products: list, allProducts: list })
  },
  onSearchInput(e) {
    const q = (e.detail.value || '').trim()
    this.setData({ query: q })
    if (this._searchTimer) clearTimeout(this._searchTimer)
    this._searchTimer = setTimeout(() => {
      if (!q) {
        this.setData({ products: this.data.allProducts })
        return
      }
      const filtered = this.data.allProducts.filter(p => (p.name || '').includes(q))
      this.setData({ products: filtered })
    }, 150)
  },
  onSearchConfirm() {
    const q = (this.data.query || '').trim()
    if (!q) {
      this.setData({ products: this.data.allProducts })
      return
    }
    const filtered = this.data.allProducts.filter(p => (p.name || '').includes(q))
    this.setData({ products: filtered })
  },
  onMenu() { wx.showToast({ title: '分类开发中', icon: 'none' }) },
  onMsg() {
    const curr = wx.getStorageSync('enableVConsole') === true
    wx.setStorageSync('enableVConsole', !curr)
    try { wx.setEnableDebug({ enableDebug: !curr }) } catch (e) { }
    wx.showToast({ title: !curr ? '调试已开启' : '调试已关闭', icon: 'none' })
    setTimeout(() => { wx.reLaunch({ url: '/pages/index/index' }) }, 500)
  },
  onAddToCart(e) {
    const id = e.detail.id
    store.addToCart(id)
    wx.showToast({ title: '已加入购物车', icon: 'success' })
  },
  onTapBanner(e) {
    const link = e.currentTarget.dataset.link
    if (!link) return
    wx.navigateTo({ url: link })
  },
  onGoDetail(e) {
    const id = e.detail.id
    wx.navigateTo({ url: `/pages/product/product?id=${id}` })
  }
})
