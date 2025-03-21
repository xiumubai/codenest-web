"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Upload } from "lucide-react"

interface UserHeaderProps {
  userData: any
  isEditing: boolean
  theme: string
}

export function UserHeader({ userData, isEditing, theme }: UserHeaderProps) {
  const [avatarImage, setAvatarImage] = useState(userData.avatar)
  const [name, setName] = useState(userData.name)
  const [title, setTitle] = useState(userData.title)
  const [bio, setBio] = useState(userData.bio)
  const [about, setAbout] = useState(userData.about)

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const imageUrl = URL.createObjectURL(file)
      setAvatarImage(imageUrl)
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
        <div className="flex flex-col items-center text-center">
          {/* 头像 */}
          <div className="relative mb-4">
            <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-background">
              {isEditing && (
                <label className="absolute inset-0 flex items-center justify-center bg-black/50 z-10 cursor-pointer rounded-full">
                  <Upload className="h-6 w-6 text-white" />
                  <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                </label>
              )}
              <Image src={avatarImage || "/placeholder.svg"} alt={name} fill className="object-cover" />
            </div>
          </div>

          {/* 姓名和职位 */}
          {isEditing ? (
            <div className="space-y-2 w-full">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-center text-xl font-bold"
                placeholder="姓名"
              />
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-center"
                placeholder="职位"
              />
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold">{name}</h1>
              <p className="text-lg text-muted-foreground">{title}</p>
            </>
          )}

          {/* 简介 */}
          <div className="mt-4 w-full">
            {isEditing ? (
              <div className="space-y-2">
                <Input
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="text-center"
                  placeholder="简短介绍"
                />
                <Textarea
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  className="min-h-[80px]"
                  placeholder="详细介绍"
                />
              </div>
            ) : (
              <>
                <p className="text-sm font-medium mt-2">{bio}</p>
                <p className="text-sm text-muted-foreground mt-4">{about}</p>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

