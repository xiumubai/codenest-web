"use client";
import Link from "next/link";
import { LogIn } from "lucide-react";
import { Button } from "../ui/button";
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import UserAvatar from "../auth/UserAvatar";
import { useUserStore } from '@/store/user';
import SearchBar from '../search/SearchBar';
const navItems = [
  { name: '文章', href: '/article' },
  // { name: '课程中心', href: '/courses' },
  { name: '问答社区', href: '/community' },
  { name: '渡劫秘籍', href: '/tutorial' },
];

export default function Header() {
  const { userInfo } = useUserStore();
  const pathname = usePathname();
  const returnUrl = encodeURIComponent(pathname);

  return (
    <div className="sticky top-0 left-20 right-0 z-40 shadow-sm bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <header
        className="relative container mx-auto"
      >
        <div className="flex h-16 items-center">
          <Logo />
          
          <div className="ml-auto flex items-center gap-4">
            <SearchBar />
            <nav className="flex gap-6 mr-6">
              {navItems.map((item) => (
                <Link key={item.name} href={item.href} prefetch>
                  <span className={`relative duration-300 font-mono font-medium tracking-wide ${
                    pathname === item.href 
                    ? 'text-primary'
                    : 'bg-clip-text hover:text-primary'
                  }`}>
                    {item.name}
                  </span>
                </Link>
              ))}
            </nav>
            {userInfo ? (
              <UserAvatar />
            ) : (
              <Link href={`/auth/login?returnUrl=${returnUrl}`} prefetch>
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
      </header>
    </div>
  );
}
