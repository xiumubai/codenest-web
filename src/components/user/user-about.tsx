"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, ExternalLink, Calendar } from "lucide-react"

interface UserAboutProps {
  userData: any
  isEditing: boolean
  theme: string
}

export function UserAbout({ userData, isEditing, theme }: UserAboutProps) {
  const [editedData, setEditedData] = useState({
    name: userData.name,
    bio: userData.bio,
    about: userData.about,
    location: userData.location,
    website: userData.website,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditedData((prev) => ({
      ...prev,
      [name]: value,
    }))
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
      <CardHeader>
        <CardTitle>关于我</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* 关于我内容 */}
          {isEditing ? (
            <Textarea
              name="about"
              value={editedData.about}
              onChange={handleInputChange}
              className="min-h-[120px]"
              placeholder="介绍一下自己..."
            />
          ) : (
            <div className="prose prose-sm md:prose-base max-w-none dark:prose-invert">
              {editedData.about.split("\n").map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          )}

          {/* 用户信息和统计 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">个人信息</h3>
              <div className="space-y-2">
                {isEditing ? (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <Input
                      name="location"
                      value={editedData.location}
                      onChange={handleInputChange}
                      placeholder="所在地"
                    />
                  </div>
                ) : (
                  userData.location && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {editedData.location}
                    </div>
                  )
                )}

                {isEditing ? (
                  <div className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    <Input
                      name="website"
                      value={editedData.website}
                      onChange={handleInputChange}
                      placeholder="个人网站"
                    />
                  </div>
                ) : (
                  userData.website && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <ExternalLink className="h-4 w-4" />
                      <a
                        href={editedData.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {editedData.website.replace(/^https?:\/\//, "")}
                      </a>
                    </div>
                  )
                )}

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  加入于 {new Date(userData.joinDate).toLocaleDateString()}
                </div>
              </div>

              {/* 社交链接 */}
              <div className="pt-2">
                <h3 className="text-lg font-medium mb-2">社交链接</h3>
                <div className="flex flex-wrap gap-2">
                  {userData.socialLinks.map((link: any, index: number) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                    >
                      {getSocialIcon(link.platform)}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">统计数据</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center p-3 rounded-lg bg-muted/50">
                  <span className="font-bold text-2xl">{userData.articles}</span>
                  <span className="text-sm text-muted-foreground">文章</span>
                </div>
                <div className="flex flex-col items-center p-3 rounded-lg bg-muted/50">
                  <span className="font-bold text-2xl">{userData.questions}</span>
                  <span className="text-sm text-muted-foreground">问题</span>
                </div>
                <div className="flex flex-col items-center p-3 rounded-lg bg-muted/50">
                  <span className="font-bold text-2xl">{userData.answers}</span>
                  <span className="text-sm text-muted-foreground">回答</span>
                </div>
                <div className="flex flex-col items-center p-3 rounded-lg bg-muted/50">
                  <div className="flex gap-4 items-center">
                    <div className="text-center">
                      <span className="font-bold text-xl">{userData.followers}</span>
                      <span className="text-xs text-muted-foreground block">关注者</span>
                    </div>
                    <div className="text-center">
                      <span className="font-bold text-xl">{userData.following}</span>
                      <span className="text-xs text-muted-foreground block">关注</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// 社交图标辅助函数
function getSocialIcon(platform: string) {
  switch (platform) {
    case "github":
      return <Github className="h-5 w-5" />
    case "twitter":
      return <Twitter className="h-5 w-5" />
    case "linkedin":
      return <Linkedin className="h-5 w-5" />
    case "instagram":
      return <Instagram className="h-5 w-5" />
    case "youtube":
      return <Youtube className="h-5 w-5" />
    default:
      return <ExternalLink className="h-5 w-5" />
  }
}

// 添加缺失的组件
function Github(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

function Twitter(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}

function Linkedin(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function Instagram(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function Youtube(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  )
}

