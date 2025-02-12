import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  // 获取来源页面
  const redirectTo = searchParams.get('redirect_uri') || '/';

  if (!code) {
    return NextResponse.redirect('/login?error=github_code_missing');
  }

  try {
    // 使用授权码换取访问令牌
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      throw new Error(tokenData.error_description);
    }

    // 获取用户信息
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
      },
    });

    console.log(userResponse);
    
    const userData = await userResponse.json();

    // 获取用户邮箱
    const emailsResponse = await fetch('https://api.github.com/user/emails', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
      },
    });
    console.log(emailsResponse);


    const emails = await emailsResponse.json();
    const primaryEmail = emails.find((email: any) => email.primary)?.email;

    // 构建用户数据
    const user = {
      id: userData.id,
      name: userData.name || userData.login,
      email: primaryEmail || userData.email,
      avatar: userData.avatar_url,
      githubId: userData.id,
      username: userData.login,
    };

    // TODO: 这里添加保存用户数据到数据库的代码
    // await saveUserToDatabase(user);

    // 设置认证 cookie
    const cookieStore = cookies();
    await cookieStore.set('auth_user', JSON.stringify(user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7天
    });

    // 直接重定向回原页面
    return NextResponse.redirect(new URL(redirectTo, request.url));

  } catch (error) {
    console.error('GitHub authentication error:', error);
    return NextResponse.redirect('/login?error=github_auth_failed');
  }
} 