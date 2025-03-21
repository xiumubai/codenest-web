import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"

// 模拟点赞数据
const likes = [
  {
    id: 1,
    type: "article",
    title: "深入理解JavaScript的原型链",
    author: "Jane Smith",
    date: "2023-06-20",
    tags: ["JavaScript", "编程基础"],
  },
  {
    id: 2,
    type: "question",
    title: "如何在React中实现无限滚动？",
    author: "John Doe",
    date: "2023-06-19",
    tags: ["React", "性能优化"],
  },
  // 添加更多点赞项...
]

export function UserLikes({ username }: { username: string }) {
  return (
    <div className="space-y-6">
      {likes.map((like) => (
        <Card key={like.id}>
          <CardContent className="p-6">
            <div className="mb-2 flex items-center justify-between">
              <Badge variant="outline">{like.type === "article" ? "文章" : "问题"}</Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-1 h-4 w-4" />
                {like.date}
              </div>
            </div>
            <Link href={`/${like.type}s/${like.id}`}>
              <h2 className="mb-2 text-xl font-bold hover:text-primary">{like.title}</h2>
            </Link>
            <p className="mb-4 text-sm text-muted-foreground">作者: {like.author}</p>
            <div className="flex flex-wrap gap-2">
              {like.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

