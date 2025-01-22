'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Comment } from '@/types/comment';
import CommentEditor from '../editor/CommentEditor';

interface CommentItemProps {
  comment: Comment;
  onReply: (commentId: string, content: string) => void;
  level?: number;
}

function CommentItem({ comment, onReply, level = 0 }: CommentItemProps) {
  const [showReplyEditor, setShowReplyEditor] = useState(false);
  const maxLevel = 3; // 最大嵌套层级

  return (
    <div className="py-4">
      <div className="flex items-start gap-3">
        <Image
          src={comment.author.avatar}
          alt={comment.author.username}
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium">{comment.author.username}</span>
            {comment.replyTo && (
              <>
                <span className="text-muted-foreground">回复</span>
                <span className="font-medium">@{comment.replyTo.username}</span>
              </>
            )}
            <span className="text-sm text-muted-foreground">{comment.createdAt}</span>
          </div>
          <p className="mt-2 text-sm">{comment.content}</p>
          {level < maxLevel && (
            <div className="mt-2 flex items-center gap-4">
              <button
                onClick={() => setShowReplyEditor(!showReplyEditor)}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {showReplyEditor ? '取消回复' : '回复'}
              </button>
            </div>
          )}
        </div>
      </div>

      {showReplyEditor && (
        <div className="mt-4 ml-1">
          <CommentEditor
            replyTo={{
              id: comment.id,
              username: comment.author.username
            }}
            onSubmit={(content) => {
              onReply(comment.id, content);
              setShowReplyEditor(false);
            }}
            onCancelReply={() => setShowReplyEditor(false)}
          />
        </div>
      )}

      {comment.replies && comment.replies.length > 0 && (
        <div className={`mt-4 ${level < maxLevel ? 'ml-12' : 'ml-0'}`}>
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              onReply={onReply}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface CommentListProps {
  comments: Comment[];
  onAddComment: (content: string) => void;
  onReplyComment: (commentId: string, content: string) => void;
}

export default function CommentList({ comments, onAddComment, onReplyComment }: CommentListProps) {
  return (
    <div className="space-y-4">
      <CommentEditor onSubmit={onAddComment} />
      
      <div className="divide-y">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onReply={onReplyComment}
          />
        ))}
      </div>
    </div>
  );
} 