"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, X, ExternalLink, Code } from "lucide-react"

interface Project {
  id: number
  title: string
  period: string
  description: string
  technologies: string[]
  link: string
}

interface UserProjectsProps {
  projects: Project[]
  isEditing: boolean
  theme: string
}

export function UserProjects({ projects: initialProjects, isEditing, theme }: UserProjectsProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: "",
    period: "",
    description: "",
    technologies: [],
    link: "",
  })
  const [newTech, setNewTech] = useState("")
  const [showAddForm, setShowAddForm] = useState(false)

  const addProject = () => {
    if (!newProject.title || !newProject.description) return

    const projectToAdd = {
      id: Date.now(),
      title: newProject.title || "",
      period: newProject.period || "",
      description: newProject.description || "",
      technologies: newProject.technologies || [],
      link: newProject.link || "",
    }

    setProjects([...projects, projectToAdd])
    setNewProject({
      title: "",
      period: "",
      description: "",
      technologies: [],
      link: "",
    })
    setShowAddForm(false)
  }

  const removeProject = (id: number) => {
    setProjects(projects.filter((project) => project.id !== id))
  }

  const addTech = () => {
    if (!newTech.trim() || !newProject.technologies) return
    setNewProject({
      ...newProject,
      technologies: [...(newProject.technologies || []), newTech.trim()],
    })
    setNewTech("")
  }

  const removeTech = (tech: string) => {
    setNewProject({
      ...newProject,
      technologies: (newProject.technologies || []).filter((t) => t !== tech),
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
        <CardTitle>项目经验</CardTitle>
        {isEditing && !showAddForm && (
          <Button variant="outline" size="sm" onClick={() => setShowAddForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            添加项目
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {isEditing && showAddForm && (
          <div className="mb-8 p-4 border rounded-lg">
            <h3 className="text-lg font-medium mb-4">添加项目经验</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">项目名称</label>
                  <Input
                    value={newProject.title || ""}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    placeholder="项目名称"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">时间段</label>
                  <Input
                    value={newProject.period || ""}
                    onChange={(e) => setNewProject({ ...newProject, period: e.target.value })}
                    placeholder="例如：2022年3月 - 2022年8月"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">项目描述</label>
                <Textarea
                  value={newProject.description || ""}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  placeholder="简要描述项目内容和职责"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">项目链接</label>
                <Input
                  value={newProject.link || ""}
                  onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
                  placeholder="项目链接或GitHub地址"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">使用技术</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {(newProject.technologies || []).map((tech, index) => (
                    <Badge key={index} variant="secondary" className="gap-1 px-3 py-1">
                      {tech}
                      <button
                        type="button"
                        onClick={() => removeTech(tech)}
                        className="ml-1 rounded-full hover:bg-muted"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newTech}
                    onChange={(e) => setNewTech(e.target.value)}
                    placeholder="添加技术"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addTech()
                      }
                    }}
                  />
                  <Button onClick={addTech} disabled={!newTech.trim()}>
                    添加
                  </Button>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  取消
                </Button>
                <Button onClick={addProject} disabled={!newProject.title || !newProject.description}>
                  保存
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {projects.map((project, index) => (
            <div key={project.id} className="relative">
              {isEditing && (
                <div className="absolute -right-2 -top-2 z-10">
                  <Button
                    variant="destructive"
                    size="icon"
                    className="h-6 w-6 rounded-full"
                    onClick={() => removeProject(project.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}

              <div className="flex gap-4">
                <div className="hidden sm:flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Code className="h-5 w-5 text-primary" />
                  </div>
                  {index < projects.length - 1 && <div className="w-0.5 bg-border flex-1 my-2"></div>}
                </div>

                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                    <h3 className="text-lg font-medium">{project.title}</h3>
                    <span className="text-sm text-muted-foreground">{project.period}</span>
                  </div>
                  <p className="text-sm mb-3">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.technologies.map((tech, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                    >
                      查看项目 <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}

          {projects.length === 0 && !showAddForm && (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">暂无项目经验</p>
              {isEditing && (
                <Button onClick={() => setShowAddForm(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  添加项目经验
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

