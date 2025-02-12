"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import UserAvatar from "../auth/UserAvatar";
import { ThemeToggle } from "../theme/ThemeToggle";
import { Button } from "../ui/button";
import { LogIn } from "lucide-react";
import { http } from "@/lib/http";
import type { User } from "@/types/user";

export default function Header() {
  const [user, setUser] = useState<User | null>(null);

  const fetchUserInfo = async () => {
    try {
      console.log('Token:', localStorage.getItem('token'));
      const { data } = await http.get<User>('/api/auth/info');
      setUser(data || null);
    } catch (error) {
      console.error('Failed to fetch user info:', error);
      setUser(null);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      fetchUserInfo();
    }
  }, []);

  const handleLogout = async () => {
    try {
      await http.post('/api/auth/logout');
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-40">
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background/0 backdrop-blur-[1px]" />
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative border-b bg-background/50 backdrop-blur-xl shadow-sm"
      >
        <div className="flex h-16 items-center px-6">
          <Link href="/" className="flex items-center gap-3 font-bold text-xl mr-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-9 h-9"
            >
              <Image
                src="/codenest-logo.svg"
                alt="CodeNest Logo"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary/80 to-primary text-transparent bg-clip-text whitespace-nowrap transition-all duration-300">
              CodeNest
            </span>
          </Link>

          <div className="ml-auto flex items-center gap-4">
            <ThemeToggle />
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
