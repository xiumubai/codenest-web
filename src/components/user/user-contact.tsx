"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Github,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  ExternalLink,
  Plus,
  X,
} from "lucide-react"

interface Contact {
  email: string
  phone: string
  location: string
  website: string
}

interface SocialLink {
  platform: string
  url: string
}

interface UserContactProps {
  contact: Contact
  socialLinks: SocialLink[]
  isEditing: boolean
  theme: string
}

export function UserContact({ contact, socialLinks: initialSocialLinks, isEditing, theme }: UserContactProps) {
  const [contactInfo, setContactInfo] = useState(contact)
  const [socialLinks, setSocialLinks] = useState(initialSocialLinks)
  const [newPlatform, setNewPlatform] = useState("")
  const [newUrl, setNewUrl] = useState("")

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setContactInfo({
      ...contactInfo,
      [name]: value,
    })
  }

  const addSocialLink = () => {
    if (!newPlatform || !newUrl) return
    setSocialLinks([...socialLinks, { platform: newPlatform, url: newUrl }])
    setNewPlatform("")
    setNewUrl("")
  }

  const removeSocialLink = (index: number) => {
    const updatedLinks = [...socialLinks]
    updatedLinks.splice(index, 1)
    setSocialLinks(updatedLinks)
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

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
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

  return (
    <Card className={getCardStyle()}>
      <CardHeader>
        <CardTitle>联系方式</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 联系信息 */}
        <div className="space-y-3">
          {isEditing ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <Input name="email" value={contactInfo.email} onChange={handleContactChange} placeholder="电子邮箱" />
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <Input name="phone" value={contactInfo.phone} onChange={handleContactChange} placeholder="电话号码" />
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <Input
                  name="location"
                  value={contactInfo.location}
                  onChange={handleContactChange}
                  placeholder="所在地"
                />
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-muted-foreground" />
                <Input
                  name="website"
                  value={contactInfo.website}
                  onChange={handleContactChange}
                  placeholder="个人网站"
                />
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <a href={`mailto:${contactInfo.email}`} className="text-sm hover:underline">
                  {contactInfo.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <a href={`tel:${contactInfo.phone}`} className="text-sm hover:underline">
                  {contactInfo.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">{contactInfo.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-muted-foreground" />
                <a
                  href={contactInfo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:underline"
                >
                  {contactInfo.website.replace(/^https?:\/\//, "")}
                </a>
              </div>
            </>
          )}
        </div>

        {/* 社交链接 */}
        <div>
          <h3 className="text-sm font-medium mb-2">社交媒体</h3>
          <div className="flex flex-wrap gap-2">
            {socialLinks.map((link, index) => (
              <div key={index} className="relative group">
                {isEditing && (
                  <button
                    onClick={() => removeSocialLink(index)}
                    className="absolute -right-1 -top-1 bg-destructive text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                  title={link.platform}
                >
                  {getSocialIcon(link.platform)}
                </a>
              </div>
            ))}

            {isEditing && (
              <div className="mt-2 space-y-2 w-full">
                <div className="flex gap-2">
                  <Input
                    value={newPlatform}
                    onChange={(e) => setNewPlatform(e.target.value)}
                    placeholder="平台名称"
                    className="flex-1"
                  />
                  <Input
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    placeholder="URL"
                    className="flex-1"
                  />
                  <Button size="sm" onClick={addSocialLink} disabled={!newPlatform || !newUrl}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

