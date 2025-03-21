import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageSquare, ThumbsUp, Eye, MoreHorizontal, Check } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// 模拟用户问题数据
const userQuestions = [
  {
    id: 1,
    title: "如何在Next.js中实现服务端渲染的数据获取？",
    tags: ["Next.js", "React", "SSR", "数据获取"],
    createdAt: "2023-06-15",
    votes: 12,
    answers: 3,
    views: 156,
    solved: true,
  },
  {
    id: 2,
    title: "使用Tailwind CSS时如何自定义主题？",
    tags: ["Tailwind CSS", "CSS", "前端开发"],
    createdAt: "2023-06-10",
    votes: 6,
    answers: 2,
    views: 98,
    solved: false,
  },
  {
    id: 3,
    title: "React中useEffect的依赖数组如何正确使用？",
    tags: ["React", "Hooks", "JavaScript"],
    createdAt: "2023-06-05",
    votes: 8,
    answers: 4,
    views: 120,
    solved: false,
  },
]

export function UserQuestions() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">我的问题</h2>
        <Link href="/questions/ask">
          <Button>提出新问题</Button>
        </Link>
      </div>
      <div className="space-y-4">
        {userQuestions.map((question) => (
          <Card key={question.id}>
            <CardContent className="p-4">
              <div className="mb-2 flex flex-wrap gap-2">
                {question.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs font-normal">
                    {tag}
                  </Badge>
                ))}
                {question.solved && (
                  <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
                    <Check className="mr-1 h-3 w-3" />
                    已解决
                  </Badge>
                )}
              </div>
              <Link href={`/questions/${question.id}`}>
                <h3 className="mb-2 line-clamp-1 text-xl font-semibold hover:text-primary">{question.title}</h3>
              </Link>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">提问于 {question.createdAt}</div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <ThumbsUp className="h-4 w-4" />
                    <span>{question.votes}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MessageSquare className="h-4 w-4" />
                    <span>{question.answers}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Eye className="h-4 w-4" />
                    <span>{question.views}</span>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <Link href={`/questions/edit/${question.id}`}>
                        <DropdownMenuItem>编辑问题</DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem className="text-destructive">删除问题</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

