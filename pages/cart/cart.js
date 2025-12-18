const store = require('../../utils/store.js')

Page({
  data: {
    cart: { items: [] },
    allChecked: false,
    totalPrice: 0,
    totalCount: 0
  },

  onShow() {
    this.refresh();
  },

  refresh() {
    const cartData = store.getCart();
    // Ensure items have a 'checked' property initialized if not present
    // In a real app, 'checked' state might be stored in the store or local state
    // Here we'll default to true if undefined, or keep existing state if we were maintaining it separately
    // For simplicity, let's assume all checked by default or sync from store if store supported it.
    // Since the store provided earlier was simple, we'll extend the items locally.
    
    // However, if we just overwrite from store, we lose checked state.
    // Let's try to merge checked state or just re-init.
    
    let items = cartData.items.map(item => ({
      ...item,
      checked: item.hasOwnProperty('checked') ? item.checked : true 
    }));

    this.setData({ 
      cart: { items } 
    });
    
    this.calcTotal();
  },

  // Calculate totals based on checked items
  calcTotal() {
    const { items } = this.data.cart;
    let total = 0;
    let count = 0;
    let allChecked = true;

    if (items.length === 0) {
      allChecked = false;
    }

    items.forEach(item => {
      if (item.checked) {
        total += item.price * item.qty;
        count += item.qty;
      } else {
        allChecked = false;
      }
    });

    this.setData({
      totalPrice: total,
      totalCount: count,
      allChecked: allChecked
    });
  },

  // Handle Item Checkbox Change
  onItemCheck(e) {
    const id = e.currentTarget.dataset.id;
    const isChecked = e.detail;
    
    const items = this.data.cart.items.map(item => {
      if (item.id === id) {
        return { ...item, checked: isChecked };
      }
      return item;
    });

    this.setData({ 'cart.items': items });
    this.calcTotal();
  },

  // Handle All Checked Change
  onAllChecked(e) {
    const isChecked = e.detail;
    const items = this.data.cart.items.map(item => ({
      ...item,
      checked: isChecked
    }));

    this.setData({ 
      'cart.items': items,
      allChecked: isChecked
    });
    this.calcTotal();
  },

  // Handle Quantity Change
  onQtyChange(e) {
    const id = e.currentTarget.dataset.id;
    const newQty = e.detail;
    
    store.updateQuantity(id, newQty);
    
    // Update local state without losing checked status
    const items = this.data.cart.items.map(item => {
      if (item.id === id) {
        return { ...item, qty: newQty };
      }
      return item;
    });
    
    this.setData({ 'cart.items': items });
    this.calcTotal();
  },

  remove(e) {
    const id = Number(e.currentTarget.dataset.id);
    store.removeFromCart(id);
    
    // Refresh but try to keep checked state logic valid? 
    // Actually standard refresh is fine, removed item is gone.
    // We just need to make sure we don't error out.
    // Let's manually remove from local list to avoid full refresh flicker and state loss of others
    const items = this.data.cart.items.filter(item => item.id !== id);
    this.setData({ 'cart.items': items });
    this.calcTotal();
  },

  goOrder() {
    if (this.data.totalCount === 0) {
      wx.showToast({ title: '请选择商品', icon: 'none' });
      return;
    }
    // Logic to pass selected items to order page could go here
    wx.navigateTo({ url: '/pages/order/order' });
  },

  goHome() {
    wx.switchTab({
      url: '/pages/index/index'
    });
  }
})
