// components/route-card/route-card.ts
Component({
  options: {
    styleIsolation: 'isolated'
  },

  properties: {
    // 线路数据
    route: {
      type: Object,
      value: {}
    },
    // 展示模式: horizontal(横向) | timeline(时间轴) | small(小卡片)
    mode: {
      type: String,
      value: 'horizontal'
    },
    // 序号（时间轴模式使用）
    index: {
      type: Number,
      value: 1
    },
    // 是否是最后一项
    isLast: {
      type: Boolean,
      value: false
    }
  },

  methods: {
    handleTap() {
      const { route } = this.data;
      if (route && route.id) {
        wx.navigateTo({
          url: `/pages/route-detail/route-detail?id=${route.id}`
        });
        this.triggerEvent('tap', { route });
      }
    }
  }
})
