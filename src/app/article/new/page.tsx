'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import ArticleEditor from '@/components/article/ArticleEditor';
import PublishDialog from '@/components/article/PublishDialog';
import { ChevronRight, ChevronLeft, Save, Send } from 'lucide-react';
import { useState, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface OutlineItem {
  id: string;
  level: number;
  text: string;
}

export default function EditorPage() {
  const [showOutline, setShowOutline] = useState(true);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showPublishDialog, setShowPublishDialog] = useState(false);
  const [outline, setOutline] = useState<OutlineItem[]>([]);
  const [activeHeadingId, setActiveHeadingId] = useState<string | null>(null);

  const handleSaveDraft = async () => {
    // TODO: 调用保存草稿的API
    toast.success('草稿保存成功');
    if (!title.trim()) {
      toast.error('请输入文章标题');
      return;
    }
    if (!content.trim()) {
      toast.error('请输入文章内容');
      return;
    }
    
  };

  const handlePublish = async (data: {
    title: string;
    content: string;
    description: string;
    cover: string;
    tags: string[];
  }) => {
    // TODO: 调用发布文章的API
    console.log('发布文章', data);
    return Promise.resolve();
  };

  const handleOutlineChange = useCallback((items: OutlineItem[]) => {
    setOutline(items);
  }, []);

  const handleOutlineClick = (id: string) => {
    const element = document.querySelector(`[data-heading-id="${id}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // 使用 Intersection Observer 监听标题元素的可见性
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // 找到第一个可见的标题
        const visibleHeading = entries.find((entry) => entry.isIntersecting);
        if (visibleHeading) {
          const id = visibleHeading.target.getAttribute('data-heading-id');
          if (id) {
            setActiveHeadingId(id);
          }
        }
      },
      {
        root: null, // 相对于视口
        rootMargin: '-100px 0px -66% 0px', // 顶部和底部的偏移，确保标题在合适的位置时被激活
        threshold: 1.0, // 完全可见时触发
      }
    );

    // 观察所有标题元素
    const headings = document.querySelectorAll('[data-heading-id]');
    headings.forEach((heading) => observer.observe(heading));

    return () => {
      headings.forEach((heading) => observer.unobserve(heading));
    };
  }, [outline]); // 当大纲变化时重新设置观察者

  return (
    <div className="flex h-screen">
      {/* 左侧文章列表 */}
      <div className="w-80 border-r bg-muted/10">
        <Tabs defaultValue="articles" className="h-full">
          <div className="border-b px-4 py-2">
            <TabsList className="w-full">
              <TabsTrigger value="articles" className="flex-1">文章</TabsTrigger>
              <TabsTrigger value="drafts" className="flex-1">草稿</TabsTrigger>
            </TabsList>
          </div>
          <ScrollArea className="h-[calc(100vh-56px)]">
            <TabsContent value="articles" className="m-0">
              <div className="space-y-4 p-4">
                {/* 文章列表项 */}
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-lg border bg-card p-3 hover:bg-accent hover:text-accent-foreground cursor-pointer"
                  >
                    <h3 className="font-medium line-clamp-2">这是一篇文章的标题 {i + 1}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {new Date().toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="drafts" className="m-0">
              <div className="space-y-4 p-4">
                {/* 草稿列表项 */}
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-lg border bg-card p-3 hover:bg-accent hover:text-accent-foreground cursor-pointer"
                  >
                    <h3 className="font-medium line-clamp-2">这是一篇草稿的标题 {i + 1}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {new Date().toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </div>

      {/* 中间编辑区域 */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="border-b p-4 flex items-center justify-between">
          <Input
            type="text"
            placeholder="请输入文章标题..."
            className="text-2xl font-medium border-none bg-transparent focus-visible:ring-0 px-0 max-w-2xl"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-1" onClick={handleSaveDraft}>
              <Save className="h-4 w-4" />
              存为草稿
            </Button>
            <Button className="gap-1" onClick={() => setShowPublishDialog(true)}>
              <Send className="h-4 w-4" />
              发布文章
            </Button>
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          <ArticleEditor
            content={content}
            onChange={setContent}
            onOutlineChange={handleOutlineChange}
          />
        </div>
      </div>

      {/* 右侧大纲 */}
      <div
        className={cn(
          "border-l bg-muted/10 transition-all duration-300",
          showOutline ? "w-64" : "w-0"
        )}
      >
        {showOutline && (
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">文章大纲</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowOutline(false)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <ScrollArea className="h-[calc(100vh-8rem)]">
              <div className="space-y-2">
                {outline.map((item) => (
                  <div
                    key={item.id}
                    className={cn(
                      "text-sm cursor-pointer transition-colors",
                      "pl-" + (item.level - 1) * 4,
                      activeHeadingId === item.id
                        ? "text-primary font-medium"
                        : "hover:text-primary/80"
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
            </ScrollArea>
          </div>
        )}
        {!showOutline && (
          <Button
            variant="ghost"
            size="icon"
            className="fixed right-0 top-1/2 -translate-y-1/2"
            onClick={() => setShowOutline(true)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* 发布文章对话框 */}
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