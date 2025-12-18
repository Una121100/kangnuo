const store = require('../../utils/store.js')

Page({
  data: {
    id: null,
    product: {},
    fav: false,
    specs: [],
    selectedSpec: 0,
    showSpec: false,
    priceText: ''
  },
  onLoad(query) {
    const id = Number(query.id)
    const product = store.getProductById(id)
    const specs = this.buildSpecs(product)
    const priceText = this.getPriceText(product, specs)
    this.setData({ id, product, specs, priceText })
  },
  buildSpecs(product) {
    const base = product.price
    return [
      { name: '标准装', price: base },
      { name: '大包装', price: Number((base * 2).toFixed(1)) }
    ]
  },
  getPriceText(product, specs) {
    if (specs && specs.length > 1) {
      const prices = specs.map(s => s.price).sort((a, b) => a - b)
      return `¥ ${prices[0]} - ${prices[prices.length - 1]}`
    }
    return `¥ ${product.price}`
  },
  toggleFav() { this.setData({ fav: !this.data.fav }) },
  openService() { wx.showToast({ title: '服务说明开发中', icon: 'none' }) },
  openSpec() { this.setData({ showSpec: true }) },
  closeSpec() { this.setData({ showSpec: false }) },
  selectSpec(e) { this.setData({ selectedSpec: Number(e.currentTarget.dataset.index) }) },
  confirmSpec() { this.setData({ showSpec: false }) },
  add() {
    store.addToCart(this.data.id)
    wx.showToast({ title: '已加入购物车', icon: 'success' })
  },
  buy() {
    wx.navigateTo({ url: '/pages/order/order' })
  },
  goHome() { wx.redirectTo({ url: '/pages/index/index' }) },
  goService() { wx.showToast({ title: '联系客服开发中', icon: 'none' }) },
  goCart() { wx.redirectTo({ url: '/pages/cart/cart' }) },

})
