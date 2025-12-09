// services/user.ts
// 用户服务 - 基于微信云开发

const db = wx.cloud.database();
const usersCollection = db.collection('users');

// 用户信息接口
export interface ICloudUserInfo {
  _id?: string;
  openId: string;
  nickName: string;
  avatarUrl: string;
  phone?: string;
  role: 'user' | 'expert' | 'admin';
  signInDays: number;
  lastSignInDate?: string;
  createdAt: string;
  updatedAt: string;
}

// 获取用户 OpenId
export async function getOpenId(): Promise<string> {
  try {
    const res = await wx.cloud.callFunction({
      name: 'login'
    });
    const result = res.result as { openid: string };
    return result.openid || '';
  } catch (e) {
    console.error('获取 OpenId 失败:', e);
    return '';
  }
}

// 检查用户是否存在
export async function checkUserExists(openId: string): Promise<ICloudUserInfo | null> {
  try {
    const res = await usersCollection.where({ openId }).get();
    if (res.data && res.data.length > 0) {
      return res.data[0] as ICloudUserInfo;
    }
    return null;
  } catch (e) {
    console.error('检查用户失败:', e);
    return null;
  }
}

// 创建新用户
export async function createUser(userInfo: Partial<ICloudUserInfo>): Promise<ICloudUserInfo | null> {
  try {
    const now = new Date().toISOString();
    const newUser: Omit<ICloudUserInfo, '_id'> = {
      openId: userInfo.openId || '',
      nickName: userInfo.nickName || '微信用户',
      avatarUrl: userInfo.avatarUrl || '',
      phone: userInfo.phone || '',
      role: 'user',
      signInDays: 0,
      createdAt: now,
      updatedAt: now
    };

    const res = await usersCollection.add({ data: newUser });
    return { ...newUser, _id: res._id as string };
  } catch (e) {
    console.error('创建用户失败:', e);
    return null;
  }
}

// 更新用户信息
export async function updateUser(openId: string, updates: Partial<ICloudUserInfo>): Promise<boolean> {
  try {
    const now = new Date().toISOString();
    await usersCollection.where({ openId }).update({
      data: {
        ...updates,
        updatedAt: now
      }
    });
    return true;
  } catch (e) {
    console.error('更新用户失败:', e);
    return false;
  }
}

// 用户签到
export async function signIn(openId: string): Promise<{ success: boolean; signInDays: number; message: string }> {
  try {
    const user = await checkUserExists(openId);
    if (!user) {
      return { success: false, signInDays: 0, message: '用户不存在' };
    }

    const today = new Date().toISOString().split('T')[0];
    
    // 检查今天是否已签到
    if (user.lastSignInDate === today) {
      return { success: false, signInDays: user.signInDays, message: '今日已签到' };
    }

    // 计算连续签到天数
    let newSignInDays = 1;
    if (user.lastSignInDate) {
      const lastDate = new Date(user.lastSignInDate);
      const todayDate = new Date(today);
      const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        // 连续签到
        newSignInDays = user.signInDays + 1;
      }
      // 如果超过1天，重置为1
    }

    // 更新签到信息
    await usersCollection.where({ openId }).update({
      data: {
        signInDays: newSignInDays,
        lastSignInDate: today,
        updatedAt: new Date().toISOString()
      }
    });

    return { success: true, signInDays: newSignInDays, message: '签到成功' };
  } catch (e) {
    console.error('签到失败:', e);
    return { success: false, signInDays: 0, message: '签到失败' };
  }
}

// 登录（获取或创建用户）
export async function login(wxUserInfo?: { nickName: string; avatarUrl: string }): Promise<{
  success: boolean;
  userInfo: ICloudUserInfo | null;
  openId: string;
  message: string;
}> {
  try {
    // 获取 OpenId
    const openId = await getOpenId();
    if (!openId) {
      return { success: false, userInfo: null, openId: '', message: '获取用户标识失败' };
    }

    // 检查用户是否存在
    let user = await checkUserExists(openId);
    
    if (user) {
      // 用户存在，如果有新的微信信息则更新
      if (wxUserInfo && (wxUserInfo.nickName || wxUserInfo.avatarUrl)) {
        await updateUser(openId, {
          nickName: wxUserInfo.nickName || user.nickName,
          avatarUrl: wxUserInfo.avatarUrl || user.avatarUrl
        });
        user.nickName = wxUserInfo.nickName || user.nickName;
        user.avatarUrl = wxUserInfo.avatarUrl || user.avatarUrl;
      }
      return { success: true, userInfo: user, openId, message: '登录成功' };
    } else {
      // 创建新用户
      const newUser = await createUser({
        openId,
        nickName: wxUserInfo?.nickName || '微信用户',
        avatarUrl: wxUserInfo?.avatarUrl || ''
      });
      
      if (newUser) {
        return { success: true, userInfo: newUser, openId, message: '注册成功' };
      }
      return { success: false, userInfo: null, openId: '', message: '创建用户失败' };
    }
  } catch (e) {
    console.error('登录失败:', e);
    return { success: false, userInfo: null, openId: '', message: '登录失败' };
  }
}

// 退出登录
export function logout(): void {
  try {
    wx.removeStorageSync('userInfo');
    wx.removeStorageSync('openId');
    const app = getApp<IAppOption>();
    app.globalData.userInfo = null;
    app.globalData.openId = '';
    app.globalData.isLoggedIn = false;
  } catch (e) {
    console.error('退出登录失败:', e);
  }
}

// 保存用户信息到本地
export function saveUserToLocal(userInfo: ICloudUserInfo, openId: string): void {
  try {
    wx.setStorageSync('userInfo', userInfo);
    wx.setStorageSync('openId', openId);
    const app = getApp<IAppOption>();
    app.globalData.userInfo = userInfo;
    app.globalData.openId = openId;
    app.globalData.isLoggedIn = true;
  } catch (e) {
    console.error('保存用户信息失败:', e);
  }
}
