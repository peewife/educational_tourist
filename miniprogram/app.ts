// app.ts
App<IAppOption>({
  globalData: {
    userInfo: null,
    openId: '',
    isLoggedIn: false,
    theme: {
      primaryColor: '#C8102E',
      secondaryColor: '#FF6B00',
      infoColor: '#4A90E2',
      successColor: '#36C197'
    },
    districts: ['凤城街道', '坎市镇', '下洋镇', '湖坑镇', '高陂镇', '抚市镇', '湖雷镇', '培丰镇'],
    courseCategories: [
      { key: 'latest', name: '最新' },
      { key: 'culture', name: '客家文化' },
      { key: 'red', name: '红色教育' },
      { key: 'science', name: '科学探究' },
      { key: 'intangible', name: '非遗体验' }
    ],
    routeCategories: [
      { key: 'nature', name: '自然生态' },
      { key: 'red', name: '红色研学' },
      { key: 'culture', name: '文化遗产' },
      { key: 'labor', name: '劳动实践' },
      { key: 'geology', name: '地质科普' }
    ],
    expertRoles: [
      { key: 'teacher', name: '研学导师' },
      { key: 'officer', name: '研学教官' },
      { key: 'researcher', name: '研究员' },
      { key: 'inheritor', name: '非遗传承' }
    ],
    pageParams: null as any
  },

  onLaunch() {
    // 初始化云开发环境
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        env: 'cloud1-3g4bg132953c87fa',
        traceUser: true
      });
    }
    
    // 尝试自动登录
    this.autoLogin();
  },

  // 自动登录
  async autoLogin() {
    try {
      // 检查本地存储的用户信息
      const userInfo = wx.getStorageSync('userInfo');
      const openId = wx.getStorageSync('openId');
      
      if (userInfo && openId) {
        this.globalData.userInfo = userInfo;
        this.globalData.openId = openId;
        this.globalData.isLoggedIn = true;
      }
    } catch (e) {
      console.error('自动登录失败:', e);
    }
  },

  onShow() {
    // 小程序切前台
  },

  onHide() {
    // 小程序切后台
  }
})
