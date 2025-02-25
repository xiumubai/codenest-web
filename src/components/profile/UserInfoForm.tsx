"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useUserStore } from "@/store/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { PlusCircle } from "lucide-react";
import { clientFetch } from '@/lib/fetch/clientFetch';


const formSchema = z.object({
  username: z.string().min(2, "昵称至少2个字符").max(20, "昵称最多20个字符"),
  avatar: z.string()
});

type FormValues = z.infer<typeof formSchema>;

export function UserInfoForm() {
  const [isChecking, setIsChecking] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { userInfo, setUserInfo } = useUserStore();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: userInfo?.username || "",
      avatar: userInfo?.avatar || ""
    }
  });

  const checkUsernameUnique = async (username: string) => {
    setIsChecking(true);
    try {
      // TODO: 调用后端API检查用户名唯一性
      const res = await clientFetch(`/user/check-username?username=${username}`);
      return res.data.isUnique;
    } catch (error) {
      console.error("检查用户名失败:", error);
      return false;
    } finally {
      setIsChecking(false);
    }
  };

  const handleAvatarUpload = async (file: File) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const data = await fetch('http://localhost:3001/api/upload/single', {
        method: 'POST',
        body: formData,
      });
      const res = await data.json();

      if (res.data.url) {
        form.setValue('avatar', res.data.url);
        toast.success("头像上传成功");
      }
    } catch (error) {
      toast.success("头像上传失败，请重试");

    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (data: FormValues) => {
    const isUnique = await checkUsernameUnique(data.username);
    console.log(isUnique);
    
    if (!isUnique) {
      toast.error("错误", {
        description: "该昵称已被使用，请更换其他昵称",
      });
      return;
    }

    try {
      const res = await clientFetch(`/user/update`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
      setUserInfo(res.data);
      toast.success('个人信息更新成功')
    } catch (error) {
      toast.error('个人信息更新失败')
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full max-w-2xl mx-auto">
        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>头像</FormLabel>
              <FormControl>
                <div className="flex items-center gap-6">
                  <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                    <Avatar className="w-20 h-20 shrink-0">
                      <AvatarImage src={field.value || "/default-avatar.png"} />
                      <AvatarFallback>头像</AvatarFallback>
                    </Avatar>
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                      <PlusCircle className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <input
                    type="hidden"
                    {...field}
                  />
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleAvatarUpload(file);
                      }
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>昵称</FormLabel>
              <FormControl>
                <Input {...field} placeholder="请输入新的昵称" className="w-full" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isChecking}>
          {isChecking ? "检查昵称中..." : "保存修改"}
        </Button>
      </form>
    </Form>
  );
}