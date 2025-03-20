'use client';

import { useState, useEffect } from 'react';
import { Editor } from '@tiptap/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Share, Save } from 'lucide-react';
import { toast } from 'sonner';
import { useUserStore } from '@/store/user';
import { clientFetch } from '@/lib/fetch/clientFetch';
import { getBaseExtensions } from '@/components/editor/extensions';
import UserAvatar from '@/components/auth/user-avatar';
import Outline from '@/components/article/outline';
import ArticleEditor from '@/components/editor/article-editor';
import PublishDialog from '@/components/article/publish-dialog';

interface OutlineItem {
  id: string;
  level: number;
  text: string;
}

interface ArticleFormProps {
  mode: 'create' | 'edit';
  articleId?: string;
  initialTitle?: string;
  initialContent?: string;
  isDraft?: boolean;
}

export default function ArticleForm({
  mode,
  articleId,
  initialTitle = '',
  initialContent = '',
  isDraft = false
}: ArticleFormProps) {
  const router = useRouter();
  const { userInfo } = useUserStore();
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [outline, setOutline] = useState<OutlineItem[]>([]);
  const [activeHeadingId, setActiveHeadingId] = useState<string | null>(null);
  const [showPublishDialog, setShowPublishDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(mode === 'edit');
  const [cover, setCover] = useState('');
  const [tagId, setTagId] = useState<number | null>(null);
  const [description, setDescription] = useState('');
  const [isArticleDraft, setIsArticleDraft] = useState(isDraft);

  // 加载文章数据（仅编辑模式）
  useEffect(() => {
    if (mode === 'edit' && articleId) {
      const fetchArticle = async () => {
        try {
          const response = await clientFetch(`/article/${articleId}`);
          const article = response.data;
          setTitle(article.title);
          setContent(article.content);
          setCover(article.cover || '');
          setTagId(article.tagId || null);
          setDescription(article.description || '');
          setIsArticleDraft(article.isDraft || false);
          
          // 更新大纲信息
          // 使用临时编辑器实例解析大纲
          const tempEditor = new Editor({
            extensions: getBaseExtensions(true),
            content: article.content,
            editable: false
          });
          
          const headings: OutlineItem[] = [];
          tempEditor.state.doc.descendants((node: any, pos: number) => {
            if (node.type.name === 'heading') {
              const id = `heading-${pos}`;
              headings.push({
                id,
                level: node.attrs.level,
                text: node.textContent,
              });
            }
          });
          setOutline(headings);
          
          // 销毁临时编辑器实例
          tempEditor.destroy();
        } catch (error) {
          toast.error('加载文章失败');
          router.push('/article');
        } finally {
          setIsLoading(false);
        }
      };

      fetchArticle();
    }
  }, [mode, articleId, router]);

  const validateForm = () => {
    if (!title.trim()) {
      toast.error('请输入文章标题', {
        position: 'top-center'
      });
      return false;
    }
    if (!content.trim()) {
      toast.error('请输入文章内容', {
        position: 'top-center'
      });
      return false;
    }
    return true;
  };

  const handleSaveDraft = async () => {
    if (!validateForm()) return;

    try {
      const payload = {
        title,
        content,
        isDraft: true
      };

      if (mode === 'edit' && articleId) {
        await clientFetch('/article/save-draft', {
          method: 'POST',
          body: JSON.stringify({
            ...payload,
            id: Number(articleId)
          })
        });
      } else {
        await clientFetch('/article/save-draft', {
          method: 'POST',
          body: JSON.stringify(payload)
        });
      }

      setIsArticleDraft(true);
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
    tagId: number;
  }) => {
    if (!data.description.trim()) {
      toast.error('请输入文章摘要');
      return;
    }
    if (!data.cover) {
      toast.error('请上传封面图');
      return;
    }
    if (!data.tagId) {
      toast.error('请选择文章标签');
      return;
    }

    try {
      if (isArticleDraft) {
        // 发布草稿
        await clientFetch('/article/publish-draft', {
          method: 'POST',
          body: JSON.stringify({
            ...data,
            id: articleId ? Number(articleId) : undefined
          })
        });
        toast.success('草稿发布成功');
        router.push(`/article/${articleId}`);
      } else if (mode === 'edit' && articleId) {
        // 更新已发布的文章
        await clientFetch(`/article/update`, {
          method: 'PUT',
          body: JSON.stringify({
            ...data,
            id: Number(articleId),
            tagId: data.tagId,
            isDraft: false
          })
        });
        toast.success('文章更新成功');
        router.push(`/article/${articleId}`);
      } else {
        // 创建新文章
        const res = await clientFetch('/article/create', {
          method: 'POST',
          body: JSON.stringify({
            ...data,
            tagId: data.tagId,
            isDraft: false
          })
        });
        const { id } = res.data;
        toast.success('文章发布成功');
        router.push(`/article/${id}`);
      }
    } catch (error) {
      throw error;
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* 顶部操作栏 */}
      <div className="flex items-center justify-between px-6 py-2 border-b">
        <div className="flex items-center gap-2 flex-1 pr-2">
          <input
            type="text"
            placeholder="请输入文章标题..."
            className="text-2xl font-medium border-none focus:outline-none w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="default"
            className="gap-2 hover:bg-accent/90 transition-colors duration-200"
            onClick={handleSaveDraft}
          >
            <Save className="h-4 w-4" />
            存为草稿
          </Button>
          <Button 
            variant="default"
            size="default"
            className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm transition-all duration-200 hover:shadow-md"
            onClick={() => {
              if (!validateForm()) return;
              setShowPublishDialog(true);
            }}
          >
            <Share className="h-4 w-4" />
            {isArticleDraft ? '发布草稿' : (mode === 'edit' ? '更新文章' : '发布文章')}
          </Button>
          <div className="w-px h-6 bg-border mx-1" />
          {userInfo && <UserAvatar /> }
        </div>
      </div>

      <div className="flex-1 flex min-h-0 overflow-hidden">
        {/* 主体内容区域 */}
        <div className="flex-1 flex flex-col min-w-0 border-r overflow-hidden">
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
        <div className="flex flex-col">
          <Outline
            outline={outline}
            activeHeadingId={activeHeadingId}
            onOutlineClick={(id) => {
              const element = document.getElementById(id);
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          />
        </div>
      </div>

      <PublishDialog
        open={showPublishDialog}
        onOpenChange={setShowPublishDialog}
        title={title}
        content={content}
        initialCover={cover}
        initialTagId={tagId}
        initialDescription={description}
        onPublish={handlePublish}
      />
    </div>
  );
}