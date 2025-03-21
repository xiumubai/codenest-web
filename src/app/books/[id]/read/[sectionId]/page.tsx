"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Menu,
  X,
  CheckCircle,
  Clock,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Share2,
  Bookmark,
  Home,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

// 模拟小册数据
const bookData = {
  id: 1,
  title: "React 进阶实战指南",
  cover: "/placeholder.svg?height=400&width=300",
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
}

// 模拟当前章节内容
const sectionContent = `
  <h1>React 核心概念</h1>
  
  <p>React 是一个用于构建用户界面的 JavaScript 库，它使用组件化的方式来构建可复用的 UI 组件。在本章中，我们将深入探讨 React 的核心概念，包括组件、JSX、Props、State 等。</p>
  
  <h2>1. 组件</h2>
  
  <p>组件是 React 应用的基础构建块。一个组件可以是一个按钮、一个表单、一个对话框，甚至是整个页面。React 组件可以分为两种类型：函数组件和类组件。</p>
  
  <h3>函数组件</h3>
  
  <p>函数组件是最简单的 React 组件形式，它是一个接收 props 对象并返回 React 元素的 JavaScript 函数。</p>
  
  <pre><code>
  function Welcome(props) {
    return &lt;h1&gt;Hello, {props.name}&lt;/h1&gt;;
  }
  </code></pre>
  
  <h3>类组件</h3>
  
  <p>类组件是使用 ES6 类语法定义的组件，它继承自 React.Component 类。</p>
  
  <pre><code>
  class Welcome extends React.Component {
    render() {
      return &lt;h1&gt;Hello, {this.props.name}&lt;/h1&gt;;
    }
  }
  </code></pre>
  
  <h2>2. JSX</h2>
  
  <p>JSX 是 JavaScript 的语法扩展，它允许你在 JavaScript 中编写类似 HTML 的代码。JSX 使得 React 组件的结构更加清晰易读。</p>
  
  <pre><code>
  const element = &lt;h1&gt;Hello, world!&lt;/h1&gt;;
  </code></pre>
  
  <p>JSX 在编译时会被转换为 React.createElement() 调用，上面的代码等同于：</p>
  
  <pre><code>
  const element = React.createElement(
    'h1',
    null,
    'Hello, world!'
  );
  </code></pre>
  
  <h2>3. Props</h2>
  
  <p>Props（属性）是从父组件传递给子组件的数据。Props 是只读的，子组件不能修改它们。</p>
  
  <pre><code>
  function Welcome(props) {
    return &lt;h1&gt;Hello, {props.name}&lt;/h1&gt;;
  }
  
  // 使用组件并传递 props
  const element = &lt;Welcome name="Sara" /&gt;;
  </code></pre>
  
  <h2>4. State</h2>
  
  <p>State（状态）是组件内部管理的数据，与 props 不同，state 是可变的。当 state 发生变化时，组件会重新渲染。</p>
  
  <pre><code>
  class Clock extends React.Component {
    constructor(props) {
      super(props);
      this.state = {date: new Date()};
    }
    
    componentDidMount() {
      this.timerID = setInterval(
        () => this.tick(),
        1000
      );
    }
    
    componentWillUnmount() {
      clearInterval(this.timerID);
    }
    
    tick() {
      this.setState({
        date: new Date()
      });
    }
    
    render() {
      return (
        &lt;div&gt;
          &lt;h1&gt;Hello, world!&lt;/h1&gt;
          &lt;h2&gt;It is {this.state.date.toLocaleTimeString()}.&lt;/h2&gt;
        &lt;/div&gt;
      );
    }
  }
  </code></pre>
  
  <h2>5. 生命周期</h2>
  
  <p>React 组件有多个生命周期方法，它们在组件的不同阶段被调用。以下是一些常用的生命周期方法：</p>
  
  <ul>
    <li><strong>componentDidMount</strong>：组件挂载后调用</li>
    <li><strong>componentDidUpdate</strong>：组件更新后调用</li>
    <li><strong>componentWillUnmount</strong>：组件卸载前调用</li>
  </ul>
  
  <p>在 React 16.3 之后，引入了新的生命周期方法，如 getDerivedStateFromProps 和 getSnapshotBeforeUpdate。</p>
  
  <h2>6. 事件处理</h2>
  
  <p>React 事件使用驼峰命名法（如 onClick 而不是 onclick），并且传递的是函数而不是字符串。</p>
  
  <pre><code>
  function ActionLink() {
    function handleClick(e) {
      e.preventDefault();
      console.log('The link was clicked.');
    }
    
    return (
      &lt;a href="#" onClick={handleClick}&gt;
        Click me
      &lt;/a&gt;
    );
  }
  </code></pre>
  
  <h2>总结</h2>
  
  <p>在本章中，我们介绍了 React 的核心概念，包括组件、JSX、Props、State、生命周期和事件处理。这些概念是理解和使用 React 的基础，在后续章节中，我们将深入探讨更多高级特性和最佳实践。</p>
`

