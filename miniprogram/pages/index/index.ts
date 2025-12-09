// pages/index/index.ts
import { banners, functionEntries, districts } from '../../mock/home';
import { courses } from '../../mock/courses';
import { routes } from '../../mock/routes';
import { bases } from '../../mock/bases';

Page({
  data: {
    // 状态栏高度
    statusBarHeight: 20,
    // 搜索关键词
    searchValue: '',
    // Banner数据
    banners: [] as IBanner[],
    // 当前Banner索引
    currentBannerIndex: 0,
    // 功能入口
    functionEntries: [] as IFunctionEntry[],
    // 乡镇列表
    districts: [] as string[],
    // 热门课程
    hotCourses: [] as ICourse[],
    // 热门线路
    hotRoutes: [] as IRoute[],
    // 研学营地
    hotBases: [] as IBase[],
    // 选中的乡镇
    selectedDistrict: ''
  },

  onLoad() {
    this.initSystemInfo();
    this.loadHomeData();
  },

  onShow() {
    // 设置tabBar选中状态
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 0 });
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

  // 加载首页数据
  loadHomeData() {
    // 模拟加载数据
    this.setData({
      banners: banners,
      functionEntries: functionEntries,
      districts: districts,
      hotCourses: courses.slice(0, 3),
      hotRoutes: routes.slice(0, 3),
      hotBases: bases.slice(0, 4)
    });
  },

  // 搜索框聚焦，跳转搜索页
  onSearchFocus() {
    wx.navigateTo({
      url: '/pages/search/search'
    });
  },

  // Banner切换
  onBannerChange(e: any) {
    this.setData({
      currentBannerIndex: e.detail.current
    });
  },

  // Banner点击
  onBannerTap(e: any) {
    const { index } = e.currentTarget.dataset;
    const banner = this.data.banners[index];
    if (banner.linkType === 'course') {
      wx.navigateTo({ url: `/pages/course-detail/course-detail?id=${banner.linkId}` });
    } else if (banner.linkType === 'route') {
      wx.navigateTo({ url: `/pages/route-detail/route-detail?id=${banner.linkId}` });
    }
  },

  // 乡镇标签选择
  onDistrictChange(e: any) {
    this.setData({
      selectedDistrict: e.detail.value
    });
    // TODO: 根据乡镇筛选数据
  },

  // 查看更多课程
  onViewMoreCourses() {
    wx.switchTab({ url: '/pages/courses/courses' });
  },

  // 查看更多线路
  onViewMoreRoutes() {
    wx.switchTab({ url: '/pages/routes/routes' });
  },

  // 查看更多基地
  onViewMoreBases() {
    wx.switchTab({ url: '/pages/bases/bases' });
  },

  // 下拉刷新
  onPullDownRefresh() {
    this.loadHomeData();
    wx.stopPullDownRefresh();
  }
});
