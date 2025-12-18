Page({
  data: {
    activeTab: '0',
    searchValue: '',
    allChecked: false,
    selectedTotal: 0,
    orders: [
      // {
      //   id: '1',
      //   shopName: '有赞热卖榜单',
      //   orderSn: 'E20251218115924051300001',
      //   status: 1, // 1: Pending Pay, 2: Pending Group, 3: Pending Ship, 4: Pending Receive, 5: Finished
      //   statusText: '等待买家付款',
      //   statusColor: '#ee0a24',
      //   products: [
      //     {
      //       name: '「8.9元到手6支！山姆同款」宽头家用6支装牙刷...',
      //       image: 'https://img.yzcdn.cn/vant/cat.jpeg', // Placeholder
      //       price: '8.9',
      //       qty: 1,
      //       sku: '1卡装（6支）'
      //     }
      //   ],
      //   totalPrice: '8.9',
      //   checked: false
      // },
      // {
      //   id: '2',
      //   shopName: '帮宝适官方会员店',
      //   orderSn: 'E20251218115842051300085',
      //   status: 1,
      //   statusText: '等待买家付款',
      //   statusColor: '#ee0a24',
      //   products: [
      //     {
      //       name: '【散热王者尝鲜装】新帮宝适一级帮拉拉裤超薄透气...',
      //       image: 'https://img.yzcdn.cn/vant/cat.jpeg',
      //       price: '39.9',
      //       qty: 3,
      //       sku: '一级帮拉拉裤XXL12片'
      //     }
      //   ],
      //   totalPrice: '119.7',
      //   checked: false
      // },
      // {
      //   id: '3',
      //   shopName: '鲜知',
      //   orderSn: 'E20220906160421051300029',
      //   status: 5, // Finished
      //   statusText: '交易成功',
      //   statusColor: '#ee0a24',
      //   products: [
      //     {
      //       name: '山水大功率电吹风5380 (SCF-92B) 蓝色...',
      //       image: 'https://img.yzcdn.cn/vant/cat.jpeg',
      //       price: '2022',
      //       qty: 1,
      //       sku: ''
      //     }
      //   ],
      //   totalPrice: '2022',
      //   checked: false
      // },
      // {
      //   id: '4',
      //   shopName: 'WESTLINK官方旗舰店',
      //   orderSn: 'E20220619141332051306161',
      //   status: 5,
      //   statusText: '交易成功',
      //   statusColor: '#ee0a24',
      //   products: [
      //     {
      //       name: '西遇连衣裙女法式复古小众2021春季新款方领泡泡袖...',
      //       image: 'https://img.yzcdn.cn/vant/cat.jpeg',
      //       price: '159',
      //       qty: 1,
      //       sku: '黑色 M'
      //     }
      //   ],
      //   totalPrice: '149', // Maybe with discount
      //   checked: false
      // }
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

  goBack() {
    wx.navigateBack({
      fail: () => {
        wx.switchTab({ url: '/pages/index/index' });
      }
    });
  }
});
