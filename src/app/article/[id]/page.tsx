'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { formatDate } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import ArticleViewer from '@/components/article/ArticleViewer';
import { generateMockArticles } from '@/lib/mock/articles';

export default function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        // 模拟API请求
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockArticle = generateMockArticles(1)[0];
        // 添加文章内容
        mockArticle.content = `
          <h1>这是一篇测试文章</h1>
          <p>这是文章的第一段落，包含了一些<strong>加粗</strong>和<em>斜体</em>文本。</p>
          <h2>代码示例</h2>
          <pre><code class="language-javascript">const greeting = 'Hello, World!';
console.log(greeting);</code></pre>
          <h2>列表示例</h2>
          <ul>
            <li>列表项 1</li>
            <li>列表项 2</li>
            <li>列表项 3</li>
          </ul>
          <blockquote>
            <p>这是一段引用文本。</p>
          </blockquote>
        `;
        setArticle(mockArticle);
      } catch (error) {
        console.error('获取文章失败:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (isLoading) {
    return (
      <div className="container max-w-4xl mx-auto py-10 px-4">
        <div className="space-y-8">
          <Skeleton className="h-8 w-3/4 bg-muted" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full bg-muted" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-24 bg-muted" />
              <Skeleton className="h-3 w-32 bg-muted" />
            </div>
          </div>
          <Skeleton className="h-[300px] w-full rounded-xl bg-muted" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full bg-muted" />
            <Skeleton className="h-4 w-5/6 bg-muted" />
            <Skeleton className="h-4 w-4/6 bg-muted" />
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container max-w-4xl mx-auto py-10 px-4">
        <div className="text-center text-muted-foreground">
          文章不存在或已被删除
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container max-w-4xl mx-auto py-10 px-4"
    >
      {/* 文章标题 */}
      <h1 className="text-4xl font-bold mb-6">{article.title}</h1>

      {/* 作者信息 */}
      <div className="flex items-center gap-4 mb-8">
        <div className="relative w-12 h-12 rounded-full overflow-hidden">
          <Image
            src={article.author.avatar}
            alt={article.author.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <div className="font-medium">{article.author.name}</div>
          <div className="text-sm text-muted-foreground">
            {formatDate(article.publishedAt)}
          </div>
        </div>
      </div>

      {/* 封面图 */}
      <div className="relative w-full h-[300px] rounded-xl overflow-hidden mb-8">
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          className="object-cover"
        />
      </div>

      {/* 标签 */}
      <div className="flex flex-wrap gap-2 mb-8">
        {article.tags.map((tag: any) => (
          <span
            key={tag.id}
            className={`px-3 py-1 text-sm rounded-full ${tag.color}`}
          >
            {tag.name}
          </span>
        ))}
      </div>

      {/* 文章内容 */}
      <ArticleViewer content={article.content} />
    </motion.div>
  );
} 