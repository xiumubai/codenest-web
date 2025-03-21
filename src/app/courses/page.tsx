"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Search, Star, Users, Clock } from "lucide-react"

// 模拟课程数据
const coursesData = [
  {
    id: 1,
    title: "React 实战进阶",
    description: "学习 React 高级特性与性能优化技巧",
    cover: "/placeholder.svg?height=400&width=300",
    instructor: {
      name: "李明",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    price: 199,
    originalPrice: 299,
    totalHours: 24,
    totalLessons: 48,
    level: "中级",
    students: 1325,
    rating: 4.7,
    tags: ["React", "前端", "性能优化"],
    updatedAt: "2023-10-15",
  },
  {
    id: 2,
    title: "Vue.js 3 完全指南",
    description: "全面掌握 Vue 3 的新特性和实战应用",
    cover: "/placeholder.svg?height=400&width=300",
    instructor: {
      name: "王思佳",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    price: 159,
    originalPrice: 259,
    totalHours: 18,
    totalLessons: 36,
    level: "初级到中级",
    students: 2136,
    rating: 4.8,
    tags: ["Vue", "前端", "组合式API"],
    updatedAt: "2023-11-20",
  },
  {
    id: 3,
    title: "Node.js 微服务架构",
    description: "从零构建可扩展的 Node.js 微服务",
    cover: "/placeholder.svg?height=400&width=300",
    instructor: {
      name: "张伟",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    price: 299,
    originalPrice: 399,
    totalHours: 30,
    totalLessons: 56,
    level: "高级",
    students: 843,
    rating: 4.9,
    tags: ["Node.js", "微服务", "后端"],
    updatedAt: "2023-12-05",
  },
  {
    id: 4,
    title: "TypeScript 实战教程",
    description: "TypeScript 在企业级项目中的最佳实践",
    cover: "/placeholder.svg?height=400&width=300",
    instructor: {
      name: "刘静",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    price: 179,
    originalPrice: 249,
    totalHours: 20,
    totalLessons: 42,
    level: "中级到高级",
    students: 1105,
    rating: 4.6,
    tags: ["TypeScript", "前端", "类型系统"],
    updatedAt: "2023-09-28",
  },
];

export default function CoursesPage() {
  const [courses, setCourses] = useState(coursesData);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // 模拟数据过滤和排序
  useEffect(() => {
    let filteredCourses = [...coursesData];
    
    // 搜索过滤
    if (searchTerm) {
      filteredCourses = filteredCourses.filter(
        course => 
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // 分类过滤
    if (selectedCategory !== "all") {
      filteredCourses = filteredCourses.filter(
        course => course.tags.includes(selectedCategory)
      );
    }
    
    // 排序
    switch (sortBy) {
      case "newest":
        filteredCourses.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
        break;
      case "popular":
        filteredCourses.sort((a, b) => b.students - a.students);
        break;
      case "rating":
        filteredCourses.sort((a, b) => b.rating - a.rating);
        break;
      case "priceAsc":
        filteredCourses.sort((a, b) => a.price - b.price);
        break;
      case "priceDesc":
        filteredCourses.sort((a, b) => b.price - a.price);
        break;
    }
    
    setCourses(filteredCourses);
  }, [searchTerm, sortBy, selectedCategory]);

  // 所有可用标签
  const allTags = ["React", "Vue", "Node.js", "TypeScript", "前端", "后端", "微服务", "性能优化", "组合式API", "类型系统"];

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">探索精品课程</h1>
      
      {/* 搜索和过滤区域 */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索课程..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="选择分类" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部分类</SelectItem>
                {allTags.map((tag) => (
                  <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="排序方式" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">最新发布</SelectItem>
                <SelectItem value="popular">最受欢迎</SelectItem>
                <SelectItem value="rating">评分最高</SelectItem>
                <SelectItem value="priceAsc">价格从低到高</SelectItem>
                <SelectItem value="priceDesc">价格从高到低</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* 标签过滤 */}
        <div className="flex flex-wrap gap-2">
          <Badge 
            className={`cursor-pointer ${selectedCategory === "all" ? "bg-primary" : "bg-secondary"}`}
            onClick={() => setSelectedCategory("all")}
          >
            全部
          </Badge>
          {allTags.map((tag) => (
            <Badge 
              key={tag}
              className={`cursor-pointer ${selectedCategory === tag ? "bg-primary" : "bg-secondary"}`}
              onClick={() => setSelectedCategory(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      
      {/* 课程列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {courses.length > 0 ? (
          courses.map((course) => (
            <Link href={`/courses/${course.id}`} key={course.id} className="transition-transform hover:scale-[1.02]">
              <Card className="h-full flex flex-col overflow-hidden">
                <div className="relative aspect-video">
                  <Image
                    src={course.cover || "/placeholder.svg"}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs font-normal">{course.level}</Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />
                      {course.rating}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold line-clamp-2">{course.title}</h3>
                </CardHeader>
                <CardContent className="pb-2 flex-grow">
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{course.description}</p>
                  <div className="flex items-center text-sm gap-3">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{course.totalHours}小时</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{course.students}人学习</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <Image
                      src={course.instructor.avatar || "/placeholder.svg"}
                      alt={course.instructor.name}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                    <span className="text-sm">{course.instructor.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-primary">¥{course.price}</span>
                    {course.originalPrice > course.price && (
                      <span className="text-sm text-muted-foreground line-through ml-2">
                        ¥{course.originalPrice}
                      </span>
                    )}
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">没有找到匹配的课程，请尝试其他搜索条件</p>
          </div>
        )}
      </div>
    </div>
  )
}
