// pages/routes/routes.ts
import { routes } from '../../mock/routes';

// 线路分类
const categories = [
  { id: 'all', name: '全部' },
  { id: 'nature', name: '自然生态' },
  { id: 'red', name: '红色研学' },
  { id: 'culture', name: '文化遗产' },
  { id: 'labor', name: '劳动实践' },
  { id: 'geology', name: '地质科普' }
];

Page({
  data: {
    // 状态栏高度
    statusBarHeight: 20,
    categories: categories,
    currentCategory: 'all',
    routeList: [] as IRoute[],
    loading: false,
    hasMore: true,
    page: 1,
    pageSize: 10
  },

  onLoad() {
    this.initSystemInfo();
    this.loadRoutes();
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 2 });
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

  // 加载线路数据
  loadRoutes(isRefresh = true) {
    if (this.data.loading) return;
    this.setData({ loading: true });

    setTimeout(() => {
      let filteredRoutes = [...routes];
      
      if (this.data.currentCategory !== 'all') {
        filteredRoutes = filteredRoutes.filter(
          route => route.category === this.data.currentCategory
        );
      }

      const start = isRefresh ? 0 : (this.data.page - 1) * this.data.pageSize;
      const end = start + this.data.pageSize;
      const pageData = filteredRoutes.slice(start, end);

      this.setData({
        routeList: isRefresh ? pageData : [...this.data.routeList, ...pageData],
        loading: false,
        hasMore: end < filteredRoutes.length,
        page: isRefresh ? 2 : this.data.page + 1
      });
    }, 300);
  },

  // 切换分类
  onCategoryChange(e: any) {
    const { id } = e.currentTarget.dataset;
    if (id === this.data.currentCategory) return;

    this.setData({
      currentCategory: id,
      page: 1,
      hasMore: true
    });
    this.loadRoutes(true);
  },

  // 点击线路
  onRouteTap(e: any) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/route-detail/route-detail?id=${id}`
    });
  },

  onPullDownRefresh() {
    this.setData({ page: 1, hasMore: true });
    this.loadRoutes(true);
    wx.stopPullDownRefresh();
  },

  onReachBottom() {
    if (this.data.hasMore && !this.data.loading) {
      this.loadRoutes(false);
    }
  }
});
