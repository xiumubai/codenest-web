"use client";
import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import LoginDialog from "../auth/LoginDialog";
import UserAvatar from "../auth/UserAvatar";
import { ThemeToggle } from "../theme/ThemeToggle";

export default function Header() {
  const [user, setUser] = useState<any>(null);

  const handleLoginSuccess = (userData: any) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-40 glass"
    >
      <div className="flex h-16 items-center px-6">
        <nav className="flex items-center gap-6">
          <Link
            href="/courses"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
          >
            课程
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
          </Link>
          <Link
            href="/projects"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
          >
            项目
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
          </Link>
          <Link
            href="/community"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
          >
            社区
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          {user ? (
            <UserAvatar user={user} onLogout={handleLogout} />
          ) : (
            <LoginDialog onLoginSuccess={handleLoginSuccess} />
          )}
        </div>
      </div>
    </motion.header>
  );
}
