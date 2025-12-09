# 永定研学小程序开发规范

> 技术栈: 微信小程序原生 + TypeScript + TDesign UI | 主题色: 客家红 #C8102E

## 1. 项目结构

```
yongding-study/
├── miniprogram/
│   ├── pages/                    # 页面目录
│   │   ├── index/                # 首页 (TabBar)
│   │   ├── courses/              # 课程列表 (TabBar)
│   │   ├── course-detail/        # 课程详情
│   │   ├── routes/               # 线路列表 (TabBar)
│   │   ├── route-detail/         # 线路详情
│   │   ├── bases/                # 基地/机构列表 (TabBar)
│   │   ├── base-detail/          # 基地详情
│   │   ├── agency-detail/        # 机构详情
│   │   ├── experts/              # 导师列表
│   │   ├── expert-detail/        # 导师详情
│   │   ├── profile/              # 个人中心 (TabBar)
│   │   ├── favorites/            # 收藏列表
│   │   ├── search/               # 搜索页
│   │   ├── apply-mentor/         # 申请导师
│   │   ├── join-selection/       # 入驻选择
│   │   └── org-apply/            # 机构申请
│   ├── components/               # 组件目录
│   │   ├── function-grid/        # 功能入口网格
│   │   ├── district-tags/        # 乡镇街道标签
│   │   ├── course-card/          # 课程卡片
│   │   ├── route-card/           # 线路卡片
│   │   ├── base-card/            # 基地卡片
│   │   ├── expert-card/          # 导师卡片
│   │   ├── bottom-action-bar/    # 底部操作栏
│   │   ├── expandable-text/      # 展开/收起文本
│   │   ├── timeline/             # 时间轴
│   │   ├── empty-state/          # 空状态
│   │   └── nav-bar/              # 自定义导航栏
│   ├── services/                 # 服务层
│   │   └── favorite.ts           # 收藏服务
│   ├── mock/                     # Mock数据
│   │   ├── home.ts               # 首页数据
│   │   ├── courses.ts            # 课程数据
│   │   ├── routes.ts             # 线路数据
│   │   ├── bases.ts              # 基地/机构数据
│   │   └── experts.ts            # 导师数据
│   ├── styles/                   # 公共样式
│   │   ├── theme.wxss            # 主题变量
│   │   └── common.wxss           # 通用样式
│   ├── assets/                   # 静态资源
│   │   └── icons/                # TabBar图标
│   └── app.ts/json/wxss          # 入口文件
└── project.config.json
```

**文件规范:** 每个页面/组件 = wxml + ts + json + wxss 四件套

## 2. 页面实现

### 2.1 首页 (index)

**功能模块:**
- 自定义导航栏 (品牌标题 + 搜索框)
- Banner轮播图 (自动播放 + 自定义指示器)
- 功能入口网格 (9宫格，支持disabled状态)
- 乡镇街道标签 (点击提示"功能开发中")
- 热门课程列表 (横向卡片)
- 热门线路列表 (横向卡片)
- 研学营地横向滚动

```typescript
// pages/index/index.ts
import { banners, functionEntries, districts } from '../../mock/home';
import { courses } from '../../mock/courses';
import { routes } from '../../mock/routes';
import { bases } from '../../mock/bases';

Page({
  data: {
    statusBarHeight: 20,
    banners: [] as IBanner[],
    currentBannerIndex: 0,
    functionEntries: [] as IFunctionEntry[],
    districts: [] as string[],
    hotCourses: [] as ICourse[],
    hotRoutes: [] as IRoute[],
    hotBases: [] as IBase[],
    selectedDistrict: ''
  },
  onLoad() {
    this.initSystemInfo();
    this.loadHomeData();
  },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 0 });
    }
  }
});
```

### 2.2 课程列表 (courses)

**功能模块:**
- 分类筛选栏 (最新/客家文化/红色教育/科学探究/非遗体验)
- 课程列表 (大图+信息布局)
- 分页加载 + 下拉刷新

