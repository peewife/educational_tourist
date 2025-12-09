// pages/base-detail/base-detail.ts
import { bases } from '../../mock/bases';
import { courses } from '../../mock/courses';

Page({
  data: {
    // 状态栏高度
    statusBarHeight: 20,
    base: null as IBase | null,
    relatedCourses: [] as ICourse[],
    tabs: [
      { id: 'detail', name: '基地详情' },
      { id: 'courses', name: '相关课程' }
    ],
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
      this.loadBaseDetail(id);
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

  loadBaseDetail(id: string) {
    const base = bases.find(b => b.id === id);
    if (base) {
      // 构建图片列表：优先使用 images 数组，否则使用 imageUrl
      const imageList = base.images && base.images.length > 0 
        ? base.images 
        : [base.imageUrl];
      
      this.setData({ base, imageList });
      // 加载相关课程（模拟）
      const relatedCourses = courses.slice(0, 2);
      this.setData({ relatedCourses });
    }
  },

  // 轮播图切换
  onSwiperChange(e: any) {
    this.setData({ currentImageIndex: e.detail.current });
  },

  // 导航
  onNavigateTap() {
    const base = this.data.base;
    if (base?.location) {
      wx.openLocation({
        latitude: base.location.latitude,
        longitude: base.location.longitude,
        name: base.name,
        address: base.address
      });
    }
  },

  // 点击课程
  onCourseTap(e: any) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/course-detail/course-detail?id=${id}`
    });
  },

  // 查看更多课程
  onViewMoreCourses() {
    wx.switchTab({ url: '/pages/courses/courses' });
  },

  onShareAppMessage() {
    const base = this.data.base;
    return {
      title: base?.name || '研学基地',
      path: `/pages/base-detail/base-detail?id=${base?.id}`
    };
  }
});
