import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, PlusCircle } from "lucide-react"

export function QuestionsHeader() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">问答社区</h1>
          <p className="mt-2 text-muted-foreground">提出您的技术问题，获取社区专家的解答</p>
        </div>
        <Link href="/questions/ask">
          <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
            <PlusCircle className="h-4 w-4" />
            提问
          </Button>
        </Link>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input type="search" placeholder="搜索问题..." className="pl-10 h-12 rounded-lg" />
      </div>
    </div>
  )
}

