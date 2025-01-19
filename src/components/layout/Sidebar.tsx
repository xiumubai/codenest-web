'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchDialog from '@/components/search/SearchDialog';
import { useState } from 'react';

export default function Sidebar() {
  const pathname = usePathname();
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="w-[280px] flex-shrink-0 hidden lg:block">
      <div className="h-full glass border-r">
        <div className="flex h-16 items-center gap-2 px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <motion.div
              className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-foreground flex items-center justify-center text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              CN
            </motion.div>
            CodeNest
          </Link>
        </div>

        <div className="px-4 py-3">
          <Button
            variant="outline"
            className="w-full justify-start text-muted-foreground hover:text-foreground gap-2"
            onClick={() => setShowSearch(true)}
          >
            <Search className="w-4 h-4" />
            搜索文章...
            <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>
        </div>

        <nav className="space-y-1 px-3">
          <Link
            href="/article/new"
            className={cn(
              "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
              "hover:bg-accent hover:text-accent-foreground",
              pathname === '/article/new' && "bg-primary/10 text-primary"
            )}
          >
            写文章
          </Link>
          <Link
            href="/drafts"
            className={cn(
              "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
              "hover:bg-accent hover:text-accent-foreground",
              pathname === '/drafts' && "bg-primary/10 text-primary"
            )}
          >
            草稿箱
          </Link>
        </nav>

        <div className="mt-4 px-3">
          <div className="rounded-lg bg-gradient-to-br from-primary/20 via-primary/10 to-transparent p-4">
            <h3 className="font-medium mb-2">开始创作</h3>
            <p className="text-sm text-muted-foreground">
              分享你的知识和经验，帮助他人成长。
            </p>
          </div>
        </div>
      </div>

      <SearchDialog 
        isOpen={showSearch} 
        onClose={() => setShowSearch(false)} 
      />
    </div>
  );
} 