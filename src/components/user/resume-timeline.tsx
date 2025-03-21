"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { TimerIcon as Timeline, Clock } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

interface TimelineEvent {
  id: string
  type: "experience" | "education" | "project" | "certification" | "achievement"
  title: string
  subtitle?: string
  date: string
  endDate?: string
  description?: string
  icon?: React.ReactNode
  color?: string
}

interface ResumeTimelineProps {
  events: TimelineEvent[]
}

export function ResumeTimeline({ events }: ResumeTimelineProps) {
  const [activeTab, setActiveTab] = useState("all")

  const filteredEvents = activeTab === "all" ? events : events.filter((event) => event.type === activeTab)

  // 按日期排序事件（最近的在前）
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    const dateA = a.endDate || a.date
    const dateB = b.endDate || b.date
    return new Date(dateB).getTime() - new Date(dateA).getTime()
  })

  const getEventIcon = (event: TimelineEvent) => {
    if (event.icon) return event.icon

    switch (event.type) {
      case "experience":
        return (
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path d="M12 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M12 16H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M9 12H9.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M9 16H9.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M12 3V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )
      case "education":
        return (
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 2L2 7L12 12L22 7L12 2Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 17L12 22L22 17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 12L12 17L22 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )
      case "project":
        return (
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M2 9.5V14.5C2 16.5 3 17.5 5 17.5H19C21 17.5 22 16.5 22 14.5V9.5C22 7.5 21 6.5 19 6.5H5C3 6.5 2 7.5 2 9.5Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M12 6.5V17.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path
              d="M8.5 6.5V17.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15.5 6.5V17.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19 6.5V4.5C19 2.5 18 1.5 16 1.5H8C6 1.5 5 2.5 5 4.5V6.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5 17.5V19.5C5 21.5 6 22.5 8 22.5H16C18 22.5 19 21.5 19 19.5V17.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )
      case "certification":
        return (
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )
      case "achievement":
        return (
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )
      default:
        return <Clock className="h-5 w-5" />
    }
  }

  const getEventColor = (event: TimelineEvent) => {
    if (event.color) return event.color

    switch (event.type) {
      case "experience":
        return "bg-blue-500"
      case "education":
        return "bg-green-500"
      case "project":
        return "bg-purple-500"
      case "certification":
        return "bg-amber-500"
      case "achievement":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getEventTypeName = (type: string) => {
    switch (type) {
      case "experience":
        return "工作经验"
      case "education":
        return "教育背景"
      case "project":
        return "项目经验"
      case "certification":
        return "证书"
      case "achievement":
        return "成就"
      default:
        return type
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="bg-background/80 backdrop-blur-sm">
          <Timeline className="mr-2 h-4 w-4" />
          时间线
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>简历时间线</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="flex flex-wrap">
            <TabsTrigger value="all">全部</TabsTrigger>
            <TabsTrigger value="experience">工作经验</TabsTrigger>
            <TabsTrigger value="education">教育背景</TabsTrigger>
            <TabsTrigger value="project">项目经验</TabsTrigger>
            <TabsTrigger value="certification">证书</TabsTrigger>
            <TabsTrigger value="achievement">成就</TabsTrigger>
          </TabsList>

          <div className="mt-6 overflow-auto flex-1 pr-4">
            <div className="relative border-l border-gray-200 dark:border-gray-700 ml-3">
              {sortedEvents.map((event, index) => (
                <div key={event.id} className="mb-10 ml-6">
                  <div
                    className={`absolute w-6 h-6 rounded-full -left-3 flex items-center justify-center ${getEventColor(event)} text-white`}
                  >
                    {getEventIcon(event)}
                  </div>
                  <div className="flex items-center mb-1">
                    <time className="text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                      {event.date}
                      {event.endDate && ` - ${event.endDate}`}
                    </time>
                    <Badge variant="outline" className="ml-3">
                      {getEventTypeName(event.type)}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{event.title}</h3>
                  {event.subtitle && (
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">{event.subtitle}</p>
                  )}
                  {event.description && (
                    <p className="mt-2 text-base font-normal text-gray-500 dark:text-gray-400">{event.description}</p>
                  )}
                </div>
              ))}

              {sortedEvents.length === 0 && (
                <div className="ml-6 py-8 text-center">
                  <p className="text-muted-foreground">没有找到相关记录</p>
                </div>
              )}
            </div>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

