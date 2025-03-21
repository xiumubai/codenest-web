"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Download, FileImage, FileJson, FileIcon as FilePdf, FileIcon as FileWord, Check } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

interface ResumeExportProps {
  onExport: (format: string, options: any) => void
}

export function ResumeExport({ onExport }: ResumeExportProps) {
  const [format, setFormat] = useState("pdf")
  const [pdfOptions, setPdfOptions] = useState({
    includePhoto: true,
    colorMode: "color",
    paperSize: "a4",
    margins: "normal",
  })
  const [docxOptions, setDocxOptions] = useState({
    includePhoto: true,
    includeLinks: true,
    template: "professional",
  })
  const [jsonOptions, setJsonOptions] = useState({
    includePersonalData: true,
    prettyPrint: true,
  })
  const [imageOptions, setImageOptions] = useState({
    format: "png",
    quality: "high",
    includeBackground: true,
  })

  const handleExport = () => {
    let options

    switch (format) {
      case "pdf":
        options = pdfOptions
        break
      case "docx":
        options = docxOptions
        break
      case "json":
        options = jsonOptions
        break
      case "image":
        options = imageOptions
        break
      default:
        options = {}
    }

    onExport(format, options)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="bg-background/80 backdrop-blur-sm">
          <Download className="mr-2 h-4 w-4" />
          导出简历
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>导出简历</DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div
              className={`
                p-4 border rounded-lg flex flex-col items-center justify-center cursor-pointer
                ${format === "pdf" ? "border-primary bg-primary/5" : ""}
              `}
              onClick={() => setFormat("pdf")}
            >
              <FilePdf className="h-10 w-10 text-red-500 mb-2" />
              <span className="font-medium">PDF</span>
              {format === "pdf" && (
                <div className="absolute top-2 right-2">
                  <Check className="h-4 w-4 text-primary" />
                </div>
              )}
            </div>

            <div
              className={`
                p-4 border rounded-lg flex flex-col items-center justify-center cursor-pointer
                ${format === "docx" ? "border-primary bg-primary/5" : ""}
              `}
              onClick={() => setFormat("docx")}
            >
              <FileWord className="h-10 w-10 text-blue-500 mb-2" />
              <span className="font-medium">Word</span>
              {format === "docx" && (
                <div className="absolute top-2 right-2">
                  <Check className="h-4 w-4 text-primary" />
                </div>
              )}
            </div>

            <div
              className={`
                p-4 border rounded-lg flex flex-col items-center justify-center cursor-pointer
                ${format === "json" ? "border-primary bg-primary/5" : ""}
              `}
              onClick={() => setFormat("json")}
            >
              <FileJson className="h-10 w-10 text-amber-500 mb-2" />
              <span className="font-medium">JSON</span>
              {format === "json" && (
                <div className="absolute top-2 right-2">
                  <Check className="h-4 w-4 text-primary" />
                </div>
              )}
            </div>

            <div
              className={`
                p-4 border rounded-lg flex flex-col items-center justify-center cursor-pointer
                ${format === "image" ? "border-primary bg-primary/5" : ""}
              `}
              onClick={() => setFormat("image")}
            >
              <FileImage className="h-10 w-10 text-green-500 mb-2" />
              <span className="font-medium">图片</span>
              {format === "image" && (
                <div className="absolute top-2 right-2">
                  <Check className="h-4 w-4 text-primary" />
                </div>
              )}
            </div>
          </div>

          <Tabs value={format} onValueChange={setFormat}>
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="pdf">PDF</TabsTrigger>
              <TabsTrigger value="docx">Word</TabsTrigger>
              <TabsTrigger value="json">JSON</TabsTrigger>
              <TabsTrigger value="image">图片</TabsTrigger>
            </TabsList>

            <TabsContent value="pdf" className="space-y-4 mt-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">纸张大小</h3>
                <RadioGroup
                  value={pdfOptions.paperSize}
                  onValueChange={(value) => setPdfOptions({ ...pdfOptions, paperSize: value })}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="a4" id="a4" />
                    <Label htmlFor="a4">A4</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="letter" id="letter" />
                    <Label htmlFor="letter">Letter</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">颜色模式</h3>
                <RadioGroup
                  value={pdfOptions.colorMode}
                  onValueChange={(value) => setPdfOptions({ ...pdfOptions, colorMode: value })}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="color" id="color" />
                    <Label htmlFor="color">彩色</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bw" id="bw" />
                    <Label htmlFor="bw">黑白</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">边距</h3>
                <RadioGroup
                  value={pdfOptions.margins}
                  onValueChange={(value) => setPdfOptions({ ...pdfOptions, margins: value })}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="narrow" id="narrow" />
                    <Label htmlFor="narrow">窄</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="normal" id="normal" />
                    <Label htmlFor="normal">标准</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="wide" id="wide" />
                    <Label htmlFor="wide">宽</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includePhoto"
                  checked={pdfOptions.includePhoto}
                  onCheckedChange={(checked) => setPdfOptions({ ...pdfOptions, includePhoto: checked as boolean })}
                />
                <label
                  htmlFor="includePhoto"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  包含照片
                </label>
              </div>
            </TabsContent>

            <TabsContent value="docx" className="space-y-4 mt-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">模板</h3>
                <RadioGroup
                  value={docxOptions.template}
                  onValueChange={(value) => setDocxOptions({ ...docxOptions, template: value })}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="professional" id="professional" />
                    <Label htmlFor="professional">专业</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="modern" id="modern" />
                    <Label htmlFor="modern">现代</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="classic" id="classic" />
                    <Label htmlFor="classic">经典</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="minimal" id="minimal" />
                    <Label htmlFor="minimal">极简</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="includePhotoDocx"
                    checked={docxOptions.includePhoto}
                    onCheckedChange={(checked) => setDocxOptions({ ...docxOptions, includePhoto: checked as boolean })}
                  />
                  <label
                    htmlFor="includePhotoDocx"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    包含照片
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="includeLinks"
                    checked={docxOptions.includeLinks}
                    onCheckedChange={(checked) => setDocxOptions({ ...docxOptions, includeLinks: checked as boolean })}
                  />
                  <label
                    htmlFor="includeLinks"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    包含超链接
                  </label>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="json" className="space-y-4 mt-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="includePersonalData"
                    checked={jsonOptions.includePersonalData}
                    onCheckedChange={(checked) =>
                      setJsonOptions({ ...jsonOptions, includePersonalData: checked as boolean })
                    }
                  />
                  <label
                    htmlFor="includePersonalData"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    包含个人数据
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="prettyPrint"
                    checked={jsonOptions.prettyPrint}
                    onCheckedChange={(checked) => setJsonOptions({ ...jsonOptions, prettyPrint: checked as boolean })}
                  />
                  <label
                    htmlFor="prettyPrint"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    美化输出
                  </label>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="image" className="space-y-4 mt-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">图片格式</h3>
                <RadioGroup
                  value={imageOptions.format}
                  onValueChange={(value) => setImageOptions({ ...imageOptions, format: value })}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="png" id="png" />
                    <Label htmlFor="png">PNG</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="jpg" id="jpg" />
                    <Label htmlFor="jpg">JPG</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">图片质量</h3>
                <RadioGroup
                  value={imageOptions.quality}
                  onValueChange={(value) => setImageOptions({ ...imageOptions, quality: value })}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="high" id="high" />
                    <Label htmlFor="high">高</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="medium" />
                    <Label htmlFor="medium">中</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="low" id="low" />
                    <Label htmlFor="low">低</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includeBackground"
                  checked={imageOptions.includeBackground}
                  onCheckedChange={(checked) =>
                    setImageOptions({ ...imageOptions, includeBackground: checked as boolean })
                  }
                />
                <label
                  htmlFor="includeBackground"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  包含背景
                </label>
              </div>
            </TabsContent>
          </Tabs>

          <Button className="w-full" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            导出简历
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

