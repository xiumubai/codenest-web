'use client';

import BaseEditor from '@/components/editor/base-editor';

interface ArticleViewerProps {
  content: string;
  className?: string;
}

export function ArticleViewer({ content, className }: ArticleViewerProps) {
  return (
    <div className={className}>
      <BaseEditor content={content} editable={false} minHeight="auto" />
    </div>
  );
}
