'use client'
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  Home,
  BookOpen,
  HelpCircle,
  MessageSquare,
  Settings,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useState } from "react";

const navItems = [
  {
    href: "/",
    label: "首页",
    icon: Home,
    exact: true
  },
  {
    href: "/community",
    label: "问答社区",
    icon: HelpCircle
  },
  {
    href: "/courses",
    label: "课程中心",
    icon: BookOpen
  },
  {
    href: "/chat",
    label: "对话",
    icon: MessageSquare
  },
  {
    href: "/settings",
    label: "设置",
    icon: Settings
  }
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string, exact = false) => {
    if (exact) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="relative flex h-full">
      <motion.aside 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className={`${isCollapsed ? 'w-20' : 'w-64'} border-r border-border bg-background p-4 transition-all duration-300`}
      >
        <div className="mb-8">
          <Link href="/" className="flex items-center justify-center gap-2">
            <motion.div
              className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-foreground flex items-center justify-center text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              CN
            </motion.div>
            <span className={`text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text whitespace-nowrap transition-all duration-300 ${isCollapsed ? 'opacity-0 max-w-0' : 'opacity-100 max-w-[200px]'}`}>
              CodeNest
            </span>
          </Link>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const active = isActive(item.href, item.exact);
            const Icon = item.icon;
            
            return (
              <Link 
                key={item.href}
                href={item.href} 
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition",
                  "hover:text-foreground hover:bg-accent",
                  active ? "text-foreground bg-accent" : "text-muted-foreground"
                )}
              >
                <Icon className="w-6 h-6 min-w-[24px]" />
                <span className={`whitespace-nowrap transition-all duration-300 ${isCollapsed ? 'opacity-0 max-w-0' : 'opacity-100 max-w-[200px]'}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </motion.aside>

      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-background border border-border text-muted-foreground hover:text-foreground transition-colors shadow-lg"
      >
        {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
      </button>
    </div>
  );
} 