"use client"

import { useState } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MessageSquare, Eye, Clock } from "lucide-react"

// 模拟问题数据
const questions = [
  {
    id: 1,
    title: "如何在Next.js中实现服务端渲染的数据获取？",
    content: "我正在使用Next.js构建一个应用，需要在服务端获取数据。我尝试了getServerSideProps，但遇到了一些问题...",
    tags: ["Next.js", "React", "SSR"],
    votes: 15,
    answers: 3,
    views: 128,
    status: "已解决",
    createdAt: "2023-06-15T10:30:00Z",
    author: {
      name: "张三",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: 2,
    title: "TypeScript中如何正确使用泛型？",
    content: "我在使用TypeScript时遇到了一些关于泛型的问题。特别是在处理复杂类型时，不确定如何正确定义和使用泛型...",
    tags: ["TypeScript", "泛型", "编程"],
    votes: 8,
    answers: 2,
    views: 95,
    status: "未解决",
    createdAt: "2023-06-14T14:20:00Z",
    author: {
      name: "李四",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: 3,
    title: "React中如何优化大型列表的渲染性能？",
    content: "我的应用需要渲染一个包含数千项的列表，但性能很差。我已经尝试了React.memo，但效果不明显...",
    tags: ["React", "性能优化", "前端"],
    votes: 23,
    answers: 5,
    views: 210,
    status: "已解决",
    createdAt: "2023-06-13T09:15:00Z",
    author: {
      name: "王五",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: 4,
    title: "如何在Docker中配置Node.js应用的环境变量？",
    content: "我正在尝试将Node.js应用容器化，但不确定如何正确设置和访问环境变量...",
    tags: ["Docker", "Node.js", "DevOps"],
    votes: 11,
    answers: 4,
    views: 142,
    status: "未解决",
    createdAt: "2023-06-12T16:45:00Z",
    author: {
      name: "赵六",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: 5,
    title: "使用Tailwind CSS如何创建响应式导航栏？",
    content: "我正在使用Tailwind CSS构建一个网站，需要创建一个在移动设备上折叠为汉堡菜单的响应式导航栏...",
    tags: ["Tailwind CSS", "响应式设计", "CSS"],
    votes: 19,
    answers: 6,
    views: 187,
    status: "已解决",
    createdAt: "2023-06-11T11:30:00Z",
    author: {
      name: "钱七",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
]

// 格式化日期函数
function formatDate(dateString: string) {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) {
    return "今天"
  } else if (diffDays === 1) {
    return "昨天"
  } else if (diffDays < 7) {
    return `${diffDays}天前`
  } else if (diffDays < 30) {
    return `${Math.floor(diffDays / 7)}周前`
  } else if (diffDays < 365) {
    return `${Math.floor(diffDays / 30)}个月前`
  } else {
    return `${Math.floor(diffDays / 365)}年前`
  }
}

export function QuestionsList() {
  const [currentPage, setCurrentPage] = useState(1)
  const questionsPerPage = 5

  // 分页逻辑
  const indexOfLastQuestion = currentPage * questionsPerPage
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage
  const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion)
  const totalPages = Math.ceil(questions.length / questionsPerPage)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  return (
    <div className="mt-6 space-y-6">
      {currentQuestions.map((question) => (
        <Card key={question.id} className="overflow-hidden transition-all hover:shadow-md">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              {/* 投票计数 */}
              <div className="flex flex-row md:flex-col items-center justify-center gap-6 md:gap-2 p-4 md:w-20 bg-muted/30 md:border-r">
                <div className="text-center">
                  <div className="text-xl font-bold text-primary">{question.votes}</div>
                  <div className="text-xs text-muted-foreground">投票</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold">{question.answers}</div>
                  <div className="text-xs text-muted-foreground">回答</div>
                </div>
                <div className="text-center md:hidden">
                  <div className="text-xl font-bold">{question.views}</div>
                  <div className="text-xs text-muted-foreground">浏览</div>
                </div>
              </div>

              {/* 问题内容 */}
              <div className="flex-1 p-6">
                <div className="mb-2 flex items-center gap-2">
                  <Badge
                    variant={question.status === "已解决" ? "default" : "outline"}
                    className={question.status === "已解决" ? "bg-green-500 hover:bg-green-500/80" : ""}
                  >
                    {question.status}
                  </Badge>
                  <div className="hidden md:flex items-center gap-1 text-sm text-muted-foreground">
                    <Eye className="h-4 w-4" />
                    <span>{question.views} 浏览</span>
                  </div>
                </div>

                <Link href={`/questions/${question.id}`}>
                  <h3 className="mb-2 text-xl font-semibold hover:text-primary">{question.title}</h3>
                </Link>

                <p className="mb-4 line-clamp-2 text-muted-foreground">{question.content}</p>

                <div className="mb-4 flex flex-wrap gap-2">
                  {question.tags.map((tag, index) => (
                    <Link href={`/questions/tag/${tag}`} key={index}>
                      <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                        {tag}
                      </Badge>
                    </Link>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={question.author.avatar} alt={question.author.name} />
                      <AvatarFallback>{question.author.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{question.author.name}</span>
                    <span className="text-sm text-muted-foreground">提问于</span>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatDate(question.createdAt)}
                    </span>
                  </div>

                  <Link href={`/questions/${question.id}`}>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <MessageSquare className="h-4 w-4" />
                      回答
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* 分页 */}
      <div className="mt-6 flex justify-center">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            上一页
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => handlePageChange(page)}
            >
              {page}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            下一页
          </Button>
        </div>
      </div>
    </div>
  )
}

