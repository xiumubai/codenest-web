import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ThumbsUp, MoreHorizontal, Check } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// 模拟用户回答数据
const userAnswers = [
  {
    id: 1,
    questionId: 5,
    questionTitle: "如何在Docker中部署Node.js应用？",
    createdAt: "2023-06-18",
    votes: 7,
    accepted: true,
  },
  {
    id: 2,
    questionId: 3,
    questionTitle: "如何优化React应用的性能？",
    createdAt: "2023-06-14",
    votes: 4,
    accepted: false,
  },
  {
    id: 3,
    questionId: 8,
    questionTitle: "TypeScript中的泛型如何使用？",
    createdAt: "2023-06-10",
    votes: 2,
    accepted: false,
  },
]

export function UserAnswers() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">我的回答</h2>
      </div>
      <div className="space-y-4">
        {userAnswers.map((answer) => (
          <Card key={answer.id}>
            <CardContent className="p-4">
              <Link href={`/questions/${answer.questionId}`}>
                <h3 className="mb-2 line-clamp-1 text-xl font-semibold hover:text-primary">{answer.questionTitle}</h3>
              </Link>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="text-sm text-muted-foreground">回答于 {answer.createdAt}</div>
                  {answer.accepted && (
                    <div className="flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-0.5 text-xs text-green-600">
                      <Check className="h-3 w-3" />
                      <span>已采纳</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <ThumbsUp className="h-4 w-4" />
                    <span>{answer.votes}</span>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <Link href={`/questions/${answer.questionId}#answer-${answer.id}`}>
                        <DropdownMenuItem>查看回答</DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem>编辑回答</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">删除回答</DropdownMenuItem>
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

