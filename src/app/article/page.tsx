"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Search } from "lucide-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchDialog from "@/components/search/SearchDialog";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    },
  },
});

const ArticleList = dynamic(() => import("@/components/article/ArticleList"), {
  ssr: false,
});

export default function Home() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // 处理快捷键
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-full">
      {/* 搜索组件 */}
      <SearchDialog
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-20"
      >
        <div className="flex flex-col items-center text-center gap-8">
          <motion.h1
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary/60 via-primary to-primary/90 text-transparent bg-clip-text"
          >
            CodeNest
          </motion.h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            打造属于你的代码乐园，让编程更简单
          </p>

          <div className="flex gap-4 mt-8">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="px-8 py-3 rounded-full border border-border hover:bg-accent hover:text-accent-foreground transition flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              搜索文章
              <kbd className="hidden md:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-2">
                <span className="text-xs">⌘</span>K
              </kbd>
            </button>
          </div>
        </div>
      </motion.section>

      {/* Articles Section */}
      <section className="py-10">
        <QueryClientProvider client={queryClient}>
          <ArticleList />
        </QueryClientProvider>
      </section>
    </div>
  );
}
