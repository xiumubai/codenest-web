import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const featuredPosts = [
  {
    id: 1,
    title: "如何提高编程效率：10个实用技巧",
    excerpt: "在这篇文章中，我们将分享10个可以立即提高您编程效率的实用技巧...",
    category: "编程技巧",
    author: "张三",
    date: "2023-05-15",
    readTime: "8 分钟",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 2,
    title: "2023年最值得学习的编程语言",
    excerpt: "随着技术的不断发展，哪些编程语言在2023年最值得学习？本文将为您解答...",
    category: "编程语言",
    author: "李四",
    date: "2023-05-10",
    readTime: "10 分钟",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 3,
    title: "从零开始学习React：完整指南",
    excerpt: "React是目前最流行的前端框架之一，本文将带您从零开始学习React的基础知识...",
    category: "前端开发",
    author: "王五",
    date: "2023-05-05",
    readTime: "15 分钟",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 4,
    title: "使用Next.js和Tailwind CSS构建现代网站",
    excerpt: "Next.js和Tailwind CSS是构建现代网站的强大组合，本文将介绍如何使用这两个工具快速构建美观的网站...",
    category: "Web开发",
    author: "赵六",
    date: "2023-05-01",
    readTime: "12 分钟",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 5,
    title: "数据结构与算法：从入门到精通",
    excerpt: "数据结构与算法是编程的基础，本文将带您从入门到精通，掌握常见的数据结构与算法...",
    category: "算法",
    author: "钱七",
    date: "2023-04-28",
    readTime: "20 分钟",
    image: "/placeholder.svg?height=400&width=600",
  },
]

export function FeaturedPosts() {
  return (
    <>
      {featuredPosts.map((post) => (
        <Card key={post.id} className="w-[350px] overflow-hidden border transition-all hover:shadow-md">
          <div className="relative h-48 w-full">
            <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <Badge
                variant="outline"
                className="bg-black/50 text-white backdrop-blur-sm border-none text-xs font-normal"
              >
                {post.category}
              </Badge>
            </div>
          </div>
          <CardContent className="p-6">
            <Link href={`/articles/${post.id}`}>
              <h3 className="mb-2 line-clamp-2 text-lg font-medium hover:text-primary">{post.title}</h3>
            </Link>
            <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <span className="font-medium">{post.author}</span>
                <span className="text-muted-foreground"> · {post.readTime}</span>
              </div>
              <Link href={`/articles/${post.id}`} className="text-sm font-medium text-primary hover:underline">
                阅读更多
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  )
}

