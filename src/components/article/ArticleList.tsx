"use client";
import { useEffect, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Article } from "@/types/article";
import { generateMockArticles } from "@/lib/mock/articles";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import ArticleCard from "./ArticleCard";

const PAGE_SIZE = 10;
const CARD_GAP = 24;
const CARD_HEIGHT = 420;

function ArticleSkeletons() {
  return (
    <div className="article-list-container min-h-[calc(100vh-200px)] overflow-auto px-4 md:px-6">
      <div className="grid gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: i * 0.1 }}
            className="relative overflow-hidden rounded-xl border border-border bg-card"
          >
            <div className="relative">
              <Skeleton className="h-[200px] w-full bg-muted" />
              {/* 标签 */}
              <div className="absolute bottom-4 left-4 flex gap-2">
                <Skeleton className="h-6 w-16 rounded-full bg-muted" />
                <Skeleton className="h-6 w-20 rounded-full bg-muted" />
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-3">
                <Skeleton className="h-7 w-3/4 bg-muted" />
                <Skeleton className="h-5 w-1/2 bg-muted" />
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-10 w-10 rounded-full bg-muted" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24 bg-muted" />
                    <Skeleton className="h-3 w-16 bg-muted" />
                  </div>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <Skeleton className="h-4 w-12 bg-muted" />
                  <Skeleton className="h-4 w-12 bg-muted" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

type ArticleResponse = {
  items: Article[];
  nextCursor: number | null;
};

async function fetchArticles(pageParam: number): Promise<ArticleResponse> {
  // 模拟API延迟
  await new Promise(resolve => setTimeout(resolve, 1000));
  const items = generateMockArticles(PAGE_SIZE);
  
  // 模拟只有5页数据
  const nextCursor = pageParam < 4 ? pageParam + 1 : null;
  
  return {
    items,
    nextCursor,
  };
}

export default function ArticleList() {
  const parentRef = useRef<HTMLDivElement>(null);
  const [rootRef, entry] = useIntersectionObserver();
  
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    isFetching
  } = useInfiniteQuery({
    queryKey: ["articles"],
    queryFn: async ({ pageParam }) => {
      return fetchArticles(pageParam as number);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.nextCursor;
    },
  });

  const allArticles = data?.pages.flatMap(page => page.items) ?? [];

  const rowVirtualizer = useVirtualizer({
    count: allArticles.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => CARD_HEIGHT + CARD_GAP,
    overscan: 5,
  });

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [entry?.isIntersecting, fetchNextPage, hasNextPage, isFetchingNextPage]);

  // 显示骨架屏的条件：
  // 1. 初始加载状态
  // 2. 或者数据加载成功但还在获取中（不包括加载更多的情况）
  if (status === "pending" || (status === "success" && isFetching && !isFetchingNextPage)) {
    return <ArticleSkeletons />;
  }

  if (status === "error") {
    return (
      <div className="min-h-[500px] flex items-center justify-center text-muted-foreground">
        加载失败，请稍后重试
      </div>
    );
  }

  return (
    <div
      ref={parentRef}
      className="article-list-container min-h-[calc(100vh-200px)] overflow-auto px-4 md:px-6"
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
          paddingTop: CARD_GAP / 2,
          paddingBottom: CARD_GAP / 2,
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const article = allArticles[virtualRow.index];
          return (
            <div
              key={virtualRow.index}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: CARD_HEIGHT,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <ArticleCard article={article} />
            </div>
          );
        })}
      </div>
      {hasNextPage && (
        <div ref={rootRef} className="flex justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      )}
    </div>
  );
} 