# 永定研学小程序开发规范

> 技术栈: 微信小程序原生 + TDesign UI + 微信云开发 + TypeScript | 主题色: 客家红 #C8102E

---

## 1. 项目结构

```
yongding-study/
├── miniprogram/
│   ├── pages/           # 页面目录
│   │   ├── index/             # 首页（搜索框+Banner+功能入口+乡镇标签+热门列表）
│   │   ├── courses/           # 课程列表（分类Tab+卡片列表）
│   │   ├── course-detail/     # 课程详情（Tabs切换+行程时间轴+底部操作栏）
│   │   ├── routes/            # 线路列表（分类筛选+卡片列表）
│   │   ├── route-detail/      # 线路详情（关联基地+公司信息+费用明细）
│   │   ├── bases/             # 基地/机构列表（子Tab切换+搜索+列表）
│   │   ├── base-detail/       # 基地详情（大图+地址导航+关联课程）
│   │   ├── agency-detail/     # 机构详情（Logo展示+简介+关联线路/导师）
│   │   ├── experts/           # 导师列表（搜索+角色分类+卡片列表）
│   │   ├── profile/           # 个人中心（头像+签到+推广卡片+功能列表）
│   │   └── search/            # 搜索页
│   ├── components/      # 组件目录（详见§3）
│   ├── services/        # 云函数封装（course/route/base/expert/user）
│   ├── utils/           # 工具函数（cloud/auth/storage/format/navigator）
│   ├── typings/         # 类型定义目录
│   ├── config/          # 配置文件（theme/api/constants）
│   ├── styles/          # 公共样式（theme/tdesign/common）
│   ├── assets/          # 静态资源（images/icons/fonts）
│   ├── app.ts           # 入口文件
│   ├── app.json         # 全局配置
│   └── app.wxss         # 全局样式
├── cloudfunctions/      # 云函数目录
├── tsconfig.json        # TypeScript配置
├── typings/             # 小程序API类型声明
└── project.config.json  # 项目配置
```

### 1.1 文件命名规范

| 类型 | 命名规则 | 示例 |
|------|---------|------|
| 页面目录 | 小写+连字符 | `course-detail/` |
| 页面文件 | 与目录同名 | `course-detail.ts/.wxml/.json/.wxss` |
| 组件目录 | 小写+连字符 | `course-card/` |
| 服务文件 | 小写+单数 | `course.ts`, `user.ts` |
| 类型文件 | 小写+.d.ts | `models.d.ts`, `api.d.ts` |
| 工具文件 | 小写+功能名 | `navigator.ts`, `format.ts` |

### 1.2 TypeScript 配置要求

**tsconfig.json 必须配置项：**
- `strict: true` - 启用严格模式
- `strictNullChecks: true` - 严格空值检查
- `noImplicitAny: true` - 禁止隐式any
- `paths: { "@/*": ["miniprogram/*"] }` - 路径别名

**project.config.json 必须配置项：**
- `setting.useCompilerPlugins: ["typescript"]` - 启用TS编译

## 2. Page页面规范

### 2.1 生命周期

| 生命周期 | 触发时机 | 常用场景 |
|----------|---------|----------|
| onLoad | 页面加载时 | 获取路由参数、初始化数据 |
| onShow | 页面显示时 | 刷新数据、恢复定时器 |
| onReady | 页面渲染完成 | DOM操作、动画初始化 |
| onHide | 页面隐藏时 | 清除定时器、暂停播放 |
| onUnload | 页面卸载时 | 清理资源 |

### 2.2 页面事件

| 事件 | 触发时机 | 使用场景 |
|------|---------|----------|
| onPullDownRefresh | 下拉刷新 | 列表重置并重新加载 |
| onReachBottom | 触底事件 | 分页加载更多 |
| onShareAppMessage | 分享小程序 | 返回分享配置 |
| onPageScroll | 页面滚动 | 导航栏透明度变化 |

### 2.3 数据管理原则

- **data只存渲染数据** - 列表、加载状态、分类等
- **非渲染数据用this.xxx** - 分页参数、缓存数据
- **异步方法用async/await** - 数据请求、云函数调用
- **统一调用Service层** - 不直接调用wx.cloud

---

## 3. Component组件规范

### 3.1 生命周期

**组件生命周期 (lifetimes):**

| 生命周期 | 触发时机 |
|----------|----------|
| created | 组件创建时 |
| attached | 组件挂载时 |
| ready | 组件渲染完成 |
| detached | 组件卸载时 |

