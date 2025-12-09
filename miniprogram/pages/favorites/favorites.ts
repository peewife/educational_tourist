// pages/favorites/favorites.ts
import { courses } from '../../mock/courses';
import { getFavorites } from '../../services/favorite';

Page({
  data: {
    statusBarHeight: 20,
    favoriteList: [] as ICourse[],
    loading: false
  },

  onLoad() {
    this.initSystemInfo();
  },

  onShow() {
    this.loadFavorites();
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

  loadFavorites() {
    this.setData({ loading: true });

    setTimeout(() => {
      const favoriteIds = getFavorites();
      const favoriteList = favoriteIds
        .map(id => courses.find(c => c.id === id))
        .filter(Boolean) as ICourse[];

      this.setData({
        favoriteList,
        loading: false
      });
    }, 300);
  },

  // 点击课程
  onCourseTap(e: any) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/course-detail/course-detail?id=${id}`
    });
  },

  onPullDownRefresh() {
    this.loadFavorites();
    wx.stopPullDownRefresh();
  }
});
