"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Flame, Clock, ThumbsUp, BookMarked } from "lucide-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

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

const hotArticles = [
  {
    title: "深入理解 React 18 新特性",
    views: "12.5k",
    image: "/images/articles/react18.png"
  },
  {
    title: "TypeScript 5.0 完全指南",
    views: "8.3k",
    image: "/images/articles/typescript.png"
  },
  {
    title: "Next.js 13 服务端组件实战",
    views: "6.7k",
    image: "/images/articles/nextjs.png"
  }
];

const categories = [
  { name: "全部", value: "all" },
  { name: "前端", value: "frontend" },
  { name: "后端", value: "backend" },
  { name: "移动端", value: "mobile" },
  { name: "人工智能", value: "ai" },
  { name: "运维", value: "ops" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("newest");

  return (
    <div className="min-h-full py-8">
      <div className="grid grid-cols-4 gap-6 mt-8">
        {/* 左侧边栏 */}
        <div className="col-span-1 space-y-6">
          {/* 分类导航 */}
          <div className="rounded-xl border bg-card p-4">
            <h3 className="font-semibold mb-3">分类导航</h3>
            <div className="space-y-1">
              {categories.map((category) => (
                <Button
                  key={category.value}
                  variant="ghost"
                  className="w-full justify-start"
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* 中间文章列表 */}
        <div className="col-span-2 space-y-6">
          {/* 排序选项 */}
          <Tabs defaultValue={activeTab} className="w-full" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="newest" className="gap-2">
                <Clock className="w-4 h-4" />
                最新
              </TabsTrigger>
              <TabsTrigger value="hottest" className="gap-2">
                <Flame className="w-4 h-4" />
                最热
              </TabsTrigger>
              <TabsTrigger value="recommended" className="gap-2">
                <ThumbsUp className="w-4 h-4" />
                推荐
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* 文章列表 */}
          <QueryClientProvider client={queryClient}>
            <ArticleList />
          </QueryClientProvider>
        </div>

        {/* 右侧边栏 */}
        <div className="col-span-1 space-y-6">
          {/* 热门文章 */}
          <div className="rounded-xl border bg-card p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Flame className="w-4 h-4 text-primary" />
              热门文章
            </h3>
            <div className="space-y-4">
              {hotArticles.map((article, index) => (
                <div key={index} className="flex gap-3 group cursor-pointer">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-110 transition"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium group-hover:text-primary transition line-clamp-2">
                      {article.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {article.views} 阅读
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 收藏夹 */}
          <div className="rounded-xl border bg-card p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <BookMarked className="w-4 h-4 text-primary" />
              我的收藏
            </h3>
            <Button variant="outline" className="w-full">
              登录查看收藏
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