```typescript
// 课程分类
const categories = [
  { id: 'all', name: '最新' },
  { id: 'culture', name: '客家文化' },
  { id: 'red', name: '红色教育' },
  { id: 'science', name: '科学探究' },
  { id: 'intangible', name: '非遗体验' }
];
```

### 2.3 课程详情 (course-detail)

**功能模块:**
- 封面大图
- 基本信息 (学段/时长)
- 相关基地卡片 (支持导航/电话)
- Tab切换 (课程详情/课程安排/费用明细)
- 底部操作栏 (分享/收藏/报名)

### 2.4 线路列表 (routes)

**功能模块:**
- 分类筛选 (全部/自然生态/红色研学/文化遗产/劳动实践/地质科普)
- 时间轴样式列表 (序号+连接线)

```typescript
const categories = [
  { id: 'all', name: '全部' },
  { id: 'nature', name: '自然生态' },
  { id: 'red', name: '红色研学' },
  { id: 'culture', name: '文化遗产' },
  { id: 'labor', name: '劳动实践' },
  { id: 'geology', name: '地质科普' }
];
```

### 2.5 线路详情 (route-detail)

**功能模块:**
- 封面大图
- 基本信息 (学段/天数/相关基地)
- 机构信息卡片
- Tab切换 (线路详情/线路安排/费用明细)
- 底部操作栏 (价格+电话咨询+报名)

### 2.6 基地列表 (bases)

**功能模块:**
- Tab切换 (研学基(营)地 / 服务机构)
- 基地列表 (大图+信息)
- 机构列表 (Logo+信息)

### 2.7 导师列表 (experts)

**功能模块:**
- 搜索框 (姓名/证书编号)
- 分类筛选 (全部/研学导师/研学教官/研究员/非遗传承)
- 导师卡片列表

### 2.8 个人中心 (profile)

**功能模块:**
- 用户信息区 (头像/昵称/签到)
- 推广卡片 (申请入驻)
- 功能菜单 (收藏课程/投诉建议/实践活动/活动报名/申请导师)

### 2.9 搜索页 (search)

**功能模块:**
- 搜索输入框
- 搜索类型切换 (全部/课程/线路/基地)
- 热门搜索标签
- 搜索历史 (本地存储)
- 搜索结果展示

## 3. 组件清单

| 组件名 | 用途 | 展示模式 |
| --- | --- | --- |
| function-grid | 首页功能入口网格 | 9宫格布局 |
| district-tags | 乡镇街道标签 | 流式标签 |
| course-card | 课程卡片 | horizontal/vertical/small |
| route-card | 线路卡片 | horizontal/timeline/small |
| base-card | 基地卡片 | scroll/list/small |
| expert-card | 导师卡片 | list/grid |
| bottom-action-bar | 底部操作栏 | 价格+按钮/图标+按钮 |
| expandable-text | 展开收起文本 | 可配置行数 |
| timeline | 时间轴 | red/blue主题 |
| empty-state | 空状态 | search/data/network/error |
| nav-bar | 自定义导航栏 | - |

### 3.1 function-grid 功能入口组件

```typescript
Component({
  properties: {
    items: { type: Array, value: [] }
  },
  methods: {
    handleTap(e: any) {
      const item = e.currentTarget.dataset.item;
      if (item.disabled) {
        wx.showToast({ title: '功能开发中', icon: 'none' });
        return;
      }
      if (item.path) {
        if (item.path.startsWith('switchTab:')) {
          if (item.extra) {
            const app = getApp() as any;
            app.globalData.pageParams = item.extra;
          }
          wx.switchTab({ url: item.path.replace('switchTab:', '') });
        } else {
          wx.navigateTo({ url: item.path });
        }
      }
    }
  }
})
```

### 3.2 district-tags 乡镇街道组件

```typescript
Component({
  properties: {
    districts: { type: Array, value: [] },
    selected: { type: String, value: '' }
  },
  methods: {
    handleTap(e: any) {
      const district = e.currentTarget.dataset.district;
      wx.showToast({ title: '功能开发中', icon: 'none', duration: 1500 });
      this.triggerEvent('select', { district });
    }
  }
})
```

