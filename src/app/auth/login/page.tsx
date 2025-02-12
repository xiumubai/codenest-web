"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Github, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { generateNickname, generateAvatar } from "@/lib/utils/user";
import { toast } from 'sonner';
import { http } from '@/lib/http';
import type { LoginResponse, RegisterResponse } from '@/types/user';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // 验证手机号
  const validatePhone = (value: string) => {
    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!value) {
      setPhoneError("请输入手机号");
      return false;
    }
    if (!phoneRegex.test(value)) {
      setPhoneError("请输入正确的手机号");
      return false;
    }
    setPhoneError("");
    return true;
  };

  // 验证密码
  const validatePassword = () => {
    if (!password) {
      setPasswordError("请输入密码");
      return false;
    }
    if (password.length < 6) {
      setPasswordError("密码长度不能小于6位");
      return false;
    }
    if (isRegister && password !== confirmPassword) {
      setPasswordError("两次输入的密码不一致");
      return false;
    }
    setPasswordError("");
    return true;
  };

  // 处理表单提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePhone(phone) || !validatePassword()) {
      return;
    }

    setIsLoading(true);
    try {
      if (isRegister) {
        // 使用手机号生成昵称和头像
        const username = generateNickname(phone);
        const avatar = generateAvatar(phone);
        
        // 调用注册 API
        const data = await http.post<RegisterResponse>('/api/auth/register', {
          username,
          avatar,
          password,
          phone,
        });

        // 注册成功
        console.log('注册成功:', data);
        
        // 可以选择自动登录或跳转到登录页
        setIsRegister(false);
        setPhone("");
        setPassword("");
        setConfirmPassword("");
        
        toast.success('注册成功', {
          description: '请使用新账号登录',
        });
        
      } else {
        // 调用登录 API
        const res = await http.post<LoginResponse>('/api/auth/login', {
          phone,
          password,
        });
        // 保存 token
        localStorage.setItem('token', res.data.access_token);
        
        // 保存用户信息
        localStorage.setItem('user', JSON.stringify(res.data.user));
        
        // toast.success('登录成功', {
        //   description: '正在跳转到首页...',
        // });
        
        // 登录成功后跳转回首页
        router.push("/");
      }
    } catch (error: any) {
      console.error(isRegister ? "Register failed:" : "Login failed:", error);
      // 使用 sonner 显示错误信息
      toast.error(isRegister ? '注册失败' : '登录失败', {
        description: error.message || '服务器错误，请稍后重试',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 切换登录/注册时重置表单
  const toggleRegister = () => {
    setIsRegister(!isRegister);
    setPhone("");
    setPassword("");
    setConfirmPassword("");
    setPhoneError("");
    setPasswordError("");
  };

  // GitHub 登录
  const handleGitHubLogin = () => {
    const currentPath = window.location.pathname + window.location.search;
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(
      `${window.location.origin}/api/auth/github?redirect_uri=${encodeURIComponent(currentPath)}`
    )}`;
    window.location.href = githubAuthUrl;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-primary/10 p-4">
      <div className="w-full max-w-[425px] space-y-8 bg-background/80 backdrop-blur-lg rounded-2xl p-8 shadow-[0_0_40px_-10px] shadow-primary/20">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">{isRegister ? "注册新账号" : "登录你的账号"}</h1>
          <p className="text-sm text-muted-foreground">
            {isRegister ? "已有账号？" : "还没有账号？"}
            <button
              onClick={toggleRegister}
              className="text-primary hover:text-primary/90 transition-colors ml-1"
            >
              {isRegister ? "去登录" : "注册"}
            </button>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <div className="flex overflow-hidden rounded-lg border border-border focus-within:ring-1 focus-within:ring-primary focus-within:border-primary transition-all duration-200">
              <span className="flex items-center px-3 text-sm text-muted-foreground border-r border-border">
                +86
              </span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (phoneError) validatePhone(e.target.value);
                }}
                placeholder="请输入手机号"
                className="flex-1 border-0 focus:ring-0 text-sm text-foreground placeholder:text-muted-foreground py-2 px-3 outline-none [&:-webkit-autofill]:text-foreground"
                autoComplete="tel"
              />
            </div>
            {phoneError && (
              <p className="text-xs text-destructive">{phoneError}</p>
            )}
          </div>

          <div className="space-y-1">
            <div className="relative overflow-hidden rounded-lg border border-border focus-within:ring-1 focus-within:ring-primary focus-within:border-primary transition-all duration-200">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (passwordError) validatePassword();
                }}
                placeholder="请输入密码"
                className="w-full border-0 focus:ring-0 text-sm text-foreground placeholder:text-muted-foreground py-2 pl-3 pr-10 outline-none [&:-webkit-autofill]:text-foreground"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {passwordError && (
              <p className="text-xs text-destructive">{passwordError}</p>
            )}
          </div>

          {isRegister && (
            <div className="relative overflow-hidden rounded-lg border border-border focus-within:ring-1 focus-within:ring-primary focus-within:border-primary transition-all duration-200">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (passwordError) validatePassword();
                }}
                placeholder="请确认密码"
                className="w-full border-0 focus:ring-0 text-sm text-foreground placeholder:text-muted-foreground py-2 pl-3 pr-10 outline-none [&:-webkit-autofill]:text-foreground"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          )}
          
          <Button 
            type="submit" 
            className={cn(
              "w-full bg-gradient-to-r from-primary/90 to-primary text-primary-foreground",
              "hover:from-primary hover:to-primary/90 transition-all duration-300"
            )}
            disabled={isLoading}
          >
            {isLoading ? (
              <motion.div
                className="w-4 h-4 border-2 border-primary-foreground/50 border-t-primary-foreground rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            ) : (
              isRegister ? "注册" : "登录"
            )}
          </Button>
        </form>

        {!isRegister && (
          <>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">或</span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleGitHubLogin}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-muted hover:bg-muted/80 text-foreground rounded-md border border-border transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>通过 GitHub 继续</span>
              </button>
              
              <button
                disabled={true}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-muted/60 text-muted-foreground cursor-not-allowed rounded-md border border-border transition-colors"
              >
                <svg className="w-4 h-4 text-[#07C160]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.295.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.045c.133 0 .24-.11.24-.246 0-.06-.024-.12-.04-.177l-.325-1.233a.492.492 0 0 1 .177-.553c1.53-1.124 2.496-2.826 2.496-4.714 0-3.352-3.218-6.018-7.055-6.029zm-2.012 3.958c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z"/>
                </svg>
                <span>通过 微信 继续</span>
              </button>
            </div>
          </>
        )}

        <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">使用条款</a>
          <a href="#" className="hover:text-foreground transition-colors">隐私政策</a>
        </div>
      </div>
    </div>
  );
} 