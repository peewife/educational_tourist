// components/empty-state/empty-state.ts
Component({
  options: {
    styleIsolation: 'isolated'
  },

  properties: {
    // 图标类型: search | data | network | error
    icon: {
      type: String,
      value: 'data'
    },
    // 描述文字
    description: {
      type: String,
      value: '暂无数据'
    },
    // 是否显示操作按钮
    showAction: {
      type: Boolean,
      value: false
    },
    // 按钮文字
    actionText: {
      type: String,
      value: '重新加载'
    }
  },

  methods: {
    handleAction() {
      this.triggerEvent('action');
    }
  }
})
