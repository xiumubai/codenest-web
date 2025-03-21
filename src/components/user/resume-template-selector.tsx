"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Check, Layout } from "lucide-react"
import Image from "next/image"

interface ResumeTemplateSelectorProps {
  currentTemplate: string
  onTemplateChange: (template: string) => void
}

export function ResumeTemplateSelector({ currentTemplate, onTemplateChange }: ResumeTemplateSelectorProps) {
  const templates = [
    {
      id: "classic",
      name: "经典简历",
      description: "传统双栏布局，专业简洁",
      image: "/placeholder.svg?height=200&width=150",
    },
    {
      id: "modern",
      name: "现代简历",
      description: "现代设计风格，强调视觉效果",
      image: "/placeholder.svg?height=200&width=150",
    },
    {
      id: "minimal",
      name: "极简简历",
      description: "简约设计，突出内容",
      image: "/placeholder.svg?height=200&width=150",
    },
    {
      id: "creative",
      name: "创意简历",
      description: "独特布局，适合创意行业",
      image: "/placeholder.svg?height=200&width=150",
    },
    {
      id: "professional",
      name: "专业简历",
      description: "正式商务风格，适合高级职位",
      image: "/placeholder.svg?height=200&width=150",
    },
    {
      id: "compact",
      name: "紧凑简历",
      description: "信息密集型，适合丰富经验",
      image: "/placeholder.svg?height=200&width=150",
    },
  ]

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="bg-background/80 backdrop-blur-sm">
          <Layout className="mr-2 h-4 w-4" />
          选择模板
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>选择简历模板</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`
                border rounded-lg overflow-hidden cursor-pointer transition-all
                ${currentTemplate === template.id ? "ring-2 ring-primary" : "hover:border-primary/50"}
              `}
              onClick={() => onTemplateChange(template.id)}
            >
              <div className="relative h-48 w-full">
                <Image src={template.image || "/placeholder.svg"} alt={template.name} fill className="object-cover" />
                {currentTemplate === template.id && (
                  <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                    <Check className="h-4 w-4" />
                  </div>
                )}
              </div>
              <div className="p-3">
                <h3 className="font-medium">{template.name}</h3>
                <p className="text-xs text-muted-foreground">{template.description}</p>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

