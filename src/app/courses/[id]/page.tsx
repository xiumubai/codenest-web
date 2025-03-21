"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Star, Clock, Book, Video, Users, Award, CheckCircle, Play, Lock } from "lucide-react"

// 模拟课程详情数据
const getCourseData = (id) => {
  return {
    id: parseInt(id),
    title: "React 实战进阶",
    description: "学习 React 高级特性与性能优化技巧，掌握企业级项目开发必备技能。本课程将带你深入了解React的工作原理，学习高级组件模式，状态管理策略，性能优化技巧，以及React生态系统中的最佳实践。",
    longDescription: "本课程专为有一定React基础的开发者设计，帮助你掌握React高级开发技能。通过实战项目，你将学习如何构建高性能、可维护的React应用。\n\n课程内容包括：\n- React高级组件模式与设计模式\n- 状态管理进阶：Context API、Redux、MobX比较\n- React性能优化：memo、useMemo、useCallback深度解析\n- React Hooks进阶用法与自定义Hooks\n- React与TypeScript结合使用\n- 服务端渲染与Next.js框架实践\n- 测试React应用：Jest与React Testing Library\n- 大型React项目架构设计与最佳实践",
    cover: "/placeholder.svg?height=400&width=300",
    previewVideo: "https://example.com/preview.mp4",
    instructor: {
      id: 101,
      name: "李明",
      avatar: "/placeholder.svg?height=40&width=40",
      title: "资深前端工程师",
      company: "Tech公司",
      bio: "10年React开发经验，曾任职于多家知名互联网公司，参与开发过多个大型React项目。热衷于技术分享，拥有丰富的教学经验。",
      coursesCount: 5,
      studentsCount: 12000,
      rating: 4.8,
    },
    price: 199,
    originalPrice: 299,
    discount: 33,
    totalHours: 24,
    totalLessons: 48,
    totalArticles: 12,
    level: "中级",
    students: 1325,
    lastUpdated: "2023-10-15",
    language: "中文",
    rating: 4.7,
    ratingCount: 385,
    ratingDistribution: {
      5: 70,
      4: 22,
      3: 5,
      2: 2,
      1: 1,
    },
    tags: ["React", "前端", "性能优化"],
    prerequisites: ["HTML/CSS/JavaScript基础", "React基础知识", "ES6语法"],
    targets: [
      "掌握React高级组件设计模式",
      "学习React性能优化技巧",
      "理解React状态管理最佳实践",
      "能够独立构建大型React应用"
    ],
    chapters: [
      {
        id: 1,
        title: "课程介绍",
        lessons: [
          { id: 101, title: "课程概述", duration: "10:25", isFree: true },
          { id: 102, title: "环境搭建", duration: "15:30", isFree: true },
        ]
      },
      {
        id: 2,
        title: "React基础回顾",
        lessons: [
          { id: 201, title: "组件与Props", duration: "18:45", isFree: false },
          { id: 202, title: "状态与生命周期", duration: "25:10", isFree: false },
          { id: 203, title: "事件处理", duration: "16:20", isFree: false },
        ]
      },
      {
        id: 3,
        title: "高级组件模式",
        lessons: [
          { id: 301, title: "高阶组件(HOC)", duration: "28:15", isFree: false },
          { id: 302, title: "Render Props模式", duration: "22:40", isFree: false },
          { id: 303, title: "复合组件模式", duration: "26:30", isFree: false },
          { id: 304, title: "自定义Hooks模式", duration: "30:15", isFree: false },
        ]
      },
      {
        id: 4,
        title: "状态管理进阶",
        lessons: [
          { id: 401, title: "Context API深入", duration: "24:50", isFree: false },
          { id: 402, title: "Redux核心概念", duration: "35:20", isFree: false },
          { id: 403, title: "Redux中间件", duration: "28:45", isFree: false },
          { id: 404, title: "Redux Toolkit实战", duration: "40:10", isFree: false },
          { id: 405, title: "MobX入门与实践", duration: "32:30", isFree: false },
        ]
      },
      {
        id: 5,
        title: "性能优化",
        lessons: [
          { id: 501, title: "React渲染机制", duration: "22:15", isFree: false },
          { id: 502, title: "memo与PureComponent", duration: "18:30", isFree: false },
          { id: 503, title: "useMemo与useCallback", duration: "25:45", isFree: false },
          { id: 504, title: "代码分割与懒加载", duration: "20:10", isFree: false },
          { id: 505, title: "性能测量与分析", duration: "28:20", isFree: false },
        ]
      },
    ],
    reviews: [
      {
        id: 1,
        user: { name: "张三", avatar: "/placeholder.svg?height=40&width=40" },
        rating: 5,
        date: "2023-09-20",
        content: "非常棒的课程！内容深入浅出，讲解清晰，学到了很多React的高级知识。"
      },
      {
        id: 2,
        user: { name: "李四", avatar: "/placeholder.svg?height=40&width=40" },
        rating: 4,
        date: "2023-08-15",
        content: "课程内容很充实，但有些地方讲解稍微有点快，需要多看几遍才能理解。"
      },
      {
        id: 3,
        user: { name: "王五", avatar: "/placeholder.svg?height=40&width=40" },
        rating: 5,
        date: "2023-07-28",
        content: "这门课程改变了我对React的理解，现在我能够更加自信地开发复杂的React应用了。"
      },
    ],
    faqs: [
      {
        question: "这门课程适合初学者吗？",
        answer: "本课程需要一定的React基础，如果你是完全的初学者，建议先学习React基础课程。"
      },
      {
        question: "课程有有效期吗？",
        answer: "一旦购买，你将获得终身访问权，可以随时观看课程内容。"
      },
      {
        question: "如果对课程内容有疑问，如何获取帮助？",
        answer: "你可以在课程的讨论区提问，讲师或助教会定期回答学员的问题。"
      },
      {
        question: "是否提供课程的源代码？",
        answer: "是的，所有课程中的示例代码都可以在课程资料中下载。"
      },
      {
        question: "完成课程后会获得证书吗？",
        answer: "是的，完成所有课程内容后，你将获得一个完课证书。"
      },
    ]
  };
};

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  
  // 从URL参数获取课程ID并获取数据
  const courseData = getCourseData(params.id);
  
  // 计算总课程时长
  const totalMinutes = courseData.chapters.reduce((total, chapter) => {
    return total + chapter.lessons.reduce((chapterTotal, lesson) => {
      const [minutes, seconds] = lesson.duration.split(':').map(Number);
      return chapterTotal + minutes + seconds / 60;
    }, 0);
  }, 0);
  
  const totalHours = Math.floor(totalMinutes / 60);
  const remainingMinutes = Math.round(totalMinutes % 60);
  
  // 计算评分百分比
  const calculateRatingPercentage = (rating) => {
    return (courseData.ratingDistribution[rating] || 0) * 100 / courseData.ratingCount;
  };
  
  // 处理购买按钮点击
  const handleBuyClick = () => {
    router.push(`/courses/${params.id}/purchase`);
  };
  
  // 处理试学按钮点击
  const handleTryLearnClick = (lessonId) => {
    router.push(`/courses/${params.id}/learn?lesson=${lessonId}`);
  };
  
  return (
    <div className="bg-background">
      {/* 课程头部信息 */}
      <div className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {courseData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h1 className="text-3xl font-bold mb-2">{courseData.title}</h1>
                <p className="text-lg text-muted-foreground mb-4">
                  {courseData.description}
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                    <span className="font-medium mr-1">{courseData.rating}</span>
                    <span className="text-muted-foreground">({courseData.ratingCount}人评价)</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-muted-foreground mr-1" />
                    <span>{courseData.students}名学生</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                    <span>总时长 {totalHours}小时{remainingMinutes > 0 ? ` ${remainingMinutes}分钟` : ''}</span>
                  </div>
                  <div className="flex items-center">
                    <Video className="h-4 w-4 text-muted-foreground mr-1" />
                    <span>{courseData.totalLessons}个课时</span>
                  </div>
                  <div className="flex items-center">
                    <Book className="h-4 w-4 text-muted-foreground mr-1" />
                    <span>{courseData.totalArticles}个文章</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Image
                  src={courseData.instructor.avatar}
                  alt={courseData.instructor.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <p className="font-medium">{courseData.instructor.name}</p>
                  <p className="text-sm text-muted-foreground">{courseData.instructor.title}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Button size="lg" onClick={handleBuyClick}>立即购买</Button>
                <Button size="lg" variant="outline" onClick={() => handleTryLearnClick(courseData.chapters[0].lessons[0].id)}>
                  免费试学
                </Button>
              </div>
            </div>
            
            <div className="md:col-span-1">
              <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={courseData.cover || "/placeholder.svg"}
                  alt={courseData.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-background/80 hover:bg-background/90 rounded-full h-12 w-12"
                    onClick={() => handleTryLearnClick(courseData.chapters[0].lessons[0].id)}
                  >
                    <Play className="h-5 w-5" fill="currentColor" />
                  </Button>
                </div>
              </div>
              
              <Card className="mt-6">
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-3xl font-bold">¥{courseData.price}</span>
                        {courseData.originalPrice > courseData.price && (
                          <span className="text-lg text-muted-foreground line-through">¥{courseData.originalPrice}</span>
                        )}
                      </div>
                      {courseData.discount > 0 && (
                        <Badge variant="destructive" className="mb-4">限时{courseData.discount}%折扣</Badge>
                      )}
                    </div>
                    
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>终身访问</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>{courseData.totalLessons}个视频课程</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>{courseData.totalArticles}个实战练习</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>课程源代码和资料</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>完课证书</span>
                      </li>
                    </ul>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <Button size="lg" className="w-full" onClick={handleBuyClick}>立即购买</Button>
                      <Button size="lg" className="w-full" variant="outline" onClick={() => handleTryLearnClick(courseData.chapters[0].lessons[0].id)}>
                        免费试学
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      {/* 课程详细内容标签页 */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">课程概述</TabsTrigger>
            <TabsTrigger value="curriculum">课程大纲</TabsTrigger>
            <TabsTrigger value="instructor">讲师介绍</TabsTrigger>
            <TabsTrigger value="reviews">学员评价</TabsTrigger>
          </TabsList>
          
          {/* 课程概述 */}
          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">课程介绍</h2>
                  <div className="prose max-w-none">
                    {courseData.longDescription.split('\n\n').map((paragraph, idx) => (
                      <p key={idx} className="mb-4">{paragraph}</p>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold mb-4">你将学到什么</h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4">
                    {courseData.targets.map((target, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span>{target}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold mb-4">课程预备知识</h2>
                  <ul className="space-y-2">
                    {courseData.prerequisites.map((prerequisite, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span>{prerequisite}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold mb-4">常见问题</h2>
                  <Accordion type="single" collapsible className="w-full">
                    {courseData.faqs.map((faq, idx) => (
                      <AccordionItem key={idx} value={`faq-${idx}`}>
                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                        <AccordionContent>{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>
              
              <div className="md:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>课程信息</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">难度级别</p>
                        <p className="font-medium">{courseData.level}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">课时数量</p>
                        <p className="font-medium">{courseData.totalLessons}个</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">课程时长</p>
                        <p className="font-medium">
                          {totalHours}小时{remainingMinutes > 0 ? ` ${remainingMinutes}分钟` : ''}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">课程语言</p>
                        <p className="font-medium">{courseData.language}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">最后更新</p>
                        <p className="font-medium">{courseData.lastUpdated}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">学员人数</p>
                        <p className="font-medium">{courseData.students}</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">课程标签</p>
                      <div className="flex flex-wrap gap-2">
                        {courseData.tags.map((tag) => (
                          <Badge key={tag} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* 课程大纲 */}
          <TabsContent value="curriculum">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">课程大纲</h2>
                <div className="text-sm text-muted-foreground">
                  共 {courseData.chapters.length} 章 · {courseData.totalLessons} 节 · 
                  {totalHours}小时{remainingMinutes > 0 ? ` ${remainingMinutes}分钟` : ''}
                </div>
              </div>
              
              <Accordion type="multiple" className="w-full">
                {courseData.chapters.map((chapter) => (
                  <AccordionItem key={chapter.id} value={`chapter-${chapter.id}`}>
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex justify-between w-full pr-4">
                        <span>{chapter.title}</span>
                        <span className="text-sm text-muted-foreground">
                          {chapter.lessons.length}节
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2">
                        {chapter.lessons.map((lesson) => (
                          <li key={lesson.id} className="border-b border-border py-2 last:border-0">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                {lesson.isFree ? (
                                  <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    className="gap-1"
                                    onClick={() => handleTryLearnClick(lesson.id)}
                                  >
                                    <Play className="h-4 w-4" />
                                    <span>{lesson.title}</span>
                                  </Button>
                                ) : (
                                  <div className="flex items-center gap-2 pl-2">
                                    <Lock className="h-4 w-4 text-muted-foreground" />
                                    <span>{lesson.title}</span>
                                  </div>
                                )}
                                {lesson.isFree && (
                                  <Badge variant="outline" className="ml-2">
                                    免费
                                  </Badge>
                                )}
                              </div>
                              <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </TabsContent>
          
          {/* 讲师介绍 */}
          <TabsContent value="instructor">
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <Image
                  src={courseData.instructor.avatar}
                  alt={courseData.instructor.name}
                  width={120}
                  height={120}
                  className="rounded-full"
                />
                <div className="space-y-4">
                  <div>
                    <h2 className="text-2xl font-bold">{courseData.instructor.name}</h2>
                    <p className="text-lg text-muted-foreground">{courseData.instructor.title} at {courseData.instructor.company}</p>
                  </div>
                  
                  <div className="flex items-center gap-x-6 gap-y-2 flex-wrap">
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                      <span>{courseData.instructor.rating} 讲师评分</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="h-5 w-5 text-blue-500" />
                      <span>{courseData.instructor.coursesCount} 门课程</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-5 w-5 text-green-500" />
                      <span>{courseData.instructor.studentsCount.toLocaleString()} 名学生</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">讲师简介</h3>
                <p className="text-muted-foreground whitespace-pre-line">
                  {courseData.instructor.bio}
                </p>
              </div>
            </div>
          </TabsContent>
          
          {/* 学员评价 */}
          <TabsContent value="reviews">
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                  <Card>
                    <CardHeader>
                      <CardTitle>课程评分</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex flex-col items-center">
                        <span className="text-5xl font-bold">{courseData.rating}</span>
                        <div className="flex items-center mt-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-5 w-5 ${
                                star <= Math.round(courseData.rating)
                                  ? "text-yellow-500 fill-yellow-500"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground mt-1">
                          {courseData.ratingCount} 人评价
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map((rating) => (
                          <div key={rating} className="flex items-center gap-2">
                            <div className="w-8 text-right">{rating}星</div>
                            <Progress
                              value={calculateRatingPercentage(rating)}
                              className="h-2"
                            />
                            <div className="w-8 text-left text-sm text-muted-foreground">
                              {courseData.ratingDistribution[rating] || 0}%
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="md:col-span-2">
                  <h2 className="text-2xl font-bold mb-4">学员评价</h2>
                  
                  <div className="space-y-6">
                    {courseData.reviews.map((review) => (
                      <div key={review.id} className="border-b border-border pb-6 last:border-0">
                        <div className="flex items-start">
                          <Image
                            src={review.user.avatar}
                            alt={review.user.name}
                            width={40}
                            height={40}
                            className="rounded-full mr-4"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-semibold">{review.user.name}</h4>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <span>{review.date}</span>
                                </div>
                              </div>
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`h-4 w-4 ${
                                      star <= review.rating
                                        ? "text-yellow-500 fill-yellow-500"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="mt-2">{review.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 
