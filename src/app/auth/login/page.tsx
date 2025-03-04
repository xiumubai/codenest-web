"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Github, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { generateNickname, generateAvatar } from "@/lib/utils/user";
import { toast } from "sonner";
import { clientFetch } from '@/lib/fetch/clientFetch';
import { useUserStore } from '@/store/user';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuth } = useUserStore();
  // 获取 returnUrl 参数
  const returnUrl = searchParams.get('returnUrl');

  const redirect = () => {
    // 如果有 returnUrl 参数，则解码并跳转到该地址，否则跳转到首页
    if (returnUrl) {
      const decodedUrl = decodeURIComponent(returnUrl);
      router.replace(decodedUrl);
    } else {
      router.replace('/');
    }
  }
  // 检查登录状态并重定向
  useEffect(() => {
    if (isAuth) {
      redirect()
    }
  }, [isAuth, router]);


  const [isLoading, setIsLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [isPasswordLogin, setIsPasswordLogin] = useState(true);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [verifyCodeError, setVerifyCodeError] = useState("");
  const [countdown, setCountdown] = useState(0);
  const { setToken } = useUserStore();

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

  // 验证验证码
  const validateVerifyCode = () => {
    if (!verifyCode) {
      setVerifyCodeError("请输入验证码");
      return false;
    }
    if (!/^\d{6}$/.test(verifyCode)) {
      setVerifyCodeError("验证码格式不正确");
      return false;
    }
    setVerifyCodeError("");
    return true;
  };

  // 发送验证码
  const handleSendVerifyCode = async () => {
    if (!validatePhone(phone)) {
      return;
    }
    try {
      // 调用发送验证码
      // await authService.sendVerifyCode(phone);

      // 开始倒计时
      setCountdown(60);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      toast.success("验证码已发送");
    } catch (error: any) {
      toast.error("发送验证码失败", {
        description: error.message || "请稍后重试",
      });
    }
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

    if (
      !validatePhone(phone) ||
      (isPasswordLogin ? !validatePassword() : !validateVerifyCode())
    ) {
      return;
    }

    setIsLoading(true);
    try {
      // 手机号+密码注册逻辑
      if (isRegister) {
        // 使用手机号生成随机昵称和头像
        const username = generateNickname(phone);
        const avatar = generateAvatar(phone);

        // 调用注册服务
        const res = await clientFetch('/user/register', {
          method: 'POST',
          body: JSON.stringify({
            username,
            avatar,
            password,
            phone,
          })
        });

        const { access_token } = res.data;

        // 可以选择自动登录或跳转到登录页
        // setIsRegister(false);
        setPhone("");
        setPassword("");
        setConfirmPassword("");

        toast.success("注册成功");

        // 保存 token
        setToken(access_token);
        // 获取用户信息

        redirect();
      } else {
        // 登录逻辑
        // 调用登录服务
        const res = await clientFetch('user/login', {
          method: 'POST',
          body: JSON.stringify({
            phone,
            ...(isPasswordLogin ? { password } : { verifyCode }),
            type: isPasswordLogin ? "password" : "code",
          })
        });
        const { access_token } = res.data;
        // 保存 token
        setToken(access_token);

        toast.success('登录成功');

        redirect();
      }
    } catch (error: any) {
      console.error(isRegister ? "Register failed:" : "Login failed:", error);
      // 使用 sonner 显示错误信息
      toast.error(isRegister ? "注册失败" : "登录失败", {
        description: error.message || "服务器错误，请稍后重试",
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
    // window.location.href = authService.getGitHubAuthUrl(currentPath);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-primary/10 p-4">
      <div className="w-full max-w-[425px] space-y-8 bg-background/80 backdrop-blur-lg rounded-2xl p-8 shadow-[0_0_40px_-10px] shadow-primary/20">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">
            {isRegister ? "注册新账号" : "登录你的账号"}
          </h1>
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
          {/* 手机号信息 */}
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

          {/* 密码登陆 */}
          {(isRegister || isPasswordLogin) && (
            <div className="flex items-center justify-between mb-1">
              <div className="flex-1">
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
                    <p className="text-xs text-destructive">
                      {passwordError}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 验证码登陆输入框 */}
          {!isRegister && !isPasswordLogin && (
            <div className="flex gap-2">
              <div className="flex gap-2">
                {[...Array(6)].map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={verifyCode[index] || ""}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      if (
                        value || value === ""
                      ) {
                        const newVerifyCode = verifyCode.split("");
                        newVerifyCode[index] = value.slice(-1);
                        const nextVerifyCode = newVerifyCode.join("");
                        setVerifyCode(nextVerifyCode);
                        if (verifyCodeError) validateVerifyCode();

                        // 自动聚焦下一个输入框
                        if (value && index < 5) {
                          const nextInput = e.target.parentElement?.children[
                            index + 1
                          ] as HTMLInputElement;
                          nextInput?.focus();
                        }
                      }
                    }}
                    onKeyDown={(e) => {
                      // 处理删除键
                      if (
                        e.key === "Backspace" &&
                        !verifyCode[index] &&
                        index > 0
                      ) {
                        const prevInput = e.currentTarget.parentElement
                          ?.children[index - 1] as HTMLInputElement;
                        prevInput?.focus();
                      }
                    }}
                    onPaste={(e) => {
                      e.preventDefault();
                      const pastedData = e.clipboardData
                        .getData("text")
                        .replace(/\D/g, "")
                        .slice(0, 6);
                      setVerifyCode(pastedData);
                      if (verifyCodeError) validateVerifyCode();
                    }}
                    className="w-10 h-10 text-center border border-border rounded-lg focus:ring-1 focus:ring-primary focus:border-primary transition-all duration-200 text-sm text-foreground placeholder:text-muted-foreground outline-none [&:-webkit-autofill]:text-foreground"
                  />
                ))}
              </div>
              <div className="flex justify-between items-center">
                {verifyCodeError && (
                  <p className="text-xs text-destructive">{verifyCodeError}</p>
                )}
                <button
                  type="button"
                  onClick={handleSendVerifyCode}
                  disabled={countdown > 0}
                  className="ml-auto text-sm text-primary hover:text-primary/90 disabled:text-muted-foreground transition-colors whitespace-nowrap"
                >
                  {countdown > 0 ? `${countdown}秒后重试` : "获取验证码"}
                </button>
              </div>
            </div>
          )}
          {/* 验证码/密码登陆切换按钮 */}
          {!isRegister && (
            <button
              type="button"
              onClick={() => {
                setIsPasswordLogin(!isPasswordLogin);
                setPassword("");
                setVerifyCode("");
                setPasswordError("");
                setVerifyCodeError("");
              }}
              className="text-sm text-primary hover:text-primary/90 transition-colors"
            >
              {isPasswordLogin ? "使用验证码登录" : "使用密码登录"}
            </button>
          )}
          {/* 注册信息 */}
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
          {/* 登陆/注册按钮 */}
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
            ) : isRegister ? (
              "注册"
            ) : isPasswordLogin ? (
              "登录"
            ) : (
              "登录/注册"
            )}
          </Button>
        </form>
        {/* 其他登陆方式 */}
        {!isRegister && (
          <>
            <div className="flex items-center justify-center mb-4">
              <input
                type="checkbox"
                id="agreement"
                className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
              />
              <label
                htmlFor="agreement"
                className="ml-2 text-xs text-muted-foreground"
              >
                我已阅读并同意
                <a
                  href="#"
                  className="text-primary hover:text-primary/90 transition-colors"
                >
                  服务协议
                </a>
                和
                <a
                  href="#"
                  className="text-primary hover:text-primary/90 transition-colors"
                >
                  隐私权政策
                </a>
              </label>
            </div>

            <div className="flex items-center justify-center gap-4">
              <button
                onClick={handleGitHubLogin}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-muted hover:bg-muted/80 hover:scale-105 transition-all duration-300"
                title="GitHub 登录"
              >
                <Github className="w-5 h-5" />
              </button>

              <button
                disabled={true}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-muted/60 cursor-not-allowed hover:bg-muted/90 disabled:hover:bg-muted/60 disabled:hover:scale-100 hover:scale-105 transition-all duration-300"
                title="微信登录"
              >
                <svg
                  className="w-5 h-5 text-[#07C160]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.295.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.045c.133 0 .24-.11.24-.246 0-.06-.024-.12-.04-.177l-.325-1.233a.492.492 0 0 1 .177-.553c1.53-1.124 2.496-2.826 2.496-4.714 0-3.352-3.218-6.018-7.055-6.029zm-2.012 3.958c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z" />
                </svg>
              </button>

              <button
                disabled={true}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-muted/60 cursor-not-allowed hover:bg-muted/90 disabled:hover:bg-muted/60 disabled:hover:scale-100 hover:scale-105 transition-all duration-300"
                title="邮箱登录"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </button>
            </div>
          </>
        )}

        <div className="text-center text-xs text-muted-foreground">
          其他登录方式即将开放
        </div>
      </div>
    </div>
  );
}
