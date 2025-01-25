'use client';

import BaseEditor from '@/components/editor/BaseEditor';

interface ArticleViewerProps {
  content: string;
  className?: string;
}

export default function ArticleViewer({ content, className }: ArticleViewerProps) {
  return (
    <div className={className}>
      <BaseEditor content={content} editable={false} minHeight="auto" />
    </div>
  );
} 