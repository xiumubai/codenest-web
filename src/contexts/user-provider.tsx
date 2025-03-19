'use client';

import { useEffect } from 'react';
import { useUserStore } from '@/store/user';
import { usePathname, useRouter } from 'next/navigation';
import { AUTH_ROUTES } from '@/config/auth';

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { token, userInfo, fetchUserInfo } = useUserStore();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // 如果有 token 但没有用户信息，则获取用户信息
    if (token && !userInfo) {
      fetchUserInfo();
    }

    const needAuth = AUTH_ROUTES.some(route => {
      // 将路由和当前路径按'/'分割成段，并过滤掉空字符串
      const routeParts = route.split('/').filter(Boolean);
      const pathParts = pathname.split('/').filter(Boolean);
      
      // 如果段数不同，直接返回false
      if (routeParts.length !== pathParts.length) {
        return false;
      }
      
      // 逐段比较
      const isMatch = routeParts.every((part, index) => {
        // 如果是动态段（包含在[]中），则视为匹配
        if (part.startsWith('[') && part.endsWith(']')) {
          return true;
        }
        // 否则进行精确匹配
        const pathPart = pathParts[index];
        return part === pathPart;
      });
      
      return isMatch;
    });

    // 如果需要登录但未登录，重定向到登录页面
    if (needAuth && !token) {
      // 将完整的 URL（包括查询参数）编码并作为参数传递给登录页面
      const fullUrl = window.location.href.split(window.location.origin)[1];
      const returnUrl = encodeURIComponent(fullUrl);
      router.push(`/auth/login?returnUrl=${returnUrl}`);
    }
  }, [token, userInfo, fetchUserInfo, pathname, router]);

  return children;
}