**页面生命周期 (pageLifetimes):**

| 生命周期 | 触发时机 |
|----------|----------|
| show | 所在页面显示 |
| hide | 所在页面隐藏 |
| resize | 页面尺寸变化 |

### 3.2 组件配置选项

| 配置项 | 说明 | 推荐值 |
|-------|------|--------|
| multipleSlots | 启用多插槽 | true |
| styleIsolation | 样式隔离 | 'isolated' |
| pureDataPattern | 纯数据字段正则 | /^_/ |

### 3.3 命名约定

- **properties用驼峰** - `propertyName`
- **wxml用连字符** - `property-name`
- **私有方法用_前缀** - `_loadData()`
- **事件处理用handle前缀** - `handleTap()`

### 3.4 组件清单

| 组件名 | 用途 | TDesign映射 |
|-------|------|------------|
| nav-bar | 自定义导航栏(返回+标题+胶囊) | t-navbar |
| search-bar | 搜索框 | t-search |
| course-card | 课程卡片(横向/纵向) | - |
| route-card | 线路卡片 | - |
| base-card | 基地卡片 | - |
| agency-card | 机构卡片 | - |
| expert-card | 导师卡片 | - |
| bottom-action-bar | 底部悬浮操作栏 | - |
| expandable-text | 展开/收起文本 | - |
| timeline | 时间轴(行程安排) | t-steps |
| tag-group | 标签组(分类筛选) | t-tag |
| empty-state | 空状态占位 | t-empty |
| function-grid | 功能入口网格(10项) | - |
| district-tags | 乡镇标签组 | t-tag |
| banner-swiper | 首页Banner轮播 | t-swiper |

