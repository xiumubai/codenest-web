import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Users, Star, Filter, Search, ArrowLeft } from "lucide-react"

// 模拟分类数据
const categories = [
  { id: 1, name: "前端开发", count: 24 },
  { id: 2, name: "后端开发", count: 18 },
  { id: 3, name: "移动开发", count: 12 },
  { id: 4, name: "DevOps", count: 9 },
  { id: 5, name: "人工智能", count: 7 },
  { id: 6, name: "数据库", count: 6 },
  { id: 7, name: "云计算", count: 5 },
  { id: 8, name: "区块链", count: 3 },
]

// 模拟分类下的小册数据
const categoryBooks = {
  "1": [
    {
      id: 1,
      title: "React 全栈开发实战",
      description: "从零开始，一步步构建完整的React应用，包含前端界面、后端API和数据库设计。",
      cover: "/placeholder.svg?height=400&width=300",
      author: {
        name: "张三",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      price: 49.9,
      originalPrice: 99.9,
      sections: 24,
      words: "10万+",
      readers: 1250,
      rating: 4.8,
      tags: ["React", "全栈", "实战"],
      updateTime: "2023-06-15",
      isFeatured: true,
      isNew: true,
    },
    {
      id: 2,
      title: "TypeScript 高级编程",
      description: "深入理解TypeScript类型系统，掌握高级类型技巧，提升代码质量和开发效率。",
      cover: "/placeholder.svg?height=400&width=300",
      author: {
        name: "李四",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      price: 39.9,
      originalPrice: 79.9,
      sections: 18,
      words: "8万+",
      readers: 980,
      rating: 4.7,
      tags: ["TypeScript", "前端", "进阶"],
      updateTime: "2023-05-20",
      isFeatured: false,
      isNew: true,
    },
    {
      id: 3,
      title: "Next.js 应用开发与部署",
      description: "使用Next.js构建高性能的React应用，包含SSR、SSG、ISR等渲染策略的最佳实践。",
      cover: "/placeholder.svg?height=400&width=300",
      author: {
        name: "王五",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      price: 59.9,
      originalPrice: 119.9,
      sections: 30,
      words: "15万+",
      readers: 2100,
      rating: 4.9,
      tags: ["Next.js", "React", "部署"],
      updateTime: "2023-07-05",
      isFeatured: true,
      isNew: false,
    },
    {
      id: 5,
      title: "Vue3 + TypeScript 项目实战",
      description: "使用Vue3和TypeScript开发企业级应用，包含Composition API、状态管理和性能优化。",
      cover: "/placeholder.svg?height=400&width=300",
      author: {
        name: "钱七",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      price: 45.9,
      originalPrice: 89.9,
      sections: 22,
      words: "11万+",
      readers: 1820,
      rating: 4.7,
      tags: ["Vue3", "TypeScript", "实战"],
      updateTime: "2023-06-28",
      isFeatured: true,
      isNew: true,
    },
    {
      id: 6,
      title: "前端性能优化实战指南",
      description: "全面解析前端性能优化策略，从网络请求、渲染性能到用户体验的全方位提升。",
      cover: "/placeholder.svg?height=400&width=300",
      author: {
        name: "孙八",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      price: 49.9,
      originalPrice: 99.9,
      sections: 20,
      words: "9万+",
      readers: 2450,
      rating: 4.8,
      tags: ["性能优化", "前端", "实战"],
      updateTime: "2023-05-15",
      isFeatured: false,
      isNew: false,
    },
    {
      id: 9,
      title: "JavaScript 设计模式与实践",
      description: "通过实际案例学习JavaScript设计模式，提高代码质量和可维护性。",
      cover: "/placeholder.svg?height=400&width=300",
      author: {
        name: "张三",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      price: 35.9,
      originalPrice: 69.9,
      sections: 16,
      words: "7万+",
      readers: 1120,
      rating: 4.5,
      tags: ["JavaScript", "设计模式", "进阶"],
      updateTime: "2022-11-20",
      isFeatured: false,
      isNew: false,
    },
    {
      id: 12,
      title: "微前端架构与实践",
      description: "探索微前端架构的原理、实现方式和最佳实践，解决大型前端应用的开发和维护问题。",
      cover: "/placeholder.svg?height=400&width=300",
      author: {
        name: "张三",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      price: 55.9,
      originalPrice: 109.9,
      sections: 20,
      words: "9万+",
      readers: 780,
      rating: 4.7,
      tags: ["微前端", "架构", "前端"],
      updateTime: "2023-02-15",
      isFeatured: false,
      isNew: false,
    },
  ],
}

export default function CategoryPage({ params }: { params: { id: string } }) {
  const categoryId = params.id
  const category = categories.find((c) => c.id.toString() === categoryId)
  const books = categoryBooks[categoryId as keyof typeof categoryBooks] || []

  if (!category) {
    return <div className="container mx-auto py-8">分类不存在</div>
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Link href="/books">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            返回小册列表
          </Button>
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
        <p className="text-muted-foreground">
          共 {books.length} 本小册，涵盖{category.name}的各个方面，从入门到精通。
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Tabs defaultValue="all" className="w-full sm:w-auto">
          <TabsList className="grid w-full grid-cols-4 sm:w-auto sm:grid-cols-4">
            <TabsTrigger value="all">全部</TabsTrigger>
            <TabsTrigger value="featured">精选</TabsTrigger>
            <TabsTrigger value="new">最新</TabsTrigger>
            <TabsTrigger value="popular">热门</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input type="search" placeholder="搜索小册..." className="pl-8 w-full md:w-[200px]" />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => (
          <Link href={`/books/${book.id}`} key={book.id}>
            <Card className="h-full overflow-hidden transition-all hover:shadow-md">
              <CardContent className="p-0">
                <div className="relative h-40 w-full">
                  <Image src={book.cover || "/placeholder.svg"} alt={book.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex gap-2">
                      {book.isNew && <Badge className="bg-blue-500 hover:bg-blue-500/80">新上线</Badge>}
                      {book.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-black/50 text-white backdrop-blur-sm">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2 line-clamp-1">{book.title}</h3>
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{book.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="ml-1 text-sm font-medium">{book.rating}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="ml-1 text-sm text-muted-foreground">{book.readers}</span>
                      </div>
                    </div>
                    <div className="flex items-end">
                      <span className="text-lg font-bold text-primary">¥{book.price}</span>
                      {book.originalPrice && (
                        <span className="ml-1 text-xs text-muted-foreground line-through">¥{book.originalPrice}</span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

