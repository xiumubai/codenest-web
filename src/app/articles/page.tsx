"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Flame, PenLine } from "lucide-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useUserStore } from "@/store/user";
import CategorySidebar from "@/components/article/CategorySidebar";

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

export default function Home() {
  const { userInfo } = useUserStore();
  const onTagSelect = (id: number | null) => {
    console.log(id);
  }
  return (
    <div className="min-h-full py-8 container">
      <div className="grid grid-cols-7 gap-4">
        {/* 左侧边栏 */}
        <div className="sticky top-8">
          <CategorySidebar onTagSelect={onTagSelect} />
        </div>
        {/* 中间文章列表 */}
        <div className="col-span-4 overflow-y-auto">
          {/* 文章列表 */}
          <QueryClientProvider client={queryClient}>
            <ArticleList />
          </QueryClientProvider>
        </div>

        {/* 右侧边栏 */}
        <div className="col-span-2 sticky top-8">
          {/* 问候语和写文章按钮 */}
          <div className="rounded-xl border bg-card p-4">
            <div className="mb-4">
              <h3 className="font-semibold text-lg mb-2">
                {userInfo ? `欢迎回来，${userInfo?.username}` : "👋 欢迎来到 CodeNest"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {userInfo ? "开始分享你的技术见解吧" : "登录后即可发布文章"}
              </p>
            </div>
            {userInfo ? (
              <Link href="/article/new">
                <Button className="w-full gap-2">
                  <PenLine className="w-4 h-4" />
                  写文章
                </Button>
              </Link>
            ) : (
              <Link href="/auth/login">
                <Button variant="outline" className="w-full">
                  登录
                </Button>
              </Link>
            )}
          </div>

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

          {/* 公众号 */}
          <div className="rounded-xl border bg-card p-4 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center gap-6">
              <div className="relative w-28 h-28 shrink-0 overflow-hidden ring-2 ring-border/10">
                <Image
                  src="/weixin.png"
                  alt="公众号二维码"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex-1 space-y-3">
                <h3 className="font-semibold text-lg text-foreground/90">白哥私人微信</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  欢迎添加白哥微信，邀你进群，一起学习技术，交流经验。
                </p>
              </div>
            </div>
          </div>

          {/* 联系信息 */}
          <div className="rounded-xl border bg-card p-4">
            <h3 className="font-semibold mb-3">联系我们</h3>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>邮箱：1547702880@qq.com</p>
              <p>微信：xiumubai01</p>
              <p>GitHub：github.com/xiumubai</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
