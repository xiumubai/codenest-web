"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Lock, Globe, Users, User, Link, Copy, Check } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

interface ResumePrivacyProps {
  privacy: {
    visibility: "public" | "private" | "unlisted" | "contacts"
    allowDownload: boolean
    showEmail: boolean
    showPhone: boolean
    showSocialLinks: boolean
    allowSearch: boolean
    customUrl?: string
  }
  onPrivacyChange: (privacy: any) => void
}

export function ResumePrivacy({ privacy, onPrivacyChange }: ResumePrivacyProps) {
  const [settings, setSettings] = useState(privacy)
  const [copied, setCopied] = useState(false)

  const handleChange = (key: string, value: any) => {
    const updatedSettings = { ...settings, [key]: value }
    setSettings(updatedSettings)
    onPrivacyChange(updatedSettings)
  }

  const copyLink = () => {
    const url = `https://example.com/${settings.customUrl || "resume/johndoe"}`
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="bg-background/80 backdrop-blur-sm">
          <Lock className="mr-2 h-4 w-4" />
          隐私设置
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>简历隐私设置</DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          <div className="space-y-3">
            <h3 className="text-sm font-medium">谁可以查看您的简历？</h3>
            <RadioGroup
              value={settings.visibility}
              onValueChange={(value: "public" | "private" | "unlisted" | "contacts") =>
                handleChange("visibility", value)
              }
              className="space-y-3"
            >
              <div className="flex items-start space-x-3 p-3 border rounded-lg">
                <RadioGroupItem value="public" id="public" className="mt-1" />
                <div>
                  <Label htmlFor="public" className="font-medium flex items-center">
                    <Globe className="h-4 w-4 mr-2" />
                    公开
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">任何人都可以查看您的简历，它将出现在搜索结果中</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 border rounded-lg">
                <RadioGroupItem value="unlisted" id="unlisted" className="mt-1" />
                <div>
                  <Label htmlFor="unlisted" className="font-medium flex items-center">
                    <Link className="h-4 w-4 mr-2" />
                    不公开列出
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    只有知道链接的人才能查看您的简历，它不会出现在搜索结果中
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 border rounded-lg">
                <RadioGroupItem value="contacts" id="contacts" className="mt-1" />
                <div>
                  <Label htmlFor="contacts" className="font-medium flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    仅联系人
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">只有您的联系人可以查看您的简历</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 border rounded-lg">
                <RadioGroupItem value="private" id="private" className="mt-1" />
                <div>
                  <Label htmlFor="private" className="font-medium flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    私密
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">只有您可以查看您的简历</p>
                </div>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-sm font-medium">简历链接</h3>
            <div className="flex gap-2">
              <Input
                value={settings.customUrl || "resume/johndoe"}
                onChange={(e) => handleChange("customUrl", e.target.value)}
                className="flex-1"
                placeholder="自定义URL"
                disabled={settings.visibility === "private"}
              />
              <Button variant="outline" size="icon" onClick={copyLink} disabled={settings.visibility === "private"}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              {settings.visibility !== "private"
                ? `您的简历链接: https://example.com/${settings.customUrl || "resume/johndoe"}`
                : "启用公开访问以获取简历链接"}
            </p>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-sm font-medium">其他隐私设置</h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">允许下载</Label>
                  <p className="text-sm text-muted-foreground">允许访问者下载您的简历</p>
                </div>
                <Switch
                  checked={settings.allowDownload}
                  onCheckedChange={(checked) => handleChange("allowDownload", checked)}
                  disabled={settings.visibility === "private"}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">显示电子邮箱</Label>
                  <p className="text-sm text-muted-foreground">在简历中显示您的电子邮箱</p>
                </div>
                <Switch
                  checked={settings.showEmail}
                  onCheckedChange={(checked) => handleChange("showEmail", checked)}
                  disabled={settings.visibility === "private"}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">显示电话号码</Label>
                  <p className="text-sm text-muted-foreground">在简历中显示您的电话号码</p>
                </div>
                <Switch
                  checked={settings.showPhone}
                  onCheckedChange={(checked) => handleChange("showPhone", checked)}
                  disabled={settings.visibility === "private"}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">显示社交链接</Label>
                  <p className="text-sm text-muted-foreground">在简历中显示您的社交媒体链接</p>
                </div>
                <Switch
                  checked={settings.showSocialLinks}
                  onCheckedChange={(checked) => handleChange("showSocialLinks", checked)}
                  disabled={settings.visibility === "private"}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">允许搜索</Label>
                  <p className="text-sm text-muted-foreground">允许您的简历出现在搜索结果中</p>
                </div>
                <Switch
                  checked={settings.allowSearch}
                  onCheckedChange={(checked) => handleChange("allowSearch", checked)}
                  disabled={settings.visibility !== "public"}
                />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

