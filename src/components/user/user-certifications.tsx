"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, X, Award, ExternalLink } from "lucide-react"

interface Certification {
  id: number
  name: string
  issuer: string
  date: string
  link: string
}

interface UserCertificationsProps {
  certifications: Certification[]
  isEditing: boolean
  theme: string
}

export function UserCertifications({
  certifications: initialCertifications,
  isEditing,
  theme,
}: UserCertificationsProps) {
  const [certifications, setCertifications] = useState<Certification[]>(initialCertifications)
  const [newCertification, setNewCertification] = useState<Partial<Certification>>({
    name: "",
    issuer: "",
    date: "",
    link: "",
  })
  const [showAddForm, setShowAddForm] = useState(false)

  const addCertification = () => {
    if (!newCertification.name || !newCertification.issuer) return

    const certificationToAdd = {
      id: Date.now(),
      name: newCertification.name || "",
      issuer: newCertification.issuer || "",
      date: newCertification.date || "",
      link: newCertification.link || "",
    }

    setCertifications([...certifications, certificationToAdd])
    setNewCertification({
      name: "",
      issuer: "",
      date: "",
      link: "",
    })
    setShowAddForm(false)
  }

  const removeCertification = (id: number) => {
    setCertifications(certifications.filter((cert) => cert.id !== id))
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
        <CardTitle>证书与认证</CardTitle>
        {isEditing && !showAddForm && (
          <Button variant="outline" size="sm" onClick={() => setShowAddForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            添加证书
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {isEditing && showAddForm && (
          <div className="mb-6 p-4 border rounded-lg">
            <h3 className="text-lg font-medium mb-4">添加证书</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">证书名称</label>
                <Input
                  value={newCertification.name || ""}
                  onChange={(e) => setNewCertification({ ...newCertification, name: e.target.value })}
                  placeholder="证书名称"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">颁发机构</label>
                <Input
                  value={newCertification.issuer || ""}
                  onChange={(e) => setNewCertification({ ...newCertification, issuer: e.target.value })}
                  placeholder="颁发机构"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">获得日期</label>
                <Input
                  value={newCertification.date || ""}
                  onChange={(e) => setNewCertification({ ...newCertification, date: e.target.value })}
                  placeholder="例如：2022年5月"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">证书链接</label>
                <Input
                  value={newCertification.link || ""}
                  onChange={(e) => setNewCertification({ ...newCertification, link: e.target.value })}
                  placeholder="证书链接或验证地址"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  取消
                </Button>
                <Button onClick={addCertification} disabled={!newCertification.name || !newCertification.issuer}>
                  保存
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {certifications.map((cert) => (
            <div key={cert.id} className="relative group">
              {isEditing && (
                <div className="absolute -right-2 -top-2 z-10">
                  <Button
                    variant="destructive"
                    size="icon"
                    className="h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeCertification(cert.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}

              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                  <Award className="h-4 w-4 text-primary" />
                </div>

                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <h3 className="text-base font-medium">{cert.name}</h3>
                    <span className="text-sm text-muted-foreground">{cert.date}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{cert.issuer}</p>

                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs font-medium text-primary hover:underline mt-1"
                    >
                      查看证书 <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}

          {certifications.length === 0 && !showAddForm && (
            <div className="text-center py-6">
              <p className="text-muted-foreground mb-4">暂无证书</p>
              {isEditing && (
                <Button variant="outline" size="sm" onClick={() => setShowAddForm(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  添加证书
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

