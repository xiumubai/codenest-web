"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

interface UserThemeSelectorProps {
  currentTheme: string
  onThemeChange: (theme: string) => void
}

export function UserThemeSelector({ currentTheme, onThemeChange }: UserThemeSelectorProps) {
  const themes = [
    { id: "default", name: "默认主题", description: "简洁专业的默认主题" },
    { id: "minimal", name: "极简主题", description: "干净简约的设计风格" },
    { id: "gradient", name: "渐变主题", description: "柔和的蓝色渐变背景" },
    { id: "synthwave", name: "复古波浪", description: "霓虹灯效果的复古风格" },
    { id: "nature", name: "自然主题", description: "清新自然的绿色风格" },
    { id: "tech", name: "科技主题", description: "现代科技感的设计" },
  ]

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-lg px-4">
      <Card className="bg-background/95 backdrop-blur-sm border shadow-lg">
        <CardContent className="p-4">
          <h3 className="text-lg font-medium mb-3">选择简历主题</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {themes.map((theme) => (
              <Button
                key={theme.id}
                variant={currentTheme === theme.id ? "default" : "outline"}
                className="h-auto flex flex-col items-start p-3 relative"
                onClick={() => onThemeChange(theme.id)}
              >
                {currentTheme === theme.id && (
                  <div className="absolute top-1 right-1">
                    <Check className="h-4 w-4" />
                  </div>
                )}
                <span className="font-medium">{theme.name}</span>
                <span className="text-xs text-muted-foreground mt-1 text-left">{theme.description}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

