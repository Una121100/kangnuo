Page({
  data: {
    activeTab: '0',
    searchValue: '',
    allChecked: false,
    selectedTotal: 0,
    orders: [
      {
        id: '1',
        shopName: '康诺化工添加剂',
        orderSn: 'E202512181200000001',
        status: 1, // 1: Pending Pay, 2: Pending Group, 3: Pending Ship, 4: Pending Receive, 5: Finished
        statusText: '等待买家付款',
        statusColor: '#ee0a24',
        products: [
          {
            name: '食品添加剂 柠檬酸一水物（Citric Acid Monohydrate）',
            image: 'https://img.yzcdn.cn/vant/cat.jpeg',
            price: '289.0',
            qty: 1,
            sku: '25kg/袋 工业级'
          }
        ],
        totalPrice: '289.0',
        checked: false
      },
      {
        id: '2',
        shopName: '康诺原料大宗',
        orderSn: 'E202512181200000085',
        status: 1,
        statusText: '等待买家付款',
        statusColor: '#ee0a24',
        products: [
          {
            name: '食品添加剂 味精（谷氨酸钠）99% 20kg/袋',
            image: 'https://img.yzcdn.cn/vant/cat.jpeg',
            price: '239.0',
            qty: 2,
            sku: '20kg/袋 食品级'
          }
        ],
        totalPrice: '478.0',
        checked: false
      },
      {
        id: '3',
        shopName: '助剂商城',
        orderSn: 'E20220906160421051300029',
        status: 5, // Finished
        statusText: '交易成功',
        statusColor: '#3bae56',
        products: [
          {
            name: '聚乙二醇 PEG-400 200kg/桶',
            image: 'https://img.yzcdn.cn/vant/cat.jpeg',
            price: '4200.0',
            qty: 1,
            sku: '200kg/桶 工业级'
          }
        ],
        totalPrice: '4200.0',
        checked: false
      },
      {
        id: '4',
        shopName: '塑化原料旗舰店',
        orderSn: 'E20220619141332051306161',
        status: 5,
        statusText: '交易成功',
        statusColor: '#3bae56',
        products: [
          {
            name: '聚丙烯 PP T30S 25kg/袋',
            image: 'https://img.yzcdn.cn/vant/cat.jpeg',
            price: '95.0',
            qty: 10,
            sku: '25kg/袋 批号随机'
          }
        ],
        totalPrice: '950.0',
        checked: false
      }
    ],
    filteredOrders: []
  },

  onLoad(options) {
    if (options.type) {
      this.setData({ activeTab: options.type });
    }
    this.filterOrders();
  },

  onTabChange(e) {
    this.setData({ activeTab: e.detail.name });
    this.filterOrders();

    // Reset selection when changing tabs
    if (e.detail.name === '1') {
      this.resetSelection();
    }
  },

  filterOrders() {
    const { activeTab, orders } = this.data;
    let filtered = [];
    if (activeTab === '0') {
      filtered = orders;
    } else {
      // Map tab index to status logic roughly
      // 1: Pending Pay, 2: Pending Group, 3: Pending Ship, 4: Pending Receive
      // My mock data uses status 1 for Pending Pay, 5 for Finished.
      // Let's adapt logic:
      if (activeTab === '1') {
        filtered = orders.filter(o => o.status === 1);
      } else if (activeTab === '2') {
        filtered = orders.filter(o => o.status === 2);
      } else if (activeTab === '3') {
        filtered = orders.filter(o => o.status === 3);
      } else if (activeTab === '4') {
        filtered = orders.filter(o => o.status === 4);
      }
    }
    this.setData({ filteredOrders: filtered });
  },

  // Checkbox logic for Pending Pay
  onOrderCheck(e) {
    const id = e.currentTarget.dataset.id;
    const isChecked = e.detail;

    const updatedOrders = this.data.filteredOrders.map(item => {
      if (item.id === id) {
        return { ...item, checked: isChecked };
      }
      return item;
    });

    this.setData({ filteredOrders: updatedOrders });
    this.calcTotal();
  },

  onAllChecked(e) {
    const isChecked = e.detail;
    const updatedOrders = this.data.filteredOrders.map(item => ({
      ...item,
      checked: isChecked
    }));

    this.setData({
      filteredOrders: updatedOrders,
      allChecked: isChecked
    });
    this.calcTotal();
  },

  resetSelection() {
    const updatedOrders = this.data.filteredOrders.map(item => ({ ...item, checked: false }));
    this.setData({
      filteredOrders: updatedOrders,
      allChecked: false,
      selectedTotal: 0
    });
  },

  calcTotal() {
    const { filteredOrders } = this.data;
    let total = 0;
    let allChecked = filteredOrders.length > 0;

    filteredOrders.forEach(item => {
      if (item.checked) {
        total += parseFloat(item.totalPrice);
      } else {
        allChecked = false;
      }
    });

    if (filteredOrders.length === 0) allChecked = false;

    this.setData({
      selectedTotal: total.toFixed(1), // Keep decimal format
      allChecked
    });
  },

  // 底部批量“确认付款”按钮
  goConfirm() {
    const selected = this.data.filteredOrders.filter(item => item.checked);
    if (!selected.length) {
      wx.showToast({ title: '请选择需要付款的订单', icon: 'none' });
      return;
    }
    try {
      wx.setStorageSync('confirmOrders', selected);
    } catch (e) { }
    wx.navigateTo({ url: '/pages/confirm/confirm' });
  },

  // 列表中单个订单“确认付款”按钮
  goConfirmSingle(e) {
    const id = e.currentTarget.dataset.id;
    const order = this.data.orders.find(o => o.id === id);
    if (!order) {
      wx.showToast({ title: '订单不存在', icon: 'none' });
      return;
    }
    try {
      wx.setStorageSync('confirmOrders', [order]);
    } catch (err) { }
    wx.navigateTo({ url: '/pages/confirm/confirm' });
  },

  goBack() {
    wx.navigateBack({
      fail: () => {
        wx.switchTab({ url: '/pages/index/index' });
      }
    });
  }
});
