import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Users, Star, MapPin, ExternalLink, Mail, Calendar } from "lucide-react"

// 模拟作者数据
const authorData = {
  id: 1,
  name: "张三",
  avatar: "/placeholder.svg?height=120&width=120",
  title: "资深前端工程师",
  company: "某知名互联网公司",
  bio: "10年Web开发经验，精通React生态，曾主导多个大型前端项目，热爱技术分享。专注于前端架构设计、性能优化和工程化实践。",
  location: "北京",
  website: "https://example.com",
  email: "contact@example.com",
  joinDate: "2020-05-15",
  followers: 12500,
  following: 320,
  articles: 68,
  books: [
    {
      id: 1,
      title: "React 全栈开发实战",
      description: "从零开始，一步步构建完整的React应用，包含前端界面、后端API和数据库设计。",
      cover: "/placeholder.svg?height=400&width=300",
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
      id: 5,
      title: "Vue3 + TypeScript 项目实战",
      description: "使用Vue3和TypeScript开发企业级应用，包含Composition API、状态管理和性能优化。",
      cover: "/placeholder.svg?height=400&width=300",
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
      id: 7,
      title: "前端工程化实践指南",
      description: "深入探讨前端工程化的各个方面，包括构建工具、CI/CD、自动化测试和部署策略。",
      cover: "/placeholder.svg?height=400&width=300",
      price: 39.9,
      originalPrice: 79.9,
      sections: 18,
      words: "8万+",
      readers: 950,
      rating: 4.6,
      tags: ["工程化", "前端", "最佳实践"],
      updateTime: "2023-04-10",
      isFeatured: false,
      isNew: false,
    },
    {
      id: 9,
      title: "JavaScript 设计模式与实践",
      description: "通过实际案例学习JavaScript设计模式，提高代码质量和可维护性。",
      cover: "/placeholder.svg?height=400&width=300",
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

export default function AuthorPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        {/* 左侧作者信息 */}
        <div className="md:col-span-1">
          <Card className="sticky top-20">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={authorData.avatar} alt={authorData.name} />
                  <AvatarFallback>{authorData.name[0]}</AvatarFallback>
                </Avatar>

                <h1 className="text-xl font-bold mb-1">{authorData.name}</h1>
                <p className="text-sm text-muted-foreground mb-3">
                  {authorData.title} @ {authorData.company}
                </p>

                <div className="flex justify-center gap-4 mb-4">
                  <div className="text-center">
                    <div className="font-semibold">{authorData.followers.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">关注者</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">{authorData.following.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">关注</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">{authorData.articles}</div>
                    <div className="text-xs text-muted-foreground">文章</div>
                  </div>
                </div>

                <Button className="w-full mb-4">关注作者</Button>

                <div className="w-full space-y-2 text-sm">
                  {authorData.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{authorData.location}</span>
                    </div>
                  )}
                  {authorData.website && (
                    <div className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      <a
                        href={authorData.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline truncate"
                      >
                        {authorData.website.replace(/^https?:\/\//, "")}
                      </a>
                    </div>
                  )}
                  {authorData.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <a href={`mailto:${authorData.email}`} className="hover:underline">
                        {authorData.email}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>加入于 {new Date(authorData.joinDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 右侧内容区 */}
        <div className="md:col-span-3">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">关于作者</h2>
            <p className="text-muted-foreground">{authorData.bio}</p>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold flex items-center">
                <BookOpen className="mr-2 h-5 w-5 text-primary" />
                小册作品 ({authorData.books.length})
              </h2>
              <Tabs defaultValue="all" className="w-auto">
                <TabsList>
                  <TabsTrigger value="all">全部</TabsTrigger>
                  <TabsTrigger value="featured">精选</TabsTrigger>
                  <TabsTrigger value="new">最新</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {authorData.books.map((book) => (
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
                              <span className="ml-1 text-xs text-muted-foreground line-through">
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
        </div>
      </div>
    </div>
  )
}

