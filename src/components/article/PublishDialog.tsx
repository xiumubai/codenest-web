'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ImagePlus, Loader2, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { clientFetch } from '@/lib/fetch/clientFetch';

interface Tag {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  articleCount: number;
}

interface PublishDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  content: string;
  initialCover?: string;
  initialTagId?: number | null;
  initialDescription?: string;
  onPublish: (data: {
    title: string;
    content: string;
    description: string;
    cover: string;
    tagId: number;
  }) => Promise<void>;
}

export default function PublishDialog({
  open,
  onOpenChange,
  title: initialTitle,
  content,
  initialCover,
  initialTagId,
  initialDescription = '',
  onPublish,
}: PublishDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [description, setDescription] = useState('');
  const [cover, setCover] = useState('');
  const [tagList, setTagList] = useState<Tag[]>([]);
  const [selectedTagId, setSelectedTagId] = useState<number | null>(null);

  // 重置所有状态
  const resetState = () => {
    setDescription('');
    setCover('');
    setSelectedTagId(null);
    setIsImageLoading(false);
  };

  // 监听弹窗打开状态
  useEffect(() => {
    if (open) {
      if (initialCover) {
        setCover(initialCover);
      } else {
        generateRandomCover();
      }
      if (initialTagId) {
        setSelectedTagId(initialTagId);
      }
      if (initialDescription) {
        setDescription(initialDescription);
      }
      fetchTags();
    } else {
      resetState();
    }
  }, [open, initialCover, initialTagId, initialDescription]);

  // 获取标签列表
  const fetchTags = async () => {
    try {
      const response = await clientFetch('/tag/list');
      setTagList(response.data);
    } catch (error) {
      toast.error('获取标签列表失败');
    }
  };

  const generateRandomCover = () => {
    setIsImageLoading(true);
    // 使用 Picsum Photos 生成随机图片
    // 设置一个固定的尺寸，比如 1200x630 (常见的社交媒体封面图尺寸)
    const timestamp = new Date().getTime(); // 添加时间戳防止缓存
    const coverUrl = `https://picsum.photos/seed/${timestamp}/800/400`;
    setCover(coverUrl);
  };

  const handlePublish = async () => {
    if (!initialTitle.trim()) {
      toast.error('请输入文章标题');
      return;
    }
    if (!content.trim()) {
      toast.error('请输入文章内容');
      return;
    }
    if (!description.trim()) {
      toast.error('请输入文章摘要');
      return;
    }
    if (!cover) {
      toast.error('请生成封面图');
      return;
    }
    if (!selectedTagId) {
      toast.error('请选择一个标签');
      return;
    }

    try {
      setIsLoading(true);
      await onPublish({
        title: initialTitle,
        content,
        description,
        cover,
        tagId: selectedTagId,
      });
      onOpenChange(false);
      toast.success('发布成功');
    } catch (error) {
      toast.error('发布失败');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] flex flex-col max-h-[85vh]">
        <DialogHeader className="flex-none">
          <DialogTitle>发布文章</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4 px-4 flex-1 overflow-y-auto">
          <div className="space-y-2">
            <Label>文章标题</Label>
            <Input value={initialTitle} disabled />
          </div>
          <div className="space-y-2">
            <Label>文章摘要</Label>
            <Textarea
              placeholder="请输入文章摘要，建议200字以内"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                // 自动调整高度
                e.target.style.height = 'auto';
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              maxLength={200}
              className="min-h-[100px] resize-none"
              style={{ overflow: 'hidden' }}
            />
          </div>
          <div className="space-y-2">
            <Label>封面图</Label>
            <div className="flex items-center gap-4">
              <div className="relative w-full aspect-[2/1] rounded-lg overflow-hidden bg-muted">
                {isImageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-muted/50 backdrop-blur-sm">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                )}
                <Image 
                  src={cover} 
                  alt="cover" 
                  fill
                  className="object-cover"
                  unoptimized // 因为是外部图片，需要添加这个属性
                  onLoadingComplete={() => setIsImageLoading(false)}
                />
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={generateRandomCover}
                  disabled={isImageLoading}
                >
                  <RefreshCw className={cn("h-4 w-4", isImageLoading && "animate-spin")} />
                </Button>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label>文章标签</Label>
            <div className="grid grid-cols-3 gap-2">
              {tagList.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => setSelectedTagId(tag.id)}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm transition-colors",
                    selectedTagId === tag.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-muted/80"
                  )}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter className="flex-none">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button onClick={handlePublish} disabled={isLoading || isImageLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            发布文章
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}