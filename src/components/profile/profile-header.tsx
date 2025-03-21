import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"

export function ProfileHeader() {
  return (
    <div className="space-y-6">
      <div className="relative h-56 w-full overflow-hidden rounded-xl md:h-72">
        <Image src="/placeholder.svg?height=400&width=1200" alt="封面图片" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>
      <div className="flex flex-col items-center gap-6 md:flex-row md:gap-8">
        <div className="relative -mt-24 h-36 w-36 overflow-hidden rounded-full border-4 border-background shadow-lg md:h-44 md:w-44">
          <Image src="/placeholder.svg?height=200&width=200" alt="用户头像" fill className="object-cover" />
        </div>
        <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left">
          <h1 className="text-3xl font-bold tracking-tight">张三</h1>
          <p className="text-muted-foreground">资深软件工程师 @ 科技公司</p>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            热爱编程和技术分享，专注于Web开发和人工智能领域。喜欢通过写作分享知识和经验。
          </p>
          <div className="mt-4 flex gap-6">
            <div className="text-center">
              <span className="block text-xl font-bold">42</span>
              <span className="text-sm text-muted-foreground">文章</span>
            </div>
            <div className="text-center">
              <span className="block text-xl font-bold">1.2k</span>
              <span className="text-sm text-muted-foreground">关注者</span>
            </div>
            <div className="text-center">
              <span className="block text-xl font-bold">256</span>
              <span className="text-sm text-muted-foreground">关注中</span>
            </div>
          </div>
        </div>
        <Button className="flex items-center gap-2 rounded-full px-5">
          <Pencil className="h-4 w-4" />
          编辑个人资料
        </Button>
      </div>
    </div>
  )
}

