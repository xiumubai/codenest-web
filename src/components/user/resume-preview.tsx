"use client"

import { useState, useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Eye, Printer, Download, Share2 } from "lucide-react"
import { UserHeader } from "@/components/user/user-header"
import { UserContact } from "@/components/user/user-contact"
import { UserSkills } from "@/components/user/user-skills"
import { UserExperience } from "@/components/user/user-experience"
import { UserEducation } from "@/components/user/user-education"
import { UserProjects } from "@/components/user/user-projects"
import { UserCertifications } from "@/components/user/user-certifications"
import { UserInterests } from "@/components/user/user-interests"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ResumePreviewProps {
  userData: any
  theme: string
}

export function ResumePreview({ userData, theme }: ResumePreviewProps) {
  const [activeTab, setActiveTab] = useState("preview")
  const printRef = useRef<HTMLDivElement>(null)

  const handlePrint = () => {
    const printContent = printRef.current
    if (!printContent) return

    const printWindow = window.open("", "_blank")
    if (!printWindow) return

    // 获取当前页面的样式表
    const styles = Array.from(document.styleSheets)
      .map((styleSheet) => {
        try {
          return Array.from(styleSheet.cssRules)
            .map((rule) => rule.cssText)
            .join("")
        } catch (e) {
          return ""
        }
      })
      .join("")

    // 添加打印特定样式
    const printStyles = `
      @media print {
        body { font-size: 12pt; }
        .page-break { page-break-after: always; }
        .no-print { display: none !important; }
      }
    `

    // 设置打印窗口内容
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${userData.name} - 简历</title>
          <style>${styles}${printStyles}</style>
        </head>
        <body class="bg-white">
          <div class="p-8 max-w-4xl mx-auto">
            ${printContent.innerHTML}
          </div>
          <script>
            setTimeout(() => { window.print(); window.close(); }, 500);
          </script>
        </body>
      </html>
    `)

    printWindow.document.close()
  }

  const handleDownloadPDF = () => {
    // 实际应用中，这里可以使用html2pdf.js或jsPDF等库生成PDF
    alert("下载PDF功能将在实际应用中实现")
  }

  const handleShare = () => {
    // 实际应用中，这里可以实现分享功能
    if (navigator.share) {
      navigator.share({
        title: `${userData.name}的简历`,
        text: `查看${userData.name}的个人简历`,
        url: window.location.href,
      })
    } else {
      // 复制链接到剪贴板
      navigator.clipboard.writeText(window.location.href)
      alert("链接已复制到剪贴板")
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="bg-background/80 backdrop-blur-sm">
          <Eye className="mr-2 h-4 w-4" />
          预览简历
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl h-[90vh] flex flex-col">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>简历预览</DialogTitle>
          <div className="flex items-center gap-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mr-4">
              <TabsList>
                <TabsTrigger value="preview">预览</TabsTrigger>
                <TabsTrigger value="ats">ATS优化</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" />
              打印
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownloadPDF}>
              <Download className="h-4 w-4 mr-2" />
              下载PDF
            </Button>
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              分享
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-auto mt-4">
          <TabsContent value="preview" className="h-full">
            <div ref={printRef} className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 左侧栏 */}
                <div className="lg:col-span-1 space-y-6">
                  <UserHeader userData={userData} isEditing={false} theme="default" />

                  <UserContact
                    contact={userData.contact}
                    socialLinks={userData.socialLinks}
                    isEditing={false}
                    theme="default"
                  />

                  <UserSkills
                    skills={userData.skills}
                    languages={userData.languages}
                    isEditing={false}
                    theme="default"
                  />

                  <UserCertifications certifications={userData.certifications} isEditing={false} theme="default" />

                  <UserInterests interests={userData.interests || []} isEditing={false} theme="default" />
                </div>

                {/* 右侧栏 */}
                <div className="lg:col-span-2 space-y-6">
                  <UserExperience experience={userData.experience} isEditing={false} theme="default" />

                  <UserProjects projects={userData.projects} isEditing={false} theme="default" />

                  <UserEducation education={userData.education} isEditing={false} theme="default" />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ats" className="h-full">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
              <h2 className="text-xl font-bold mb-4">ATS优化建议</h2>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">简历完整度: 85%</h3>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">关键词匹配</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    确保您的简历包含与目标职位相关的关键词，以提高通过ATS系统的几率。
                  </p>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-sm">React</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-sm">JavaScript</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-sm">TypeScript</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <span className="text-sm">Next.js</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span className="text-sm">UI/UX</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span className="text-sm">前端架构</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">改进建议</h3>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li>使用更多量化的成就描述，例如"提高了X%的性能"</li>
                    <li>添加更多与目标职位相关的技术关键词</li>
                    <li>确保简历格式简洁，避免复杂的表格和图形</li>
                    <li>使用标准的部分标题，如"工作经验"、"教育背景"等</li>
                    <li>避免使用页眉和页脚中的重要信息</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
        </div>
      </DialogContent>
    </Dialog>
  )
}

