// pages/apply-mentor/apply-mentor.ts
Page({
  data: {
    statusBarHeight: 20,
    formData: {
      name: '',
      phone: '',
      idCard: ''
    }
  },

  onLoad() {
    this.initSystemInfo();
  },

  initSystemInfo() {
    try {
      const systemInfo = wx.getWindowInfo();
      this.setData({
        statusBarHeight: systemInfo.statusBarHeight || 20
      });
    } catch (e) {
      // 使用默认值
    }
  },

  onNameInput(e: any) {
    this.setData({ 'formData.name': e.detail.value });
  },

  onPhoneInput(e: any) {
    this.setData({ 'formData.phone': e.detail.value });
  },

  onIdCardInput(e: any) {
    this.setData({ 'formData.idCard': e.detail.value });
  },

  onSubmit() {
    const { name, phone, idCard } = this.data.formData;
    
    if (!phone) {
      wx.showToast({ title: '请输入手机号码', icon: 'none' });
      return;
    }
    
    if (!/^1\d{10}$/.test(phone)) {
      wx.showToast({ title: '手机号格式不正确', icon: 'none' });
      return;
    }

    wx.showToast({ title: '申请已提交', icon: 'success' });
    setTimeout(() => wx.navigateBack(), 1500);
  }
});
