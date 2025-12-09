/// <reference path="./models.d.ts" />
/// <reference path="./api.d.ts" />

// 全局应用配置
interface IAppOption {
  globalData: {
    userInfo: IUserInfo | null;
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
}

// 页面 onLoad 参数
interface PageOptions {
  id?: string;
  [key: string]: string | undefined;
}
