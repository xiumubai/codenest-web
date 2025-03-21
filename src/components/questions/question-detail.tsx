"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ThumbsUp, ThumbsDown, Share2, Bookmark, Flag } from "lucide-react"
import Link from "next/link"

// 模拟问题数据获取函数
const getQuestionById = (id: string) => {
  return {
    id: Number.parseInt(id),
    title: "如何在Next.js中实现服务端渲染的数据获取？",
    content: `
      <p>我正在使用Next.js构建一个应用，需要在服务端获取数据。我尝试了getServerSideProps，但遇到了一些问题。</p>
      
      <p>具体来说，我的代码如下：</p>
      
      <pre><code>
      export async function getServerSideProps() {
        const res = await fetch('https://api.example.com/data')
        const data = await res.json()
        
        return {
          props: { data }
        }
      }
      </code></pre>
      
      <p>但是当我尝试访问页面时，得到了以下错误：</p>
      
      <pre><code>
      Error: Failed to fetch data
      </code></pre>
      
      <p>我已经确认API端点是可访问的，因为我可以在浏览器中直接访问它。我怀疑可能是CORS问题，但不确定如何解决。</p>
      
      <p>有没有人能解释一下在Next.js中正确实现服务端数据获取的方法？特别是如何处理可能的CORS问题？</p>
      
      <p>另外，我还想了解getServerSideProps和getStaticProps之间的区别，以及何时应该使用其中一个而不是另一个？</p>
      
      <p>感谢任何帮助！</p>
    `,
    tags: ["Next.js", "React", "SSR"],
    votes: 15,
    answers: 3,
    views: 128,
    status: "已解决",
    createdAt: "2023-06-15T10:30:00Z",
    author: {
      name: "张三",
      avatar: "/placeholder.svg?height=40&width=40",
      reputation: 1250,
    },
  }
}

export function QuestionDetail({ id }: { id: string }) {
  const question = getQuestionById(id)
  const [voteCount, setVoteCount] = useState(question.votes)
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null)
  const [isBookmarked, setIsBookmarked] = useState(false)

  const handleVote = (type: "up" | "down") => {
    if (userVote === type) {
      // 取消投票
      setUserVote(null)
      setVoteCount(type === "up" ? voteCount - 1 : voteCount + 1)
    } else {
      // 新投票或改变投票
      const voteChange = userVote ? 2 : 1
      setUserVote(type)
      setVoteCount(type === "up" ? voteCount + voteChange : voteCount - voteChange)
    }
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  // 格式化日期
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
    return new Date(dateString).toLocaleDateString("zh-CN", options)
  }

  return (
    <Card className="mb-8 overflow-hidden">
      <CardContent className="p-0">
        <div className="border-b p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge
                variant={question.status === "已解决" ? "default" : "outline"}
                className={question.status === "已解决" ? "bg-green-500 hover:bg-green-500/80" : ""}
              >
                {question.status}
              </Badge>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <span>{question.views} 浏览</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="gap-1" onClick={handleBookmark}>
                <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-primary text-primary" : ""}`} />
                {isBookmarked ? "已收藏" : "收藏"}
              </Button>
              <Button variant="ghost" size="sm" className="gap-1">
                <Share2 className="h-4 w-4" />
                分享
              </Button>
              <Button variant="ghost" size="sm" className="gap-1">
                <Flag className="h-4 w-4" />
                举报
              </Button>
            </div>
          </div>

          <h1 className="mb-4 text-2xl font-bold md:text-3xl">{question.title}</h1>

          <div className="mb-4 flex flex-wrap gap-2">
            {question.tags.map((tag, index) => (
              <Link href={`/questions/tag/${tag}`} key={index}>
                <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={question.author.avatar} alt={question.author.name} />
              <AvatarFallback>{question.author.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-medium">{question.author.name}</span>
                <Badge variant="outline" className="text-xs">
                  {question.author.reputation} 声望
                </Badge>
              </div>
              <div className="text-xs text-muted-foreground">提问于 {formatDate(question.createdAt)}</div>
            </div>
          </div>
        </div>

        <div className="flex">
          {/* 投票区域 */}
          <div className="flex flex-col items-center gap-2 border-r p-6">
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-full ${userVote === "up" ? "bg-primary/10 text-primary" : ""}`}
              onClick={() => handleVote("up")}
            >
              <ThumbsUp className="h-5 w-5" />
            </Button>
            <span className="text-xl font-bold">{voteCount}</span>
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-full ${userVote === "down" ? "bg-destructive/10 text-destructive" : ""}`}
              onClick={() => handleVote("down")}
            >
              <ThumbsDown className="h-5 w-5" />
            </Button>
          </div>

          {/* 问题内容 */}
          <div className="flex-1 p-6">
            <div
              className="prose prose-lg max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: question.content }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

