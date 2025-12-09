// API 响应类型定义

// 通用 API 响应
interface IApiResponse<T> {
  code: 0 | 400 | 404 | 500;
  data: T;
  message: string;
}

// 列表请求参数
interface IGetListParams {
  page: number;
  pageSize: number;
  category?: string;
  keyword?: string;
  district?: string;
}

// 列表响应
interface IListResponse<T> {
  list: T[];
  total: number;
  hasMore: boolean;
}

// 课程列表响应
type ICourseListResponse = IApiResponse<IListResponse<ICourse>>;

// 线路列表响应
type IRouteListResponse = IApiResponse<IListResponse<IRoute>>;

// 基地列表响应
type IBaseListResponse = IApiResponse<IListResponse<IBase>>;

// 机构列表响应
type IAgencyListResponse = IApiResponse<IListResponse<IAgency>>;

// 导师列表响应
type IExpertListResponse = IApiResponse<IListResponse<IExpert>>;

// 详情响应
type ICourseDetailResponse = IApiResponse<ICourse>;
type IRouteDetailResponse = IApiResponse<IRoute>;
type IBaseDetailResponse = IApiResponse<IBase>;
type IAgencyDetailResponse = IApiResponse<IAgency>;
type IExpertDetailResponse = IApiResponse<IExpert>;
