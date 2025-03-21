import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThumbsUp, MessageSquare, Check, Award } from "lucide-react"

export function ReputationCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">声望统计</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              <span className="font-medium">总声望</span>
            </div>
            <Badge variant="outline" className="text-lg font-semibold">
              1,250
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                <span>问题获赞</span>
              </div>
              <span>+120</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                <span>回答问题</span>
              </div>
              <span>+450</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>回答被采纳</span>
              </div>
              <span>+680</span>
            </div>
          </div>

          <div className="pt-2 text-xs text-muted-foreground">
            <p>声望系统说明：</p>
            <ul className="list-inside list-disc space-y-1 pl-2 pt-1">
              <li>问题获赞: +5 声望/赞</li>
              <li>回答问题: +10 声望/回答</li>
              <li>回答被采纳: +15 声望/采纳</li>
              <li>回答获赞: +10 声望/赞</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

