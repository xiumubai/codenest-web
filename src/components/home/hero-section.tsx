import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
      <div className="space-y-6">
        <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
          探索 • 创作 • 分享
        </div>
        <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
          发现<span className="text-primary">创意</span>
          <br />
          分享<span className="text-primary">知识</span>
        </h1>
        <p className="text-xl text-muted-foreground">
          CodeNest 是一个让您可以自由表达、分享知识和连接志同道合的人的博客平台
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link href="/register">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              开始写作
            </Button>
          </Link>
          <Link href="/articles">
            <Button size="lg" variant="outline" className="gap-2 group">
              浏览文章
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
      <div className="relative hidden md:block">
        <div className="absolute -left-4 -top-4 h-72 w-72 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute -bottom-4 -right-4 h-72 w-72 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="relative z-10 grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="h-40 rounded-lg bg-card p-4 shadow-sm">
              <div className="h-4 w-3/4 rounded bg-muted"></div>
              <div className="mt-2 h-20 rounded bg-muted"></div>
              <div className="mt-2 flex justify-end">
                <div className="h-4 w-1/4 rounded bg-primary/20"></div>
              </div>
            </div>
            <div className="h-60 rounded-lg bg-card p-4 shadow-sm">
              <div className="h-4 w-3/4 rounded bg-muted"></div>
              <div className="mt-2 h-40 rounded bg-muted"></div>
              <div className="mt-2 flex justify-end">
                <div className="h-4 w-1/4 rounded bg-primary/20"></div>
              </div>
            </div>
          </div>
          <div className="space-y-4 pt-8">
            <div className="h-60 rounded-lg bg-card p-4 shadow-sm">
              <div className="h-4 w-3/4 rounded bg-muted"></div>
              <div className="mt-2 h-40 rounded bg-muted"></div>
              <div className="mt-2 flex justify-end">
                <div className="h-4 w-1/4 rounded bg-primary/20"></div>
              </div>
            </div>
            <div className="h-40 rounded-lg bg-card p-4 shadow-sm">
              <div className="h-4 w-3/4 rounded bg-muted"></div>
              <div className="mt-2 h-20 rounded bg-muted"></div>
              <div className="mt-2 flex justify-end">
                <div className="h-4 w-1/4 rounded bg-primary/20"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

