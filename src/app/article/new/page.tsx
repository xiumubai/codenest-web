'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ArticleEditor from '@/components/editor/ArticleEditor';
import { Share, History, Save, ChevronRight, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import PublishDialog from '@/components/article/PublishDialog';
import { log } from 'util';

interface OutlineItem {
  id: string;
  level: number;
  text: string;
}

export default function EditorPage() {
  const [showOutline, setShowOutline] = useState(true);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [outline, setOutline] = useState<OutlineItem[]>([]);
  const [activeHeadingId, setActiveHeadingId] = useState<string | null>(null);
  const [showPublishDialog, setShowPublishDialog] = useState(false);

  const handleSaveDraft = async () => {
    if (!title.trim()) {
      toast.error('请输入文章标题', {
        position: 'top-center'
      });
      return;
    }
    if (!content.trim()) {
      toast.error('请输入文章内容', {
        position: 'top-center'
      });
      return;
    }

    try {
      // TODO: 调用保存草稿的 API
      // 这里应该调用实际的保存草稿 API
      // const response = await saveDraft({ title, content });
      
      toast.success('草稿保存成功', {
        position: 'top-center'
      });
    } catch (error) {
      toast.error('草稿保存失败', {
        position: 'top-center'
      });
    }
  };

  const handlePublish = async (data: {
    title: string;
    content: string;
    description: string;
    cover: string;
    tags: string[];
  }) => {
    try {
      // TODO: 调用发布文章的 API
      // 这里应该调用实际的发布文章 API
      // const response = await publishArticle(data);
      console.log(data);
      
      toast.success('文章发布成功');
    } catch (error) {
      throw error;
    }
  };

  const handleOutlineClick = (id: string) => {
    const element = document.querySelector(`[data-heading-id="${id}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="h-screen flex">
      {/* 主体内容区域 */}
      <div className="flex-1 flex flex-col min-w-0 border-r">
        {/* 顶部操作栏 */}
        <div className="h-14 flex items-center justify-between px-6 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10">
          <div className="flex items-center gap-2 flex-1 max-w-[800px]">
            <Input
              type="text"
              placeholder="请输入文章标题..."
              className="text-5xl font-bold border-none shadow-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-0 w-full placeholder:text-muted-foreground/50 leading-tight"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              className="gap-1"
              onClick={handleSaveDraft}
            >
              <Save className="h-4 w-4" />
              存为草稿
            </Button>
            <Button 
              variant="ghost"
              size="sm"
              className="gap-1"
              onClick={() => {
                if (!title.trim()) {
                  toast.error('请输入文章标题', {
                    position: 'top-center'
                  });
                  return;
                }
                if (!content.trim()) {
                  toast.error('请输入文章内容', {
                    position: 'top-center'
                  });
                  return;
                }
                setShowPublishDialog(true);
              }}
            >
              <Share className="h-4 w-4" />
              去发布
            </Button>
          </div>
        </div>

        {/* 编辑器 */}
        <div className="flex-1 overflow-y-auto">
          <ArticleEditor
            content={content}
            onChange={setContent}
            onOutlineChange={setOutline}
          />
        </div>
      </div>

      {/* 右侧大纲 */}
      <div
        className={cn(
          "w-64 transition-all duration-300",
          !showOutline && "w-0"
        )}
      >
        {showOutline && (
          <div className="h-full flex flex-col">
            <div className="h-14 flex items-center justify-between px-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <h3 className="font-medium">大纲</h3>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setShowOutline(false)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <div className="p-4 space-y-1.5">
                {outline.map((item) => (
                  <div
                    key={item.id}
                    className={cn(
                      "text-sm cursor-pointer py-1 transition-colors rounded hover:bg-muted/50 px-2",
                      "ml-" + (item.level - 1) * 3,
                      activeHeadingId === item.id
                        ? "text-primary font-medium bg-muted/30"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                    onClick={() => handleOutlineClick(item.id)}
                  >
                    {item.text}
                  </div>
                ))}
                {outline.length === 0 && (
                  <div className="text-sm text-muted-foreground text-center py-4">
                    暂无大纲
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {!showOutline && (
          <Button
            variant="ghost"
            size="icon"
            className="fixed right-0 top-1/2 -translate-y-1/2 h-8 w-8 opacity-50 hover:opacity-100"
            onClick={() => setShowOutline(true)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}
      </div>

      <PublishDialog
        open={showPublishDialog}
        onOpenChange={setShowPublishDialog}
        title={title}
        content={content}
        onPublish={handlePublish}
      />
    </div>
  );
} 