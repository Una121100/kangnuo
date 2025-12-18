Page({
  data: {
    addr: {
      name: '郭女士',
      phone: '18812345678',
      full: '北京市北京市昌平区 天通苑北一区37号楼快递柜'
    },
    shops: [],
    total: '0.00'
  },

  onLoad() {
    let selected = [];
    try {
      selected = wx.getStorageSync('confirmOrders') || [];
    } catch (e) {
      selected = [];
    }

    if (!selected.length) {
      wx.showToast({ title: '暂无待确认订单', icon: 'none' });
      return;
    }

    const shops = selected.map(order => ({
      shopName: order.shopName,
      products: order.products || [],
      orderSn: order.orderSn,
      totalPrice: order.totalPrice
    }));

    const total = selected
      .reduce((sum, o) => sum + parseFloat(o.totalPrice || 0), 0)
      .toFixed(2);

    this.setData({ shops, total });
  },

  goBack() { wx.navigateBack({}) },
  contact() { wx.showToast({ title: '客服开发中', icon: 'none' }) },
  submitOrder() {
    wx.showToast({ title: '已提交', icon: 'success' })
    setTimeout(() => {
      wx.redirectTo({ url: '/pages/order/order' })
    }, 600)
  }
})
