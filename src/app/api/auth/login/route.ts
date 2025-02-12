import { NextResponse } from 'next/server';
import { http } from '@/lib/http';
import type { LoginResponse } from '@/types/user';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // 使用封装的 http 方法发送请求
    const data = await http.post<LoginResponse>('/user/login', body, {
      showError: false, // 不在服务端显示错误提示
    });

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: error.message || '服务器错误' },
      { status: error.status || 500 }
    );
  }
} 