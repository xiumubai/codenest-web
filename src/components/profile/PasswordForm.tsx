"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const passwordSchema = z.object({
  oldPassword: z.string().min(6, "密码至少6个字符"),
  newPassword: z.string().min(6, "密码至少6个字符"),
  confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "两次输入的密码不一致",
  path: ["confirmPassword"]
});

const resetPasswordSchema = z.object({
  phone: z.string().regex(/^1[3-9]\d{9}$/, "请输入有效的手机号"),
  verificationCode: z.string().length(6, "验证码必须是6位数字").regex(/^\d+$/, "验证码只能包含数字"),
  tempPassword: z.string().length(6, "临时密码必须是6位字符"),
  newPassword: z.string().min(6, "密码至少6个字符"),
  confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "两次输入的密码不一致",
  path: ["confirmPassword"]
});

type PasswordFormValues = z.infer<typeof passwordSchema>;
type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

interface PasswordFormProps {
  registrationType?: "phone_password" | "phone_code";
  hasPassword?: boolean;
}

export function PasswordForm({ registrationType, hasPassword }: PasswordFormProps) {
  const { toast } = useToast();
  const [isResetting, setIsResetting] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [tempPassword, setTempPassword] = useState("");

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: ""
    }
  });

  const resetPasswordForm = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      phone: "",
      verificationCode: "",
      tempPassword: "",
      newPassword: "",
      confirmPassword: ""
    }
  });

  const startCountdown = () => {
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
  };

  const sendVerificationCode = async (phone: string) => {
    setIsSendingCode(true);
    try {
      // TODO: 调用后端API发送验证码
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "成功",
        description: "验证码已发送到您的手机"
      });
      startCountdown();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "错误",
        description: "验证码发送失败，请重试"
      });
    } finally {
      setIsSendingCode(false);
    }
  };

  const onPasswordSubmit = async (data: PasswordFormValues) => {
    try {
      // TODO: 调用后端API修改密码
      toast({
        title: "成功",
        description: "密码修改成功"
      });
      passwordForm.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "错误",
        description: "密码修改失败，请重试"
      });
    }
  };

  const onResetPasswordSubmit = async (data: ResetPasswordFormValues) => {
    try {
      // TODO: 调用后端API重置密码
      const randomPassword = Math.random().toString(36).slice(-6);
      setTempPassword(randomPassword);
      toast({
        title: "成功",
        description: `临时密码已生成：${randomPassword}，请使用此密码重新设置新密码`
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "错误",
        description: "密码重置失败，请重试"
      });
    }
  };

  // 如果是手机号+验证码注册且未设置过密码
  if (registrationType === "phone_code" && !hasPassword) {
    return (
      <Form {...resetPasswordForm}>
        <form onSubmit={resetPasswordForm.handleSubmit(onResetPasswordSubmit)} className="space-y-6">
          <FormField
            control={resetPasswordForm.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>新密码</FormLabel>
                <FormControl>
                  <Input {...field} type="password" placeholder="请设置新密码" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={resetPasswordForm.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>确认密码</FormLabel>
                <FormControl>
                  <Input {...field} type="password" placeholder="请再次输入新密码" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">设置密码</Button>
        </form>
      </Form>
    );
  }

  return (
    <div className="space-y-6">
      {!isResetting ? (
        <Form {...passwordForm}>
          <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-6">
            <FormField
              control={passwordForm.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>当前密码</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="请输入当前密码" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={passwordForm.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>新密码</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="请输入新密码" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={passwordForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>确认密码</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="请再次输入新密码" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between items-center">
              <Button type="button" variant="link" onClick={() => setIsResetting(true)}>
                忘记密码？
              </Button>
              <Button type="submit">修改密码</Button>
            </div>
          </form>
        </Form>
      ) : (
        <Form {...resetPasswordForm}>
          <form onSubmit={resetPasswordForm.handleSubmit(onResetPasswordSubmit)} className="space-y-6">
            <FormField
              control={resetPasswordForm.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>手机号</FormLabel>
                  <FormControl>
                    <Input {...field} type="tel" placeholder="请输入手机号" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={resetPasswordForm.control}
              name="verificationCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>验证码</FormLabel>
                  <FormControl>
                    <div className="flex space-x-4">
                      <Input {...field} placeholder="请输入验证码" className="flex-1" />
                      <Button
                        type="button"
                        variant="outline"
                        disabled={isSendingCode || countdown > 0}
                        onClick={() => sendVerificationCode(resetPasswordForm.getValues().phone)}
                      >
                        {countdown > 0 ? `${countdown}秒后重试` : "获取验证码"}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {tempPassword && (
              <>
                <FormField
                  control={resetPasswordForm.control}
                  name="tempPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>临时密码</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="请输入临时密码" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={resetPasswordForm.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>新密码</FormLabel>
                      <FormControl>
                        <Input {...field} type="password" placeholder="请输入新密码" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={resetPasswordForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>确认密码</FormLabel>
                      <FormControl>
                        <Input {...field} type="password" placeholder="请再次输入新密码" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            <div className="flex justify-between items-center">
              <Button type="button" variant="outline" onClick={() => {
                setIsResetting(false);
                setTempPassword("");
                resetPasswordForm.reset();
              }}>
                返回
              </Button>
              <Button type="submit">
                {tempPassword ? "重置密码" : "获取临时密码"}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}