### 3.3 course-card 课程卡片组件

```typescript
Component({
  properties: {
    course: { type: Object, value: {} },
    mode: { type: String, value: 'horizontal' } // horizontal | vertical | small
  },
  observers: {
    course(course) {
      // 格式化学生数和评分
      const studentCountText = course?.studentCount >= 1000 
        ? `${(course.studentCount / 1000).toFixed(1)}k` 
        : `${course?.studentCount || 0}`;
      this.setData({ studentCountText, ratingText: String(course?.rating || 0) });
    }
  },
  methods: {
    handleTap() {
      wx.navigateTo({ url: `/pages/course-detail/course-detail?id=${this.data.course.id}` });
    }
  }
})
```

### 3.4 bottom-action-bar 底部操作栏组件

```typescript
Component({
  properties: {
    showPrice: { type: Boolean, value: false },
    price: { type: Number, value: 0 },
    priceLabel: { type: String, value: '参考价' },
    priceUnit: { type: String, value: '' },
    showIcons: { type: Boolean, value: false },
    showShare: { type: Boolean, value: true },
    showFavorite: { type: Boolean, value: true },
    isFavorite: { type: Boolean, value: false },
    primaryText: { type: String, value: '立即报名' },
    primaryColor: { type: String, value: 'red' }, // red | orange
    secondaryText: { type: String, value: '' }
  },
  methods: {
    handleShare() { this.triggerEvent('share'); },
    handleFavorite() { this.triggerEvent('favorite', { isFavorite: !this.data.isFavorite }); },
    handlePrimary() { this.triggerEvent('primary'); },
    handleSecondary() { this.triggerEvent('secondary'); }
  }
})
```

### 3.5 expandable-text 展开收起组件

```typescript
Component({
  properties: {
    content: { type: String, value: '' },
    maxLines: { type: Number, value: 6 }
  },
  data: { expanded: false },
  methods: {
    handleToggle() {
      this.setData({ expanded: !this.data.expanded });
    }
  }
})
```

### 3.6 timeline 时间轴组件

```typescript
Component({
  properties: {
    items: { type: Array, value: [] },
    color: { type: String, value: 'red' } // red | blue
  }
})
```

## 4. 服务层

### 4.1 收藏服务 (favorite.ts)

```typescript
const FAVORITE_KEY = 'favorite_courses';

export function getFavorites(): string[] {
  const data = wx.getStorageSync(FAVORITE_KEY);
  return data ? JSON.parse(data) : [];
}

export function addFavorite(courseId: string): boolean {
  const favorites = getFavorites();
  if (!favorites.includes(courseId)) {
    favorites.unshift(courseId);
    wx.setStorageSync(FAVORITE_KEY, JSON.stringify(favorites));
  }
  return true;
}

export function removeFavorite(courseId: string): boolean {
  const favorites = getFavorites();
  const index = favorites.indexOf(courseId);
  if (index > -1) {
    favorites.splice(index, 1);
    wx.setStorageSync(FAVORITE_KEY, JSON.stringify(favorites));
  }
  return true;
}

export function isFavorite(courseId: string): boolean {
  return getFavorites().includes(courseId);
}

export function toggleFavorite(courseId: string): boolean {
  if (isFavorite(courseId)) {
    removeFavorite(courseId);
    return false;
  } else {
    addFavorite(courseId);
    return true;
  }
}
```

## 5. Mock数据结构

### 5.1 首页数据 (home.ts)

