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
      className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75"
    >
      <div className="flex h-16 items-center px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-6">
          <Link
            href="/courses"
            className="text-sm text-muted-foreground hover:text-foreground transition"
          >
            课程
          </Link>
          <Link
            href="/projects"
            className="text-sm text-muted-foreground hover:text-foreground transition"
          >
            项目
          </Link>
          <Link
            href="/community"
            className="text-sm text-muted-foreground hover:text-foreground transition"
          >
            社区
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
