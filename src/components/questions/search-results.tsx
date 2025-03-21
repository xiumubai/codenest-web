"use client"

import { useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, ThumbsUp, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// 模拟搜索结果数据
const searchQuestions = (query: string) => [
  {
    id: 1,
    title: "如何在Next.js中实现服务端渲染的数据获取？",
    content: "我正在使用Next.js构建一个应用，需要在服务端获取数据。我尝试了getServerSideProps，但遇到了一些问题...",
    tags: ["Next.js", "React", "SSR", "数据获取"],
    author: {
      name: "李四",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    createdAt: "2023-06-15",
    votes: 12,
    answers: 3,
    views: 156,
    solved: true,
  },
  {
    id: 3,
    title: "如何优化React应用的性能？",
    content: "我的React应用在处理大量数据时性能下降明显。我已经尝试了使用React.memo和useCallback，但效果不明显...",
    tags: ["React", "性能优化", "JavaScript"],
    author: {
      name: "赵六",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    createdAt: "2023-06-12",
    votes: 15,
    answers: 5,
    views: 230,
    solved: true,
  },
  {
    id: 6,
    title: "React中的Context API与Redux有什么区别？",
    content: "我正在考虑在我的React应用中使用状态管理解决方案。我了解到React内置了Context API，但也有人推荐Redux...",
    tags: ["React", "Redux", "Context API", "状态管理"],
    author: {
      name: "孙八",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    createdAt: "2023-06-08",
    votes: 9,
    answers: 4,
    views: 185,
    solved: false,
  },
]

export function SearchResults({ query }: { query: string }) {
  const [sortBy, setSortBy] = useState("relevance")
  const [currentPage, setCurrentPage] = useState(1)
  const questionsPerPage = 5

  // 获取搜索结果
  const searchResults = searchQuestions(query)

  // 根据排序方式对问题进行排序
  const sortedResults = [...searchResults].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    } else if (sortBy === "votes") {
      return b.votes - a.votes
    } else if (sortBy === "answers") {
      return b.answers - a.answers
    }
    // 默认按相关性排序（这里简化处理）
    return 0
  })

  // 分页
  const indexOfLastQuestion = currentPage * questionsPerPage
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage
  const currentQuestions = sortedResults.slice(indexOfFirstQuestion, indexOfLastQuestion)
  const totalPages = Math.ceil(sortedResults.length / questionsPerPage)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">找到 {searchResults.length} 个结果</div>
        <div className="flex items-center gap-2">
          <span className="text-sm">排序：</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="排序方式" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">相关性</SelectItem>
              <SelectItem value="newest">最新</SelectItem>
              <SelectItem value="votes">投票最多</SelectItem>
              <SelectItem value="answers">回答最多</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        {currentQuestions.map((question) => (
          <div
            key={question.id}
            className="group relative rounded-lg border bg-card p-6 transition-all hover:shadow-md"
          >
            {question.solved && <div className="absolute -left-1 top-0 bottom-0 w-1 bg-green-500"></div>}
            <div className="mb-2 flex flex-wrap gap-2">
              {question.tags.map((tag) => (
                <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`}>
                  <Badge variant="outline" className="text-xs font-normal">
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>
            <Link href={`/questions/${question.id}`}>
              <h3 className="mb-2 text-xl font-semibold group-hover:text-primary">{question.title}</h3>
            </Link>
            <p className="mb-4 line-clamp-2 text-muted-foreground">{question.content}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={question.author.avatar} alt={question.author.name} />
                  <AvatarFallback>{question.author.name[0]}</AvatarFallback>
                </Avatar>
                <span className="text-sm">
                  <span className="font-medium">{question.author.name}</span>
                  <span className="text-muted-foreground"> 提问于 {question.createdAt}</span>
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{question.votes}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MessageSquare className="h-4 w-4" />
                  <span>{question.answers}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Eye className="h-4 w-4" />
                  <span>{question.views}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
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
      )}
    </div>
  )
}