## 4. app.json配置

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
    "pages/search/search"
  ],
  "window": { "navigationBarBackgroundColor": "#C8102E", "navigationBarTitleText": "永定研学" },
  "tabBar": {
    "selectedColor": "#C8102E",
    "list": [
      { "pagePath": "pages/index/index", "text": "首页", "iconPath": "...", "selectedIconPath": "..." },
      { "pagePath": "pages/courses/courses", "text": "课程" },
      { "pagePath": "pages/routes/routes", "text": "线路" },
      { "pagePath": "pages/bases/bases", "text": "基地" },
      { "pagePath": "pages/profile/profile", "text": "我的" }
    ]
  },
  "usingComponents": {
    "t-button": "tdesign-miniprogram/button/button",
    "t-tabs": "tdesign-miniprogram/tabs/tabs",
    "t-search": "tdesign-miniprogram/search/search",
    "t-image": "tdesign-miniprogram/image/image",
    "t-tag": "tdesign-miniprogram/tag/tag",
    "t-empty": "tdesign-miniprogram/empty/empty",
    "t-loading": "tdesign-miniprogram/loading/loading",
    "t-swiper": "tdesign-miniprogram/swiper/swiper",
    "t-icon": "tdesign-miniprogram/icon/icon",
    "t-navbar": "tdesign-miniprogram/navbar/navbar"
  },
  "cloud": true
}
```

**globalData关键数据:**

- theme: { primaryColor: '#C8102E', secondaryColor: '#FF6B00', infoColor: '#4A90E2', successColor: '#36C197' }
- districts: ['凤城街道', '坎市镇', '下洋镇', '湖坑镇', '高陂镇', '抚市镇', '湖雷镇', '培丰镇']
- courseCategories: latest/culture/red/science/intangible
- routeCategories: culture/red/nature/labor/geology
- expertRoles: teacher/officer/researcher/inheritor

### 4.1 页面跳转规范

| 跳转类型 | API | 使用场景 |
|---------|-----|----------|
| 详情页 | `wx.navigateTo` | 课程/线路/基地详情，携带id参数 |
| 返回 | `wx.navigateBack` | 详情页返回列表 |
| Tab切换 | `wx.switchTab` | 首页/课程/线路/基地/我的 |
| 重定向 | `wx.redirectTo` | 登录后跳转 |

**路由参数约定：**
- 详情页必须携带 `id` 参数
- onLoad 中通过 `options.id` 获取
- 建议封装 `utils/navigator.ts` 工具类

### 4.2 列表分页与筛选规范

**分页参数：**
- `page`: 当前页码，从1开始
- `pageSize`: 每页条数，默认10
- `hasMore`: 是否还有更多

**筛选逻辑：**
- 分类切换时重置 `page=1` 并清空列表
- 触底加载检查 `hasMore` 状态
- 下拉刷新时完全重置并调用 `wx.stopPullDownRefresh()`

**分类配置：**
- 课程: 最新/客家文化/红色教育/科学探究/非遗体验
- 线路: 文化遗产/红色研学/自然生态/劳动实践/地质科普
- 导师: 研学导师/研学教官/研究员/非遗传承

---

## 5. 云函数开发

### 5.1 目录结构

```
cloudfunctions/
├── user/          # 用户相关
├── course/        # 课程相关
├── route/         # 线路相关
├── base/          # 基地相关
├── expert/        # 导师相关
├── common/        # 通用功能
└── _shared/       # 共享工具
```

### 5.2 响应格式规范

| 字段 | 类型 | 说明 |
|------|------|------|
| code | 0/400/404/500 | 0=成功, 400=参数错误, 404=不存在, 500=服务器错误 |
| data | T | 返回数据 |
| message | string | 错误信息 |

### 5.3 列表接口规范

**请求参数：**
- `action`: 操作类型 (getList/getDetail/...)
- `page`: 页码
- `pageSize`: 每页条数
- `category`: 分类筛选(可选)

**返回数据：**
- `list`: 数据数组
- `total`: 总数
- `hasMore`: 是否还有更多

### 5.4 Service层封装规范

- 每个实体对应一个Service文件 (`services/course.ts`)
- 统一封装 `wx.cloud.callFunction` 调用
- 返回类型安全的数据

---

## 6. 数据库设计 (MongoDB)

### 6.1 集合设计

| 集合 | 关键字段 | 索引 |
|------|---------|------|
| users | openId, role(user/expert/admin), phone | - |
| courses | title, category, baseId, price, tags[], status, schedule[] | category+status, baseId |
| routes | title, category, agencyId, baseIds[], price, schedule[] | category+status, agencyId |
| bases | name, level, district, address, location(GeoPoint) | district+level, location(2dsphere) |
| agencies | name, logo, district, phone, address | - |
| experts | name, role, level, certNo, agencyId, validUntil | role+level, certNo(unique) |

### 6.2 类型定义规范

**类型文件结构：**

| 文件 | 内容 |
|------|------|
| `typings/models.d.ts` | 数据模型类型 (User, Course, Route, Base, Agency, Expert) |
| `typings/api.d.ts` | API响应类型 (ApiResponse, ListResponse) |
| `typings/tdesign.d.ts` | TDesign组件事件类型 |

**核心类型定义：**

| 类型 | 用途 |
|------|------|
| `PageOptions` | 页面onLoad参数 |
| `GetListParams` | 列表请求参数 (page, pageSize, category) |
| `ListResponse<T>` | 列表响应 (list, total, hasMore) |
| `ApiResponse<T>` | API通用响应 (code, data, message) |
| `ScheduleItem` | 行程安排项 (time, title, desc) |

**枚举类型：**

| 枚举 | 值 |
|------|------|
| UserRole | user / expert / admin |
| BaseLevel | national / provincial / city |
| ExpertLevel | junior / intermediate / senior |
| CourseCategory | latest / culture / red / science / intangible |
| RouteCategory | culture / red / nature / labor / geology |
| ExpertRole | teacher / officer / researcher / inheritor |

---

## 7. UI设计规范

### 7.1 色彩体系

**主色调:**

- 客家红(主品牌色): `#C8102E` - 强调按钮/选中状态/品牌标识
- 活力橙(辅助强调): `#FF6B00` - 线路详情/Tab选中指示器
- 信息蓝(功能色): `#4A90E2` - 模块标题/时间轴节点
- 导航绿(功能色): `#36C197` - 地图导航按钮

**中性色:**

- 背景白: `#FFFFFF` - 主背景
- 浅灰背景: `#F5F7FA` - 详情页次级背景
- 主文字: `gray-900` - 标题/重要内容
- 次级文字: `gray-500` - 描述/辅助信息
- 占位文字: `gray-400` - 输入框占位符
- 边框色: `gray-200`/`gray-100` - 分割线/卡片边框

**状态色:**

- 价格红: `#FF4D4F` - 价格显示
- 成功色: `#52C41A` - 成功状态(预留)
- 警告色: `#FAAD14` - 警告提示(预留)

### 7.2 字体规范

**字体家族:**

- 标题: `font-serif`(衬线) - 品牌名称/页面标题/卡片标题
- 正文: `font-sans`(无衬线) - 正文/描述/按钮
- 数字: `font-mono`(等宽) - 价格/编号/时间

