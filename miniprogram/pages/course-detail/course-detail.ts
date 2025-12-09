// pages/course-detail/course-detail.ts
import { courses } from '../../mock/courses';
import { bases } from '../../mock/bases';
import { isFavorite, toggleFavorite } from '../../services/favorite';

// Tab配置
const tabs = [
  { id: 'detail', name: '课程详情' },
  { id: 'schedule', name: '课程安排' },
  { id: 'fees', name: '费用明细' }
];

Page({
  data: {
    // 状态栏高度
    statusBarHeight: 20,
    // 课程数据
    course: null as ICourse | null,
    // 基地详情数据
    baseDetail: null as IBase | null,
    // Tab列表
    tabs: tabs,
    // 当前Tab
    currentTab: 'detail',
    // 是否已收藏
    isFavorite: false,
    // 课程ID
    courseId: '',
    // 轮播图当前索引
    currentImageIndex: 0,
    // 轮播图列表
    imageList: [] as string[]
  },

  onLoad(options: any) {
    this.initSystemInfo();
    const { id } = options;
    if (id) {
      this.setData({ courseId: id });
      this.loadCourseDetail(id);
      this.checkFavoriteStatus(id);
    }
  },

  onShow() {
    // 每次显示时检查收藏状态
    if (this.data.courseId) {
      this.checkFavoriteStatus(this.data.courseId);
    }
  },

  // 检查收藏状态
  checkFavoriteStatus(id: string) {
    this.setData({ isFavorite: isFavorite(id) });
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

  // 加载课程详情
  loadCourseDetail(id: string) {
    // 模拟从Mock数据获取
    const course = courses.find(c => c.id === id);
    if (course) {
      // 构建图片列表：优先使用 images 数组，否则使用 imageUrl
      const imageList = course.images && course.images.length > 0 
        ? course.images 
        : [course.imageUrl];
      
      this.setData({ course, imageList });
      
      // 过滤掉特定的标签
      if (this.data.course && this.data.course.tags) {
        this.setData({
          'course.tags': this.data.course.tags.filter(
            tag => tag !== '红色教育' && tag !== '军事体验'
          )
        });
      }

      // 加载相关基地详情
      if (course.baseId) {
        const base = bases.find(b => b.id === course.baseId);
        if (base) {
          this.setData({ baseDetail: base });
        }
      }
    }
  },

  // 轮播图切换
  onSwiperChange(e: any) {
    this.setData({ currentImageIndex: e.detail.current });
  },

  // 切换Tab
  onTabChange(e: any) {
    const { id } = e.currentTarget.dataset;
    this.setData({ currentTab: id });
  },

  // 分享
  onShareTap() {
    // 触发分享
  },

  // 收藏
  onFavoriteTap() {
    const { courseId } = this.data;
    if (!courseId) return;
    
    const newStatus = toggleFavorite(courseId);
    this.setData({ isFavorite: newStatus });
    wx.showToast({
      title: newStatus ? '已收藏' : '已取消收藏',
      icon: 'none'
    });
  },

  // 立即报名
  onEnrollTap() {
    wx.showToast({
      title: '报名功能开发中',
      icon: 'none'
    });
  },

  // 跳转基地详情
  onBaseTap() {
    const base = this.data.baseDetail;
    if (base?.id) {
      wx.navigateTo({
        url: `/pages/base-detail/base-detail?id=${base.id}`
      });
    }
  },

  // 基地电话
  onBasePhoneTap() {
    const base = this.data.baseDetail;
    if (base?.phone) {
      wx.makePhoneCall({ phoneNumber: base.phone });
    } else {
      wx.showToast({ title: '基地暂无联系电话', icon: 'none' });
    }
  },

  // 基地导航
  onBaseNavigationTap() {
    const base = this.data.baseDetail;
    if (base?.location) {
      wx.openLocation({
        latitude: base.location.latitude,
        longitude: base.location.longitude,
        name: base.name,
        address: base.address
      });
    } else {
      wx.showToast({ title: '基地暂无位置信息', icon: 'none' });
    }
  },

  // 分享给朋友
  onShareAppMessage() {
    const course = this.data.course;
    return {
      title: course?.title || '研学课程',
      path: `/pages/course-detail/course-detail?id=${course?.id}`
    };
  }
});