```typescript
// Banner数据
export const banners: IBanner[] = [
  { id: '1', imageUrl: '...', title: '探索世界文化遗产永定土楼', subtitle: '今日推荐', linkType: 'course', linkId: '1' }
];

// 功能入口
export const functionEntries: IFunctionEntry[] = [
  { id: '1', name: '资讯', icon: 'file-text', disabled: true },
  { id: '2', name: '课程', icon: 'book-open', path: 'switchTab:/pages/courses/courses' },
  { id: '3', name: '线路', icon: 'map-pin', path: 'switchTab:/pages/routes/routes' },
  { id: '4', name: '基(营)地', icon: 'building-2', path: 'switchTab:/pages/bases/bases' },
  { id: '5', name: '机构', icon: 'layout-grid', path: 'switchTab:/pages/bases/bases', extra: { tab: 'agencies' } },
  { id: '6', name: '精品线路', icon: 'compass', disabled: true },
  { id: '7', name: '研学导师', icon: 'graduation-cap', path: '/pages/experts/experts' },
  { id: '8', name: '公示', icon: 'award', disabled: true },
  { id: '9', name: '服务', icon: 'heart', disabled: true }
];

// 乡镇街道
export const districts: string[] = ['凤城街道', '坎市镇', '下洋镇', '湖坑镇', '高陂镇', '抚市镇', '湖雷镇', '培丰镇'];
```

### 5.2 课程数据 (courses.ts)

```typescript
interface ICourse {
  id: string;
  title: string;
  category: string;           // culture | red | science | intangible
  categoryName: string;
  imageUrl: string;
  gradeLevel: string;         // 小学 | 初中 | 高中 | 全学段
  duration: string;
  baseId?: string;
  baseName?: string;
  price: number;
  studentCount?: number;
  rating?: number;
  description: string;
  schedule?: IScheduleItem[];
  feeDescription?: string;
  tags?: string[];
  status: string;
}
```

### 5.3 线路数据 (routes.ts)

```typescript
interface IRoute {
  id: string;
  title: string;
  category: string;           // nature | red | culture | labor | geology
  categoryName: string;
  imageUrl: string;
  gradeLevel: string[];
  duration: string;
  agencyId?: string;
  agencyName?: string;
  baseIds?: string[];
  baseNames?: string[];
  price: number;
  description: string;
  schedule?: IScheduleItem[];
  feeDescription?: string;
  status: string;
}
```

### 5.4 基地/机构数据 (bases.ts)

```typescript
interface IBase {
  id: string;
  name: string;
  level: string;              // national | provincial | city
  levelName: string;
  district: string;
  address: string;
  imageUrl: string;
  location: { latitude: number; longitude: number };
  phone?: string;
  description: string;
  type: string;               // 研学基(营)地
  isRecommended?: boolean;
  status: string;
}

interface IAgency {
  id: string;
  name: string;
  logo?: string;
  logoText: string;
  district: string;
  address: string;
  location: { latitude: number; longitude: number };
  phone: string;
  description: string;
  type: string;               // 服务机构
  status: string;
}
```

### 5.5 导师数据 (experts.ts)

```typescript
interface IExpert {
  id: string;
  name: string;
  avatarUrl: string;
  role: string;               // teacher | officer | researcher | inheritor
  roleName: string;
  level: string;              // senior | intermediate
  levelName: string;
  certNo: string;
  agencyId?: string;
  agencyName?: string;
  validUntil: string;
  description: string;
  status: string;
}
```

## 6. app.json 配置

```json
{
  "pages": [
    "pages/index/index",
    "pages/courses/courses",
    "pages/course-detail/course-detail",
    "pages/routes/routes",
    "pages/route-detail/route-detail",
    "pages/bases/bases",
    "pages/base-detail/base-detail",
    "pages/agency-detail/agency-detail",
    "pages/experts/experts",
    "pages/profile/profile",
    "pages/search/search",
    "pages/favorites/favorites",
    "pages/expert-detail/expert-detail",
    "pages/apply-mentor/apply-mentor",
    "pages/join-selection/join-selection",
    "pages/org-apply/org-apply"
  ],
  "tabBar": {
    "color": "#999999",
    "selectedColor": "#C8102E",
    "list": [
      { "pagePath": "pages/index/index", "text": "首页" },
      { "pagePath": "pages/courses/courses", "text": "课程" },
      { "pagePath": "pages/routes/routes", "text": "线路" },
      { "pagePath": "pages/bases/bases", "text": "基地" },
      { "pagePath": "pages/profile/profile", "text": "我的" }
    ]
  },
  "usingComponents": {
    "t-button": "tdesign-miniprogram/button/button",
    "t-tabs": "tdesign-miniprogram/tabs/tabs",
    "t-tab-panel": "tdesign-miniprogram/tab-panel/tab-panel",
    "t-search": "tdesign-miniprogram/search/search",
    "t-image": "tdesign-miniprogram/image/image",
    "t-tag": "tdesign-miniprogram/tag/tag",
    "t-empty": "tdesign-miniprogram/empty/empty",
    "t-loading": "tdesign-miniprogram/loading/loading",
    "t-icon": "tdesign-miniprogram/icon/icon",
    "t-navbar": "tdesign-miniprogram/navbar/navbar"
  }
}
```

