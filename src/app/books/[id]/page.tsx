"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Users,
  Star,
  CheckCircle,
  Lock,
  FileText,
  Coffee,
  Share2,
  MessageSquare,
  ThumbsUp,
  MapPin,
  ExternalLink,
} from "lucide-react"

// 模拟小册详情数据
const bookData = {
  id: 1,
  title: "React 进阶实战指南",
  cover: "/placeholder.svg?height=400&width=300",
  description: "从零开始，系统学习 React 生态圈技术栈，打造企业级应用。",
  longDescription: `
    <p>React 是当前最流行的前端框架之一，但要真正掌握 React 及其生态系统并不容易。本小册将带你从基础到高级，全面掌握 React 技术栈。</p>
    
    <p>无论你是刚接触 React 的新手，还是想要提升自己 React 技能的开发者，这本小册都能满足你的需求。我们将从 React 基础概念开始，逐步深入到高级特性和最佳实践。</p>
    
    <p>通过本小册，你将学习到：</p>
    <ul>
      <li>React 核心概念和 Hooks 的深入理解</li>
      <li>React 性能优化策略</li>
      <li>状态管理解决方案对比与实践</li>
      <li>React 服务端渲染</li>
      <li>React 测试策略</li>
      <li>大型 React 应用架构设计</li>
    </ul>
    
    <p>每个章节都包含详细的代码示例和实战项目，帮助你将理论知识应用到实际开发中。</p>
  `,
  author: {
    name: "张三",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "资深前端工程师，拥有8年 React 开发经验，曾在多家知名互联网公司担任技术负责人，热爱分享技术知识。",
    articles: 42,
    followers: 1560,
    location: "北京",
    website: "https://example.com",
  },
  price: 49.9,
  originalPrice: 99.9,
  tags: ["React", "前端", "进阶"],
  sections: 24,
  words: 120000,
  students: 1250,
  updateTime: "2023-05-15",
  publishTime: "2023-01-10",
  rating: 4.8,
  isFeatured: true,
  isNew: true,
  chapters: [
    {
      id: 1,
      title: "React 基础回顾",
      sections: [
        { id: 1, title: "React 核心概念", isFree: true, wordCount: 5000, estimatedTime: 15 },
        { id: 2, title: "JSX 语法详解", isFree: true, wordCount: 4500, estimatedTime: 12 },
        { id: 3, title: "组件与 Props", isFree: false, wordCount: 6000, estimatedTime: 18 },
      ],
    },
    {
      id: 2,
      title: "React Hooks 深入理解",
      sections: [
        { id: 4, title: "useState 与 useEffect", isFree: false, wordCount: 7000, estimatedTime: 20 },
        { id: 5, title: "useContext 与 useReducer", isFree: false, wordCount: 6500, estimatedTime: 18 },
        { id: 6, title: "自定义 Hooks 设计", isFree: false, wordCount: 5500, estimatedTime: 15 },
      ],
    },
    {
      id: 3,
      title: "React 状态管理",
      sections: [
        { id: 7, title: "Context API 实战", isFree: false, wordCount: 5000, estimatedTime: 15 },
        { id: 8, title: "Redux 核心概念", isFree: false, wordCount: 8000, estimatedTime: 25 },
        { id: 9, title: "Mobx 与响应式编程", isFree: false, wordCount: 7000, estimatedTime: 20 },
      ],
    },
    {
      id: 4,
      title: "React 性能优化",
      sections: [
        { id: 10, title: "渲染优化策略", isFree: false, wordCount: 6000, estimatedTime: 18 },
        { id: 11, title: "React.memo 与 useMemo", isFree: false, wordCount: 5500, estimatedTime: 15 },
        { id: 12, title: "代码分割与懒加载", isFree: false, wordCount: 4500, estimatedTime: 12 },
      ],
    },
  ],
  benefits: [
    "系统掌握 React 核心技术",
    "理解 React 底层原理",
    "掌握 React 性能优化技巧",
    "学习大型应用架构设计",
    "获取一手实战经验",
  ],
  requirements: ["熟悉 JavaScript ES6+ 语法", "了解基本的 HTML 和 CSS", "有一定的前端开发经验"],
  comments: [
    {
      id: 1,
      user: {
        name: "李四",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content:
        "内容非常详细，特别是 React Hooks 那一章，让我对 Hooks 的理解更加深入了。推荐给所有想要提升 React 技能的开发者！",
      rating: 5,
      date: "2023-04-15",
    },
    {
      id: 2,
      user: {
        name: "王五",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content:
        "作为一个 React 初学者，这本小册对我帮助很大。内容由浅入深，示例代码也很清晰。不过有些高级概念可能需要多读几遍才能理解。",
      rating: 4,
      date: "2023-03-20",
    },
  ],
  relatedBooks: [
    { id: 2, title: "TypeScript 高级编程", cover: "/placeholder.svg?height=100&width=80" },
    { id: 3, title: "Next.js 全栈开发实战", cover: "/placeholder.svg?height=100&width=80" },
  ],
}

export default function BookDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("intro")
  const [hasPurchased, setHasPurchased] = useState(false)

  // 计算免费章节数量
  const freeSectionsCount = bookData.chapters.reduce((count, chapter) => {
    return count + chapter.sections.filter((section) => section.isFree).length
  }, 0)

  // 计算总章节数量
  const totalSectionsCount = bookData.chapters.reduce((count, chapter) => {
    return count + chapter.sections.length
  }, 0)

  // 计算总阅读时间（分钟）
  const totalReadingTime = bookData.chapters.reduce((time, chapter) => {
    return (
      time +
      chapter.sections.reduce((sectionTime, section) => {
        return sectionTime + section.estimatedTime
      }, 0)
    )
  }, 0)

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

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* 左侧内容区 */}
        <div className="md:col-span-2">
          {/* 小册基本信息 */}
          <Card className="mb-8 overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="relative h-60 w-full md:h-auto md:w-1/3">
                  <Image
                    src={bookData.cover || "/placeholder.svg"}
                    alt={bookData.title}
                    fill
                    className="object-cover"
                  />
                  {bookData.isNew && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-blue-500 hover:bg-blue-500/80">新上架</Badge>
                    </div>
                  )}
                </div>
                <div className="flex-1 p-6">
                  <h1 className="text-2xl font-bold mb-2">{bookData.title}</h1>
                  <p className="text-muted-foreground mb-4">{bookData.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {bookData.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex flex-col items-center justify-center p-2 bg-muted/30 rounded-lg">
                      <BookOpen className="h-5 w-5 text-primary mb-1" />
                      <span className="text-sm text-muted-foreground">{bookData.sections} 小节</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-2 bg-muted/30 rounded-lg">
                      <FileText className="h-5 w-5 text-primary mb-1" />
                      <span className="text-sm text-muted-foreground">{Math.round(bookData.words / 1000)}k 字</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-2 bg-muted/30 rounded-lg">
                      <Clock className="h-5 w-5 text-primary mb-1" />
                      <span className="text-sm text-muted-foreground">{totalReadingTime} 分钟</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-2 bg-muted/30 rounded-lg">
                      <Users className="h-5 w-5 text-primary mb-1" />
                      <span className="text-sm text-muted-foreground">{bookData.students} 人已学</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                      <span className="ml-1 font-medium">{bookData.rating}</span>
                      <span className="ml-1 text-sm text-muted-foreground">({bookData.comments.length} 评价)</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span>最近更新: {bookData.updateTime}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div>
                      <span className="text-2xl font-bold text-primary">¥{bookData.price}</span>
                      {bookData.originalPrice > bookData.price && (
                        <span className="ml-2 text-sm text-muted-foreground line-through">
                          ¥{bookData.originalPrice}
                        </span>
                      )}
                    </div>
                    {!hasPurchased ? (
                      <Button
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                        onClick={() => setHasPurchased(true)}
                      >
                        立即购买
                      </Button>
                    ) : (
                      <Button className="bg-green-600 text-white hover:bg-green-600/90">
                        <CheckCircle className="mr-2 h-4 w-4" />
                        继续学习
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 内容标签页 */}
          <Tabs defaultValue="intro" value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="intro">小册介绍</TabsTrigger>
              <TabsTrigger value="catalog">目录</TabsTrigger>
              <TabsTrigger value="comments">评价</TabsTrigger>
            </TabsList>

            {/* 小册介绍 */}
            <TabsContent value="intro" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>小册介绍</CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className="prose prose-sm md:prose-base max-w-none dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: bookData.longDescription }}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>你将获得</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {bookData.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>适合人群</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {bookData.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Users className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 目录 */}
            <TabsContent value="catalog">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>小册目录</CardTitle>
                  <div className="text-sm text-muted-foreground">
                    共 {totalSectionsCount} 小节 · {freeSectionsCount} 小节免费
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {bookData.chapters.map((chapter, chapterIndex) => (
                      <div key={chapter.id}>
                        <h3 className="text-lg font-semibold mb-3">
                          {chapterIndex + 1}. {chapter.title}
                        </h3>
                        <div className="space-y-2">
                          {chapter.sections.map((section, sectionIndex) => (
                            <Link
                              key={section.id}
                              href={hasPurchased || section.isFree ? `/books/${bookData.id}/read/${section.id}` : "#"}
                              className={`block ${!hasPurchased && !section.isFree ? "pointer-events-none" : ""}`}
                            >
                              <div
                                className={`flex items-center justify-between p-3 rounded-lg border ${hasPurchased || section.isFree ? "hover:bg-muted/50" : "opacity-70"}`}
                              >
                                <div className="flex items-center gap-3">
                                  <span className="text-sm font-medium">
                                    {chapterIndex + 1}.{sectionIndex + 1}
                                  </span>
                                  <span className="font-medium">{section.title}</span>
                                  {section.isFree && (
                                    <Badge variant="outline" className="text-xs">
                                      免费
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className="text-sm text-muted-foreground">{section.estimatedTime} 分钟</span>
                                  {!hasPurchased && !section.isFree ? (
                                    <Lock className="h-4 w-4 text-muted-foreground" />
                                  ) : (
                                    <FileText className="h-4 w-4 text-primary" />
                                  )}
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 评价 */}
            <TabsContent value="comments">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>用户评价</CardTitle>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    <span className="ml-1 font-medium">{bookData.rating}</span>
                    <span className="ml-1 text-sm text-muted-foreground">({bookData.comments.length} 评价)</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {bookData.comments.map((comment) => (
                      <div key={comment.id} className="pb-6 border-b last:border-b-0">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                              <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{comment.user.name}</span>
                          </div>
                          <div className="flex items-center">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < comment.rating ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"}`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm mb-2">{comment.content}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">{comment.date}</span>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="h-8 gap-1">
                              <ThumbsUp className="h-4 w-4" />
                              <span className="text-xs">有用</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 gap-1">
                              <MessageSquare className="h-4 w-4" />
                              <span className="text-xs">回复</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* 右侧边栏 */}
        <div className="md:col-span-1">
          <div className="sticky top-20 space-y-6">
            {/* 作者信息 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">作者信息</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-20 w-20 mb-3">
                    <AvatarImage src={bookData.author.avatar} alt={bookData.author.name} />
                    <AvatarFallback>{bookData.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-lg mb-1">{bookData.author.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{bookData.author.bio}</p>

                  <div className="flex justify-center gap-4 mb-3">
                    <div className="text-center">
                      <div className="font-semibold">{bookData.author.articles}</div>
                      <div className="text-xs text-muted-foreground">文章</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold">{bookData.author.followers}</div>
                      <div className="text-xs text-muted-foreground">关注者</div>
                    </div>
                  </div>

                  <div className="w-full space-y-2 text-sm">
                    {bookData.author.location && (
                      <div className="flex items-center justify-center gap-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">{bookData.author.location}</span>
                      </div>
                    )}
                    {bookData.author.website && (
                      <div className="flex items-center justify-center gap-1">
                        <ExternalLink className="h-3 w-3 text-muted-foreground" />
                        <a
                          href={bookData.author.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {bookData.author.website.replace(/^https?:\/\//, "")}
                        </a>
                      </div>
                    )}
                  </div>

                  <Button variant="outline" className="mt-4 w-full">
                    关注作者
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* 学习进度 */}
            {hasPurchased && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">学习进度</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>已学习 0/{totalSectionsCount} 小节</span>
                        <span>0%</span>
                      </div>
                      <Progress value={0} className="h-2" />
                    </div>
                    <Button className="w-full">继续学习</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* 相关小册 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">相关小册</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookData.relatedBooks.map((book) => (
                    <Link key={book.id} href={`/books/${book.id}`}>
                      <div className="flex items-center gap-3 group">
                        <div className="relative h-16 w-12 overflow-hidden rounded-md">
                          <Image
                            src={book.cover || "/placeholder.svg"}
                            alt={book.title}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                          />
                        </div>
                        <span className="font-medium group-hover:text-primary">{book.title}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 分享 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">分享小册</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center gap-4">
                  <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
                    <Coffee className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

