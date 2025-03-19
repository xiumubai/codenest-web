import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Twitter, Facebook, Linkedin, Github } from "lucide-react"

export function AuthorCard() {
  return (
    <div className="rounded-lg border p-6">
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-4 h-20 w-20 overflow-hidden rounded-full border-2 border-primary/20">
          <Image src="/placeholder.svg?height=100&width=100" alt="张三" fill className="object-cover" />
        </div>
        <h3 className="text-lg font-semibold">张三</h3>
        <p className="mb-4 text-sm text-muted-foreground">资深软件工程师，拥有10年开发经验，热爱分享技术知识。</p>
        <div className="mb-4 flex gap-2">
          <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
            <Twitter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
            <Facebook className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
            <Linkedin className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
            <Github className="h-4 w-4" />
          </Button>
        </div>
        <Button variant="outline" className="w-full">
          查看所有文章
        </Button>
      </div>
    </div>
  )
}

