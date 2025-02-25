import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { clientFetch } from '@/lib/fetch/clientFetch';

interface UserState {
  token: string | null;
  userInfo: any | null;
  isAuth: boolean;
  setToken: (token: string | null) => void;
  setUserInfo: (userInfo: any | null) => void;
  fetchUserInfo: () => Promise<void>;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      token: null,
      userInfo: null,
      isAuth: false,
      setToken: (token) => {
        set({ token, isAuth: !!token });
      },
      setUserInfo: (userInfo) => set({ userInfo, isAuth: !!userInfo }),
      fetchUserInfo: async () => {
        try {
          const res = await clientFetch('/user/info');
          set({ userInfo: res.data });
        } catch (error) {
          // 如果获取用户信息失败，清除登录状态
          set({ token: null, userInfo: null });
        }
      },
      logout: async () => {
        try {
          await clientFetch('/user/logout');
          set({ token: null, userInfo: null, isAuth: false });
        } catch (error) {
          console.log('logout error', error);
        }
      },
    }),
    {
      name: 'user-token',
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          try {
            const data = JSON.parse(str);
            // 优先使用独立存储的 token
            const token = localStorage.getItem('token');
            if (token) {
              data.state.token = token;
            }
            return data;
          } catch {
            return null;
          }
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
      partialize: (state) => ({ token: state.token } as UserState),
    }
  )
);