## 7. 全局数据 (app.ts)

```typescript
App<IAppOption>({
  globalData: {
    userInfo: null,
    theme: {
      primaryColor: '#C8102E',
      secondaryColor: '#FF6B00',
      infoColor: '#4A90E2',
      successColor: '#36C197'
    },
    districts: ['凤城街道', '坎市镇', '下洋镇', '湖坑镇', '高陂镇', '抚市镇', '湖雷镇', '培丰镇'],
    courseCategories: [
      { key: 'latest', name: '最新' },
      { key: 'culture', name: '客家文化' },
      { key: 'red', name: '红色教育' },
      { key: 'science', name: '科学探究' },
      { key: 'intangible', name: '非遗体验' }
    ],
    routeCategories: [
      { key: 'nature', name: '自然生态' },
      { key: 'red', name: '红色研学' },
      { key: 'culture', name: '文化遗产' },
      { key: 'labor', name: '劳动实践' },
      { key: 'geology', name: '地质科普' }
    ],
    expertRoles: [
      { key: 'teacher', name: '研学导师' },
      { key: 'officer', name: '研学教官' },
      { key: 'researcher', name: '研究员' },
      { key: 'inheritor', name: '非遗传承' }
    ],
    pageParams: null
  }
});
```


## 8. 样式规范

### 8.1 主题变量 (theme.wxss)

```css
page {
  /* 品牌色 */
  --td-brand-color: #C8102E;
  --td-brand-color-light: #FFF0F0;
  --td-brand-color-focus: #E8354D;
  --td-brand-color-active: #A00D25;
  
  /* 功能色 */
  --td-error-color: #FF4D4F;
  --td-success-color: #36C197;
  --td-warning-color: #FAAD14;
  --td-info-color: #4A90E2;
  
  /* 背景色 */
  --td-bg-color-page: #F5F7FA;
  --td-bg-color-container: #FFFFFF;
  
  /* 文字色 */
  --td-text-color-primary: #1a1a1a;
  --td-text-color-secondary: #666666;
  --td-text-color-placeholder: #999999;
  --td-text-color-brand: #C8102E;
  
  /* 边框色 */
  --td-border-color: #e5e5e5;
}
```

### 8.2 通用样式类 (common.wxss)

**Flex布局:**
- `.flex` `.flex-col` `.flex-row` `.flex-wrap`
- `.items-center` `.items-start` `.items-end`
- `.justify-center` `.justify-between` `.justify-around`

**间距:**
- `.p-2` ~ `.p-6` (padding)
- `.px-2` ~ `.px-6` (padding-x)
- `.py-2` ~ `.py-6` (padding-y)
- `.mt-1` ~ `.mt-6` (margin-top)
- `.mb-1` ~ `.mb-6` (margin-bottom)

**文字:**
- `.text-xs` ~ `.text-3xl` (字号)
- `.font-light` `.font-normal` `.font-medium` `.font-bold`
- `.text-center` `.text-left` `.text-right`
- `.truncate` `.line-clamp-2` `.line-clamp-6`

**颜色:**
- `.text-gray-400` ~ `.text-gray-900`
- `.bg-white` `.bg-gray-50` `.bg-gray-100`

**边框:**
- `.border` `.border-t` `.border-b`
- `.rounded-sm` `.rounded` `.rounded-lg` `.rounded-full`

**阴影:**
- `.shadow-sm` `.shadow-md` `.shadow-lg`

**定位:**
- `.relative` `.absolute` `.fixed` `.sticky`
- `.z-10` ~ `.z-50`

