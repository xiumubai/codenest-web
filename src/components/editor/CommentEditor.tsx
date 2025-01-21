'use client';

import { useState } from 'react';
import BaseEditor from './BaseEditor';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

interface CommentEditorProps {
  onSubmit: (content: string) => void;
  placeholder?: string;
  minHeight?: string;
  submitText?: string;
}

export default function CommentEditor({
  onSubmit,
  placeholder = '写下你的评论...',
  minHeight = '200px',
  submitText = '发布评论',
}: CommentEditorProps) {
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (!content.trim()) return;
    onSubmit(content);
    setContent('');
  };

  return (
    <div className="space-y-4 rounded-lg border p-4">
      <BaseEditor
        content={content}
        onChange={setContent}
        minHeight={minHeight}
        className="min-h-0"
      />
      <div className="flex justify-end">
        <Button onClick={handleSubmit} className="gap-2">
          <Send className="h-4 w-4" />
          {submitText}
        </Button>
      </div>
    </div>
  );
} 