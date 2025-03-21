"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, X, Heart } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Interest {
  name: string
  icon?: string
}

interface UserInterestsProps {
  interests: Interest[]
  isEditing: boolean
  theme: string
}

export function UserInterests({ interests: initialInterests, isEditing, theme }: UserInterestsProps) {
  const [interests, setInterests] = useState<Interest[]>(initialInterests)
  const [newInterest, setNewInterest] = useState("")

  const addInterest = () => {
    if (!newInterest.trim()) return
    setInterests([...interests, { name: newInterest.trim() }])
    setNewInterest("")
  }

  const removeInterest = (index: number) => {
    const updatedInterests = [...interests]
    updatedInterests.splice(index, 1)
    setInterests(updatedInterests)
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
        <CardTitle>兴趣爱好</CardTitle>
      </CardHeader>
      <CardContent>
        {isEditing && (
          <div className="mb-4 flex gap-2">
            <Input
              value={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
              placeholder="添加兴趣爱好"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  addInterest()
                }
              }}
            />
            <Button onClick={addInterest} disabled={!newInterest.trim()}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {interests.map((interest, index) => (
            <Badge key={index} variant="secondary" className="px-3 py-1 text-sm flex items-center gap-1 group">
              <Heart className="h-3 w-3 text-primary" />
              {interest.name}
              {isEditing && (
                <button
                  onClick={() => removeInterest(index)}
                  className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </Badge>
          ))}

          {interests.length === 0 && (
            <div className="text-center w-full py-2">
              <p className="text-sm text-muted-foreground">暂无兴趣爱好</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

