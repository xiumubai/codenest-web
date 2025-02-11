"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import UserAvatar from "../auth/UserAvatar";
import { ThemeToggle } from "../theme/ThemeToggle";
import { Button } from "../ui/button";
import { LogIn } from "lucide-react";

export default function Header() {
  const [user, setUser] = useState<any>(null);

  const handleLogout = () => {
    setUser(null);
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
          <Link href="/" className="flex items-center gap-2 font-bold text-xl mr-8">
            <motion.div
              className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-foreground flex items-center justify-center text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              CN
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
