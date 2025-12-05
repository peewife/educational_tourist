import React, { useState, useEffect } from 'react';
import { 
  Home, BookOpen, Map, Building2, User, Search, 
  MessageSquare, ChevronRight, ChevronLeft, ChevronDown, 
  MapPin, Star, MoreHorizontal, Minus, Circle, CheckCircle2,
  FileText, Users, Award, HelpCircle, Settings, LogOut, Phone,
  Flag, Heart, Layers, GraduationCap, Compass, LayoutGrid,
  Clock, Calendar, Navigation, Share, Headphones,
  Construction, Map as MapIcon, Landmark
} from 'lucide-react';

// --- 永定土楼主题风格配置 ---
const THEME = {
    bg: "bg-white",
    textMain: "text-gray-900",
    textSub: "text-gray-500",
    accent: "text-[#C8102E]", // 客家红色
    accentBg: "bg-[#C8102E]",
    border: "border-gray-200",
    serif: "font-serif", 
};

// --- 组件：模拟小程序右上角胶囊 ---
const Capsule = ({ dark = false }) => (
  <div className={`flex items-center space-x-3 px-3 py-1.5 rounded-full border border-gray-200 bg-white/50 backdrop-blur-md ml-auto mr-4`}>
    <MoreHorizontal size={18} className="text-gray-900" />
    <div className="w-[1px] h-4 bg-gray-300"></div>
    <div className="relative flex items-center justify-center w-5 h-5 rounded-full border-2 border-gray-900">
        <div className="w-1.5 h-1.5 bg-gray-900 rounded-full"></div>
    </div>
  </div>
);

// --- 组件：通用头部 ---
const Header = ({ title, showBack, onBack, rightIcon, transparent = false }) => (
  <div className={`sticky top-0 z-50 w-full ${transparent ? 'bg-transparent' : 'bg-white/95 backdrop-blur-sm border-b border-transparent'} transition-colors duration-300`}>
    <div className="h-10 w-full"></div> 
    <div className="flex items-center justify-between h-12 px-4 pb-1">
      <div className="flex items-center flex-1">
        {showBack && (
          <button onClick={onBack} className="p-2 -ml-3 mr-1 text-gray-900">
            <ChevronLeft size={26} strokeWidth={1.5} />
          </button>
        )}
        <h1 className={`text-[20px] ${THEME.serif} font-bold text-gray-900 truncate tracking-wide ${showBack ? '' : 'ml-0'}`}>
          {title}
        </h1>
      </div>
      <Capsule />
    </div>
  </div>
);

// --- 模拟数据 ---
const BANNER_IMAGE = "https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"; 
const AVATAR_IMAGE = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80";

const MENU_ITEMS = [
  { name: '资讯', icon: <FileText size={24} strokeWidth={1.5} /> },
  { name: '课程', icon: <BookOpen size={24} strokeWidth={1.5} /> },
  { name: '线路', icon: <MapPin size={24} strokeWidth={1.5} /> },
  { name: '基(营)地', icon: <Building2 size={24} strokeWidth={1.5} /> },
  { name: '机构', icon: <LayoutGrid size={24} strokeWidth={1.5} /> },
  { name: '精品线路', icon: <Compass size={24} strokeWidth={1.5} /> },
  { name: '研学导师', icon: <GraduationCap size={24} strokeWidth={1.5} />, action: 'expert' },
  { name: '公示', icon: <Award size={24} strokeWidth={1.5} /> },
  { name: '服务', icon: <Heart size={24} strokeWidth={1.5} /> },
];

const DISTRICTS = ['凤城街道', '坎市镇', '下洋镇', '湖坑镇', '高陂镇', '抚市镇', '湖雷镇', '培丰镇'];

