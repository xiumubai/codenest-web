"use client";
import { useEffect, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Article } from "@/types/article";
import { generateMockArticles } from "@/lib/mock/articles";
import { Loader2 } from "lucide-react";
import ArticleCard from "./ArticleCard";

const PAGE_SIZE = 10;
const CARD_GAP = 24; // 减小卡片间距
const CARD_HEIGHT = 420; // 更新卡片高度

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
    estimateSize: () => CARD_HEIGHT + CARD_GAP, // 卡片高度 + 间距
    overscan: 5,
  });

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [entry?.isIntersecting, fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (status === "pending") {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  if (status === "error") {
    return <div className="min-h-[500px] flex items-center justify-center">加载失败</div>;
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
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      )}
    </div>
  );
} 