"use client";
import { useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import ArticleCard from "./ArticleCard";
import BackToTop from "@/components/ui/back-to-top";
import { Article } from "@/types/article";
import { Skeleton } from "@/components/ui/skeleton";
import { clientFetch } from '@/lib/fetch/clientFetch';
import { useRouter } from 'next/navigation';


// 骨架屏组件
function ArticleSkeleton() {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card flex">
      {/* 文章内容骨架屏 */}
      <div className="flex-1 p-6 space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-7 w-4/5 bg-muted" />
          <Skeleton className="h-5 w-2/3 bg-muted" />
        </div>

        <div className="flex gap-2">
          <Skeleton className="h-5 w-16 rounded-full bg-muted" />
          <Skeleton className="h-5 w-16 rounded-full bg-muted" />
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

      {/* 封面图片骨架屏 */}
      <div className="relative w-[240px] shrink-0">
        <Skeleton className="absolute inset-0 bg-muted" />
      </div>
    </div>
  );
}

// 骨架屏列表
function ArticleSkeletons() {
  return (
    <div className="flex flex-col gap-6">
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
  const router = useRouter();

  // 获取文章列表数据
  const fetchArticles = async (page: number): Promise<Article[]> => {
    const res = await clientFetch('/article/list', {
      method: 'POST',
      body: JSON.stringify({
        page,
        pageSize: 10,
      })
    });
    return res.data.items;
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["articles"],
    queryFn: ({ pageParam = 1 }) => fetchArticles(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 10 ? allPages.length : undefined;
    },
    initialPageParam: 1,
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
    <div ref={containerRef} className="article-list-container min-h-[calc(100vh-200px)] md:px-6">
      <div>
        {status === "pending" ? (
          <ArticleSkeletons />
        ) : (
          <div className="flex flex-col gap-6">
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
                      scale: 1.01,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary/20 to-primary/0 opacity-0 blur-sm group-hover:opacity-100 transition-all duration-500"
                      style={{ zIndex: -1 }}
                      
                    />
                    <div 
                      onClick={() => router.push(`/article/${article.id}`)} 
                      className="relative transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/5"
                    >
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
