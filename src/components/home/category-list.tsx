import Link from "next/link"
import { Badge } from "@/components/ui/badge"

const categories = [
  { id: 1, name: "编程技巧", count: 24 },
  { id: 2, name: "前端开发", count: 18 },
  { id: 3, name: "后端开发", count: 15 },
  { id: 4, name: "数据库", count: 12 },
  { id: 5, name: "DevOps", count: 9 },
  { id: 6, name: "人工智能", count: 7 },
  { id: 7, name: "网络安全", count: 6 },
  { id: 8, name: "区块链", count: 4 },
]

export function CategoryList() {
  return (
    <div className="grid grid-cols-2 gap-2">
      {categories.map((category) => (
        <Link key={category.id} href={`/categories/${category.id}`}>
          <div className="flex items-center justify-between rounded-lg border border-transparent bg-muted/50 p-3 transition-colors hover:border-primary/20 hover:bg-primary/5">
            <span className="text-sm font-medium">{category.name}</span>
            <Badge variant="outline" className="bg-background text-xs font-normal">
              {category.count}
            </Badge>
          </div>
        </Link>
      ))}
    </div>
  )
}

