"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function AnswerForm({ questionId }: { questionId: string }) {
  const [answer, setAnswer] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!answer.trim()) return

    setIsSubmitting(true)

    // 模拟提交延迟
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // 这里应该是实际的提交逻辑
    console.log("提交回答:", { questionId, answer })

    // 重置表单
    setAnswer("")
    setIsSubmitting(false)

    // 显示成功消息
    alert("回答已提交！")
  }

  const previewContent = answer ? `<p>${answer.replace(/\n/g, "</p><p>")}</p>` : "<p>预览将显示在这里...</p>"

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardContent className="p-6">
          <h3 className="mb-4 text-xl font-semibold">您的回答</h3>

          <Tabs defaultValue="write">
            <TabsList className="mb-4 grid w-full grid-cols-2">
              <TabsTrigger value="write">编写</TabsTrigger>
              <TabsTrigger value="preview">预览</TabsTrigger>
            </TabsList>

            <TabsContent value="write">
              <textarea
                className="min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="输入您的回答..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                required
              />
            </TabsContent>

            <TabsContent value="preview">
              <div
                className="min-h-[200px] w-full rounded-md border border-input bg-background p-4 prose prose-sm max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: previewContent }}
              />
            </TabsContent>
          </Tabs>
        </CardContent>

        <CardFooter className="flex justify-between border-t px-6 py-4">
          <div className="text-sm text-muted-foreground">支持 Markdown 格式</div>
          <Button type="submit" disabled={isSubmitting || !answer.trim()}>
            {isSubmitting ? "提交中..." : "提交回答"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

