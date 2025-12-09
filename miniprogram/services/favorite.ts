// services/favorite.ts
// 收藏服务 - 管理课程收藏的本地存储

const FAVORITE_KEY = 'favorite_courses';

// 获取收藏列表
export function getFavorites(): string[] {
  try {
    const data = wx.getStorageSync(FAVORITE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

// 添加收藏
export function addFavorite(courseId: string): boolean {
  try {
    const favorites = getFavorites();
    if (!favorites.includes(courseId)) {
      favorites.unshift(courseId);
      wx.setStorageSync(FAVORITE_KEY, JSON.stringify(favorites));
    }
    return true;
  } catch (e) {
    return false;
  }
}

// 移除收藏
export function removeFavorite(courseId: string): boolean {
  try {
    const favorites = getFavorites();
    const index = favorites.indexOf(courseId);
    if (index > -1) {
      favorites.splice(index, 1);
      wx.setStorageSync(FAVORITE_KEY, JSON.stringify(favorites));
    }
    return true;
  } catch (e) {
    return false;
  }
}

// 检查是否已收藏
export function isFavorite(courseId: string): boolean {
  const favorites = getFavorites();
  return favorites.includes(courseId);
}

// 切换收藏状态
export function toggleFavorite(courseId: string): boolean {
  if (isFavorite(courseId)) {
    removeFavorite(courseId);
    return false;
  } else {
    addFavorite(courseId);
    return true;
  }
}
