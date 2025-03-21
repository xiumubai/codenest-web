"use client"

import { AvatarFallback } from "@/components/ui/avatar"

import { AvatarImage } from "@/components/ui/avatar"

import { Avatar } from "@/components/ui/avatar"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Clock, Calendar, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

// 模拟我的小册数据
const myBooks = [
  {
    id: 1,
    title: "React 全栈开发实战",
    cover: "/placeholder.svg?height=400&width=300",
    author: {
      name: "张三",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    purchaseDate: "2023-06-20",
    lastReadDate: "2023-07-15",
    progress: 35,
    totalSections: 24,
    completedSections: 8,
  },
  {
    id: 3,
    title: "Next.js 应用开发与部署",
    cover: "/placeholder.svg?height=400&width=300",
    author: {
      name: "王五",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    purchaseDate: "2023-05-10",
    lastReadDate: "2023-07-18",
    progress: 60,
    totalSections: 30,
    completedSections: 18,
  },
  {
    id: 6,
    title: "前端性能优化实战指南",
    cover: "/placeholder.svg?height=400&width=300",
    author: {
      name: "孙八",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    purchaseDate: "2023-04-05",
    lastReadDate: "2023-06-30",
    progress: 100,
    totalSections: 20,
    completedSections: 20,
  },
]

// 模拟收藏的小册数据
const favoriteBooks = [
  {
    id: 2,
    title: "TypeScript 高级编程",
    cover: "/placeholder.svg?height=400&width=300",
    author: {
      name: "李四",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    price: 39.9,
    originalPrice: 79.9,
  },
  {
    id: 5,
    title: "Vue3 + TypeScript 项目实战",
    cover: "/placeholder.svg?height=400&width=300",
    author: {
      name: "钱七",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    price: 45.9,
    originalPrice: 89.9,
  },
]

export default function MyBooksPage() {
  const [activeTab, setActiveTab] = useState("purchased")
  const [searchTerm, setSearchTerm] = useState("")

  // 过滤小册
  const filteredPurchased = myBooks.filter((book) => book.title.toLowerCase().includes(searchTerm.toLowerCase()))

  const filteredFavorites = favoriteBooks.filter((book) => book.title.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">我的小册</h1>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Tabs defaultValue="purchased" value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
          <TabsList className="grid w-full grid-cols-2 sm:w-auto">
            <TabsTrigger value="purchased">已购小册 ({myBooks.length})</TabsTrigger>
            <TabsTrigger value="favorites">收藏小册 ({favoriteBooks.length})</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="搜索小册..."
            className="pl-8 w-full md:w-[200px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* 已购小册 */}
      {activeTab === "purchased" && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPurchased.length > 0 ? (
            filteredPurchased.map((book) => (
              <Card key={book.id} className="overflow-hidden transition-all hover:shadow-md">
                <CardContent className="p-0">
                  <div className="flex p-4">
                    <div className="relative h-24 w-20 shrink-0">
                      <Image
                        src={book.cover || "/placeholder.svg"}
                        alt={book.title}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <Link href={`/books/${book.id}`}>
                        <h3 className="font-semibold hover:text-primary line-clamp-1">{book.title}</h3>
                      </Link>
                      <div className="text-sm text-muted-foreground mb-2">作者: {book.author.name}</div>
                      <div className="flex items-center text-xs text-muted-foreground mb-2">
                        <Calendar className="mr-1 h-3 w-3" />
                        <span>购买于 {book.purchaseDate}</span>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                        <span>最近阅读 {book.lastReadDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="px-4 pb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>阅读进度</span>
                      <span>{book.progress}%</span>
                    </div>
                    <Progress value={book.progress} className="h-2 mb-3" />

                    <div className="flex justify-between">
                      <div className="text-xs text-muted-foreground">
                        已学习 {book.completedSections}/{book.totalSections} 小节
                      </div>
                      <Link href={`/books/${book.id}/read/1`}>
                        <Button size="sm">
                          <BookOpen className="mr-1 h-3 w-3" />
                          继续阅读
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-6 mb-4">
                <BookOpen className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">暂无已购小册</h3>
              <p className="text-muted-foreground mb-4">去探索更多优质小册，提升你的技术能力</p>
              <Link href="/books">
                <Button>浏览小册</Button>
              </Link>
            </div>
          )}
        </div>
      )}

      {/* 收藏小册 */}
      {activeTab === "favorites" && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredFavorites.length > 0 ? (
            filteredFavorites.map((book) => (
              <Card key={book.id} className="overflow-hidden transition-all hover:shadow-md">
                <CardContent className="p-0">
                  <div className="relative h-40 w-full">
                    <Image src={book.cover || "/placeholder.svg"} alt={book.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  </div>
                  <div className="p-4">
                    <Link href={`/books/${book.id}`}>
                      <h3 className="font-semibold text-lg mb-2 hover:text-primary line-clamp-1">{book.title}</h3>
                    </Link>
                    <div className="flex items-center gap-2 mb-4">
                      <Avatar className="h-5 w-5">
                        <AvatarImage src={book.author.avatar} alt={book.author.name} />
                        <AvatarFallback>{book.author.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{book.author.name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-end">
                        <span className="text-lg font-bold text-primary">¥{book.price}</span>
                        {book.originalPrice && (
                          <span className="ml-1 text-xs text-muted-foreground line-through">¥{book.originalPrice}</span>
                        )}
                      </div>
                      <Link href={`/books/${book.id}/purchase`}>
                        <Button size="sm">立即购买</Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-6 mb-4">
                <BookOpen className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">暂无收藏小册</h3>
              <p className="text-muted-foreground mb-4">收藏感兴趣的小册，方便随时查看</p>
              <Link href="/books">
                <Button>浏览小册</Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

