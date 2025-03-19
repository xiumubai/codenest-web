"use client";
import Link from "next/link";
import { Menu, PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import { usePathname } from 'next/navigation';
import Logo from './logo';
import UserAvatar from "../auth/user-avatar";
import ModeToggle from './mode-toggle'
import { useUserStore } from '@/store/user';
import SearchBar from '../search/search-bar';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

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
              >
                登录
              </Button>
            </Link>
          )}

          {/* 移动端菜单按钮 */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%] sm:w-[350px]">
              <div className="flex flex-col h-full">
                <div className="flex-1 py-6">
                  <nav className="flex flex-col space-y-4">
                    {navItems.map((item) => (
                      <Link
                        href={item.href}
                        key={item.href}
                        className={`px-2 py-1 rounded-md hover:bg-muted ${
                          pathname.startsWith(item.href) ? "bg-muted font-medium" : ""
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
