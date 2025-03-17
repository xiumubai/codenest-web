"use client";
import Link from "next/link";
import { LogIn, PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import UserAvatar from "../auth/UserAvatar";
import ModeToggle from './ModeToggle'
import { useUserStore } from '@/store/user';
import SearchBar from '../search/SearchBar';
const navItems = [
  { name: '首页', href: '/' },
  { name: '文章', href: '/articles' },
  { name: '问答', href: '/questions' },
];

export default function Header() {
  const { userInfo } = useUserStore();
  const pathname = usePathname();
  const returnUrl = encodeURIComponent(pathname);

  return (
    <header
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md"
    >
      <div className="container flex h-14 items-center">
        <div className="flex items-center gap-6 md:gap-8">
          <Logo />
          <nav className="hidden gap-6 md:flex">
            {navItems.map((item) => (
              <Link
                href={item.href}
                key={item.href}
                className={`text-sm transition-colors hover:text-foreground ${
                  pathname.startsWith(item.href) ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Link href="/ask-question">
            <Button size="sm" variant="outline" className="hidden md:flex gap-1">
              <PlusCircle className="h-4 w-4" />
              提问
            </Button>
          </Link>
          <SearchBar />
          <ModeToggle />
          {userInfo ? (
            <UserAvatar />
          ) : (
            <Link href={`/auth/login?returnUrl=${returnUrl}`} prefetch>
              <Button 
                size="sm"
                className="bg-primary/90 text-primary-foreground hover:bg-primary"
              >
                登录
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
