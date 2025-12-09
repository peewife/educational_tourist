// 首页 Mock 数据

// Banner 数据
export const banners: IBanner[] = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80',
    title: '探索世界文化遗产永定土楼',
    subtitle: '今日推荐',
    linkType: 'course',
    linkId: '1'
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1599573860527-7d686f37699e?w=800&q=80',
    title: '传承红色基因，淬炼热血青春',
    subtitle: '热门课程',
    linkType: 'course',
    linkId: '2'
  },
  {
    id: '3',
    imageUrl: 'https://images.unsplash.com/photo-1596423736733-4f24c084e723?w=800&q=80',
    title: '循迹而行跟党走，红脉乡韵铸青春',
    subtitle: '精品线路',
    linkType: 'route',
    linkId: '1'
  }
];

// 功能入口数据
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

// 乡镇街道数据
export const districts: string[] = [
  '凤城街道',
  '坎市镇',
  '下洋镇',
  '湖坑镇',
  '高陂镇',
  '抚市镇',
  '湖雷镇',
  '培丰镇'
];
