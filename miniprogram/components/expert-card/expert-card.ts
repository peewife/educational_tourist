// components/expert-card/expert-card.ts
Component({
  options: {
    styleIsolation: 'isolated'
  },

  properties: {
    // 导师数据
    expert: {
      type: Object,
      value: {}
    },
    // 展示模式: list(列表) | grid(网格)
    mode: {
      type: String,
      value: 'list'
    }
  },

  methods: {
    handleTap() {
      const { expert } = this.data;
      this.triggerEvent('tap', { expert });
    }
  }
})
