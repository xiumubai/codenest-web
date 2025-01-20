"use client";
import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import LoginDialog from "../auth/LoginDialog";
import UserAvatar from "../auth/UserAvatar";
import { ThemeToggle } from "../theme/ThemeToggle";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { PenLine, MessageCircle, ChevronDown } from "lucide-react";

export default function Header() {
  const [user, setUser] = useState<any>(null);

  const handleLoginSuccess = (userData: any) => {
    setUser(userData);
  };

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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  className="bg-gradient-to-r from-primary/90 to-primary shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:from-primary hover:to-primary/90 transition-all duration-300 gap-2"
                >
                  去创作
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-56 p-2 bg-background/80 backdrop-blur-xl border border-border/50 shadow-lg"
              >
                <Link href="/article/new">
                  <DropdownMenuItem className="flex items-center gap-3 px-4 py-3 cursor-pointer rounded-lg hover:bg-primary/10 hover:text-primary transition-colors group">
                    <div className="p-2 rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <PenLine className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-medium">写文章</span>
                      <span className="text-xs text-muted-foreground">分享你的技术见解</span>
                    </div>
                  </DropdownMenuItem>
                </Link>
                <Link href="/community/ask">
                  <DropdownMenuItem className="flex items-center gap-3 px-4 py-3 cursor-pointer rounded-lg hover:bg-primary/10 hover:text-primary transition-colors group mt-1">
                    <div className="p-2 rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <MessageCircle className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-medium">提问题</span>
                      <span className="text-xs text-muted-foreground">寻求开发者的帮助</span>
                    </div>
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
            <ThemeToggle />
            {user ? (
              <UserAvatar user={user} onLogout={handleLogout} />
            ) : (
              <LoginDialog onLoginSuccess={handleLoginSuccess} />
            )}
          </div>
        </div>
      </motion.header>
    </div>
  );
}
