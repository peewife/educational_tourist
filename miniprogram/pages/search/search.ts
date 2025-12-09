// pages/search/search.ts
import { courses } from '../../mock/courses';
import { routes } from '../../mock/routes';
import { bases } from '../../mock/bases';

// 搜索类型
const searchTypes = [
  { id: 'all', name: '全部' },
  { id: 'course', name: '课程' },
  { id: 'route', name: '线路' },
  { id: 'base', name: '基地' }
];

// 热门搜索词
const hotKeywords = ['土楼', '红色教育', '客家文化', '非遗体验', '军事训练', '自然探索'];

Page({
  data: {
    statusBarHeight: 20,
    searchTypes: searchTypes,
    currentType: 'all',
    keyword: '',
    hotKeywords: hotKeywords,
    historyKeywords: [] as string[],
    showResult: false,
    loading: false,
    // 搜索结果
    courseResults: [] as ICourse[],
    routeResults: [] as IRoute[],
    baseResults: [] as IBase[]
  },

  onLoad() {
    this.initSystemInfo();
    this.loadHistory();
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

  // 加载搜索历史
  loadHistory() {
    try {
      const history = wx.getStorageSync('search_history');
      if (history) {
        this.setData({ historyKeywords: JSON.parse(history) });
      }
    } catch (e) {
      // 忽略错误
    }
  },

  // 保存搜索历史
  saveHistory(keyword: string) {
    let history = [...this.data.historyKeywords];
    // 去重并添加到开头
    history = history.filter(k => k !== keyword);
    history.unshift(keyword);
    // 最多保存10条
    history = history.slice(0, 10);
    this.setData({ historyKeywords: history });
    try {
      wx.setStorageSync('search_history', JSON.stringify(history));
    } catch (e) {
      // 忽略错误
    }
  },

  // 清空历史
  onClearHistory() {
    this.setData({ historyKeywords: [] });
    try {
      wx.removeStorageSync('search_history');
    } catch (e) {
      // 忽略错误
    }
  },

  // 返回
  onBack() {
    wx.navigateBack();
  },

  // 输入关键词
  onInput(e: any) {
    this.setData({ keyword: e.detail.value });
  },

  // 清空输入
  onClear() {
    this.setData({ keyword: '', showResult: false });
  },

  // 点击热门/历史关键词
  onKeywordTap(e: any) {
    const { keyword } = e.currentTarget.dataset;
    this.setData({ keyword });
    this.doSearch();
  },

  // 切换搜索类型
  onTypeChange(e: any) {
    const { id } = e.currentTarget.dataset;
    this.setData({ currentType: id });
    if (this.data.showResult) {
      this.doSearch();
    }
  },

  // 搜索确认
  onSearchConfirm() {
    this.doSearch();
  },

  // 执行搜索
  doSearch() {
    const keyword = this.data.keyword.trim();
    if (!keyword) {
      wx.showToast({ title: '请输入搜索关键词', icon: 'none' });
      return;
    }

    this.saveHistory(keyword);
    this.setData({ loading: true, showResult: true });

    setTimeout(() => {
      const type = this.data.currentType;
      let courseResults: ICourse[] = [];
      let routeResults: IRoute[] = [];
      let baseResults: IBase[] = [];

      // 搜索课程
      if (type === 'all' || type === 'course') {
        courseResults = courses.filter(c => 
          c.title.includes(keyword) || 
          (c.description && c.description.includes(keyword)) ||
          c.categoryName.includes(keyword)
        );
      }

      // 搜索线路
      if (type === 'all' || type === 'route') {
        routeResults = routes.filter(r => 
          r.title.includes(keyword) || 
          (r.description && r.description.includes(keyword)) ||
          r.categoryName.includes(keyword)
        );
      }

      // 搜索基地
      if (type === 'all' || type === 'base') {
        baseResults = bases.filter(b => 
          b.name.includes(keyword) || 
          (b.description && b.description.includes(keyword)) ||
          (b.address && b.address.includes(keyword))
        );
      }

      this.setData({
        courseResults,
        routeResults,
        baseResults,
        loading: false
      });
    }, 300);
  },

  // 点击课程
  onCourseTap(e: any) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({ url: `/pages/course-detail/course-detail?id=${id}` });
  },

  // 点击线路
  onRouteTap(e: any) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({ url: `/pages/route-detail/route-detail?id=${id}` });
  },

  // 点击基地
  onBaseTap(e: any) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({ url: `/pages/base-detail/base-detail?id=${id}` });
  }
});
