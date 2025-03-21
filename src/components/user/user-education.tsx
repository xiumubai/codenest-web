"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, X, GraduationCap } from "lucide-react"

interface Education {
  id: number
  institution: string
  degree: string
  period: string
  description: string
}

interface UserEducationProps {
  education: Education[]
  isEditing: boolean
  theme: string
}

export function UserEducation({ education: initialEducation, isEditing, theme }: UserEducationProps) {
  const [education, setEducation] = useState<Education[]>(initialEducation)
  const [newEducation, setNewEducation] = useState<Partial<Education>>({
    institution: "",
    degree: "",
    period: "",
    description: "",
  })
  const [showAddForm, setShowAddForm] = useState(false)

  const addEducation = () => {
    if (!newEducation.institution || !newEducation.degree || !newEducation.period) return

    const educationToAdd = {
      id: Date.now(),
      institution: newEducation.institution || "",
      degree: newEducation.degree || "",
      period: newEducation.period || "",
      description: newEducation.description || "",
    }

    setEducation([...education, educationToAdd])
    setNewEducation({
      institution: "",
      degree: "",
      period: "",
      description: "",
    })
    setShowAddForm(false)
  }

  const removeEducation = (id: number) => {
    setEducation(education.filter((edu) => edu.id !== id))
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
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>教育背景</CardTitle>
        {isEditing && !showAddForm && (
          <Button variant="outline" size="sm" onClick={() => setShowAddForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            添加教育
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {isEditing && showAddForm && (
          <div className="mb-8 p-4 border rounded-lg">
            <h3 className="text-lg font-medium mb-4">添加教育经历</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">学校/机构</label>
                <Input
                  value={newEducation.institution || ""}
                  onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
                  placeholder="学校或机构名称"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">学位/专业</label>
                <Input
                  value={newEducation.degree || ""}
                  onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                  placeholder="学位和专业"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">时间段</label>
                <Input
                  value={newEducation.period || ""}
                  onChange={(e) => setNewEducation({ ...newEducation, period: e.target.value })}
                  placeholder="例如：2015年9月 - 2019年6月"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">描述</label>
                <Textarea
                  value={newEducation.description || ""}
                  onChange={(e) => setNewEducation({ ...newEducation, description: e.target.value })}
                  placeholder="相关描述、研究方向或主修课程"
                  rows={3}
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  取消
                </Button>
                <Button
                  onClick={addEducation}
                  disabled={!newEducation.institution || !newEducation.degree || !newEducation.period}
                >
                  保存
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {education.map((edu, index) => (
            <div key={edu.id} className="relative">
              {isEditing && (
                <div className="absolute -right-2 -top-2 z-10">
                  <Button
                    variant="destructive"
                    size="icon"
                    className="h-6 w-6 rounded-full"
                    onClick={() => removeEducation(edu.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}

              <div className="flex gap-4">
                <div className="hidden sm:flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <GraduationCap className="h-5 w-5 text-primary" />
                  </div>
                  {index < education.length - 1 && <div className="w-0.5 bg-border flex-1 my-2"></div>}
                </div>

                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                    <h3 className="text-lg font-medium">{edu.institution}</h3>
                    <span className="text-sm text-muted-foreground">{edu.period}</span>
                  </div>
                  <h4 className="text-base font-medium text-muted-foreground mb-2">{edu.degree}</h4>
                  {edu.description && <p className="text-sm">{edu.description}</p>}
                </div>
              </div>
            </div>
          ))}

          {education.length === 0 && !showAddForm && (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">暂无教育经历</p>
              {isEditing && (
                <Button onClick={() => setShowAddForm(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  添加教育经历
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

