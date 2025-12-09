// pages/join-selection/join-selection.ts
Page({
  data: {
    statusBarHeight: 20
  },

  onLoad() {
    this.initSystemInfo();
  },

  initSystemInfo() {
    try {
      const systemInfo = wx.getWindowInfo();
      this.setData({
        statusBarHeight: systemInfo.statusBarHeight || 20
      });
    } catch (e) {
      // 使用默认值
    }
  },

  onBackTap() {
    wx.navigateBack();
  },

  onTypeSelect(e: any) {
    const { type } = e.currentTarget.dataset;
    const typeNames: Record<string, string> = {
      base: '研学基(营)地',
      agency: '服务机构',
      school: '正规学校'
    };
    
    wx.navigateTo({
      url: `/pages/org-apply/org-apply?type=${type}&typeName=${encodeURIComponent(typeNames[type])}`
    });
  }
});
