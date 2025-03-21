"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Trash2, Save, Edit } from "lucide-react"

interface UserCustomSectionProps {
  sectionId: string
  isEditing: boolean
  theme: string
  onDelete: () => void
}

export function UserCustomSection({ sectionId, isEditing, theme, onDelete }: UserCustomSectionProps) {
  const [title, setTitle] = useState("自定义区域")
  const [content, setContent] = useState("")
  const [isEditingContent, setIsEditingContent] = useState(true)

  const saveContent = () => {
    if (content.trim()) {
      setIsEditingContent(false)
    }
  }

  // 根据主题获取卡片样式
  const getCardStyle = () => {
    switch (theme) {
      case "minimal":
        return "bg-white dark:bg-gray-800 shadow-sm"
      case "gradient":
        return "bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg"
      case "synthwave":
        return "bg-purple-800/80 text-white backdrop-blur-md shadow-lg border-pink-500"
      case "nature":
        return "bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg border-green-500"
      case "tech":
        return "bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg border-blue-500"
      default:
        return ""
    }
  }

  return (
    <Card className={getCardStyle()}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          {isEditing ? (
            <Input value={title} onChange={(e) => setTitle(e.target.value)} className="text-2xl font-bold" />
          ) : (
            <h2 className="text-2xl font-bold">{title}</h2>
          )}

          {isEditing && (
            <Button variant="destructive" onClick={onDelete}>
              <Trash2 className="mr-2 h-4 w-4" />
              删除区域
            </Button>
          )}
        </div>

        {isEditing ? (
          <div className="space-y-4">
            {isEditingContent ? (
              <>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="在这里添加内容，支持Markdown格式"
                  className="min-h-[200px]"
                />
                <div className="flex justify-end">
                  <Button onClick={saveContent} disabled={!content.trim()}>
                    <Save className="mr-2 h-4 w-4" />
                    保存内容
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="prose prose-sm md:prose-base max-w-none dark:prose-invert">
                  {content.split("\n").map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
                <div className="flex justify-end">
                  <Button onClick={() => setIsEditingContent(true)}>
                    <Edit className="mr-2 h-4 w-4" />
                    编辑内容
                  </Button>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="prose prose-sm md:prose-base max-w-none dark:prose-invert">
            {content.split("\n").map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        )}

        {!isEditing && !content && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">暂无内容</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

