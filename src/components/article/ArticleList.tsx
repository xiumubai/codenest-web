"use client";
import { useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import ArticleCard from "./ArticleCard";
import BackToTop from "@/components/ui/back-to-top";
import { Article } from "@/types/article";
import { Skeleton } from "@/components/ui/skeleton";

// 骨架屏组件
function ArticleSkeleton() {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card">
      {/* 封面图片骨架屏 */}
      <div className="relative aspect-[2/1] overflow-hidden">
        <Skeleton className="h-full w-full bg-muted" />
        <div className="absolute bottom-4 left-4 flex gap-2">
          <Skeleton className="h-5 w-16 rounded-full bg-muted" />
          <Skeleton className="h-5 w-16 rounded-full bg-muted" />
        </div>
      </div>

      {/* 文章内容骨架屏 */}
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-7 w-4/5 bg-muted" />
          <Skeleton className="h-5 w-2/3 bg-muted" />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-full bg-muted" />
            <div>
              <Skeleton className="h-4 w-16 mb-1 bg-muted" />
              <Skeleton className="h-3 w-20 bg-muted" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Skeleton className="h-3 w-12 bg-muted" />
            <Skeleton className="h-3 w-12 bg-muted" />
          </div>
        </div>
      </div>
    </div>
  );
}

// 骨架屏列表
function ArticleSkeletons() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <ArticleSkeleton />
        </motion.div>
      ))}
    </div>
  );
}

// 生成头像URL的函数
function getAvatarUrl(name: string) {
  // 使用 DiceBear API 生成头像
  // 支持多种风格：avataaars, bottts, pixel-art, identicon 等
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`;
}

// 模拟获取文章列表数据
const fetchArticles = async (page: number): Promise<Article[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  const authors = [
    { id: 1, name: "张三" },
    { id: 2, name: "李四" },
    { id: 3, name: "王五" },
    { id: 4, name: "赵六" },
  ];
  
  return Array.from({ length: 6 }, (_, i) => {
    const author = authors[Math.floor(Math.random() * authors.length)];
    return {
      id: page * 6 + i + 1,
      title: `文章标题 ${page * 6 + i + 1}`,
      description: "这是一段文章描述，介绍了文章的主要内容和核心观点。",
      content: "文章内容",
      cover: `https://picsum.photos/800/400?random=${page * 6 + i + 1}`,
      category: "技术",
      readingTime: "5 min",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: Math.floor(Math.random() * 1000),
      likes: Math.floor(Math.random() * 100),
      author: {
        id: author.id,
        name: author.name,
        avatar: getAvatarUrl(author.name),
      },
      tags: ["前端", "React", "Next.js"],
    };
  });
};

// 加载动画组件
function LoadingDots() {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-primary"
          initial={{ y: 0 }}
          animate={{ 
            y: [-8, 0],
            scale: [1, 0.8, 1]
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut"
          }}
        />
      ))}
      <motion.span
        className="ml-3 text-sm text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        加载更多文章
      </motion.span>
    </div>
  );
}

export default function ArticleList() {
  const { ref, inView } = useInView();
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["articles"],
    queryFn: ({ pageParam = 0 }) => fetchArticles(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 6 ? allPages.length : undefined;
    },
    initialPageParam: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (status === "error") {
    return (
      <div className="flex items-center justify-center h-[200px] text-muted-foreground">
        加载失败: {error.message}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="article-list-container min-h-[calc(100vh-200px)] px-4 md:px-6">
      <div className="py-6">
        {status === "pending" ? (
          <ArticleSkeletons />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.pages.map((group, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="contents"
              >
                {group.map((article) => (
                  <motion.div
                    key={article.id}
                    layout
                    className="relative group"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ 
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary/20 to-primary/0 opacity-0 blur-sm group-hover:opacity-100 transition-all duration-500"
                      style={{ zIndex: -1 }}
                    />
                    <div className="relative transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/5">
                      <ArticleCard article={article} />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* 加载更多 */}
      <div
        ref={ref}
        className="flex items-center justify-center py-8"
      >
        {isFetchingNextPage && <LoadingDots />}
      </div>

      <BackToTop />
    </div>
  );
} 