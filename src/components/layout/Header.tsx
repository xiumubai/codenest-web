"use client";
import Link from "next/link";
import { useState } from "react";
import { http } from "@/lib/http";
import { LogIn } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { deleteCookie } from 'cookies-next';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import UserAvatar from "../auth/UserAvatar";
import type { User } from "@/types/user";

const navItems = [
  { name: '首页', href: '/article' },
  { name: '课程中心', href: '/courses' },
  { name: '问答社区', href: '/community' },
];

export default function Header() {
  const [user, setUser] = useState<User | null>({
    id: 1,
    username: 'MockUser',
    phone: '1234567890',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=4',
  });
  const pathname = usePathname();

  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setUser(null);
        return;
      }
      const response = await fetch('/api/auth/user');
      if (!response.ok) {
        throw new Error('获取用户信息失败');
      }
      const data = await response.json();
      setUser(data.data || null);
    } catch (error) {
      console.error('Failed to fetch user info:', error);
      setUser(null);
    }
  };

  const handleLogout = async () => {
    try {
      await http.post('/api/auth/logout');
      localStorage.removeItem('token');
      deleteCookie('token');
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="sticky top-0 left-20 right-0 z-40">
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background/0 backdrop-blur-[1px]" />
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative bg-[#091221] backdrop-blur-xl shadow-sm"
      >
        <div className="flex h-16 items-center px-6">
          <Logo />
          <nav className="flex gap-6 ml-6">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href} prefetch>
                <span className={`relative transition-colors duration-300 font-semibold tracking-wide ${
                  pathname === item.href 
                  ? 'text-primary' 
                  : 'bg-gradient-to-r bg-clip-text hover:text-primary'
                } shadow-lg`}>
                  {item.name}
                  <span className="absolute left-0 bottom-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </span>
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-4">
            {user ? (
              <UserAvatar user={user} onLogout={handleLogout} />
            ) : (
              <Link href="/auth/login" prefetch>
                <Button 
                  size="sm"
                  className="gap-2 bg-primary text-primary-foreground shadow-sm hover:shadow-md hover:bg-primary/90 transition-all duration-300"
                >
                  <LogIn className="w-4 h-4" />
                  登录
                </Button>
              </Link>
            )}
          </div>
        </div>
      </motion.header>
    </div>
  );
}
