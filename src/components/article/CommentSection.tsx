'use client';

import { useState } from 'react';
import { Comment } from '@/types/comment';
import CommentList from './CommentList';

interface CommentSectionProps {
  comments: Comment[];
  onAddComment: (content: string, replyTo?: { id: string; username: string }) => void;
}

export default function CommentSection({ comments, onAddComment }: CommentSectionProps) {
  const handleAddComment = (content: string) => {
    const newComment: Comment = {
      id: String(Date.now()),
      content,
      author: {
        id: 'current-user',
        username: '当前用户',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}`
      },
      createdAt: new Date().toISOString(),
      likes: 0,
      replies: []
    };

    onAddComment(content);
  };

  const handleReplyComment = (commentId: string, content: string) => {
    // 查找被回复的评论，获取其作者信息
    const findComment = (comments: Comment[], targetId: string): Comment | undefined => {
      for (const comment of comments) {
        if (comment.id === targetId) {
          return comment;
        }
        if (comment.replies) {
          const found = findComment(comment.replies, targetId);
          if (found) {
            return found;
          }
        }
      }
      return undefined;
    };

    const targetComment = findComment(comments, commentId);
    if (!targetComment) return;

    onAddComment(content, {
      id: commentId,
      username: targetComment.author.username
    });
  };

  return (
    <div id="comments" className="max-w-4xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-8">评论</h2>
      <CommentList
        comments={comments}
        onAddComment={handleAddComment}
        onReplyComment={handleReplyComment}
      />
    </div>
  );
} 