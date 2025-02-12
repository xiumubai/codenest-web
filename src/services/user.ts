import type { User } from '@/types/user';

class UserService {
  // 保存用户信息
  saveUserInfo(token: string, user: User) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  // 获取 token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // 获取当前用户信息
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (error) {
        return null;
      }
    }
    return null;
  }

  // 登出
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  // 检查是否已登录
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}

// 创建单例实例
export const userService = new UserService(); 