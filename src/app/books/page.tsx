import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search, BookOpen, TrendingUp, Clock, Users, Star, Filter } from "lucide-react"

// 模拟小册数据
const books = [
  {
    id: 1,
    title: "React 进阶实战指南",
    cover: "/placeholder.svg?height=400&width=300",
    description: "从零开始，系统学习 React 生态圈技术栈，打造企业级应用。",
    author: {
      name: "张三",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    price: 49.9,
    originalPrice: 99.9,
    tags: ["React", "前端", "进阶"],
    sections: 24,
    words: 120000,
    students: 1250,
    updateTime: "2023-05-15",
    rating: 4.8,
    isFeatured: true,
    isNew: true,
  },
  {
    id: 2,
    title: "TypeScript 高级编程",
    cover: "/placeholder.svg?height=400&width=300",
    description: "深入理解 TypeScript 类型系统，掌握高级类型编程技巧。",
    author: {
      name: "李四",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    price: 39.9,
    originalPrice: 79.9,
    tags: ["TypeScript", "前端", "类型系统"],
    sections: 18,
    words: 90000,
    students: 980,
    updateTime: "2023-04-20",
    rating: 4.7,
    isFeatured: false,
    isNew: true,
  },
  {
    id: 3,
    title: "Next.js 全栈开发实战",
    cover: "/placeholder.svg?height=400&width=300",
    description: "使用 Next.js 构建现代化全栈应用，包含服务端渲染、API 路由等核心技术。",
    author: {
      name: "王五",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    price: 59.9,
    originalPrice: 119.9,
    tags: ["Next.js", "React", "全栈"],
    sections: 30,
    words: 150000,
    students: 1560,
    updateTime: "2023-06-10",
    rating: 4.9,
    isFeatured: true,
    isNew: false,
  },
  {
    id: 4,
    title: "Node.js 微服务架构",
    cover: "/placeholder.svg?height=400&width=300",
    description: "从单体应用到微服务架构，深入学习 Node.js 在企业级应用中的最佳实践。",
    author: {
      name: "赵六",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    price: 69.9,
    originalPrice: 139.9,
    tags: ["Node.js", "微服务", "后端"],
    sections: 28,
    words: 140000,
    students: 860,
    updateTime: "2023-03-05",
    rating: 4.6,
    isFeatured: false,
    isNew: false,
  },
  {
    id: 5,
    title: "Flutter 跨平台应用开发",
    cover: "/placeholder.svg?height=400&width=300",
    description: "一次编写，多平台运行，使用 Flutter 开发高性能、美观的移动应用。",
    author: {
      name: "钱七",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    price: 49.9,
    originalPrice: 99.9,
    tags: ["Flutter", "移动开发", "跨平台"],
    sections: 22,
    words: 110000,
    students: 720,
    updateTime: "2023-05-28",
    rating: 4.7,
    isFeatured: false,
    isNew: true,
  },
  {
    id: 6,
    title: "深入浅出 Docker 与 Kubernetes",
    cover: "/placeholder.svg?height=400&width=300",
    description: "容器化技术从入门到精通，掌握云原生应用部署与管理。",
    author: {
      name: "孙八",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    price: 59.9,
    originalPrice: 119.9,
    tags: ["Docker", "Kubernetes", "DevOps"],
    sections: 26,
    words: 130000,
    students: 950,
    updateTime: "2023-04-15",
    rating: 4.8,
    isFeatured: true,
    isNew: false,
  },
]

// 模拟分类数据
const categories = [
  { id: 1, name: "全部", count: 24 },
  { id: 2, name: "前端", count: 10 },
  { id: 3, name: "后端", count: 8 },
  { id: 4, name: "移动开发", count: 4 },
  { id: 5, name: "DevOps", count: 2 },
]

export default function BooksPage() {
  return (
    <div className="container mx-auto py-8">
      {/* 顶部横幅 */}
      <div className="mb-8 rounded-xl bg-gradient-to-r from-primary/20 via-primary/10 to-background p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">CodeNest 小册</h1>
          <p className="text-muted-foreground max-w-2xl">
            精选优质技术内容，体系化学习路径，助您快速掌握前沿技术，提升开发技能。
          </p>
          <div className="flex gap-3 mt-4">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <BookOpen className="mr-2 h-4 w-4" />
              浏览全部小册
            </Button>
            <Button variant="outline">了解小册是什么</Button>
          </div>
        </div>
      </div>

      {/* 筛选和搜索 */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Tabs defaultValue="1" className="w-full md:w-auto">
          <TabsList className="grid w-full grid-cols-5 md:w-auto">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id.toString()}>
                {category.name}
                <span className="ml-1 text-xs text-muted-foreground">({category.count})</span>
              </TabsTrigger>
            ))}
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

      {/* 排序选项 */}
      <div className="mb-6 flex items-center justify-between bg-muted/30 rounded-lg p-2">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">排序:</span>
          <Button variant="default" size="sm" className="gap-1">
            <TrendingUp className="h-4 w-4" />
            最热门
          </Button>
          <Button variant="ghost" size="sm" className="gap-1">
            <Clock className="h-4 w-4" />
            最新上架
          </Button>
          <Button variant="ghost" size="sm" className="gap-1">
            <Star className="h-4 w-4" />
            好评优先
          </Button>
        </div>
      </div>

      {/* 精选小册 */}
      {books.some((book) => book.isFeatured) && (
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Star className="mr-2 h-5 w-5 text-yellow-500" />
            精选小册
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books
              .filter((book) => book.isFeatured)
              .map((book) => (
                <Link key={book.id} href={`/books/${book.id}`}>
                  <Card className="h-full overflow-hidden transition-all hover:shadow-md">
                    <CardContent className="p-0">
                      <div className="relative h-40 w-full">
                        <Image src={book.cover || "/placeholder.svg"} alt={book.title} fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex gap-2">
                            {book.tags.map((tag, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="bg-black/50 text-white backdrop-blur-sm border-none"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-xl font-semibold mb-2 line-clamp-1">{book.title}</h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{book.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                              <span className="ml-1 text-sm font-medium">{book.rating}</span>
                            </div>
                            <div className="flex items-center">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span className="ml-1 text-sm text-muted-foreground">{book.students}</span>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <span className="text-lg font-bold text-primary">¥{book.price}</span>
                            {book.originalPrice > book.price && (
                              <span className="ml-2 text-sm text-muted-foreground line-through">
                                ¥{book.originalPrice}
                              </span>
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
      )}

      {/* 所有小册 */}
      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <BookOpen className="mr-2 h-5 w-5 text-primary" />
          全部小册
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <Link key={book.id} href={`/books/${book.id}`}>
              <Card className="h-full overflow-hidden transition-all hover:shadow-md">
                <CardContent className="p-0">
                  <div className="relative h-40 w-full">
                    <Image src={book.cover || "/placeholder.svg"} alt={book.title} fill className="object-cover" />
                    {book.isNew && (
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-blue-500 hover:bg-blue-500/80">新上架</Badge>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2 line-clamp-1">{book.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{book.description}</p>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Image
                          src={book.author.avatar || "/placeholder.svg"}
                          alt={book.author.name}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                        <span className="text-sm">{book.author.name}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {book.sections} 小节 · {Math.round(book.words / 1000)}k 字
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          <span className="ml-1 text-sm font-medium">{book.rating}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="ml-1 text-sm text-muted-foreground">{book.students}</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-lg font-bold text-primary">¥{book.price}</span>
                        {book.originalPrice > book.price && (
                          <span className="ml-2 text-sm text-muted-foreground line-through">¥{book.originalPrice}</span>
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
    </div>
  )
}

