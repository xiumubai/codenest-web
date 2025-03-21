"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  BookOpen,
  Users,
  DollarSign,
  BarChart,
  PlusCircle,
  Search,
  MoreHorizontal,
  Edit,
  Trash,
  Eye,
  Copy,
} from "lucide-react"

// 模拟我创建的小册数据
const myCreatedBooks = [
  {
    id: 1,
    title: "React 全栈开发实战",
    cover: "/placeholder.svg?height=400&width=300",
    price: 49.9,
    sales: 1250,
    revenue: 62375,
    status: "published",
    publishDate: "2023-01-10",
    updateDate: "2023-06-15",
  },
  {
    id: 5,
    title: "Vue3 + TypeScript 项目实战",
    cover: "/placeholder.svg?height=400&width=300",
    price: 45.9,
    sales: 1820,
    revenue: 83538,
    status: "published",
    publishDate: "2023-02-20",
    updateDate: "2023-06-28",
  },
  {
    id: 7,
    title: "前端工程化实践指南",
    cover: "/placeholder.svg?height=400&width=300",
    price: 39.9,
    sales: 950,
    revenue: 37905,
    status: "published",
    publishDate: "2023-04-10",
    updateDate: "2023-04-10",
  },
  {
    id: 9,
    title: "JavaScript 设计模式与实践",
    cover: "/placeholder.svg?height=400&width=300",
    price: 35.9,
    sales: 1120,
    revenue: 40208,
    status: "published",
    publishDate: "2022-11-20",
    updateDate: "2022-11-20",
  },
  {
    id: 12,
    title: "微前端架构与实践",
    cover: "/placeholder.svg?height=400&width=300",
    price: 55.9,
    sales: 780,
    revenue: 43602,
    status: "published",
    publishDate: "2023-02-15",
    updateDate: "2023-02-15",
  },
  {
    id: 15,
    title: "Web 3D 开发入门与实战",
    cover: "/placeholder.svg?height=400&width=300",
    price: 59.9,
    sales: 0,
    revenue: 0,
    status: "draft",
    publishDate: "",
    updateDate: "2023-07-20",
  },
]

// 状态标签映射
const statusMap = {
  published: { label: "已发布", color: "bg-green-500 hover:bg-green-500/80" },
  draft: { label: "草稿", color: "bg-yellow-500 hover:bg-yellow-500/80" },
}

export default function ManageBooksPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  // 过滤小册
  const filteredBooks = myCreatedBooks.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "published" && book.status === "published") ||
      (activeTab === "draft" && book.status === "draft")
    return matchesSearch && matchesTab
  })

  // 计算总收入
  const totalRevenue = myCreatedBooks.reduce((sum, book) => sum + book.revenue, 0)

  // 计算总销量
  const totalSales = myCreatedBooks.reduce((sum, book) => sum + book.sales, 0)

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <h1 className="text-3xl font-bold">小册管理</h1>
        <Link href="/books/manage/create">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <PlusCircle className="mr-2 h-4 w-4" />
            创建小册
          </Button>
        </Link>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">小册数量</p>
                <h3 className="text-2xl font-bold">{myCreatedBooks.length}</h3>
              </div>
              <div className="rounded-full bg-primary/10 p-3">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">总销量</p>
                <h3 className="text-2xl font-bold">{totalSales}</h3>
              </div>
              <div className="rounded-full bg-blue-500/10 p-3">
                <Users className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">总收入</p>
                <h3 className="text-2xl font-bold">¥{totalRevenue.toLocaleString()}</h3>
              </div>
              <div className="rounded-full bg-green-500/10 p-3">
                <DollarSign className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">平均价格</p>
                <h3 className="text-2xl font-bold">
                  ¥{(myCreatedBooks.reduce((sum, book) => sum + book.price, 0) / myCreatedBooks.length).toFixed(2)}
                </h3>
              </div>
              <div className="rounded-full bg-purple-500/10 p-3">
                <BarChart className="h-6 w-6 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
          <TabsList className="grid w-full grid-cols-3 sm:w-auto">
            <TabsTrigger value="all">全部</TabsTrigger>
            <TabsTrigger value="published">已发布</TabsTrigger>
            <TabsTrigger value="draft">草稿</TabsTrigger>
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

      {/* 小册列表 */}
      <Card>
        <CardHeader className="px-6 py-4">
          <div className="grid grid-cols-12 text-sm font-medium">
            <div className="col-span-5">小册</div>
            <div className="col-span-1 text-center">价格</div>
            <div className="col-span-1 text-center">销量</div>
            <div className="col-span-2 text-center">收入</div>
            <div className="col-span-2 text-center">状态</div>
            <div className="col-span-1 text-center">操作</div>
          </div>
        </CardHeader>
        <CardContent className="px-6 py-0">
          {filteredBooks.length > 0 ? (
            <div className="divide-y">
              {filteredBooks.map((book) => (
                <div key={book.id} className="grid grid-cols-12 items-center py-4">
                  <div className="col-span-5 flex items-center gap-3">
                    <div className="relative h-16 w-12 shrink-0">
                      <Image
                        src={book.cover || "/placeholder.svg"}
                        alt={book.title}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div>
                      <Link href={`/books/${book.id}`}>
                        <h3 className="font-medium hover:text-primary line-clamp-1">{book.title}</h3>
                      </Link>
                      <div className="text-xs text-muted-foreground">
                        {book.status === "published" ? `发布于 ${book.publishDate}` : `更新于 ${book.updateDate}`}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-1 text-center font-medium">¥{book.price}</div>
                  <div className="col-span-1 text-center">{book.sales}</div>
                  <div className="col-span-2 text-center">¥{book.revenue.toLocaleString()}</div>
                  <div className="col-span-2 text-center">
                    <Badge className={statusMap[book.status].color}>{statusMap[book.status].label}</Badge>
                  </div>
                  <div className="col-span-1 text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="flex items-center gap-2">
                          <Eye className="h-4 w-4" />
                          <span>查看</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2">
                          <Edit className="h-4 w-4" />
                          <span>编辑</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2">
                          <Copy className="h-4 w-4" />
                          <span>复制</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2 text-destructive">
                          <Trash className="h-4 w-4" />
                          <span>删除</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-6 mb-4">
                <BookOpen className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">暂无小册</h3>
              <p className="text-muted-foreground mb-4">创建你的第一本小册，分享你的专业知识</p>
              <Link href="/books/manage/create">
                <Button>创建小册</Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

