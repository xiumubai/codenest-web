import { useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ImagePlus, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

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
  const [title] = useState(initialTitle);
  const [description, setDescription] = useState('');
  const [cover, setCover] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

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

  const handleUploadCover = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('图片大小不能超过2MB');
        return;
      }
      // 这里应该调用实际的图片上传API
      // 现在我们用 base64 演示
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        setCover(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePublish = async () => {
    if (!title.trim()) {
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
      toast.error('请上传封面图');
      return;
    }
    if (tags.length === 0) {
      toast.error('请至少添加一个标签');
      return;
    }

    try {
      setIsLoading(true);
      await onPublish({
        title,
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
            <Input value={title} disabled />
          </div>
          <div className="space-y-2">
            <Label>文章摘要</Label>
            <Textarea
              placeholder="请输入文章摘要，建议100字以内"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={100}
            />
          </div>
          <div className="space-y-2">
            <Label>封面图</Label>
            <div className="flex items-center gap-4">
              {cover ? (
                <div className="relative w-40 h-24 rounded-lg overflow-hidden">
                  <Image src={cover} alt="cover" width={160} height={96} className="w-full h-full object-cover" />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-1 right-1"
                    onClick={() => setCover('')}
                  >
                    <ImagePlus className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="w-40 h-24 rounded-lg border-2 border-dashed flex items-center justify-center">
                  <Input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="cover-upload"
                    onChange={handleUploadCover}
                  />
                  <Label
                    htmlFor="cover-upload"
                    className="flex flex-col items-center gap-2 cursor-pointer"
                  >
                    <ImagePlus className="h-6 w-6 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">点击上传</span>
                  </Label>
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
          <Button onClick={handlePublish} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            发布文章
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 