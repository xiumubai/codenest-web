"use client"

import { TabsContent } from "@/components/ui/tabs"

import { useState } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Share2,
  Bookmark,
  ArrowLeft,
  Eye,
  Clock,
  Heart,
  Flag,
  Copy,
  AlertTriangle,
  Award,
  Calendar,
  MapPin,
  Mail,
  ExternalLink,
  Reply,
  Quote,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"

// 模拟主题数据
const topicData = {
  id: 1,
  title: "自定义聊天功能非常棒 (提示与技巧)",
  content: `
    <p>我最近一直在探索自定义聊天功能，发现了一些非常有用的技巧，想在这里分享给大家。</p>
    
    <h2>1. 使用系统提示设置角色</h2>
    <p>通过系统提示，你可以定义AI的角色、行为和限制。例如：</p>
    <pre><code>你是一位经验丰富的Python导师，专注于帮助初学者理解基础概念。
请用简单的语言和具体的例子回答问题。
避免使用高级术语，除非你先解释它们。</code></pre>
    
    <h2>2. 使用格式化输出</h2>
    <p>你可以要求AI以特定格式输出内容，例如：</p>
    <pre><code>请以以下格式回答：
1. 简短答案（1-2句）
2. 详细解释
3. 代码示例（如适用）
4. 常见陷阱</code></pre>
    
    <h2>3. 链式思考</h2>
    <p>鼓励AI一步一步思考问题，这通常会产生更准确的结果：</p>
    <pre><code>请一步一步思考这个问题。首先分析问题的要求，然后考虑可能的解决方案，最后给出最佳答案。</code></pre>
    
    <p>希望这些技巧对大家有所帮助！欢迎在评论中分享你的经验和其他技巧。</p>
  `,
  category: "展示",
  tags: ["热门", "提示技巧", "AI", "聊天机器人"],
  author: {
    name: "张三",
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "2022-05-15",
    posts: 128,
    reputation: 1560,
    badges: ["高级会员", "内容创作者", "问题解决者"],
    location: "北京",
    website: "https://example.com",
    bio: "AI爱好者，专注于提示工程和大语言模型应用。喜欢分享知识和经验，希望能帮助更多人了解AI技术。",
  },
  createdAt: "2023-03-13 14:30",
  updatedAt: "2023-03-13 15:45",
  replies: 38,
  views: 4598,
  likes: 156,
  bookmarks: 42,
  isPinned: true,
  isHot: true,
  relatedTopics: [
    { id: 2, title: "如何优化提示词以获得更好的AI回复？", replies: 24 },
    { id: 3, title: "分享我使用AI的一些经验和技巧", replies: 18 },
    { id: 4, title: "AI聊天机器人的局限性讨论", replies: 32 },
  ],
}

// 模拟回复数据
const replies = [
  {
    id: 1,
    author: {
      name: "李四",
      avatar: "/placeholder.svg?height=40&width=40",
      joinDate: "2022-08-10",
      posts: 75,
      reputation: 860,
      badges: ["活跃成员"],
      isOnline: true,
    },
    content:
      "非常感谢分享这些技巧！我特别喜欢链式思考的方法，它确实帮助AI生成了更有条理的回答。我还发现，如果你在提示中明确指出你的专业水平，AI会相应地调整回答的复杂度。",
    createdAt: "2023-03-13 15:45",
    likes: 24,
    hasLiked: false,
    isHighlighted: true,
  },
  {
    id: 2,
    author: {
      name: "王五",
      avatar: "/placeholder.svg?height=40&width=40",
      joinDate: "2021-12-05",
      posts: 256,
      reputation: 1240,
      badges: ["资深会员", "问题解决者"],
      isOnline: false,
    },
    content:
      '我想补充一点，使用具体的例子来说明你的问题也很有帮助。比如，与其问"如何优化代码"，不如问"如何优化这个特定的排序算法"并提供代码片段。这样AI能给出更具体、更有用的建议。',
    createdAt: "2023-03-14 09:20",
    likes: 31,
    hasLiked: false,
    isHighlighted: false,
  },
  {
    id: 3,
    author: {
      name: "赵六",
      avatar: "/placeholder.svg?height=40&width=40",
      joinDate: "2022-02-18",
      posts: 112,
      reputation: 780,
      badges: ["活跃成员"],
      isOnline: true,
    },
    content:
      "这些技巧非常实用！我最近在使用AI辅助编程，发现如果我先描述我的目标，然后提供当前代码和遇到的具体问题，AI的回答会更加有针对性。另外，如果回答不够好，不要犹豫，继续追问或者重新组织你的问题。",
    createdAt: "2023-03-14 11:35",
    likes: 18,
    hasLiked: false,
    isHighlighted: false,
  },
]

