import { cookies } from 'next/headers';

// 服务端请求
export async function serverFetch(url: string, options: RequestInit = {}) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  const res = await fetch(`http://localhost:3001${url}`, {
    ...options,
    headers: {
      ...options.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!res.ok) {
    throw new Error('Network response was not ok');
  }

  return res.json();
}