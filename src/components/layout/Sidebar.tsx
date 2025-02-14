'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LayoutDashboard, LogOut } from 'lucide-react';
import { useState } from 'react';
import UserAvatar from '../auth/UserAvatar';
import { http } from '@/lib/http';
import type { User } from '@/types/user';
import { deleteCookie } from 'cookies-next';

const navItems = [
  {
    name: "工作台",
    href: "/workbench",
    icon: LayoutDashboard,
    description: "个人工作台管理"
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [user, setUser] = useState<User | null>({
    id: 1,
    username: 'MockUser',
    phone: '1234567890',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=4',
  });

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
    <div className="relative flex h-full">
      <motion.aside
        initial={{ width: '5.5rem' }}
        animate={{ width: isCollapsed ? '5.5rem' : '16rem' }}
        onMouseEnter={() => setIsCollapsed(false)}
        onMouseLeave={() => setIsCollapsed(true)}
        className={cn(
          "h-full border-border bg-[#091221] shadow-[1px_0_10px_0_rgba(0,0,0,0.05)]",
        )}
        transition={{ duration: 0.3 }}
      >
        <nav className="space-y-1 px-3 py-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                prefetch
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
                  "p-3 rounded-md transition-colors",
                  isActive ? "bg-primary/10" : "bg-background group-hover:bg-accent/50"
                )}>
                  <Icon className="w-6 h-6" />
                </div>
                {!isCollapsed && (
                  <div className="flex flex-col gap-0.5 overflow-hidden">
                    <span className="text-base font-medium whitespace-nowrap">{item.name}</span>
                    <span className="text-sm text-muted-foreground whitespace-nowrap">{item.description}</span>
                  </div>
                )}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-0 left-0 w-full px-3 py-3">
          {user && (
            <div className="gap-3">
              <div className="flex items-center gap-3 px-3 py-3 hover:bg-accent hover:text-accent-foreground rounded-lg cursor-pointer">
                <div className='py-3 px-3'>
                  <LogOut className="w-6 h-6" />
                </div>
                {!isCollapsed && (
                  <div className="flex flex-col gap-0.5 overflow-hidden">
                    <span className="text-base font-medium whitespace-nowrap">退出登录</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3 px-3 py-3 hover:bg-accent hover:text-accent-foreground rounded-lg">
                <UserAvatar user={user} onLogout={handleLogout} />
                {!isCollapsed && <span className="text-white">{user.username}</span>}
              </div>
            </div>
          )}
        </div>
      </motion.aside>
    </div>
  );
}
