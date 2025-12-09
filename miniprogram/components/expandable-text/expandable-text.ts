// components/expandable-text/expandable-text.ts
Component({
  options: {
    styleIsolation: 'isolated'
  },

  properties: {
    // 文本内容
    content: {
      type: String,
      value: ''
    },
    // 最大显示行数
    maxLines: {
      type: Number,
      value: 6
    }
  },

  data: {
    expanded: false,
    showToggle: true
  },

  methods: {
    handleToggle() {
      this.setData({
        expanded: !this.data.expanded
      });
      this.triggerEvent('toggle', { expanded: this.data.expanded });
    }
  }
})
