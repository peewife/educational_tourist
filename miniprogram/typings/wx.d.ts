/// <reference path="./index.d.ts" />

// 微信小程序全局类型声明
declare namespace WechatMiniprogram {
  interface SystemInfo {
    statusBarHeight: number;
    windowWidth: number;
    windowHeight: number;
    pixelRatio: number;
    platform: string;
    SDKVersion: string;
  }

  interface MenuButtonBoundingClientRect {
    width: number;
    height: number;
    top: number;
    right: number;
    bottom: number;
    left: number;
  }
}

declare const wx: {
  getSystemInfoSync(): WechatMiniprogram.SystemInfo;
  getWindowInfo(): WechatMiniprogram.SystemInfo;
  getMenuButtonBoundingClientRect(): WechatMiniprogram.MenuButtonBoundingClientRect;
  navigateBack(options?: { delta?: number }): void;
  navigateTo(options: { url: string }): void;
  switchTab(options: { url: string }): void;
  redirectTo(options: { url: string }): void;
  showToast(options: { title: string; icon?: string; duration?: number }): void;
  showLoading(options: { title: string; mask?: boolean }): void;
  hideLoading(): void;
  stopPullDownRefresh(): void;
  makePhoneCall(options: { phoneNumber: string }): void;
  openLocation(options: { latitude: number; longitude: number; name?: string; address?: string }): void;
  setClipboardData(options: { data: string }): void;
  getStorageSync(key: string): any;
  setStorageSync(key: string, data: any): void;
  removeStorageSync(key: string): void;
};

declare function getCurrentPages(): Array<{ route: string; options: Record<string, string> }>;

declare function getApp<T = IAppOption>(): T;

declare function App<T = IAppOption>(options: {
  globalData?: T extends { globalData: infer G } ? G : any;
  onLaunch?(): void;
  onShow?(): void;
  onHide?(): void;
  onError?(error: string): void;
  [key: string]: any;
}): void;

declare function Page<T extends Record<string, any>>(options: {
  data?: T;
  onLoad?(options?: Record<string, string>): void;
  onShow?(): void;
  onReady?(): void;
  onHide?(): void;
  onUnload?(): void;
  onPullDownRefresh?(): void;
  onReachBottom?(): void;
  onShareAppMessage?(): { title: string; path: string };
  onPageScroll?(options: { scrollTop: number }): void;
  [key: string]: any;
}): void;

declare function Component<T extends Record<string, any>>(options: {
  options?: {
    multipleSlots?: boolean;
    styleIsolation?: 'isolated' | 'apply-shared' | 'shared';
    pureDataPattern?: RegExp;
  };
  properties?: Record<string, any>;
  data?: T;
  lifetimes?: {
    created?(): void;
    attached?(): void;
    ready?(): void;
    detached?(): void;
  };
  pageLifetimes?: {
    show?(): void;
    hide?(): void;
    resize?(): void;
  };
  methods?: Record<string, (...args: any[]) => any>;
  [key: string]: any;
}): void;

// 全局函数
declare function setTimeout(callback: () => void, ms?: number): number;
declare function clearTimeout(timeoutId: number): void;
declare function setInterval(callback: () => void, ms?: number): number;
declare function clearInterval(intervalId: number): void;