// 获取所有小节的平铺数组
const getAllSections = () => {
  return bookData.chapters.reduce((acc, chapter) => {
    return [...acc, ...chapter.sections]
  }, [])
}

// 查找当前小节
const findCurrentSection = (sectionId: string) => {
  const allSections = getAllSections()
  return allSections.find((section) => section.id === Number.parseInt(sectionId))
}

// 查找当前小节所在的章节
const findCurrentChapter = (sectionId: string) => {
  const sectionIdNum = Number.parseInt(sectionId)
  return bookData.chapters.find((chapter) => chapter.sections.some((section) => section.id === sectionIdNum))
}

// 查找上一个和下一个小节
const findAdjacentSections = (sectionId: string) => {
  const allSections = getAllSections()
  const currentIndex = allSections.findIndex((section) => section.id === Number.parseInt(sectionId))

  return {
    prev: currentIndex > 0 ? allSections[currentIndex - 1] : null,
    next: currentIndex < allSections.length - 1 ? allSections[currentIndex + 1] : null,
  }
}

export default function BookReadPage({ params }: { params: { id: string; sectionId: string } }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isBookmarked, setIsBookmarked] = useState(false)

  const currentSection = findCurrentSection(params.sectionId)
  const currentChapter = findCurrentChapter(params.sectionId)
  const { prev, next } = findAdjacentSections(params.sectionId)

  // 计算阅读进度
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight
      const winHeight = window.innerHeight
      const scrollPercent = scrollTop / (docHeight - winHeight)
      setProgress(scrollPercent * 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!currentSection || !currentChapter) {
    return <div>小节不存在</div>
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* 顶部导航栏 */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <Link href={`/books/${params.id}`} className="flex items-center gap-2">
              <ChevronLeft className="h-4 w-4" />
              <span className="font-medium">返回小册</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={isBookmarked ? "default" : "outline"}
              size="sm"
              className="gap-1"
              onClick={() => setIsBookmarked(!isBookmarked)}
            >
              <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-primary-foreground" : ""}`} />
              <span className="hidden sm:inline">{isBookmarked ? "已收藏" : "收藏"}</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline">分享</span>
            </Button>
          </div>
        </div>
        {/* 阅读进度条 */}
        <Progress value={progress} className="h-1" />
      </header>

      {/* 侧边栏 */}
      <div
        className={`fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-opacity ${sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <div
          className={`fixed inset-y-0 left-0 z-50 w-80 bg-background shadow-lg transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex h-14 items-center justify-between border-b px-4">
            <Link href={`/books/${params.id}`} className="flex items-center gap-2">
              <Image
                src={bookData.cover || "/placeholder.svg"}
                alt={bookData.title}
                width={24}
                height={32}
                className="rounded"
              />
              <span className="font-medium truncate">{bookData.title}</span>
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <ScrollArea className="h-[calc(100vh-3.5rem)] p-4">
            <div className="space-y-6">
              {bookData.chapters.map((chapter, chapterIndex) => (
                <div key={chapter.id}>
                  <h3 className="text-sm font-semibold mb-2">
                    {chapterIndex + 1}. {chapter.title}
                  </h3>
                  <div className="space-y-1">
                    {chapter.sections.map((section, sectionIndex) => (
                      <Link
                        key={section.id}
                        href={`/books/${params.id}/read/${section.id}`}
                        className={`flex items-center justify-between py-1.5 px-2 rounded-md text-sm ${section.id === Number.parseInt(params.sectionId) ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted/50"}`}
                      >
                        <div className="flex items-center gap-2">
                          <span>
                            {chapterIndex + 1}.{sectionIndex + 1}
                          </span>
                          <span className="truncate">{section.title}</span>
                        </div>
                        {section.id < Number.parseInt(params.sectionId) && (
                          <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* 主要内容 */}
      <main className="flex-1 py-8">
        <div className="container max-w-3xl">
          {/* 章节导航 */}
          <div className="mb-6 flex items-center text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              <Home className="h-4 w-4" />
            </Link>
            <span className="mx-2">/</span>
            <Link href="/books" className="hover:text-foreground">
              小册
            </Link>
            <span className="mx-2">/</span>
            <Link href={`/books/${params.id}`} className="hover:text-foreground">
              {bookData.title}
            </Link>
            <span className="mx-2">/</span>
            <span className="truncate">{currentSection.title}</span>
          </div>

          {/* 章节信息 */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">{currentChapter.title}</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>预计阅读时间 {currentSection.estimatedTime} 分钟</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="sm" className="gap-1" disabled={!prev} asChild>
                {prev ? (
                  <Link href={`/books/${params.id}/read/${prev.id}`}>
                    <ChevronLeft className="h-4 w-4" />
                    <span className="hidden sm:inline">上一节</span>
                  </Link>
                ) : (
                  <>
                    <ChevronLeft className="h-4 w-4" />
                    <span className="hidden sm:inline">上一节</span>
                  </>
                )}
              </Button>
              <Button variant="outline" size="sm" className="gap-1" disabled={!next} asChild>
                {next ? (
                  <Link href={`/books/${params.id}/read/${next.id}`}>
                    <span className="hidden sm:inline">下一节</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                ) : (
                  <>
                    <span className="hidden sm:inline">下一节</span>
                    <ChevronRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* 章节内容 */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div
                className="prose prose-sm md:prose-base max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: sectionContent }}
              />
            </CardContent>
          </Card>

          {/* 底部操作栏 */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <ThumbsUp className="h-4 w-4" />
                <span>有用</span>
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <ThumbsDown className="h-4 w-4" />
                <span>没用</span>
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <MessageSquare className="h-4 w-4" />
                <span>评论</span>
              </Button>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="sm" className="gap-1" disabled={!prev} asChild>
                {prev ? (
                  <Link href={`/books/${params.id}/read/${prev.id}`}>
                    <ChevronLeft className="h-4 w-4" />
                    <span>上一节</span>
                  </Link>
                ) : (
                  <>
                    <ChevronLeft className="h-4 w-4" />
                    <span>上一节</span>
                  </>
                )}
              </Button>
              <Button variant="outline" size="sm" className="gap-1" disabled={!next} asChild>
                {next ? (
                  <Link href={`/books/${params.id}/read/${next.id}`}>
                    <span>下一节</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                ) : (
                  <>
                    <span>下一节</span>
                    <ChevronRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* 相关推荐 */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">相关推荐</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="relative h-16 w-12 overflow-hidden rounded-md">
                      <Image
                        src="/placeholder.svg?height=100&width=80"
                        alt="TypeScript 高级编程"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium">TypeScript 高级编程</h4>
                      <p className="text-sm text-muted-foreground">深入理解 TypeScript 类型系统</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="relative h-16 w-12 overflow-hidden rounded-md">
                      <Image
                        src="/placeholder.svg?height=100&width=80"
                        alt="Next.js 全栈开发实战"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium">Next.js 全栈开发实战</h4>
                      <p className="text-sm text-muted-foreground">使用 Next.js 构建现代化全栈应用</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

