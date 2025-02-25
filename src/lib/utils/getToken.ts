import { useUserStore } from '@/store/user';

// 方法一：直接从 store 获取
export const getToken = () => useUserStore.getState().token;

// 方法二：从 localStorage 解析
export const getTokenFromStorage = () => {
  const stored = localStorage.getItem('user-token');
  if (!stored) return null;
  
  try {
    const { state } = JSON.parse(stored);
    return state.token;
  } catch {
    return null;
  }
};