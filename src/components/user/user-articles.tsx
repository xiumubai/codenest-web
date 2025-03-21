"use client"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, MessageSquare, ThumbsUp, Calendar } from "lucide-react"

// 模拟文章数据
const articles = [
  {
    id: 1,
    title: "如何优化React应用的性能",
    excerpt: "本文将介绍一些优化React应用性能的实用技巧，包括使用React.memo、useMemo和useCallback等...",
    date: "2023-06-15",
    tags: ["React", "性能优化", "JavaScript"],
    views: 1234,
    likes: 56,
    comments: 23,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "TypeScript高级技巧：类型体操实战",
    excerpt: "探索TypeScript的高级类型系统，学习如何编写复杂的类型定义，提高代码的类型安全性...",
    date: "2023-06-10",
    tags: ["TypeScript", "高级技巧", "类型系统"],
    views: 987,
    likes: 45,
    comments: 18,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "Next.js 13新特性详解",
    excerpt: "Next.js 13带来了许多激动人心的新特性，包括新的App Router、服务器组件和Turbopack等...",
    date: "2023-05-28",
    tags: ["Next.js", "React", "Web开发"],
    views: 1567,
    likes: 78,
    comments: 32,
    image: "/placeholder.svg?height=200&width=300",
  },
]

interface UserArticlesProps {
  isEditing: boolean
  theme: string
}

export function UserArticles({ isEditing, theme }: UserArticlesProps) {
  // 根据主题获取卡片样式
  const getCardStyle = () => {
    switch (theme) {
      case "minimal":
        return "bg-white dark:bg-gray-800 shadow-sm"
      case "gradient":
        return "bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg"
      case "synthwave":
        return "bg-purple-800/80 text-white backdrop-blur-md shadow-lg border-pink-500"
      case "nature":
        return "bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg border-green-500"
      case "tech":
        return "bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg border-blue-500"
      default:
        return ""
    }
  }

  return (
    <Card className={getCardStyle()}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">文章</h2>
          {isEditing && (
            <Link href="/articles/new">
              <Button>写文章</Button>
            </Link>
          )}
        </div>

        <div className="space-y-6">
          {articles.map((article) => (
            <div key={article.id} className="flex flex-col md:flex-row gap-4 pb-6 border-b last:border-b-0 last:pb-0">
              <div className="relative h-48 md:h-32 md:w-48 w-full shrink-0 rounded-lg overflow-hidden">
                <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 mb-2">
                  {article.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Link href={`/articles/${article.id}`}>
                  <h3 className="text-xl font-semibold mb-2 hover:text-primary">{article.title}</h3>
                </Link>
                <p className="text-muted-foreground mb-3 line-clamp-2">{article.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-1 h-4 w-4" />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Eye className="h-4 w-4" />
                      <span>{article.views}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <ThumbsUp className="h-4 w-4" />
                      <span>{article.likes}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MessageSquare className="h-4 w-4" />
                      <span>{article.comments}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {articles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">暂无文章</p>
            {isEditing && (
              <Link href="/articles/new">
                <Button>写第一篇文章</Button>
              </Link>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

