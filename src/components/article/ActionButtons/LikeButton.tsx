'use client';

import { useState } from 'react';
import { clientFetch } from '@/lib/fetch/clientFetch';

interface LikeButtonProps {
  articleId: string | number;
  initialCount: number;
  initialLiked: boolean;
}

export default function LikeButton({ articleId, initialCount, initialLiked }: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialCount);

  const handleLike = async () => {
    try {
      await clientFetch(`/article/${articleId}/like`, {
        method: 'POST',
      });
      setIsLiked(!isLiked);
      setLikeCount((prev) => (!isLiked ? prev + 1 : prev - 1));
    } catch (error) {
      console.error('点赞失败:', error);
    }
  };

  return (
    <button
      className="group flex flex-col items-center gap-2"
      onClick={handleLike}
    >
      <div className="w-12 h-12 rounded-full bg-background border-2 border-border flex items-center justify-center group-hover:border-primary/30 group-hover:bg-primary/5 transition-colors">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill={isLiked ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`${isLiked ? 'text-primary' : 'text-foreground group-hover:text-primary'} transition-colors`}
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </div>
      <span className={`text-sm ${isLiked ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'} transition-colors`}>
        {likeCount}
      </span>
    </button>
  );
}