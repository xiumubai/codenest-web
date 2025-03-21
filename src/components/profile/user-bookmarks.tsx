import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bookmark } from "lucide-react"

const bookmarkedArticles = [
  {
    id: 4,
    title: "使用Next.js和Tailwind CSS构建现代网站",
    excerpt: "Next.js和Tailwind CSS是构建现代网站的强大组合，本文将介绍如何使用这两个工具快速构建美观的网站...",
    category: "Web开发",
    author: "赵六",
    date: "2023-05-01",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 5,
    title: "数据结构与算法：从入门到精通",
    excerpt: "数据结构与算法是编程的基础，本文将带您从入门到精通，掌握常见的数据结构与算法...",
    category: "算法",
    author: "钱七",
    date: "2023-04-28",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export function UserBookmarks() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">我的收藏</h2>
      </div>
      {bookmarkedArticles.length > 0 ? (
        <div className="space-y-4">
          {bookmarkedArticles.map((article) => (
            <Card key={article.id}>
              <CardContent className="flex flex-col gap-4 p-4 md:flex-row">
                <div className="relative h-48 w-full shrink-0 md:h-32 md:w-48">
                  <Image
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    fill
                    className="rounded-md object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <Badge variant="secondary">{article.category}</Badge>
                    <span className="text-xs text-muted-foreground">{article.date}</span>
                  </div>
                  <Link href={`/articles/${article.id}`}>
                    <h3 className="mb-2 line-clamp-1 text-xl font-semibold hover:text-primary">{article.title}</h3>
                  </Link>
                  <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{article.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <span className="font-medium">{article.author}</span>
                    </div>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Bookmark className="h-4 w-4" />
                      <span>取消收藏</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed">
          <p className="text-muted-foreground">您还没有收藏任何文章</p>
          <Link href="/articles">
            <Button className="mt-4">浏览文章</Button>
          </Link>
        </div>
      )}
    </div>
  )
}

