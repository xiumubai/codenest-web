"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ThumbsUp, ThumbsDown, Check, MoreHorizontal } from "lucide-react"

// 模拟回答数据
const answersData = [
  {
    id: 1,
    content: `
      <p>在Next.js中，服务端数据获取有几种方式，主要是getServerSideProps和getStaticProps。你遇到的问题很可能是CORS相关的。</p>
      
      <p>首先，让我解释一下为什么你可能没有CORS问题：当使用getServerSideProps时，数据获取发生在服务器上，而不是浏览器中。服务器到服务器的请求通常不受CORS限制。</p>
      
      <p>你的问题可能是由于其他原因，例如：</p>
      
      <ol>
        <li>API端点可能需要特定的头信息</li>
        <li>你的服务器可能无法访问外部网络</li>
        <li>API可能有速率限制</li>
      </ol>
      
      <p>尝试添加更多错误处理来获取更详细的错误信息：</p>
      
      <pre><code>
      export async function getServerSideProps() {
        try {
          const res = await fetch('https://api.example.com/data')
          if (!res.ok) {
            throw new Error(\`Failed to fetch data: \${res.status}\`)
          }
          const data = await res.json()
          
          return {
            props: { data }
          }
        } catch (error) {
          console.error('Error fetching data:', error)
          return {
            props: { 
              data: null,
              error: error.message
            }
          }
        }
      }
      </code></pre>
      
      <p>关于getServerSideProps和getStaticProps的区别：</p>
      
      <ul>
        <li><strong>getServerSideProps</strong>: 在每次请求时在服务器上运行，适用于需要最新数据或基于用户特定信息的页面。</li>
        <li><strong>getStaticProps</strong>: 在构建时运行，生成静态HTML，适用于可以预先渲染且不需要频繁更新的页面。</li>
      </ul>
      
      <p>希望这能帮到你！</p>
    `,
    isAccepted: true,
    votes: 23,
    createdAt: "2023-06-15T14:20:00Z",
    author: {
      name: "李四",
      avatar: "/placeholder.svg?height=40&width=40",
      reputation: 3450,
    },
  },
  {
    id: 2,
    content: `
      <p>补充一下上面的回答，如果你确实遇到了CORS问题，有几种解决方案：</p>
      
      <h3>1. 使用Next.js API路由作为代理</h3>
      
      <p>创建一个API路由文件，例如pages/api/proxy.js：</p>
      
      <pre><code>
      export default async function handler(req, res) {
        const response = await fetch('https://api.example.com/data')
        const data = await response.json()
        res.status(200).json(data)
      }
      </code></pre>
      
      <p>然后在你的getServerSideProps中使用这个代理：</p>
      
      <pre><code>
      export async function getServerSideProps() {
        const res = await fetch('http://localhost:3000/api/proxy')
        const data = await res.json()
        
        return {
          props: { data }
        }
      }
      </code></pre>
      
      <p>这样可以避免CORS问题，因为API请求是从你的服务器发出的。</p>
    `,
    isAccepted: false,
    votes: 12,
    createdAt: "2023-06-15T16:45:00Z",
    author: {
      name: "王五",
      avatar: "/placeholder.svg?height=40&width=40",
      reputation: 2180,
    },
  },
]

export function AnswersList({ questionId }: { questionId: string }) {
  const [answers, setAnswers] = useState(answersData)

  const handleVote = (answerId: number, type: "up" | "down") => {
    setAnswers(
      answers.map((answer) => {
        if (answer.id === answerId) {
          return {
            ...answer,
            votes: type === "up" ? answer.votes + 1 : answer.votes - 1,
          }
        }
        return answer
      }),
    )
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
    <div className="mb-8">
      <h2 className="mb-6 text-2xl font-bold">{answers.length} 个回答</h2>

      <div className="space-y-6">
        {answers.map((answer) => (
          <Card key={answer.id} className={`overflow-hidden ${answer.isAccepted ? "border-green-500" : ""}`}>
            <CardContent className="p-0">
              <div className="flex">
                {/* 投票区域 */}
                <div className="flex flex-col items-center gap-2 border-r p-6">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    onClick={() => handleVote(answer.id, "up")}
                  >
                    <ThumbsUp className="h-5 w-5" />
                  </Button>
                  <span className="text-xl font-bold">{answer.votes}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    onClick={() => handleVote(answer.id, "down")}
                  >
                    <ThumbsDown className="h-5 w-5" />
                  </Button>
                  {answer.isAccepted && (
                    <div className="mt-2 rounded-full bg-green-500 p-1 text-white">
                      <Check className="h-5 w-5" />
                    </div>
                  )}
                </div>

                {/* 回答内容 */}
                <div className="flex-1 p-6">
                  <div
                    className="prose prose-lg max-w-none dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: answer.content }}
                  />

                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={answer.author.avatar} alt={answer.author.name} />
                        <AvatarFallback>{answer.author.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="font-medium">{answer.author.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {answer.author.reputation} 声望
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground">回答于 {formatDate(answer.createdAt)}</div>
                      </div>
                    </div>

                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

