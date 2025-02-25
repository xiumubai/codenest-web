
// 客户端请求
import { getToken } from '@/lib/utils/getToken';

export async function clientFetch(url: string, options: RequestInit = {}) {
  const token = getToken();
  // 确保 url 以 / 开头
  const normalizedUrl = url.startsWith('/') ? url : `/${url}`;

  const res = await fetch(`http://localhost:3001/api${normalizedUrl}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  // 如果响应不是 2xx，抛出详细错误
  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(
      errorData?.message || 
      `请求失败: ${res.status} ${res.statusText}`
    );
  }

  return res.json();
}