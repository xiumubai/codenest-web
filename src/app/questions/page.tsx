import { QuestionsHeader } from "@/components/questions/questions-header"
import { QuestionsList } from "@/components/questions/questions-list"
import { QuestionsFilter } from "@/components/questions/questions-filter"
import { QuestionsStats } from "@/components/questions/questions-stats"
import { QuestionsCategories } from "@/components/questions/questions-categories"

export default function QuestionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container py-8">
        <QuestionsHeader />

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* 左侧边栏 */}
          <div className="lg:col-span-3 space-y-6">
            <QuestionsStats />
            <QuestionsCategories />
          </div>

          {/* 主要内容区 */}
          <div className="lg:col-span-9">
            <QuestionsFilter />
            <QuestionsList />
          </div>
        </div>
      </div>
    </div>
  )
}
