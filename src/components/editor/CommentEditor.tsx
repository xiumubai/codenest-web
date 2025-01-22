'use client';

import { useState } from 'react';

interface CommentEditorProps {
  placeholder?: string;
  onSubmit?: (content: string) => void;
  replyTo?: {
    id: string;
    username: string;
  } | null;
  onCancelReply?: () => void;
}

export default function CommentEditor({ 
  placeholder = '写下你的评论...', 
  onSubmit,
  replyTo,
  onCancelReply 
}: CommentEditorProps) {
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (!content.trim()) return;
    onSubmit?.(content);
    setContent('');
    if (replyTo) {
      onCancelReply?.();
    }
  };

  return (
    <div className={`space-y-4 ${replyTo ? 'ml-12 mt-2' : ''}`}>
      {replyTo && (
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>回复 @{replyTo.username}</span>
        </div>
      )}
      <div className="min-h-[100px] rounded-lg border bg-background overflow-hidden focus-within:ring-2 focus-within:ring-primary">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={replyTo ? `回复 @${replyTo.username}...` : placeholder}
          maxLength={500}
          className="w-full h-[100px] p-4 resize-none outline-none bg-transparent"
        />
        <div className="px-4 pb-2 text-sm text-muted-foreground text-right">
          {content.length}/500
        </div>
      </div>
      <div className="flex justify-end">
        <button 
          className="bg-primary text-primary-foreground rounded-md py-2 px-6 hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleSubmit}
          disabled={!content.trim()}
        >
          {replyTo ? '回复' : '发表评论'}
        </button>
      </div>
    </div>
  );
} 