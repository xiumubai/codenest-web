import { QuestionDetail } from "@/components/questions/question-detail"
import { AnswersList } from "@/components/questions/answers-list"
import { AnswerForm } from "@/components/questions/answer-form"
import { RelatedQuestions } from "@/components/questions/related-questions"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function QuestionDetailPage({
  params,
}: {
  params: { id: string }
}) {
  return (
    <div className="container py-8">
      <Link href="/questions">
        <Button variant="ghost" size="sm" className="mb-6 gap-2">
          <ArrowLeft className="h-4 w-4" />
          返回问题列表
        </Button>
      </Link>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <QuestionDetail id={params.id} />
          <AnswersList questionId={params.id} />
          <AnswerForm questionId={params.id} />
        </div>

        <div className="lg:col-span-4">
          <div className="sticky top-20 space-y-6">
            <RelatedQuestions currentQuestionId={params.id} />
          </div>
        </div>
      </div>
    </div>
  )
}

