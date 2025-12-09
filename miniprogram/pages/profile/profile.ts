// pages/profile/profile.ts
import { login, signIn, logout, saveUserToLocal, ICloudUserInfo } from '../../services/user';

// 功能菜单列表
const menuList = [
  { id: 'favorites', name: '收藏课程', icon: 'heart', path: '/pages/favorites/favorites' },
  { id: 'feedback', name: '投诉建议', icon: 'chat', disabled: true },
  { id: 'activity', name: '实践活动', icon: 'star', disabled: true },
  { id: 'register', name: '活动报名', icon: 'user', disabled: true },
  { id: 'apply', name: '申请导师', icon: 'usergroup', path: '/pages/apply-mentor/apply-mentor' },
  { id: 'logout', name: '退出登录', icon: 'poweroff', needLogin: true }
];

// 默认头像（使用网络图片）
const defaultAvatar = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI9FhqmIJtfQMh0LLicJxYS9xcd2R5RMVdXRnxDnOPFYVgXYs8MicbXjuiaZDQ8Y2dEm3GpfFg/0';

Page({
  data: {
    statusBarHeight: 20,
    isLoggedIn: false,
    userInfo: {
      avatarUrl: defaultAvatar,
      nickName: '游客',
      phone: ''
    } as ICloudUserInfo | { avatarUrl: string; nickName: string; phone: string },
    isSignedIn: false,
    signInDays: 0,
    menuList: menuList,
    isLoading: false
  },

  onLoad() {
    this.initSystemInfo();
    this.checkLoginStatus();
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 4 });
    }
    this.checkLoginStatus();
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

  // 检查登录状态
  checkLoginStatus() {
    const app = getApp<IAppOption>();
    const isLoggedIn = app.globalData.isLoggedIn;
    const userInfo = app.globalData.userInfo;

    if (isLoggedIn && userInfo) {
      // 检查今日是否已签到
      const today = new Date().toISOString().split('T')[0];
      const isSignedIn = userInfo.lastSignInDate === today;
      
      this.setData({
        isLoggedIn: true,
        userInfo: userInfo,
        isSignedIn,
        signInDays: userInfo.signInDays || 0
      });
    } else {
      this.setData({
        isLoggedIn: false,
        userInfo: {
          avatarUrl: defaultAvatar,
          nickName: '游客',
          phone: ''
        },
        isSignedIn: false,
        signInDays: 0
      });
    }
  },

  // 点击头像登录
  async onAvatarTap() {
    if (this.data.isLoggedIn) {
      return;
    }
    await this.doLogin();
  },

  // 执行登录
  async doLogin() {
    if (this.data.isLoading) return;
    
    this.setData({ isLoading: true });
    wx.showLoading({ title: '登录中...' });

    try {
      // 获取用户头像和昵称
      const profileRes = await this.getUserProfile();
      
      // 调用登录服务
      const result = await login(profileRes);
      
      wx.hideLoading();
      
      if (result.success && result.userInfo) {
        // 保存到本地和全局
        saveUserToLocal(result.userInfo, result.openId);
        
        // 检查今日是否已签到
        const today = new Date().toISOString().split('T')[0];
        const isSignedIn = result.userInfo.lastSignInDate === today;
        
        this.setData({
          isLoggedIn: true,
          userInfo: result.userInfo,
          isSignedIn,
          signInDays: result.userInfo.signInDays || 0,
          isLoading: false
        });
        
        wx.showToast({ title: result.message, icon: 'success' });
      } else {
        this.setData({ isLoading: false });
        wx.showToast({ title: result.message || '登录失败', icon: 'none' });
      }
    } catch (e) {
      wx.hideLoading();
      this.setData({ isLoading: false });
      console.error('登录失败:', e);
      wx.showToast({ title: '登录失败，请重试', icon: 'none' });
    }
  },

  // 获取用户头像昵称
  getUserProfile(): Promise<{ nickName: string; avatarUrl: string }> {
    return new Promise((resolve) => {
      wx.getUserProfile({
        desc: '用于完善用户资料',
        success: (res) => {
          resolve({
            nickName: res.userInfo.nickName,
            avatarUrl: res.userInfo.avatarUrl
          });
        },
        fail: () => {
          // 用户拒绝授权，使用默认信息
          resolve({
            nickName: '微信用户',
            avatarUrl: ''
          });
        }
      });
    });
  },

  // 签到
  async onSignIn() {
    if (!this.data.isLoggedIn) {
      wx.showToast({ title: '请先登录', icon: 'none' });
      return;
    }

    if (this.data.isSignedIn) {
      wx.showToast({ title: '今日已签到', icon: 'none' });
      return;
    }

    wx.showLoading({ title: '签到中...' });
    
    try {
      const app = getApp<IAppOption>();
      const openId = app.globalData.openId;
      
      const result = await signIn(openId);
      
      wx.hideLoading();
      
      if (result.success) {
        this.setData({
          isSignedIn: true,
          signInDays: result.signInDays
        });
        
        // 更新全局和本地存储
        if (app.globalData.userInfo) {
          app.globalData.userInfo.signInDays = result.signInDays;
          app.globalData.userInfo.lastSignInDate = new Date().toISOString().split('T')[0];
          wx.setStorageSync('userInfo', app.globalData.userInfo);
        }
        
        wx.showToast({ title: `签到成功！连续${result.signInDays}天`, icon: 'success' });
      } else {
        wx.showToast({ title: result.message, icon: 'none' });
      }
    } catch (e) {
      wx.hideLoading();
      console.error('签到失败:', e);
      wx.showToast({ title: '签到失败', icon: 'none' });
    }
  },

  // 申请入驻
  onApplyJoin() {
    wx.navigateTo({ url: '/pages/join-selection/join-selection' });
  },

  // 菜单点击
  onMenuTap(e: any) {
    const { item } = e.currentTarget.dataset;
    
    // 退出登录
    if (item.id === 'logout') {
      if (!this.data.isLoggedIn) {
        wx.showToast({ title: '您还未登录', icon: 'none' });
        return;
      }
      
      wx.showModal({
        title: '提示',
        content: '确定要退出登录吗？',
        success: (res) => {
          if (res.confirm) {
            logout();
            this.setData({
              isLoggedIn: false,
              userInfo: {
                avatarUrl: defaultAvatar,
                nickName: '游客',
                phone: ''
              },
              isSignedIn: false,
              signInDays: 0
            });
            wx.showToast({ title: '已退出登录', icon: 'success' });
          }
        }
      });
      return;
    }
    
    if (item.disabled) {
      wx.showToast({ title: '功能开发中', icon: 'none' });
      return;
    }
    
    if (item.path) {
      wx.navigateTo({ url: item.path });
    }
  }
});
