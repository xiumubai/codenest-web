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

interface PublishDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  content: string;
  onPublish: (data: {
    title: string;
    content: string;
    description: string;
    cover: string;
    tags: string[];
  }) => Promise<void>;
}

export default function PublishDialog({
  open,
  onOpenChange,
  title: initialTitle,
  content,
  onPublish,
}: PublishDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [description, setDescription] = useState('');
  const [cover, setCover] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  // 重置所有状态
  const resetState = () => {
    setDescription('');
    setCover('');
    setTags([]);
    setTagInput('');
    setIsImageLoading(false);
  };

  // 监听弹窗打开状态
  useEffect(() => {
    if (open) {
      generateRandomCover();
    } else {
      resetState();
    }
  }, [open]); // 只在 open 状态变化时触发

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (tags.length >= 5) {
        toast.error('最多添加5个标签');
        return;
      }
      if (tags.includes(tagInput.trim())) {
        toast.error('标签已存在');
        return;
      }
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const generateRandomCover = () => {
    setIsImageLoading(true);
    // 使用 Picsum Photos 生成随机图片
    // 设置一个固定的尺寸，比如 1200x630 (常见的社交媒体封面图尺寸)
    const timestamp = new Date().getTime(); // 添加时间戳防止缓存
    const coverUrl = `https://picsum.photos/800/400?random=${timestamp}`;
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
    if (tags.length === 0) {
      toast.error('请至少添加一个标签');
      return;
    }

    try {
      setIsLoading(true);
      await onPublish({
        title: initialTitle,
        content,
        description,
        cover,
        tags,
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
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>发布文章</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
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
              {cover ? (
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
              ) : (
                <div className="w-full aspect-[1.9/1] rounded-lg border-2 border-dashed flex items-center justify-center">
                  <Button
                    variant="ghost"
                    className="flex flex-col items-center gap-2"
                    onClick={generateRandomCover}
                    disabled={isImageLoading}
                  >
                    {isImageLoading ? (
                      <>
                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">生成中...</span>
                      </>
                    ) : (
                      <>
                        <ImagePlus className="h-6 w-6 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">点击生成随机封面图</span>
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label>文章标签</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag) => (
                <div
                  key={tag}
                  className="px-2 py-1 rounded-md bg-primary/10 text-sm flex items-center gap-1"
                >
                  {tag}
                  <button
                    className="hover:text-destructive"
                    onClick={() => handleRemoveTag(tag)}
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
        </div>
        <DialogFooter>
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