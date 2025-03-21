import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Eye, MessageSquare, Heart } from "lucide-react"

const userArticles = [
  {
    id: 1,
    title: "如何提高编程效率：10个实用技巧",
    excerpt: "在这篇文章中，我们将分享10个可以立即提高您编程效率的实用技巧...",
    category: "编程技巧",
    date: "2023-05-15",
    image: "/placeholder.svg?height=200&width=300",
    views: 1245,
    comments: 32,
    likes: 128,
  },
  {
    id: 2,
    title: "2023年最值得学习的编程语言",
    excerpt: "随着技术的不断发展，哪些编程语言在2023年最值得学习？本文将为您解答...",
    category: "编程语言",
    date: "2023-05-10",
    image: "/placeholder.svg?height=200&width=300",
    views: 982,
    comments: 24,
    likes: 95,
  },
  {
    id: 3,
    title: "从零开始学习React：完整指南",
    excerpt: "React是目前最流行的前端框架之一，本文将带您从零开始学习React的基础知识...",
    category: "前端开发",
    date: "2023-05-05",
    image: "/placeholder.svg?height=200&width=300",
    views: 1567,
    comments: 45,
    likes: 210,
  },
]

export function UserArticles() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">我的文章</h2>
        <Button>写新文章</Button>
      </div>
      <div className="space-y-4">
        {userArticles.map((article) => (
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
                  <div className="flex gap-4">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Eye className="h-4 w-4" />
                      <span>{article.views}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MessageSquare className="h-4 w-4" />
                      <span>{article.comments}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Heart className="h-4 w-4" />
                      <span>{article.likes}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

