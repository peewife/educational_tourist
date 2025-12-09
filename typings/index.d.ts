/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    userInfo: any;
    openId: string;
    isLoggedIn: boolean;
    theme: {
      primaryColor: string;
      secondaryColor: string;
      infoColor: string;
      successColor: string;
    };
    districts: string[];
    courseCategories: Array<{ key: string; name: string }>;
    routeCategories: Array<{ key: string; name: string }>;
    expertRoles: Array<{ key: string; name: string }>;
    pageParams: any;
  };
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback;
}