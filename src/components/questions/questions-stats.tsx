import { Card, CardContent } from "@/components/ui/card"
import { HelpCircle, CheckCircle, Users, MessageSquare } from "lucide-react"

export function QuestionsStats() {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="mb-4 text-lg font-semibold">社区统计</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center rounded-lg bg-muted/50 p-3">
            <HelpCircle className="mb-1 h-5 w-5 text-primary" />
            <div className="text-xl font-bold">1,245</div>
            <div className="text-xs text-muted-foreground">问题</div>
          </div>
          <div className="flex flex-col items-center rounded-lg bg-muted/50 p-3">
            <CheckCircle className="mb-1 h-5 w-5 text-green-500" />
            <div className="text-xl font-bold">982</div>
            <div className="text-xs text-muted-foreground">已解决</div>
          </div>
          <div className="flex flex-col items-center rounded-lg bg-muted/50 p-3">
            <Users className="mb-1 h-5 w-5 text-blue-500" />
            <div className="text-xl font-bold">3,570</div>
            <div className="text-xs text-muted-foreground">用户</div>
          </div>
          <div className="flex flex-col items-center rounded-lg bg-muted/50 p-3">
            <MessageSquare className="mb-1 h-5 w-5 text-orange-500" />
            <div className="text-xl font-bold">8,429</div>
            <div className="text-xs text-muted-foreground">回答</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

