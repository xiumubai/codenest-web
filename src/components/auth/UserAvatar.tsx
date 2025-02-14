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

interface UserAvatarProps {
  user: {
    username: string;
    avatar: string;
  };
  onLogout: () => void;
}

export default function UserAvatar({ user, onLogout }: UserAvatarProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative h-12 w-12 rounded-full group cursor-pointer">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <Avatar className="h-12 w-12 ring-4 ring-offset-2">
              <AvatarImage src={user.avatar} alt={user.username} />
            </Avatar>
          </motion.div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.username}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer group">
          <User className="mr-2 h-4 w-4 group-hover:text-primary group-hover:animate-bounce" />
          <span>个人资料</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer group">
          <Settings className="mr-2 h-4 w-4 group-hover:text-primary group-hover:animate-spin" />
          <span>设置</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer group">
          <Bell className="mr-2 h-4 w-4 group-hover:text-primary group-hover:animate-shake" />
          <span>通知</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={onLogout}
          className="cursor-pointer text-destructive focus:text-destructive group"
        >
          <LogOut className="mr-2 h-4 w-4 group-hover:animate-slide-right" />
          <span>退出登录</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 