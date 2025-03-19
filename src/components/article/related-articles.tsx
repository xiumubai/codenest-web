import Link from "next/link"
import Image from "next/image"

// 模拟相关文章数据
const relatedArticles = [
  {
    id: 2,
    title: "2023年最值得学习的编程语言",
    date: "2023-05-10",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    title: "从零开始学习React：完整指南",
    date: "2023-05-05",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    title: "使用Next.js和Tailwind CSS构建现代网站",
    date: "2023-05-01",
    image: "/placeholder.svg?height=100&width=100",
  },
]

export function RelatedArticles({ currentArticleId }: { currentArticleId: string }) {
  // 过滤掉当前文章
  const filteredArticles = relatedArticles.filter((article) => article.id !== Number.parseInt(currentArticleId))

  return (
    <div className="space-y-4">
      {filteredArticles.map((article) => (
        <Link key={article.id} href={`/articles/${article.id}`}>
          <div className="group flex gap-3 rounded-md p-2 transition-colors hover:bg-muted/50">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md">
              <Image
                src={article.image || "/placeholder.svg"}
                alt={article.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <div>
              <h4 className="line-clamp-2 text-sm font-medium group-hover:text-primary">{article.title}</h4>
              <p className="text-xs text-muted-foreground">{article.date}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

