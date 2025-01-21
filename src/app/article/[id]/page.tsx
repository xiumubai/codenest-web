"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion, useScroll } from "motion/react";
import { formatDate } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import ArticleViewer from "@/components/editor/ArticleViewer";
import { generateMockArticles } from "@/lib/mock/articles";

export default function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 使用 useScroll 跟踪整个页面的滚动进度
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const mockArticle = generateMockArticles(1)[0];
        mockArticle.content = `
          <h1>Web开发最佳实践指南</h1>
          <p>在现代Web开发中，掌握最佳实践对于构建高质量的应用程序至关重要。本文将详细介绍一些核心概念和技术。</p>
          
          <h2>1. 响应式设计原则</h2>
          <p>响应式设计是现代Web开发中不可或缺的一部分。以下是一些关键原则：</p>
          <ul>
            <li>使用弹性布局（Flexible Layouts）</li>
            <li>响应式图片处理</li>
            <li>媒体查询的合理使用</li>
          </ul>

          <h2>2. 性能优化</h2>
          <p>网站性能直接影响用户体验，以下是一些优化技巧：</p>
          <pre><code class="language-javascript">
// 图片懒加载示例
const lazyImages = document.querySelectorAll('.lazy');
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      observer.unobserve(img);
    }
  });
});</code></pre>

          <h2>3. 安全最佳实践</h2>
          <blockquote>
            <p>安全不是一个可选项，而是必需品。始终记住保护用户数据的重要性。</p>
          </blockquote>
          
          <h2>4. 现代JavaScript特性</h2>
          <p>利用现代JavaScript特性可以让代码更简洁、更易维护：</p>
          <pre><code class="language-javascript">
// 使用现代JavaScript特性
const { name, age } = user;
const numbers = [1, 2, 3];
const doubled = numbers.map(n => n * 2);

// 异步处理
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}</code></pre>

          <h2>5. CSS最佳实践</h2>
          <p>良好的CSS架构对于项目的可维护性至关重要：</p>
          <ul>
            <li>使用CSS变量实现主题化</li>
            <li>采用BEM命名规范</li>
            <li>使用CSS Grid和Flexbox进行布局</li>
          </ul>

          <h2>总结</h2>
          <p>遵循这些最佳实践，将帮助你构建更好的Web应用。持续学习和实践是提升技能的关键。</p>
        `;
        setArticle(mockArticle);
      } catch (error) {
        console.error("获取文章失败:", error);
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
    <>
      <motion.div
        id="scroll-indicator"
        style={{
          scaleX: scrollYProgress,
        }}
        className="fixed top-0 left-0 right-0 h-1.5 bg-primary origin-[0%] z-50"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container max-w-4xl mx-auto py-10 px-4"
      >
        {/* 文章标题 */}
        <h1 className="text-4xl font-bold mb-6 text-foreground">{article.title}</h1>

        {/* 作者信息 */}
        <div className="flex items-center gap-4 mb-8 bg-card p-4 rounded-lg shadow-sm">
          <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/10">
            <Image
              src={article.author.avatar}
              alt={article.author.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="font-medium text-foreground">{article.author.name}</div>
            <div className="text-sm text-muted-foreground">
              {formatDate(article.publishedAt)}
            </div>
          </div>
        </div>

        {/* 封面图 */}
        <div className="relative w-full h-[300px] rounded-xl overflow-hidden mb-8 shadow-lg ring-1 ring-border">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            className="object-cover"
          />
        </div>

        {/* 标签 */}
        <div className="flex flex-wrap gap-2 mb-8 p-4 bg-muted/50 rounded-lg">
          {article.tags.map((tag: any) => (
            <span
              key={tag.id}
              className={`px-3 py-1 text-sm rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors`}
            >
              {tag.name}
            </span>
          ))}
        </div>

        {/* 文章内容 */}
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <ArticleViewer content={article.content} />
        </div>
      </motion.div>
    </>
  );
}
