'use client';

import BaseEditor from '@/components/editor/BaseEditor';

interface ArticleViewerProps {
  content: string;
}

export default function ArticleViewer({ content }: ArticleViewerProps) {

  return (
    <div className="flex gap-8">
      <div className="flex-1">
        <BaseEditor content={content} editable={false} />
      </div>
    </div>
  );
} 