// 线路 Mock 数据

export const routes: IRoute[] = [
  {
    id: '1',
    title: '红色星火凝心铸魂，赤色地貌躬行实践',
    category: 'nature',
    categoryName: '自然生态',
    imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80',
      'https://images.unsplash.com/photo-1596277977826-64c8c7c94541?w=800&q=80',
      'https://images.unsplash.com/photo-1588498860719-74e50834a350?w=800&q=80'
    ],
    gradeLevel: ['小学', '初中'],
    duration: '两天',
    agencyId: '1',
    agencyName: '广东客都文旅有限公司',
    baseIds: ['4', '5'],
    baseNames: ['平远县红四军纪念园', '五指石中小学研学实践教育营地'],
    price: 290,
    description: '一、线路介绍\n本线路旨在通过重走红军路，让学生亲身体验革命先辈的艰辛与伟大，传承红色基因。结合五指石地质地貌，开展自然科学考察，实现红色教育与自然科普的有机结合。',
    schedule: [
      { time: '第一天 上午', title: '出发与抵达', description: '学校集合出发，抵达平远县红四军纪念园。' },
      { time: '第一天 下午', title: '红色研学', description: '参观纪念园，聆听革命故事，缅怀革命先烈。' },
      { time: '第二天 上午', title: '地质探秘', description: '前往五指石，探索丹霞地貌的奥秘。' },
      { time: '第二天 下午', title: '总结返程', description: '分享心得体会，安全返回学校。' }
    ],
    feeDescription: '费用包含：交通、餐饮、住宿、门票、保险、导师费等。',
    status: 'active',
    createdAt: '2024-01-20'
  },
  {
    id: '2',
    title: '循迹而行跟党走，红脉乡韵铸青春',
    category: 'red',
    categoryName: '红色研学',
    imageUrl: 'https://images.unsplash.com/photo-1596423736733-4f24c084e723?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1596423736733-4f24c084e723?w=800&q=80',
      'https://images.unsplash.com/photo-1599573860527-7d686f37699e?w=800&q=80'
    ],
    gradeLevel: ['初中'],
    duration: '一天',
    agencyId: '1',
    agencyName: '广东客都文旅有限公司',
    price: 180,
    description: '追寻红色足迹，感受革命精神，在行走中学习党史，在实践中传承红色基因。',
    status: 'active',
    createdAt: '2024-01-18'
  },
  {
    id: '3',
    title: '探秘客家土楼，传承非遗文化',
    category: 'culture',
    categoryName: '文化遗产',
    imageUrl: 'https://images.unsplash.com/photo-1518737683-e12e11a7c30d?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1518737683-e12e11a7c30d?w=800&q=80',
      'https://images.unsplash.com/photo-1580977464273-0d3679f22c15?w=800&q=80',
      'https://images.unsplash.com/photo-1596423736733-4f24c084e723?w=800&q=80'
    ],
    gradeLevel: ['全学段'],
    duration: '三天',
    agencyId: '2',
    agencyName: '梅州市红旅文化发展有限公司',
    price: 580,
    description: '深入永定土楼群，探索世界文化遗产的建筑奥秘，体验客家非遗文化。',
    status: 'active',
    createdAt: '2024-01-15'
  },
  {
    id: '4',
    title: '劳动最光荣·农耕文化体验之旅',
    category: 'labor',
    categoryName: '劳动实践',
    imageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&q=80'
    ],
    gradeLevel: ['小学', '初中'],
    duration: '一天',
    price: 150,
    description: '体验传统农耕文化，感受劳动的乐趣与价值，培养学生的劳动意识。',
    status: 'active',
    createdAt: '2024-02-01'
  },
  {
    id: '5',
    title: '地质奇观·丹霞地貌科考之旅',
    category: 'geology',
    categoryName: '地质科普',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
      'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80'
    ],
    gradeLevel: ['初中', '高中'],
    duration: '两天',
    price: 320,
    description: '探索丹霞地貌的形成与演变，开展地质科学考察，培养科学探究精神。',
    status: 'active',
    createdAt: '2024-02-05'
  }
];
