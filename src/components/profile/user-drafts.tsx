import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Clock } from "lucide-react"

const userDrafts = [
  {
    id: 101,
    title: "微服务架构：优势与挑战",
    excerpt: "微服务架构是一种将应用程序设计为一系列松散耦合的服务的方法...",
    category: "系统架构",
    lastEdited: "2023-05-20",
  },
  {
    id: 102,
    title: "JavaScript异步编程详解",
    excerpt: "JavaScript中的异步编程是处理非阻塞操作的一种方式...",
    category: "JavaScript",
    lastEdited: "2023-05-18",
  },
]

export function UserDrafts() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">草稿箱</h2>
        <Button>写新文章</Button>
      </div>
      {userDrafts.length > 0 ? (
        <div className="space-y-4">
          {userDrafts.map((draft) => (
            <Card key={draft.id}>
              <CardContent className="p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Badge variant="outline">{draft.category}</Badge>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>上次编辑: {draft.lastEdited}</span>
                  </div>
                </div>
                <Link href={`/editor/${draft.id}`}>
                  <h3 className="mb-2 line-clamp-1 text-xl font-semibold hover:text-primary">{draft.title}</h3>
                </Link>
                <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{draft.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <Button size="sm">继续编辑</Button>
                    <Button size="sm" variant="outline">
                      预览
                    </Button>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed">
          <p className="text-muted-foreground">您还没有保存任何草稿</p>
          <Button className="mt-4">开始写作</Button>
        </div>
      )}
    </div>
  )
}

