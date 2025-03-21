"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

export function AskQuestionForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: [] as string[],
    currentTag: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && formData.currentTag.trim()) {
      e.preventDefault()

      // 检查标签是否已存在
      if (!formData.tags.includes(formData.currentTag.trim())) {
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, prev.currentTag.trim()],
          currentTag: "",
        }))
      }
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title.trim() || !formData.content.trim() || formData.tags.length === 0) {
      alert("请填写所有必填字段并添加至少一个标签")
      return
    }

    setIsSubmitting(true)

    // 模拟提交延迟
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // 这里应该是实际的提交逻辑
    console.log("提交问题:", formData)

    // 提交成功后跳转到问题列表页
    router.push("/questions")
  }

  const previewContent = formData.content
    ? `<p>${formData.content.replace(/\n/g, "</p><p>")}</p>`
    : "<p>预览将显示在这里...</p>"

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-base font-medium">
              问题标题 <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              name="title"
              placeholder="简明扼要地描述您的问题"
              value={formData.title}
              onChange={handleChange}
              required
              className="h-12"
            />
            <p className="text-xs text-muted-foreground">标题应该简洁明了，能够清晰表达您的问题</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content" className="text-base font-medium">
              问题详情 <span className="text-destructive">*</span>
            </Label>

            <Tabs defaultValue="write">
              <TabsList className="mb-2 grid w-full grid-cols-2">
                <TabsTrigger value="write">编写</TabsTrigger>
                <TabsTrigger value="preview">预览</TabsTrigger>
              </TabsList>

              <TabsContent value="write">
                <textarea
                  id="content"
                  name="content"
                  className="min-h-[300px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="详细描述您的问题，包括您尝试过的解决方案和遇到的具体错误..."
                  value={formData.content}
                  onChange={handleChange}
                  required
                />
              </TabsContent>

              <TabsContent value="preview">
                <div
                  className="min-h-[300px] w-full rounded-md border border-input bg-background p-4 prose prose-sm max-w-none dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: previewContent }}
                />
              </TabsContent>
            </Tabs>

            <p className="text-xs text-muted-foreground">详细描述您的问题，包括您尝试过的解决方案和遇到的具体错误</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags" className="text-base font-medium">
              标签 <span className="text-destructive">*</span>
            </Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="gap-1 px-3 py-1">
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 rounded-full hover:bg-muted"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <Input
              id="currentTag"
              name="currentTag"
              placeholder="输入标签并按回车添加"
              value={formData.currentTag}
              onChange={handleChange}
              onKeyDown={handleAddTag}
              className="h-12"
            />
            <p className="text-xs text-muted-foreground">添加相关标签以帮助他人找到您的问题，最多添加5个标签</p>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between border-t px-6 py-4">
          <Button variant="outline" type="button" onClick={() => router.back()}>
            取消
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "提交中..." : "发布问题"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

