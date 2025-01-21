'use client';

import { useEditor } from '@tiptap/react';
import { getBaseExtensions } from '@/components/editor/extensions';
import BaseEditor from '@/components/editor/BaseEditor';
import ArticleOutline from '../article/ArticleOutline';
import CommentList from '../article/CommentList';

interface ArticleViewerProps {
  content: string;
}

export default function ArticleViewer({ content }: ArticleViewerProps) {
  const editor = useEditor({
    extensions: getBaseExtensions(false),
    content,
    editable: false,
  });

  return (
    <div className="flex gap-8">
      <ArticleOutline editor={editor} />
      <div className="flex-1">
        <BaseEditor content={content} editable={false} />
      </div>
      <CommentList />
    </div>
  );
} 