'use client'
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { 
  Home,
  BookOpen,
  Users,
  MessageSquare,
  Settings,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useState } from "react";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="relative flex h-full">
      <motion.aside 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className={`${isCollapsed ? 'w-20' : 'w-64'} border-r border-border bg-background p-4 transition-all duration-300`}
      >
        <div className="mb-8">
          <Link href="/" className="flex items-center justify-center gap-2">
            <div className="relative w-8 h-8 flex-shrink-0">
              <Image 
                src="/logo.png" 
                alt="CodeNest Logo" 
                width={32} 
                height={32}
                className="rounded-lg"
              />
            </div>
            <span className={`text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text whitespace-nowrap transition-all duration-300 ${isCollapsed ? 'opacity-0 max-w-0' : 'opacity-100 max-w-[200px]'}`}>
              CodeNest
            </span>
          </Link>
        </div>

        <nav className="space-y-2">
          <Link 
            href="/" 
            className="flex items-center gap-3 px-3 py-2.5 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition"
          >
            <Home className="w-6 h-6 min-w-[24px]" />
            <span className={`whitespace-nowrap transition-all duration-300 ${isCollapsed ? 'opacity-0 max-w-0' : 'opacity-100 max-w-[200px]'}`}>
              首页
            </span>
          </Link>
          
          <Link 
            href="/courses" 
            className="flex items-center gap-3 px-3 py-2.5 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition"
          >
            <BookOpen className="w-6 h-6 min-w-[24px]" />
            <span className={`whitespace-nowrap transition-all duration-300 ${isCollapsed ? 'opacity-0 max-w-0' : 'opacity-100 max-w-[200px]'}`}>
              课程中心
            </span>
          </Link>
          
          <Link 
            href="/community" 
            className="flex items-center gap-3 px-3 py-2.5 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition"
          >
            <Users className="w-6 h-6 min-w-[24px]" />
            <span className={`whitespace-nowrap transition-all duration-300 ${isCollapsed ? 'opacity-0 max-w-0' : 'opacity-100 max-w-[200px]'}`}>
              社区
            </span>
          </Link>
          
          <Link 
            href="/chat" 
            className="flex items-center gap-3 px-3 py-2.5 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition"
          >
            <MessageSquare className="w-6 h-6 min-w-[24px]" />
            <span className={`whitespace-nowrap transition-all duration-300 ${isCollapsed ? 'opacity-0 max-w-0' : 'opacity-100 max-w-[200px]'}`}>
              对话
            </span>
          </Link>

          <Link 
            href="/settings" 
            className="flex items-center gap-3 px-3 py-2.5 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition"
          >
            <Settings className="w-6 h-6 min-w-[24px]" />
            <span className={`whitespace-nowrap transition-all duration-300 ${isCollapsed ? 'opacity-0 max-w-0' : 'opacity-100 max-w-[200px]'}`}>
              设置
            </span>
          </Link>
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