"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

// 模拟获取问题数据的函数
const getQuestionById = (id: string) => {
  return {
    id: Number.parseInt(id),
    title: "如何在Next.js中实现服务端渲染的数据获取？",
    content: `我正在使用Next.js构建一个应用，需要在服务端获取数据。我尝试了getServerSideProps，但遇到了一些问题。

具体来说，我的代码如下：

\`\`\`
export async function getServerSideProps() {
  const res = await fetch('https://api.example.com/data')
  const data = await res.json()
  
  return {
    props: {
      data,
    },
  }
}
\`\`\`

但是当我运行应用时，遇到了以下错误：

\`\`\`
Error: Error serializing \`.data.someField\` returned from \`getServerSideProps\`.
\`\`\`

我查看了返回的数据，发现someField是一个包含方法的对象，这可能是导致序列化错误的原因。

我尝试了以下解决方案：

1. 使用JSON.stringify和JSON.parse来移除不可序列化的内容
2. 手动构建一个只包含我需要的数据的新对象

但我想知道是否有更优雅的解决方案？或者我应该使用其他方法来获取数据？

感谢任何帮助！`,
    tags: ["Next.js", "React", "SSR", "数据获取"],
  }
}

export function EditQuestionForm({ id }: { id: string }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: [] as string[],
  })
  const [tagInput, setTagInput] = useState("")

  // 模拟加载问题数据
  useEffect(() => {
    const question = getQuestionById(id)
    setFormData({
      title: question.title,
      content: question.content,
      tags: question.tags,
    })
    setIsInitialLoading(false)
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault()
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()],
        }))
      }
      setTagInput("")
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
    setIsLoading(true)

    try {
      // 这里应该是实际的更新逻辑
      console.log("更新问题:", formData)

      // 模拟更新延迟
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // 更新成功后跳转到问题详情页面
      router.push(`/questions/${id}`)
    } catch (error) {
      console.error("更新失败:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isInitialLoading) {
    return <div className="text-center">加载中...</div>
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title" className="text-base">
          问题标题
        </Label>
        <Input
          id="title"
          name="title"
          placeholder="简明扼要地描述您的问题"
          required
          value={formData.title}
          onChange={handleChange}
          className="h-12"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content" className="text-base">
          问题详情
        </Label>
        <Textarea
          id="content"
          name="content"
          placeholder="详细描述您的问题，包括您已经尝试过的解决方案"
          required
          rows={12}
          value={formData.content}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tags" className="text-base">
          标签
        </Label>
        <div className="flex flex-wrap gap-2 rounded-md border p-2">
          {formData.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="gap-1">
              {tag}
              <button type="button" onClick={() => handleRemoveTag(tag)} className="ml-1 rounded-full hover:bg-muted">
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          <Input
            id="tags"
            placeholder="输入标签并按回车添加"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleAddTag}
            className="flex-1 border-0 p-0 shadow-none focus-visible:ring-0"
          />
        </div>
        <p className="text-sm text-muted-foreground">添加最多5个与您问题相关的标签，以便更容易被找到</p>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.push(`/questions/${id}`)}>
          取消
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "更新中..." : "更新问题"}
        </Button>
      </div>
    </form>
  )
}

