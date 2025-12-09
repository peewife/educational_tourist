// pages/route-detail/route-detail.ts
import { routes } from '../../mock/routes';
import { agencies } from '../../mock/bases';

const tabs = [
  { id: 'detail', name: '线路详情' },
  { id: 'schedule', name: '线路安排' },
  { id: 'fees', name: '费用明细' }
];

Page({
  data: {
    // 状态栏高度
    statusBarHeight: 20,
    route: null as IRoute | null,
    agency: null as IAgency | null,
    tabs: tabs,
    currentTab: 'detail',
    // 轮播图当前索引
    currentImageIndex: 0,
    // 轮播图列表
    imageList: [] as string[]
  },

  onLoad(options: any) {
    this.initSystemInfo();
    const { id } = options;
    if (id) {
      this.loadRouteDetail(id);
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

  loadRouteDetail(id: string) {
    const route = routes.find(r => r.id === id);
    if (route) {
      // 构建图片列表：优先使用 images 数组，否则使用 imageUrl
      const imageList = route.images && route.images.length > 0 
        ? route.images 
        : [route.imageUrl];
      
      this.setData({ route, imageList });
      // 加载机构信息
      if (route.agencyId) {
        const agency = agencies.find(a => a.id === route.agencyId);
        if (agency) {
          this.setData({ agency });
        }
      }
    }
  },

  // 轮播图切换
  onSwiperChange(e: any) {
    this.setData({ currentImageIndex: e.detail.current });
  },

  onTabChange(e: any) {
    const { id } = e.currentTarget.dataset;
    this.setData({ currentTab: id });
  },

  onShareTap() {
    // 触发分享
  },

  // 电话咨询
  onPhoneTap() {
    const agency = this.data.agency;
    if (agency?.phone) {
      wx.makePhoneCall({ phoneNumber: agency.phone });
    } else {
      wx.showToast({ title: '暂无联系电话', icon: 'none' });
    }
  },

  // 导航
  onNavigationTap() {
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

  // 立即报名
  onEnrollTap() {
    wx.showToast({ title: '报名功能开发中', icon: 'none' });
  },

  // 跳转机构详情
  onAgencyTap() {
    const agency = this.data.agency;
    if (agency) {
      wx.navigateTo({
        url: `/pages/agency-detail/agency-detail?id=${agency.id}`
      });
    }
  },

  // 跳转基地详情
  onBaseTap(e: any) {
    const { id } = e.currentTarget.dataset;
    if (id) {
      wx.navigateTo({
        url: `/pages/base-detail/base-detail?id=${id}`
      });
    }
  },

  onShareAppMessage() {
    const route = this.data.route;
    return {
      title: route?.title || '精品线路',
      path: `/pages/route-detail/route-detail?id=${route?.id}`
    };
  }
});