export default function TopicDetail({ params }: { params: { id: string } }) {
  const [replyContent, setReplyContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [likeCount, setLikeCount] = useState(topicData.likes)
  const [hasLiked, setHasLiked] = useState(false)
  const [bookmarkCount, setBookmarkCount] = useState(topicData.bookmarks)
  const [hasBookmarked, setHasBookmarked] = useState(false)
  const [activeTab, setActiveTab] = useState("write")
  const [replyLikes, setReplyLikes] = useState(
    replies.map((reply) => ({ id: reply.id, likes: reply.likes, hasLiked: reply.hasLiked })),
  )

  const handleLike = () => {
    if (hasLiked) {
      setLikeCount(likeCount - 1)
    } else {
      setLikeCount(likeCount + 1)
    }
    setHasLiked(!hasLiked)
  }

  const handleBookmark = () => {
    if (hasBookmarked) {
      setBookmarkCount(bookmarkCount - 1)
    } else {
      setBookmarkCount(bookmarkCount + 1)
    }
    setHasBookmarked(!hasBookmarked)
  }

  const handleReplyLike = (replyId: number) => {
    setReplyLikes(
      replyLikes.map((reply) => {
        if (reply.id === replyId) {
          return {
            ...reply,
            likes: reply.hasLiked ? reply.likes - 1 : reply.likes + 1,
            hasLiked: !reply.hasLiked,
          }
        }
        return reply
      }),
    )
  }

  const handleSubmitReply = async () => {
    if (!replyContent.trim()) return

    setIsSubmitting(true)
    // 模拟提交延迟
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // 这里应该是实际的提交逻辑
    console.log("提交回复:", replyContent)

    setReplyContent("")
    setIsSubmitting(false)
    alert("回复已提交！")
  }

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    alert("链接已复制到剪贴板")
  }

  const previewContent = replyContent
    ? `<p>${replyContent.replace(/\n/g, "</p><p>")}</p>`
    : "<p>预览将显示在这里...</p>"

  return (
    <div className="container mx-auto py-6">
      {/* 阅读进度条 */}
      <div className="fixed top-14 left-0 z-40 h-1 bg-primary" style={{ width: "35%" }}></div>

      <div className="mb-6">
        <Link href="/forum">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            返回论坛
          </Button>
        </Link>
      </div>

      {/* 主题内容 */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="md:col-span-3">
          <Card className="mb-6 overflow-hidden">
            <CardHeader className="border-b bg-muted/30">
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">{topicData.category}</Badge>
                  {topicData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                      {tag}
                    </Badge>
                  ))}
                  {topicData.isPinned && <Badge className="bg-yellow-500 hover:bg-yellow-500/80">置顶</Badge>}
                  {topicData.isHot && <Badge className="bg-red-500 hover:bg-red-500/80">热门</Badge>}
                </div>
                <h1 className="text-2xl font-bold md:text-3xl">{topicData.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    <span>{topicData.replies} 回复</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>{topicData.views} 浏览</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>发布于 {topicData.createdAt}</span>
                  </div>
                  {topicData.updatedAt !== topicData.createdAt && (
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>更新于 {topicData.updatedAt}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                {/* 作者信息 - 侧边栏 */}
                <div className="border-b p-4 md:border-b-0 md:border-r md:w-48 md:shrink-0">
                  <div className="flex flex-row items-center gap-4 md:flex-col md:items-center md:text-center">
                    <Avatar className="h-12 w-12 md:h-20 md:w-20 border-2 border-primary/20">
                      <AvatarImage src={topicData.author.avatar} alt={topicData.author.name} />
                      <AvatarFallback>{topicData.author.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="md:mt-2">
                      <div className="font-semibold text-lg">{topicData.author.name}</div>
                      <div className="text-xs text-muted-foreground">加入于 {topicData.author.joinDate}</div>
                      <div className="text-xs text-muted-foreground">{topicData.author.posts} 帖子</div>
                      <div className="mt-2 flex flex-wrap justify-center gap-1">
                        {topicData.author.badges.map((badge, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {badge}
                          </Badge>
                        ))}
                      </div>
                      <div className="mt-3">
                        <div className="text-xs font-medium">声望</div>
                        <div className="flex items-center gap-2">
                          <Progress value={75} className="h-2" />
                          <span className="text-xs font-medium">{topicData.author.reputation}</span>
                        </div>
                      </div>
                      <div className="mt-3 space-y-2 text-xs text-muted-foreground">
                        {topicData.author.location && (
                          <div className="flex items-center justify-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span>{topicData.author.location}</span>
                          </div>
                        )}
                        {topicData.author.website && (
                          <div className="flex items-center justify-center gap-1">
                            <ExternalLink className="h-3 w-3" />
                            <a
                              href={topicData.author.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:underline truncate"
                            >
                              {topicData.author.website.replace(/^https?:\/\//, "")}
                            </a>
                          </div>
                        )}
                        <div className="flex items-center justify-center gap-1">
                          <Mail className="h-3 w-3" />
                          <span>发送消息</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 主题内容 */}
                <div className="flex-1 p-6">
                  <div
                    className="prose prose-sm md:prose-base max-w-none dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: topicData.content }}
                  />

                  {topicData.author.bio && (
                    <div className="mt-6 rounded-lg border-l-4 border-primary/50 bg-muted/30 p-4">
                      <div className="text-sm font-medium mb-1">关于作者</div>
                      <p className="text-sm text-muted-foreground">{topicData.author.bio}</p>
                    </div>
                  )}

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant={hasLiked ? "default" : "outline"}
                        size="sm"
                        className="gap-1"
                        onClick={handleLike}
                      >
                        <Heart className={`h-4 w-4 ${hasLiked ? "fill-primary-foreground" : ""}`} />
                        <span>{likeCount}</span>
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1" onClick={copyLink}>
                        <Copy className="h-4 w-4" />
                        <span className="hidden sm:inline">复制链接</span>
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Share2 className="h-4 w-4" />
                        <span className="hidden sm:inline">分享</span>
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            更多
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem className="gap-2">
                            <Flag className="h-4 w-4" />
                            <span>举报</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <AlertTriangle className="h-4 w-4" />
                            <span>标记为不适当</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <Button
                      variant={hasBookmarked ? "default" : "outline"}
                      size="sm"
                      className="gap-1"
                      onClick={handleBookmark}
                    >
                      <Bookmark className={`h-4 w-4 ${hasBookmarked ? "fill-primary-foreground" : ""}`} />
                      <span>{bookmarkCount}</span>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 回复列表 */}
          <div className="mb-6">
            <h2 className="mb-4 text-xl font-bold flex items-center">
              <MessageSquare className="mr-2 h-5 w-5 text-primary" />
              回复 ({replies.length})
            </h2>
            <div className="space-y-4">
              {replies.map((reply) => {
                const replyLike = replyLikes.find((r) => r.id === reply.id)
                return (
                  <Card
                    key={reply.id}
                    className={`overflow-hidden ${reply.isHighlighted ? "border-primary/30 bg-primary/5" : ""}`}
                  >
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        {/* 作者信息 - 侧边栏 */}
                        <div className="border-b p-4 md:border-b-0 md:border-r md:w-48 md:shrink-0">
                          <div className="flex flex-row items-center gap-4 md:flex-col md:items-center md:text-center">
                            <div className="relative">
                              <Avatar className="h-10 w-10 md:h-16 md:w-16">
                                <AvatarImage src={reply.author.avatar} alt={reply.author.name} />
                                <AvatarFallback>{reply.author.name[0]}</AvatarFallback>
                              </Avatar>
                              {reply.author.isOnline && (
                                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-background"></span>
                              )}
                            </div>
                            <div className="md:mt-2">
                              <div className="font-semibold">{reply.author.name}</div>
                              <div className="text-xs text-muted-foreground">加入于 {reply.author.joinDate}</div>
                              <div className="text-xs text-muted-foreground">{reply.author.posts} 帖子</div>
                              <div className="mt-2 flex flex-wrap justify-center gap-1">
                                {reply.author.badges.map((badge, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {badge}
                                  </Badge>
                                ))}
                              </div>
                              <div className="mt-3">
                                <div className="text-xs font-medium">声望</div>
                                <div className="flex items-center gap-2">
                                  <Progress value={65} className="h-2" />
                                  <span className="text-xs font-medium">{reply.author.reputation}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* 回复内容 */}
                        <div className="flex-1 p-6">
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-xs text-muted-foreground">{reply.createdAt}</div>
                            <Badge variant="outline" className="text-xs">
                              #{reply.id}
                            </Badge>
                          </div>
                          <p className="mb-4">{reply.content}</p>

                          <div className="flex flex-wrap items-center justify-between gap-y-2">
                            <div className="flex gap-2">
                              <Button
                                variant={replyLike?.hasLiked ? "default" : "ghost"}
                                size="sm"
                                className="gap-1"
                                onClick={() => handleReplyLike(reply.id)}
                              >
                                <ThumbsUp className="h-4 w-4" />
                                <span>{replyLike?.likes || reply.likes}</span>
                              </Button>
                              <Button variant="ghost" size="sm" className="gap-1">
                                <ThumbsDown className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm" className="gap-1">
                                <Quote className="h-4 w-4" />
                                <span>引用</span>
                              </Button>
                              <Button variant="ghost" size="sm" className="gap-1">
                                <Reply className="h-4 w-4" />
                                <span>回复</span>
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    更多
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem className="gap-2">
                                    <Flag className="h-4 w-4" />
                                    <span>举报</span>
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* 回复表单 */}
          <Card>
            <CardHeader className="border-b">
              <h3 className="text-lg font-semibold">发表回复</h3>
            </CardHeader>
            <CardContent className="p-6">
              <Tabs defaultValue="write" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4 grid w-full grid-cols-2">
                  <TabsTrigger value="write">编写</TabsTrigger>
                  <TabsTrigger value="preview">预览</TabsTrigger>
                </TabsList>

                <TabsContent value="write">
                  <Textarea
                    placeholder="输入您的回复..."
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    className="min-h-[150px]"
                  />
                </TabsContent>

                <TabsContent value="preview">
                  <div
                    className="min-h-[150px] w-full rounded-md border border-input bg-background p-4 prose prose-sm max-w-none dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: previewContent }}
                  />
                </TabsContent>
              </Tabs>
              <p className="mt-2 text-xs text-muted-foreground">支持Markdown格式，可以使用代码块、列表、链接等</p>
            </CardContent>
            <CardFooter className="flex justify-between border-t px-6 py-4">
              <Button variant="outline" type="button">
                取消
              </Button>
              <Button
                onClick={handleSubmitReply}
                disabled={isSubmitting || !replyContent.trim()}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isSubmitting ? "提交中..." : "提交回复"}
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* 右侧边栏 */}
        <div className="md:col-span-1">
          <div className="sticky top-20 space-y-6">
            {/* 相关主题 */}
            <Card>
              <CardHeader className="pb-2">
                <h3 className="text-sm font-semibold">相关主题</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                {topicData.relatedTopics.map((topic) => (
                  <Link key={topic.id} href={`/forum/topic/${topic.id}`}>
                    <div className="group flex items-start gap-2 rounded-md p-2 transition-colors hover:bg-muted/50">
                      <MessageSquare className="mt-0.5 h-4 w-4 text-muted-foreground" />
                      <div>
                        <h4 className="text-sm font-medium group-hover:text-primary line-clamp-2">{topic.title}</h4>
                        <p className="text-xs text-muted-foreground">{topic.replies} 回复</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>

            {/* 统计信息 */}
            <Card>
              <CardHeader className="pb-2">
                <h3 className="text-sm font-semibold">主题统计</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">浏览</span>
                  <span className="font-medium">{topicData.views}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">回复</span>
                  <span className="font-medium">{topicData.replies}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">点赞</span>
                  <span className="font-medium">{likeCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">收藏</span>
                  <span className="font-medium">{bookmarkCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">创建于</span>
                  <span className="text-sm">{topicData.createdAt}</span>
                </div>
              </CardContent>
            </Card>

            {/* 快捷操作 */}
            <Card>
              <CardHeader className="pb-2">
                <h3 className="text-sm font-semibold">快捷操作</h3>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                  <Award className="h-4 w-4" />
                  <span>标记为最佳回答</span>
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                  <Flag className="h-4 w-4" />
                  <span>举报主题</span>
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                  <Share2 className="h-4 w-4" />
                  <span>分享主题</span>
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                  <Bookmark className="h-4 w-4" />
                  <span>收藏主题</span>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

