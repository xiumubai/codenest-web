"use client"

import { useState, useEffect } from "react"
import { UserHeader } from "@/components/user/user-header"
import { UserContact } from "@/components/user/user-contact"
import { UserSkills } from "@/components/user/user-skills"
import { UserExperience } from "@/components/user/user-experience"
import { UserEducation } from "@/components/user/user-education"
import { UserProjects } from "@/components/user/user-projects"
import { UserCertifications } from "@/components/user/user-certifications"
import { UserInterests } from "@/components/user/user-interests"
import { UserReferences } from "@/components/user/user-references"
import { UserThemeSelector } from "@/components/user/user-theme-selector"
import { ResumePreview } from "@/components/user/resume-preview"
import { ResumeTemplateSelector } from "@/components/user/resume-template-selector"
import { ResumeCompleteness } from "@/components/user/resume-completeness"
import { ResumeVersions } from "@/components/user/resume-versions"
import { ResumeExport } from "@/components/user/resume-export"
import { ResumeLanguage } from "@/components/user/resume-language"
import { ResumePrivacy } from "@/components/user/resume-privacy"
import { ResumeTimeline } from "@/components/user/resume-timeline"
import { Button } from "@/components/ui/button"
import { Edit, Save, AlertTriangle } from "lucide-react"
import { useTheme } from "next-themes"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// 模拟用户数据
const userData = {
  username: "johndoe",
  name: "John Doe",
  avatar: "/placeholder.svg?height=128&width=128",
  title: "高级前端开发工程师",
  bio: "5年Web开发经验 | React专家 | 开源贡献者",
  about:
    "热情的Web开发者，专注于创建高性能、可访问的用户界面。擅长React生态系统和现代JavaScript。喜欢解决复杂问题并不断学习新技术。",
  contact: {
    email: "john.doe@example.com",
    phone: "+86 138 8888 8888",
    location: "上海市",
    website: "https://johndoe.dev",
  },
  socialLinks: [
    { platform: "github", url: "https://github.com/johndoe" },
    { platform: "twitter", url: "https://twitter.com/johndoe" },
    { platform: "linkedin", url: "https://linkedin.com/in/johndoe" },
  ],
  skills: [
    { name: "JavaScript", level: 90 },
    { name: "React", level: 85 },
    { name: "TypeScript", level: 80 },
    { name: "Next.js", level: 85 },
    { name: "Node.js", level: 75 },
    { name: "CSS/SCSS", level: 80 },
    { name: "UI/UX设计", level: 70 },
    { name: "Git", level: 85 },
    { name: "测试 (Jest, RTL)", level: 75 },
  ],
  languages: [
    { name: "中文", level: "母语" },
    { name: "英语", level: "流利" },
    { name: "日语", level: "基础" },
  ],
  experience: [
    {
      id: 1,
      company: "科技创新有限公司",
      position: "高级前端开发工程师",
      period: "2021年3月 - 至今",
      description:
        "负责公司核心产品的前端架构设计和开发，优化性能并提升用户体验。带领5人前端团队，实施代码审查和最佳实践。",
      achievements: [
        "重构了前端架构，将页面加载时间减少了40%",
        "设计并实现了组件库，提高了团队开发效率",
        "引入自动化测试，将bug率降低了30%",
      ],
    },
    {
      id: 2,
      company: "网络科技有限公司",
      position: "前端开发工程师",
      period: "2019年6月 - 2021年2月",
      description: "参与电子商务平台的开发和维护，负责实现响应式设计和交互功能。",
      achievements: [
        "开发了购物车和结账流程，提升了转化率15%",
        "实现了PWA功能，改善了移动端用户体验",
        "优化了网站性能，Lighthouse得分从65提升到90",
      ],
    },
    {
      id: 3,
      company: "互联网科技有限公司",
      position: "初级前端开发工程师",
      period: "2018年1月 - 2019年5月",
      description: "参与公司内部管理系统的开发，负责UI组件实现和数据可视化。",
      achievements: [
        "开发了10+可复用的UI组件",
        "实现了数据可视化仪表盘，帮助管理层做出决策",
        "参与了前端技术栈从jQuery到React的迁移",
      ],
    },
  ],
  education: [
    {
      id: 1,
      institution: "上海交通大学",
      degree: "计算机科学与技术 硕士",
      period: "2015年9月 - 2018年6月",
      description: "研究方向：人机交互与用户体验设计",
    },
    {
      id: 2,
      institution: "华东师范大学",
      degree: "软件工程 学士",
      period: "2011年9月 - 2015年6月",
      description: "主修课程：数据结构、算法、软件工程、Web开发",
    },
  ],
  projects: [
    {
      id: 1,
      title: "企业管理系统",
      period: "2022年3月 - 2022年8月",
      description: "基于React和Node.js的企业资源管理系统，包含人事管理、财务报表和项目跟踪功能。",
      technologies: ["React", "Node.js", "Express", "MongoDB", "Ant Design"],
      link: "https://github.com/johndoe/ems",
    },
    {
      id: 2,
      title: "电子商务平台",
      period: "2020年5月 - 2020年12月",
      description: "全栈电子商务解决方案，支持产品管理、购物车、支付集成和订单跟踪。",
      technologies: ["Next.js", "Stripe", "PostgreSQL", "Tailwind CSS"],
      link: "https://github.com/johndoe/ecommerce",
    },
    {
      id: 3,
      title: "社交媒体仪表盘",
      period: "2019年8月 - 2019年11月",
      description: "社交媒体分析工具，提供数据可视化和内容表现分析。",
      technologies: ["React", "D3.js", "Firebase", "Material UI"],
      link: "https://github.com/johndoe/social-dashboard",
    },
  ],
  certifications: [
    {
      id: 1,
      name: "AWS Certified Developer - Associate",
      issuer: "Amazon Web Services",
      date: "2022年5月",
      link: "https://aws.amazon.com/certification/",
    },
    {
      id: 2,
      name: "Professional Scrum Master I",
      issuer: "Scrum.org",
      date: "2021年3月",
      link: "https://www.scrum.org/professional-scrum-certifications",
    },
    {
      id: 3,
      name: "React Certification",
      issuer: "Meta",
      date: "2020年8月",
      link: "https://www.meta.com/",
    },
  ],
  interests: [{ name: "开源贡献" }, { name: "技术写作" }, { name: "户外徒步" }, { name: "摄影" }, { name: "阅读" }],
  references: [
    {
      id: 1,
      name: "张三",
      position: "技术总监",
      company: "科技创新有限公司",
      email: "zhang.san@example.com",
      phone: "+86 138 1234 5678",
      relationship: "前主管",
      isVisible: true,
    },
    {
      id: 2,
      name: "李四",
      position: "产品经理",
      company: "网络科技有限公司",
      email: "li.si@example.com",
      phone: "+86 139 8765 4321",
      relationship: "前同事",
      isVisible: false,
    },
  ],
  isCurrentUser: true,
  theme: "default",
  template: "classic",
  privacy: {
    visibility: "unlisted",
    allowDownload: true,
    showEmail: true,
    showPhone: false,
    showSocialLinks: true,
    allowSearch: false,
    customUrl: "johndoe-resume",
  },
  versions: [
    {
      id: "v1",
      name: "前端开发工程师简历",
      createdAt: new Date("2023-01-15"),
      updatedAt: new Date("2023-06-20"),
      isDefault: true,
      jobTitle: "高级前端开发工程师",
      status: "active",
    },
    {
      id: "v2",
      name: "全栈开发工程师简历",
      createdAt: new Date("2023-03-10"),
      updatedAt: new Date("2023-05-15"),
      isDefault: false,
      jobTitle: "全栈开发工程师",
      company: "科技有限公司",
      status: "draft",
    },
  ],
  availableLanguages: [
    { code: "zh", name: "中文", nativeName: "中文", completeness: 100, isActive: true },
    { code: "en", name: "英文", nativeName: "English", completeness: 85, isActive: true },
    { code: "ja", name: "日文", nativeName: "日本語", completeness: 40, isActive: false },
    { code: "fr", name: "法文", nativeName: "Français", completeness: 0, isActive: false },
    { code: "de", name: "德文", nativeName: "Deutsch", completeness: 0, isActive: false },
    { code: "es", name: "西班牙文", nativeName: "Español", completeness: 0, isActive: false },
  ],
  timelineEvents: [
    {
      id: "exp1",
      type: "experience",
      title: "高级前端开发工程师",
      subtitle: "科技创新有限公司",
      date: "2021年3月",
      endDate: "至今",
      description: "负责公司核心产品的前端架构设计和开发，优化性能并提升用户体验。",
    },
    {
      id: "exp2",
      type: "experience",
      title: "前端开发工程师",
      subtitle: "网络科技有限公司",
      date: "2019年6月",
      endDate: "2021年2月",
      description: "参与电子商务平台的开发和维护，负责实现响应式设计和交互功能。",
    },
    {
      id: "exp3",
      type: "experience",
      title: "初级前端开发工程师",
      subtitle: "互联网科技有限公司",
      date: "2018年1月",
      endDate: "2019年5月",
      description: "参与公司内部管理系统的开发，负责UI组件实现和数据可视化。",
    },
    {
      id: "edu1",
      type: "education",
      title: "计算机科学与技术 硕士",
      subtitle: "上海交通大学",
      date: "2015年9月",
      endDate: "2018年6月",
      description: "研究方向：人机交互与用户体验设计",
    },
    {
      id: "edu2",
      type: "education",
      title: "软件工程 学士",
      subtitle: "华东师范大学",
      date: "2011年9月",
      endDate: "2015年6月",
      description: "主修课程：数据结构、算法、软件工程、Web开发",
    },
    {
      id: "proj1",
      type: "project",
      title: "企业管理系统",
      subtitle: "React, Node.js, MongoDB",
      date: "2022年3月",
      endDate: "2022年8月",
      description: "基于React和Node.js的企业资源管理系统，包含人事管理、财务报表和项目跟踪功能。",
    },
    {
      id: "cert1",
      type: "certification",
      title: "AWS Certified Developer - Associate",
      subtitle: "Amazon Web Services",
      date: "2022年5月",
      description: "云服务开发认证",
    },
    {
      id: "ach1",
      type: "achievement",
      title: "技术创新奖",
      subtitle: "科技创新有限公司",
      date: "2022年12月",
      description: "因在前端架构优化方面的突出贡献获得公司年度技术创新奖",
    },
  ],
}

