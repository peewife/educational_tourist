// 课程 Mock 数据

export const courses: ICourse[] = [
  {
    id: '1',
    title: '传承红色基因，淬炼热血青春',
    category: 'red',
    categoryName: '红色教育',
    imageUrl: 'https://images.unsplash.com/photo-1599573860527-7d686f37699e?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1599573860527-7d686f37699e?w=800&q=80',
      'https://images.unsplash.com/photo-1588498860719-74e50834a350?w=800&q=80',
      'https://images.unsplash.com/photo-1596277977826-64c8c7c94541?w=800&q=80'
    ],
    gradeLevel: '初中',
    duration: '2天1晚',
    baseId: '1',
    baseName: '叶剑英纪念园',
    price: 280,
    studentCount: 2400,
    rating: 4.8,
    description: '中国十大元帅之一——叶剑英（1897年04月28日-1986年10月22日），原名叶宜伟，字沧白，广东省梅县人。久经考验的共产主义忠诚战士，坚定的马克思主义者，伟大的无产阶级革命家、政治家、军事家，中国人民解放军的缔造者之一。\n\n叶剑英纪念园是被中央宣传部评为全国爱国主义教育的示范基地；是省委宣传部和省军区政治部、省国防教育办命名的"广东省国防教育基地"。',
    schedule: [
      { time: '第一天 7:30-8:00', title: '学校出发', description: '集合整队，强调纪律，统一乘车前往目的地。' },
      { time: '第一天 9:30-11:30', title: '破冰团建', description: '为了增强同学们的参与度，营造轻松愉快的气氛。' },
      { time: '第一天 14:30-16:00', title: '军事装备体验', description: '现场参观雁山湖1:1歼十原型战斗机、坦克等军工武器。' }
    ],
    feeDescription: '费用包含：交通、餐饮、住宿、保险、导师费等。',
    tags: ['红色教育', '军事体验'],
    status: 'active',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    title: '客家土楼营造技艺体验课程',
    category: 'culture',
    categoryName: '客家文化',
    imageUrl: 'https://images.unsplash.com/photo-1518737683-e12e11a7c30d?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1518737683-e12e11a7c30d?w=800&q=80',
      'https://images.unsplash.com/photo-1580977464273-0d3679f22c15?w=800&q=80',
      'https://images.unsplash.com/photo-1596423736733-4f24c084e723?w=800&q=80'
    ],
    gradeLevel: '小学',
    duration: '1天',
    baseId: '2',
    baseName: '永定土楼景区',
    price: 180,
    studentCount: 1800,
    rating: 4.9,
    description: '深入了解客家土楼的建筑特色和营造技艺，体验传统夯土工艺，感受客家先民的智慧结晶。',
    schedule: [
      { time: '上午 8:30-9:00', title: '集合出发', description: '学校集合，乘车前往永定土楼景区。' },
      { time: '上午 9:30-11:30', title: '土楼参观', description: '参观振成楼、承启楼等代表性土楼建筑。' },
      { time: '下午 14:00-16:00', title: '夯土体验', description: '亲手体验传统夯土工艺，制作土楼模型。' }
    ],
    feeDescription: '费用包含：交通、午餐、门票、材料费、导师费等。',
    tags: ['客家文化', '非遗体验'],
    status: 'active',
    createdAt: '2024-01-10'
  },
  {
    id: '3',
    title: '学习红色苏区精神，做永不褪色的革命者',
    category: 'red',
    categoryName: '红色教育',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
      'https://images.unsplash.com/photo-1599573860527-7d686f37699e?w=800&q=80'
    ],
    gradeLevel: '高中',
    duration: '3天2晚',
    baseId: '3',
    baseName: '中央苏区纪念馆',
    price: 480,
    studentCount: 3200,
    rating: 4.7,
    description: '深入学习中央苏区革命历史，传承苏区精神，培养学生的爱国主义情怀和革命传统教育。',
    schedule: [
      { time: '第一天', title: '抵达与开营', description: '抵达营地，开营仪式，分组团建。' },
      { time: '第二天', title: '红色研学', description: '参观纪念馆，聆听革命故事，重走红军路。' },
      { time: '第三天', title: '总结与返程', description: '分享心得，结营仪式，安全返程。' }
    ],
    feeDescription: '费用包含：交通、餐饮、住宿、门票、保险、导师费等。',
    tags: ['红色教育', '苏区精神'],
    status: 'active',
    createdAt: '2024-01-05'
  },
  {
    id: '4',
    title: '非遗传承·客家山歌学习体验',
    category: 'intangible',
    categoryName: '非遗体验',
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80'
    ],
    gradeLevel: '小学',
    duration: '半天',
    price: 120,
    studentCount: 960,
    rating: 4.6,
    description: '学习客家山歌的基本唱法和历史文化，感受非物质文化遗产的魅力。',
    tags: ['非遗体验', '客家山歌'],
    status: 'active',
    createdAt: '2024-02-01'
  },
  {
    id: '5',
    title: '地质科普·丹霞地貌探秘',
    category: 'science',
    categoryName: '科学探究',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
      'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80'
    ],
    gradeLevel: '初中',
    duration: '1天',
    price: 220,
    studentCount: 1500,
    rating: 4.8,
    description: '探索丹霞地貌的形成原因和地质特征，培养学生的科学探究精神。',
    tags: ['科学探究', '地质科普'],
    status: 'active',
    createdAt: '2024-02-10'
  }
];
