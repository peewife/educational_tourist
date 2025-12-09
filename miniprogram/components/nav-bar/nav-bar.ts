// components/nav-bar/nav-bar.ts
Component({
  options: {
    multipleSlots: true,
    styleIsolation: 'isolated'
  },

  properties: {
    // 标题
    title: {
      type: String,
      value: ''
    },
    // 是否显示返回按钮
    showBack: {
      type: Boolean,
      value: false
    },
    // 背景色
    background: {
      type: String,
      value: 'rgba(255, 255, 255, 0.95)'
    },
    // 是否固定在顶部
    fixed: {
      type: Boolean,
      value: true
    },
    // 是否显示底部边框
    border: {
      type: Boolean,
      value: false
    }
  },

  data: {
    statusBarHeight: 20,
    navBarHeight: 44,
    capsuleWidth: 87,
    capsuleHeight: 32,
    capsuleRight: 10
  },

  lifetimes: {
    attached() {
      this._initNavBar();
    }
  },

  methods: {
    _initNavBar() {
      try {
        const systemInfo = wx.getWindowInfo();
        const menuButton = wx.getMenuButtonBoundingClientRect();
        
        const statusBarHeight = systemInfo.statusBarHeight || 20;
        const capsuleHeight = menuButton.height || 32;
        const capsuleWidth = menuButton.width || 87;
        const capsuleRight = systemInfo.windowWidth - menuButton.right;
        const capsuleTop = menuButton.top;
        
        // 导航栏高度 = 胶囊按钮高度 + 上下间距
        const navBarHeight = (capsuleTop - statusBarHeight) * 2 + capsuleHeight;

        this.setData({
          statusBarHeight,
          navBarHeight,
          capsuleWidth,
          capsuleHeight,
          capsuleRight
        });
      } catch (e) {
        // 获取系统信息失败，使用默认值
      }
    },

    handleBack() {
      const pages = getCurrentPages();
      if (pages.length > 1) {
        wx.navigateBack({ delta: 1 });
      } else {
        wx.switchTab({ url: '/pages/index/index' });
      }
      this.triggerEvent('back');
    }
  }
})
