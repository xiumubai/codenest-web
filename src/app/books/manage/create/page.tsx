"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, X, Upload, Save, Eye } from "lucide-react"

export default function CreateBookPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    longDescription: "",
    price: "",
    originalPrice: "",
    category: "",
    tags: [] as string[],
    currentTag: "",
    cover: null as File | null,
    coverPreview: "",
  })
  const [activeTab, setActiveTab] = useState("basic")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({
        ...prev,
        cover: file,
        coverPreview: URL.createObjectURL(file),
      }))
    }
  }

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && formData.currentTag.trim()) {
      e.preventDefault()

      if (!formData.tags.includes(formData.currentTag.trim())) {
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

  const handleSubmit = async (e: React.FormEvent, isDraft = true) => {
    e.preventDefault()

    if (!formData.title || !formData.description || !formData.price || !formData.category) {
      alert("请填写必填字段")
      return
    }

    setIsSubmitting(true)

    // 模拟提交延迟
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // 这里应该是实际的提交逻辑
    console.log("提交小册:", { ...formData, isDraft })

    setIsSubmitting(false)

    // 提交成功后跳转
    if (!isDraft) {
      alert("小册已发布！")
      window.location.href = "/books/manage"
    } else {
      alert("小册已保存为草稿！")
    }
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Link href="/books/manage">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            返回小册管理
          </Button>
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8">创建小册</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* 左侧导航 */}
        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardContent className="p-4">
              <Tabs
                orientation="vertical"
                defaultValue="basic"
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="flex flex-col h-auto w-full bg-transparent space-y-1">
                  <TabsTrigger value="basic" className="justify-start w-full px-3 py-2 data-[state=active]:bg-muted">
                    基本信息
                  </TabsTrigger>
                  <TabsTrigger value="content" className="justify-start w-full px-3 py-2 data-[state=active]:bg-muted">
                    内容编辑
                  </TabsTrigger>
                  <TabsTrigger value="chapters" className="justify-start w-full px-3 py-2 data-[state=active]:bg-muted">
                    章节管理
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="justify-start w-full px-3 py-2 data-[state=active]:bg-muted">
                    发布设置
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* 右侧表单 */}
        <div className="lg:col-span-3">
          <form onSubmit={(e) => handleSubmit(e, true)}>
            <Card className="mb-6">
              <CardHeader>
                <h2 className="text-xl font-semibold">基本信息</h2>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">
                    小册标题 <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="请输入小册标题"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">
                    简介 <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="简要描述小册内容，100字以内"
                    value={formData.description}
                    onChange={handleChange}
                    maxLength={100}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="longDescription">详细介绍</Label>
                  <Textarea
                    id="longDescription"
                    name="longDescription"
                    placeholder="详细介绍小册内容，支持Markdown格式"
                    value={formData.longDescription}
                    onChange={handleChange}
                    className="min-h-[200px]"
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="price">
                      价格 <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2">¥</span>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        min="0"
                        step="0.1"
                        placeholder="设置小册价格"
                        value={formData.price}
                        onChange={handleChange}
                        className="pl-8"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="originalPrice">原价</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2">¥</span>
                      <Input
                        id="originalPrice"
                        name="originalPrice"
                        type="number"
                        min="0"
                        step="0.1"
                        placeholder="设置小册原价"
                        value={formData.originalPrice}
                        onChange={handleChange}
                        className="pl-8"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">
                    分类 <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="选择小册分类" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">前端开发</SelectItem>
                      <SelectItem value="2">后端开发</SelectItem>
                      <SelectItem value="3">移动开发</SelectItem>
                      <SelectItem value="4">DevOps</SelectItem>
                      <SelectItem value="5">人工智能</SelectItem>
                      <SelectItem value="6">数据库</SelectItem>
                      <SelectItem value="7">云计算</SelectItem>
                      <SelectItem value="8">区块链</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">标签</Label>
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
                    placeholder="输入标签并按回车添加，最多5个"
                    value={formData.currentTag}
                    onChange={(e) => setFormData((prev) => ({ ...prev, currentTag: e.target.value }))}
                    onKeyDown={handleAddTag}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cover">封面图片</Label>
                  <div className="flex items-center gap-4">
                    {formData.coverPreview ? (
                      <div className="relative h-40 w-32 overflow-hidden rounded-md border">
                        <img
                          src={formData.coverPreview || "/placeholder.svg"}
                          alt="Cover preview"
                          className="h-full w-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, cover: null, coverPreview: "" }))}
                          className="absolute top-2 right-2 rounded-full bg-background/80 p-1 hover:bg-background"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <label
                        htmlFor="cover-upload"
                        className="flex h-40 w-32 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed hover:bg-muted/50"
                      >
                        <Upload className="mb-2 h-6 w-6 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">上传封面</span>
                        <input
                          id="cover-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleCoverChange}
                        />
                      </label>
                    )}
                    <div className="text-sm text-muted-foreground">
                      <p>建议尺寸: 800x1200px</p>
                      <p>支持格式: JPG, PNG</p>
                      <p>最大大小: 2MB</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" type="button" onClick={() => window.history.back()}>
                取消
              </Button>
              <div className="space-x-2">
                <Button type="submit" variant="outline" disabled={isSubmitting}>
                  <Save className="mr-2 h-4 w-4" />
                  保存草稿
                </Button>
                <Button
                  type="button"
                  onClick={(e) => handleSubmit(e, false)}
                  disabled={isSubmitting}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  预览
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

