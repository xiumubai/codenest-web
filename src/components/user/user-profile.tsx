"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  MapPin,
  ExternalLink,
  Calendar,
  Users,
  FileText,
  MessageSquare,
  Github,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Upload,
} from "lucide-react"

interface UserProfileProps {
  userData: any
  isEditing: boolean
  theme: string
}

export function UserProfile({ userData, isEditing, theme }: UserProfileProps) {
  const [editedData, setEditedData] = useState({
    name: userData.name,
    bio: userData.bio,
    location: userData.location,
    website: userData.website,
  })

  const [coverImage, setCoverImage] = useState(userData.coverImage)
  const [avatarImage, setAvatarImage] = useState(userData.avatar)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditedData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const imageUrl = URL.createObjectURL(file)
      setCoverImage(imageUrl)
    }
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const imageUrl = URL.createObjectURL(file)
      setAvatarImage(imageUrl)
    }
  }

  const getSocialIcon = (platform: string) => {
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
    <div className="relative">
      {/* 封面图片 */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        {isEditing && (
          <label className="absolute inset-0 flex items-center justify-center bg-black/50 z-10 cursor-pointer">
            <div className="flex flex-col items-center text-white">
              <Upload className="h-8 w-8 mb-2" />
              <span>上传封面图片</span>
            </div>
            <input type="file" accept="image/*" className="hidden" onChange={handleCoverImageChange} />
          </label>
        )}
        <Image src={coverImage || "/placeholder.svg"} alt="Cover" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>

      <div className="container relative -mt-32 z-10">
        <Card className={`overflow-visible ${getCardStyle()}`}>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* 头像 */}
              <div className="relative -mt-24 mx-auto md:mx-0">
                <div className="relative h-40 w-40 rounded-full border-4 border-background overflow-hidden">
                  {isEditing && (
                    <label className="absolute inset-0 flex items-center justify-center bg-black/50 z-10 cursor-pointer rounded-full">
                      <Upload className="h-8 w-8 text-white" />
                      <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                    </label>
                  )}
                  <Image src={avatarImage || "/placeholder.svg"} alt={userData.name} fill className="object-cover" />
                </div>
              </div>

              {/* 用户信息 */}
              <div className="flex-1 text-center md:text-left">
                {isEditing ? (
                  <Input
                    name="name"
                    value={editedData.name}
                    onChange={handleInputChange}
                    className="text-2xl font-bold mb-2"
                  />
                ) : (
                  <h1 className="text-2xl md:text-3xl font-bold mb-1">{editedData.name}</h1>
                )}
                <p className="text-muted-foreground mb-3">@{userData.username}</p>

                {isEditing ? (
                  <Textarea
                    name="bio"
                    value={editedData.bio}
                    onChange={handleInputChange}
                    className="mb-4 min-h-[80px]"
                  />
                ) : (
                  <p className="mb-4">{editedData.bio}</p>
                )}

                <div className="flex flex-wrap gap-4 mb-4 justify-center md:justify-start">
                  {isEditing ? (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <Input
                        name="location"
                        value={editedData.location}
                        onChange={handleInputChange}
                        className="w-40"
                        placeholder="所在地"
                      />
                    </div>
                  ) : (
                    userData.location && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
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
                        className="w-40"
                        placeholder="个人网站"
                      />
                    </div>
                  ) : (
                    userData.website && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
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

                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    加入于 {new Date(userData.joinDate).toLocaleDateString()}
                  </div>
                </div>

                {/* 社交链接 */}
                <div className="flex gap-2 mb-6 justify-center md:justify-start">
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
                  {isEditing && (
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Plus className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                {/* 统计数据 */}
                <div className="grid grid-cols-3 md:grid-cols-4 gap-4 text-center">
                  <div className="flex flex-col items-center p-2 rounded-lg bg-muted/50">
                    <FileText className="h-5 w-5 text-primary mb-1" />
                    <span className="font-bold">{userData.articles}</span>
                    <span className="text-xs text-muted-foreground">文章</span>
                  </div>
                  <div className="flex flex-col items-center p-2 rounded-lg bg-muted/50">
                    <MessageSquare className="h-5 w-5 text-primary mb-1" />
                    <span className="font-bold">{userData.questions}</span>
                    <span className="text-xs text-muted-foreground">问题</span>
                  </div>
                  <div className="flex flex-col items-center p-2 rounded-lg bg-muted/50">
                    <MessageSquare className="h-5 w-5 text-primary mb-1" />
                    <span className="font-bold">{userData.answers}</span>
                    <span className="text-xs text-muted-foreground">回答</span>
                  </div>
                  <div className="flex flex-col items-center p-2 rounded-lg bg-muted/50 col-span-3 md:col-span-1">
                    <Users className="h-5 w-5 text-primary mb-1" />
                    <div className="flex gap-2 justify-center">
                      <div>
                        <span className="font-bold">{userData.followers}</span>
                        <span className="text-xs text-muted-foreground block">关注者</span>
                      </div>
                      <div>
                        <span className="font-bold">{userData.following}</span>
                        <span className="text-xs text-muted-foreground block">关注</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 关注按钮 - 仅对他人的主页显示 */}
              {!userData.isCurrentUser && (
                <div className="md:self-start mt-4 md:mt-0">
                  <Button>关注</Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// 添加缺失的组件
function Plus(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}

