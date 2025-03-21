'use client';
import { Button } from "@/components/ui/button"
import { FeaturedPosts } from "@/components/home/featured-posts"
import { HeroSection } from "@/components/home/hero-section"
import { RecentPosts } from "@/components/home/recent-posts"
import { CategoryList } from "@/components/home/category-list"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* 全宽英雄区域 */}
      <section className="relative from-primary/10 to-background pb-20 pt-16">
        <div className="container">
          <HeroSection />
        </div>
        <div className="absolute -bottom-10 left-0 right-0 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-bounce"
            >
              <path d="M12 5v14" />
              <path d="m19 12-7 7-7-7" />
            </svg>
          </div>
        </div>
      </section>

      {/* 精选文章 - 水平滚动 */}
      <section className="py-20">
        <div className="container mb-8">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-semibold">精选文章</h2>
              <p className="mt-2 text-muted-foreground">探索我们精心挑选的高质量文章</p>
            </div>
            <Link href="/articles" className="group flex items-center gap-1 text-primary">
              查看全部
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent z-10"></div>
          <div className="container-fluid overflow-x-auto pb-6 no-scrollbar">
            <div className="flex w-max gap-6 px-20">
              <FeaturedPosts />
            </div>
          </div>
        </div>
      </section>

      {/* 分类和最新文章 - 交错布局 */}
      <section className="bg-muted/30 py-20">
        <div className="container">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-12">
            {/* 分类 */}
            <div className="md:col-span-4 md:order-last">
              <div className="sticky top-20 space-y-8">
                <div className="rounded-xl border bg-card p-6 shadow-sm">
                  <h3 className="mb-4 text-xl font-semibold">分类</h3>
                  <CategoryList />
                </div>
                <div className="rounded-xl border bg-gradient-to-br from-primary/10 to-background p-6 shadow-sm">
                  <h3 className="mb-4 text-xl font-semibold">加入我们</h3>
                  <p className="mb-4 text-muted-foreground">注册账号，开始您的写作之旅</p>
                  <Link href="/register">
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">立即注册</Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* 最新文章 */}
            <div className="md:col-span-8">
              <div className="mb-8">
                <h2 className="text-3xl font-semibold">最新文章</h2>
                <p className="mt-2 text-muted-foreground">查看我们平台上最新发布的内容</p>
              </div>
              <RecentPosts />
            </div>
          </div>
        </div>
      </section>

      {/* 统计数据 */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <div className="rounded-xl border bg-card p-6 text-center">
              <div className="text-4xl font-bold text-primary">1.2k+</div>
              <div className="mt-2 text-muted-foreground">文章</div>
            </div>
            <div className="rounded-xl border bg-card p-6 text-center">
              <div className="text-4xl font-bold text-primary">5k+</div>
              <div className="mt-2 text-muted-foreground">用户</div>
            </div>
            <div className="rounded-xl border bg-card p-6 text-center">
              <div className="text-4xl font-bold text-primary">15k+</div>
              <div className="mt-2 text-muted-foreground">评论</div>
            </div>
            <div className="rounded-xl border bg-card p-6 text-center">
              <div className="text-4xl font-bold text-primary">3.5k+</div>
              <div className="mt-2 text-muted-foreground">分享</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

