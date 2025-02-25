'use client';

import { useEffect } from 'react';
import { useUserStore } from '@/store/user';

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { token, userInfo, fetchUserInfo } = useUserStore();

  useEffect(() => {
    // 如果有 token 但没有用户信息，则获取用户信息
    if (token && !userInfo) {
      fetchUserInfo();
    }
  }, [token, userInfo, fetchUserInfo]);

  return children;
}