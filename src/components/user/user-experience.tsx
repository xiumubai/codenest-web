"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, X, Briefcase } from "lucide-react"

interface Experience {
  id: number
  company: string
  position: string
  period: string
  description: string
  achievements: string[]
}

interface UserExperienceProps {
  experience: Experience[]
  isEditing: boolean
  theme: string
}

export function UserExperience({ experience: initialExperience, isEditing, theme }: UserExperienceProps) {
  const [experience, setExperience] = useState<Experience[]>(initialExperience)
  const [newExperience, setNewExperience] = useState<Partial<Experience>>({
    company: "",
    position: "",
    period: "",
    description: "",
    achievements: [],
  })
  const [newAchievement, setNewAchievement] = useState("")
  const [showAddForm, setShowAddForm] = useState(false)

  const addExperience = () => {
    if (!newExperience.company || !newExperience.position || !newExperience.period) return

    const experienceToAdd = {
      id: Date.now(),
      company: newExperience.company || "",
      position: newExperience.position || "",
      period: newExperience.period || "",
      description: newExperience.description || "",
      achievements: newExperience.achievements || [],
    }

    setExperience([...experience, experienceToAdd])
    setNewExperience({
      company: "",
      position: "",
      period: "",
      description: "",
      achievements: [],
    })
    setShowAddForm(false)
  }

  const removeExperience = (id: number) => {
    setExperience(experience.filter((exp) => exp.id !== id))
  }

  const addAchievement = () => {
    if (!newAchievement.trim()) return
    setNewExperience({
      ...newExperience,
      achievements: [...(newExperience.achievements || []), newAchievement.trim()],
    })
    setNewAchievement("")
  }

  const removeAchievement = (index: number) => {
    setNewExperience({
      ...newExperience,
      achievements: (newExperience.achievements || []).filter((_, i) => i !== index),
    })
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
        <CardTitle>工作经验</CardTitle>
        {isEditing && !showAddForm && (
          <Button variant="outline" size="sm" onClick={() => setShowAddForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            添加经验
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {isEditing && showAddForm && (
          <div className="mb-8 p-4 border rounded-lg">
            <h3 className="text-lg font-medium mb-4">添加工作经验</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">公司名称</label>
                  <Input
                    value={newExperience.company || ""}
                    onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                    placeholder="公司名称"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">职位</label>
                  <Input
                    value={newExperience.position || ""}
                    onChange={(e) => setNewExperience({ ...newExperience, position: e.target.value })}
                    placeholder="职位名称"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">时间段</label>
                <Input
                  value={newExperience.period || ""}
                  onChange={(e) => setNewExperience({ ...newExperience, period: e.target.value })}
                  placeholder="例如：2021年3月 - 至今"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">工作描述</label>
                <Textarea
                  value={newExperience.description || ""}
                  onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
                  placeholder="简要描述工作职责"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">成就</label>
                <div className="space-y-2">
                  {(newExperience.achievements || []).map((achievement, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="flex-1 p-2 bg-muted rounded-md text-sm">{achievement}</div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAchievement(index)}
                        className="text-destructive h-8 w-8 p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}

                  <div className="flex gap-2">
                    <Input
                      value={newAchievement}
                      onChange={(e) => setNewAchievement(e.target.value)}
                      placeholder="添加成就或亮点"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          addAchievement()
                        }
                      }}
                    />
                    <Button onClick={addAchievement} disabled={!newAchievement.trim()}>
                      添加
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  取消
                </Button>
                <Button
                  onClick={addExperience}
                  disabled={!newExperience.company || !newExperience.position || !newExperience.period}
                >
                  保存
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {experience.map((exp, index) => (
            <div key={exp.id} className="relative">
              {isEditing && (
                <div className="absolute -right-2 -top-2 z-10">
                  <Button
                    variant="destructive"
                    size="icon"
                    className="h-6 w-6 rounded-full"
                    onClick={() => removeExperience(exp.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}

              <div className="flex gap-4">
                <div className="hidden sm:flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Briefcase className="h-5 w-5 text-primary" />
                  </div>
                  {index < experience.length - 1 && <div className="w-0.5 bg-border flex-1 my-2"></div>}
                </div>

                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                    <h3 className="text-lg font-medium">{exp.position}</h3>
                    <span className="text-sm text-muted-foreground">{exp.period}</span>
                  </div>
                  <h4 className="text-base font-medium text-muted-foreground mb-2">{exp.company}</h4>
                  <p className="text-sm mb-3">{exp.description}</p>

                  {exp.achievements.length > 0 && (
                    <div className="mt-2">
                      <h5 className="text-sm font-medium mb-1">主要成就：</h5>
                      <ul className="list-disc list-inside space-y-1">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="text-sm">
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {experience.length === 0 && !showAddForm && (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">暂无工作经验</p>
              {isEditing && (
                <Button onClick={() => setShowAddForm(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  添加工作经验
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

