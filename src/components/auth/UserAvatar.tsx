"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
    name: string;
    email: string;
    avatar: string;
  };
  onLogout: () => void;
}

export default function UserAvatar({ user, onLogout }: UserAvatarProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="relative h-8 w-8 rounded-full group"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <Avatar className="h-8 w-8 ring-2 ring-offset-2 ring-offset-background ring-transparent transition-all group-hover:ring-primary">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-primary-foreground">
                {user.name[0]}
              </AvatarFallback>
            </Avatar>
            <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-primary"></span>
            </span>
          </motion.div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
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