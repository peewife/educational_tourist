// 数据模型类型定义

// 用户信息
interface IUserInfo {
  openId: string;
  nickName: string;
  avatarUrl: string;
  phone?: string;
  role: 'user' | 'expert' | 'admin';
}

// 课程
interface ICourse {
  id: string;
  title: string;
  category: 'latest' | 'culture' | 'red' | 'science' | 'intangible';
  categoryName: string;
  imageUrl: string;
  images?: string[];       // 图片数组（用于轮播展示）
  gradeLevel: string;      // 适用学段
  duration: string;        // 课程时长
  baseId?: string;         // 关联基地ID
  baseName?: string;       // 关联基地名称
  price: number;
  studentCount?: number;   // 学生数
  rating?: number;         // 评分
  description?: string;    // 课程详情
  schedule?: IScheduleItem[];  // 课程安排
  feeDescription?: string; // 费用说明
  tags?: string[];
  status: 'active' | 'inactive';
  createdAt: string;
}

// 线路
interface IRoute {
  id: string;
  title: string;
  category: 'nature' | 'red' | 'culture' | 'labor' | 'geology';
  categoryName: string;
  imageUrl: string;
  images?: string[];       // 图片数组（用于轮播展示）
  gradeLevel: string[];    // 适用学段
  duration: string;        // 行程天数
  agencyId?: string;       // 关联机构ID
  agencyName?: string;     // 关联机构名称
  baseIds?: string[];      // 关联基地ID列表
  baseNames?: string[];    // 关联基地名称列表
  price: number;
  description?: string;    // 线路详情
  schedule?: IScheduleItem[];  // 线路安排
  feeDescription?: string; // 费用说明
  status: 'active' | 'inactive';
  createdAt: string;
}

// 基地
interface IBase {
  id: string;
  name: string;
  level: 'national' | 'provincial' | 'city';  // 等级
  levelName: string;
  district: string;        // 所在区域
  address: string;         // 详细地址
  imageUrl: string;
  images?: string[];       // 图片数组（用于轮播展示）
  location?: {
    latitude: number;
    longitude: number;
  };
  phone?: string;          // 联系电话
  description?: string;    // 基地简介
  type: string;            // 机构类型
  relatedCourses?: ICourse[];  // 关联课程
  isRecommended?: boolean;
  status: 'active' | 'inactive';
}

// 服务机构
interface IAgency {
  id: string;
  name: string;
  logo: string;
  logoText?: string;       // Logo文字
  district: string;        // 所在区域
  address: string;         // 详细地址
  location?: {
    latitude: number;
    longitude: number;
  };
  phone?: string;          // 联系电话
  description?: string;    // 机构简介
  type: string;            // 机构类型
  relatedRoutes?: IRoute[];    // 关联线路
  relatedExperts?: IExpert[];  // 关联导师
  status: 'active' | 'inactive';
}

// 导师
interface IExpert {
  id: string;
  name: string;
  avatarUrl: string;
  role: 'teacher' | 'officer' | 'researcher' | 'inheritor';
  roleName: string;        // 角色名称
  level: 'junior' | 'intermediate' | 'senior';
  levelName: string;       // 等级名称
  certNo?: string;         // 证书编号
  agencyId?: string;       // 所属机构ID
  agencyName?: string;     // 所属机构名称
  validUntil?: string;     // 证书有效期
  description?: string;    // 个人简介
  status: 'active' | 'inactive';
}

// 行程安排项
interface IScheduleItem {
  time: string;            // 时间
  title: string;           // 标题
  description: string;     // 描述
}

// Banner
interface IBanner {
  id: string;
  imageUrl: string;
  title: string;
  subtitle?: string;
  linkType: 'course' | 'route' | 'base' | 'none';
  linkId?: string;
}

// 功能入口
interface IFunctionEntry {
  id: string;
  name: string;
  icon: string;
  path?: string;
  disabled?: boolean;
}
