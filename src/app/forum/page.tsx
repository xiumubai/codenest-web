"use client"

import { useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Eye,
  MessageSquare,
  Clock,
  Filter,
  Search,
  TrendingUp,
  Bookmark,
  PlusCircle,
  BarChart4,
  Award,
  Bell,
  Zap,
  Flame,
} from "lucide-react"

// 模拟论坛主题数据
const topics = [
  {
    id: 1,
    title: "自定义聊天功能非常棒 (提示与技巧)",
    category: "展示",
    tags: ["热门", "AI", "提示工程"],
    replies: 38,
    views: 4598,
    lastActivity: "2023-03-13",
    lastReplyUser: {
      name: "张三",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    author: {
      name: "李四",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    isNew: true,
    isPinned: true,
    isHot: true,
  },
  {
    id: 2,
    title: "关于应用模型的思考 - 我们应该如何选择最适合的AI模型？",
    category: "讨论",
    tags: ["AI模型", "GPT-4", "Claude"],
    replies: 25,
    views: 3200,
    lastActivity: "2023-03-10",
    lastReplyUser: {
      name: "王五",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    author: {
      name: "赵六",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    isNew: false,
    isPinned: false,
    isHot: true,
  },
  {
    id: 3,
    title: "我们已经达到了Anthropic的速率限制 - 有什么解决方案吗？",
    category: "讨论",
    tags: ["Anthropic", "API", "速率限制"],
    replies: 13,
    views: 4320,
    lastActivity: "2023-03-13",
    lastReplyUser: {
      name: "钱七",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    author: {
      name: "孙八",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    isNew: true,
    isPinned: false,
    isHot: false,
  },
  {
    id: 4,
    title: "模型比较表 - 我整理了所有主流AI模型的性能和特点对比",
    category: "讨论",
    tags: ["热门", "AI模型", "对比"],
    replies: 13,
    views: 1379,
    lastActivity: "2023-03-13",
    lastReplyUser: {
      name: "周九",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    author: {
      name: "吴十",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    isNew: true,
    isPinned: true,
    isHot: false,
  },
  {
    id: 5,
    title: "应用在中途停止并挂起 - 紧急求助！",
    category: "错误报告",
    tags: ["热门", "Bug", "帮助"],
    replies: 18,
    views: 564,
    lastActivity: "2023-03-13",
    lastReplyUser: {
      name: "冯十一",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    author: {
      name: "陈十二",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    isNew: true,
    isPinned: false,
    isHot: false,
  },
]

// 模拟热门标签数据
const popularTags = [
  { name: "AI", count: 128 },
  { name: "GPT-4", count: 86 },
  { name: "提示工程", count: 64 },
  { name: "API", count: 52 },
  { name: "Claude", count: 43 },
  { name: "性能优化", count: 38 },
  { name: "Bug", count: 31 },
  { name: "教程", count: 27 },
]

// 模拟社区统计数据
const communityStats = {
  topics: 1245,
  posts: 8429,
  members: 3570,
  onlineMembers: 128,
}

// 模拟热门用户数据
const topUsers = [
  { name: "张三", avatar: "/placeholder.svg?height=40&width=40", posts: 128, reputation: 1560 },
  { name: "李四", avatar: "/placeholder.svg?height=40&width=40", posts: 96, reputation: 1240 },
  { name: "王五", avatar: "/placeholder.svg?height=40&width=40", posts: 84, reputation: 980 },
]

export default function ForumPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [sortBy, setSortBy] = useState("activity")
  const [viewMode, setViewMode] = useState("card") // card or compact

  // 根据活跃分类筛选主题
  const filteredTopics = activeCategory === "all" ? topics : topics.filter((topic) => topic.category === activeCategory)

  // 根据排序方式对主题进行排序
  const sortedTopics = [...filteredTopics].sort((a, b) => {
    // 置顶的主题始终排在前面
    if (a.isPinned && !b.isPinned) return -1
    if (!a.isPinned && b.isPinned) return 1

    if (sortBy === "activity") {
      return new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime()
    } else if (sortBy === "replies") {
      return b.replies - a.replies
    } else if (sortBy === "views") {
      return b.views - a.views
    }
    return 0
  })

  return (
    <div className="container mx-auto py-6">
      {/* 顶部横幅 */}
      <div className="mb-8 rounded-xl bg-gradient-to-r from-primary/20 via-primary/10 to-background p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">CodeNest 社区论坛</h1>
          <p className="text-muted-foreground max-w-2xl">
            欢迎来到我们的社区！这里是分享知识、提出问题和讨论想法的地方。 加入我们，与志同道合的开发者一起成长。
          </p>
          <div className="flex gap-3 mt-4">
            <Link href="/forum/new">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <PlusCircle className="mr-2 h-4 w-4" />
                发布新主题
              </Button>
            </Link>
            <Button variant="outline">
              <Bell className="mr-2 h-4 w-4" />
              订阅更新
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {/* 左侧边栏 */}
        <div className="space-y-6 md:col-span-1">
          {/* 社区统计 */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3 flex items-center">
                <BarChart4 className="mr-2 h-4 w-4 text-primary" />
                社区统计
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-muted/50 p-3 text-center">
                  <div className="text-xl font-bold">{communityStats.topics}</div>
                  <div className="text-xs text-muted-foreground">主题</div>
                </div>
                <div className="rounded-lg bg-muted/50 p-3 text-center">
                  <div className="text-xl font-bold">{communityStats.posts}</div>
                  <div className="text-xs text-muted-foreground">帖子</div>
                </div>
                <div className="rounded-lg bg-muted/50 p-3 text-center">
                  <div className="text-xl font-bold">{communityStats.members}</div>
                  <div className="text-xs text-muted-foreground">成员</div>
                </div>
                <div className="rounded-lg bg-muted/50 p-3 text-center">
                  <div className="text-xl font-bold">{communityStats.onlineMembers}</div>
                  <div className="text-xs text-muted-foreground">在线</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 热门标签 */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3 flex items-center">
                <Flame className="mr-2 h-4 w-4 text-primary" />
                热门标签
              </h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <Badge key={tag.name} variant="outline" className="cursor-pointer hover:bg-muted">
                    {tag.name}
                    <span className="ml-1 text-xs text-muted-foreground">({tag.count})</span>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 活跃用户 */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3 flex items-center">
                <Award className="mr-2 h-4 w-4 text-primary" />
                活跃用户
              </h3>
              <div className="space-y-3">
                {topUsers.map((user, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{user.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {user.posts} 帖子 · {user.reputation} 声望
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      #{index + 1}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 主要内容区 */}
        <div className="md:col-span-3">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Tabs
              defaultValue="all"
              value={activeCategory}
              onValueChange={setActiveCategory}
              className="w-full sm:w-auto"
            >
              <TabsList className="grid w-full grid-cols-4 sm:w-auto sm:grid-cols-5">
                <TabsTrigger value="all">全部</TabsTrigger>
                <TabsTrigger value="讨论">讨论</TabsTrigger>
                <TabsTrigger value="展示">展示</TabsTrigger>
                <TabsTrigger value="错误报告">错误</TabsTrigger>
                <TabsTrigger value="教程" className="hidden sm:block">
                  教程
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input type="search" placeholder="搜索..." className="pl-8 w-full md:w-[200px]" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* 排序和视图切换 */}
          <div className="mb-4 flex items-center justify-between bg-muted/30 rounded-lg p-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">排序:</span>
              <Button
                variant={sortBy === "activity" ? "default" : "ghost"}
                size="sm"
                onClick={() => setSortBy("activity")}
                className="gap-1"
              >
                <Clock className="h-4 w-4" />
                最新活动
              </Button>
              <Button
                variant={sortBy === "replies" ? "default" : "ghost"}
                size="sm"
                onClick={() => setSortBy("replies")}
                className="gap-1"
              >
                <MessageSquare className="h-4 w-4" />
                回复数
              </Button>
              <Button
                variant={sortBy === "views" ? "default" : "ghost"}
                size="sm"
                onClick={() => setSortBy("views")}
                className="gap-1"
              >
                <Eye className="h-4 w-4" />
                浏览量
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "card" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("card")}
                className="gap-1"
              >
                <Zap className="h-4 w-4" />
                卡片视图
              </Button>
              <Button
                variant={viewMode === "compact" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("compact")}
                className="gap-1"
              >
                <TrendingUp className="h-4 w-4" />
                紧凑视图
              </Button>
            </div>
          </div>

          {/* 主题列表 - 卡片视图 */}
          {viewMode === "card" && (
            <div className="space-y-4">
              {sortedTopics.map((topic) => (
                <Card
                  key={topic.id}
                  className={`overflow-hidden transition-all hover:shadow-md ${topic.isPinned ? "border-primary/30 bg-primary/5" : ""}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      {/* 作者头像 */}
                      <Avatar className="h-10 w-10 mt-1">
                        <AvatarImage src={topic.author.avatar} alt={topic.author.name} />
                        <AvatarFallback>{topic.author.name[0]}</AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        {/* 标签和状态 */}
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <Badge variant="outline">{topic.category}</Badge>
                          {topic.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="bg-primary/10 text-primary border-primary/20"
                            >
                              {tag}
                            </Badge>
                          ))}
                          {topic.isPinned && <Badge className="bg-yellow-500 hover:bg-yellow-500/80">置顶</Badge>}
                          {topic.isNew && <Badge className="bg-blue-500 hover:bg-blue-500/80">新</Badge>}
                          {topic.isHot && <Badge className="bg-red-500 hover:bg-red-500/80">热门</Badge>}
                        </div>

                        {/* 主题标题 */}
                        <Link href={`/forum/topic/${topic.id}`}>
                          <h3 className="text-xl font-semibold hover:text-primary line-clamp-2 mb-2">{topic.title}</h3>
                        </Link>

                        {/* 作者和统计信息 */}
                        <div className="flex flex-wrap items-center justify-between gap-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-muted-foreground">由</span>
                            <span className="font-medium">{topic.author.name}</span>
                            <span className="text-muted-foreground">发布</span>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MessageSquare className="h-4 w-4" /> {topic.replies}
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="h-4 w-4" /> {topic.views}
                            </span>
                          </div>
                        </div>

                        {/* 最后回复信息 */}
                        <div className="mt-3 pt-3 border-t flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={topic.lastReplyUser.avatar} alt={topic.lastReplyUser.name} />
                              <AvatarFallback>{topic.lastReplyUser.name[0]}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm">
                              <span className="font-medium">{topic.lastReplyUser.name}</span>
                              <span className="text-muted-foreground"> 回复于 {topic.lastActivity}</span>
                            </span>
                          </div>

                          <Button variant="ghost" size="sm" className="gap-1">
                            <Bookmark className="h-4 w-4" />
                            <span className="hidden sm:inline">收藏</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* 主题列表 - 紧凑视图 */}
          {viewMode === "compact" && (
            <div className="rounded-lg border overflow-hidden">
              {/* 表头 */}
              <div className="grid grid-cols-12 gap-4 px-4 py-2 bg-muted/50 font-medium text-sm">
                <div className="col-span-7">主题</div>
                <div className="col-span-1 text-center">回复</div>
                <div className="col-span-1 text-center">浏览</div>
                <div className="col-span-3 text-right">最近活动</div>
              </div>

              {/* 主题行 */}
              <div className="divide-y">
                {sortedTopics.map((topic) => (
                  <div
                    key={topic.id}
                    className={`grid grid-cols-12 gap-4 px-4 py-3 items-center hover:bg-muted/30 transition-colors ${topic.isPinned ? "bg-primary/5" : ""}`}
                  >
                    <div className="col-span-7">
                      <div className="flex items-center gap-2 mb-1">
                        {topic.isPinned && <Badge className="bg-yellow-500 hover:bg-yellow-500/80">置顶</Badge>}
                        {topic.isNew && <Badge className="bg-blue-500 hover:bg-blue-500/80">新</Badge>}
                        {topic.isHot && <Badge className="bg-red-500 hover:bg-red-500/80">热门</Badge>}
                        <Badge variant="outline">{topic.category}</Badge>
                      </div>
                      <Link href={`/forum/topic/${topic.id}`}>
                        <h3 className="font-medium hover:text-primary line-clamp-1">{topic.title}</h3>
                      </Link>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <Avatar className="h-4 w-4">
                          <AvatarImage src={topic.author.avatar} alt={topic.author.name} />
                          <AvatarFallback>{topic.author.name[0]}</AvatarFallback>
                        </Avatar>
                        <span>{topic.author.name}</span>
                      </div>
                    </div>
                    <div className="col-span-1 text-center font-medium">{topic.replies}</div>
                    <div className="col-span-1 text-center text-muted-foreground">{topic.views}</div>
                    <div className="col-span-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={topic.lastReplyUser.avatar} alt={topic.lastReplyUser.name} />
                          <AvatarFallback>{topic.lastReplyUser.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="text-sm text-right">
                          <div className="font-medium">{topic.lastReplyUser.name}</div>
                          <div className="text-xs text-muted-foreground">{topic.lastActivity}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 分页 */}
          <div className="mt-6 flex justify-center">
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                上一页
              </Button>
              <Button variant="default" size="sm">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="sm">
                下一页
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

