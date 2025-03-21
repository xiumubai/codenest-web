import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// 模拟活动数据
const activities = [
  { date: "2023-06-20", type: "article", title: "发布了新文章：《React性能优化指南》" },
  { date: "2023-06-19", type: "question", title: "提出了新问题：'如何在Next.js中实现国际化？'" },
  { date: "2023-06-18", type: "answer", title: "回答了问题：'TypeScript中的高级类型有哪些？'" },
  { date: "2023-06-17", type: "like", title: "点赞了文章：《深入理解JavaScript闭包》" },
  // 添加更多活动...
]

export function UserActivity({ username }: { username: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>最近活动</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <Badge variant="outline">{activity.date}</Badge>
              </div>
              <div>
                <Badge
                  variant={
                    activity.type === "article"
                      ? "default"
                      : activity.type === "question"
                        ? "secondary"
                        : activity.type === "answer"
                          ? "outline"
                          : "destructive"
                  }
                >
                  {activity.type}
                </Badge>
                <p className="mt-1">{activity.title}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

