"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

// 模拟通知数据
const allNotifications = [
  {
    id: 1,
    type: "answer",
    questionId: 1,
    questionTitle: "如何在Next.js中实现服务端渲染的数据获取？",
    user: "王五",
    time: "2023-06-18 14:30",
    read: false,
  },
  {
    id: 2,
    type: "accepted",
    questionId: 5,
    questionTitle: "如何在Docker中部署Node.js应用？",
    user: "孙八",
    time: "2023-06-17 09:15",
    read: false,
  },
  {
    id: 3,
    type: "upvote",
    questionId: 3,
    questionTitle: "如何优化React应用的性能？",
    count: 3,
    time: "2023-06-16 16:45",
    read: true,
  },
  {
    id: 4,
    type: "comment",
    questionId: 2,
    questionTitle: "TypeScript中如何正确定义React组件的Props类型？",
    user: "赵六",
    time: "2023-06-15 11:20",
    read: true,
  },
  {
    id: 5,
    type: "mention",
    questionId: 4,
    questionTitle: "使用Tailwind CSS时如何自定义主题？",
    user: "钱七",
    time: "2023-06-14 13:50",
    read: true,
  },
]

export function NotificationsList() {
  const [notifications, setNotifications] = useState(allNotifications)
  const [activeTab, setActiveTab] = useState("all")

  const unreadNotifications = notifications.filter((n) => !n.read)
  const readNotifications = notifications.filter((n) => n.read)

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const markAsRead = (id: number) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const getNotificationText = (notification: (typeof notifications)[0]) => {
    switch (notification.type) {
      case "answer":
        return `${notification.user} 回答了您的问题 "${notification.questionTitle}"`
      case "accepted":
        return `${notification.user} 采纳了您对问题 "${notification.questionTitle}" 的回答`
      case "upvote":
        return `您的问题 "${notification.questionTitle}" 获得了 ${notification.count} 个赞`
      case "comment":
        return `${notification.user} 评论了您的问题 "${notification.questionTitle}"`
      case "mention":
        return `${notification.user} 在问题 "${notification.questionTitle}" 中提到了您`
      default:
        return ""
    }
  }

  const displayNotifications =
    activeTab === "all" ? notifications : activeTab === "unread" ? unreadNotifications : readNotifications

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[400px]">
          <TabsList>
            <TabsTrigger value="all">全部</TabsTrigger>
            <TabsTrigger value="unread">未读 ({unreadNotifications.length})</TabsTrigger>
            <TabsTrigger value="read">已读</TabsTrigger>
          </TabsList>
        </Tabs>

        {unreadNotifications.length > 0 && (
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            全部标为已读
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {displayNotifications.length > 0 ? (
          displayNotifications.map((notification) => (
            <Card key={notification.id} className={notification.read ? "" : "bg-muted/30 border-primary/20"}>
              <CardContent className="p-4">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between">
                    <Link
                      href={`/questions/${notification.questionId}`}
                      className="font-medium hover:text-primary"
                      onClick={() => !notification.read && markAsRead(notification.id)}
                    >
                      {getNotificationText(notification)}
                    </Link>
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => markAsRead(notification.id)}
                        className="h-auto text-xs"
                      >
                        标为已读
                      </Button>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">{notification.time}</div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed">
            <p className="text-muted-foreground">暂无通知</p>
          </div>
        )}
      </div>
    </div>
  )
}