**字号层级:**

- 品牌标题: 26-32px
- 页面标题: 20-22px
- 卡片标题: 16-18px
- 正文内容: 13-14px
- 辅助信息: 10-12px
- 标签文字: 10px(大写+加宽字距)

**字重:** 标题 `font-bold` | 正文 `font-medium`/`font-light` | 辅助 `font-light`

### 7.3 布局规范

**整体框架:**

- 移动端优先, 最大宽度 `max-w-md`(≈448px)
- 页面居中显示, 两侧带阴影边框
- 安全区域适配(`pb-safe`底部安全距离)

**头部导航:**

- 粘性定位(`sticky top-0`)
- 毛玻璃背景(`bg-white/95 backdrop-blur-sm`)
- 高度: 状态栏占位40px + 导航区48px
- 右侧胶囊按钮模拟微信小程序样式

**底部导航栏:**

- 固定定位(`fixed bottom-0`)
- 5Tab等宽分布, 高度64px
- 图标24px, 文字10px
- 选中状态: 图标加粗+文字变黑

**内容间距:**

- 页面水平内边距: 16px(`px-4`)
- 卡片内边距: 20px(`p-5`)
- 模块间距: 24-32px
- 列表项间距: 16-24px

### 7.4 组件样式

**按钮:**

- 主按钮: 圆角全圆 `rounded-full` + 客家红背景 + 白色文字 + 阴影
- 次按钮: 圆角全圆 + 白色/透明背景 + 描边
- 图标按钮: 圆形 `rounded-full` + 边框
- 悬停: 背景色加深或反转

**卡片:**

- 圆角: `rounded-sm`/`rounded-lg`
- 阴影: `shadow-sm`/`shadow-md`
- 分割线: 1px浅灰 `border-gray-100`

**图片:**

- 比例: 16:9(Banner/详情大图) | 4:3(营地卡片) | 3:4(导师头像) | 1:1(方形缩略图)
- 滤镜: 轻微灰度 `grayscale-[20%]~[30%]` + 对比度增强 `contrast-125`
- 悬停: 取消灰度 + 放大 `scale-105`/`scale-110`
- 圆角: 小圆角或无圆角

**标签:**

- 信息标签: 灰色背景 `bg-gray-100` + 圆角小 + 10px字号
- 分类标签: 描边样式 `border` + 圆角全圆
- 等级标签: 白色/黑色背景 + 毛玻璃效果 + 大写字母

**搜索框:**

- 灰色背景 `bg-gray-50`/`bg-gray-100`
- 圆角 `rounded-lg`
- 左侧搜索图标 + 占位符浅灰色

### 7.5 交互效果

**过渡动画:**

- 默认时长: 300ms(`duration-300`)
- 图片缩放: 500-700ms(`duration-500`/`duration-700`)
- 缓动: 默认ease

**悬停反馈:**

- 文字变色: 灰色→黑色/品牌红
- 背景变化: 透明→浅灰(`hover:bg-gray-50`)
- 按钮反转: 背景↔文字颜色互换
- 图片: 取消灰度 + 轻微放大

**选中状态:**

- Tab指示器: 底部2px色条
- 导航图标: 加粗(`strokeWidth:2`)
- 分类标签: 加粗+下划线

**列表滚动:**

- 横向滚动: 隐藏滚动条(`no-scrollbar`)
- 平滑滚动: 原生滚动体验

### 7.6 特殊组件

**时间轴:**

- 左侧竖线: 1px浅色边框 `border-l`
- 节点圆点: 12-14px圆形, 品牌色填充
- 节点带白色环形边框和阴影

**底部悬浮栏:**

- 白色背景 + 顶部边框
- 左侧价格信息, 右侧操作按钮
- 安全区域底部适配

**展开/收起:**

- 文字截断: `line-clamp-6`
- 展开按钮: 居中显示, 带向下箭头
- 箭头旋转动画

**个人中心:**

- 大号问候语标题(32px衬线字体)
- 圆形头像带边框
- 推广卡片: 黑色背景 + 模糊光晕装饰

### 设计风格总结

整体设计遵循「现代极简 + 客家文化」的融合风格：

