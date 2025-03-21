"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { X, ArrowLeft } from "lucide-react"

export default function NewTopicPage() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    tags: [] as string[],
    currentTag: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("write")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }))
  }

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && formData.currentTag.trim()) {
      e.preventDefault()

      // 检查标签是否已存在
      if (!formData.tags.includes(formData.currentTag.trim())) {
        // 检查标签数量限制
        if (formData.tags.length >= 5) {
          alert("最多只能添加5个标签")
          return
        }

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

    if (!formData.title.trim() || !formData.content.trim() || !formData.category) {
      alert("请填写所有必填字段")
      return
    }

    setIsSubmitting(true)

    try {
      // 模拟提交延迟
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // 这里应该是实际的提交逻辑
      console.log("提交主题:", formData)

      // 提交成功后跳转到论坛页面
      window.location.href = "/forum"
    } catch (error) {
      console.error("提交失败:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const previewContent = formData.content
    ? `<p>${formData.content.replace(/\n/g, "</p><p>")}</p>`
    : "<p>预览将显示在这里...</p>"

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <Link href="/forum">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            返回论坛
          </Button>
        </Link>
      </div>

      <div className="mb-6">
        <h1 className="text-3xl font-bold">发布新主题</h1>
        <p className="text-muted-foreground">分享您的想法、问题或发现</p>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <div className="space-y-2">
              <Label htmlFor="title" className="text-base font-medium">
                主题标题 <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                name="title"
                placeholder="简明扼要地描述您的主题"
                value={formData.title}
                onChange={handleChange}
                className="h-12"
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="category" className="text-base font-medium">
                分类 <span className="text-destructive">*</span>
              </Label>
              <Select value={formData.category} onValueChange={handleCategoryChange}>
                <SelectTrigger>
                  <SelectValue placeholder="选择分类" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="讨论">讨论</SelectItem>
                  <SelectItem value="展示">展示</SelectItem>
                  <SelectItem value="问题">问题</SelectItem>
                  <SelectItem value="教程">教程</SelectItem>
                  <SelectItem value="错误报告">错误报告</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content" className="text-base font-medium">
                内容 <span className="text-destructive">*</span>
              </Label>

              <Tabs defaultValue="write" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-2 grid w-full grid-cols-2">
                  <TabsTrigger value="write">编写</TabsTrigger>
                  <TabsTrigger value="preview">预览</TabsTrigger>
                </TabsList>

                <TabsContent value="write">
                  <Textarea
                    id="content"
                    name="content"
                    className="min-h-[300px]"
                    placeholder="详细描述您的主题内容..."
                    value={formData.content}
                    onChange={handleChange}
                  />
                </TabsContent>

                <TabsContent value="preview">
                  <div
                    className="min-h-[300px] w-full rounded-md border border-input bg-background p-4 prose prose-sm max-w-none dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: previewContent }}
                  />
                </TabsContent>
              </Tabs>
              <p className="text-xs text-muted-foreground">支持Markdown格式，可以使用代码块、列表、链接等</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags" className="text-base font-medium">
                标签
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
                onChange={(e) => setFormData((prev) => ({ ...prev, currentTag: e.target.value }))}
                onKeyDown={handleAddTag}
                className="h-12"
              />
              <p className="text-xs text-muted-foreground">添加相关标签以帮助他人找到您的主题，最多添加5个标签</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t px-6 py-4">
            <Button variant="outline" type="button" onClick={() => window.history.back()}>
              取消
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isSubmitting ? "提交中..." : "发布主题"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

