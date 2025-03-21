"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, MessageSquare, Share2, Bookmark, Copy } from "lucide-react"
import { AuthorCard } from "@/components/article/author-card"
import { clientFetch } from "@/lib/fetch/clientFetch";
import { ArticleViewer } from "@/components/editor/article-viewer";
import type { Article } from "@/types/article";

// 提取文章H2标题
const extractHeadings = (content: string) => {
  // 解析文章内容中的标题生成大纲
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, "text/html");
  const headings = Array.from(doc.querySelectorAll("h1, h2, h3"));

  // 为每个标题添加 id
  headings.forEach((heading, index) => {
    const id = `heading-${index}`;
    heading.id = id;
  });

  const outlineData = headings.map((heading, index) => ({
    id: `heading-${index}`,
    title: heading.textContent || "",
    level: parseInt(heading.tagName[1]),
  }));

  return outlineData
}

export function ArticleDetail({ articleId }: { articleId: string }) {
  const [progress, setProgress] = useState(0)
  const [activeHeading, setActiveHeading] = useState("")
  const [article, setArticle] = useState<Article | null>(null);
  const [headings, setHeadings] = useState<{ id: string; title: string }[]>([]);
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await clientFetch(`/article/${articleId}`);
        setArticle(res.data);
        setHeadings(extractHeadings(res.data.content));
      } catch (error) {
        console.error("获取文章失败:", error);
      }
    };

    fetchArticle();
  }, [articleId]);

  // 处理滚动事件，更新阅读进度
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight
      const currentProgress = (window.scrollY / totalHeight) * 100
      setProgress(currentProgress)

      // 更新当前活动标题
      const headingElements = document.querySelectorAll("h2[id]")
      for (let i = headingElements.length - 1; i >= 0; i--) {
        const element = headingElements[i]
        const rect = element.getBoundingClientRect()
        if (rect.top <= 100) {
          setActiveHeading(element.id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // 复制链接功能
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    alert("链接已复制到剪贴板")
  }

  return (
    <div className="relative">
      {/* 阅读进度条 */}
      <div className="fixed top-0 left-0 z-50 h-1 bg-primary" style={{ width: `${progress}%` }}></div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
        {/* 侧边栏目录 */}
        <div className="hidden md:col-span-3 md:block">
          <div className="sticky top-20 space-y-6">
            <div className="space-y-8">
              <AuthorCard />
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="mb-3 text-sm font-semibold uppercase text-muted-foreground">目录</h4>
              <nav className="space-y-1">
                {headings.map((heading) => (
                  <a
                    key={heading.id}
                    href={`#${heading.id}`}
                    className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                      activeHeading === heading.id ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted"
                    }`}
                  >
                    {heading.title}
                  </a>
                ))}
              </nav>
            </div>

            <div className="flex flex-col gap-2">
              <Button variant="outline" size="sm" className="justify-start gap-2" onClick={copyLink}>
                <Copy className="h-4 w-4" />
                复制链接
              </Button>
              <Button variant="outline" size="sm" className="justify-start gap-2">
                <Heart className="h-4 w-4" />
                喜欢 ({article?.likeCount})
              </Button>
              <Button variant="outline" size="sm" className="justify-start gap-2">
                <Bookmark className="h-4 w-4" />
                收藏
              </Button>
              <Button variant="outline" size="sm" className="justify-start gap-2">
                <Share2 className="h-4 w-4" />
                分享
              </Button>
            </div>
          </div>
        </div>

        {/* 主要内容 */}
        <div className="md:col-span-9">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="text-xs font-normal">
                {article?.tag?.name}
              </Badge>
            </div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{article?.title}</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <Image
                    src={article?.author?.avatar || "/placeholder.svg"}
                    alt={article?.author?.username || 'avatar'}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium">{article?.author?.username}</div>
                  <div className="text-sm text-muted-foreground">
                    {article?.createdAt ? formatDate(article.createdAt) : ''}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative my-8 h-[300px] w-full overflow-hidden rounded-lg md:h-[400px]">
            <Image src={article?.cover || "/placeholder.svg"} alt={article?.title || 'cover'} fill className="object-cover" />
          </div>

          {/* 文章内容 */}
          <ArticleViewer content={article?.content || ''} />

          {/* 移动端操作栏 */}
          <div className="mt-8 flex items-center justify-between rounded-lg border p-4 md:hidden">
            <div className="flex gap-4">
              <Button variant="ghost" size="sm" className="flex items-center gap-1 p-2">
                <Heart className="h-5 w-5" />
                <span>{article?.likeCount}</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-1 p-2">
                <MessageSquare className="h-5 w-5" />
                <span>{article?.commentCount}</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-1 p-2">
                <Share2 className="h-5 w-5" />
                <span>{article?.viewCount}</span>
              </Button>
            </div>
            <Button variant="outline" size="sm" className="flex items-center gap-1 p-2">
              <Bookmark className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

