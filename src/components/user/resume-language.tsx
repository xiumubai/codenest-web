"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Globe, AlertTriangle } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface ResumeLanguageProps {
  currentLanguage: string
  availableLanguages: Array<{
    code: string
    name: string
    nativeName: string
    completeness: number
    isActive: boolean
  }>
  onLanguageChange: (languageCode: string) => void
  onLanguageToggle: (languageCode: string, isActive: boolean) => void
}

export function ResumeLanguage({
  currentLanguage,
  availableLanguages,
  onLanguageChange,
  onLanguageToggle,
}: ResumeLanguageProps) {
  const [activeTab, setActiveTab] = useState("languages")

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="bg-background/80 backdrop-blur-sm">
          <Globe className="mr-2 h-4 w-4" />
          语言
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>简历语言设置</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="languages">可用语言</TabsTrigger>
            <TabsTrigger value="settings">翻译设置</TabsTrigger>
          </TabsList>

          <TabsContent value="languages" className="space-y-4 mt-4">
            <div className="space-y-3">
              {availableLanguages.map((language) => (
                <div
                  key={language.code}
                  className={`
                    p-4 border rounded-lg flex items-center justify-between
                    ${currentLanguage === language.code ? "border-primary bg-primary/5" : ""}
                    ${!language.isActive ? "opacity-50" : ""}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                      {language.code === "zh" && "🇨🇳"}
                      {language.code === "en" && "🇺🇸"}
                      {language.code === "ja" && "🇯🇵"}
                      {language.code === "fr" && "🇫🇷"}
                      {language.code === "de" && "🇩🇪"}
                      {language.code === "es" && "🇪🇸"}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{language.name}</h4>
                        {language.code !== "zh" && (
                          <span className="text-sm text-muted-foreground">{language.nativeName}</span>
                        )}
                        {currentLanguage === language.code && (
                          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">当前</span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 mt-1">
                        <Progress value={language.completeness} className="h-2 w-24" />
                        <span className="text-xs text-muted-foreground">{language.completeness}% 完成</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {language.isActive && language.code !== currentLanguage && (
                      <Button variant="outline" size="sm" onClick={() => onLanguageChange(language.code)}>
                        切换
                      </Button>
                    )}

                    {language.code !== "zh" && (
                      <div className="flex items-center space-x-2">
                        <Switch
                          id={`lang-${language.code}`}
                          checked={language.isActive}
                          onCheckedChange={(checked) => onLanguageToggle(language.code, checked)}
                          disabled={language.code === currentLanguage}
                        />
                        <Label htmlFor={`lang-${language.code}`} className="sr-only">
                          启用{language.name}
                        </Label>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4 mt-4">
            <div className="p-4 border rounded-lg space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="auto-translate" />
                <div>
                  <Label htmlFor="auto-translate" className="font-medium">
                    自动翻译
                  </Label>
                  <p className="text-sm text-muted-foreground">自动翻译缺失的内容到其他语言</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="sync-changes" defaultChecked />
                <div>
                  <Label htmlFor="sync-changes" className="font-medium">
                    同步更改
                  </Label>
                  <p className="text-sm text-muted-foreground">在主语言中的更改将同步到其他语言</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="show-incomplete" />
                <div>
                  <Label htmlFor="show-incomplete" className="font-medium">
                    显示不完整的语言
                  </Label>
                  <p className="text-sm text-muted-foreground">在语言选择器中显示翻译不完整的语言</p>
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-lg bg-amber-50 border-amber-200 flex gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-amber-800">翻译注意事项</h4>
                <p className="text-sm text-amber-700 mt-1">
                  自动翻译可能不够准确，建议在发布前检查翻译内容。主要语言（中文）的内容将始终优先显示。
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

