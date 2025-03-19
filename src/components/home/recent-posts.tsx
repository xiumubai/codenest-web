import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

const recentPosts = [
  {
    id: 4,
    title: "使用Next.js和Tailwind CSS构建现代网站",
    excerpt: "Next.js和Tailwind CSS是构建现代网站的强大组合，本文将介绍如何使用这两个工具快速构建美观的网站...",
    category: "Web开发",
    author: "赵六",
    date: "2023-05-01",
    readTime: "12 分钟",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 5,
    title: "数据结构与算法：从入门到精通",
    excerpt: "数据结构与算法是编程的基础，本文将带您从入门到精通，掌握常见的数据结构与算法...",
    category: "算法",
    author: "钱七",
    date: "2023-04-28",
    readTime: "20 分钟",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 6,
    title: "Docker容器化应用实践指南",
    excerpt: "Docker是一种流行的容器化技术，本文将介绍如何使用Docker容器化您的应用程序...",
    category: "DevOps",
    author: "孙八",
    date: "2023-04-25",
    readTime: "15 分钟",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 7,
    title: "Python数据分析：从零开始",
    excerpt: "Python是数据分析的首选语言，本文将带您从零开始学习Python数据分析的基础知识...",
    category: "数据分析",
    author: "周九",
    date: "2023-04-22",
    readTime: "18 分钟",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 8,
    title: "网络安全基础：保护您的应用程序",
    excerpt: "网络安全是开发中不可忽视的一部分，本文将介绍如何保护您的应用程序免受常见的安全威胁...",
    category: "网络安全",
    author: "吴十",
    date: "2023-04-19",
    readTime: "14 分钟",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export function RecentPosts() {
  return (
    <div className="space-y-8">
      {recentPosts.map((post, index) => (
        <article
          key={post.id}
          className={`group relative overflow-hidden rounded-xl border bg-card transition-all hover:shadow-md ${
            index % 2 === 0 ? "md:pl-24" : "md:pr-24"
          }`}
        >
          <div className={`absolute top-0 bottom-0 w-2 ${index % 2 === 0 ? "left-0" : "right-0"} bg-primary`}></div>
          <div className="flex flex-col md:flex-row">
            <div
              className={`relative h-48 w-full shrink-0 md:h-auto md:w-60 ${index % 2 === 0 ? "md:order-last" : ""}`}
            >
              <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
            </div>
            <div className="flex flex-1 flex-col justify-center p-6">
              <div className="mb-2 flex items-center gap-2">
                <Badge variant="outline" className="text-xs font-normal">
                  {post.category}
                </Badge>
                <span className="text-xs text-muted-foreground">{post.readTime}</span>
              </div>
              <Link href={`/articles/${post.id}`}>
                <h3 className="mb-2 text-xl font-semibold group-hover:text-primary">{post.title}</h3>
              </Link>
              <p className="mb-4 text-muted-foreground">{post.excerpt}</p>
              <div className="mt-auto flex items-center justify-between">
                <div className="text-sm">
                  <span className="font-medium">{post.author}</span>
                  <span className="text-muted-foreground"> · {post.date}</span>
                </div>
                <Link
                  href={`/articles/${post.id}`}
                  className="group/link flex items-center gap-1 text-sm font-medium text-primary"
                >
                  阅读更多
                  <ArrowRight className="h-3 w-3 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}

