// pages/experts/experts.ts
import { experts } from '../../mock/experts';

// 导师分类
const categories = [
  { id: 'all', name: '全部' },
  { id: 'teacher', name: '研学导师' },
  { id: 'officer', name: '研学教官' },
  { id: 'researcher', name: '研究员' },
  { id: 'inheritor', name: '非遗传承' }
];

Page({
  data: {
    statusBarHeight: 20,
    categories: categories,
    currentCategory: 'all',
    expertList: [] as IExpert[],
    searchValue: '',
    loading: false
  },

  onLoad() {
    this.initSystemInfo();
    this.loadExperts();
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

  loadExperts() {
    this.setData({ loading: true });

    setTimeout(() => {
      let filteredExperts = [...experts];

      // 按分类筛选
      if (this.data.currentCategory !== 'all') {
        filteredExperts = filteredExperts.filter(
          expert => expert.role === this.data.currentCategory
        );
      }

      // 按搜索关键词筛选
      const keyword = this.data.searchValue.trim();
      if (keyword) {
        filteredExperts = filteredExperts.filter(
          expert => expert.name.includes(keyword) || 
                    (expert.certNo && expert.certNo.includes(keyword))
        );
      }

      this.setData({
        expertList: filteredExperts,
        loading: false
      });
    }, 300);
  },

  // 切换分类
  onCategoryChange(e: any) {
    const { id } = e.currentTarget.dataset;
    if (id === this.data.currentCategory) return;

    this.setData({ currentCategory: id });
    this.loadExperts();
  },

  // 搜索输入
  onSearchInput(e: any) {
    this.setData({ searchValue: e.detail.value });
  },

  // 搜索确认
  onSearchConfirm() {
    this.loadExperts();
  },

  // 返回上一页
  onBackTap() {
    wx.navigateBack();
  },

  // 清空搜索
  onSearchClear() {
    this.setData({ searchValue: '' });
    this.loadExperts();
  },

  // 点击导师
  onExpertTap(e: any) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({ url: `/pages/expert-detail/expert-detail?id=${id}` });
  },

  onPullDownRefresh() {
    this.loadExperts();
    wx.stopPullDownRefresh();
  }
});
