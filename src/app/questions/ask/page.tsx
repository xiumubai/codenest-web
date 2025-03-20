'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Tag } from '@/types/question';
import ArticleEditor from '@/components/editor/article-editor';

// 添加必填标记组件
function RequiredLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-1">
      {children}
      <span className="text-destructive">*</span>
    </div>
  );
}

export default function AskQuestionPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [expectation, setExpectation] = useState('');
  const [tags, setTags] = useState<Tag[]>([]);
  const [tagInput, setTagInput] = useState('');

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (tags.length >= 5) {
        toast.error('最多只能添加5个标签');
        return;
      }
      const newTag: Tag = {
        id: Date.now().toString(),
        name: tagInput.trim(),
      };
      setTags([...tags, newTag]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagId: string) => {
    setTags(tags.filter(tag => tag.id !== tagId));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors: string[] = [];
    
    if (!title.trim()) {
      errors.push('请输入问题标题');
    }
    
    if (!description.trim()) {
      errors.push('请输入问题描述');
    }
    
    if (!expectation.trim()) {
      errors.push('请输入期望结果');
    }
    
    if (tags.length === 0) {
      errors.push('请至少添加一个标签');
    }

    if (errors.length > 0) {
      errors.forEach(error => toast.error(error));
      return;
    }

    try {
      setIsSubmitting(true);
      // TODO: 实现提交逻辑
      toast.success('问题发布成功');
      router.push('/community');
    } catch (error) {
      toast.error('发布失败，请重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex-1">
      <div className="container py-6 px-4 lg:px-8">
        <Card className="mx-auto">
          <CardHeader>
            <CardTitle>提出问题</CardTitle>
            <CardDescription>
              清晰的问题描述更容易得到准确的回答
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit} className="space-y-8 p-6">
            <div className="space-y-2">
              <RequiredLabel>
                <Label htmlFor="title">标题</Label>
              </RequiredLabel>
              <Input
                id="title"
                placeholder="简明扼要地描述你的问题"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={100}
                required
              />
              <p className="text-xs text-muted-foreground text-right">
                {title.length}/100
              </p>
            </div>

            <div className="space-y-2">
              <RequiredLabel>
                <Label htmlFor="description">问题描述</Label>
              </RequiredLabel>
              <div className="min-h-[300px] border rounded-lg">
                <ArticleEditor
                  content={description}
                  onChange={setDescription}
                />
              </div>
            </div>

            <div className="space-y-2">
              <RequiredLabel>
                <Label htmlFor="expectation">期望结果</Label>
              </RequiredLabel>
              <div className="min-h-[200px] border rounded-lg">
                <ArticleEditor
                  content={expectation}
                  onChange={setExpectation}
                />
              </div>
            </div>

            <div className="space-y-2">
              <RequiredLabel>
                <Label>标签</Label>
              </RequiredLabel>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag) => (
                  <div
                    key={tag.id}
                    className="px-2 py-1 rounded-md bg-primary/10 text-sm flex items-center gap-1"
                  >
                    {tag.name}
                    <button
                      type="button"
                      className="hover:text-destructive"
                      onClick={() => handleRemoveTag(tag.id)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <Input
                placeholder="输入标签后按回车添加，最多5个"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
              />
            </div>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                取消
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? '发布中...' : '发布问题'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </main>
  );
} 