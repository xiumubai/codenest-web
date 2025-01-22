'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Home, MessageCircle, BookOpen, User, ChevronLeft, ChevronRight } from 'lucide-react';
import SearchDialog from '@/components/search/SearchDialog';
import { useState } from 'react';

const navItems = [
  {
    name: "首页",
    href: "/",
    icon: Home,
    description: "发现优质内容"
  },
  {
    name: "问答社区",
    href: "/community",
    icon: MessageCircle,
    description: "技术问答交流"
  },
  {
    name: "课程中心",
    href: "/courses",
    icon: BookOpen,
    description: "精品课程学习"
  },
  {
    name: "我的主页",
    href: "/profile",
    icon: User,
    description: "个人主页管理"
  }
];

export default function Sidebar() {
  const pathname = usePathname();
  const [showSearch, setShowSearch] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="relative flex h-full">
      <motion.aside 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className={cn(
          "border-r border-border bg-background transition-all duration-300 shadow-[1px_0_10px_0_rgba(0,0,0,0.05)]",
          isCollapsed ? "w-20" : "w-64"
        )}
      >
        <div className="flex h-16 items-center gap-2 px-4">
          <Link href="/" className="flex items-center gap-2">
            <motion.div
              className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-foreground flex items-center justify-center text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              CN
            </motion.div>
            <span className={cn(
              "text-xl font-bold bg-gradient-to-r from-primary/80 to-primary text-transparent bg-clip-text whitespace-nowrap transition-all duration-300",
              isCollapsed ? "opacity-0 max-w-0" : "opacity-100 max-w-[200px]"
            )}>
              CodeNest
            </span>
          </Link>
        </div>

        <nav className="space-y-1 px-3 py-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors relative group",
                  isActive 
                    ? "bg-primary/5 text-primary" 
                    : "hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <div className={cn(
                  "p-2 rounded-md transition-colors",
                  isActive ? "bg-primary/10" : "bg-background group-hover:bg-accent/50"
                )}>
                  <Icon className="w-4 h-4" />
                </div>
                {!isCollapsed && (
                  <div className="flex flex-col gap-0.5 overflow-hidden">
                    <span className="text-sm font-medium whitespace-nowrap">{item.name}</span>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{item.description}</span>
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {!isCollapsed && (
          <div className="mt-4 px-3">
            <div className="rounded-lg bg-gradient-to-br from-primary/20 via-primary/10 to-transparent p-4">
              <h3 className="font-medium mb-2">开始创作</h3>
              <p className="text-sm text-muted-foreground">
                分享你的知识和经验，帮助他人成长。
              </p>
            </div>
          </div>
        )}
      </motion.aside>

      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-background border border-border text-muted-foreground hover:text-foreground transition-colors shadow-lg"
      >
        {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
      </button>

      <SearchDialog 
        isOpen={showSearch} 
        onClose={() => setShowSearch(false)} 
      />
    </div>
  );
} 