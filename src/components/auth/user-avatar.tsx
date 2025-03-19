"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User, Settings, Bell } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useUserStore } from '@/store/user';
import { toast } from "sonner";

export default function UserAvatar() {
  const router = useRouter();
  const { userInfo, logout } = useUserStore();
  const handleLogout = async () => {
    try {
      await logout()
      toast.success("退出成功");
      router.push("/auth/login");
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-3 cursor-pointer group px-2 py-1 rounded-full hover:bg-muted/60 transition-all duration-300">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Avatar className="w-8 h-8 ring-2 ring-background shadow-[0_0_0_2px] shadow-primary/20">
                <AvatarImage src={userInfo?.avatar} alt={userInfo?.username} />
              </Avatar>
            </motion.div>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-64 p-2 bg-background/95 backdrop-blur-sm border border-border/50 
          shadow-[0_4px_12px_-1px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.05)] 
          dark:shadow-[0_4px_12px_-1px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.05)]
          animate-in slide-in-from-top-2 duration-200
          rounded-xl"
        align="end" 
        forceMount
      >
        <DropdownMenuLabel className="p-2 bg-muted/50 rounded-lg mb-1">
          <div className="flex flex-col space-y-1.5">
            <p className="text-sm font-semibold">{userInfo?.username}</p>
            {/* <p className="text-xs text-muted-foreground">朽木白哥</p> */}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-border/50" />
        <div className="p-1">
          <DropdownMenuItem 
            className="flex items-center gap-2 p-2 cursor-pointer rounded-md group hover:bg-primary/5" 
            onClick={() => router.push('/profile')}
          >
            <div className="p-1.5 rounded-md bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
              <User className="w-4 h-4" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-medium">个人主页</span>
              <span className="text-xs text-muted-foreground">查看你的个人信息</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="flex items-center gap-2 p-2 cursor-pointer rounded-md group hover:bg-primary/5" 
            onClick={() => router.push('/profile/settings')}
          >
            <div className="p-1.5 rounded-md bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
              <Settings className="w-4 h-4" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-medium">设置</span>
              <span className="text-xs text-muted-foreground">个性化你的账户</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="flex items-center gap-2 p-2 cursor-pointer rounded-md group hover:bg-primary/5" 
            onClick={() => router.push('/profile/notifications')}
          >
            <div className="p-1.5 rounded-md bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
              <Bell className="w-4 h-4" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-medium">通知</span>
              <span className="text-xs text-muted-foreground">查看最新消息</span>
            </div>
          </DropdownMenuItem>
        </div>
        <DropdownMenuSeparator className="bg-border/50" />
        <div className="p-1">
          <DropdownMenuItem 
            onClick={handleLogout}
            className="flex items-center gap-2 p-2 cursor-pointer rounded-md group hover:bg-destructive/5"
          >
            <div className="p-1.5 rounded-md bg-destructive/10 text-destructive group-hover:bg-destructive/20 transition-colors">
              <LogOut className="w-4 h-4" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-medium text-destructive">退出登录</span>
              <span className="text-xs text-destructive">退出当前账号</span>
            </div>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}