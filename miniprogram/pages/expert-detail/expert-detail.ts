// pages/expert-detail/expert-detail.ts
import { experts } from '../../mock/experts';

Page({
  data: {
    statusBarHeight: 20,
    expert: null as IExpert | null
  },

  onLoad(options: any) {
    this.initSystemInfo();
    if (options.id) {
      this.loadExpert(options.id);
    }
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

  loadExpert(id: string) {
    const expert = experts.find(e => e.id === id);
    if (expert) {
      this.setData({ expert });
    } else {
      wx.showToast({ title: '导师不存在', icon: 'none' });
      setTimeout(() => wx.navigateBack(), 1500);
    }
  }
});
