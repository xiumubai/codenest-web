'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function GitHubSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    try {
      // 从 cookie 中获取用户数据
      const getCookie = (name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift();
      };

      const userDataStr = getCookie('auth_user');
      console.log('Cookie中的用户数据:', userDataStr);

      if (!userDataStr) {
        console.log('未找到用户数据');
        router.replace('/login?error=no_user_data');
        return;
      }

      const userData = JSON.parse(userDataStr);
      console.log('解析后的用户数据:', userData);

      // 将用户数据保存到 localStorage（如果需要的话）
      localStorage.setItem('userData', JSON.stringify(userData));

      // 获取 returnUrl 参数
      const returnUrl = searchParams.get('returnUrl');
      
      // 如果有 returnUrl 参数，则解码并跳转到该地址，否则跳转到首页
      if (returnUrl) {
        const decodedUrl = decodeURIComponent(returnUrl);
        router.replace(decodedUrl);
      } else {
        router.replace('/');
      }

    } catch (error) {
      console.error('处理用户数据时出错:', error);
      router.replace('/login?error=process_user_data_failed');
    }
  }, [router, searchParams]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold">登录成功</h1>
        <p className="text-gray-600">正在跳转...</p>
      </div>
    </div>
  );
}