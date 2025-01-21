'use client';

import { useState } from 'react';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface Comment {
  id: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  createdAt: string;
}

// 模拟评论数据
const mockComments: Comment[] = [
  {
    id: '1',
    content: '这篇文章写得非常好，对我很有帮助！',
    author: {
      name: '张三',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
    },
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    content: '文章的代码示例很清晰，让我更好地理解了这个概念。',
    author: {
      name: '李四',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
    },
    createdAt: '2024-01-15T11:30:00Z',
  },
  {
    id: '3',
    content: '期待作者的下一篇文章！',
    author: {
      name: '王五',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
    },
    createdAt: '2024-01-15T14:20:00Z',
  },
];

export default function CommentList() {
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [newComment, setNewComment] = useState('');

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: String(Date.now()),
      content: newComment,
      author: {
        name: '访客用户',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}`,
      },
      createdAt: new Date().toISOString(),
    };

    setComments([comment, ...comments]);
    setNewComment('');
  };

  return (
    <div className="w-80 h-[calc(100vh-5rem)] sticky top-20 space-y-6 overflow-y-auto p-4">
      <div className="font-medium">评论列表</div>
      
      {/* 评论输入框 */}
      <div className="space-y-4 bg-card rounded-lg p-4">
        <Textarea
          placeholder="写下你的评论..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="resize-none"
          rows={3}
        />
        <Button 
          onClick={handleSubmitComment}
          className="w-full"
        >
          发表评论
        </Button>
      </div>

      {/* 评论列表 */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-card rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 rounded-full overflow-hidden">
                <Image
                  src={comment.author.avatar}
                  alt={comment.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="text-sm font-medium">{comment.author.name}</div>
                <div className="text-xs text-muted-foreground">
                  {formatDate(comment.createdAt)}
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 