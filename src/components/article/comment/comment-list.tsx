'use client';

import { useState, useEffect } from 'react';
import { Comment } from '@/types/comment';
import CommentEditor from '../../editor/comment-editor';
import { CommentItem } from './comment-item';
import { clientFetch } from "@/lib/fetch/clientFetch";

interface CommentListProps {
  articleId: number | string;
}

export function CommentList({ articleId }: CommentListProps) {

  const [comments, setComments] = useState<Comment[]>([]);

  // 加载评论数据
  const fetchComments = async (page: number) => {
    try {
      const res = await clientFetch(`/comments/${articleId}?page=${page}&pageSize=10`, {
        method: 'GET'
      });
      
      const newComments = res.data.items;
      
      if (page === 1) {
        setComments(newComments);
      } else {
        setComments(prev => [...prev, ...newComments]);
      }
    } catch (error) {
      console.error('加载评论失败:', error);
    }
  };

  useEffect(() => {
    if (articleId) {
      fetchComments(1);
    }
  }, [articleId]);

  const handleAddComment = async (content: string) => {
    try {
      const response = await clientFetch('/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          articleId: Number(articleId),
          content
        })
      });

      if (!response.ok) {
        throw new Error('评论提交失败');
      }

      // onAddComment(response.data?.data);
    } catch (error) {
      console.error('评论提交失败:', error);
    }
  };

  const handleReplyComment = async (commentId: string, content: string) => {
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

    try {
      const response = await clientFetch('/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          articleId: Number(articleId),
          content,
          parentId: Number(commentId)
        })
      });

      if (!response.ok) {
        throw new Error('回复提交失败');
      }

      // onAddComment(response.data?.data);
    } catch (error) {
      console.error('回复提交失败:', error);
    }
  };

  return (
    <div id="comments" className="mx-auto py-8">
      <h2 className="text-2xl font-bold mb-8">评论</h2>
      <div className="space-y-4">
        <CommentEditor onSubmit={handleAddComment} />
        
        <div className="divide-y">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onReply={handleReplyComment}
            />
          ))}
        </div>
      </div>
    </div>
  );
}