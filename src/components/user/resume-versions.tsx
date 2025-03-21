"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Copy, Files, MoreHorizontal, Trash2, Edit, Star, Calendar, CheckCircle2, Clock } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

interface ResumeVersion {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
  isDefault: boolean
  jobTitle?: string
  company?: string
  status: "draft" | "active" | "archived"
}

interface ResumeVersionsProps {
  versions: ResumeVersion[]
  currentVersionId: string
  onVersionChange: (versionId: string) => void
  onVersionCreate: (version: Omit<ResumeVersion, "id" | "createdAt" | "updatedAt">) => void
  onVersionDelete: (versionId: string) => void
  onVersionUpdate: (versionId: string, data: Partial<ResumeVersion>) => void
}

export function ResumeVersions({
  versions,
  currentVersionId,
  onVersionChange,
  onVersionCreate,
  onVersionDelete,
  onVersionUpdate,
}: ResumeVersionsProps) {
  const [newVersionName, setNewVersionName] = useState("")
  const [newVersionJobTitle, setNewVersionJobTitle] = useState("")
  const [newVersionCompany, setNewVersionCompany] = useState("")

  const handleCreateVersion = () => {
    if (!newVersionName.trim()) return

    onVersionCreate({
      name: newVersionName.trim(),
      jobTitle: newVersionJobTitle.trim() || undefined,
      company: newVersionCompany.trim() || undefined,
      isDefault: false,
      status: "draft",
    })

    setNewVersionName("")
    setNewVersionJobTitle("")
    setNewVersionCompany("")
  }

  const handleSetDefault = (versionId: string) => {
    // 更新所有版本，将当前版本设为默认，其他版本取消默认
    versions.forEach((version) => {
      if (version.id === versionId) {
        onVersionUpdate(version.id, { isDefault: true })
      } else if (version.isDefault) {
        onVersionUpdate(version.id, { isDefault: false })
      }
    })
  }

  const getStatusBadge = (status: ResumeVersion["status"]) => {
    switch (status) {
      case "draft":
        return (
          <Badge variant="outline" className="text-yellow-500 border-yellow-200 bg-yellow-50">
            <Clock className="h-3 w-3 mr-1" />
            草稿
          </Badge>
        )
      case "active":
        return (
          <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            已发布
          </Badge>
        )
      case "archived":
        return (
          <Badge variant="outline" className="text-gray-500 border-gray-200 bg-gray-50">
            已归档
          </Badge>
        )
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="bg-background/80 backdrop-blur-sm">
          <Files className="mr-2 h-4 w-4" />
          简历版本
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>管理简历版本</DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          {/* 创建新版本 */}
          <div className="p-4 border rounded-lg">
            <h3 className="text-lg font-medium mb-4">创建新版本</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">版本名称</label>
                <Input
                  value={newVersionName}
                  onChange={(e) => setNewVersionName(e.target.value)}
                  placeholder="例如：软件工程师简历"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">目标职位（可选）</label>
                  <Input
                    value={newVersionJobTitle}
                    onChange={(e) => setNewVersionJobTitle(e.target.value)}
                    placeholder="例如：前端开发工程师"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">目标公司（可选）</label>
                  <Input
                    value={newVersionCompany}
                    onChange={(e) => setNewVersionCompany(e.target.value)}
                    placeholder="例如：科技有限公司"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleCreateVersion} disabled={!newVersionName.trim()}>
                  创建新版本
                </Button>
              </div>
            </div>
          </div>

          {/* 版本列表 */}
          <div>
            <h3 className="text-lg font-medium mb-4">我的简历版本</h3>
            <div className="space-y-3">
              {versions.map((version) => (
                <div
                  key={version.id}
                  className={`
                    p-4 border rounded-lg flex items-center justify-between
                    ${currentVersionId === version.id ? "border-primary bg-primary/5" : ""}
                    ${version.isDefault ? "border-primary/50" : ""}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      {version.isDefault && <Star className="h-5 w-5 text-amber-400 fill-amber-400" />}
                      {!version.isDefault && <Files className="h-5 w-5 text-muted-foreground" />}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{version.name}</h4>
                        {getStatusBadge(version.status)}
                        {version.isDefault && (
                          <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
                            默认
                          </Badge>
                        )}
                      </div>

                      {(version.jobTitle || version.company) && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {version.jobTitle && `${version.jobTitle}`}
                          {version.jobTitle && version.company && ` @ `}
                          {version.company && `${version.company}`}
                        </p>
                      )}

                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          更新于 {format(version.updatedAt, "yyyy-MM-dd")}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {currentVersionId !== version.id && (
                      <Button variant="outline" size="sm" onClick={() => onVersionChange(version.id)}>
                        切换
                      </Button>
                    )}

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onVersionUpdate(version.id, { name: `${version.name} 副本` })}>
                          <Copy className="h-4 w-4 mr-2" />
                          复制
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            onVersionUpdate(version.id, { name: prompt("请输入新名称", version.name) || version.name })
                          }
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          重命名
                        </DropdownMenuItem>
                        {!version.isDefault && (
                          <DropdownMenuItem onClick={() => handleSetDefault(version.id)}>
                            <Star className="h-4 w-4 mr-2" />
                            设为默认
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-500 focus:text-red-500"
                          onClick={() => {
                            if (confirm("确定要删除此版本吗？此操作无法撤销。")) {
                              onVersionDelete(version.id)
                            }
                          }}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          删除
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}

              {versions.length === 0 && (
                <div className="text-center py-8 border rounded-lg">
                  <p className="text-muted-foreground">暂无简历版本</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

