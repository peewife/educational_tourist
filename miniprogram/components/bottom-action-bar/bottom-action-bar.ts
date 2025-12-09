// components/bottom-action-bar/bottom-action-bar.ts
Component({
  options: {
    multipleSlots: true,
    styleIsolation: 'isolated'
  },

  properties: {
    // 是否显示价格
    showPrice: {
      type: Boolean,
      value: false
    },
    // 价格标签
    priceLabel: {
      type: String,
      value: '参考价'
    },
    // 价格
    price: {
      type: Number,
      value: 0
    },
    // 价格单位
    priceUnit: {
      type: String,
      value: ''
    },
    // 是否显示图标按钮
    showIcons: {
      type: Boolean,
      value: false
    },
    // 是否显示分享按钮
    showShare: {
      type: Boolean,
      value: true
    },
    // 是否显示收藏按钮
    showFavorite: {
      type: Boolean,
      value: true
    },
    // 是否已收藏
    isFavorite: {
      type: Boolean,
      value: false
    },
    // 主按钮文字
    primaryText: {
      type: String,
      value: '立即报名'
    },
    // 主按钮颜色 red | orange
    primaryColor: {
      type: String,
      value: 'red'
    },
    // 次要按钮文字
    secondaryText: {
      type: String,
      value: ''
    }
  },

  methods: {
    handleShare() {
      this.triggerEvent('share');
    },

    handleFavorite() {
      this.triggerEvent('favorite', { isFavorite: !this.data.isFavorite });
    },

    handlePrimary() {
      this.triggerEvent('primary');
    },

    handleSecondary() {
      this.triggerEvent('secondary');
    }
  }
})
