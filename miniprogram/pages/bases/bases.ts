// pages/bases/bases.ts
import { bases, agencies } from '../../mock/bases';

const tabs = [
  { id: 'bases', name: '研学基(营)地' },
  { id: 'agencies', name: '服务机构' }
];

Page({
  data: {
    // 状态栏高度
    statusBarHeight: 20,
    tabs: tabs,
    currentTab: 'bases',
    baseList: [] as IBase[],
    agencyList: [] as IAgency[],
    searchValue: '',
    loading: false
  },

  onLoad(options: any) {
    this.initSystemInfo();
    // 支持从首页跳转时指定tab
    if (options.tab === 'agencies') {
      this.setData({ currentTab: 'agencies' });
    }
    this.loadData();
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 3 });
    }
    // 检查全局参数（从功能入口跳转）
    const app = getApp();
    if (app.globalData && app.globalData.pageParams) {
      const params = app.globalData.pageParams;
      if (params.tab === 'agencies') {
        this.setData({ currentTab: 'agencies' });
      }
      // 清除参数，避免重复使用
      app.globalData.pageParams = null;
    }
  },

  // 初始化系统信息
  initSystemInfo() {
    try {
      const systemInfo = wx.getWindowInfo();
      this.setData({
        statusBarHeight: systemInfo.statusBarHeight || 20
      });
    } catch (e) {
      // 获取系统信息失败，使用默认值
    }
  },

  loadData() {
    this.setData({ loading: true });
    setTimeout(() => {
      this.setData({
        baseList: bases,
        agencyList: agencies,
        loading: false
      });
    }, 300);
  },

  // 切换Tab
  onTabChange(e: any) {
    const { id } = e.currentTarget.dataset;
    if (id === this.data.currentTab) return;
    this.setData({ currentTab: id });
  },

  // 搜索
  onSearchFocus() {
    wx.navigateTo({ url: '/pages/search/search' });
  },

  // 点击基地
  onBaseTap(e: any) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/base-detail/base-detail?id=${id}`
    });
  },

  // 点击机构
  onAgencyTap(e: any) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/agency-detail/agency-detail?id=${id}`
    });
  },

  onPullDownRefresh() {
    this.loadData();
    wx.stopPullDownRefresh();
  }
});
