// 基地与机构 Mock 数据

export const bases: IBase[] = [
  {
    id: '1',
    name: '"八一"起义军三河坝战役纪念园',
    level: 'provincial',
    levelName: '省级',
    district: '大埔县',
    address: '广东省梅州市大埔县三河镇八一起义军三河坝战役纪念园',
    imageUrl: 'https://images.unsplash.com/photo-1588498860719-74e50834a350?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1588498860719-74e50834a350?w=800&q=80',
      'https://images.unsplash.com/photo-1599573860527-7d686f37699e?w=800&q=80',
      'https://images.unsplash.com/photo-1596277977826-64c8c7c94541?w=800&q=80'
    ],
    location: { latitude: 24.3521, longitude: 116.6954 },
    phone: '0753-1111111', // Added phone
    description: '三河坝战役纪念园，位于老区大埔县中国历史文化名镇--三河镇汇东村笔枝尾山顶，于1963年12月经省政府批准动工兴建。纪念园包括烈士纪念碑、战役纪念馆、瞻仰平台、石雕门牌坊、朱德铜像、军魂主题雕塑、纪念浮雕文化墙、购物场所、医务室、瞭望塔、将军书画碑林、三河坝战役多媒体展馆布展、八一广场将帅雕塑布展、体验式战壕、游客服务中心等。"八一"起义军三河坝战役烈士纪念碑系全国重点烈士纪念建筑物保护单位，广东省文物保护单位，梅州市和大埔县爱国主义教育基地，广东省红色旅游示范基地。',
    type: '研学基(营)地',
    isRecommended: true,
    status: 'active'
  },
  {
    id: '2',
    name: '五指石中小学研学实践教育营地',
    level: 'provincial',
    levelName: '省级',
    district: '平远县',
    address: '广东省梅州市平远县差干镇五指石景区',
    imageUrl: 'https://images.unsplash.com/photo-1596277977826-64c8c7c94541?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1596277977826-64c8c7c94541?w=800&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80'
    ],
    location: { latitude: 24.5632, longitude: 115.8421 },
    phone: '0753-2222222', // Added phone
    description: '五指石中小学研学实践教育营地依托五指石景区独特的丹霞地貌资源，开展地质科普、自然生态、户外拓展等研学活动。',
    type: '研学基(营)地',
    status: 'active'
  },
  {
    id: '3',
    name: '凤鸣新联研学实践教育基地',
    level: 'provincial',
    levelName: '省级',
    district: '梅江区',
    address: '广东省梅州市梅江区城北镇新联村',
    imageUrl: 'https://images.unsplash.com/photo-1580977464273-0d3679f22c15?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1580977464273-0d3679f22c15?w=800&q=80',
      'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&q=80'
    ],
    location: { latitude: 24.3125, longitude: 116.1234 },
    phone: '0753-3333333', // Added phone
    description: '凤鸣新联研学实践教育基地是集客家文化体验、农耕劳动实践、自然生态教育于一体的综合性研学基地。',
    type: '研学基(营)地',
    status: 'active'
  },
  {
    id: '4',
    name: '叶剑英纪念园',
    level: 'national',
    levelName: '国家级',
    district: '梅县区',
    address: '广东省梅州市梅县区雁洋镇虎形村',
    imageUrl: 'https://images.unsplash.com/photo-1599573860527-7d686f37699e?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1599573860527-7d686f37699e?w=800&q=80',
      'https://images.unsplash.com/photo-1588498860719-74e50834a350?w=800&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80'
    ],
    location: { latitude: 24.2856, longitude: 116.2145 },
    phone: '0753-4444444', // Added phone
    description: '叶剑英纪念园是全国爱国主义教育示范基地，广东省国防教育基地，是缅怀叶剑英元帅丰功伟绩的重要场所。',
    type: '研学基(营)地',
    isRecommended: true,
    status: 'active'
  }
];

export const agencies: IAgency[] = [
  {
    id: '1',
    name: '广东客都文旅有限公司',
    logo: '',
    logoText: '客',
    district: '梅江区',
    address: '广东省梅州市梅江区江南街道彬芳大道中28号客都文旅',
    location: { latitude: 24.2991, longitude: 116.1260 },
    phone: '0753-2888888',
    description: '广东客都文旅有限公司是根据中共梅州市委全面深化改革委员会《关于印发广东金雁工业集团有限公司等市管国有企业组建方案的通知》（梅改委发〔2019〕8号）精神，于2019年11月28日正式挂牌成立，是目前梅州唯一从事文旅产业的市属国有企业。专注于提供现代旅游服务、对接文化旅游资源、拓展航线旅游游融台业务，与社会资本合作投资开发文旅、影视、文创、康养产业，推动文旅项目的投资开发，打造"文化旅游+"全产业链。',
    type: '服务机构',
    status: 'active'
  },
  {
    id: '2',
    name: '梅州市红旅文化发展有限公司',
    logo: '',
    logoText: '红',
    district: '梅江区',
    address: '广东省梅州市梅江区江北文化路',
    location: { latitude: 24.3150, longitude: 116.1170 },
    phone: '0753-2666666',
    description: '梅州市红旅文化发展有限公司专注于红色文化旅游资源的开发与推广，致力于打造高品质的红色研学旅行产品。',
    type: '服务机构',
    status: 'active'
  },
  {
    id: '3',
    name: '梅州市假日国际旅行社有限公司',
    logo: '',
    logoText: '假',
    district: '梅江区',
    address: '广东省梅州市梅江区梅松路',
    location: { latitude: 24.3080, longitude: 116.1200 },
    phone: '0753-2555555',
    description: '梅州市假日国际旅行社有限公司是一家综合性旅行服务企业，提供研学旅行、团队出游等多元化旅游服务。',
    type: '服务机构',
    status: 'active'
  }
];