// 详细课程数据
const COURSES = [
  { 
    id: 1, 
    title: '传承红色基因，淬炼热血青春', 
    tags: ['初中', '2天1晚'], 
    image: 'https://images.unsplash.com/photo-1599573860527-7d686f37699e?w=800&q=80',
    base: '叶剑英纪念园',
    price: 280,
    desc: `中国十大元帅之一——叶剑英（1897年04月28日-1986年10月22日），原名叶宜伟，字沧白，广东省梅县人。久经考验的共产主义忠诚战士，坚定的马克思主义者，伟大的无产阶级革命家、政治家、军事家，中国人民解放军的缔造者之一。\n\n叶剑英纪念园是被中央宣传部评为全国爱国主义教育的示范基地；是省委宣传部和省军区政治部、省国防教育办命名的“广东省国防教育基地”。`,
    schedule: [
      { time: '第一天 7:30-8:00', title: '学校出发', desc: '集合整队，强调纪律，统一乘车前往目的地。' },
      { time: '第一天 9:30-11:30', title: '破冰团建', desc: '为了增强同学们的参与度，营造轻松愉快的气氛。' },
      { time: '第一天 14:30-16:00', title: '军事装备体验', desc: '现场参观雁山湖1:1歼十原型战斗机、坦克等军工武器。' },
    ]
  },
  { id: 2, title: '客家土楼营造技艺体验课程', tags: ['小学', '初中', '1天'], image: 'https://images.unsplash.com/photo-1518737683-e12e11a7c30d?w=800&q=80', base: '福建土楼景区', price: 150, desc: '...', schedule: [] },
  { id: 3, title: '学习红色苏区精神，做永不褪色的革命者', tags: ['初中', '高中', '2天1晚'], image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80', base: '古田会议会址', price: 320, desc: '...', schedule: [] },
];

// 详细线路数据
const ROUTES = [
  { 
    id: 1, 
    title: '红色星火凝心铸魂，赤色地貌躬行实践', 
    tags: ['小学', '初中', '两天'], 
    cat: '自然生态', 
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80',
    company: '广东客都文旅有限公司',
    companyLogo: '客',
    price: 290,
    bases: ['平远县红四军纪念园', '五指石中小学研学实践教育营地'],
    desc: `一、线路介绍...`,
    schedule: []
  },
  { id: 2, title: '循迹而行跟党走，红脉乡韵铸青春', tags: ['初中', '一天'], cat: '红色研学', image: 'https://images.unsplash.com/photo-1596423736733-4f24c084e723?w=800&q=80', company: '客都文旅', companyLogo: '客', price: 180, bases: [], desc: '...', schedule: [] },
];

const BASES = [
  { 
      id: 1, 
      title: '“八一”起义军三河坝战役纪念园', 
      level: '省级', 
      loc: '大埔县', 
      address: '广东省梅州市大埔县三河镇八一起义军三河坝战役纪念园',
      img: 'https://images.unsplash.com/photo-1588498860719-74e50834a350?w=800&q=80',
      desc: `三河坝战役纪念园，位于老区大埔县中国历史文化名镇--三河镇汇东村笔枝尾山顶，于1963年12月经省政府批准动工兴建。纪念园包括烈士纪念碑、战役纪念馆、瞻仰平台、石雕门牌坊、朱德铜像、军魂主题雕塑、纪念浮雕文化墙、购物场所、医务室、瞭望塔、将军书画碑林、三河坝战役多媒体展馆布展、八一广场将帅雕塑布展、体验式战壕、游客服务中心等。“八一”起义军三河坝战役烈士纪念碑系全国重点烈士纪念建筑物保护单位，广东省文物保护单位，梅州市和大埔县爱国主义教育基地，广东省红色旅游示范基地。`
  },
  { id: 2, title: '五指石中小学研学实践教育营地', level: '省级', loc: '平远县', address: '广东省梅州市平远县五指石风景区', img: 'https://images.unsplash.com/photo-1596277977826-64c8c7c94541?w=800&q=80', desc: '...' },
  { id: 3, title: '凤鸣新联研学实践教育基地', level: '省级', loc: '梅江区', address: '广东省梅州市梅江区西阳镇', img: 'https://images.unsplash.com/photo-1580977464273-0d3679f22c15?w=800&q=80', desc: '...' },
];

const AGENCIES = [
  { 
      id: 1, 
      title: '广东客都文旅有限公司', 
      loc: '梅江区', 
      logo: '客',
      address: '广东省梅州市梅江区江南街道彬芳大道中28号客都文旅',
      desc: `广东客都文旅有限公司是根据中共梅州市委全面深化改革委员会《关于印发广东金雁工业集团有限公司等市管国有企业组建方案的通知》（梅改委发〔2019〕8号）精神，于2019年11月28日正式挂牌成立，是目前梅州唯一从事文旅产业的市属国有企业。专注于提供现代旅游服务、对接文化旅游资源、拓展航线旅游游融台业务，与社会资本合作投资开发文旅、影视、文创、康养产业，推动文旅项目的投资开发，打造“文化旅游+”全产业链。`
  },
  { id: 2, title: '梅州市红旅文化发展有限公司', loc: '梅江区', logo: '红', address: '梅州市梅江区...', desc: '...' },
  { id: 3, title: '梅州市假日国际旅行社有限公司', loc: '梅江区', logo: '假', address: '梅州市梅江区...', desc: '...' },
];

const EXPERTS = [
  { id: 1, name: '谢稳矩', role: '研学实践教学指导师', level: '高级', code: 'YDX: 202401001', date: '2028-12-31', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80' },
  { id: 2, name: '张慧敏', role: '研学实践教学指导师', level: '中级', code: '闽研导: 202305012', date: '2027-05-01', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80' },
];

const FUNCTIONS = [
  { name: '投诉建议', icon: <MessageSquare size={24} strokeWidth={1.5} /> },
  { name: '实践活动', icon: <Award size={24} strokeWidth={1.5} /> },
  { name: '活动报名', icon: <User size={24} strokeWidth={1.5} /> },
  { name: '申请导师', icon: <Users size={24} strokeWidth={1.5} /> },
];

// --- 新增：研学基地详情页组件 BaseDetailScreen ---
const BaseDetailScreen = ({ base, onBack }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="bg-[#F5F7FA] min-h-screen pb-safe">
            <Header title={base.title} showBack={true} onBack={onBack} />
            
            {/* 顶部大图 */}
            <div className="relative w-full aspect-[16/9]">
                <img src={base.img} className="w-full h-full object-cover" alt={base.title} />
                <div className="absolute top-4 right-4">
                    <button className="bg-[#36C197] p-2 rounded-lg text-white shadow-md">
                        <MapIcon size={20} />
                    </button>
                </div>
            </div>

            {/* 核心信息 */}
            <div className="bg-white p-5 mb-3">
                <div className="flex space-x-3 mb-3">
                    <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={base.img} className="w-full h-full object-cover" alt="" />
                    </div>
                    <div>
                        <h1 className={`text-[18px] font-bold text-gray-900 leading-snug ${THEME.serif}`}>
                            {base.title}
                        </h1>
                        <p className="text-gray-500 text-[12px] mt-1">机构类型：研学基(营)地</p>
                    </div>
                </div>
                <div className="flex items-start text-[13px] text-gray-500 pt-2 border-t border-gray-50 mt-2">
                    <MapPin size={14} className="mr-1 mt-0.5 flex-shrink-0" />
                    <span className="flex-1 leading-relaxed">{base.address}</span>
                    <span className="text-[#C8102E] font-bold ml-2">导航</span>
                </div>
            </div>

            {/* 简介 */}
            <div className="bg-white p-5 mb-3">
                <div className={`text-[14px] text-gray-600 leading-relaxed text-justify ${expanded ? '' : 'line-clamp-6'}`}>
                    {base.desc}
                </div>
                <button 
                    onClick={() => setExpanded(!expanded)}
                    className="w-full text-center text-gray-400 text-[12px] mt-3 flex items-center justify-center"
                >
                    {expanded ? '收起' : '展开'} <ChevronDown size={14} className={`ml-1 transform ${expanded ? 'rotate-180' : ''}`} />
                </button>
            </div>

            {/* 研学课程 */}
            <div className="bg-white p-5 pb-10">
                <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-[16px] font-bold text-[#4A90E2] ${THEME.serif}`}>研学课程</h3>
                    <span className="text-xs text-gray-400">更多 &gt;</span>
                </div>
                <div className="space-y-4">
                    {COURSES.slice(0, 2).map(course => (
                        <div key={course.id} className="flex space-x-3">
                            <div className="w-28 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                                <img src={course.image} className="w-full h-full object-cover" alt="" />
                            </div>
                            <div className="flex-1 py-0.5 flex flex-col justify-between">
                                <h4 className="text-[14px] font-bold text-gray-900 leading-snug line-clamp-2">{course.title}</h4>
                                <div className="flex space-x-2">
                                    {course.tags.slice(0, 2).map(t => (
                                        <span key={t} className="bg-gray-100 text-gray-500 text-[10px] px-1.5 py-0.5 rounded">{t}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- 新增：服务机构详情页组件 AgencyDetailScreen ---
const AgencyDetailScreen = ({ agency, onBack }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="bg-[#F5F7FA] min-h-screen pb-safe">
            <Header title={agency.title} showBack={true} onBack={onBack} />
            
            {/* 顶部 Logo 展示区 (模仿截图中的红色大Logo风格) */}
            <div className="bg-white p-6 flex justify-center border-b border-gray-100">
                <div className="w-full aspect-[2/1] flex items-center justify-center">
                    {/* 使用特定的 Logo 展示方式，如果 agency.logo 是字符则显示字符，如果是图片则显示图片 */}
                    <div className="w-40 h-40 border-4 border-[#C8102E] flex flex-col items-center justify-center p-2 text-[#C8102E]">
                        <div className="text-6xl font-bold grid grid-cols-2 gap-1 leading-none">
                            <span>客</span><span>都</span>
                            <span>文</span><span>旅</span>
                        </div>
                        <div className="text-[8px] tracking-widest mt-1 font-bold uppercase text-center w-full border-t border-[#C8102E] pt-1">
                            KEDU CULTURE & TOURISM
                        </div>
                    </div>
                </div>
            </div>

            {/* 核心信息 */}
            <div className="bg-white p-5 mb-3">
                <div className="flex space-x-3 mb-2">
                    <div className="w-12 h-12 border border-red-100 flex items-center justify-center text-[#C8102E] font-bold text-xl rounded">
                        {agency.logo}
                    </div>
                    <div className="flex-1">
                        <h1 className={`text-[16px] font-bold text-gray-900 leading-snug ${THEME.serif}`}>
                            {agency.title}
                        </h1>
                        <p className="text-gray-500 text-[12px] mt-1">机构类型：服务机构</p>
                    </div>
                    <div className="text-gray-400 text-[12px] flex items-center">
                        更多信息 <ChevronRight size={12} />
                    </div>
                </div>
                <div className="h-[1px] bg-gray-50 my-3"></div>
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-[14px] mb-1">{agency.title}</h3>
                        <p className="text-[12px] text-gray-500 flex items-start leading-snug">
                            <span className="text-[#C8102E] mr-1">◆</span> {agency.address}
                        </p>
                    </div>
                    <div className="flex items-center space-x-3 ml-4 mt-2">
                        <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600">
                            <Headphones size={16} />
                        </button>
                        <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600">
                            <Navigation size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* 简介 */}
            <div className="bg-white p-5 mb-3">
                <div className={`text-[14px] text-gray-600 leading-relaxed text-justify ${expanded ? '' : 'line-clamp-6'}`}>
                    {agency.desc}
                </div>
                <button 
                    onClick={() => setExpanded(!expanded)}
                    className="w-full text-center text-gray-400 text-[12px] mt-3 flex items-center justify-center"
                >
                    {expanded ? '隐藏' : '展开'} <ChevronDown size={14} className={`ml-1 transform ${expanded ? 'rotate-180' : ''}`} />
                </button>
            </div>

            {/* 研学线路 */}
            <div className="bg-white p-5 mb-3">
                <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-2">
                    <h3 className={`text-[15px] font-bold text-[#4A90E2] ${THEME.serif}`}>研学线路</h3>
                    <span className="text-xs text-gray-400">更多 &gt;</span>
                </div>
                <div className="space-y-4">
                    {ROUTES.slice(0, 2).map(route => (
                        <div key={route.id} className="flex space-x-3">
                            <div className="flex-1 py-0.5 flex flex-col justify-between">
                                <h4 className="text-[14px] font-bold text-gray-900 leading-snug line-clamp-2">{route.title}</h4>
                                <div className="flex space-x-2 mt-2">
                                    {route.tags.slice(0, 2).map(t => (
                                        <span key={t} className="bg-gray-100 text-gray-500 text-[10px] px-1.5 py-0.5 rounded">{t}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="w-28 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                                <img src={route.image} className="w-full h-full object-cover" alt="" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 研学导师 */}
            <div className="bg-white p-5 pb-10">
                <h3 className={`text-[15px] font-bold text-[#4A90E2] ${THEME.serif} mb-4`}>研学导师</h3>
                <div className="grid grid-cols-3 gap-4">
                    {EXPERTS.slice(0, 1).map(expert => (
                        <div key={expert.id} className="flex flex-col items-center">
                            <div className="w-full aspect-[3/4] bg-gray-200 mb-2 overflow-hidden rounded">
                                <img src={expert.img} className="w-full h-full object-cover" alt="" />
                            </div>
                            <span className="text-[13px] font-bold text-gray-900">{expert.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- 线路详情页组件 RouteDetailScreen ---
const RouteDetailScreen = ({ route, onBack }) => {
    const [activeTab, setActiveTab] = useState('detail'); 

    // Tabs 配置
    const tabs = [
        { id: 'detail', label: '线路详情' },
        { id: 'schedule', label: '线路安排' },
        { id: 'fees', label: '费用明细' },
    ];

    return (
        <div className="bg-[#F5F7FA] min-h-screen pb-safe">
            {/* 顶部导航 */}
            <Header title="线路详情" showBack={true} onBack={onBack} />

            {/* 顶部大图 */}
            <div className="relative w-full aspect-[16/9]">
                <img src={route.image} className="w-full h-full object-cover" alt={route.title} />
            </div>

            {/* 核心信息卡片 */}
            <div className="bg-white p-5 mb-3">
                <h1 className={`text-[20px] font-bold text-gray-900 leading-snug mb-4 ${THEME.serif}`}>
                    {route.title}
                </h1>
                <div className="space-y-2.5">
                    <div className="flex items-start text-[13px]">
                        <span className="text-gray-500 w-20 flex-shrink-0">适用学段：</span>
                        <div className="flex gap-2">
                            {route.tags.slice(0, 2).map((t, i) => (
                                <span key={i} className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-sm">{t}</span>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center text-[13px]">
                        <span className="text-gray-500 w-20 flex-shrink-0">行程天数：</span>
                        <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-sm">{route.tags[2] || '两天'}</span>
                    </div>
                    <div className="flex items-start text-[13px]">
                        <span className="text-gray-500 w-20 flex-shrink-0 pt-0.5">相关基(营)地：</span>
                        <div className="flex flex-col gap-1.5">
                            {route.bases && route.bases.map((base, i) => (
                                <span key={i} className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-sm w-fit">{base}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* 公司信息卡片 */}
            <div className="bg-white p-4 mb-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded bg-[#C8102E]/10 flex items-center justify-center text-[#C8102E] font-bold text-lg border border-[#C8102E]/20">
                        {route.companyLogo}
                    </div>
                    <div>
                        <h3 className="text-[15px] font-bold text-gray-900">{route.company}</h3>
                        <p className="text-[11px] text-gray-400 mt-0.5 max-w-[200px] truncate">广东省梅州市梅江区江南街道...</p>
                    </div>
                </div>
                <div className="flex items-center space-x-3 text-gray-400">
                    <Headphones size={20} strokeWidth={1.5} />
                    <Navigation size={20} strokeWidth={1.5} />
                </div>
            </div>

            {/* 详情内容区域 */}
            <div className="bg-white min-h-[400px] pb-24">
                {/* Tabs */}
                <div className="flex border-b border-gray-100 sticky top-12 bg-white z-20">
                    {tabs.map(tab => (
                        <button 
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 py-4 text-[14px] font-medium relative ${activeTab === tab.id ? 'text-[#FF6B00]' : 'text-gray-400'}`}
                        >
                            {tab.label}
                            {activeTab === tab.id && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-[#FF6B00]"></span>}
                        </button>
                    ))}
                </div>

                {/* 内容 */}
                <div className="p-5">
                    {activeTab === 'detail' && (
                        <div className="text-[14px] text-gray-600 leading-relaxed whitespace-pre-wrap font-light">
                            {route.desc}
                        </div>
                    )}

                    {activeTab === 'schedule' && (
                        <div className="pl-4 border-l border-blue-100 ml-3 space-y-8 py-2">
                            {route.schedule && route.schedule.length > 0 ? route.schedule.map((item, i) => (
                                <div key={i} className="relative">
                                    {/* 蓝色圆点 */}
                                    <div className="absolute -left-[23px] top-1 w-3.5 h-3.5 rounded-full bg-[#5AC8FA] border-2 border-white shadow-sm"></div>
                                    <h4 className="text-[14px] font-bold text-[#007AFF] mb-1">{item.time} {item.title}</h4>
                                    {item.desc && <p className="text-[13px] text-gray-500 mt-1 leading-relaxed">{item.desc}</p>}
                                </div>
                            )) : (
                                <div className="text-center text-gray-400 py-10">暂无行程数据</div>
                            )}
                        </div>
                    )}

                    {activeTab === 'fees' && (
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <span className="text-gray-600 text-[14px]">研学费用：</span>
                                <span className="text-[#FF4D4F] text-xl font-bold">{route.price}元/人(参考价)</span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-gray-600 text-[14px]">费用说明：</span>
                                <span className="text-gray-400 text-[14px] ml-2">--</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* 底部悬浮栏 */}
            <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 px-4 py-3 flex items-center justify-between z-50 pb-safe">
                 <div className="flex flex-col">
                     <span className="text-[10px] text-gray-400">参考价</span>
                     <div className="text-[#FF4D4F] font-bold">
                         <span className="text-sm">￥</span>
                         <span className="text-xl">{route.price}</span>
                     </div>
                 </div>
                 <div className="flex space-x-3">
                     <button className="px-6 py-2 rounded-full border border-gray-200 text-gray-600 text-sm font-medium">电话咨询</button>
                     <button className="px-6 py-2 rounded-full bg-[#FF6B00] text-white text-sm font-medium shadow-md shadow-orange-100">立即报名</button>
                 </div>
            </div>
        </div>
    );
};

// --- 详情页组件: CourseDetailScreen (保持不变) ---
const CourseDetailScreen = ({ course, onBack }) => {
    const [activeTab, setActiveTab] = useState('schedule'); 

    const tabs = [
        { id: 'detail', label: '课程详情' },
        { id: 'schedule', label: '课程安排' },
        { id: 'fees', label: '费用明细' },
    ];

    return (
        <div className="bg-white min-h-screen pb-safe">
            <Header title="课程详情" showBack={true} onBack={onBack} />
            <div className="pb-24">
                <div className="relative w-full aspect-[16/9] bg-gray-100">
                    <img src={course.image} className="w-full h-full object-cover" alt={course.title} />
                </div>
                <div className="px-5 py-6">
                    <h1 className={`text-[22px] ${THEME.serif} font-bold text-gray-900 leading-snug mb-4`}>{course.title}</h1>
                    <div className="space-y-2 text-[13px] text-gray-500 font-light">
                         <div className="flex items-center"><span className="w-20 text-gray-400">适用学段:</span><span className="text-gray-900 bg-gray-100 px-2 py-0.5 rounded-sm">{course.tags[0]}</span></div>
                         <div className="flex items-center"><span className="w-20 text-gray-400">课程时长:</span><span className="text-gray-900 bg-gray-100 px-2 py-0.5 rounded-sm">{course.tags[1]}</span></div>
                         <div className="flex items-center"><span className="w-20 text-gray-400">相关基地:</span><span className="text-gray-900 bg-gray-100 px-2 py-0.5 rounded-sm">{course.base}</span></div>
                    </div>
                </div>
                <div className="h-2 bg-gray-50"></div>
                <div className="sticky top-[48px] bg-white z-30 border-b border-gray-100 px-2">
                    <div className="flex justify-around">
                        {tabs.map(tab => (
                            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`py-4 text-[14px] font-medium relative transition-colors ${activeTab === tab.id ? 'text-[#C8102E]' : 'text-gray-400'}`}>{tab.label}{activeTab === tab.id && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-[#C8102E]"></span>}</button>
                        ))}
                    </div>
                </div>
                <div className="px-5 py-6 min-h-[300px]">
                    {activeTab === 'detail' && <div className="text-gray-600 text-[14px] leading-relaxed space-y-4 text-justify font-light">{course.desc && course.desc.split('\n').map((p, i) => <p key={i}>{p}</p>)}</div>}
                    {activeTab === 'schedule' && <div className="relative border-l border-gray-200 ml-2 pl-6 space-y-8 py-2">{(course.schedule && course.schedule.length > 0) ? course.schedule.map((item, i) => (<div key={i} className="relative"><div className="absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full bg-[#C8102E] ring-4 ring-white"></div><h4 className="text-[14px] font-bold text-[#C8102E] mb-1 font-mono">{item.time}</h4><h5 className={`text-[16px] font-bold text-gray-900 mb-2 ${THEME.serif}`}>{item.title}</h5><p className="text-[13px] text-gray-500 leading-relaxed font-light">{item.desc}</p></div>)) : <div className="text-center text-gray-400 py-10">暂无具体安排信息</div>}</div>}
                    {activeTab === 'fees' && <div className="space-y-4"><div className="flex items-baseline"><span className="text-gray-500 text-sm mr-2">研学费用:</span><span className="text-2xl font-bold text-[#C8102E] font-mono">{course.price}</span><span className="text-gray-900 text-sm ml-1">元/人</span></div></div>}
                </div>
            </div>
            <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 px-4 py-3 flex items-center justify-between z-50 pb-safe">
                 <div className="flex space-x-6 px-2"><button className="flex flex-col items-center text-gray-400"><Share size={20}/><span className="text-[10px]">分享</span></button><button className="flex flex-col items-center text-gray-400"><Heart size={20}/><span className="text-[10px]">收藏</span></button></div>
                 <button className="bg-[#C8102E] text-white px-8 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-red-100">立即报名</button>
            </div>
        </div>
    );
};

// --- 提取出来的 BasesScreen 组件 (完整) ---
const BasesScreen = ({ onBaseClick, onAgencyClick }) => {
    const [subTab, setSubTab] = useState('base'); 
    const TabButton = ({ active, label, onClick }) => (
        <button onClick={onClick} className={`pb-2 text-[17px] font-medium transition-all duration-300 relative ${active ? 'text-gray-900' : 'text-gray-400'}`}>
            <span className={active ? THEME.serif : ''}>{label}</span>{active && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black"></span>}
        </button>
    );
    return (
        <div className="bg-white min-h-screen pb-20">
            <Header title="基(营)地" />
            <div className="bg-white sticky top-12 z-40 px-4 pt-2 border-b border-gray-100"><div className="flex space-x-8"><TabButton active={subTab === 'base'} label="研学基(营)地" onClick={() => setSubTab('base')} /><TabButton active={subTab === 'agency'} label="服务机构" onClick={() => setSubTab('agency')} /></div></div>
            <div className="px-4 py-4 sticky top-[105px] z-30 bg-white/95 backdrop-blur-md"><div className="bg-gray-50 rounded-lg h-10 flex items-center px-4 text-gray-400 border border-gray-100"><Search size={18} className="mr-2 text-gray-400" /><span className="text-[14px] font-light">Search {subTab === 'base' ? 'Bases' : 'Agencies'}</span></div></div>
            <div className="px-4 py-2 space-y-6">
                {subTab === 'base' ? BASES.map(item => (<div key={item.id} className="group cursor-pointer" onClick={() => onBaseClick(item)}><div className="relative aspect-[3/2] overflow-hidden rounded-sm mb-3"><img src={item.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="" /><div className="absolute top-2 left-2 bg-black text-white text-[10px] px-2 py-1 uppercase tracking-wider font-bold">Recommended</div></div><div className="flex justify-between items-start"><div><h3 className={`text-[18px] ${THEME.serif} font-bold text-gray-900 leading-tight`}>{item.title}</h3><p className="text-gray-500 text-[13px] mt-1 flex items-center"><MapPin size={12} className="mr-1" /> {item.loc} · {item.level}</p></div></div><div className="h-[1px] bg-gray-100 w-full mt-6"></div></div>)) : AGENCIES.map(item => (<div key={item.id} className="flex items-center space-x-4 py-4 border-b border-gray-100 last:border-none cursor-pointer" onClick={() => onAgencyClick(item)}><div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center border border-gray-200 flex-shrink-0"><span className={`text-black ${THEME.serif} font-bold text-2xl`}>{item.logo}</span></div><div className="flex-1 min-w-0"><h3 className={`text-[16px] ${THEME.serif} font-bold text-gray-900 truncate`}>{item.title}</h3><span className="text-[12px] text-gray-400 mt-1 block uppercase tracking-wide">{item.loc}</span></div><div className="flex-shrink-0"><button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-900"><ChevronRight size={16} /></button></div></div>))}
            </div>
        </div>
    );
};

// --- 主要应用组件 ---

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [view, setView] = useState('main'); 
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState(null); 
  const [selectedBase, setSelectedBase] = useState(null); // 新增
  const [selectedAgency, setSelectedAgency] = useState(null); // 新增

  const goToExperts = () => setView('experts');
  const goBack = () => {
      setView('main');
      setSelectedCourse(null);
      setSelectedRoute(null);
      setSelectedBase(null);
      setSelectedAgency(null);
  };
  
  const goToCourseDetail = (course) => {
      setSelectedCourse(course);
      setView('course_detail');
  };

  const goToRouteDetail = (route) => {
      setSelectedRoute(route);
      setView('route_detail');
  };

  // 新增跳转
  const goToBaseDetail = (base) => {
      setSelectedBase(base);
      setView('base_detail');
  };

  const goToAgencyDetail = (agency) => {
      setSelectedAgency(agency);
      setView('agency_detail');
  };

  const renderTabBar = () => {
    if (view !== 'main') return null;
    const tabs = [
      { id: 'home', label: '首页', icon: Home },
      { id: 'courses', label: '课程', icon: BookOpen },
      { id: 'routes', label: '线路', icon: MapPin },
      { id: 'bases', label: '基地', icon: Building2 },
      { id: 'profile', label: '我的', icon: User },
    ];
    return (
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 pb-safe z-50">
        <div className="flex justify-around items-center h-16">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex flex-col items-center justify-center space-y-1 w-full h-full ${isActive ? 'text-black' : 'text-gray-400'}`}>
                <Icon size={24} strokeWidth={isActive ? 2 : 1.5} /><span className={`text-[10px] tracking-wide ${isActive ? 'font-medium' : ''}`}>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  // 1. 首页 (完整)
  const renderHome = () => (
    <div className="bg-white min-h-screen pb-24">
      <div className="bg-white pt-12 px-4 pb-4 sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-50">
         <div className="flex items-center justify-between mb-2"><span className={`text-[26px] ${THEME.serif} font-bold text-gray-900 tracking-tight`}>永定研学</span><Capsule dark={false} /></div>
         <div className="relative"><input type="text" placeholder="搜索课程、线路、基地..." className="w-full bg-gray-100 h-10 px-10 rounded-lg text-sm outline-none text-gray-900 placeholder-gray-500 font-light" /><Search size={16} className="absolute left-3 top-3 text-gray-500" /></div>
      </div>
      <div className="px-4 space-y-8 mt-4">
        <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden shadow-sm cursor-pointer" onClick={() => goToCourseDetail(COURSES[0])}>
            <img src={BANNER_IMAGE} alt="Banner" className="w-full h-full object-cover grayscale-[20%] contrast-125" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6"><span className="text-white/80 text-xs uppercase tracking-[0.2em] mb-2 font-medium">今日推荐</span><h2 className={`text-white text-3xl ${THEME.serif} font-bold leading-tight`}>探索世界文化遗产永定土楼</h2><button className="mt-4 bg-[#C8102E] text-white px-6 py-3 rounded-full text-sm font-bold w-fit hover:bg-red-700 transition-colors">开始探索</button></div>
        </div>
        <div className="pt-2"><div className="flex items-center justify-between mb-4"><h3 className={`text-xl ${THEME.serif} font-bold text-gray-900`}>功能入口</h3></div><div className="grid grid-cols-5 gap-y-8 gap-x-2">{MENU_ITEMS.map((item, idx) => (<button key={idx} className="flex flex-col items-center space-y-2 group" onClick={() => item.action === 'expert' ? goToExperts() : null}><div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-900 group-hover:bg-black group-hover:text-white transition-all duration-300">{React.cloneElement(item.icon, { size: 20 })}</div><span className="text-[10px] text-gray-500 font-medium uppercase tracking-wide group-hover:text-black">{item.name}</span></button>))}</div></div>
        <div className="border-t border-gray-100 pt-6"><h3 className={`text-xl ${THEME.serif} font-bold text-gray-900 mb-4`}>乡镇街道</h3><div className="flex flex-wrap gap-2">{DISTRICTS.map((d, i) => (<button key={i} className="px-4 py-2 border border-gray-300 rounded-full text-[13px] text-gray-700 hover:border-black hover:bg-black hover:text-white transition-all duration-300">{d}</button>))}</div></div>
        <div className="pb-8">
             <div className="flex items-center justify-between mb-4 border-b border-black pb-2"><h3 className={`text-xl ${THEME.serif} font-bold text-gray-900`}>热门课程</h3><span className="text-xs font-bold text-[#C8102E] uppercase tracking-wider">查看更多</span></div>
             <div className="space-y-6">{COURSES.slice(0,2).map(course => (<div key={course.id} className="flex space-x-4 cursor-pointer group" onClick={() => goToCourseDetail(course)}><div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-sm"><img src={course.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0" alt="" /></div><div className="flex-1 py-1 flex flex-col justify-between"><div><span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">研学课程</span><h4 className={`text-[16px] ${THEME.serif} font-bold text-gray-900 leading-snug group-hover:text-[#C8102E] transition-colors`}>{course.title}</h4></div><div className="flex space-x-2 mt-2">{course.tags.map(t => <span key={t} className="text-[10px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded-sm">{t}</span>)}</div></div></div>))}</div>
        </div>
        <div className="pb-8 border-t border-gray-100 pt-8">
             <div className="flex items-center justify-between mb-4 pb-2 border-b border-black"><h3 className={`text-xl ${THEME.serif} font-bold text-gray-900`}>热门线路</h3><span className="text-xs font-bold text-[#C8102E] uppercase tracking-wider">查看更多</span></div>
             <div className="space-y-6">{ROUTES.slice(0,2).map(route => (<div key={route.id} className="flex space-x-4 cursor-pointer group" onClick={() => goToRouteDetail(route)}><div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-sm"><img src={route.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0" alt="" /></div><div className="flex-1 py-1 flex flex-col justify-between"><div><span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">{route.cat}</span><h4 className={`text-[16px] ${THEME.serif} font-bold text-gray-900 leading-snug group-hover:text-[#C8102E] transition-colors line-clamp-2`}>{route.title}</h4></div><div className="flex space-x-2 mt-2">{route.tags.map(t => <span key={t} className="text-[10px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded-sm">{t}</span>)}</div></div></div>))}</div>
        </div>
        <div className="pb-8 border-t border-gray-100 pt-8">
             <div className="flex items-center justify-between mb-4"><h3 className={`text-xl ${THEME.serif} font-bold text-gray-900`}>研学营地</h3><span className="text-xs font-bold text-[#C8102E] uppercase tracking-wider">查看更多</span></div>
             <div className="flex overflow-x-auto space-x-4 pb-4 no-scrollbar">{BASES.map(base => (<div key={base.id} className="min-w-[220px] group cursor-pointer" onClick={() => goToBaseDetail(base)}><div className="relative aspect-[4/3] overflow-hidden rounded-sm mb-3"><img src={base.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="" /><div className="absolute top-2 left-2 bg-white/90 backdrop-blur text-black text-[9px] font-bold px-2 py-1 uppercase tracking-wider">{base.level}</div></div><h4 className={`text-[15px] ${THEME.serif} font-bold text-gray-900 leading-snug group-hover:text-[#C8102E] transition-colors truncate`}>{base.title}</h4><p className="text-gray-500 text-[11px] mt-1 flex items-center"><MapPin size={10} className="mr-1" /> {base.loc}</p></div>))}</div>
        </div>
      </div>
    </div>
  );

  // 2. 课程列表页 (完整)
  const renderCourses = () => (
    <div className="bg-white min-h-screen pb-20">
      <Header title="研学课程" />
      <div className="px-4 py-2 sticky top-12 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100"><div className="flex items-center space-x-6 overflow-x-auto no-scrollbar py-3"><button className="flex-shrink-0 text-gray-900 font-bold text-sm relative">最新<span className="absolute -bottom-3 left-0 w-full h-[2px] bg-[#C8102E]"></span></button>{['客家文化', '红色教育', '科学探究', '非遗体验'].map(t => <button key={t} className="flex-shrink-0 text-gray-400 text-sm hover:text-gray-900 transition-colors">{t}</button>)}</div></div>
      <div className="px-4 py-6 space-y-8">{COURSES.map(item => (<div key={item.id} className="block group cursor-pointer" onClick={() => goToCourseDetail(item)}><div className="relative w-full aspect-[16/9] mb-4 overflow-hidden rounded-sm"><img src={item.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="" /><div className="absolute top-3 right-3 bg-white/90 backdrop-blur text-black text-[10px] font-bold px-2 py-1 uppercase tracking-wider">{item.tags[0]}</div></div><div><h3 className={`text-[20px] ${THEME.serif} font-bold text-gray-900 leading-tight group-hover:text-[#C8102E] transition-colors`}>{item.title}</h3><div className="flex items-center mt-2 space-x-3 text-gray-500 text-xs font-medium"><span className="flex items-center"><User size={12} className="mr-1"/> 2.4k 学生</span><span className="flex items-center"><Star size={12} className="mr-1"/> 4.8</span></div></div><div className="h-[1px] bg-gray-100 w-full mt-6"></div></div>))}</div>
    </div>
  );

  // 3. 线路页 (完整恢复 + 跳转逻辑)
  const renderRoutes = () => (
    <div className="bg-white min-h-screen pb-20">
       <Header title="精品线路" />
       <div className="px-4 py-4 border-b border-gray-100 sticky top-12 bg-white z-40"><div className="flex justify-between items-center">{['自然生态', '红色研学', '文化遗产', '劳动实践', '地质科普'].map((t, i) => (<span key={t} className={`text-[12px] uppercase tracking-wider cursor-pointer ${i === 1 ? 'font-bold text-black border-b border-black' : 'text-gray-400 hover:text-gray-600'}`}>{t}</span>))}</div></div>
      <div className="px-4 py-6 space-y-6">{ROUTES.map(item => (<div key={item.id} className="flex space-x-4 items-start group cursor-pointer" onClick={() => goToRouteDetail(item)}><div className="flex flex-col items-center mt-1"><span className="text-[10px] font-bold text-gray-300">0{item.id}</span><div className="w-[1px] h-full bg-gray-100 mt-1 group-last:hidden"></div></div><div className="flex-1 pb-6 border-b border-gray-50 group-last:border-none"><div className="flex justify-between items-start"><div className="pr-4"><span className="text-[10px] text-[#C8102E] font-bold uppercase tracking-widest mb-1 block">{item.cat}</span><h3 className={`text-[17px] ${THEME.serif} font-bold text-gray-900 leading-snug`}>{item.title}</h3></div><div className="w-20 h-20 flex-shrink-0 bg-gray-100"><img src={item.image} className="w-full h-full object-cover grayscale-[20%]" alt="" /></div></div><div className="flex gap-2 mt-3">{item.tags.map((tag, i) => (<span key={i} className="text-[10px] text-gray-500 border border-gray-200 px-2 py-0.5 rounded-full">{tag}</span>))}</div></div></div>))}</div>
    </div>
  );

  // 4. 个人中心 (Placeholder)
 // 6. 个人中心 (DailyArt Profile)
  const renderProfile = () => (
    <div className="bg-white min-h-screen pb-20">
       {/* 头部区域：大字问候 */}
       <div className="bg-white px-6 pt-16 pb-8">
           <div className="flex justify-between items-start mb-6">
               <Capsule />
           </div>
           
           <div className="text-center">
               <div className="w-24 h-24 mx-auto rounded-full p-1 border border-gray-200 mb-4">
                   <img src={AVATAR_IMAGE} alt="User" className="w-full h-full rounded-full object-cover grayscale" />
               </div>
               <h2 className={`text-[32px] ${THEME.serif} font-bold text-gray-900 mb-1`}>你好，游客！</h2>
               <p className="text-gray-500 text-sm font-light">微信用户 · 138****6253</p>
               
               <button className="mt-6 bg-[#C8102E] text-white px-8 py-3 rounded-full text-sm font-bold shadow-lg shadow-red-100 hover:shadow-red-200 transition-all">
                   今日签到
               </button>
           </div>
       </div>

       {/* 推广卡片 */}
       <div className="px-6 mb-8">
           <div className="bg-black text-white p-6 rounded-lg text-center relative overflow-hidden">
               <div className="relative z-10">
                   <h3 className={`text-xl ${THEME.serif} font-bold mb-2`}>加入我们</h3>
                   <p className="text-gray-300 text-xs mb-4 px-4 leading-relaxed">申请成为认证研学基地或旅行机构，共同传播客家土楼文化。</p>
                   <button className="text-white border border-white/30 px-4 py-2 rounded-full text-xs font-bold hover:bg-white hover:text-black transition-colors">立即申请</button>
               </div>
               <div className="absolute top-0 right-0 w-32 h-32 bg-gray-800 rounded-full blur-3xl opacity-50 -mr-10 -mt-10"></div>
           </div>
       </div>

       {/* 功能列表 - 极简行 */}
       <div className="px-6 pb-8">
           <h3 className={`text-lg ${THEME.serif} font-bold text-gray-900 mb-4 border-b border-black pb-2 inline-block`}>设置与工具</h3>
           <div className="grid grid-cols-1 divide-y divide-gray-100">
                {FUNCTIONS.slice(0, 5).map((f, i) => (
                    <div key={i} className="flex items-center justify-between py-4 cursor-pointer hover:bg-gray-50 px-2 rounded-lg transition-colors group">
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-400 group-hover:text-black transition-colors">{f.icon}</span>
                            <span className="text-sm font-medium text-gray-700 group-hover:text-black">{f.name}</span>
                        </div>
                        <ChevronRight size={16} className="text-gray-300" />
                    </div>
                ))}
           </div>
       </div>
    </div>
  );

  // 5. 专家列表页 (完整恢复)
  const renderExperts = () => (
    <div className="bg-white min-h-screen">
        <Header title="研学专家" showBack={true} onBack={goBack} />
        <div className="px-4 py-2 border-b border-gray-100"><div className="bg-gray-50 h-10 flex items-center px-4 rounded-lg"><Search size={18} className="text-gray-400 mr-2" /><input type="text" placeholder="搜索专家姓名或ID" className="bg-transparent w-full text-sm outline-none font-light" /></div></div>
        <div className="flex justify-around py-4 border-b border-gray-100">{['研学导师', '研学教官', '研究员', '非遗传承'].map((t, i) => (<span key={t} className={`text-[13px] tracking-wide cursor-pointer ${i === 0 ? 'text-[#C8102E] font-bold border-b border-[#C8102E] pb-1' : 'text-gray-400 hover:text-black'}`}>{t}</span>))}</div>
        <div className="divide-y divide-gray-50">{EXPERTS.map(expert => (<div key={expert.id} className="p-4 flex space-x-4 items-center hover:bg-gray-50 transition-colors"><div className="w-16 h-16 rounded-full overflow-hidden border border-gray-200 flex-shrink-0"><img src={expert.img} className="w-full h-full object-cover grayscale" alt={expert.name} /></div><div className="flex-1"><h3 className={`text-[18px] ${THEME.serif} font-bold text-gray-900`}>{expert.name}</h3><p className="text-gray-500 text-[12px] uppercase tracking-wider mt-0.5">{expert.role}</p></div><div className="text-right"><span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded-sm">{expert.level}</span></div></div>))}</div>
    </div>
  );

  return (
    <div className={`font-sans antialiased text-gray-900 bg-white min-h-screen max-w-md mx-auto shadow-2xl relative overflow-hidden border-x border-gray-100`}>
      {view === 'main' ? (
        <>
            {activeTab === 'home' && renderHome()}
            {activeTab === 'courses' && renderCourses()}
            {activeTab === 'routes' && renderRoutes()}
            {activeTab === 'bases' && <BasesScreen onBaseClick={goToBaseDetail} onAgencyClick={goToAgencyDetail} />}
            {activeTab === 'profile' && renderProfile()}
            {renderTabBar()}
        </>
      ) : view === 'course_detail' ? (
          <CourseDetailScreen course={selectedCourse} onBack={goBack} />
      ) : view === 'route_detail' ? (
          <RouteDetailScreen route={selectedRoute} onBack={goBack} />
      ) : view === 'base_detail' ? (
          <BaseDetailScreen base={selectedBase} onBack={goBack} />
      ) : view === 'agency_detail' ? (
          <AgencyDetailScreen agency={selectedAgency} onBack={goBack} />
      ) : (
          renderExperts()
      )}
    </div>
  );
}