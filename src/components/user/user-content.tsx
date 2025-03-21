"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserSkills } from "@/components/user/user-skills"
import { UserProjects } from "@/components/user/user-projects"
import { UserArticles } from "@/components/user/user-articles"
import { UserCustomSection } from "@/components/user/user-custom-section"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface UserContentProps {
  userData: any
  isEditing: boolean
  theme: string
}

export function UserContent({ userData, isEditing, theme }: UserContentProps) {
  const [activeTab, setActiveTab] = useState("articles")
  const [customSections, setCustomSections] = useState<string[]>([])

  const addCustomSection = () => {
    const newSectionId = `custom-${customSections.length + 1}`
    setCustomSections([...customSections, newSectionId])
  }

  // 根据主题获取容器样式
  const getContainerStyle = () => {
    switch (theme) {
      case "minimal":
        return "bg-transparent"
      case "gradient":
        return "bg-transparent"
      case "synthwave":
        return "text-white"
      case "nature":
        return "bg-transparent"
      case "tech":
        return "bg-transparent"
      default:
        return ""
    }
  }

  return (
    <div className={`container py-8 ${getContainerStyle()}`}>
      <Tabs defaultValue="articles" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between mb-6">
          <TabsList>
            <TabsTrigger value="articles">文章</TabsTrigger>
            <TabsTrigger value="skills">技能</TabsTrigger>
            <TabsTrigger value="projects">项目</TabsTrigger>
            {customSections.map((section) => (
              <TabsTrigger key={section} value={section}>
                自定义区域 {customSections.indexOf(section) + 1}
              </TabsTrigger>
            ))}
          </TabsList>

          {isEditing && (
            <Button variant="outline" size="sm" onClick={addCustomSection}>
              <Plus className="mr-2 h-4 w-4" />
              添加自定义区域
            </Button>
          )}
        </div>

        <TabsContent value="articles">
          <UserArticles isEditing={isEditing} theme={theme} />
        </TabsContent>

        <TabsContent value="skills">
          <UserSkills skills={userData.skills} isEditing={isEditing} theme={theme} />
        </TabsContent>

        <TabsContent value="projects">
          <UserProjects projects={userData.projects} isEditing={isEditing} theme={theme} />
        </TabsContent>

        {customSections.map((section) => (
          <TabsContent key={section} value={section}>
            <UserCustomSection
              sectionId={section}
              isEditing={isEditing}
              theme={theme}
              onDelete={() => {
                setCustomSections(customSections.filter((s) => s !== section))
                setActiveTab("articles")
              }}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