export default function UserProfilePage({ params }: { params: { username: string } }) {
  const [theme, setTheme] = useState(userData.theme)
  const [template, setTemplate] = useState(userData.template || "classic")
  const [isEditing, setIsEditing] = useState(false)
  const [currentVersionId, setCurrentVersionId] = useState(
    userData.versions.find((v) => v.isDefault)?.id || userData.versions[0]?.id,
  )
  const [currentLanguage, setCurrentLanguage] = useState("zh")
  const { setTheme: setSystemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [showAlert, setShowAlert] = useState(true)

  // 确保组件挂载后再渲染，避免水合不匹配
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)

    // 根据主题设置系统主题
    if (newTheme === "dark" || newTheme === "synthwave") {
      setSystemTheme("dark")
    } else {
      setSystemTheme("light")
    }
  }

  const handleTemplateChange = (newTemplate: string) => {
    setTemplate(newTemplate)
  }

  const handleVersionChange = (versionId: string) => {
    setCurrentVersionId(versionId)
    // 实际应用中，这里会加载对应版本的简历数据
  }

  const handleVersionCreate = (version: any) => {
    // 实际应用中，这里会创建新版本
    alert(`创建新版本: ${version.name}`)
  }

  const handleVersionDelete = (versionId: string) => {
    // 实际应用中，这里会删除版本
    alert(`删除版本: ${versionId}`)
  }

  const handleVersionUpdate = (versionId: string, data: any) => {
    // 实际应用中，这里会更新版本
    alert(`更新版本 ${versionId}: ${JSON.stringify(data)}`)
  }

  const handleLanguageChange = (languageCode: string) => {
    setCurrentLanguage(languageCode)
    // 实际应用中，这里会切换语言
  }

  const handleLanguageToggle = (languageCode: string, isActive: boolean) => {
    // 实际应用中，这里会启用/禁用语言
    alert(`${isActive ? "启用" : "禁用"}语言: ${languageCode}`)
  }

  const handlePrivacyChange = (privacy: any) => {
    // 实际应用中，这里会更新隐私设置
    alert(`更新隐私设置: ${JSON.stringify(privacy)}`)
  }

  const handleExport = (format: string, options: any) => {
    // 实际应用中，这里会导出简历
    alert(`导出简历为 ${format} 格式，选项: ${JSON.stringify(options)}`)
  }

  const handleSaveChanges = () => {
    setIsEditing(false)
    // 实际应用中，这里会保存所有更改到数据库
    alert("保存成功！")
  }

  return (
    <div className={`min-h-screen ${getThemeClasses(theme)}`}>
      {/* 顶部操作栏 - 仅对自己的主页显示 */}
      {userData.isCurrentUser && (
        <div className="fixed top-16 right-4 z-10 flex flex-wrap gap-2 max-w-[calc(100vw-2rem)] justify-end">
          <Button
            variant="outline"
            size="sm"
            className="bg-background/80 backdrop-blur-sm"
            onClick={() => (isEditing ? handleSaveChanges() : setIsEditing(true))}
          >
            {isEditing ? (
              <>
                <Save className="mr-2 h-4 w-4" />
                保存更改
              </>
            ) : (
              <>
                <Edit className="mr-2 h-4 w-4" />
                编辑简历
              </>
            )}
          </Button>

          {isEditing ? (
            <ResumeTemplateSelector currentTemplate={template} onTemplateChange={handleTemplateChange} />
          ) : (
            <ResumePreview userData={userData} theme={theme} />
          )}

          <ResumeVersions
            versions={userData.versions}
            currentVersionId={currentVersionId}
            onVersionChange={handleVersionChange}
            onVersionCreate={handleVersionCreate}
            onVersionDelete={handleVersionDelete}
            onVersionUpdate={handleVersionUpdate}
          />

          <ResumeExport onExport={handleExport} />

          <ResumeLanguage
            currentLanguage={currentLanguage}
            availableLanguages={userData.availableLanguages}
            onLanguageChange={handleLanguageChange}
            onLanguageToggle={handleLanguageToggle}
          />

          <ResumePrivacy privacy={userData.privacy} onPrivacyChange={handlePrivacyChange} />

          <ResumeTimeline events={userData.timelineEvents} />
        </div>
      )}

      {/* 主题选择器 - 仅在编辑模式显示 */}
      {userData.isCurrentUser && isEditing && (
        <UserThemeSelector currentTheme={theme} onThemeChange={handleThemeChange} />
      )}

      {/* 页面内容 */}
      <div className="container mx-auto py-8 px-4">
        {/* 提示信息 */}
        {showAlert && (
          <div className="mb-6">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>简历分享提示</AlertTitle>
              <AlertDescription>
                您的简历当前设置为&quot;不公开列出&quot;，只有知道链接的人才能查看。您可以通过隐私设置更改可见性。
              </AlertDescription>
              <Button variant="ghost" size="sm" className="absolute top-2 right-2" onClick={() => setShowAlert(false)}>
                ×
              </Button>
            </Alert>
          </div>
        )}

        {/* 简历完整度指示器 - 仅在编辑模式显示 */}
        {isEditing && (
          <div className="mb-6">
            <ResumeCompleteness userData={userData} theme={theme} />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左侧栏 - 个人信息、联系方式、技能等 */}
          <div className="lg:col-span-1 space-y-6">
            <UserHeader userData={userData} isEditing={isEditing} theme={theme} />

            <UserContact
              contact={userData.contact}
              socialLinks={userData.socialLinks}
              isEditing={isEditing}
              theme={theme}
            />

            <UserSkills skills={userData.skills} languages={userData.languages} isEditing={isEditing} theme={theme} />

            <UserCertifications certifications={userData.certifications} isEditing={isEditing} theme={theme} />

            <UserInterests interests={userData.interests} isEditing={isEditing} theme={theme} />
          </div>

          {/* 右侧栏 - 工作经验、教育背景、项目经验等 */}
          <div className="lg:col-span-2 space-y-6">
            <UserExperience experience={userData.experience} isEditing={isEditing} theme={theme} />

            <UserProjects projects={userData.projects} isEditing={isEditing} theme={theme} />

            <UserEducation education={userData.education} isEditing={isEditing} theme={theme} />

            <UserReferences references={userData.references} isEditing={isEditing} theme={theme} />
          </div>
        </div>
      </div>
    </div>
  )
}

// 根据主题返回对应的CSS类
function getThemeClasses(theme: string): string {
  switch (theme) {
    case "minimal":
      return "bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100"
    case "gradient":
      return "bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900 dark:to-indigo-950"
    case "synthwave":
      return "bg-gradient-to-br from-purple-900 to-pink-800 text-white"
    case "nature":
      return "bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900 dark:to-emerald-950"
    case "tech":
      return "bg-gradient-to-br from-gray-100 to-blue-50 dark:from-gray-900 dark:to-blue-950"
    default:
      return "bg-background text-foreground"
  }
}

