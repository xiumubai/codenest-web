"use client";
import Link from "next/link";
import { LogIn } from "lucide-react";
import { Button } from "../ui/button";
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import UserAvatar from "../auth/UserAvatar";
import { useUserStore } from '@/store/user';
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const navItems = [
  { name: '首页', href: '/article' },
  // { name: '课程中心', href: '/courses' },
  { name: '问答社区', href: '/community' },
  { name: '渡劫秘籍', href: '/tutorial' },
];

export default function Header() {
  const router = useRouter();
  const { userInfo, logout } = useUserStore();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await logout()
      toast.success("退出成功");
      router.push("/auth/login");
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="sticky top-0 left-20 right-0 z-40 container mx-auto">
      <header
        className="relative"
      >
        <div className="flex h-16 items-center px-6">
          <Logo />
          <nav className="flex gap-6 ml-6">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href} prefetch>
                <span className={`relative transition-colors duration-300 font-semibold tracking-wide ${
                  pathname === item.href 
                  ? 'text-primary' 
                  : 'bg-clip-text hover:text-primary'
                }`}>
                  {item.name}
                </span>
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-4">
            {userInfo ? (
              <UserAvatar user={userInfo} onLogout={handleLogout} />
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
      </header>
    </div>
  );
}
