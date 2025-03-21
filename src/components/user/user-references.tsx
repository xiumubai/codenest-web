"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, X, Users, Eye, EyeOff } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface Reference {
  id: number
  name: string
  position: string
  company: string
  email: string
  phone: string
  relationship: string
  isVisible: boolean
}

interface UserReferencesProps {
  references: Reference[]
  isEditing: boolean
  theme: string
}

export function UserReferences({ references: initialReferences, isEditing, theme }: UserReferencesProps) {
  const [references, setReferences] = useState<Reference[]>(initialReferences)
  const [newReference, setNewReference] = useState<Partial<Reference>>({
    name: "",
    position: "",
    company: "",
    email: "",
    phone: "",
    relationship: "",
    isVisible: false,
  })
  const [showAddForm, setShowAddForm] = useState(false)

  const addReference = () => {
    if (!newReference.name || !newReference.position || !newReference.company) return

    const referenceToAdd = {
      id: Date.now(),
      name: newReference.name || "",
      position: newReference.position || "",
      company: newReference.company || "",
      email: newReference.email || "",
      phone: newReference.phone || "",
      relationship: newReference.relationship || "",
      isVisible: newReference.isVisible || false,
    }

    setReferences([...references, referenceToAdd])
    setNewReference({
      name: "",
      position: "",
      company: "",
      email: "",
      phone: "",
      relationship: "",
      isVisible: false,
    })
    setShowAddForm(false)
  }

  const removeReference = (id: number) => {
    setReferences(references.filter((ref) => ref.id !== id))
  }

  const toggleVisibility = (id: number) => {
    setReferences(references.map((ref) => (ref.id === id ? { ...ref, isVisible: !ref.isVisible } : ref)))
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
        <CardTitle>推荐人</CardTitle>
        {isEditing && !showAddForm && (
          <Button variant="outline" size="sm" onClick={() => setShowAddForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            添加推荐人
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {isEditing && showAddForm && (
          <div className="mb-8 p-4 border rounded-lg">
            <h3 className="text-lg font-medium mb-4">添加推荐人</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">姓名</label>
                  <Input
                    value={newReference.name || ""}
                    onChange={(e) => setNewReference({ ...newReference, name: e.target.value })}
                    placeholder="推荐人姓名"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">职位</label>
                  <Input
                    value={newReference.position || ""}
                    onChange={(e) => setNewReference({ ...newReference, position: e.target.value })}
                    placeholder="推荐人职位"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">公司</label>
                <Input
                  value={newReference.company || ""}
                  onChange={(e) => setNewReference({ ...newReference, company: e.target.value })}
                  placeholder="推荐人所在公司"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">电子邮箱</label>
                  <Input
                    value={newReference.email || ""}
                    onChange={(e) => setNewReference({ ...newReference, email: e.target.value })}
                    placeholder="推荐人邮箱"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">电话</label>
                  <Input
                    value={newReference.phone || ""}
                    onChange={(e) => setNewReference({ ...newReference, phone: e.target.value })}
                    placeholder="推荐人电话"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">关系</label>
                <Input
                  value={newReference.relationship || ""}
                  onChange={(e) => setNewReference({ ...newReference, relationship: e.target.value })}
                  placeholder="与推荐人的关系，如：前主管"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="reference-visibility"
                  checked={newReference.isVisible || false}
                  onCheckedChange={(checked) => setNewReference({ ...newReference, isVisible: checked })}
                />
                <Label htmlFor="reference-visibility">公开显示此推荐人</Label>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  取消
                </Button>
                <Button
                  onClick={addReference}
                  disabled={!newReference.name || !newReference.position || !newReference.company}
                >
                  保存
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {references.map((reference) => (
            <div key={reference.id} className="relative group border rounded-lg p-4">
              {isEditing && (
                <div className="absolute -right-2 -top-2 z-10">
                  <Button
                    variant="destructive"
                    size="icon"
                    className="h-6 w-6 rounded-full"
                    onClick={() => removeReference(reference.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-base font-medium">{reference.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {reference.position} at {reference.company}
                      </p>
                    </div>

                    {isEditing && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => toggleVisibility(reference.id)}
                      >
                        {reference.isVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </Button>
                    )}
                  </div>

                  {(reference.isVisible || isEditing) && (
                    <div className="mt-2 space-y-1">
                      {reference.relationship && <p className="text-sm">关系: {reference.relationship}</p>}
                      {reference.email && <p className="text-sm">邮箱: {reference.email}</p>}
                      {reference.phone && <p className="text-sm">电话: {reference.phone}</p>}
                      {!reference.isVisible && isEditing && (
                        <p className="text-xs text-muted-foreground italic mt-2">此推荐人信息仅对您可见</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {references.length === 0 && !showAddForm && (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">暂无推荐人</p>
              {isEditing && (
                <Button onClick={() => setShowAddForm(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  添加推荐人
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

