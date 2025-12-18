App({
  onLaunch() {
    try {
      const info = wx.getAccountInfoSync()
      const envVersion = info && info.miniProgram && info.miniProgram.envVersion
      const enable = envVersion !== 'release' || wx.getStorageSync('enableVConsole') === true
      if (enable) { wx.setEnableDebug({ enableDebug: true }) }
    } catch (e) { }
  },
  globalData: {}
})
