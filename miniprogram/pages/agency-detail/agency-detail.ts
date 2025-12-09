// pages/agency-detail/agency-detail.ts
import { agencies } from '../../mock/bases';
import { routes } from '../../mock/routes';
import { experts } from '../../mock/experts';

Page({
  data: {
    // 状态栏高度
    statusBarHeight: 20,
    agency: null as IAgency | null,
    relatedRoutes: [] as IRoute[],
    relatedExperts: [] as IExpert[],
    tabs: [
      { id: 'detail', name: '机构详情' },
      { id: 'routes', name: '研学线路' },
      { id: 'experts', name: '研学导师' }
    ],
    currentTab: 'detail'
  },

  onLoad(options: any) {
    this.initSystemInfo();
    const { id } = options;
    if (id) {
      this.loadAgencyDetail(id);
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

  onBackTap() {
    wx.navigateBack();
  },

  // 切换Tab
  onTabChange(e: any) {
    const { id } = e.currentTarget.dataset;
    this.setData({ currentTab: id });
  },

  loadAgencyDetail(id: string) {
    const agency = agencies.find(a => a.id === id);
    if (agency) {
      this.setData({ agency });
      // 加载相关线路
      const relatedRoutes = routes.filter(r => r.agencyId === id).slice(0, 3);
      // 加载相关导师
      const relatedExperts = experts.filter(e => e.agencyId === id);
      
      this.setData({ 
        relatedRoutes,
        relatedExperts
      });
    }
  },

  // 拨打电话
  onPhoneTap() {
    const agency = this.data.agency;
    if (agency?.phone) {
      wx.makePhoneCall({ phoneNumber: agency.phone });
    }
  },

  // 导航
  onNavigateTap() {
    const agency = this.data.agency;
    if (agency?.location) {
      wx.openLocation({
        latitude: agency.location.latitude,
        longitude: agency.location.longitude,
        name: agency.name,
        address: agency.address
      });
    } else {
      wx.showToast({ title: '暂无位置信息', icon: 'none' });
    }
  },

  // 点击线路
  onRouteTap(e: any) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/route-detail/route-detail?id=${id}`
    });
  },

  // 查看更多线路
  onViewMoreRoutes() {
    wx.switchTab({ url: '/pages/routes/routes' });
  },

  // 点击导师
  onExpertTap(e: any) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({ url: `/pages/expert-detail/expert-detail?id=${id}` });
  },

  onShareAppMessage() {
    const agency = this.data.agency;
    return {
      title: agency?.name || '服务机构',
      path: `/pages/agency-detail/agency-detail?id=${agency?.id}`
    };
  }
});
