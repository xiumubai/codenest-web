"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function UserSettings() {
  const [isLoading, setIsLoading] = useState(false)
  const [profileData, setProfileData] = useState({
    username: "张三",
    email: "zhangsan@example.com",
    bio: "热爱编程和技术分享，专注于Web开发和人工智能领域。喜欢通过写作分享知识和经验。",
    location: "北京",
    website: "https://zhangsan.dev",
    twitter: "@zhangsan",
    github: "zhangsan",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    articleComments: true,
    newFollowers: true,
    mentions: true,
    newsletter: false,
  })

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationChange = (name: string, checked: boolean) => {
    setNotificationSettings((prev) => ({ ...prev, [name]: checked }))
  }

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // 这里应该是实际的保存逻辑
      console.log("保存个人资料:", profileData)

      // 模拟保存延迟
      await new Promise((resolve) => setTimeout(resolve, 1000))

      alert("个人资料已更新")
    } catch (error) {
      console.error("保存失败:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleNotificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // 这里应该是实际的保存逻辑
      console.log("保存通知设置:", notificationSettings)

      // 模拟保存延迟
      await new Promise((resolve) => setTimeout(resolve, 1000))

      alert("通知设置已更新")
    } catch (error) {
      console.error("保存失败:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">账号设置</h2>
      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">个人资料</TabsTrigger>
          <TabsTrigger value="notifications">通知设置</TabsTrigger>
          <TabsTrigger value="security">安全设置</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="mt-6 space-y-6">
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="username">用户名</Label>
                <Input id="username" name="username" value={profileData.username} onChange={handleProfileChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">邮箱</Label>
                <Input id="email" name="email" type="email" value={profileData.email} onChange={handleProfileChange} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="bio">个人简介</Label>
                <Textarea id="bio" name="bio" rows={4} value={profileData.bio} onChange={handleProfileChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">所在地</Label>
                <Input id="location" name="location" value={profileData.location} onChange={handleProfileChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">个人网站</Label>
                <Input id="website" name="website" value={profileData.website} onChange={handleProfileChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter</Label>
                <Input id="twitter" name="twitter" value={profileData.twitter} onChange={handleProfileChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="github">GitHub</Label>
                <Input id="github" name="github" value={profileData.github} onChange={handleProfileChange} />
              </div>
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "保存中..." : "保存更改"}
            </Button>
          </form>
        </TabsContent>
        <TabsContent value="notifications" className="mt-6 space-y-6">
          <form onSubmit={handleNotificationSubmit} className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">邮件通知</Label>
                  <p className="text-sm text-muted-foreground">接收所有通知的邮件提醒</p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={notificationSettings.emailNotifications}
                  onCheckedChange={(checked) => handleNotificationChange("emailNotifications", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="article-comments">文章评论</Label>
                  <p className="text-sm text-muted-foreground">当有人评论您的文章时通知您</p>
                </div>
                <Switch
                  id="article-comments"
                  checked={notificationSettings.articleComments}
                  onCheckedChange={(checked) => handleNotificationChange("articleComments", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="new-followers">新关注者</Label>
                  <p className="text-sm text-muted-foreground">当有人关注您时通知您</p>
                </div>
                <Switch
                  id="new-followers"
                  checked={notificationSettings.newFollowers}
                  onCheckedChange={(checked) => handleNotificationChange("newFollowers", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="mentions">提及</Label>
                  <p className="text-sm text-muted-foreground">当有人在评论中提及您时通知您</p>
                </div>
                <Switch
                  id="mentions"
                  checked={notificationSettings.mentions}
                  onCheckedChange={(checked) => handleNotificationChange("mentions", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="newsletter">电子通讯</Label>
                  <p className="text-sm text-muted-foreground">接收我们的定期电子通讯</p>
                </div>
                <Switch
                  id="newsletter"
                  checked={notificationSettings.newsletter}
                  onCheckedChange={(checked) => handleNotificationChange("newsletter", checked)}
                />
              </div>
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "保存中..." : "保存更改"}
            </Button>
          </form>
        </TabsContent>
        <TabsContent value="security" className="mt-6 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">更改密码</h3>
              <p className="text-sm text-muted-foreground">更新您的密码以保护账号安全</p>
            </div>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">当前密码</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">新密码</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">确认新密码</Label>
                <Input id="confirm-password" type="password" />
              </div>
              <Button type="submit">更新密码</Button>
            </form>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">双因素认证</h3>
              <p className="text-sm text-muted-foreground">添加额外的安全层来保护您的账号</p>
            </div>
            <Button variant="outline">设置双因素认证</Button>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-destructive">删除账号</h3>
              <p className="text-sm text-muted-foreground">永久删除您的账号和所有数据</p>
            </div>
            <Button variant="destructive">删除账号</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

