// components/base-card/base-card.ts
Component({
  options: {
    styleIsolation: 'isolated'
  },

  properties: {
    // 基地数据
    base: {
      type: Object,
      value: {}
    },
    // 展示模式: scroll(横向滚动) | list(列表) | small(小卡片)
    mode: {
      type: String,
      value: 'scroll'
    }
  },

  methods: {
    handleTap() {
      const { base } = this.data;
      if (base && base.id) {
        wx.navigateTo({
          url: `/pages/base-detail/base-detail?id=${base.id}`
        });
        this.triggerEvent('tap', { base });
      }
    }
  }
})
