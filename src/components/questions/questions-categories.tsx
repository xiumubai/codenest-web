import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const categories = [
  { name: "JavaScript", count: 324 },
  { name: "React", count: 218 },
  { name: "Node.js", count: 186 },
  { name: "TypeScript", count: 142 },
  { name: "Next.js", count: 98 },
  { name: "CSS", count: 87 },
  { name: "Vue.js", count: 76 },
  { name: "Docker", count: 65 },
]

export function QuestionsCategories() {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="mb-4 text-lg font-semibold">热门标签</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category, index) => (
            <Link href={`/questions/tag/${category.name}`} key={index}>
              <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                {category.name}
                <span className="ml-1 text-xs text-muted-foreground">({category.count})</span>
              </Badge>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