### 8.3 首页样式示例

```css
/* 顶部固定区域 */
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
}

/* 品牌标题 */
.app-title {
  font-size: 52rpx;
  font-weight: bold;
  color: #1a1a1a;
  font-family: 'Times New Roman', serif;
}

/* Banner轮播 */
.banner-swiper {
  width: 100%;
  height: 800rpx;
  border-radius: 16rpx;
  overflow: hidden;
}

.banner-overlay {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 48rpx;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
}

/* 区块标题 */
.section-title {
  font-size: 40rpx;
  font-weight: bold;
  color: #1a1a1a;
  font-family: 'Times New Roman', serif;
}

/* 查看更多 */
.section-more {
  font-size: 24rpx;
  font-weight: bold;
  color: var(--primary-color);
  text-transform: uppercase;
  letter-spacing: 2rpx;
}
```

## 9. 页面跳转规范

```typescript
// 跳转详情页
wx.navigateTo({ url: `/pages/course-detail/course-detail?id=${id}` });

// 详情页接收参数
onLoad(options: any) {
  const { id } = options;
  this.loadDetail(id);
}

// 返回上一页
wx.navigateBack();

// 跳转TabBar页
wx.switchTab({ url: '/pages/index/index' });

// 跳转TabBar页并传参 (通过globalData)
const app = getApp() as any;
app.globalData.pageParams = { tab: 'agencies' };
wx.switchTab({ url: '/pages/bases/bases' });

// TabBar页接收参数
onShow() {
  const app = getApp();
  if (app.globalData?.pageParams) {
    const params = app.globalData.pageParams;
    // 处理参数
    app.globalData.pageParams = null; // 清除
  }
}
```

## 10. 列表分页规范

```typescript
Page({
  data: {
    list: [],
    loading: false,
    hasMore: true,
    page: 1,
    pageSize: 10,
    currentCategory: 'all'
  },

  // 加载数据
  loadData(isRefresh = true) {
    if (this.data.loading) return;
    this.setData({ loading: true });

    setTimeout(() => {
      let filtered = [...allData];
      
      // 分类筛选
      if (this.data.currentCategory !== 'all') {
        filtered = filtered.filter(item => item.category === this.data.currentCategory);
      }

      // 分页
      const start = isRefresh ? 0 : (this.data.page - 1) * this.data.pageSize;
      const end = start + this.data.pageSize;
      const pageData = filtered.slice(start, end);

      this.setData({
        list: isRefresh ? pageData : [...this.data.list, ...pageData],
        loading: false,
        hasMore: end < filtered.length,
        page: isRefresh ? 2 : this.data.page + 1
      });
    }, 300);
  },

  // 切换分类
  onCategoryChange(e: any) {
    const { id } = e.currentTarget.dataset;
    if (id === this.data.currentCategory) return;
    this.setData({ currentCategory: id, page: 1, hasMore: true });
    this.loadData(true);
  },

  // 下拉刷新
  onPullDownRefresh() {
    this.setData({ page: 1, hasMore: true });
    this.loadData(true);
    wx.stopPullDownRefresh();
  },

  // 触底加载
  onReachBottom() {
    if (this.data.hasMore && !this.data.loading) {
      this.loadData(false);
    }
  }
});
```

## 11. 功能状态说明

### 已实现功能:
- ✅ 首页展示 (Banner/功能入口/乡镇标签/热门内容)
- ✅ 课程列表与详情
- ✅ 线路列表与详情
- ✅ 基地/机构列表与详情
- ✅ 导师列表与详情
- ✅ 搜索功能 (课程/线路/基地)
- ✅ 收藏功能 (本地存储)
- ✅ 个人中心基础功能

### 待开发功能 (显示"功能开发中"):
- ⏳ 资讯模块
- ⏳ 精品线路
- ⏳ 公示模块
- ⏳ 服务模块
- ⏳ 乡镇街道筛选
- ⏳ 投诉建议
- ⏳ 实践活动
- ⏳ 活动报名
- ⏳ 报名支付功能
