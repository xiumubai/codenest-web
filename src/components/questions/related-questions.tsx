import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { MessageSquare } from "lucide-react"

// 模拟相关问题数据
const relatedQuestions = [
  {
    id: 2,
    title: "Next.js中getStaticProps和getServerSideProps的区别是什么？",
    answers: 5,
  },
  {
    id: 3,
    title: "如何在Next.js中处理API路由的CORS问题？",
    answers: 3,
  },
  {
    id: 4,
    title: "Next.js中如何实现增量静态再生成(ISR)？",
    answers: 7,
  },
  {
    id: 5,
    title: "在Next.js应用中如何使用Redux？",
    answers: 4,
  },
  {
    id: 6,
    title: "Next.js中如何实现国际化(i18n)？",
    answers: 6,
  },
]

export function RelatedQuestions({ currentQuestionId }: { currentQuestionId: string }) {
  // 过滤掉当前问题
  const filteredQuestions = relatedQuestions.filter((question) => question.id !== Number.parseInt(currentQuestionId))

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="mb-4 text-lg font-semibold">相关问题</h3>
        <div className="space-y-4">
          {filteredQuestions.map((question) => (
            <Link href={`/questions/${question.id}`} key={question.id}>
              <div className="group flex items-start gap-3 rounded-md p-2 transition-colors hover:bg-muted/50">
                <MessageSquare className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div>
                  <h4 className="text-sm font-medium group-hover:text-primary">{question.title}</h4>
                  <p className="text-xs text-muted-foreground">{question.answers} 个回答</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

