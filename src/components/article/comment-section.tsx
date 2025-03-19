"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThumbsUp, Reply, MoreHorizontal } from "lucide-react"

// 模拟评论数据
const initialComments = [
  {
    id: 1,
    author: {
      name: "李四",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    content:
      "非常实用的文章，特别是关于自动化重复任务的部分给了我很多启发。我已经开始尝试使用脚本来自动化一些日常工作了。",
    date: "2023-05-16",
    likes: 24,
    replies: [
      {
        id: 101,
        author: {
          name: "张三",
          avatar: "/placeholder.svg?height=50&width=50",
        },
        content: "谢谢您的反馈！很高兴这篇文章对您有所帮助。如果您有任何问题或需要更多关于自动化的建议，请随时告诉我。",
        date: "2023-05-16",
        likes: 8,
      },
    ],
  },
  {
    id: 2,
    author: {
      name: "王五",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    content:
      "我认为第7点使用键盘而非鼠标是最难养成的习惯之一，但确实能大大提高效率。有没有推荐的资源来学习常用的键盘快捷键？",
    date: "2023-05-17",
    likes: 15,
    replies: [],
  },
  {
    id: 3,
    author: {
      name: "赵六",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    content:
      "关于版本控制的部分可以再详细一些，特别是对于初学者来说，Git的概念有时候比较难理解。不过整体来说，这篇文章非常全面！",
    date: "2023-05-18",
    likes: 10,
    replies: [],
  },
]

export function CommentSection({ articleId }: { articleId: string }) {
  const [comments, setComments] = useState(initialComments)
  const [newComment, setNewComment] = useState("")
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [replyContent, setReplyContent] = useState("")

  const handleCommentSubmit = () => {
    if (!newComment.trim()) return

    const comment = {
      id: comments.length + 1,
      author: {
        name: "访客用户",
        avatar: "/placeholder.svg?height=50&width=50",
      },
      content: newComment,
      date: new Date().toISOString().split("T")[0],
      likes: 0,
      replies: [],
    }

    setComments([...comments, comment])
    setNewComment("")
  }

  const handleReplySubmit = (commentId: number) => {
    if (!replyContent.trim()) return

    const reply = {
      id: Date.now(),
      author: {
        name: "访客用户",
        avatar: "/placeholder.svg?height=50&width=50",
      },
      content: replyContent,
      date: new Date().toISOString().split("T")[0],
      likes: 0,
    }

    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...comment.replies, reply],
        }
      }
      return comment
    })

    setComments(updatedComments)
    setReplyContent("")
    setReplyingTo(null)
  }

  const handleLike = (commentId: number, replyId?: number) => {
    const updatedComments = comments.map((comment) => {
      if (replyId && comment.id === commentId) {
        const updatedReplies = comment.replies.map((reply) => {
          if (reply.id === replyId) {
            return { ...reply, likes: reply.likes + 1 }
          }
          return reply
        })
        return { ...comment, replies: updatedReplies }
      } else if (comment.id === commentId) {
        return { ...comment, likes: comment.likes + 1 }
      }
      return comment
    })

    setComments(updatedComments)
  }

  return (
    <div className="mt-8 space-y-6">
      <h2 className="text-2xl font-bold">评论 ({comments.length})</h2>
      <div className="space-y-4">
        <div className="flex gap-4">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=50&width=50" alt="用户头像" />
            <AvatarFallback>用户</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <Textarea
              placeholder="写下您的评论..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <div className="flex justify-end">
              <Button onClick={handleCommentSubmit}>发表评论</Button>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="space-y-4">
              <div className="flex gap-4">
                <Avatar>
                  <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                  <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{comment.author.name}</div>
                      <div className="text-sm text-muted-foreground">{comment.date}</div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-2">{comment.content}</div>
                  <div className="mt-2 flex gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={() => handleLike(comment.id)}
                    >
                      <ThumbsUp className="h-4 w-4" />
                      <span>{comment.likes}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={() => setReplyingTo(comment.id)}
                    >
                      <Reply className="h-4 w-4" />
                      <span>回复</span>
                    </Button>
                  </div>
                </div>
              </div>
              {replyingTo === comment.id && (
                <div className="ml-12 flex gap-4">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=50&width=50" alt="用户头像" />
                    <AvatarFallback>用户</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <Textarea
                      placeholder={`回复 ${comment.author.name}...`}
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                    />
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setReplyingTo(null)}>
                        取消
                      </Button>
                      <Button onClick={() => handleReplySubmit(comment.id)}>回复</Button>
                    </div>
                  </div>
                </div>
              )}
              {comment.replies.length > 0 && (
                <div className="ml-12 space-y-4">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="flex gap-4">
                      <Avatar>
                        <AvatarImage src={reply.author.avatar} alt={reply.author.name} />
                        <AvatarFallback>{reply.author.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{reply.author.name}</div>
                            <div className="text-sm text-muted-foreground">{reply.date}</div>
                          </div>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="mt-2">{reply.content}</div>
                        <div className="mt-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center gap-1"
                            onClick={() => handleLike(comment.id, reply.id)}
                          >
                            <ThumbsUp className="h-4 w-4" />
                            <span>{reply.likes}</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

