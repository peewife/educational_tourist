// pages/courses/courses.ts
import { courses } from '../../mock/courses';

// 课程分类
const categories = [
  { id: 'all', name: '最新' },
  { id: 'culture', name: '客家文化' },
  { id: 'red', name: '红色教育' },
  { id: 'science', name: '科学探究' },
  { id: 'intangible', name: '非遗体验' }
];

Page({
  data: {
    // 状态栏高度
    statusBarHeight: 20,
    // 分类列表
    categories: categories,
    // 当前选中分类
    currentCategory: 'all',
    // 课程列表
    courseList: [] as ICourse[],
    // 是否加载中
    loading: false,
    // 是否还有更多
    hasMore: true,
    // 当前页码
    page: 1,
    // 每页数量
    pageSize: 10
  },

  // 统一格式化展示数据
  formatCourse(course: ICourse) {
    const studentCount = course?.studentCount;
    let studentCountText = '0';
    if (typeof studentCount === 'number' && !Number.isNaN(studentCount)) {
      studentCountText = studentCount >= 1000
        ? `${(studentCount / 1000).toFixed(1)}k`
        : `${studentCount}`;
    }

    const rating = course?.rating;
    const ratingText = (typeof rating === 'number' && !Number.isNaN(rating))
      ? String(rating)
      : (rating || '0');

    return {
      ...course,
      studentCountText,
      ratingText
    };
  },

  onLoad() {
    this.initSystemInfo();
    this.loadCourses();
  },

  onShow() {
    // 设置tabBar选中状态
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 1 });
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

  // 加载课程数据
  loadCourses(isRefresh = true) {
    if (this.data.loading) return;

    this.setData({ loading: true });

    // 模拟网络请求延迟
    setTimeout(() => {
      let filteredCourses = [...courses];
      
      // 按分类筛选
      if (this.data.currentCategory !== 'all') {
        filteredCourses = filteredCourses.filter(
          course => course.category === this.data.currentCategory
        );
      }

      // 分页处理
      const start = isRefresh ? 0 : (this.data.page - 1) * this.data.pageSize;
      const end = start + this.data.pageSize;
      const pageData = filteredCourses.slice(start, end).map(course => this.formatCourse(course));

      this.setData({
        courseList: isRefresh ? pageData : [...this.data.courseList, ...pageData],
        loading: false,
        hasMore: end < filteredCourses.length,
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
    this.loadCourses(true);
  },

  // 下拉刷新
  onPullDownRefresh() {
    this.setData({ page: 1, hasMore: true });
    this.loadCourses(true);
    wx.stopPullDownRefresh();
  },

  // 上拉加载更多
  onReachBottom() {
    if (this.data.hasMore && !this.data.loading) {
      this.loadCourses(false);
    }
  },

  // 点击课程跳转详情
  onCourseTap(e: any) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/course-detail/course-detail?id=${id}`
    });
  }
});
