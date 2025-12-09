// components/district-tags/district-tags.ts
Component({
  options: {
    styleIsolation: 'isolated'
  },

  properties: {
    // 乡镇列表
    districts: {
      type: Array,
      value: []
    },
    // 当前选中
    selected: {
      type: String,
      value: ''
    }
  },

  methods: {
    handleTap(e: any) {
      const district = e.currentTarget.dataset.district;
      // 显示功能开发中提示
      wx.showToast({
        title: '功能开发中',
        icon: 'none',
        duration: 1500
      });
      this.triggerEvent('select', { district });
    }
  }
})
