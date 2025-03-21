"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Plus, X, GripVertical } from "lucide-react"

interface Skill {
  name: string
  level: number
}

interface Language {
  name: string
  level: string
}

interface UserSkillsProps {
  skills: Skill[]
  languages: Language[]
  isEditing: boolean
  theme: string
}

export function UserSkills({ skills: initialSkills, languages: initialLanguages, isEditing, theme }: UserSkillsProps) {
  const [skills, setSkills] = useState<Skill[]>(initialSkills)
  const [languages, setLanguages] = useState<Language[]>(initialLanguages)
  const [newSkill, setNewSkill] = useState({ name: "", level: 50 })
  const [newLanguage, setNewLanguage] = useState({ name: "", level: "" })

  const addSkill = () => {
    if (newSkill.name.trim() === "") return
    setSkills([...skills, { ...newSkill }])
    setNewSkill({ name: "", level: 50 })
  }

  const removeSkill = (index: number) => {
    const updatedSkills = [...skills]
    updatedSkills.splice(index, 1)
    setSkills(updatedSkills)
  }

  const addLanguage = () => {
    if (newLanguage.name.trim() === "" || newLanguage.level.trim() === "") return
    setLanguages([...languages, { ...newLanguage }])
    setNewLanguage({ name: "", level: "" })
  }

  const removeLanguage = (index: number) => {
    const updatedLanguages = [...languages]
    updatedLanguages.splice(index, 1)
    setLanguages(updatedLanguages)
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

  // 根据主题获取进度条样式
  const getProgressStyle = (level: number) => {
    const baseStyle = "h-2 rounded-full"

    switch (theme) {
      case "synthwave":
        return `${baseStyle} bg-gradient-to-r from-pink-500 to-purple-500`
      case "nature":
        return `${baseStyle} bg-gradient-to-r from-green-500 to-emerald-500`
      case "tech":
        return `${baseStyle} bg-gradient-to-r from-blue-500 to-cyan-500`
      default:
        return `${baseStyle} bg-primary`
    }
  }

  return (
    <Card className={getCardStyle()}>
      <CardHeader>
        <CardTitle>技能与语言</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 技能部分 */}
        <div>
          <h3 className="text-sm font-medium mb-3">专业技能</h3>

          {isEditing && (
            <div className="mb-4 space-y-2">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="技能名称"
                  value={newSkill.name}
                  onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                  className="flex-1"
                />
                <div className="w-24 text-xs text-center">{newSkill.level}%</div>
              </div>
              <Slider
                value={[newSkill.level]}
                min={0}
                max={100}
                step={5}
                onValueChange={(value) => setNewSkill({ ...newSkill, level: value[0] })}
              />
              <Button size="sm" onClick={addSkill} disabled={!newSkill.name.trim()} className="w-full mt-1">
                <Plus className="mr-2 h-4 w-4" />
                添加技能
              </Button>
            </div>
          )}

          <div className="space-y-3">
            {skills.map((skill, index) => (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between">
                  {isEditing ? (
                    <div className="flex items-center gap-2 w-full">
                      <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                      <Input
                        value={skill.name}
                        onChange={(e) => {
                          const updatedSkills = [...skills]
                          updatedSkills[index].name = e.target.value
                          setSkills(updatedSkills)
                        }}
                        className="flex-1"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSkill(index)}
                        className="text-destructive p-0 h-8 w-8"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex justify-between w-full">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-xs text-muted-foreground">{skill.level}%</span>
                    </div>
                  )}
                </div>

                {isEditing ? (
                  <Slider
                    value={[skill.level]}
                    min={0}
                    max={100}
                    step={5}
                    onValueChange={(value) => {
                      const updatedSkills = [...skills]
                      updatedSkills[index].level = value[0]
                      setSkills(updatedSkills)
                    }}
                  />
                ) : (
                  <Progress value={skill.level} className="h-2" />
                )}
              </div>
            ))}

            {skills.length === 0 && (
              <div className="text-center py-2">
                <p className="text-sm text-muted-foreground">暂无技能</p>
              </div>
            )}
          </div>
        </div>

        {/* 语言部分 */}
        <div>
          <h3 className="text-sm font-medium mb-3">语言能力</h3>

          {isEditing && (
            <div className="mb-4 space-y-2">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="语言"
                  value={newLanguage.name}
                  onChange={(e) => setNewLanguage({ ...newLanguage, name: e.target.value })}
                  className="flex-1"
                />
                <Input
                  placeholder="水平"
                  value={newLanguage.level}
                  onChange={(e) => setNewLanguage({ ...newLanguage, level: e.target.value })}
                  className="flex-1"
                />
                <Button
                  size="sm"
                  onClick={addLanguage}
                  disabled={!newLanguage.name.trim() || !newLanguage.level.trim()}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          <div className="space-y-2">
            {languages.map((language, index) => (
              <div key={index} className="flex items-center justify-between">
                {isEditing ? (
                  <div className="flex items-center gap-2 w-full">
                    <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                    <Input
                      value={language.name}
                      onChange={(e) => {
                        const updatedLanguages = [...languages]
                        updatedLanguages[index].name = e.target.value
                        setLanguages(updatedLanguages)
                      }}
                      className="flex-1"
                    />
                    <Input
                      value={language.level}
                      onChange={(e) => {
                        const updatedLanguages = [...languages]
                        updatedLanguages[index].level = e.target.value
                        setLanguages(updatedLanguages)
                      }}
                      className="flex-1"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeLanguage(index)}
                      className="text-destructive p-0 h-8 w-8"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <span className="text-sm font-medium">{language.name}</span>
                    <span className="text-sm text-muted-foreground">{language.level}</span>
                  </>
                )}
              </div>
            ))}

            {languages.length === 0 && (
              <div className="text-center py-2">
                <p className="text-sm text-muted-foreground">暂无语言</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

