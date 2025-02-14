import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const token = cookies().get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { message: '未登录' },
        { status: 401 }
      );
    }

    // 调用后端接口获取用户信息
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/info`, {
      headers: {
        'Authorization': token.startsWith('Bearer ') ? token : `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('获取用户信息失败');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Get user info error:', error);
    return NextResponse.json(
      { message: error.message || '获取用户信息失败' },
      { status: error.status || 500 }
    );
  }
} 