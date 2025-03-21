"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, CheckCircle2 } from "lucide-react"

interface ResumeCompletenessProps {
  userData: any
  theme: string
}

export function ResumeCompleteness({ userData, theme }: ResumeCompletenessProps) {
  // 计算简历完整度
  const calculateCompleteness = () => {
    let score = 0
    let total = 0

    // 个人信息
    if (userData.name) score++
    if (userData.title) score++
    if (userData.bio) score++
    if (userData.about) score++
    total += 4

    // 联系方式
    if (userData.contact.email) score++
    if (userData.contact.phone) score++
    if (userData.contact.location) score++
    if (userData.contact.website) score++
    total += 4

    // 社交链接
    if (userData.socialLinks.length > 0) score++
    total++

    // 技能
    if (userData.skills.length > 0) score++
    if (userData.skills.length >= 5) score++
    total += 2

    // 语言
    if (userData.languages.length > 0) score++
    total++

    // 工作经验
    if (userData.experience.length > 0) score++
    if (userData.experience.length >= 2) score++
    if (userData.experience.some((exp) => exp.achievements.length > 0)) score++
    total += 3

    // 教育背景
    if (userData.education.length > 0) score++
    total++

    // 项目经验
    if (userData.projects.length > 0) score++
    if (userData.projects.length >= 2) score++
    total += 2

    // 证书
    if (userData.certifications.length > 0) score++
    total++

    // 兴趣爱好
    if (userData.interests && userData.interests.length > 0) score++
    total++

    const percentage = Math.round((score / total) * 100)
    return {
      score,
      total,
      percentage,
      missingItems: getMissingItems(userData),
    }
  }

  const getMissingItems = (userData: any) => {
    const missing = []

    if (!userData.name || !userData.title) missing.push("完善个人基本信息")
    if (!userData.about) missing.push("添加个人介绍")
    if (!userData.contact.email || !userData.contact.phone) missing.push("完善联系方式")
    if (userData.skills.length < 5) missing.push("添加更多技能（至少5项）")
    if (userData.experience.length === 0) missing.push("添加工作经验")
    if (userData.experience.length > 0 && !userData.experience.some((exp) => exp.achievements.length > 0))
      missing.push("为工作经验添加成就")
    if (userData.education.length === 0) missing.push("添加教育背景")
    if (userData.projects.length < 2) missing.push("添加更多项目经验（至少2项）")
    if (userData.certifications.length === 0) missing.push("添加证书或认证")
    if (!userData.interests || userData.interests.length === 0) missing.push("添加兴趣爱好")

    return missing
  }

  const completeness = calculateCompleteness()

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
      <CardHeader>
        <CardTitle>简历完整度</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium">{completeness.percentage}%</span>
            <span className="text-sm text-muted-foreground">
              {completeness.score}/{completeness.total}
            </span>
          </div>
          <Progress value={completeness.percentage} className="h-2" />
        </div>

        {completeness.missingItems.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium">待完善项目：</h3>
            <ul className="space-y-1">
              {completeness.missingItems.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {completeness.percentage === 100 && (
          <div className="flex items-center gap-2 p-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-md">
            <CheckCircle2 className="h-5 w-5" />
            <span className="text-sm font-medium">您的简历已完善，看起来很棒！</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

