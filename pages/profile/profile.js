Page({
  data: {
    userInfo: {
      nickName: '康诺测试员',
      avatarUrl: 'https://img.yzcdn.cn/vant/cat.jpeg',
      phone: '188****1234'
    }
  },

  onLoad(options) {
    // Here you would typically fetch user info from backend
  },

  // Navigate to Order List with a specific status type
  goOrder(e) {
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
    return;
    const type = e.currentTarget.dataset.type;
    // Assuming we might have an order-list page in the future
    // For now, linking to order page as per previous code, but using navigateTo
    wx.navigateTo({
      url: `/pages/order/order?type=${type}`,
      fail: (err) => {
        // Fallback if page doesn't exist or other error
        console.error('Navigation failed', err);
        wx.showToast({
          title: '功能开发中',
          icon: 'none'
        });
      }
    });
  },

  // Placeholder for other actions
  onTapFeature(e) {
   
    wx.showToast({
      title: e.currentTarget.dataset.type+'功能开发中',
      icon: 'none'
    });
  }
});
