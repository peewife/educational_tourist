// components/timeline/timeline.ts
Component({
  options: {
    styleIsolation: 'isolated'
  },

  properties: {
    // 时间轴数据
    items: {
      type: Array,
      value: []
    },
    // 主题色: red | blue
    color: {
      type: String,
      value: 'red'
    }
  }
})
