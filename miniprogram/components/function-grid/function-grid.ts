// components/function-grid/function-grid.ts
Component({
  options: {
    styleIsolation: 'isolated'
  },

  properties: {
    // 功能入口数据
    items: {
      type: Array,
      value: []
    }
  },

  methods: {
    handleTap(e: any) {
      const item = e.currentTarget.dataset.item;
      if (item.disabled) {
        wx.showToast({
          title: '功能开发中',
          icon: 'none'
        });
        return;
      }
      if (item.path) {
        if (item.path.startsWith('switchTab:')) {
          // 如果有额外参数，存到全局
          if (item.extra) {
            const app = getApp() as any;
            app.globalData = app.globalData || {};
            app.globalData.pageParams = item.extra;
          }
          wx.switchTab({ url: item.path.replace('switchTab:', '') });
        } else {
          wx.navigateTo({ url: item.path });
        }
      }
      this.triggerEvent('tap', { item });
    }
  }
})
