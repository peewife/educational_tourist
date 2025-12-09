// pages/org-apply/org-apply.ts
Page({
  data: {
    statusBarHeight: 20,
    type: '',
    typeName: '',
    formData: {
      orgName: '',
      contact: '',
      phone: '',
      address: '',
      description: ''
    },
    images: [] as string[]
  },

  onLoad(options: any) {
    this.initSystemInfo();
    if (options.type) {
      this.setData({
        type: options.type,
        typeName: decodeURIComponent(options.typeName || '')
      });
    }
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

  onBackTap() {
    wx.navigateBack();
  },

  onOrgNameInput(e: any) {
    this.setData({ 'formData.orgName': e.detail.value });
  },

  onContactInput(e: any) {
    this.setData({ 'formData.contact': e.detail.value });
  },

  onPhoneInput(e: any) {
    this.setData({ 'formData.phone': e.detail.value });
  },

  onAddressInput(e: any) {
    this.setData({ 'formData.address': e.detail.value });
  },

  onDescInput(e: any) {
    this.setData({ 'formData.description': e.detail.value });
  },

  onChangeType() {
    wx.navigateBack();
  },

  onChooseLocation() {
    wx.showToast({ title: '地图选择功能开发中', icon: 'none' });
  },

  onChooseImage() {
    wx.showToast({ title: '图片上传功能开发中', icon: 'none' });
  },

  onRemoveImage(e: any) {
    const { index } = e.currentTarget.dataset;
    const images = [...this.data.images];
    images.splice(index, 1);
    this.setData({ images });
  },

  onSubmit() {
    const { orgName, contact, phone } = this.data.formData;
    
    if (!orgName) {
      wx.showToast({ title: '请输入机构名称', icon: 'none' });
      return;
    }
    
    if (!contact) {
      wx.showToast({ title: '请输入联系人', icon: 'none' });
      return;
    }
    
    if (!phone) {
      wx.showToast({ title: '请输入联系电话', icon: 'none' });
      return;
    }

    wx.showToast({ title: '申请已提交', icon: 'success' });
    setTimeout(() => {
      wx.navigateBack({ delta: 2 });
    }, 1500);
  }
});
