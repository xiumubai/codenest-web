import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, ThumbsUp, Eye } from "lucide-react"

// 模拟问题数据
const questions = [
  {
    id: 1,
    title: "如何在Next.js中实现服务端渲染的数据获取？",
    excerpt: "我正在使用Next.js构建一个应用，需要在服务端获取数据。我尝试了getServerSideProps，但遇到了一些问题...",
    date: "2023-06-18",
    tags: ["Next.js", "React", "SSR"],
    votes: 12,
    answers: 3,
    views: 156,
  },
  {
    id: 2,
    title: "TypeScript中如何正确使用泛型？",
    excerpt: "我在使用TypeScript时遇到了一些关于泛型的问题。特别是在处理复杂类型时，不确定如何正确定义和使用泛型...",
    date: "2023-06-14",
    tags: ["TypeScript", "泛型", "编程"],
    votes: 8,
    answers: 2,
    views: 95,
  },
  // 添加更多问题...
]

export function UserQuestions({ username }: { username: string }) {
  return (
    <div className="space-y-6">
      {questions.map((question) => (
        <Card key={question.id}>
          <CardContent className="p-6">
            <Link href={`/questions/${question.id}`}>
              <h2 className="mb-2 text-2xl font-bold hover:text-primary">{question.title}</h2>
            </Link>
            <p className="mb-4 text-muted-foreground">{question.excerpt}</p>
            <div className="mb-4 flex flex-wrap gap-2">
              {question.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{question.date}</span>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <ThumbsUp className="h-4 w-4" /> {question.votes}
                </span>
                <span className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" /> {question.answers}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="h-4 w-4" /> {question.views}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

