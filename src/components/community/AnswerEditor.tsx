'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import ArticleEditor from '@/components/editor/ArticleEditor';
import { toast } from 'sonner';

interface AnswerEditorProps {
  questionId: string;
  onAnswerSubmitted?: () => void;
}

export default function AnswerEditor({ questionId, onAnswerSubmitted }: AnswerEditorProps) {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim()) {
      toast.error('请输入回答内容');
      return;
    }

    try {
      setIsSubmitting(true);
      // TODO: 实现提交回答的逻辑
      toast.success('回答已提交');
      setContent('');
      onAnswerSubmitted?.();
    } catch (error) {
      toast.error('提交失败，请重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="border rounded-lg">
        <ArticleEditor
          content={content}
          onChange={setContent}
        />
      </div>
      <div className="flex justify-end">
        <Button 
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? '提交中...' : '提交回答'}
        </Button>
      </div>
    </div>
  );
} 