- **极简留白**：大量使用白色背景和灰度层次，突出内容本身
- **衬线点缀**：标题使用衬线字体，增添文化底蕴和品质感
- **克制用色**：以黑白灰为主，客家红作为品牌强调色点缀
- **微妙质感**：轻灰度滤镜、毛玻璃效果、柔和阴影，营造高级感
- **流畅交互**：悬停动效、平滑过渡，提供舒适的操作反馈

## 8. TDesign组件库

### 8.1 组件与功能映射

| 功能需求   | TDesign组件         | 使用场景                   |
| ---------- | ------------------- | -------------------------- |
| 搜索框     | t-search            | 首页/列表页顶部搜索        |
| Tab切换    | t-tabs              | 课程详情/线路详情/基地列表 |
| 标签       | t-tag               | 分类标签/学段标签/等级标签 |
| 底部操作栏 | 自定义              | 详情页底部(分享/收藏/报名) |
| 空状态     | t-empty             | 列表为空/搜索无结果        |
| 图片       | t-image             | 懒加载+占位图+错误处理     |
| 加载       | t-loading           | 页面加载/列表加载更多      |
| 轮播图     | t-swiper            | 首页Banner                 |
| 导航栏     | t-navbar            | 自定义导航(详情页返回)     |
| 图标       | t-icon              | 通用图标                   |
| 时间轴     | t-steps(竖向)       | 行程安排展示               |
| 下拉刷新   | t-pull-down-refresh | 列表页下拉刷新             |

### 8.2 主题覆盖(tdesign.wxss)

```
page {
  /* 品牌色 */
  --td-brand-color: #C8102E;
  --td-brand-color-light: #FFF0F0;
  /* 功能色 */
  --td-error-color: #FF4D4F;
  --td-success-color: #36C197;
  --td-warning-color: #FAAD14;
  /* 背景色 */
  --td-bg-color-page: #F5F7FA;
  --td-bg-color-container: #FFFFFF;
  /* 文字色 */
  --td-text-color-primary: #1a1a1a;
  --td-text-color-secondary: #666666;
  --td-text-color-placeholder: #999999;
  /* 边框色 */
  --td-border-color: #e5e5e5;
}
```

### 8.3 常用组件示例

```
<!-- 搜索框 -->
<t-search placeholder="搜索课程、线路、基地..." bind:submit="onSearch" />

<!-- Tab切换 -->
<t-tabs value="{{activeTab}}" bind:change="onTabChange">
  <t-tab-panel label="课程详情" value="detail" />
  <t-tab-panel label="课程安排" value="schedule" />
  <t-tab-panel label="费用明细" value="fees" />
</t-tabs>

<!-- 图片(懒加载+占位) -->
<t-image src="{{url}}" mode="aspectFill" lazy loading="lazy" />

<!-- 空状态 -->
<t-empty icon="search" description="暂无搜索结果" />
```

## 9. 版本控制

**分支:** main(生产) | develop(开发) | feature/xxx | fix/xxx | release/vX.X.X

**提交格式:** `[type](scope): message`

- feat: 新功能 | fix: 修复 | docs: 文档 | style: 样式 | refactor: 重构 | perf: 性能

## 10. setData性能优化

**核心原则:**

1. **data只存渲染数据** - 非渲染数据用 `this.xxx`
2. **控制频率** - 合并调用，避免onPageScroll中频繁调用
3. **组件化高频更新** - 倒计时等封装为独立组件
4. **路径更新** - 使用路径语法 `'array[2].msg'` 更新嵌套数据
5. **后台暂停** - onHide时清除定时器，onShow恢复

**避免的做法:**
- 直接 `this.setData(this.data)` 全量更新
- 在onPageScroll中频繁调用setData
- 将非渲染数据存入data

---

## 11. App入口规范

**globalData 必须包含:**
- `userInfo`: 用户信息
- `theme`: 主题色配置
- `districts`: 乡镇列表

**生命周期职责:**
- `onLaunch`: 初始化云开发环境
- `onShow`: 小程序切前台处理
- `onHide`: 小程序切后台处理

---

## 12. TDesign 组件事件规范

### 12.1 常用事件类型

| 组件 | 事件 | 参数类型 |
|------|------|----------|
| t-search | bind:submit | `{ value: string }` |
| t-tabs | bind:change | `{ value: string, label: string }` |
| t-image | bind:error | `CustomEvent` |
| t-swiper | bind:change | `{ current: number, source: string }` |

### 12.2 类型扩展

- 在 `typings/tdesign.d.ts` 中声明TDesign组件事件类型
- 使用 `WechatMiniprogram.CustomEvent<T>` 包装事件参数类型