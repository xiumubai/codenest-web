"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  phone: z.string().regex(/^1[3-9]\d{9}$/, "请输入有效的手机号"),
  verificationCode: z.string().length(6, "验证码必须是6位数字").regex(/^\d+$/, "验证码只能包含数字")
});

type FormValues = z.infer<typeof formSchema>;

interface PhoneBindFormProps {
  initialPhone?: string;
  isPhoneVerified?: boolean;
  registrationType?: "phone_password" | "phone_code";
}

export function PhoneBindForm({ initialPhone, isPhoneVerified, registrationType }: PhoneBindFormProps) {
  const { toast } = useToast();
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: initialPhone || "",
      verificationCode: ""
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

  const onSubmit = async (data: FormValues) => {
    try {
      // TODO: 调用后端API验证手机号
      toast({
        title: "成功",
        description: registrationType === "phone_password" ? "手机号绑定成功" : "手机号更换成功"
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "错误",
        description: "操作失败，请重试"
      });
    }
  };

  // 如果是通过手机号+验证码注册且已验证，则显示已绑定状态
  if (registrationType === "phone_code" && isPhoneVerified) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">当前绑定手机号：{initialPhone}</p>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            // TODO: 实现更换手机号的逻辑
          }}
        >
          更换手机号
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
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
          control={form.control}
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
                    onClick={() => sendVerificationCode(form.getValues().phone)}
                  >
                    {countdown > 0 ? `${countdown}秒后重试` : "获取验证码"}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {registrationType === "phone_password" ? "绑定手机号" : "更换手机号"}
        </Button>
      </form>
    </Form>
  );
}