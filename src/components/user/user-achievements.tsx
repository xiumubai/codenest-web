import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, BookOpen, MessageSquare, ThumbsUp } from "lucide-react"

// 模拟成就数据
const achievements = [
  { id: 1, title: "优秀作者", description: "发布了10篇高质量文章", icon: BookOpen, date: "2023-05-15" },
  { id: 2, title: "问答达人", description: "回答了50个问题", icon: MessageSquare, date: "2023-06-01" },
  { id: 3, title: "受欢迎的贡献者", description: "获得了100个点赞", icon: ThumbsUp, date: "2023-06-10" },
  // 添加更多成就...
]

export function UserAchievements({ username }: { username: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Award className="mr-2 h-6 w-6 text-primary" />
          成就
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 sm:grid-cols-2">
          {achievements.map((achievement) => (
            <Card key={achievement.id}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <achievement.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    <div className="mt-2 flex items-center">
                      <Badge variant="outline" className="text-xs">
                        {achievement.date}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

