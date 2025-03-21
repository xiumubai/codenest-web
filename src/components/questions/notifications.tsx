"use client"

import { useState } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// 模拟通知数据
const notifications = [
  {
    id: 1,
    type: "answer",
    questionId: 1,
    questionTitle: "如何在Next.js中实现服务端渲染的数据获取？",
    user: "王五",
    time: "2小时前",
    read: false,
  },
  {
    id: 2,
    type: "accepted",
    questionId: 5,
    questionTitle: "如何在Docker中部署Node.js应用？",
    user: "孙八",
    time: "1天前",
    read: false,
  },
  {
    id: 3,
    type: "upvote",
    questionId: 3,
    questionTitle: "如何优化React应用的性能？",
    count: 3,
    time: "2天前",
    read: true,
  },
]

export function Notifications() {
  const [unreadCount, setUnreadCount] = useState(notifications.filter((n) => !n.read).length)
  const [userNotifications, setUserNotifications] = useState(notifications)

  const markAllAsRead = () => {
    setUserNotifications(userNotifications.map((n) => ({ ...n, read: true })))
    setUnreadCount(0)
  }

  const markAsRead = (id: number) => {
    setUserNotifications(userNotifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
    setUnreadCount(Math.max(0, unreadCount - 1))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full p-0 text-xs">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>通知</span>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead} className="h-auto text-xs">
              全部标为已读
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {userNotifications.length > 0 ? (
          <>
            {userNotifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={`cursor-pointer ${notification.read ? "" : "bg-muted/50"}`}
                onClick={() => markAsRead(notification.id)}
              >
                <Link href={`/questions/${notification.questionId}`} className="w-full">
                  <div className="flex flex-col space-y-1">
                    <div className="line-clamp-1 font-medium">
                      {notification.type === "answer" && `${notification.user} 回答了您的问题`}
                      {notification.type === "accepted" && `${notification.user} 采纳了您的回答`}
                      {notification.type === "upvote" && `您的问题获得了 ${notification.count} 个赞`}
                    </div>
                    <div className="line-clamp-1 text-sm text-muted-foreground">{notification.questionTitle}</div>
                    <div className="text-xs text-muted-foreground">{notification.time}</div>
                  </div>
                </Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center">
              <Link href="/notifications" className="w-full text-center text-sm text-primary">
                查看全部通知
              </Link>
            </DropdownMenuItem>
          </>
        ) : (
          <div className="py-4 text-center text-sm text-muted-foreground">暂无通知</div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

