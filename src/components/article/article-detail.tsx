"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, MessageSquare, Share2, Bookmark, Copy } from "lucide-react"

// 模拟文章数据
const getArticleById = (id: string) => {
  return {
    id: Number.parseInt(id),
    title: "如何提高编程效率：10个实用技巧",
    content: `
      <p>在当今快节奏的软件开发环境中，提高编程效率不仅可以帮助您更快地完成工作，还可以减少错误并提高代码质量。本文将分享10个实用技巧，帮助您成为更高效的程序员。</p>
      
      <h2 id="master-ide">1. 掌握您的IDE</h2>
      <p>无论您使用的是VS Code、IntelliJ IDEA还是其他IDE，深入了解其快捷键和功能可以显著提高您的工作效率。花时间学习代码补全、重构工具和导航快捷键。</p>
      
      <h2 id="code-snippets">2. 使用代码片段</h2>
      <p>为常用的代码模式创建代码片段，可以减少重复输入。大多数IDE都支持自定义代码片段，这可以为您节省大量时间。</p>
      
      <h2 id="automate-tasks">3. 自动化重复任务</h2>
      <p>识别您日常工作中的重复任务，并尝试自动化它们。这可能包括使用脚本进行文件处理、自动化测试或部署过程。</p>
      
      <h2 id="regex">4. 学习正则表达式</h2>
      <p>正则表达式是处理文本的强大工具。掌握正则表达式可以帮助您更有效地进行搜索和替换操作。</p>
      
      <h2 id="version-control">5. 使用版本控制</h2>
      <p>熟练使用Git等版本控制系统可以帮助您跟踪更改、协作和恢复错误。学习分支、合并和解决冲突的技巧。</p>
      
      <h2 id="tdd">6. 采用测试驱动开发</h2>
      <p>测试驱动开发（TDD）可以帮助您编写更清晰、更可维护的代码。通过先编写测试，然后编写满足这些测试的代码，可以减少bug和重构时间。</p>
      
      <h2 id="keyboard">7. 使用键盘而非鼠标</h2>
      <p>尽可能使用键盘快捷键而不是鼠标。这看似微小的改变可以随着时间的推移节省大量时间。</p>
      
      <h2 id="clean-code">8. 保持代码整洁</h2>
      <p>遵循一致的代码风格和最佳实践。整洁的代码更容易理解和维护，从长远来看可以节省时间。</p>
      
      <h2 id="continuous-learning">9. 持续学习</h2>
      <p>技术领域不断发展，持续学习新工具和技术可以帮助您保持高效。订阅相关博客、参加研讨会和阅读技术书籍。</p>
      
      <h2 id="rest">10. 休息和自我照顾</h2>
      <p>最后但同样重要的是，确保充分休息和自我照顾。疲劳会降低生产力和创造力。定期休息、保持健康的生活方式可以帮助您保持高效。</p>
      
      <p>通过实施这些技巧，您可以显著提高编程效率，减少挫折感，并在工作中获得更多满足感。记住，提高效率是一个持续的过程，需要时间和实践。</p>
    `,
    category: "编程技巧",
    author: {
      name: "张三",
      avatar: "/placeholder.svg?height=100&width=100",
      bio: "资深软件工程师，拥有10年开发经验，热爱分享技术知识。",
    },
    date: "2023-05-15",
    readTime: "8 分钟",
    image: "/placeholder.svg?height=600&width=1200",
    tags: ["编程效率", "开发技巧", "软件工程", "最佳实践"],
    likes: 128,
    comments: 32,
    shares: 45,
  }
}

// 提取标题
const extractHeadings = (content: string) => {
  const headingRegex = /<h2 id="([^"]+)">(.+?)<\/h2>/g
  const headings = []
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    headings.push({
      id: match[1],
      title: match[2].replace(/^\d+\.\s+/, ""), // 移除数字前缀
    })
  }

  return headings
}

export function ArticleDetail({ id }: { id: string }) {
  const article = getArticleById(id)
  const headings = extractHeadings(article.content)
  const [progress, setProgress] = useState(0)
  const [activeHeading, setActiveHeading] = useState("")

  // 处理滚动事件，更新阅读进度
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight
      const currentProgress = (window.scrollY / totalHeight) * 100
      setProgress(currentProgress)

      // 更新当前活动标题
      const headingElements = document.querySelectorAll("h2[id]")
      for (let i = headingElements.length - 1; i >= 0; i--) {
        const element = headingElements[i]
        const rect = element.getBoundingClientRect()
        if (rect.top <= 100) {
          setActiveHeading(element.id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // 复制链接功能
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    alert("链接已复制到剪贴板")
  }

  return (
    <div className="relative">
      {/* 阅读进度条 */}
      <div className="fixed top-0 left-0 z-50 h-1 bg-primary" style={{ width: `${progress}%` }}></div>

      {/* 文章内容 */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
        {/* 侧边栏目录 */}
        <div className="hidden md:col-span-3 md:block">
          <div className="sticky top-20 space-y-6">
            <div className="rounded-lg border p-4">
              <h4 className="mb-3 text-sm font-semibold uppercase text-muted-foreground">目录</h4>
              <nav className="space-y-1">
                {headings.map((heading) => (
                  <a
                    key={heading.id}
                    href={`#${heading.id}`}
                    className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                      activeHeading === heading.id ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted"
                    }`}
                  >
                    {heading.title}
                  </a>
                ))}
              </nav>
            </div>

            <div className="flex flex-col gap-2">
              <Button variant="outline" size="sm" className="justify-start gap-2" onClick={copyLink}>
                <Copy className="h-4 w-4" />
                复制链接
              </Button>
              <Button variant="outline" size="sm" className="justify-start gap-2">
                <Heart className="h-4 w-4" />
                喜欢 ({article.likes})
              </Button>
              <Button variant="outline" size="sm" className="justify-start gap-2">
                <Bookmark className="h-4 w-4" />
                收藏
              </Button>
              <Button variant="outline" size="sm" className="justify-start gap-2">
                <Share2 className="h-4 w-4" />
                分享
              </Button>
            </div>
          </div>
        </div>

        {/* 主要内容 */}
        <article className="md:col-span-9">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs font-normal">
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{article.title}</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <Image
                    src={article.author.avatar || "/placeholder.svg"}
                    alt={article.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium">{article.author.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {article.date} · {article.readTime}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative my-8 h-[300px] w-full overflow-hidden rounded-lg md:h-[400px]">
            <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
          </div>

          <div
            className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-semibold prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* 移动端操作栏 */}
          <div className="mt-8 flex items-center justify-between rounded-lg border p-4 md:hidden">
            <div className="flex gap-4">
              <Button variant="ghost" size="sm" className="flex items-center gap-1 p-2">
                <Heart className="h-5 w-5" />
                <span>{article.likes}</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-1 p-2">
                <MessageSquare className="h-5 w-5" />
                <span>{article.comments}</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-1 p-2">
                <Share2 className="h-5 w-5" />
                <span>{article.shares}</span>
              </Button>
            </div>
            <Button variant="outline" size="sm" className="flex items-center gap-1 p-2">
              <Bookmark className="h-5 w-5" />
            </Button>
          </div>
        </article>
      </div>
    </div>
  )
}

